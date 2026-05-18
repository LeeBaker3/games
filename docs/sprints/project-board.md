# GitHub Project Board Structure

## Purpose
Use a simple GitHub project board to track sprint work from backlog to done without overcomplicating the MVP delivery process.

## Recommended Columns
1. Backlog
2. Ready
3. In Progress
4. In Review
5. Blocked
6. Done

## How to Use the Board
- Put all sprint child issues in Backlog first.
- Move an issue to Ready when the sprint is approved and its dependencies are clear.
- Move an issue to In Progress only when active implementation has started.
- Move an issue to In Review when implementation and local validation are complete.
- Move an issue to Blocked if it cannot proceed because of a dependency, decision, or external constraint.
- Move an issue to Done only after merge and validation.

## Suggested Swimlanes
- Sprint 0: Project Setup and PRD Baseline
- Sprint 1: Foundation and Contracts
- Sprint 2: Anonymous Game Hub
- Sprint 3: Accounts and Identity
- Sprint 4: Scores and Leaderboards
- Sprint 5: Private Invite Multiplayer
- Sprint 6: Maze Chase and Release Hardening

## Issue Hygiene
- Every issue should include a PRD trace, scope, acceptance criteria, and validation notes.
- Keep parent sprint issues as epics or summary issues.
- Use child issues for implementation slices that can be completed and reviewed independently.
- Use labels for area, type, and status rather than multiplying board columns.
