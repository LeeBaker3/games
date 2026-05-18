# Architecture

This document will describe the platform architecture for the fun games website.

## Current Direction
- Backend: Python FastAPI ASGI service.
- Frontend: React, TypeScript, Vite, HTML5, and CSS.
- Data: PostgreSQL for persistent data.
- Realtime: WebSockets for private invite two-player games.
- Optional infrastructure: Redis for sessions, rate limiting, and realtime private room state.

## Deployment Topology
- Run the backend as an ASGI service behind a platform-provided reverse proxy.
- Serve the frontend as static assets from a platform-neutral host or CDN.
- Use PostgreSQL for persistent records once persistent storage is wired in.
- Treat Redis as optional runtime infrastructure for shared session, rate-limit, and room-state data.
- Keep CORS restricted to the configured frontend origin list.

## TODO
- Add system context diagram.
- Add backend service boundaries.
- Add frontend module boundaries.
- Add data flow for accounts, leaderboards, and private invite multiplayer.
