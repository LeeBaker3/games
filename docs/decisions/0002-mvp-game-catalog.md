# ADR 0002: MVP Game Catalog

## Status
Accepted

## Context
The MVP should launch with three familiar, approachable games while avoiding protected names, assets, maps, sounds, and trade dress.

## Decision
The MVP game catalog will include:
- Maze Chase: an original maze-chase game with original visual design and assets.
- Tic-Tac-Toe: a simple two-player game suitable for private invite multiplayer.
- Snake: a classic single-player score game suitable for anonymous play and leaderboards.

## Consequences
- Repository folders should use the slugs `maze-chase`, `tic-tac-toe`, and `snake` on the frontend.
- Backend modules should use Python-safe names: `maze_chase`, `tic_tac_toe`, and `snake`.
- Game manifests should describe supported modes, leaderboard behavior, and account requirements.
