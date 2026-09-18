# ROADMAP.md — Phases

Roadmap items are not authorization to build — see `RULES.md` (No
Premature Features). Each phase begins only when explicitly requested.

## Current Phase

**Phase 3 — Personal Profile** — built and self-verified (lint,
typecheck, 18 tests pass); awaiting the owner's visual review, same as
every prior phase. See `MEMORY.md`.

## Phase 0 — Documentation & Foundation — COMPLETE
- Repository inspection
- Documentation system (this set of files)
- Architecture validation

## Phase 1 — Technical Foundation — COMPLETE (verified on a real machine)
- Frontend foundation (Next.js + TypeScript scaffold)
- Backend foundation (Django + DRF scaffold)
- Database setup (PostgreSQL)
- API foundation (`/api/health/`)
- Docker/Docker Compose development environment
- Health checks
- Basic testing setup

## Phase 2 — Design System & Site Shell — COMPLETE (verified on real machine)
- Typography, color system, layout/spacing tokens
- Navbar, footer, responsive shell
- Reusable UI primitives (Container, Button, ComingSoon)
- Stub routes for every nav destination

## Phase 3 — Personal Profile — AWAITING VISUAL REVIEW
- About page with Experience, Education, and Skills as sections (not
  separate routes — see the nav IA decision in `DECISIONS.md`)
- Content is static/hardcoded (`src/content/profile.ts`), not a Django
  CMS model — see the Phase 3 decision in `DECISIONS.md`

## Phase 4 — Projects
- Project CMS models, API
- Project listing (+ filtering if justified)
- Project detail pages

## Phase 5 — Research
- Research interests, research projects
- Publications (only if genuine ones exist)
- Honest status labeling throughout

## Phase 6 — Startup
- Startup identity, capabilities, services
- AI/data areas, projects/prototypes
- Contact/partnership pathway

## Phase 7 — Contact & SEO
- Contact workflow, spam protection, validation
- SEO: metadata, sitemap, structured data where useful

## Phase 8 — Quality
- Accessibility review
- Performance review
- Security review
- Responsive review
- Testing pass
- Production readiness

## Phase 9 — Future Expansion (explicit approval required per item)
- AI assistant / RAG / chatbot
- AI demos
- Annotation platform
- Client portal
- Dataset platform
- Automation / business workflows
- Authentication / payments

## Future Possible Sections (not scoped yet)
Blog, Teaching, Publications (standalone), AI Demos, Services, Case
Studies, Resources.
