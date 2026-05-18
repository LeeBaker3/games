# PRD Review Suggestions

## Summary
The PRD is a strong starting point and now captures the key MVP decisions: Maze Chase, Tic-Tac-Toe, Snake, React with TypeScript and Vite, email/password plus OAuth, global all-time leaderboards, private invite links, 13+ casual audience, and platform-neutral deployment.

The main recommended changes are to make the rest of the PRD line up with those decisions and to add a few GitHub delivery and security details before implementation begins.

## Recommended Changes

### 1. Keep Avoiding IP Risk Around Maze Chase
The PRD now uses Maze Chase instead of Pac-Man. Implementation should continue to avoid copied names, art, sounds, level layouts, character designs, and exact arcade trade dress.

Suggested PRD change:
- Keep the original Maze Chase name and slug.
- State that all game assets, names, maps, sounds, and mechanics must be original or properly licensed.

### 2. Align Multiplayer Requirements With Private Invite MVP
The PRD assumptions say MVP two-player support is private invite links, but the user journeys and functional requirements still mention matchmaking queues.

Suggested PRD changes:
- Move matchmaking journey text to future enhancements.
- Change `Registered users can create private rooms or join matchmaking queues` to `Registered users can create private rooms and invite another player with a private link`.
- Update Redis references so MVP focuses on sessions, rate limiting, and realtime room state rather than matchmaking state.

### 3. Specify OAuth Providers
The PRD says OAuth is in scope but does not name providers.

Suggested PRD change:
- Add an open decision or assumption for initial providers, such as Google and GitHub OAuth.
- Include account-linking behavior when the same email is used across email/password and OAuth.

### 4. Update Phase 1 Framework Language
The PRD still says Phase 1 should choose backend and frontend frameworks, but the frontend stack is already decided and FastAPI is assumed.

Suggested PRD change:
- Replace `Choose backend and frontend frameworks` with `Confirm FastAPI backend choice and scaffold React TypeScript Vite frontend`.

### 5. Add GitHub Delivery Requirements
Because the project will be managed through GitHub, the PRD should name delivery expectations.

Suggested PRD additions:
- GitHub issues are the source of implementation tasks.
- Pull requests are required for implementation changes.
- Required checks should include backend lint/test, frontend lint/typecheck/test, E2E smoke checks when available, and security checks.
- Branch protection should be enabled before collaborative development.

### 6. Add Invite Link Security Details
Private invite multiplayer needs explicit security behavior.

Suggested PRD additions:
- Invite links must use high-entropy unguessable tokens.
- Invite links should expire after a configured time or when the match completes.
- Match join requests must verify room state, player identity, and authorization.
- WebSocket connections must authenticate the user and authorize access to the match.

### 7. Add Score Validation Per Game
The PRD says scores should be validated, but each MVP game will need its own rules.

Suggested PRD additions:
- Snake and maze-chase scores should include duration, event count, seed/version metadata, and server-side sanity checks.
- Tic-Tac-Toe leaderboard behavior should be clarified because it is a two-player outcome game, not a normal score-attack game.
- Score submissions should include game version to protect leaderboard integrity after rule changes.

### 8. Clarify Anonymous Versus Authenticated Progress
The PRD says anonymous play is allowed and accounts are required for leaderboards, but it does not specify what happens when anonymous users finish a game.

Suggested PRD addition:
- Anonymous users can see local results and are prompted to sign in before saving a score, but unsaved scores are not guaranteed to persist.

### 9. Add Admin Scope Boundaries
Admin and moderation are mentioned, but MVP scope is not defined.

Suggested PRD change:
- Define MVP admin as database-backed or minimal internal tooling only, unless a full admin UI is explicitly planned.
- Move full admin dashboards to a future phase if not needed for launch.

### 10. Add CI and Release Acceptance Criteria
The acceptance criteria mention tests but not GitHub CI or release readiness.

Suggested PRD additions:
- CI must run required backend and frontend checks on pull requests.
- Release notes must be drafted for each tagged release.
- Deployment docs must describe required environment variables and local setup.
