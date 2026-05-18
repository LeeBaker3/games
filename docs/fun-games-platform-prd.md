# Fun Games Platform PRD

## 1. Purpose
Build a website for a collection of fun browser games with a Python backend and a JavaScript or TypeScript, HTML5, and CSS frontend. Games should be playable without an account for low-friction access, while accounts enable persistent features such as leaderboards, saved profiles, achievements, and two-player or multiplayer experiences.

## 2. Background
The initial repository contains `docs/` and `src/` folders. This PRD defines the first product and technical architecture so implementation can proceed in clear phases without overbuilding the early version.

## 3. Goals
- Provide a polished web experience where users can quickly choose and play multiple games.
- Allow anonymous users to play supported single-player games immediately.
- Support optional user accounts for identity-based features.
- Provide leaderboards for selected games.
- Support two-player games through authenticated sessions.
- Establish a maintainable Python backend and TypeScript-friendly frontend structure.
- Include testing, security, accessibility, and deployment expectations from the beginning.

## 4. Non-Goals
- Native mobile apps for the initial release.
- Real-money wagering, paid prizes, or gambling mechanics.
- Complex social networking features beyond friend or invite flows needed for multiplayer.
- Advanced anti-cheat systems beyond basic server-side validation, rate limiting, and audit logging.
- Full content management tooling for non-developers in the first version.

## 5. Assumptions
- The backend will use Python with FastAPI unless another framework is chosen later.
- The frontend will use React, TypeScript, Vite, HTML5, and CSS.
- PostgreSQL will store accounts, scores, games, matches, and leaderboard data.
- Redis is recommended for sessions, rate limiting, and realtime private room state.
- WebSockets will be used for realtime two-player games.
- Anonymous play is allowed where the game does not require persistent identity.
- Account creation is required before submitting leaderboard scores or joining ranked/two-player games.
- The MVP game catalog will include Maze Chase, Tic-Tac-Toe, and Snake. Maze Chase must use original names, assets, maps, sounds, and visual design rather than protected arcade game branding or trade dress.
- MVP accounts will support email/password authentication and OAuth login. Passkeys are a future enhancement.
- MVP leaderboards will support global all-time rankings per game. Daily, weekly, friends-only, and per-difficulty leaderboards are future enhancements.
- MVP two-player games will support private invite links. Public matchmaking and local same-device multiplayer are future enhancements.
- The target audience is general casual players, roughly ages 13 and older. The MVP will not intentionally target children under 13.
- Deployment will remain platform-neutral for now. The architecture should support common hosts for a Python ASGI backend, static frontend assets, PostgreSQL, and optional Redis.

## 6. Open Questions
All initial PRD open questions have been answered. Future implementation planning may introduce more detailed decisions for game rules, visual design, OAuth providers, hosting, and operations.

## 7. Target Users
- Casual anonymous player: wants to open the site and play a quick game without signing up.
- Registered competitor: wants persistent scores, achievements, and leaderboard placement.
- Two-player participant: wants to invite or match with another player and play in realtime.
- Admin or maintainer: wants to add games, moderate user data, investigate issues, and keep the platform healthy.

## 8. Core User Journeys
- Anonymous single-player game: user opens the site, chooses a game, plays immediately, and sees local session results.
- Account creation: user signs up, verifies identity if required, logs in, and sees a profile.
- Leaderboard submission: registered user completes a supported game, score is validated by the backend, and leaderboard position updates.
- Two-player private match: registered user creates a room, shares an invite link, second player joins, and both play through a realtime session.
- Returning user: user logs in, sees recent games, scores, achievements, and available multiplayer options.

## 9. Functional Requirements
### 9.1 Game Catalog
- Display a list of available games with title, description, status, supported modes, estimated play time, and thumbnail or preview.
- Support categories such as puzzle, arcade, card, board, reaction, and word games.
- Show whether each game supports anonymous play, leaderboards, achievements, or two-player mode.

### 9.2 Game Play
- Games must run in the browser using HTML5 and JavaScript or TypeScript.
- Single-player games should be playable without login unless the specific game requires identity.
- Games must expose a common lifecycle contract for start, pause, resume, restart, complete, and score submission.
- Games with competitive scoring must use server-side validation where practical.

### 9.3 User Accounts
- Users can register, log in, log out, and manage a basic profile.
- Accounts are optional for anonymous single-player play.
- Accounts are required for leaderboard submission, achievements, persistent history, private invite multiplayer, and two-player online play.
- Password handling must use a modern password hashing algorithm such as Argon2id or bcrypt.

### 9.4 Leaderboards
- Leaderboards must support at least global ranking per game.
- Scores must include user, game, score value, metadata, submission timestamp, and validation status.
- The API must prevent anonymous leaderboard writes.
- Leaderboards should support pagination and rank lookup for the current user.

### 9.5 Two-Player Games
- Registered users can create private rooms and invite another player with a private link.
- The backend owns match state for authoritative multiplayer games.
- Clients communicate realtime moves/events over WebSockets.
- The backend validates moves, handles disconnects, and records match outcomes.

### 9.6 Admin and Moderation
- Admin users can view users, games, scores, matches, and suspicious activity.
- Admin users can hide or invalidate leaderboard entries.
- Admin features can be minimal in the first release but must be considered in the data model.

## 10. Non-Functional Requirements
- Initial page load should feel fast on modern desktop and mobile browsers.
- Game rendering should target 60 FPS where reasonable for simple HTML5 games.
- Backend APIs should return typical read responses under 300 ms in normal conditions.
- The architecture should allow new games to be added with minimal changes to shared platform code.
- The platform should degrade gracefully if realtime services are unavailable.
- Core flows should work on current versions of Chrome, Firefox, Safari, and Edge.

## 11. UI and UX Requirements
- The first screen should be the playable game hub, not a marketing landing page.
- The interface should make anonymous play obvious and low-friction.
- Account prompts should appear only when users attempt account-backed actions such as saving scores, joining leaderboards, or starting online multiplayer.
- Game cards should clearly indicate mode support and login requirements.
- In-game UI should include pause, restart, mute, score, timer or progress, and exit controls where appropriate.
- Multiplayer UI should show connection state, opponent state, turn or timer state, and reconnect feedback.
- Leaderboards should be scannable, paginated, and filterable by game and timeframe once those filters exist.
- Visual design should feel playful, responsive, and clear without compromising readability.

## 12. Accessibility Requirements
- All navigation and non-canvas controls must be keyboard accessible.
- Buttons and controls must have accessible names.
- Color must not be the only indicator of status, rank, success, or error.
- Text contrast should meet WCAG AA for normal UI text.
- Games should include reduced-motion considerations where animation is not essential.
- Canvas-based games should provide fallback instructions or alternative labels where practical.

## 13. Recommended Repository Structure
```text
docs/
  fun-games-platform-prd.md
  api.md
  architecture.md
  decisions/
    0001-mvp-technical-stack.md
    0002-mvp-game-catalog.md
src/
  backend/
    README.md
    pyproject.toml
    app/
      main.py
      api/
        dependencies.py
        routes/
          health.py
          games.py
          auth.py
          users.py
          leaderboards.py
          matches.py
          websocket_matches.py
      core/
        config.py
        security.py
      db/
        models.py
        session.py
      games/
        lifecycle.py
        registry.py
        scoring.py
        multiplayer.py
        maze_chase.py
        snake.py
        tic_tac_toe.py
      services/
        auth_service.py
        oauth_service.py
        user_service.py
        game_service.py
        leaderboard_service.py
        match_service.py
        invite_service.py
      schemas/
        auth.py
        game.py
        user.py
        score.py
        leaderboard.py
        match.py
    migrations/
      README.md
    tests/
      unit/
      integration/
      websocket/
  frontend/
    README.md
    package.json
    tsconfig.json
    vite.config.ts
    public/
    src/
      main.tsx
      App.tsx
      assets/
      components/
        auth/
        game/
        layout/
        leaderboard/
      games/
        shared/
        maze-chase/
        snake/
        tic-tac-toe/
      hooks/
      layouts/
      pages/
      services/
        apiClient.ts
        authClient.ts
        websocketClient.ts
      styles/
      types/
    tests/
      unit/
      e2e/
  shared/
    api-contracts/
    game-manifest.schema.json
```

## 14. Backend Architecture
- Use a Python API service for authentication, game metadata, scores, leaderboards, and match orchestration.
- Use REST endpoints for normal request/response flows.
- Use WebSocket endpoints for realtime two-player gameplay.
- Keep game-specific server logic under `src/backend/app/games/`.
- Use service modules for business logic so route handlers stay thin.
- Use migrations for database schema evolution.
- Prefer typed request and response schemas.

## 15. Frontend Architecture
- Use TypeScript for platform code and game code where possible.
- Keep shared UI components separate from individual game implementations.
- Each game should live in its own folder with manifest metadata, rendering code, styles, tests, and optional assets.
- Use a shared API client for authenticated requests and error handling.
- Use a shared WebSocket client for multiplayer connection lifecycle.
- Keep CSS organized around global tokens, layout utilities, components, and game-specific styles.

## 16. Data Model Requirements
Minimum entities:
- User: identity, display name, email if used, password hash if used, role, created timestamp, status.
- Session or refresh token: user, token metadata, expiry, revocation state.
- Game: slug, title, description, supported modes, active state, version, scoring rules.
- Score: user, game, score value, metadata, validation state, created timestamp.
- Leaderboard entry or materialized ranking: game, timeframe, score, rank data.
- Match: game, players, state, winner, timestamps, disconnect status.
- Match event: match, player, event payload, sequence number, timestamp.
- Achievement: slug, game, title, criteria.
- User achievement: user, achievement, awarded timestamp.

## 17. API Requirements
Initial REST endpoints:
- `GET /api/health` returns service health.
- `GET /api/games` lists games and supported modes.
- `GET /api/games/{slug}` returns game metadata.
- `POST /api/auth/register` creates an account.
- `POST /api/auth/login` authenticates a user.
- `POST /api/auth/logout` ends a session.
- `GET /api/me` returns the current user.
- `PATCH /api/me` updates profile details.
- `GET /api/games/{slug}/leaderboard` returns ranked scores.
- `POST /api/games/{slug}/scores` submits a score for authenticated users.
- `POST /api/matches` creates a private match room.
- `POST /api/matches/{id}/join` joins a match.
- `GET /api/matches/{id}` returns match metadata.

Initial WebSocket endpoints:
- `WS /ws/matches/{id}` connects a player to a match.
- Supported message types should include join acknowledgement, player ready, game event, state snapshot, error, heartbeat, reconnect, and match complete.

API documentation should be generated from backend schemas where possible and supplemented in `docs/api.md`.

## 18. Security and Privacy Requirements
- Use HTTPS in deployed environments.
- Store passwords only as salted, slow hashes.
- Protect authenticated routes with secure session or token validation.
- Use CSRF protection if cookie-based auth is used.
- Configure CORS to allow only approved frontend origins.
- Rate limit login, registration, score submission, private invite, and match endpoints.
- Validate all request payloads on the server.
- Treat client-submitted scores and game events as untrusted.
- Avoid storing unnecessary personal data.
- Log security-relevant events without logging passwords, tokens, or sensitive secrets.
- Provide admin-only access controls for moderation features.

## 19. Testing and Quality Requirements
Backend testing:
- Unit tests for services, scoring rules, auth helpers, and game validation.
- Integration tests for API routes, database behavior, and auth flows.
- WebSocket tests for match lifecycle, disconnects, invalid moves, and completion.

Frontend testing:
- Unit tests for shared components, API clients, game lifecycle helpers, and state handling.
- Game-specific tests for scoring, win/loss conditions, and edge cases.
- E2E tests for anonymous play, registration, login, leaderboard submission, and private match flow.

Quality gates:
- Backend formatting and linting.
- Frontend formatting, linting, and type checking.
- Automated test suite in CI.
- Basic accessibility checks for key pages.

## 20. Analytics, Logging, and Observability
- Track game starts, game completions, account registrations, leaderboard submissions, match starts, match completions, and errors.
- Log API errors with request IDs.
- Log match events sufficiently to debug multiplayer issues.
- Expose health checks for API, database, and realtime dependencies.
- Add performance monitoring for slow API endpoints and frontend errors.

## 21. Deployment and Environment Requirements
- Separate local, test, staging, and production configuration.
- Use environment variables for secrets and deployment-specific settings.
- Use database migrations during deployment.
- Serve frontend assets through a static host or CDN where appropriate.
- Run backend as an ASGI service.
- Use managed PostgreSQL for production if available.
- Use managed Redis or equivalent for production realtime/session support if available.

## 22. Risks and Mitigations
- Score cheating: validate server-side, rate limit submissions, and mark suspicious scores for review.
- Realtime complexity: start with one simple two-player game and a narrow WebSocket protocol.
- Scope creep: ship a small catalog first, then add games and modes incrementally.
- Account friction: keep anonymous play prominent and delay signup prompts until needed.
- Game architecture inconsistency: require each game to follow a manifest and lifecycle contract.

## 23. Phased Implementation Plan
### Phase 1: Foundation
- Confirm FastAPI backend choice and scaffold React TypeScript Vite frontend.
- Create backend and frontend project scaffolding under `src/`.
- Add formatting, linting, type checking, and test commands.
- Implement health endpoint and basic frontend shell.
- Define shared game manifest schema.

### Phase 2: Anonymous Game Hub
- Build game catalog UI.
- Implement one simple single-player game.
- Add shared game lifecycle controls.
- Add local score display without persistence.

### Phase 3: Accounts
- Implement registration, login, logout, and current-user endpoints.
- Add frontend auth state and account screens.
- Protect account-backed actions.

### Phase 4: Leaderboards
- Implement score submission for authenticated users.
- Add leaderboard API and UI.
- Add basic server-side score validation for the first game.

### Phase 5: Two-Player Foundation
- Implement match creation and joining.
- Implement WebSocket match channel.
- Build one simple two-player game mode.
- Handle disconnect and reconnect basics.

### Phase 6: Hardening and Expansion
- Add admin moderation basics.
- Add analytics and observability.
- Add more games.
- Expand leaderboard filters and multiplayer options.
- Improve accessibility and performance.

## 24. Acceptance Criteria
- Users can open the website and play at least one game without an account.
- Users can create an account and log in.
- Authenticated users can submit a valid score to a leaderboard.
- Users can view leaderboards by game.
- Authenticated users can create and join at least one two-player match type.
- The repository contains clear backend, frontend, shared, and docs structure.
- Backend and frontend have automated tests for critical flows.
- Security basics are implemented for auth, input validation, rate limiting, and secret handling.
- The UI is responsive, accessible for core controls, and clear about which actions require an account.
