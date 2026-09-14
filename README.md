# Prakash Bishi — Portfolio + AI/Data & Computer Vision Startup Platform

Personal portfolio and an emerging AI/Data & Computer Vision startup
presence. See `docs/PRD.md` for full product context.

**Working on this project?** Start at `CLAUDE.md`, then `AGENTS.md`.

## Stack

Next.js/TypeScript frontend, Django + DRF backend, PostgreSQL, Docker
Compose for local development. Full details in `docs/ARCHITECTURE.md`.

## Running Locally (Docker — recommended)

```bash
cp .env.example .env      # adjust values if needed
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API health check: http://localhost:8000/api/health/
- Frontend/backend connectivity check: http://localhost:3000/status

First run only — apply database migrations in a second terminal:

```bash
docker compose exec backend python manage.py migrate
```

## Running Locally (without Docker)

**Backend:**
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # defaults to sqlite, no Postgres needed
python manage.py migrate
python manage.py runserver
```

**Frontend:**
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

## Testing

```bash
# Backend
cd backend && python manage.py test

# Frontend
cd frontend && npm run test
```

See `docs/TESTING.md` for the full testing strategy.

## Project Status

Phase 1 (Technical Foundation) — see `docs/ROADMAP.md` and
`docs/MEMORY.md` for current status.
