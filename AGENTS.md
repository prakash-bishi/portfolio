# AGENTS.md — How Claude Must Work On This Project

This is the primary operational instruction document. Read this, then
`docs/MEMORY.md`, then only the docs relevant to the current task.

## Core Principle

> The repository remembers. Claude executes.

Do not rely on memory of previous conversations. Everything needed to
continue this project safely must live in this repo's documentation.

## Documentation Index (single source of truth per topic)

| Topic | Document |
|---|---|
| Product requirements, users, scope | `docs/PRD.md` |
| Agent workflow (this file) | `AGENTS.md` |
| Entry point / pointer doc | `CLAUDE.md` |
| Visual/design language | `docs/DESIGN.md` |
| System architecture | `docs/ARCHITECTURE.md` |
| Non-negotiable rules | `docs/RULES.md` |
| Current project state | `docs/MEMORY.md` |
| Recorded decisions | `docs/DECISIONS.md` |
| Testing strategy | `docs/TESTING.md` |
| Security requirements | `docs/SECURITY.md` |
| Phases / future plans | `docs/ROADMAP.md` |

If information changes, update its authoritative document. Never duplicate
authoritative content elsewhere — reference it instead.

## Context-Loading Strategy (token efficiency)

At the start of a session/task:

1. Read `CLAUDE.md`.
2. Read `AGENTS.md` (this file).
3. Read `docs/MEMORY.md`.
4. Read only the docs relevant to the current task.
5. Inspect only the relevant code.
6. Implement the smallest appropriate change.
7. Test it.
8. Update affected documentation.
9. Update `docs/MEMORY.md` if project state meaningfully changed.

Do NOT read every Markdown file automatically. Do NOT reconstruct project
history from old chat conversations. Do NOT repeatedly ask the user to
re-explain information already documented here.

## Session Workflow

**Before implementation:**
- Understand current state (`docs/MEMORY.md`).
- Identify the requested task precisely.
- Identify affected files and relevant docs.
- Identify constraints (`docs/RULES.md`, `docs/SECURITY.md`).
- Determine the smallest viable implementation.

**During implementation:**
- Stay focused on the current task only.
- Avoid unrelated refactoring.
- Avoid unnecessary dependencies (see `docs/RULES.md`).
- Preserve existing architecture unless a change is explicitly approved
  and recorded in `docs/DECISIONS.md`.
- Keep code maintainable; test incrementally.

**At the end of a task:**
- Run relevant tests / lint / typecheck / build where applicable.
- Inspect changed files.
- Update documentation affected by the change.
- Update `docs/MEMORY.md`.
- Record significant decisions in `docs/DECISIONS.md`.
- Report what was completed and what remains.
- Stop. Do not keep implementing extra features just because context
  remains.

## Task Size Control

Never attempt an entire phase in one pass if it would reduce quality. Split
large work into independently understandable, testable, and documentable
sub-tasks (see `docs/ROADMAP.md` for the phase breakdown already defined).

## Architecture Change Rule

Do not silently change major architecture. Before a significant change,
work through: problem, current approach, proposed approach, alternatives,
benefits, costs/trade-offs, impact, recommendation — then record it in
`docs/DECISIONS.md`. Small implementation decisions don't need this ceremony.

## When to Ask the User

Make ordinary engineering decisions independently. Ask only when a decision
materially affects: product direction, major architecture, branding,
business model, a significant technology choice, major infrastructure,
security/privacy, irreversible data decisions, or scope. Otherwise, pick
the maintainable, industry-standard option and proceed.

## Content Integrity Reminder

Every content-facing change must comply with the Truth Rule in `docs/RULES.md`.
No fabricated clients, revenue, users, traction, publications, or
partnerships — ever, regardless of how minor or "just placeholder" it
might seem.

## Development Philosophy

Simple → Working → Tested → Documented → Improved.
Not: Complex → Over-engineered → Difficult to maintain.

Proportional engineering: the project becomes more sophisticated only when
real requirements justify it (see `docs/RULES.md` for the explicit banned-unless-
justified list).
