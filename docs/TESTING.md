# TESTING.md — Testing Strategy

## Status (Phase 1)

Frontend and backend are scaffolded with working test setups and one
passing test each (a foundation smoke test, not real coverage yet).
Real coverage grows as real features are built in later phases.

## Backend (Django + DRF)

- Model tests — field constraints, validation, model methods.
- Serializer tests — validation rules, field-level behavior.
- API tests — endpoint behavior, status codes, permissions.
- Business logic tests — anything beyond simple CRUD (e.g. contact-form
  spam checks).

Tooling: Django's built-in test runner + DRF's `APITestCase`.

Current tests (15, across `health`, `projects`, and `research` apps):
- `backend/health/tests.py` — verifies `/api/health/` returns 200 and
  reports the database as reachable.
- `backend/projects/tests.py` — model tests (slug auto-generation from
  title, comma-separated tag parsing/stripping) and API tests (list
  returns only published projects, detail lookup by slug, 404 for
  unpublished or unknown slugs, serializer includes parsed tags and
  human-readable status).
- `backend/research/tests.py` — model tests (default author, string
  representation) and API tests (list returns only published
  publications, returns an empty array when nothing's published,
  serializer includes human-readable publication type, 404 for an
  unpublished publication's detail).

## Frontend (Next.js + TypeScript)

- Component tests — rendering, props, basic interaction.
- Page tests — key pages render and fetch data correctly.
- Interaction tests — forms, navigation, filtering (if/when built).

Tooling: Vitest + React Testing Library + jsdom.

Current tests (37 across 11 files):
- `src/app/__tests__/page.test.tsx` — homepage heading renders
- `src/app/about/__tests__/page.test.tsx` — About page renders real
  Experience/Education/Skills content correctly (checks specific facts
  like "76.59%", "SSIPMT, Raipur", skill group labels)
- `src/components/__tests__/Navbar.test.tsx` — wordmark and nav links
  render; mobile menu is closed by default and opens on toggle
- `src/components/__tests__/Footer.test.tsx` — current year and nav
  links render
- `src/components/__tests__/Button.test.tsx` — renders a real `<button>`
  without `href`, a `Link` with `href`, and doesn't leak `href` onto the
  button element
- `src/components/__tests__/TimelineItem.test.tsx` — title/subtitle/
  period render; detail renders in parentheses, not a middle-dot
  separator
- `src/components/__tests__/ProjectCard.test.tsx` — title/summary/tags
  render, links to the correct detail page, status badge only renders
  when `status_display` is actually set
- `src/components/__tests__/PublicationItem.test.tsx` — title/authors/
  type render; venue+year format correctly in all combinations
  (both, venue-only, year-only); link only renders when
  `external_url` is set
- `src/lib/__tests__/projects.test.ts` — `getProjects`/`getProject`
  against a mocked fetch: success, empty list, non-ok errors, and the
  404-returns-null (not a thrown error) contract
- `src/lib/__tests__/research.test.ts` — `getPublications` against a
  mocked fetch: success, empty array, non-ok errors
- `src/lib/__tests__/api.test.ts` — API base URL selection across all
  three cases (server+Docker, server+non-Docker, browser)

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
state, empty state (see `RULES.md`, `../AGENTS.md`).

## Commands

**Backend** (from `backend/`):
```bash
python manage.py test              # run all tests
python manage.py test health       # run one app's tests
python manage.py check             # system check
```

**Frontend** (from `frontend/`):
```bash
npm run test          # run tests once
npm run test:watch    # watch mode
npm run lint          # eslint
npx next typegen      # REQUIRED once before tsc (see note below)
npx tsc --noEmit      # type check
npm run build         # production build (requires internet access for
                      # next/font/google — see docs/DECISIONS.md)
```

**Note on `tsc --noEmit`:** Next.js generates route/layout types (e.g.
the `LayoutProps` type used in `src/app/layout.tsx`) into `.next/types/`,
which is gitignored. On a fresh clone — or after deleting `.next` — a
bare `tsc --noEmit` fails with "Cannot find name 'LayoutProps'". Run
`npx next typegen` first (it's fast and, unlike a full build, does not
need network access for fonts), or run `next dev`/`next build` once.

## Known Constraint

Frontend production builds (`npm run build`) require network access to
`fonts.googleapis.com` because `layout.tsx` uses `next/font/google` for
the Geist typeface. This was not verifiable inside Claude's sandboxed
build environment (restricted domain allowlist) but is a normal
requirement for any real dev machine or CI runner with internet access.
If this ever becomes a real constraint (e.g. an offline build
environment), switch to `next/font/local` with self-hosted font files.

