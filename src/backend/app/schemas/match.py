"""Private invite match schemas."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class MatchPlayer(BaseModel):
	model_config = ConfigDict(populate_by_name=True)

	id: str
	display_name: str = Field(alias="displayName")


class MatchSummary(BaseModel):
	model_config = ConfigDict(populate_by_name=True)

	id: str
	game_slug: str = Field(alias="gameSlug")
	invite_token: str = Field(alias="inviteToken")
	status: str
	host: MatchPlayer
	guest: MatchPlayer | None = None
	winner: MatchPlayer | None = None
	created_at: datetime = Field(alias="createdAt")
	updated_at: datetime = Field(alias="updatedAt")


class CreateMatchRequest(BaseModel):
	game_slug: str = Field(alias="gameSlug")


class JoinMatchRequest(BaseModel):
	invite_token: str = Field(alias="inviteToken")


class MatchMoveRequest(BaseModel):
	row: int = Field(ge=0, le=2)
	col: int = Field(ge=0, le=2)


class MatchEventResponse(BaseModel):
	model_config = ConfigDict(populate_by_name=True)

	match: MatchSummary
	message: str
