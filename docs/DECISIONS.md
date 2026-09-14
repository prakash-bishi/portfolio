# DECISIONS.md — Decision Log

Record significant decisions only (not trivial implementation details).
For each: Date, Decision, Context, Alternatives, Reason, Consequences.

---

### 2026-09-14 — Adopt Next.js + Django + PostgreSQL + FastAPI stack

**Context:** Fresh project restart; needed a stack that supports a
portfolio now and an AI/data platform later without premature complexity.

**Decision:** Next.js/React/TypeScript frontend, Django + DRF backend,
PostgreSQL database, FastAPI as an independent future AI foundation,
Docker/Docker Compose for infra.

**Alternatives considered:** Single Next.js full-stack app (rejected —
would blur CMS/business logic into the frontend); Django-only with
server-rendered templates (rejected — weaker UX/interactivity and future
AI-demo needs favor a decoupled frontend).

**Reason:** Matches the two-domain content model (Personal + Startup)
well; keeps AI functionality decoupled so it can be introduced later
without redesigning the site; each layer is boring/standard and
well-supported.

**Consequences:** More moving parts than a single framework; requires
Docker Compose to run locally; API contract between Next.js and Django
must be maintained.

---

### 2026-09-14 — No GitHub repo yet; work staged locally per session

**Context:** Project owner does not yet have a GitHub repository set up.

**Decision:** Build the project in Claude's sandboxed environment as a
local git repo, and deliver work as downloadable files/zips until a real
GitHub repo exists. Recommend the owner create one as soon as practical
so `../AGENTS.md`'s "the repository remembers" principle actually holds
across sessions.

**Alternatives considered:** Waiting to do any work until a repo exists
(rejected — blocks Phase 0 unnecessarily).

**Reason:** Unblocks documentation/foundation work now; the risk is that
without a persistent remote, continuity across Claude sessions depends on
the owner re-uploading the latest export each time.

**Consequences:** Every future session should start by asking whether a
GitHub repo now exists, and if so, work directly against it instead of a
fresh sandbox copy.
