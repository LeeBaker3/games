# Sprint 05: Private Invite Multiplayer

## Sprint Goal
Deliver private invite multiplayer for Tic-Tac-Toe with authoritative server state.

## PRD Trace
- Goals: two-player games through authenticated sessions
- Functional requirements: Two-Player Games
- Core user journeys: two-player private match
- UI and UX requirements: connection feedback, opponent state, reconnect feedback
- Security requirements: invite links, WebSockets, authorization, rate limiting
- Testing and quality requirements: WebSocket and integration tests
- Implementation plan: Phase 5

## Scope
- In scope:
  - Match create/join APIs
  - WebSocket protocol for match state and moves
  - Authoritative server-owned match state
  - Invite-link flow and completion recording
  - Disconnect/reconnect basics
  - Tic-Tac-Toe multiplayer UI
- Out of scope:
  - Public matchmaking
  - Local same-device multiplayer
  - Other multiplayer game modes

## Dependencies
- Sprint 03 auth and identity
- Sprint 01 backend route/session infrastructure
- Optional Redis support for room state

## Deliverables
- Private invite flow from room creation to match completion
- Realtime Tic-Tac-Toe match handling
- Server-side validation of moves and match state

## Acceptance Criteria
- Two authenticated players can create a private match and join through an invite link
- Invalid moves are rejected server-side
- Disconnect/reconnect basics work
- Match outcome is persisted
- WebSocket messaging is stable and documented

## Validation
- Integration tests for match creation/joining
- WebSocket tests for move handling and reconnect behavior
- Manual smoke test of a complete private match
