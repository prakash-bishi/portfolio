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

---

### 2026-09-14 — Environment-driven Django settings, Postgres-by-default with sqlite fallback

**Context:** Needed backend settings that follow `SECURITY.md` (no
secrets in source) while still being easy to run locally without
requiring Docker/Postgres for a quick check.

**Decision:** All settings read from environment variables (loaded via
`python-dotenv` from an optional `.env` file). `DATABASE_ENGINE=sqlite`
opts into sqlite for quick local runs; anything else (including the
unset default) uses PostgreSQL, matching what Docker Compose always sets.

**Alternatives considered:** `django-environ` (rejected — an extra
dependency for something a small `python-dotenv` + `os.environ.get`
pattern handles fine at this project's size).

**Reason:** Keeps local iteration fast without Docker while making
Postgres the real default, avoiding a sqlite-in-dev/Postgres-in-prod
mismatch as the default path.

**Consequences:** Contributors running without Docker must explicitly opt
into sqlite; forgetting `DATABASE_ENGINE=sqlite` without a local Postgres
running will fail loudly rather than silently using sqlite.

---

### 2026-09-14 — Vitest + React Testing Library for frontend tests

**Context:** Needed a frontend test runner for Phase 1's "basic testing
setup" requirement.

**Decision:** Vitest + `@testing-library/react` + jsdom, rather than
Jest.

**Alternatives considered:** Jest (rejected — Vitest integrates more
directly with the Vite-based tooling ecosystem and had no meaningful
downside for this project's needs).

**Reason:** Faster local test runs, simpler config, no dependency
conflicts once `@types/node` was bumped to satisfy Vitest 5's peer
requirement.

**Consequences:** `package.json` requires `"type": "module"` for the
Vitest config to load cleanly as ESM; verified this doesn't break the
Next.js build tooling.

---

### 2026-09-14 — Frontend production build not verified in Claude's sandbox

**Context:** `npm run build` failed inside Claude's sandbox because
`next/font/google` (used for the default Geist typeface) needs to reach
`fonts.googleapis.com`, which is outside the sandbox's allowed domain
list.

**Decision:** Treat this as a sandbox limitation, not a code defect.
Left the default Google-hosted Geist font in place rather than switching
to `next/font/local` preemptively.

**Alternatives considered:** Self-host the font now with `next/font/local`
(rejected for now — adds files/complexity before Phase 2's real
typography decisions; premature given `DESIGN.md` hasn't been filled in
yet).

**Reason:** No real project requirement for an offline build environment
exists yet. Revisit if that constraint ever becomes real.

**Consequences:** The project owner must verify `npm run build` succeeds
on a machine with normal internet access before treating Phase 1 as fully
confirmed. See `docs/TESTING.md` "Known Constraint".
