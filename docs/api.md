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

## TODO
- Add endpoint request and response schemas.
- Add authentication requirements by endpoint.
- Add WebSocket message protocol.
- Add error response format.
