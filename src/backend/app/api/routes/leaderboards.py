"""Leaderboard and score submission routes."""

from __future__ import annotations

from fastapi import APIRouter, Cookie, Depends, HTTPException, Query, status

from app.api.dependencies import get_current_user
from app.core.security import SESSION_COOKIE_NAME
from app.schemas.leaderboard import LeaderboardPageResponse, ScoreSubmissionResponse
from app.schemas.score import SubmitScoreRequest
from app.schemas.user import UserProfile
from app.services import auth_service, leaderboard_service

router = APIRouter(prefix="/games", tags=["leaderboards"])


@router.get("/{game_slug}/leaderboard", response_model=LeaderboardPageResponse)
def get_leaderboard(
    game_slug: str,
    limit: int = Query(default=10, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    fun_games_session: str | None = Cookie(default=None, alias=SESSION_COOKIE_NAME),
) -> LeaderboardPageResponse:
    current_user = auth_service.get_current_user(fun_games_session)
    current_user_id = current_user.id if current_user is not None else None

    try:
        return leaderboard_service.get_leaderboard_page(
            game_slug,
            limit=limit,
            offset=offset,
            current_user_id=current_user_id,
        )
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error)) from error


@router.post("/{game_slug}/scores", response_model=ScoreSubmissionResponse)
def submit_score(
    game_slug: str,
    payload: SubmitScoreRequest,
    current_user: UserProfile = Depends(get_current_user),
) -> ScoreSubmissionResponse:
    try:
        record = leaderboard_service.submit_score(game_slug, current_user, payload)
        rank = leaderboard_service.get_submission_rank(game_slug, current_user.id)
        if rank is None:
            raise ValueError("Leaderboard rank could not be determined")
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error)) from error

    return ScoreSubmissionResponse(
        gameSlug=record.game_slug,
        score=record.score,
        rank=rank,
        moderationStatus=record.moderation_status,
        moderationReason=record.moderation_reason,
    )
