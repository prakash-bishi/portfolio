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

---

### 2026-09-14 — Separate server-side vs. browser-side API base URL for Docker networking

**Context:** During owner verification of `docker compose up`, the
`/status` page (a Server Component fetching the backend) failed with
"Could not reach the backend API", while the same backend endpoint
worked fine when opened directly in the browser. Root cause: inside
Docker Compose, `localhost` from within the frontend container refers to
the frontend container itself, not the backend container — server-side
fetches need the backend's Compose service name (`http://backend:8000`),
while browser-side fetches correctly use the host-mapped
`http://localhost:8000`.

**Decision:** Introduced a second env var, `INTERNAL_API_BASE_URL`, used
only for server-side fetches (`getApiBaseUrl()` in `src/lib/api.ts`
checks `typeof window === "undefined"` to decide which URL to use).
`docker-compose.yml` sets `INTERNAL_API_BASE_URL=http://backend:8000` on
the frontend service; it's unset (and unnecessary) outside Docker, where
the two URLs are the same.

**Alternatives considered:** Using a single URL and relying on
Docker's `extra_hosts`/network aliases to make `localhost` resolve to the
backend container (rejected — fragile, non-standard, and confusing for
future contributors); proxying all API calls through a Next.js API route
(rejected — adds a layer with no real benefit at this project's size).

**Reason:** This split is the standard pattern for containerized Next.js
apps that both server-render and client-fetch against the same API —
avoids surprising networking failures without adding real complexity.

**Consequences:** Any future server-side fetch to the backend (e.g. in
new Server Components or Route Handlers) must go through
`getApiBaseUrl()` / a helper like it, not a hardcoded `NEXT_PUBLIC_*`
variable, or this bug will resurface. Added regression tests in
`src/lib/__tests__/api.test.ts` covering all three cases (server+Docker,
server+non-Docker, browser) to catch this going forward.

---

### 2026-09-14 — Fixed: frontend/.env.example was silently never committed

**Context:** While tracing the fix above, found that `create-next-app`'s
auto-generated `frontend/.gitignore` has a blanket `.env*` pattern, which
also matched (and swallowed) `frontend/.env.example` — meaning it never
actually made it into the `bfa37b4` Phase 1 commit despite being created.

**Decision:** Added `!.env.example` to `frontend/.gitignore` to
explicitly un-ignore it, matching the intent (ignore real `.env`/
`.env.local` files, but always track the example template).

**Reason:** `.env.example` contains no secrets by definition — it's
documentation of what variables exist, and should always be committed.

**Consequences:** None beyond the fix itself. Worth remembering:
`create-next-app`'s default `.gitignore` is aggressive about `.env*` and
any future `*.env.example`-style file added there needs the same
un-ignore treatment, or a quick `git status`/`git add -n` check to catch
silently-skipped files.

---

### 2026-09-14 — Fixed: Django rejected server-side requests with 'Invalid HTTP_HOST header'

**Context:** After fixing the `INTERNAL_API_BASE_URL` networking issue
above, the owner still saw `/status` fail. Direct testing inside the
frontend container (`fetch('http://backend:8000/api/health/')`) showed
the real error: Django's `DisallowedHost` exception —
`ALLOWED_HOSTS = ['localhost', '127.0.0.1']` didn't include `backend`,
the Host header sent when reaching Django via its Docker Compose service
name. The two bugs were independent and both needed fixing: without the
`INTERNAL_API_BASE_URL` fix, the frontend never reaches the backend at
all (wrong address); without this fix, it reaches the backend but gets
rejected (right address, disallowed Host header).

**Decision:** Added `backend` to the default `DJANGO_ALLOWED_HOSTS` in
`docker-compose.yml` and `.env.example`:
`localhost,127.0.0.1,backend`.

**Reason:** `ALLOWED_HOSTS` must include every hostname Django will
legitimately receive requests addressed to — the Compose service name is
one of them for any server-side, container-to-container call.

**Consequences:** Anyone who already ran `cp .env.example .env` before
this fix has a `.env` file with the old value baked in — updating
`.env.example` alone does NOT fix their running setup, since Docker
Compose prefers a value already present in `.env` over the file's
default. They must manually add `,backend` to `DJANGO_ALLOWED_HOSTS` in
their own `.env` file (or delete/recreate it from the updated
`.env.example`) and recreate the backend container.
