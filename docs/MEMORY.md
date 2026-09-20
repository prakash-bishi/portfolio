# MEMORY.md — Current Project State

_Last updated: 2026-09-20_

## What Is Currently Implemented

**Backend** (`backend/`): Django + DRF, three apps:
- `health` — `GET /api/health/`.
- `projects` — `Project` model/API/admin, seeded with the owner's 6 real
  projects (Phase 4).
- **`research` (new, Phase 5)** — `Publication` model, DRF read-only API
  at `/api/publications/`, Django admin. **No seed data** — the owner
  has two papers and an M.Tech thesis but will add them via admin
  themselves; seeding placeholder rows was deliberately avoided (see
  `DECISIONS.md`).
- 15 backend tests passing (1 health + 8 projects + 6 research).

**Frontend** (`frontend/`): Next.js (App Router) + TypeScript + Tailwind
v4. Design system (Phase 2), About (Phase 3), Projects (Phase 4), and
now Research (Phase 5) are all built:

- `/research` — **real content, Phase 5**: a static "Interests" section
  (three areas — Computer Vision for Agriculture, Novel Class Discovery,
  Efficient Object Detection — with real, substantive descriptions
  written with the owner's explicit permission, kept to general/factual
  field descriptions rather than personal-achievement claims — see
  `DECISIONS.md`) and a CMS-backed "Publications" section that
  currently shows an honest empty state ("Publications are being added")
  since nothing's been added via admin yet.
- New `src/lib/research.ts` (reuses `getApiBaseUrl()`, same pattern as
  `projects.ts`), new `content/research.ts` (static interests, same
  pattern as `content/profile.ts`), new `PublicationItem` component.
- 37 passing frontend tests across 11 files (7 new this phase). Lint
  clean, typecheck clean.
- **Verified with the same live-integration method as Phase 4**: ran
  Django + Next.js dev servers together, confirmed the empty-publications
  state renders correctly, then added a real test publication directly
  in the database and confirmed it flows through the API and renders
  correctly on the page (including the venue+year parenthetical
  formatting) before removing it.

**Infrastructure**: unchanged — Phase 5 only added a new Django app,
already covered by the existing `backend` service in `docker-compose.yml`.

## What Phase Are We In

**Phase 5 — Research** — built, self-verified (lint, typecheck, 15
backend + 37 frontend tests, live integration check including both the
empty and non-empty publication states). **Not yet visually reviewed by
the owner or run via Docker.**

## What Was Recently Completed

- Built the Research page: static research interests (real content,
  three areas) and CMS-backed Publications (empty by design, no
  fabricated seed data).
- Made and recorded a content-architecture decision distinguishing
  Publications (CMS-backed, like Projects) from Research Interests
  (static, like the About page) based on what's actually known about
  each — not a blanket rule applied uniformly. Full reasoning in
  `DECISIONS.md`.
- Continued the established test-then-verify discipline: 7 new tests,
  plus an actual live integration check (not just static HTML
  inspection) covering both the empty state and a real seeded
  publication.

## What Is Currently Being Worked On

Nothing — Phase 5 is built and self-verified, awaiting delivery, Docker
verification, and the owner's visual review.

## What Remains

- **Owner has not yet run this via Docker or visually reviewed it.**
  Same caveat as every prior phase.
- Owner should add their two real papers and M.Tech thesis via Django
  admin once they're ready — the Publications section is empty by
  design, not broken.
- Phase 6 (Startup) has not started.

## Important Temporary Constraints

- Any new server-side backend fetch must go through `getApiBaseUrl()`
  in `src/lib/api.ts` (or a domain file that reuses it, like
  `projects.ts` and now `research.ts`).
- Any new design token must follow the two-name convention (`--foo` +
  `--color-foo`/`--font-foo` in `@theme inline`).
- Nav is intentionally 6 items — Experience/Education/Skills are
  sections of `/about`, not separate routes.
- Before writing any new UI copy or component, check it against
  `DESIGN.md`'s "Explicitly Avoided" list (middle-dot separators, etc.)
  — `PublicationItem` deliberately reuses the parentheses pattern from
  `TimelineItem` for exactly this reason.
- Postgres's host port mapping is intentionally commented out in
  `docker-compose.yml`.
- New Django model fields must avoid Postgres-only types to keep the
  sqlite fallback working.
- **Content-architecture pattern, now established across three phases:**
  decide static-vs-CMS per content type based on what's actually known
  and how often it changes — About is static, Projects and Publications
  are CMS-backed with different seeding approaches (Projects had real
  titles to seed; Publications didn't, so it's seeded empty). Don't
  apply one pattern uniformly without checking the actual facts first.
- **Critical, still standing:** whenever git responsibility shifts
  between Claude and the owner, the first action back into "Claude runs
  git" is `git fetch origin` + `git log origin/main --oneline` before
  any new commits, and verify tree equality before cherry-picking if a
  divergence is found. See the two divergence incidents in
  `DECISIONS.md`.
