# Configuration

This document is the source of truth for environment variables, runtime settings, and deployment-specific values.

## Format
- Version: `0.1.0`
- Last updated: `2026-05-18`
- Date format: ISO 8601 (`YYYY-MM-DD`)

## Application Settings
| Name | Required | Default | Purpose | Notes |
| --- | --- | --- | --- | --- |
| `APP_ENV` | Yes | `development` | Controls runtime behavior. | Use `development`, `staging`, or `production`. |
| `APP_NAME` | No | `Fun Games` | Human-readable app name. | Displayed in UI and logs where appropriate. |
| `APP_VERSION` | No | `0.1.0` | Application release version. | Should follow semantic versioning. |

## Backend Settings
| Name | Required | Default | Purpose | Notes |
| --- | --- | --- | --- | --- |
| `DATABASE_URL` | Yes | None | PostgreSQL connection string. | Required for backend startup. |
| `SECRET_KEY` | Yes | None | Signing key for sessions or tokens. | Must never be committed. |
| `CORS_ORIGINS` | Yes | None | Allowed frontend origins. | Comma-separated list. |
| `LOG_LEVEL` | No | `info` | Logging verbosity. | Use lowercase values. |

## Runtime Notes
- `APP_NAME`, `APP_VERSION`, `APP_ENV`, `LOG_LEVEL`, and `CORS_ORIGINS` are consumed by the backend runtime settings layer.
- `INVITE_LINK_TTL_MINUTES` documents the intended private-room expiry window for the multiplayer scaffold.
- Keep deployment-only values out of source control and provide them through the hosting platform or secret store.

## Auth and Multiplayer Settings
| Name | Required | Default | Purpose | Notes |
| --- | --- | --- | --- | --- |
| `OAUTH_CLIENT_ID` | Optional | None | OAuth client ID. | Provider-specific values will be documented when enabled. |
| `OAUTH_CLIENT_SECRET` | Optional | None | OAuth client secret. | Never commit. |
| `INVITE_LINK_TTL_MINUTES` | No | `60` | Invite-link expiry window. | Used for private multiplayer room tokens. |

## Documentation Rules
- Update this file whenever a setting is added, removed, renamed, or changes meaning.
- Note migration guidance for breaking config changes.
- Mark production-only values clearly.
- Keep descriptions short and precise.
