# Sprint 01: Foundation and Contracts

## Sprint Goal
Establish the platform skeleton, versioned API shape, shared game contract, and public-repo hygiene.

## PRD Trace
- Purpose / background: sections 1-2
- Goals: all goals, especially backend/frontend maintainability and quality expectations
- Functional requirements: game catalog foundation, user account plumbing, leaderboards, and match scaffolding
- Non-functional requirements: fast startup, browser compatibility, extensibility
- UI and UX requirements: app shell, hub-first layout, clear account prompts
- Accessibility requirements: keyboard-friendly foundation and contrast-aware UI tokens
- Security requirements: untrusted input, secrets handling, least-privilege defaults
- Testing and quality requirements: behavior-focused tests, linting, type checking, CI
- Deployment and environment requirements: platform-neutral setup, ASGI backend, static frontend, PostgreSQL, optional Redis
- Risks and mitigations: scope creep, route inconsistency, API versioning drift
- Implementation plan: Phase 1

## Scope
- In scope:
  - FastAPI app scaffold and `/api/v1` versioning
  - Health endpoint
  - React + TypeScript + Vite shell
  - Shared game manifest schema
  - Backend config, DB, and session wiring
  - Frontend app shell and styling tokens
  - CI command entry points and repo hygiene
- Out of scope:
  - Real gameplay logic
  - OAuth provider wiring beyond abstractions
  - Leaderboard persistence
  - Multiplayer match flow

## Dependencies
- Accepted stack decisions in the PRD and ADRs
- Public repo and GitHub workflow setup

## Deliverables
- Backend app skeleton with versioned routes
- Frontend shell and shared manifest contract
- Base docs and repo configuration
- CI workflow and behavior-focused test foundation

## Acceptance Criteria
- Backend health endpoint responds under `/api/v1/health`
- Frontend builds and renders the app shell
- Shared manifest schema exists and is referenced by game manifests
- Repository has formatting, linting, type-check, and test commands
- CI runs backend tests/lint and frontend typecheck/tests/build
- README/config/changelog instructions remain synchronized with the implementation

## Validation
- Backend unit test for health endpoint
- Frontend typecheck and build
- CI workflow execution on pull requests
