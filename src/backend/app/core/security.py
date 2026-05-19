"""Security helpers for authentication, authorization, and token handling."""

from __future__ import annotations

import hashlib
import hmac
import secrets


SESSION_COOKIE_NAME = "fun_games_session"
PASSWORD_HASH_ITERATIONS = 120_000


def create_session_token() -> str:
    return secrets.token_urlsafe(32)


def hash_password(password: str, salt: str | None = None) -> tuple[str, str]:
    password_salt = salt or secrets.token_hex(16)
    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        password_salt.encode("utf-8"),
        PASSWORD_HASH_ITERATIONS,
    ).hex()
    return password_salt, password_hash


def verify_password(password: str, salt: str, expected_hash: str) -> bool:
    _, password_hash = hash_password(password, salt)
    return hmac.compare_digest(password_hash, expected_hash)
