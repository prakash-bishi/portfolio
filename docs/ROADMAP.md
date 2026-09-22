# ROADMAP.md — Phases

Roadmap items are not authorization to build — see `RULES.md` (No
Premature Features). Each phase begins only when explicitly requested.

## Current Phase

**Phase 7 — Contact & SEO** — not yet started. Phase 6 is complete,
verified visually by the owner on their own machine.

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

## Phase 3 — Personal Profile — COMPLETE (verified on real machine)
- About page with Experience, Education, and Skills as sections (not
  separate routes — see the nav IA decision in `DECISIONS.md`)
- Content is static/hardcoded (`src/content/profile.ts`), not a Django
  CMS model — see the Phase 3 decision in `DECISIONS.md`

## Phase 4 — Projects — COMPLETE (verified on real machine)
- Project CMS model, DRF API, Django admin (real, per the Phase 3
  vs. Phase 4 content-architecture distinction in `DECISIONS.md`)
- Project listing page, project detail pages (dynamic route)
- Seeded with the owner's 6 real projects via data migration
- No filtering yet — not justified by 6 projects; revisit if the list
  grows enough to need it

## Phase 5 — Research — COMPLETE (verified on real machine)
- Research interests: static content, three real areas (Computer Vision
  for Agriculture, Novel Class Discovery, Efficient Object Detection)
- Publications: CMS-backed (`research.Publication` model/API/admin),
  same pattern as Projects — but seeded empty, since no real
  publication details existed yet (see `DECISIONS.md`)
- Honest empty state shown until the owner adds real papers/thesis via
  admin

## Phase 6 — Startup — COMPLETE (verified on real machine)
- Startup identity, capabilities (static content, not CMS — see
  `DECISIONS.md`)
- Capabilities traced directly to already-verified skills — no new
  claims, no fabricated services/clients/case studies
- AI/data areas, projects/prototypes: reflected via capability groups
  and links to the existing About/Projects pages, not duplicated content
- Contact/partnership pathway: a CTA linking to `/contact` (still a
  stub — Phase 7 builds the real page)

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
