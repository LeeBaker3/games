"""Shared API dependencies."""

from __future__ import annotations

from fastapi import Cookie, HTTPException, status

from app.core.security import SESSION_COOKIE_NAME
from app.schemas.user import UserProfile
from app.services import auth_service


def get_current_user(
    fun_games_session: str | None = Cookie(default=None, alias=SESSION_COOKIE_NAME),
) -> UserProfile:
    user = auth_service.get_current_user(fun_games_session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required"
        )
    return user
