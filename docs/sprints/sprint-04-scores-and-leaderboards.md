# Sprint 04: Scores and Leaderboards

## Sprint Goal
Make authenticated score submission and global all-time leaderboards work for Snake.

## PRD Trace
- Goals: leaderboards for selected games
- Functional requirements: Leaderboards, Game Play score submission rules
- Core user journeys: leaderboard submission
- Non-functional requirements: performance, extensibility
- Security requirements: untrusted score submissions, rate limiting, logging
- Testing and quality requirements: API tests and business-rule validation
- Implementation plan: Phase 4

## Scope
- In scope:
  - Authenticated score submission endpoint
  - Server-side score validation
  - Leaderboard persistence and query APIs
  - Pagination and current-user rank lookup
  - Leaderboard page UI
  - Suspicious-score logging and moderation flags
- Out of scope:
  - Daily/weekly/friends-only leaderboards
  - Tournament or anti-cheat sophistication beyond the PRD
  - Multiplayer scoring

## Dependencies
- Sprint 03 auth and identity
- Sprint 02 Snake scoring model

## Deliverables
- Working score submission for Snake
- Global leaderboard views with paging and current-user rank
- Server-side score integrity checks

## Acceptance Criteria
- Authenticated Snake scores submit successfully
- Anonymous score writes are rejected
- Global all-time leaderboards display correctly by game
- Pagination and current-user rank lookup work
- Invalid or suspicious submissions are handled server-side

## Validation
- Backend contract tests for score submission and leaderboard queries
- Frontend tests for leaderboard rendering and rank display
- Manual review of suspicious-score rejection behavior
