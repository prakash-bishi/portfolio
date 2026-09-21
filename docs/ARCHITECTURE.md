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

## Contact System (conceptual flow)

```
Visitor → Next.js Contact Form → Django API → Validation
        → Spam/security checks → Database/email workflow
```

Exact implementation TBD in the relevant phase. Secrets never reach the
frontend.

## Media Strategy

Separate media metadata (DB) from actual media storage. Local storage is
fine for development. Object storage is a later concern, only if actually
required — do not build it prematurely.

## Explicitly Out of Scope (until justified)

Microservices, Kubernetes, complex event-driven systems, enterprise auth,
distributed AI infra, large data pipelines, workflow engines, agent
frameworks, RAG, complex infrastructure generally.

## Current Status

Through Phase 6 (Startup):

- `backend/` — Django + DRF project (`config`), with three apps:
  - `health` — `GET /api/health/` (checks DB connectivity, returns
    200/503).
  - `projects` — `Project` model, DRF read-only API at
    `/api/projects/` (list) and `/api/projects/<slug>/` (detail),
    Django admin. Seeded via data migration with the owner's real
    projects.
  - `research` — `Publication` model, DRF read-only API at
    `/api/publications/`, Django admin. **Not seeded** — the owner will
    add real papers/thesis via admin themselves.
  - See `docs/DECISIONS.md` for why Projects and Publications are
    CMS-backed while the About page (Phase 3) and research interests
    (Phase 5) are static content, and why model fields avoid
    Postgres-only types (e.g. `ArrayField`).
  - Settings are fully environment-driven (see `.env.example` files);
    PostgreSQL by default, sqlite fallback for quick local runs without
    Docker.
- `frontend/` — Next.js (App Router) + TypeScript + Tailwind, with the
  full design system (Phase 2), a real About page (Phase 3, static
  content from `src/content/profile.ts`), real Projects pages (Phase 4,
  `/projects` and `/projects/[slug]` — this project's first dynamic
  route), and a real Research page (Phase 5, `/research` — static
  interests + CMS-backed publications). Phase 6 adds a real Startup
  page (`/startup` — static capability content, no new backend, traced
  directly to already-verified skills — see `docs/DECISIONS.md`), both
  fetching live from the backend via `src/lib/projects.ts` and
  `src/lib/research.ts`.
- `docker-compose.yml` at repo root — `db` (Postgres, no host port
  mapping — see `DECISIONS.md`), `backend`, `frontend` services with
  health checks and volumes. Confirmed working end-to-end on the
  owner's machine as of Phase 2.
- Contact is still a `ComingSoon` stub — Phase 7 per `ROADMAP.md`.

One implementation note: `create-next-app` generates its own
`frontend/AGENTS.md` and `frontend/CLAUDE.md` — these are Next.js
framework-level agent notes (regenerated by `next dev`), unrelated to
this repo's own `AGENTS.md`/`CLAUDE.md` at the root. They coexist without
conflict since they're in different directories; don't confuse the two
when navigating the repo.
