# Copilot Instructions

## Working Rules
- Prefer small, reviewable changes.
- Use the existing architecture and repository structure before introducing new patterns.
- Keep backend work in `src/backend`, frontend work in `src/frontend`, shared contracts in `src/shared`, and docs in `docs`.
- When a change affects behavior, configuration, user-facing output, dependencies, or release history, update the related docs in the same pull request.
- Every relevant PR should review and update `README.md`, `docs/config.md`, and `docs/changelog.md` unless there is a clear documented reason not to.

## Testing Standards
- Add or update unit tests for new logic and bug fixes.
- Add or update functional tests for API routes, shared workflows, and important business rules.
- Add or update end-to-end tests for user-facing journeys that cross pages, services, or authentication boundaries.
- Prefer tests that verify visible behavior over implementation details.
- Tests should fail when the behavior they protect breaks; do not add tests that only exercise startup paths, stubs, snapshots, or always-true assertions.
- Prefer contract tests at API boundaries, pure rule tests for shared logic, and journey tests for critical user flows before using UI snapshots.
- If a module is still a placeholder, say so in the PR rather than inventing coverage that does not prove real functionality.
- Fix failing tests or explain why they are unrelated before merging.

## Lint and Code Quality
- Run formatting, linting, type checking, and tests that apply to the touched area.
- Keep functions and modules focused and small.
- Avoid unnecessary abstraction.
- Prefer clear names, explicit types, and straightforward control flow.
- Add comments only when the code contains a non-obvious constraint, invariant, or tradeoff.

## Code Style Standards
- Python code should follow PEP 8, use PEP 257 docstrings where documentation is needed, and stay compatible with Ruff formatting and linting.
- TypeScript and TSX code should use strict typing, clear module boundaries, and consistent formatting compatible with the repo's TypeScript compiler and formatter.
- Keep TypeScript formatting consistent and readable: 2-space indentation, single quotes, semicolons, trailing commas where allowed, and line wrapping that keeps long JSX and object literals scannable.
- Prefer `type` aliases for simple shapes, `interface` for extendable object contracts, `readonly` for immutable values, `unknown` over `any`, and explicit return types for exported functions and components.
- Remove unused imports, variables, and parameters rather than suppressing them, and keep public APIs narrow and well named.
- Keep JSX props and long expressions grouped so that multiline component calls remain easy to diff and review.
- Prefer `camelCase` for variables and functions, `PascalCase` for classes, components, and types, and `snake_case` for Python modules, functions, and test names.
- Keep route handlers thin and move business logic into services or shared helpers.
- Name files and folders consistently with their language conventions, and keep route or game names aligned with the existing repo structure.

## API Route Standards
- Before adding or renaming a backend route, check the existing files under `src/backend/app/api/routes` and the API documentation in `docs/api.md`.
- Keep backend API routes versioned under a stable prefix such as `/api/v1`.
- Use predictable resource naming, plural nouns for collection routes, and singular endpoints only when the route represents a singleton action such as health checks or the current user.
- Keep route modules grouped by feature and avoid creating duplicate or overlapping routes.

## Pull Request Requirements
- Link the related issue or explain why the work has no issue.
- Summarize the change, the reason, and the expected behavior.
- List validation performed and note anything not verified.
- Include screenshots or recordings for UI changes when relevant.
- Call out security, accessibility, and release implications when applicable.
- Update README, config, and changelog documentation in the same PR for any meaningful behavior, setup, or release change.

## CI Requirements
- CI should run backend tests, frontend tests, linting, type checking, and any relevant end-to-end checks.
- Fail PRs that break required checks.
- Keep CI fast enough to run on every PR.
- Treat security and release workflows as required checks once they are available.

## Security Requirements
- Treat all user input, score submissions, and multiplayer events as untrusted.
- Validate server-side, authorize every protected action, and rate limit sensitive endpoints.
- Never commit secrets, tokens, or credentials.
- Review auth, OAuth, sessions, invite links, WebSockets, and admin actions carefully.
- Prefer least-privilege defaults for services, CI, and repository access.

## Documentation Standards
- Update documentation with the code, not after the fact.
- Keep README focused on what the repository does now, how to run it, and how to contribute.
- Keep config docs as the source of truth for environment variables, runtime flags, and defaults.
- Keep changelog entries newest-first and factual.
- Use ISO 8601 dates (`YYYY-MM-DD`) in docs, release notes, and changelog entries.
- Use semantic versioning (`major.minor.patch`) and tag releases with a leading `v`.

## Document Format Standards
### README.md
- Start with a short summary of the project.
- Include quick start, development commands, and a concise project layout.
- Keep setup steps current and minimal.

### docs/config.md
- Document each config value with name, purpose, required or optional status, default, and notes.
- Group settings by area such as runtime, database, auth, multiplayer, logging, and deployment.
- Mark production-only settings clearly.

### docs/changelog.md
- Use sections in this order when applicable: Added, Changed, Fixed, Removed, Security, Deprecated.
- Put the version and date at the top of each release entry.
- Mention breaking changes explicitly.
- Reference the issue or PR when possible.

## Code Commenting
- Comments should explain why, not what.
- Avoid TODO comments unless they are tied to a tracked issue.
- Remove stale comments when behavior changes.
- Keep comments short and near the relevant code.

## Release Hygiene
- Keep release notes and changelog entries aligned.
- Include known risks and follow-up items when a PR cannot fully complete a topic.
- Preserve user-authored content when editing docs.
