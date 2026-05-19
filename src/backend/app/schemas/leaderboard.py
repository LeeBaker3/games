"""Leaderboard response schemas."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class LeaderboardPlayer(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    display_name: str = Field(alias="displayName")


class LeaderboardEntry(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    rank: int
    user: LeaderboardPlayer
    score: int
    submitted_at: datetime = Field(alias="submittedAt")
    moderation_status: str = Field(alias="moderationStatus")
    moderation_reason: str | None = Field(default=None, alias="moderationReason")


class LeaderboardPageResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    game_slug: str = Field(alias="gameSlug")
    entries: list[LeaderboardEntry]
    total: int
    limit: int
    offset: int
    current_user_rank: int | None = Field(default=None, alias="currentUserRank")


class ScoreSubmissionResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    game_slug: str = Field(alias="gameSlug")
    score: int
    rank: int
    moderation_status: str = Field(alias="moderationStatus")
    moderation_reason: str | None = Field(default=None, alias="moderationReason")
