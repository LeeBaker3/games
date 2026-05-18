"""Authentication and OAuth routes."""

from __future__ import annotations

from fastapi import APIRouter, Cookie, HTTPException, Response, status

from app.core.security import SESSION_COOKIE_NAME
from app.schemas.auth import (
    AuthResponse,
    LoginRequest,
    OAuthCallbackRequest,
    OAuthProvidersResponse,
    RegisterRequest,
)
from app.services import auth_service, oauth_service

router = APIRouter(prefix="/auth", tags=["auth"])


def _set_session_cookie(response: Response, session_token: str) -> None:
    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=session_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 60 * 12,
        path="/",
    )


@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterRequest, response: Response) -> AuthResponse:
    try:
        user, session_token = auth_service.register_user(payload)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error)) from error

    _set_session_cookie(response, session_token)
    return AuthResponse(user=user, sessionToken=session_token)


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, response: Response) -> AuthResponse:
    try:
        user, session_token = auth_service.login_user(payload)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(error)) from error

    _set_session_cookie(response, session_token)
    return AuthResponse(user=user, sessionToken=session_token)


@router.post("/logout")
def logout(
    response: Response,
    fun_games_session: str | None = Cookie(default=None, alias=SESSION_COOKIE_NAME),
) -> dict[str, str]:
    auth_service.logout_session(fun_games_session)
    response.delete_cookie(key=SESSION_COOKIE_NAME, path="/")
    return {"status": "logged_out"}


@router.get("/oauth/providers", response_model=OAuthProvidersResponse)
def oauth_providers() -> OAuthProvidersResponse:
    return OAuthProvidersResponse(providers=oauth_service.list_providers())


@router.post("/oauth/{provider}/callback", response_model=AuthResponse)
def oauth_callback(
    provider: str, payload: OAuthCallbackRequest, response: Response
) -> AuthResponse:
    try:
        user, session_token = oauth_service.oauth_callback(
            provider, payload.code, payload.display_name
        )
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error)) from error

    _set_session_cookie(response, session_token)
    return AuthResponse(user=user, sessionToken=session_token)
