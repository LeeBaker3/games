"""User profile schemas."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class UserProfile(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    display_name: str = Field(alias="displayName")
    email: str
    auth_provider: str | None = Field(default=None, alias="authProvider")
    created_at: datetime = Field(alias="createdAt")

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


class UpdateProfileRequest(BaseModel):
    display_name: str = Field(alias="displayName", min_length=1, max_length=80)
