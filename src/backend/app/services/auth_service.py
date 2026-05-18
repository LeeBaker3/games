"""Authentication business logic."""

from __future__ import annotations

from collections import defaultdict, deque
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

from app.core.security import create_session_token, hash_password, verify_password
from app.schemas.auth import LoginRequest, RegisterRequest
from app.schemas.user import UpdateProfileRequest, UserProfile
from app.services import user_service


_SESSION_TTL = timedelta(hours=12)
_RATE_LIMIT_WINDOW = timedelta(minutes=10)
_RATE_LIMIT_MAX = 5

_sessions: dict[str, tuple[str, datetime]] = {}
_login_attempts: dict[str, deque[datetime]] = defaultdict(deque)
_registration_attempts: dict[str, deque[datetime]] = defaultdict(deque)


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _rate_limit(bucket: dict[str, deque[datetime]], key: str) -> None:
    window_start = _now() - _RATE_LIMIT_WINDOW
    attempts = bucket[key]
    while attempts and attempts[0] < window_start:
        attempts.popleft()
    if len(attempts) >= _RATE_LIMIT_MAX:
        raise ValueError("Too many requests, please try again later")
    attempts.append(_now())


def _start_session(user_id: str) -> str:
    session_token = create_session_token()
    _sessions[session_token] = (user_id, _now() + _SESSION_TTL)
    return session_token


def register_user(payload: RegisterRequest) -> tuple[UserProfile, str]:
    _rate_limit(_registration_attempts, payload.email)
    password_salt, password_hash = hash_password(payload.password)
    user = user_service.create_user(
        payload.display_name,
        payload.email,
        password_salt=password_salt,
        password_hash=password_hash,
        auth_provider="password",
    )
    return user_service.to_profile(user), _start_session(user.id)


def login_user(payload: LoginRequest) -> tuple[UserProfile, str]:
    normalized_email = payload.email.strip().lower()
    _rate_limit(_login_attempts, normalized_email)
    user = user_service.get_user_by_email(normalized_email)
    if user is None or user.password_salt is None or user.password_hash is None:
        raise ValueError("Invalid email or password")
    if not verify_password(payload.password, user.password_salt, user.password_hash):
        raise ValueError("Invalid email or password")
    return user_service.to_profile(user), _start_session(user.id)


def logout_session(session_token: str | None) -> None:
    if session_token is None:
        return
    _sessions.pop(session_token, None)


def get_current_user(session_token: str | None) -> UserProfile | None:
    if session_token is None:
        return None
    session = _sessions.get(session_token)
    if session is None:
        return None
    user_id, expires_at = session
    if expires_at < _now():
        _sessions.pop(session_token, None)
        return None
    user = user_service.get_user_by_id(user_id)
    return user_service.to_profile(user) if user is not None else None


def update_profile(session_token: str | None, payload: UpdateProfileRequest) -> UserProfile:
    if session_token is None:
        raise ValueError("Authentication required")
    session = _sessions.get(session_token)
    if session is None:
        raise ValueError("Authentication required")
    user_id, expires_at = session
    if expires_at < _now():
        _sessions.pop(session_token, None)
        raise ValueError("Authentication required")
    user = user_service.get_user_by_id(user_id)
    if user is None:
        raise ValueError("Authentication required")
    updated_user = user_service.update_user_profile(user, payload)
    return user_service.to_profile(updated_user)


def reset_auth_store() -> None:
    _sessions.clear()
    _login_attempts.clear()
    _registration_attempts.clear()
    user_service.reset_user_store()
