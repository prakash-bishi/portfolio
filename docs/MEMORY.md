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

**Phase 3 — Personal Profile** — built and self-verified (lint,
typecheck, 18 tests pass; content checked against `docs/PRD.md` for
truthfulness) on top of the repo's real, GitHub-verified history. **Not
yet visually reviewed by the owner** — same pattern as Phase 2, where
real bugs only surfaced once the owner actually looked at the rendered
page. Treat this as unverified until that happens.

## What Was Recently Completed

- **A real git-history divergence was found and fixed.** Claude's
  sandbox had drifted from GitHub's actual history (see the incident
  writeup in `DECISIONS.md`) after a period where the owner was
  committing/pushing Claude's patches manually. Recovered by discarding
  Claude's divergent history and re-cloning fresh from GitHub — nothing
  was lost, since GitHub already had the real, owner-verified Phase 2
  work. Phase 3 was then rebuilt on top of that real base.
- Built the About page (Phase 3): real Experience/Education/Skills
  content, three new reusable components (`SectionHeading`,
  `TimelineItem`, `SkillTag`), 7 new tests (18 total).
- Made and recorded a real architecture decision: About page content is
  static/hardcoded TypeScript, not a Django CMS model — this content
  changes rarely, and a full model+API+admin stack would be premature
  per `RULES.md`. Full reasoning in `DECISIONS.md`.
- Caught and fixed a design-system self-inconsistency before shipping:
  an early `TimelineItem` draft joined text with a middle dot, which
  `DESIGN.md`'s own "Explicitly Avoided" list flags as a common
  AI-generated-page tell. Changed to parenthetical form, with a
  regression test.

## What Is Currently Being Worked On

Nothing — Phase 3's About page is built and self-verified on the correct
base, awaiting the owner's visual review and push to GitHub.

## What Remains

- **Owner has not yet visually reviewed Phase 3.** Same caveat as every
  prior phase: Claude cannot render a browser in its own sandbox.
- Owner needs to sync Claude's Phase 3 commit and push to GitHub.
- Phase 4 (Projects) has not started — this is the first phase that
  will likely need real Django CMS models (projects get added/edited
  repeatedly), unlike Phase 3's static content.

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
