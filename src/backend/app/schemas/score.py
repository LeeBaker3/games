"""Score submission schemas."""

from __future__ import annotations

from pydantic import BaseModel, Field


class SubmitScoreRequest(BaseModel):
    score: int = Field(ge=0, le=1000)
    metadata: dict[str, str] = Field(default_factory=dict)
