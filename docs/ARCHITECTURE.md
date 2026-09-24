# ARCHITECTURE.md — System Architecture

## Stack

- **Frontend:** Next.js + React + TypeScript
- **Backend:** Django + Django REST Framework
- **Database:** PostgreSQL
- **AI Foundation (future-facing, not built yet):** FastAPI — independent
  service, not a dependency for ordinary portfolio pages
- **Infrastructure:** Docker + Docker Compose
- **Version Control:** Git / GitHub

Use current stable versions; verify compatibility before introducing major
dependencies. Do not add technology because it's popular — see
`RULES.md` / dependency rules.

## Layered Responsibilities

### Frontend (Next.js)
- Presentation, navigation, UI, responsive design, interactions.
- Consumes Django REST API.
- SEO-relevant rendering (choose static/ISR/SSR per page need — see below).
- No core business logic here.

### Backend (Django + DRF)
- CMS/content management, admin interface.
- REST API.
- Database interaction, validation, business logic.
- Contact form processing.
- Media/content management.
- Authentication, if eventually required.

### Database (PostgreSQL)
- Structured persistent data for both the Personal and Startup domains.

### AI Foundation (FastAPI)
- Independent service for future AI functionality.
- Must not become a load-bearing dependency for the portfolio's normal
  pages. Can be introduced incrementally without redesigning the site.

## Domain Model

Two logically distinct domains, sharing infrastructure where sensible:

**Personal Domain:** Profile, Experience, Education, Skills, Projects,
Research, Publications.

**Startup Domain:** Startup profile, Startup capabilities, Services,
AI/data projects, Products in development, Future offerings.

Do not create models merely because they're theoretically possible —
create them based on real content-management requirements (see
`RULES.md`).

## Rendering Strategy

Choose per page, not globally:
- Static generation where content is stable (About, Skills, etc.)
- ISR where content updates periodically (Projects, Research)
- Server rendering where required (dynamic/contact-adjacent content)
- Client rendering only where real interaction requires it

Do not make everything dynamic by default. Do not introduce caching
without a concrete reason. Redis is out of scope until there's a real
need (caching, rate limiting, background jobs, task queues).

## Contact System (implemented, Phase 7)

```
Visitor → ContactForm (Client Component) → POST /api/contact/
        → DRF validation + honeypot check + per-IP throttle
        → ContactMessage saved to DB (always, regardless of what follows)
        → Resend notification email (best-effort — failure is logged,
          never blocks the response or loses the saved message)
```

`frontend/src/components/ContactForm.tsx` is a Client Component (the
only interactive form in this project so far) rendered inside a Server
Component page (`app/contact/page.tsx`) so the page still gets real
metadata. `backend/contact/` holds the model, serializer, view, and the
Resend integration (`contact/email.py`). See `docs/DECISIONS.md` for why
Resend was chosen and how the honeypot/throttle spam mitigation works,
and `docs/SECURITY.md` for the full security posture. Secrets
(`RESEND_API_KEY`) never reach the frontend — only the backend reads it.

## Media Strategy

Separate media metadata (DB) from actual media storage. Local storage is
fine for development. Object storage is a later concern, only if actually
required — do not build it prematurely.

## Explicitly Out of Scope (until justified)

Microservices, Kubernetes, complex event-driven systems, enterprise auth,
distributed AI infra, large data pipelines, workflow engines, agent
frameworks, RAG, complex infrastructure generally.

## Current Status

Through Phase 7 (Contact & SEO):

- `backend/` — Django + DRF project (`config`), with four apps:
  - `health` — `GET /api/health/` (checks DB connectivity, returns
    200/503).
  - `projects` — `Project` model, DRF read-only API at
    `/api/projects/` (list) and `/api/projects/<slug>/` (detail),
    Django admin. Seeded via data migration with the owner's real
    projects.
  - `research` — `Publication` model, DRF read-only API at
    `/api/publications/`, Django admin. **Not seeded** — the owner will
    add real papers/thesis via admin themselves.
  - `contact` — `ContactMessage` model, DRF write-only API at
    `/api/contact/` (POST), Django admin (read-only fields — messages
    are viewed, not edited). Honeypot + per-IP throttle spam mitigation.
    Resend integration for email notifications (`contact/email.py`).
    See `docs/DECISIONS.md` and `docs/SECURITY.md`.
  - See `docs/DECISIONS.md` for why Projects/Publications/Contact are
    each structured the way they are, and why model fields avoid
    Postgres-only types (e.g. `ArrayField`).
  - Settings are fully environment-driven (see `.env.example` files);
    PostgreSQL by default, sqlite fallback for quick local runs without
    Docker.
- `frontend/` — Next.js (App Router) + TypeScript + Tailwind, with the
  full design system (Phase 2), a real About page (Phase 3, static
  content), real Projects pages (Phase 4, this project's first dynamic
  route), a real Research page (Phase 5, static interests + CMS-backed
  publications), a real Startup page (Phase 6, static capabilities), and
  a real Contact page (Phase 7, this project's first Client Component —
  see the Contact System section above). SEO: `app/sitemap.ts` (static
  routes + live project slugs), `app/robots.ts`, and Open Graph/Twitter
  card metadata in the root layout.
- `docker-compose.yml` at repo root — `db` (Postgres, no host port
  mapping — see `DECISIONS.md`), `backend`, `frontend` services with
  health checks and volumes. Confirmed working end-to-end on the
  owner's machine as of Phase 2.
- All six core pages now have real content — no `ComingSoon` stubs
  remain (only `/status`, the internal connectivity check, which is
  intentionally excluded from the sitemap and disallowed in robots.txt).

One implementation note: `create-next-app` generates its own
`frontend/AGENTS.md` and `frontend/CLAUDE.md` — these are Next.js
framework-level agent notes (regenerated by `next dev`), unrelated to
this repo's own `AGENTS.md`/`CLAUDE.md` at the root. They coexist without
conflict since they're in different directories; don't confuse the two
when navigating the repo.
