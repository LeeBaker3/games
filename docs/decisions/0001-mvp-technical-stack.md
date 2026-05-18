# ADR 0001: MVP Technical Stack

## Status
Accepted

## Context
The MVP needs a Python backend, browser-based games, optional accounts, leaderboards, and private invite multiplayer.

## Decision
- Use FastAPI for the Python backend unless a later architecture decision changes it.
- Use React, TypeScript, Vite, HTML5, and CSS for the frontend.
- Use PostgreSQL for persistent application data.
- Use WebSockets for realtime private invite two-player games.
- Treat Redis as optional infrastructure for sessions, rate limiting, and realtime private room state.

## Consequences
- Backend and frontend can be developed independently under `src/backend` and `src/frontend`.
- API contracts and shared schemas should be kept explicit under `src/shared` where useful.
- CI should include backend tests, frontend tests, type checks, and linting once tooling is installed.
