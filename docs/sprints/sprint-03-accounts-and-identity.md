# Sprint 03: Accounts and Identity

## Sprint Goal
Add email/password and OAuth accounts with profile management and protected-action prompts.

## PRD Trace
- Goals: optional accounts for identity-based features
- Functional requirements: User Accounts
- Core user journeys: account creation, returning user
- Security requirements: password hashing, CSRF/CORS, rate limiting, secrets
- UI and UX requirements: contextual account prompts, profile screens
- Testing and quality requirements: auth route and flow validation
- Implementation plan: Phase 3

## Scope
- In scope:
  - Register/login/logout/me/PATCH me APIs
  - Password hashing and session handling
  - OAuth provider abstraction and callback flow
  - Frontend auth screens and profile page
  - Protected-action gating
- Out of scope:
  - Leaderboards
  - Multiplayer match flow
  - Admin dashboards

## Dependencies
- Sprint 01 backend and frontend scaffold
- Sprint 02 app shell and navigation patterns

## Deliverables
- Auth backend routes and service layer
- Auth UI and profile flow
- Secure session/token handling and rate limiting

## Acceptance Criteria
- Users can register, log in, log out, and update profile details
- OAuth login works for configured providers
- Passwords are not stored in plain text
- Protected actions prompt for authentication
- Auth routes are rate limited and validate input server-side

## Validation
- Backend contract tests for auth routes
- Frontend unit tests for auth state and gating
- Manual verification of login/logout/profile flow
