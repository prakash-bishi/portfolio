# MEMORY.md — Current Project State

_Last updated: 2026-09-21_

## What Is Currently Implemented

**Backend** (`backend/`): unchanged this phase. Three apps: `health`,
`projects` (seeded), `research` (Publication model, not yet seeded —
owner hasn't added real entries via admin yet).

**Frontend** (`frontend/`): Next.js (App Router) + TypeScript + Tailwind
v4. Design system (Phase 2), About (Phase 3), Projects (Phase 4),
Research (Phase 5), and now Startup (Phase 6) are all built:

- `/startup` — **real content, Phase 6**: three capability groups (AI
  Data, Computer Vision, AI/ML), each a direct reframing of skills
  already verified in `docs/PRD.md`'s Reference Facts — no new claims,
  no fabricated services/clients/case studies. Opens with an explicit
  honest framing ("not an established company") before the capability
  list. CTA links to `/contact` (still a stub — Phase 7 builds it).
  Static content in `src/content/startup.ts`, no new backend — this
  content doesn't need per-item CMS management.
- 42 passing frontend tests across 12 files (5 new this phase). Lint
  clean, typecheck clean.
- Verified with a live dev server (not just static inspection): fetched
  the actual rendered page, confirmed all capability content and the
  honest-framing text render, confirmed CSS compiles.
- Caught and fixed two real lint errors before delivery this time: raw
  `<a>` tags for internal navigation (should be Next's `<Link>`) and an
  unescaped apostrophe — both real correctness issues ESLint's
  `@next/next` and `react/no-unescaped-entities` rules exist to catch.

**Infrastructure**: unchanged — Phase 6 needed no new backend, so no
Docker/infra changes either.

## What Phase Are We In

**Phase 6 — Startup — COMPLETE.** Verified visually by the owner on
their own machine (both screenshots reviewed — the honest-framing
paragraph and the full capability groups with CTA — approved as-is, no
changes requested). Pushed to GitHub at `a80ebf8`. Ready to start
**Phase 7 — Contact & SEO**.

## What Was Recently Completed

- Phase 6 (Startup) built, self-verified, delivered, and pushed to
  GitHub (`a80ebf8`).
- **Owner visually reviewed Phase 6 and approved it as-is** — the
  honest-framing paragraph read as intended (matter-of-fact, not
  defensive), the capability groups and tags looked clean even with 9
  items in one group, and the CTA landed naturally. No fixes needed.
- Owner independently edited `research.ts` themselves earlier (Phase 5
  follow-up) and pushed successfully — confirmed the static-content
  editing workflow works for them in practice.

## What Is Currently Being Worked On

Nothing — Phase 6 is fully closed (built, verified, pushed). Awaiting
the owner's go-ahead to start Phase 7 (Contact & SEO).

## What Remains

- Phase 7 (Contact & SEO) has not started. This one needs a real
  decision from the owner before building — how contact-form
  submissions actually get delivered (email? stored in the database for
  admin review? both?) and what spam protection approach to use — see
  `ARCHITECTURE.md`'s Contact System section for the original
  conceptual flow. Don't guess at this; ask.
- The owner still hasn't added their real Publications via admin
  (Phase 5) — not blocking, just still open.

## Important Temporary Constraints

- Any new server-side backend fetch must go through `getApiBaseUrl()`
  in `src/lib/api.ts` (or a domain file that reuses it).
- Any new design token must follow the two-name convention.
- Nav is intentionally 6 items — Experience/Education/Skills are
  sections of `/about`, not separate routes.
- Before writing any new UI copy or component, check it against
  `DESIGN.md`'s "Explicitly Avoided" list, AND run lint before
  considering a page done — this phase's `<a>`-vs-`<Link>` and
  unescaped-apostrophe errors were real bugs ESLint caught, not
  pedantry.
- Content-architecture pattern (established across Phases 3–6): decide
  static-vs-CMS per content type based on what's actually known and how
  often it changes. About, Research Interests, and Startup Capabilities
  are static; Projects and Publications are CMS-backed.
- **Startup page content is especially truth-sensitive** — any future
  edit adding services, clients, or case studies must use honest status
  language (current capability / prototype / research / future
  service/product) per `RULES.md`, not imply existing traction. Re-read
  `PRD.md`'s Non-Goals and the Phase 6 decision in `DECISIONS.md` first.
- **Critical, still standing:** whenever git responsibility shifts
  between Claude and the owner, the first action is `git fetch origin`
  + compare against `origin/main` before any new commits.
