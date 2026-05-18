# Agent Model Recommendations

## Research Note
These recommendations were updated after reviewing GitHub's public Copilot model comparison and premium request documentation on 18 May 2026. Model availability and billing can still vary by GitHub Copilot plan and organization policy, so verify these choices against the models enabled for the GitHub organization.

The current GitHub docs identify these useful model categories:
- Low-multiplier models: `GPT-5.4 mini`, `Claude Haiku 4.5`, and `Gemini 3 Flash` are listed at 0.33x premium request multiplier.
- 1x specialist models: `GPT-5.4`, `Claude Sonnet 4.6`, `Gemini 3.1 Pro`, and similar advanced models are useful when stronger coding, reasoning, or UI work is justified.
- High-multiplier models such as `GPT-5.5` and `Claude Opus 4.7` should be reserved for exceptional cases. This project intentionally uses `GPT-5.5` for the Architecture and Security agents because those roles carry the highest architectural and risk-review impact.

Custom agent frontmatter supports a model fallback array. The first entry is the primary model and the second entry is the fallback.

## Selection Principles
- Use `GPT-5.4 mini` for high-volume coordination, planning, release documentation, UI/UX, testing, and cost-sensitive codebase exploration.
- Use `GPT-5.4` as the standard stronger fallback or primary model for implementation-heavy work.
- Use `GPT-5.5` for Architecture and Security, where deeper reasoning is worth the higher cost.
- Keep a fallback model on every agent so work can continue if the primary model is unavailable in the current Copilot plan.
- Use this project's GPT-5.4/GPT-5.5 model policy consistently in custom-agent defaults.

## Recommended Assignments
| Agent | Primary model | Secondary model | Rationale |
| --- | --- | --- | --- |
| Orchestrator Agent | `GPT-5.4 mini (copilot)` | `GPT-5.4 (copilot)` | Coordination is frequent, so `GPT-5.4 mini` controls cost while `GPT-5.4` remains available for harder coordination or recovery. |
| Architecture Agent | `GPT-5.5 (copilot)` | `GPT-5.4 (copilot)` | Architecture decisions shape the whole system, so the strongest reasoning model is primary; `GPT-5.4` keeps a strong fallback for architecture review. |
| Planner Agent | `GPT-5.4 mini (copilot)` | `GPT-5.4 (copilot)` | Planning and issue breakdowns are high-volume, but `GPT-5.4` can handle more complex sequencing when needed. |
| Developer Agent | `GPT-5.4 (copilot)` | `GPT-5.4 mini (copilot)` | Implementation needs strong code reasoning, with `GPT-5.4 mini` as a lower-cost fallback for simpler edits. |
| Tester Agent | `GPT-5.4 mini (copilot)` | `GPT-5.4 (copilot)` | Test generation and validation planning benefit from cost-efficient codebase exploration, escalating to `GPT-5.4` for complex test implementation. |
| Release & Docs Agent | `GPT-5.4 mini (copilot)` | `GPT-5.4 (copilot)` | Documentation is high-volume, so `GPT-5.4 mini` is the default and `GPT-5.4` is reserved for more complex release analysis. |
| UI & UX Specialist Agent | `Claude Sonnet 4.6 (copilot)` | `GPT-5.4 mini (copilot)` | UI/UX benefits from Sonnet's interface and design reasoning as the primary choice, with `GPT-5.4 mini` as a lower-cost fallback. |
| Security Agent | `GPT-5.5 (copilot)` | `GPT-5.4 (copilot)` | Security review benefits from the strongest reasoning assignment; `GPT-5.4` keeps the fallback strong for sensitive review work. |

## Cost Guidance
Treat these as defaults rather than permanent choices:
- Use `GPT-5.4 mini` for cost-sensitive work across Orchestrator, Planner, Tester, and Release & Docs.
- Use `GPT-5.4` for implementation-heavy work and as the standard escalation path.
- Use `GPT-5.5` only for Architecture and Security by default.
- Use `Claude Sonnet 4.6` as the default for UI & UX specialist work.
- Avoid reintroducing older replaced model defaults without an explicit decision.

## Follow-Up Checks
Before serious GitHub-managed development starts:
- Confirm which Copilot models are enabled for the organization.
- Confirm whether the exact display names with `(copilot)` suffix are accepted by VS Code custom-agent frontmatter for every enabled model.
- Confirm whether `GPT-5.5`, `GPT-5.4`, and `GPT-5.4 mini` are enabled for the organization.
- Check whether auto model selection would produce a better multiplier discount for some manual workflows.
- Record any pricing-driven changes in this file and in the affected `.github/agents/*.agent.md` frontmatter.
