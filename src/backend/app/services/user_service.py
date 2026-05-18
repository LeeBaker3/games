"""User profile business logic."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import ClassVar
from uuid import uuid4

from app.schemas.user import UserProfile, UpdateProfileRequest


@dataclass(slots=True)
class UserRecord:
    id: str
    display_name: str
    email: str
    password_salt: str | None
    password_hash: str | None
    auth_provider: str | None
    created_at: datetime


_users_by_id: dict[str, UserRecord] = {}
_users_by_email: dict[str, UserRecord] = {}


def _normalize_email(email: str) -> str:
    return email.strip().lower()


def _to_profile(user: UserRecord) -> UserProfile:
    return UserProfile(
        id=user.id,
        displayName=user.display_name,
        email=user.email,
        authProvider=user.auth_provider,
        createdAt=user.created_at,
    )


def create_user(
    display_name: str,
    email: str,
    *,
    password_salt: str | None,
    password_hash: str | None,
    auth_provider: str | None,
) -> UserRecord:
    normalized_email = _normalize_email(email)
    if normalized_email in _users_by_email:
        raise ValueError("Email is already registered")

    user = UserRecord(
        id=str(uuid4()),
        display_name=display_name.strip(),
        email=normalized_email,
        password_salt=password_salt,
        password_hash=password_hash,
        auth_provider=auth_provider,
        created_at=datetime.now(timezone.utc),
    )
    _users_by_id[user.id] = user
    _users_by_email[user.email] = user
    return user


def get_user_by_id(user_id: str) -> UserRecord | None:
    return _users_by_id.get(user_id)


def get_user_by_email(email: str) -> UserRecord | None:
    return _users_by_email.get(_normalize_email(email))


def update_user_profile(user: UserRecord, payload: UpdateProfileRequest) -> UserRecord:
    updated_user = UserRecord(
        id=user.id,
        display_name=payload.display_name.strip(),
        email=user.email,
        password_salt=user.password_salt,
        password_hash=user.password_hash,
        auth_provider=user.auth_provider,
        created_at=user.created_at,
    )
    _users_by_id[user.id] = updated_user
    _users_by_email[user.email] = updated_user
    return updated_user


def to_profile(user: UserRecord) -> UserProfile:
    return _to_profile(user)


def reset_user_store() -> None:
    _users_by_id.clear()
    _users_by_email.clear()
