"""Authentication request and response schemas."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.schemas.user import UserProfile


class RegisterRequest(BaseModel):
    display_name: str = Field(alias="displayName", min_length=1, max_length=80)
    email: str
    password: str = Field(min_length=8, max_length=128)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        normalized_value = value.strip().lower()
        if (
            "@" not in normalized_value
            or normalized_value.startswith("@")
            or normalized_value.endswith("@")
        ):
            raise ValueError("Invalid email address")
        return normalized_value


class LoginRequest(BaseModel):
    email: str
    password: str = Field(min_length=8, max_length=128)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        normalized_value = value.strip().lower()
        if (
            "@" not in normalized_value
            or normalized_value.startswith("@")
            or normalized_value.endswith("@")
        ):
            raise ValueError("Invalid email address")
        return normalized_value


class OAuthCallbackRequest(BaseModel):
    code: str = Field(min_length=1, max_length=128)
    display_name: str | None = Field(default=None, alias="displayName", max_length=80)


class AuthResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    user: UserProfile
    session_token: str = Field(alias="sessionToken")


class OAuthProvidersResponse(BaseModel):
    providers: list[str]
