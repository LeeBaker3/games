"""Current user and profile routes."""

from __future__ import annotations

from fastapi import APIRouter, Cookie, Depends, HTTPException, status

from app.api.dependencies import get_current_user
from app.core.security import SESSION_COOKIE_NAME
from app.schemas.user import UpdateProfileRequest, UserProfile
from app.services import auth_service

router = APIRouter(prefix="/me", tags=["me"])


@router.get("", response_model=UserProfile)
def current_user(current_user: UserProfile = Depends(get_current_user)) -> UserProfile:
    return current_user


@router.patch("", response_model=UserProfile)
def update_current_user(
    payload: UpdateProfileRequest,
    fun_games_session: str | None = Cookie(default=None, alias=SESSION_COOKIE_NAME),
    current_user: UserProfile = Depends(get_current_user),
) -> UserProfile:
    try:
        return auth_service.update_profile(fun_games_session, payload)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(error)) from error
