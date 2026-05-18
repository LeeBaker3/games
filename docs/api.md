# API Documentation

The backend API should be documented from FastAPI-generated OpenAPI schemas where possible.

## API Versioning
- All public backend endpoints should live under `/api/v1` unless a later breaking release intentionally introduces a new version.
- Breaking API changes should be introduced as a new versioned prefix rather than silently changing existing routes.
- Route names should remain stable within a version once published.

## Route Naming Conventions
- Use plural resource names for collection routes, such as `/games`, `/leaderboards`, and `/matches`.
- Use singleton or action routes only when the endpoint is not a collection, such as `/health` or `/me`.
- Keep route modules aligned with the API area they serve.
- Check the existing route modules under `src/backend/app/api/routes` before adding a new route so naming stays consistent.

## Initial API Areas
- Health checks
- Game catalog
- Authentication and OAuth
- Current user profile
- Leaderboards
- Score submission
- Private invite matches
- Match WebSockets

## Sprint 3 Routes
- `POST /api/v1/auth/register` creates an account and starts a session.
- `POST /api/v1/auth/login` authenticates a user with email and password.
- `POST /api/v1/auth/logout` ends the current session.
- `GET /api/v1/auth/oauth/providers` lists supported OAuth providers.
- `POST /api/v1/auth/oauth/{provider}/callback` completes the provider callback flow.
- `GET /api/v1/me` returns the current user profile.
- `PATCH /api/v1/me` updates the current user display name.

## Sprint 4 Routes
- `GET /api/v1/games/{slug}/leaderboard` returns the global all-time leaderboard for a game.
- `POST /api/v1/games/{slug}/scores` submits an authenticated score for a game.

## Score Rules
- Score submissions require an authenticated session.
- Leaderboard queries are public but can include the current user's rank when a session cookie is present.
- Suspicious scores are flagged server-side and surfaced with moderation metadata.

## Session Notes
- Authentication currently uses an HTTP-only cookie session for the MVP scaffold.
- Accounts and profiles are wired through backend services and the frontend auth client.
- Leaderboard data is currently stored in memory for the MVP scaffold.

## TODO
- Add endpoint request and response schemas.
- Add authentication requirements by endpoint.
- Add WebSocket message protocol.
- Add error response format.
