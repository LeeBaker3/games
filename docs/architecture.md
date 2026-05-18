# Architecture

This document will describe the platform architecture for the fun games website.

## Current Direction
- Backend: Python FastAPI ASGI service.
- Frontend: React, TypeScript, Vite, HTML5, and CSS.
- Data: PostgreSQL for persistent data.
- Realtime: WebSockets for private invite two-player games.
- Optional infrastructure: Redis for sessions, rate limiting, and realtime private room state.

## TODO
- Add system context diagram.
- Add backend service boundaries.
- Add frontend module boundaries.
- Add data flow for accounts, leaderboards, and private invite multiplayer.
- Add deployment topology once a platform is selected.
