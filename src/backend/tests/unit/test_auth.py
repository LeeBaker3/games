from fastapi.testclient import TestClient

from app.main import app
from app.services.auth_service import reset_auth_store


def setup_function() -> None:
    reset_auth_store()


def test_register_login_profile_and_logout_flow() -> None:
    client = TestClient(app)

    register_response = client.post(
        "/api/v1/auth/register",
        json={
            "displayName": "Ada Lovelace",
            "email": "ada@example.com",
            "password": "supersecure1",
        },
    )

    assert register_response.status_code == 200
    assert register_response.json()["user"]["displayName"] == "Ada Lovelace"

    me_response = client.get("/api/v1/me")
    assert me_response.status_code == 200
    assert me_response.json()["email"] == "ada@example.com"

    logout_response = client.post("/api/v1/auth/logout")
    assert logout_response.status_code == 200

    unauthorized_response = client.get("/api/v1/me")
    assert unauthorized_response.status_code == 401


def test_login_rejects_bad_credentials() -> None:
    client = TestClient(app)

    login_response = client.post(
        "/api/v1/auth/login",
        json={"email": "missing@example.com", "password": "supersecure1"},
    )

    assert login_response.status_code == 401


def test_oauth_provider_callback_and_profile_update() -> None:
    client = TestClient(app)

    providers_response = client.get("/api/v1/auth/oauth/providers")
    assert providers_response.status_code == 200
    assert providers_response.json()["providers"] == ["github", "google"]

    oauth_response = client.post(
        "/api/v1/auth/oauth/github/callback",
        json={"code": "github-123", "displayName": "GitHub Pilot"},
    )

    assert oauth_response.status_code == 200
    assert oauth_response.json()["user"]["authProvider"] == "github"

    profile_response = client.patch("/api/v1/me", json={"displayName": "GitHub Pilot Updated"})
    assert profile_response.status_code == 200
    assert profile_response.json()["displayName"] == "GitHub Pilot Updated"
