"""Private invite token business logic."""

from __future__ import annotations

import secrets


def create_invite_token() -> str:
	return secrets.token_urlsafe(24)
