from fastapi.testclient import TestClient

from app.main import app
from app.services.auth_service import reset_auth_store


def setup_function() -> None:
    reset_auth_store()


def test_health_endpoint_returns_ok_status() -> None:
    client = TestClient(app)

    response = client.get("/api/v1/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
