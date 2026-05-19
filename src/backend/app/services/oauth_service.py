"""OAuth account login and linking logic."""

from __future__ import annotations

from app.schemas.user import UserProfile
from app.services import auth_service, user_service

AVAILABLE_PROVIDERS = ("github", "google")


def list_providers() -> list[str]:
    return list(AVAILABLE_PROVIDERS)


def oauth_callback(
    provider: str, code: str, display_name: str | None = None
) -> tuple[UserProfile, str]:
    normalized_provider = provider.strip().lower()
    if normalized_provider not in AVAILABLE_PROVIDERS:
        raise ValueError("Unsupported OAuth provider")
    if not code.strip():
        raise ValueError("OAuth code is required")

    email = f"{normalized_provider}+{code.strip().lower()}@oauth.local"
    user = user_service.get_user_by_email(email)
    if user is None:
        user = user_service.create_user(
            display_name or f"{normalized_provider.title()} User",
            email,
            password_salt=None,
            password_hash=None,
            auth_provider=normalized_provider,
        )

    return user_service.to_profile(user), auth_service._start_session(user.id)
