"""Private invite match routes."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.dependencies import get_current_user
from app.schemas.match import CreateMatchRequest, JoinMatchRequest, MatchSummary
from app.schemas.user import UserProfile
from app.services import match_service

router = APIRouter(prefix="/matches", tags=["matches"])


@router.post("", response_model=MatchSummary)
def create_match(
	payload: CreateMatchRequest,
	current_user: UserProfile = Depends(get_current_user),
) -> MatchSummary:
	try:
		return match_service.create_match(payload.game_slug, current_user)
	except ValueError as error:
		raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error)) from error


@router.get("/{match_id}", response_model=MatchSummary)
def get_match(match_id: str, current_user: UserProfile = Depends(get_current_user)) -> MatchSummary:
	try:
		match = match_service.get_match_by_id(match_id)
	except ValueError as error:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error)) from error

	if match.host.id != current_user.id and (match.guest is None or match.guest.id != current_user.id):
		raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
	return match


@router.post("/{match_id}/join", response_model=MatchSummary)
def join_match(
	match_id: str,
	payload: JoinMatchRequest,
	current_user: UserProfile = Depends(get_current_user),
) -> MatchSummary:
	try:
		match = match_service.get_match_by_id(match_id)
		if match.invite_token != payload.invite_token:
			raise ValueError("Invite token does not match the room")
		return match_service.join_match(payload.invite_token, current_user)
	except ValueError as error:
		raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error)) from error
