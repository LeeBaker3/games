"""Leaderboard and score submission business logic."""

from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone

from app.schemas.leaderboard import LeaderboardEntry, LeaderboardPageResponse, LeaderboardPlayer
from app.schemas.score import SubmitScoreRequest
from app.schemas.user import UserProfile

SUPPORTED_GAME_SLUGS = {"snake"}
SUSPICIOUS_SCORE_THRESHOLD = 80


@dataclass(slots=True)
class ScoreRecord:
    user_id: str
    display_name: str
    game_slug: str
    score: int
    metadata: dict[str, str]
    submitted_at: datetime
    moderation_status: str
    moderation_reason: str | None


_submissions_by_game: dict[str, list[ScoreRecord]] = defaultdict(list)


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _ensure_supported_game(game_slug: str) -> None:
    if game_slug not in SUPPORTED_GAME_SLUGS:
        raise ValueError("Unsupported game")


def _best_records_for_game(game_slug: str) -> list[ScoreRecord]:
    best_by_user: dict[str, ScoreRecord] = {}

    for record in _submissions_by_game.get(game_slug, []):
        existing_record = best_by_user.get(record.user_id)
        if existing_record is None:
            best_by_user[record.user_id] = record
            continue

        if record.score > existing_record.score:
            best_by_user[record.user_id] = record
            continue

        if (
            record.score == existing_record.score
            and record.submitted_at < existing_record.submitted_at
        ):
            best_by_user[record.user_id] = record

    return sorted(
        best_by_user.values(),
        key=lambda record: (-record.score, record.submitted_at, record.user_id),
    )


def _to_entry(record: ScoreRecord, rank: int) -> LeaderboardEntry:
    return LeaderboardEntry(
        rank=rank,
        user=LeaderboardPlayer(id=record.user_id, displayName=record.display_name),
        score=record.score,
        submittedAt=record.submitted_at,
        moderationStatus=record.moderation_status,
        moderationReason=record.moderation_reason,
    )


def submit_score(
    game_slug: str, current_user: UserProfile, payload: SubmitScoreRequest
) -> ScoreRecord:
    _ensure_supported_game(game_slug)

    moderation_status = "flagged" if payload.score >= SUSPICIOUS_SCORE_THRESHOLD else "approved"
    moderation_reason = None
    if moderation_status == "flagged":
        moderation_reason = "Score exceeds the expected Snake range and was flagged for review."

    record = ScoreRecord(
        user_id=current_user.id,
        display_name=current_user.display_name,
        game_slug=game_slug,
        score=payload.score,
        metadata=payload.metadata,
        submitted_at=_now(),
        moderation_status=moderation_status,
        moderation_reason=moderation_reason,
    )
    _submissions_by_game[game_slug].append(record)
    return record


def get_leaderboard_page(
    game_slug: str,
    *,
    limit: int = 10,
    offset: int = 0,
    current_user_id: str | None = None,
) -> LeaderboardPageResponse:
    _ensure_supported_game(game_slug)

    if limit < 1 or limit > 100:
        raise ValueError("Limit must be between 1 and 100")
    if offset < 0:
        raise ValueError("Offset must be zero or greater")

    ranked_records = _best_records_for_game(game_slug)
    current_user_rank = None

    for index, record in enumerate(ranked_records, start=1):
        if current_user_id is not None and record.user_id == current_user_id:
            current_user_rank = index
            break

    page_records = ranked_records[offset : offset + limit]
    entries = [
        _to_entry(record, rank=index + offset + 1) for index, record in enumerate(page_records)
    ]

    return LeaderboardPageResponse(
        gameSlug=game_slug,
        entries=entries,
        total=len(ranked_records),
        limit=limit,
        offset=offset,
        currentUserRank=current_user_rank,
    )


def get_submission_rank(game_slug: str, current_user_id: str) -> int | None:
    _ensure_supported_game(game_slug)

    ranked_records = _best_records_for_game(game_slug)
    for index, record in enumerate(ranked_records, start=1):
        if record.user_id == current_user_id:
            return index
    return None


def reset_leaderboard_store() -> None:
    _submissions_by_game.clear()
