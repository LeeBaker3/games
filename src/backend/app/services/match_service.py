"""Private invite match business logic."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from uuid import uuid4

from app.schemas.match import MatchPlayer, MatchSummary
from app.schemas.user import UserProfile
from app.services.invite_service import create_invite_token

SUPPORTED_MATCH_GAMES = {"tic-tac-toe"}


@dataclass(slots=True)
class MatchRecord:
	id: str
	game_slug: str
	invite_token: str
	host: UserProfile
	guest: UserProfile | None
	board: list[list[str | None]]
	status: str
	winner_id: str | None
	created_at: datetime
	updated_at: datetime


_matches_by_id: dict[str, MatchRecord] = {}
_matches_by_token: dict[str, MatchRecord] = {}


def _now() -> datetime:
	return datetime.now(timezone.utc)


def _ensure_supported_game(game_slug: str) -> None:
	if game_slug not in SUPPORTED_MATCH_GAMES:
		raise ValueError("Unsupported game")


def _create_board() -> list[list[str | None]]:
	return [[None, None, None] for _ in range(3)]


def _to_player(user: UserProfile | None) -> MatchPlayer | None:
	if user is None:
		return None
	return MatchPlayer(id=user.id, displayName=user.display_name)


def _to_summary(record: MatchRecord) -> MatchSummary:
	winner = None
	if record.winner_id == record.host.id:
		winner = _to_player(record.host)
	elif record.guest is not None and record.winner_id == record.guest.id:
		winner = _to_player(record.guest)

	return MatchSummary(
		id=record.id,
		gameSlug=record.game_slug,
		inviteToken=record.invite_token,
		status=record.status,
		host=_to_player(record.host),
		guest=_to_player(record.guest),
		winner=winner,
		createdAt=record.created_at,
		updatedAt=record.updated_at,
	)


def create_match(game_slug: str, host: UserProfile) -> MatchSummary:
	_ensure_supported_game(game_slug)

	record = MatchRecord(
		id=str(uuid4()),
		game_slug=game_slug,
		invite_token=create_invite_token(),
		host=host,
		guest=None,
		board=_create_board(),
		status="waiting",
		winner_id=None,
		created_at=_now(),
		updated_at=_now(),
	)
	_matches_by_id[record.id] = record
	_matches_by_token[record.invite_token] = record
	return _to_summary(record)


def join_match(invite_token: str, guest: UserProfile) -> MatchSummary:
	record = _matches_by_token.get(invite_token)
	if record is None:
		raise ValueError("Invite token not found")
	if record.status == "complete":
		raise ValueError("Match has already completed")
	if record.host.id == guest.id:
		raise ValueError("Host cannot join their own match")
	if record.guest is not None and record.guest.id != guest.id:
		raise ValueError("Match already has a guest")

	record.guest = guest
	record.status = "active"
	record.updated_at = _now()
	return _to_summary(record)


def record_move(match_id: str, user_id: str, row: int, col: int) -> MatchSummary:
	record = _matches_by_id.get(match_id)
	if record is None:
		raise ValueError("Match not found")
	if record.status != "active":
		raise ValueError("Match is not active")
	if record.guest is None:
		raise ValueError("Waiting for second player")

	is_host_turn = sum(1 for row_cells in record.board for cell in row_cells if cell is not None) % 2 == 0
	expected_player = record.host if is_host_turn else record.guest
	if expected_player is None or expected_player.id != user_id:
		raise ValueError("It is not your turn")
	if record.board[row][col] is not None:
		raise ValueError("Cell already occupied")

	record.board[row][col] = "X" if is_host_turn else "O"

	winning_lines = [
		[(0, 0), (0, 1), (0, 2)],
		[(1, 0), (1, 1), (1, 2)],
		[(2, 0), (2, 1), (2, 2)],
		[(0, 0), (1, 0), (2, 0)],
		[(0, 1), (1, 1), (2, 1)],
		[(0, 2), (1, 2), (2, 2)],
		[(0, 0), (1, 1), (2, 2)],
		[(0, 2), (1, 1), (2, 0)],
	]
	symbol = record.board[row][col]
	if any(all(record.board[r][c] == symbol for r, c in line) for line in winning_lines):
		record.status = "complete"
		record.winner_id = user_id
	elif all(cell is not None for row_cells in record.board for cell in row_cells):
		record.status = "complete"
		record.winner_id = None

	record.updated_at = _now()
	return _to_summary(record)


def get_match_by_id(match_id: str) -> MatchSummary:
	record = _matches_by_id.get(match_id)
	if record is None:
		raise ValueError("Match not found")
	return _to_summary(record)


def reset_match_store() -> None:
	_matches_by_id.clear()
	_matches_by_token.clear()
