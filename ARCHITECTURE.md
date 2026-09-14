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

Phase 0 (Documentation & Foundation) — no code has been written yet. No
frontend/backend/database has been initialized. This document defines the
target architecture; `ROADMAP.md` defines when each layer gets built.
