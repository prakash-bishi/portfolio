# MEMORY.md — Current Project State

_Last updated: 2026-09-18_

## What Is Currently Implemented

**Backend** (`backend/`): Django + DRF, `GET /api/health/` checks DB
connectivity. Environment-driven settings. One passing test.

**Frontend** (`frontend/`): Next.js (App Router) + TypeScript + Tailwind
v4, with a real, owner-verified design system (Phase 2):

- Design tokens (color, type scale, spacing, radii) in
  `src/app/globals.css`, grounded in Prakash's CV/annotation work — see
  `docs/DESIGN.md` for the full rationale.
- Two fonts (Space Grotesk, Source Serif 4) via `next/font/google` —
  confirmed loading correctly in the browser (verified via compiled CSS
  inspection and, ultimately, the owner's own screenshots).
- Reusable primitives in `src/components/`: `Navbar` (responsive,
  accessible, mobile menu), `Footer`, `Container`, `Button` (dual-mode:
  real `<button>` or `Link`), `ComingSoon` (shared placeholder).
- Routes: `/` (real hero — name, role, one-line positioning, all
  truthful per `PRD.md`; corner-bracket motif framing the name,
  owner-approved), `/status` (Phase 1 connectivity check), `/about`,
  `/projects`, `/research`, `/startup`, `/contact` (all five are
  `ComingSoon` stubs — real content is Phase 3–7, see `docs/ROADMAP.md`).
- 11 passing tests across 5 test files. Lint clean. Typecheck clean.

**Infrastructure**: `docker-compose.yml` wires `db` + `backend` +
`frontend`, confirmed working end-to-end on the owner's machine (Windows,
Docker Desktop, Git Bash). Postgres's host port mapping (5432) was
removed — it isn't needed by the app and was hitting a Windows/WSL2
port-exclusion conflict on the owner's machine (see `DECISIONS.md`).

**No real page content exists yet** — About, Experience, Education,
Skills, Projects, Research, Startup, Contact are all still `ComingSoon`
placeholders. That's Phase 3 onward.

## What Phase Are We In

**Phase 2 — Design System & Site Shell — COMPLETE.** Verified visually
by the owner on their own machine (screenshots reviewed, corner-bracket
motif approved as-is after two rounds of fixes). Ready to start
**Phase 3 — Personal Profile**.

## What Was Recently Completed

- Phase 2 fully closed out: three real bugs were found and fixed only
  after the owner actually looked at the rendered page (Claude's sandbox
  cannot render a browser, so these were invisible until real
  screenshots came back):
  1. Buttons and the nav wordmark rendered in the wrong font (serif
     instead of Space Grotesk) — a CSS selector that stopped matching
     once `Button` was refactored to support `href`-as-Link in this
     same phase.
  2. The corner-bracket motif floated as two disconnected marks —
     attached to a loosely-sized container instead of the actual text
     it was meant to frame. Fixed by scoping it tightly to the `<h1>`
     itself (a bounding box around the name, not the whole hero block).
  3. A Windows/WSL2 port-exclusion conflict on 5432 blocked
     `docker compose up` entirely — fixed by removing Postgres's
     unnecessary host port mapping (the app never needed it; only
     backend↔db, both inside Docker, matters).
- All three are recorded in `DECISIONS.md` with root causes, so the
  patterns (element-selector fragility, motif-scoping, unnecessary host
  port exposure) don't get reintroduced in later phases.
- `docs/DESIGN.md` updated to reflect the corrected, narrower scope of
  the corner-bracket motif.

## What Is Currently Being Worked On

Nothing — Phase 2 is closed. Awaiting the owner's go-ahead to start
Phase 3 (About page: Experience, Education, and Skills as sections of
one page, per the nav IA decision in `DECISIONS.md`).

## What Remains

- Owner still needs to commit and push the accumulated Phase 2 changes
  (Claude no longer runs git commands — see `AGENTS.md` workflow note).
- Real Google Fonts loading is confirmed working via the owner's
  screenshots, but a production build (`npm run build`) still hasn't
  been run anywhere with real internet access — only `next dev` has been
  exercised so far. Not urgent for local development.
- Phase 3 (Personal Profile) has not started: no real About/Experience/
  Education/Skills content exists yet, only the `ComingSoon` stub.

## Important Temporary Constraints

- Any new server-side backend fetch must go through `getApiBaseUrl()` in
  `src/lib/api.ts` — hardcoding `NEXT_PUBLIC_API_BASE_URL` for
  server-side code silently breaks under Docker. See `DECISIONS.md`.
- Any new design token must follow the two-name convention (`--foo` root
  variable + `--color-foo`/`--font-foo` mapping in `@theme inline`).
- `frontend/AGENTS.md` and `frontend/CLAUDE.md` are Next.js
  framework-generated files, unrelated to this repo's root-level
  `AGENTS.md`/`CLAUDE.md`. Don't confuse the two.
- Nav is intentionally 6 items — Experience/Education/Skills are
  sections of `/about`, not separate routes. See the IA decision in
  `DECISIONS.md` before changing this.
- Any new CSS motif/decorative element should be verified against an
  actual screenshot before being considered done — Claude has no way to
  render a browser in its own sandbox, and this phase's three real bugs
  were all invisible until the owner looked at the real page.
- Postgres's host port mapping is intentionally commented out in
  `docker-compose.yml`, not missing by accident.
