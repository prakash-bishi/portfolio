# TESTING.md — Testing Strategy

## Status (Phase 0)

No code exists yet, so no test suite exists yet. This document defines the
standard to apply once implementation begins (Phase 1+).

## Backend (Django + DRF)

- Model tests — field constraints, validation, model methods.
- Serializer tests — validation rules, field-level behavior.
- API tests — endpoint behavior, status codes, permissions.
- Business logic tests — anything beyond simple CRUD (e.g. contact-form
  spam checks).

Expected tooling: Django's test runner / `pytest-django`.

## Frontend (Next.js + TypeScript)

- Component tests — rendering, props, basic interaction.
- Page tests — key pages render and fetch data correctly.
- Interaction tests — forms, navigation, filtering (if/when built).

Expected tooling: a standard React testing setup (e.g. Vitest/Jest +
Testing Library) — finalize the exact choice in Phase 1 and record it here.

## System-Level

- Build must succeed (`next build`, Django `check`/`collectstatic` as
  relevant).
- Lint must pass.
- Type checking must pass (TypeScript `tsc --noEmit`).
- Integration tests where a real cross-layer risk exists (e.g. contact
  form end-to-end), not as a blanket requirement.

## Standard

Prioritize meaningful coverage over arbitrary percentage targets. Every
meaningful feature should consider: loading state, success state, error
state, empty state (see `RULES.md`, `AGENTS.md`).

## Commands

To be filled in once the frontend/backend projects are scaffolded (Phase
1). This section must be updated at that point — do not leave it stale.
