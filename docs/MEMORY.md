# MEMORY.md — Current Project State

_Last updated: 2026-09-18_

## What Is Currently Implemented

**Backend** (`backend/`): Django + DRF, `GET /api/health/` checks DB
connectivity. Environment-driven settings. One passing test. No content
models yet (see Phase 3 decision below on why).

**Frontend** (`frontend/`): Next.js (App Router) + TypeScript + Tailwind
v4, with a complete, owner-verified design system (Phase 2) and a real
first content page (Phase 3):

- Design system: tokens, two fonts (Space Grotesk, Source Serif 4),
  `Navbar`/`Footer`/`Container`/`Button`/`ComingSoon` — see
  `docs/DESIGN.md`.
- `/` — real hero (name, role, positioning), corner-bracket motif
  framing the name, owner-approved.
- `/about` — **real content, Phase 3**: Experience (Assistant Professor
  at SSIPMT — current; AIML Trainer for PM SHRI Schools — previous),
  Education (M.Tech AI/ML at SSIPMT, 2024, 76.59%; B.Tech CSE at RCET,
  2020), and Skills (grouped: AI/ML, Computer Vision, Image & Data
  Annotation, Web Development). Content lives in
  `src/content/profile.ts`, sourced only from `docs/PRD.md`'s Reference
  Facts — no invented content. New reusable components:
  `SectionHeading`, `TimelineItem`, `SkillTag`.
- `/status`, `/projects`, `/research`, `/startup`, `/contact` —
  unchanged: connectivity check, and four remaining `ComingSoon` stubs
  (Phase 4–7).
- 18 passing tests across 7 test files. Lint clean. Typecheck clean.

**Infrastructure**: `docker-compose.yml` wires `db` + `backend` +
`frontend`, confirmed working end-to-end on the owner's machine. No
host port mapping for Postgres (removed — see `DECISIONS.md`).

## What Phase Are We In

**Phase 3 — Personal Profile — COMPLETE.** Verified visually by the
owner on their own machine (both screenshots reviewed — Experience/
Education timeline and the Skills tag grid — approved as-is, no changes
requested). Pushed to GitHub at `3b20f62`. Ready to start
**Phase 4 — Projects**.

## What Was Recently Completed

- Phase 3 (About page) built, self-verified, delivered, and pushed to
  GitHub (`3b20f62`) — recovering cleanly from the git divergence
  incident documented in `DECISIONS.md`.
- **Owner visually reviewed Phase 3 and approved it as-is** — no bugs
  found this time (unlike Phase 2's three rounds of fixes). Timeline
  layout, "Current" indicator, parenthetical date format, and the
  Skills tag grid (including the 9-item Image & Data Annotation group)
  all read correctly at full scale.

## What Is Currently Being Worked On

Nothing — Phase 3 is fully closed (built, verified, pushed). Awaiting
the owner's go-ahead to start Phase 4 (Projects).

## What Remains

- Phase 4 (Projects) has not started — this is the first phase that
  will likely need real Django CMS models (projects get added/edited
  repeatedly), unlike Phase 3's static content. See the Phase 3
  decision in `DECISIONS.md` for why that distinction matters.

## Important Temporary Constraints

- Any new server-side backend fetch must go through `getApiBaseUrl()` in
  `src/lib/api.ts`. See `DECISIONS.md`.
- Any new design token must follow the two-name convention (`--foo` +
  `--color-foo`/`--font-foo` in `@theme inline`).
- Nav is intentionally 6 items — Experience/Education/Skills are
  sections of `/about`, not separate routes.
- `frontend/AGENTS.md`/`frontend/CLAUDE.md` are Next.js-generated,
  unrelated to this repo's root-level docs of the same name.
- Any new CSS motif/decorative element should be verified against an
  actual screenshot before being considered done.
- Postgres's host port mapping is intentionally commented out in
  `docker-compose.yml`.
- Before writing any new UI copy or component, check it against
  `DESIGN.md`'s "Explicitly Avoided" list — middle-dot separators,
  monospace-as-decoration, tracked-out ALL-CAPS labels, etc.
- About page content (`src/content/profile.ts`) is static by design,
  not a CMS gap to "fix" — see the Phase 3 decision in `DECISIONS.md`.
- **New — critical:** whenever responsibility for running git shifts
  between Claude and the owner (in either direction), the first action
  back into "Claude runs git" is `git fetch origin` +
  `git log origin/main --oneline`, compared against what Claude assumes
  is the last pushed state — never assume the local sandbox history is
  still accurate. See the git divergence incident in `DECISIONS.md`.
