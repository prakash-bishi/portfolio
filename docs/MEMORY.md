# MEMORY.md — Current Project State

_Last updated: 2026-09-22_

## What Is Currently Implemented

**Backend** (`backend/`): Django + DRF, four apps:
- `health` — `GET /api/health/`.
- `projects` — seeded with the owner's 6 real projects (Phase 4).
- `research` — `Publication` model, not yet seeded (Phase 5).
- **`contact` (new, Phase 7)** — `ContactMessage` model, POST-only DRF
  API at `/api/contact/`, Django admin (read-only fields). Honeypot +
  per-IP throttle (`5/hour` default) spam mitigation. Resend email
  notifications, best-effort — the message is always saved regardless
  of email outcome. See `docs/DECISIONS.md` and `docs/SECURITY.md`.
- 26 backend tests passing (1 health + 8 projects + 6 research + 11
  contact).

**Frontend** (`frontend/`): Next.js (App Router) + TypeScript + Tailwind
v4. All six core pages now have real content — Home, About, Projects,
Research, Startup, and now **Contact (Phase 7)**:

- `/contact` — a real, working contact form. First Client Component in
  this project (`ContactForm.tsx`, `"use client"`), rendered inside a
  Server Component page so `/contact` still has real metadata. Handles
  submitting, success, rate-limited, and error states distinctly.
- New `src/lib/contact.ts` — reuses `getApiBaseUrl()` (always resolves
  to the browser branch here, since the form only ever runs client-side,
  but kept consistent with `projects.ts`/`research.ts` regardless).
- **SEO**: `app/sitemap.ts` (static routes + live project slugs, falls
  back gracefully if the backend's unreachable at generation time),
  `app/robots.ts` (disallows `/status`, the internal connectivity
  check), Open Graph + Twitter card metadata in the root layout,
  `NEXT_PUBLIC_SITE_URL` env var for canonical URLs.
- 60 passing frontend tests across 15 files (18 new this phase). Lint
  clean, typecheck clean.
- Verified live end-to-end again (same discipline as Phases 4–6): real
  HTTP POSTs against a running Django server confirmed a valid
  submission saves and returns 201, the honeypot silently succeeds
  without saving, invalid input returns 400, and a 6th request within
  an hour is actually throttled with a real 429 — not just asserted in
  mocked tests. Also fetched `/sitemap.xml` and `/robots.txt` live and
  confirmed Open Graph tags render in the actual page HTML.

**Infrastructure**: `docker-compose.yml` updated with Resend env vars
(backend) and `NEXT_PUBLIC_SITE_URL` (frontend). No structural changes.

**Fixed a real, months-old bug**: `frontend/.env.example` had been
silently misnamed `frontend/frontend.env.example` since a Phase 1
follow-up commit (`aa2e89f`) — the file existed but under the wrong
name, so the documented "running without Docker" instructions pointed
at a file that didn't actually exist at that path. Renamed via `git mv`
and verified the `.gitignore` exception now genuinely applies to it.

## What Phase Are We In

**Phase 7 — Contact & SEO** — built, self-verified (lint, typecheck, 26
backend + 60 frontend tests, live end-to-end verification of the
honeypot/throttle/validation paths and SEO routes). **Not yet visually
reviewed by the owner or run via Docker.**

## What Was Recently Completed

- Discussed and confirmed the contact form architecture with the owner
  before building anything — email delivery method (both email AND
  database) and email provider (Resend, after comparing against Gmail
  SMTP) were real decisions made together, not assumed.
- Verified Resend's actual current sandbox/domain-verification behavior
  via web search before building against it, rather than relying on
  training-data memory of a third-party API's constraints.
- Built the full contact form feature: backend model/API/admin/email
  integration, frontend form with honeypot + all four UI states, 18 new
  tests, all verified against real running servers (not just mocks).
- Built SEO essentials: dynamic sitemap (including live project data),
  robots.txt, Open Graph/Twitter metadata.
- Found and fixed a real, previously-unnoticed bug unrelated to this
  phase's main work (the misnamed `.env.example`) — caught only because
  this phase happened to need to edit that exact file.
- Updated `docs/SECURITY.md` and `docs/ARCHITECTURE.md`'s Contact System
  section from planned/conceptual to actually-implemented.

## What Is Currently Being Worked On

Nothing — Phase 7 is built and self-verified, awaiting delivery, Docker
verification, and the owner's visual review.

## What Remains

- **Owner has not yet run this via Docker or visually reviewed it.**
  Same caveat as every prior phase — plus this phase specifically needs
  the owner to actually create a Resend account and set
  `RESEND_API_KEY`/`CONTACT_RECIPIENT_EMAIL` in their `.env` before
  email notifications will work at all (the form still works and saves
  messages without this — see `docs/DECISIONS.md` — but no email will
  arrive until it's configured).
- Phase 8 (Quality — accessibility/performance/security review,
  production readiness) and Phase 9 (Future Expansion) remain per
  `docs/ROADMAP.md`. All six PRD "Core Pages" now have real content, so
  Phase 8 is the natural next step rather than more content phases.
- The owner still hasn't added their real Publications via admin
  (Phase 5) — not blocking, just still open.

## Important Temporary Constraints

- Any new server-side backend fetch must go through `getApiBaseUrl()`
  in `src/lib/api.ts` (or a domain file that reuses it).
- Any new design token must follow the two-name convention.
- Nav is intentionally 6 items — Experience/Education/Skills are
  sections of `/about`, not separate routes.
- Before writing any new UI copy or component, check it against
  `DESIGN.md`'s "Explicitly Avoided" list, AND run lint before calling
  a page done.
- Content-architecture pattern (established across Phases 3–6): decide
  static-vs-CMS per content type based on what's actually known and how
  often it changes.
- **New**: `RESEND_API_KEY` is a real secret — never commit a real
  value, never log it. `CONTACT_RECIPIENT_EMAIL` must match the Resend
  account's own email unless a custom domain gets verified later (see
  `DECISIONS.md`).
- **New**: the contact form's honeypot/throttle spam mitigation is the
  first-line defense per `SECURITY.md`'s own stated order — if spam
  becomes a real problem, the next step is a CAPTCHA, not silently
  reworking this approach.
- **New**: `/status` is intentionally excluded from `sitemap.ts` and
  disallowed in `robots.ts` — it's an internal connectivity check, not
  a real public page. Any future internal/debug-only route should get
  the same treatment.
- Postgres's host port mapping is intentionally commented out in
  `docker-compose.yml`.
- **Critical, still standing:** whenever git responsibility shifts
  between Claude and the owner, the first action is `git fetch origin`
  + compare against `origin/main` before any new commits.
