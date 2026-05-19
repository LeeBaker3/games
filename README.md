# Fun Games

Browser games platform with a Python backend and a React + TypeScript + Vite frontend.

## Documentation
- [Product requirements](docs/fun-games-platform-prd.md)
- [Agent operating model](docs/agent-operating-model.md)
- [Model recommendations](docs/agent-model-recommendations.md)
- [PRD review notes](docs/prd-review-suggestions.md)

## Current Scope
- Versioned backend routes under `/api/v1`
- Anonymous game hub with Maze Chase and Snake
- Accounts, identity, Snake leaderboards, private invite multiplayer, and release hardening

## Planned stack
- Backend: FastAPI ASGI service
- Frontend: React, TypeScript, Vite, HTML5, and CSS
- Data: PostgreSQL for persistent application data
- Realtime: WebSockets for private invite multiplayer
- Optional infrastructure: Redis for sessions, rate limiting, and room state
