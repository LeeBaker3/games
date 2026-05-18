from fastapi.testclient import TestClient

from app.main import app
from app.services.auth_service import reset_auth_store
from app.services.leaderboard_service import reset_leaderboard_store


def setup_function() -> None:
    reset_auth_store()
    reset_leaderboard_store()


def test_authenticated_score_submission_updates_leaderboard() -> None:
    first_client = TestClient(app)
    second_client = TestClient(app)

    first_client.post(
        "/api/v1/auth/register",
        json={
            "displayName": "Player One",
            "email": "one@example.com",
            "password": "supersecure1",
        },
    )
    first_submission = first_client.post(
        "/api/v1/games/snake/scores",
        json={"score": 12, "metadata": {"mode": "survival"}},
    )

    assert first_submission.status_code == 200
    assert first_submission.json()["rank"] == 1

    second_client.post(
        "/api/v1/auth/register",
        json={
            "displayName": "Player Two",
            "email": "two@example.com",
            "password": "supersecure1",
        },
    )
    second_submission = second_client.post(
        "/api/v1/games/snake/scores",
        json={"score": 18, "metadata": {"mode": "survival"}},
    )

    assert second_submission.status_code == 200
    assert second_submission.json()["rank"] == 1

    leaderboard_response = second_client.get("/api/v1/games/snake/leaderboard?limit=10&offset=0")
    assert leaderboard_response.status_code == 200
    payload = leaderboard_response.json()
    assert payload["currentUserRank"] == 1
    assert payload["entries"][0]["score"] == 18
    assert payload["entries"][1]["score"] == 12


def test_anonymous_score_submission_is_rejected() -> None:
    client = TestClient(app)

    response = client.post("/api/v1/games/snake/scores", json={"score": 10, "metadata": {}})

    assert response.status_code == 401


def test_suspicious_scores_are_flagged() -> None:
    client = TestClient(app)

    client.post(
        "/api/v1/auth/register",
        json={
            "displayName": "Speed Runner",
            "email": "speed@example.com",
            "password": "supersecure1",
        },
    )
    response = client.post(
        "/api/v1/games/snake/scores",
        json={"score": 90, "metadata": {"mode": "survival"}},
    )

    assert response.status_code == 200
    assert response.json()["moderationStatus"] == "flagged"
    assert response.json()["moderationReason"] is not None
