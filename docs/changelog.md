# Changelog

All notable changes to this repository should be recorded here.

## [Unreleased]

### Added
- Initial repository structure and GitHub agent definitions.
- Documentation standards and repository templates.
- Sprint planning documents under `docs/sprints/` with a reusable template and MVP sprint breakdown.
- Sprint 1 frontend shell now renders the manifest-driven game catalog and versioned API baseline.
- Sprint 2 adds the playable anonymous game hub and Snake lifecycle engine.
- Sprint 3 adds cookie-based auth, OAuth provider abstraction, and account/profile screens.
- Sprint 4 adds authenticated Snake score submission and leaderboard queries.

### Changed
- Repository instructions now require PEP 8-aligned Python style, TypeScript style conventions, versioned API routes, and behavior-focused tests.
- Backend API routes now use the `/api/v1` prefix for published endpoints.
- Repository instructions now include explicit TypeScript lint and formatting guidance for strict typing, imports, JSX layout, and code hygiene.
- The frontend landing page now uses shared game manifest data instead of a placeholder screen.
- The frontend hub now renders a playable Snake surface with keyboard controls and local score state.
- The frontend now includes visible login and profile panels that call the auth client.
- The frontend now includes a Snake leaderboard page and authenticated score submission flow.

### Fixed
- None.

### Removed
- None.

### Security
- None.

### Deprecated
- None.

## Versioning Rules
- Use semantic versioning: `major.minor.patch`.
- Put released entries newest-first.
- Add the release date using ISO 8601 format (`YYYY-MM-DD`).
- Mention breaking changes explicitly.
- Reference the related issue or pull request when possible.
