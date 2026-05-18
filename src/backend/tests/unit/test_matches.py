from fastapi.testclient import TestClient

from app.main import app
from app.services.auth_service import reset_auth_store
from app.services.match_service import reset_match_store


def setup_function() -> None:
    reset_auth_store()
    reset_match_store()


def _register(client: TestClient, email: str, display_name: str) -> None:
    response = client.post(
        "/api/v1/auth/register",
        json={
            "displayName": display_name,
            "email": email,
            "password": "supersecure1",
        },
    )
    assert response.status_code == 200


def test_create_join_and_retrieve_private_match() -> None:
    host_client = TestClient(app)
    guest_client = TestClient(app)
    _register(host_client, "host@example.com", "Host Player")
    _register(guest_client, "guest@example.com", "Guest Player")

    create_response = host_client.post("/api/v1/matches", json={"gameSlug": "tic-tac-toe"})
    assert create_response.status_code == 200
    match = create_response.json()
    assert match["status"] == "waiting"

    join_response = guest_client.post(
        f"/api/v1/matches/{match['id']}/join",
        json={"inviteToken": match["inviteToken"]},
    )
    assert join_response.status_code == 200
    assert join_response.json()["status"] == "active"

    host_get_response = host_client.get(f"/api/v1/matches/{match['id']}")
    assert host_get_response.status_code == 200
    assert host_get_response.json()["guest"]["displayName"] == "Guest Player"


def test_match_access_requires_participation() -> None:
    host_client = TestClient(app)
    outsider_client = TestClient(app)
    _register(host_client, "host@example.com", "Host Player")
    _register(outsider_client, "outsider@example.com", "Outsider")

    match = host_client.post("/api/v1/matches", json={"gameSlug": "tic-tac-toe"}).json()

    outsider_response = outsider_client.get(f"/api/v1/matches/{match['id']}")
    assert outsider_response.status_code == 403


def test_join_rejects_wrong_token() -> None:
    host_client = TestClient(app)
    guest_client = TestClient(app)
    _register(host_client, "host@example.com", "Host Player")
    _register(guest_client, "guest@example.com", "Guest Player")

    match = host_client.post("/api/v1/matches", json={"gameSlug": "tic-tac-toe"}).json()
    join_response = guest_client.post(
        f"/api/v1/matches/{match['id']}/join",
        json={"inviteToken": "wrong-token"},
    )

    assert join_response.status_code == 400