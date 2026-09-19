# MEMORY.md — Current Project State

_Last updated: 2026-09-19_

## What Is Currently Implemented

**Backend** (`backend/`): Django + DRF.
- `health` app: `GET /api/health/` checks DB connectivity.
- **`projects` app (new, Phase 4)**: `Project` model, DRF read-only API
  at `/api/projects/` (list) and `/api/projects/<slug>/` (detail),
  Django admin registration. Seeded via data migration with the 6 real
  projects the owner provided — see `DECISIONS.md` for the seeding
  approach and its honesty constraints (blank status where unconfirmed,
  no invented descriptions).
- 9 backend tests passing: 1 for `health`, 8 for `projects` (model
  behavior — slug generation, tag parsing — and API behavior —
  published-only filtering, 404s, serialized field shape).

**Frontend** (`frontend/`): Next.js (App Router) + TypeScript + Tailwind
v4, design system complete (Phase 2), About page complete (Phase 3),
Projects complete (Phase 4, this update):

- `/projects` — **real content, Phase 4**: fetches live from the
  backend API, lists all 6 seeded projects via `ProjectCard`. Handles
  backend-unreachable and empty-list states gracefully.
- `/projects/[slug]` — project detail page (new: this project's first
  dynamic route), fetches by slug, calls `notFound()` for unknown/
  unpublished slugs (real Next.js 404, verified returns HTTP 404).
- New `src/lib/projects.ts` — reuses `getApiBaseUrl()` from `api.ts`
  (not duplicated), so the server/browser URL-selection bug from Phase 1
  can't be reintroduced here.
- New `ProjectCard` component.
- 28 passing tests across 9 test files (10 new this phase). Lint clean,
  typecheck clean.
- **Verified with a real integration test this time**, not just static
  HTML inspection: ran the actual Django dev server (sqlite) and Next.js
  dev server together in Claude's sandbox (no Docker needed for this),
  confirmed the frontend genuinely fetches and renders live backend
  data, confirmed the 404 path returns real HTTP 404, confirmed CSS
  utilities compile. This is a step up from Phase 2/3's verification,
  which could only check static markup.

**Infrastructure**: `docker-compose.yml` unchanged this phase — Phase 4
didn't require new infrastructure, only a new Django app already covered
by the existing `backend` service.

## What Phase Are We In

**Phase 4 — Projects** — built, self-verified (lint, typecheck, 28
frontend + 9 backend tests, and this phase's new real
frontend-backend-database integration check). **Not yet visually
reviewed by the owner or run via Docker** — same pattern as every prior
phase.

## What Was Recently Completed

- Built the full Projects feature: Django model + API + admin,
  frontend listing + detail pages, 10 new tests.
- Seeded the 6 real projects the owner provided via a Django data
  migration, with honest minimal summaries and no fabricated status
  (see `DECISIONS.md`).
- Made two real architecture decisions, both recorded in `DECISIONS.md`:
  Projects are CMS-backed (unlike Phase 3's static About content,
  per Phase 3's own stated exception for recurring-edit content), and
  the `tags` field avoids Postgres-only types to keep the sqlite
  fallback working.
- For the first time, verified this phase with actual running services
  in Claude's sandbox (Django + Next.js dev servers together, no
  Docker) rather than static HTML inspection alone — confirmed live
  data fetching, real 404 handling, and CSS compilation.

## What Is Currently Being Worked On

Nothing — Phase 4 is built and self-verified, awaiting delivery,
`docker compose up` verification, and the owner's visual review.

## What Remains

- **Owner has not yet run this via Docker or visually reviewed it.**
  Claude's sandbox verification used local dev servers (Django +
  Next.js directly, not Docker), which is new and more thorough than
  prior phases but still not the same as `docker compose up` or a real
  browser. The Docker path specifically should still be checked — new
  moving parts (a new Django app, new migrations) could interact with
  Docker differently even though the underlying code is verified.
- Owner should log into Django admin (once running) and add fuller
  descriptions, confirm status, and add `external_url` links for
  projects 1–5 — the seeded data is a real but minimal starting point,
  not finished content. No Django superuser has been created yet in any
  environment the owner has used (see README.md's optional superuser
  step from Phase 1).
- Phase 5 (Research) has not started.

## Important Temporary Constraints

- Any new server-side backend fetch must go through `getApiBaseUrl()`
  in `src/lib/api.ts` (or a domain file that reuses it, like
  `projects.ts`) — never hardcode `NEXT_PUBLIC_API_BASE_URL` for
  server-side code.
- Any new design token must follow the two-name convention (`--foo` +
  `--color-foo`/`--font-foo` in `@theme inline`).
- Nav is intentionally 6 items — Experience/Education/Skills are
  sections of `/about`, not separate routes.
- `frontend/AGENTS.md`/`frontend/CLAUDE.md` are Next.js-generated,
  unrelated to this repo's root-level docs of the same name.
- Before writing any new UI copy or component, check it against
  `DESIGN.md`'s "Explicitly Avoided" list.
- Postgres's host port mapping is intentionally commented out in
  `docker-compose.yml`.
- About page content (`src/content/profile.ts`) is static by design;
  Projects content is Django-CMS-backed by design — these are
  deliberately different patterns for different content types. Don't
  "fix" one to match the other without a real reason and a decision
  entry.
- New model fields must avoid Postgres-only types (`ArrayField`, etc.)
  to keep the sqlite fallback working — see `DECISIONS.md`.
- **Critical, still standing:** whenever git responsibility shifts
  between Claude and the owner, the first action back into "Claude runs
  git" is `git fetch origin` + `git log origin/main --oneline` before
  any new commits.
