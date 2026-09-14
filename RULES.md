# RULES.md — Non-Negotiable Development Rules

## 1. Truth Rule (highest priority)

Never fabricate: clients, customers, revenue, employees, partnerships,
deployments, production systems, publications, awards, certifications,
testimonials, business contracts, case studies, statistics, research
results, startup traction, users, investors, funding, or institutional
relationships.

When information is unavailable or aspirational, use honest status
language: "In development", "Research", "Prototype", "Exploration",
"Planned", "Capability", "Currently developing".

Always clearly distinguish: **current capability** vs **prototype** vs
**research** vs **future service** vs **future product**. Never blur these.

## 2. Dependency Discipline

Before adding any dependency, confirm:
- Is it actually necessary?
- Can the existing stack solve the problem?
- Is it actively maintained?
- Does it add unnecessary complexity or bundle size?
- Is there a simpler standard solution?

Do not add dependencies for convenience alone.

## 3. No Unrelated Refactoring

Stay inside the scope of the current task. Unrelated cleanup/refactors go
through their own task, not piggybacked on an unrelated change.

## 4. No Silent Architecture Changes

Significant architecture changes require the analysis described in
`AGENTS.md` ("Architecture Change Rule") and a record in `DECISIONS.md`.

## 5. No Premature Features

Do not implement roadmap/future-scope items because they're documented.
Documentation describes intent, not authorization to build.

## 6. No Secrets in Source Code

No API keys, passwords, tokens, credentials, or private keys committed to
the repository, ever. Use environment variables (see `SECURITY.md`,
`.env.example`).

## 7. Reuse Components

Don't create duplicate UI implementations for the same pattern. Check
existing components before building new ones.

## 8. Maintain Tests

Meaningful features need appropriate tests (see `TESTING.md`). Don't chase
arbitrary coverage numbers — prioritize meaningful coverage.

## 9. Maintain Documentation

Update the authoritative document when the thing it describes changes.
Don't let docs drift from reality.

## 10. Follow Existing Conventions

Match the patterns already established in the codebase rather than
introducing a personal/inconsistent style.

## 11. Proportional Engineering

Industry standard ≠ maximum complexity. Do not introduce microservices,
Kubernetes, complex event-driven systems, enterprise authentication,
distributed AI infrastructure, large data pipelines, workflow engines,
agent frameworks, RAG, or other heavy infrastructure without a real,
current project requirement.
