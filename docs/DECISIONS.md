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

---

### 2026-09-14 — Nav shows 6 top-level items; Experience/Education/Skills fold into /about

**Context:** PRD's Core Pages list (`PRD.md`) names About, Experience,
Education, Skills, Projects, Project Details, Research, Startup, Contact
as separate pages. Building the Navbar (Phase 2) required deciding
whether each becomes its own top-level nav link or whether some are
grouped.

**Decision:** 6 top-level nav items: Home (wordmark), About, Projects,
Research, Startup, Contact. Experience, Education, and Skills become
sections within the `/about` page (built in Phase 3) rather than
separate top-level routes/nav links.

**Alternatives considered:** One nav link per PRD "Core Page" (9+ items)
— rejected as cluttered for a personal portfolio nav and against the
"Clean" design pillar; a nav dropdown/mega-menu — rejected as
unnecessary complexity for this content volume.

**Reason:** Recruiters/academics scanning a portfolio nav expect a small,
standard set of top-level sections; Experience/Education/Skills read
naturally as sections of "who this person is" (About) rather than
independent destinations.

**Consequences:** Phase 3 (Personal Profile) must build About as a
single page with distinct Experience/Education/Skills sections
(consistent anchor-linkable structure), not as separate routes. If a
real future need for standalone URLs emerges (e.g. a shareable
`/experience` link), that's a scope change requiring its own decision
entry, not an assumption to silently reverse.

---

### 2026-09-14 — Design system grounded in computer vision annotation, not generic "AI" visuals

**Context:** Phase 2 required an actual color/type/layout system,
constrained by `DESIGN.md`'s "Scientific + Cool + Clean + Professional"
direction and explicit avoidance of generic AI-page clichés.

**Decision:** Grounded the palette and one structural motif in Prakash's
real CV work — object-detection bounding boxes. Accent color
(`#15C46B`, "detection green") references the conventional bounding-box
color in CV tooling; a corner-bracket motif (used once, in the hero)
references a bounding-box frame. Typography pairs Space Grotesk
(technical grotesk, headings/UI) with Source Serif 4 (body, academic
warmth) — two families with distinct jobs, not decoration.

**Alternatives considered:** The default Inter/Geist + centered hero +
rounded-card SaaS template (rejected — exactly the generic pattern
`DESIGN.md` warns against); monospace type for small data-style labels
(rejected — flagged by the frontend-design skill as a common
AI-generated-page tell when used decoratively rather than for genuine
code/data content).

**Reason:** A visual identity grounded in the person's actual technical
work reads as intentional and specific rather than templated; avoids
generic AI-startup visual language while still feeling "scientific."

**Consequences:** Any future visual additions (Card components, project
thumbnails, etc.) should stay consistent with this grounding — sharp
corners over rounded pills, hairline borders over soft shadows, the
accent color reserved for deliberate moments rather than repeated
decoration. Documented fully in `docs/DESIGN.md`.

---

### 2026-09-14 — Stub pages for all nav destinations, using a shared ComingSoon placeholder

**Context:** The Navbar (Phase 2) needs working links for About,
Projects, Research, Startup, Contact — but those pages' real content is
scoped to later phases (Phase 3, 4, 5, 6, 7 respectively per
`ROADMAP.md`).

**Decision:** Created minimal route files for each destination
(`/about`, `/projects`, `/research`, `/startup`, `/contact`), each
rendering a shared `ComingSoon` component (title + one-line note, no
real content).

**Alternatives considered:** Leaving the nav links pointing at
not-yet-existing routes (rejected — produces real 404s, a broken
foundation to build on); building full page content now (rejected —
blurs Phase 2/3+ scope boundaries per `ROADMAP.md` and violates the "No
Premature Features" rule in `RULES.md`).

**Reason:** A site shell should be genuinely navigable without dead
links; a placeholder is proportional scaffolding, not premature content.

**Consequences:** Each later phase (3 through 7) replaces its
corresponding stub's content — the routes already exist, so those phases
start from "write the real page" rather than "wire up routing."

---

### 2026-09-14 — Fixed: CSS variable naming collision in Tailwind v4 theme mapping

**Context:** Initial `globals.css` draft named root design tokens
identically to the `@theme inline` block that maps them for Tailwind
(both used `--color-bg`, `--color-ink`, etc.), creating a
self-referential `var(--color-bg): var(--color-bg)`-style mapping.

**Decision:** Renamed root tokens without the `color-` prefix (`--bg`,
`--ink`, `--surface`, etc.) so the `@theme inline` block cleanly maps
`--color-bg: var(--bg)` without any naming collision.

**Reason:** Caught before it shipped by re-reading the generated CSS
logic, not through a runtime failure — worth recording so a future
session doesn't reintroduce the same naming pattern when adding new
design tokens.

**Consequences:** Any new design token must follow the same
two-name convention: a plain root variable (`--foo`) plus its
`--color-foo`/`--font-foo`/etc. mapping in `@theme inline`, never the
same name in both places.

---

### 2026-09-14 — Removed host port mapping for Postgres to avoid Windows port-exclusion conflicts

**Context:** `docker compose up` failed on the owner's Windows machine
with `bind: An attempt was made to access a socket in a way forbidden by
its access permissions` on port 5432. `netstat -ano | grep 5432` showed
nothing using the port — ruling out a conflicting process (e.g. a native
Postgres install). This matches a known Windows/WSL2/Hyper-V behavior:
Windows reserves ("excludes") ranges of ports for its own NAT/networking
stack, and a port can fall in that range even with nothing visibly using
it, blocking any other process — including Docker — from binding it.
This can appear or disappear across reboots or Windows updates, so it's
not reliably fixable from the project side.

**Decision:** Removed the `ports: ["5432:5432"]` mapping from the `db`
service in `docker-compose.yml` (left commented out with an explanation,
for anyone who wants to connect a GUI DB tool directly). `backend`
reaches `db` over Docker's internal network via the service name `db`
regardless — the host mapping was never functionally required by the
app, only a convenience for external tools.

**Alternatives considered:** Diagnosing/fixing the Windows port-exclusion
range directly (`netsh interface ipv4 show excludedportrange`, freeing
the range, or restarting the `winnat` service) — rejected as the primary
fix since it's a machine-specific, potentially-recurring OS quirk outside
the project's control; documenting it as a fallback instead. Remapping
to a different host port (e.g. `5433:5432`) — viable alternative, but
removing the mapping entirely is simpler and the app doesn't need it.

**Reason:** The app has zero functional dependency on Postgres being
reachable from the Windows host — only backend↔db (both inside Docker)
matters. Removing an unnecessary host exposure eliminates an entire class
of host-networking conflicts (this one, and any future port collision on
5432) rather than working around one instance of it.

**Consequences:** The owner cannot connect a GUI tool (pgAdmin,
TablePlus, DBeaver, etc.) to `localhost:5432` unless they uncomment the
port mapping themselves — documented inline in `docker-compose.yml`. If
they do and hit the same bind error, the fix is a different host port,
not re-diagnosing this from scratch.
