# Agent Operating Model

## Purpose
This document defines the agent team for the fun games platform and how work should flow through GitHub-managed issues, pull requests, reviews, releases, and documentation.

## Agent Roster
| Agent | Primary purpose | Core skills | Workspace tools | Model pair | GitHub-managed workflow needs |
| --- | --- | --- | --- | --- | --- |
| Orchestrator Agent | Coordinates work end to end and delegates to specialist agents. | Triage, scoping, sequencing, validation planning, status reporting. | `read`, `search`, `edit`, `execute`, `agent`, `todo` | Primary: `GPT-5.4 mini (copilot)`; secondary: `GPT-5.4 (copilot)` | GitHub issue triage, project board updates, branch/PR coordination, review routing. |
| Architecture Agent | Produces and maintains PRDs, architecture plans, repo structure, API plans, security plans, testing plans, and implementation plans. | Product architecture, requirements writing, technical design, tradeoff analysis. | `read`, `search`, `edit` | Primary: `GPT-5.5 (copilot)`; secondary: `GPT-5.4 (copilot)` | Architecture decision records, PRD updates, issue-ready implementation plans. |
| Planner Agent | Converts PRDs and feature ideas into implementation slices. | Milestone planning, dependency mapping, acceptance criteria, issue breakdown. | `read`, `search`, `edit`, `todo`, `agent` | Primary: `GPT-5.4 mini (copilot)`; secondary: `GPT-5.4 (copilot)` | GitHub milestones, issues, labels, project board columns, acceptance criteria. |
| Developer Agent | Implements backend, frontend, shared contracts, and game features. | FastAPI, React, TypeScript, Vite, HTML5 games, WebSockets, database integration. | `read`, `search`, `edit`, `execute`, `todo`, `agent` | Primary: `GPT-5.4 (copilot)`; secondary: `GPT-5.4 mini (copilot)` | Feature branches, issue-linked commits, pull requests, implementation notes. |
| Tester Agent | Defines, writes, runs, and reviews validation. | Unit testing, integration testing, E2E testing, accessibility checks, CI quality gates. | `read`, `search`, `edit`, `execute`, `todo` | Primary: `GPT-5.4 mini (copilot)`; secondary: `GPT-5.4 (copilot)` | Required checks, PR validation comments, test gap issues, CI status review. |
| Release & Docs Agent | Maintains docs and prepares release artifacts. | README, API docs, runbooks, changelogs, release notes, PR descriptions. | `read`, `search`, `edit`, `execute`, `todo` | Primary: `GPT-5.4 mini (copilot)`; secondary: `GPT-5.4 (copilot)` | PR descriptions, release notes, tags, changelogs, documentation issues. |
| UI & UX Specialist Agent | Designs and reviews user-facing flows and visual implementation. | Responsive UI, accessibility, game controls, visual polish, frontend usability. | `read`, `search`, `edit`, `execute`, `todo` | Primary: `Claude Sonnet 4.6 (copilot)`; secondary: `GPT-5.4 mini (copilot)` | Screenshot review, UX findings on PRs, accessibility issue tracking. |
| Security Agent | Reviews security and privacy risks. | Auth, OAuth, sessions, authorization, rate limiting, WebSocket security, secret handling. | `read`, `search`, `edit`, `execute`, `todo` | Primary: `GPT-5.5 (copilot)`; secondary: `GPT-5.4 (copilot)` | Secret scanning, dependency alerts, branch protection, required reviews, security issues. |

## Recommended GitHub Capabilities
When GitHub management is enabled for this project, the agent team should be able to use these capability groups:

- Repository information: inspect default branch, remotes, repository metadata, and project configuration.
- Issue management: create, update, label, assign, and search issues for planned work.
- Pull request management: create PRs, update PR descriptions, request review, summarize checks, and inspect changed files.
- Pull request comments: read and respond to review comments, including requested changes.
- Branch and commit management: create branches and prepare commits only when the user asks for that workflow.
- Release and tag management: draft release notes, create tags, and publish releases when explicitly requested.
- Search and discovery: search GitHub issues, PRs, repository files, and code references.
- Security tooling: run or review secret scanning, dependency alerts, and security-related repository settings where available.

## Suggested Labels
- `type:feature`
- `type:bug`
- `type:docs`
- `type:test`
- `type:security`
- `type:ui-ux`
- `area:backend`
- `area:frontend`
- `area:game`
- `area:auth`
- `area:leaderboards`
- `area:multiplayer`
- `priority:p0`
- `priority:p1`
- `priority:p2`
- `status:blocked`
- `status:needs-decision`

## Suggested Milestones
- MVP Foundation
- Anonymous Game Hub
- Accounts and OAuth
- Leaderboards
- Private Invite Multiplayer
- Hardening and Release

## Standard Issue Template
Each implementation issue should include:
- Summary
- PRD reference
- Scope
- Out of scope
- Acceptance criteria
- Validation commands or manual checks
- Security considerations
- Accessibility considerations when UI is affected
- Documentation updates needed

## Standard Pull Request Checklist
Each pull request should include:
- Linked issue or reason for change
- Summary of changes
- Screenshots or recordings for UI changes
- Tests and validation performed
- Security notes for auth, scores, multiplayer, user data, or secrets
- Documentation updates
- Known risks or follow-up issues

## Recommended Handoff Flow
1. Orchestrator Agent clarifies the requested outcome.
2. Architecture Agent updates PRD or architecture docs when requirements are unclear or changing.
3. Planner Agent creates a GitHub issue breakdown and acceptance criteria.
4. Developer Agent implements a focused slice.
5. Tester Agent validates behavior and coverage.
6. UI & UX Specialist Agent reviews user-facing changes.
7. Security Agent reviews sensitive flows.
8. Release & Docs Agent prepares PR descriptions, docs, changelogs, and release notes.
9. Orchestrator Agent summarizes final status and remaining decisions.
