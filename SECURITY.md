# SECURITY.md — Security Requirements

## Secret Management

- Never commit API keys, passwords, tokens, database credentials, private
  keys, or any secret environment variable.
- All secrets live in environment variables, loaded via `.env` (see
  `.env.example` for required variable names, no real values).
- `.env` (and any real-value env file) must be gitignored.

## Environment Variables

Document required variables in `.env.example` as they're introduced.
Escalate to a dedicated `ENVIRONMENT.md` if this grows complex (per the
"additional documentation" rule in `AGENTS.md`).

## Authentication / Authorization

Not required for the initial portfolio (no user accounts, no login).
Django admin authentication protects the CMS/admin interface. Revisit if
a client portal or user accounts become a real requirement (Phase 9+,
future scope only).

## API Security

- Input validation on every API endpoint (DRF serializers).
- Rate limiting on the contact endpoint at minimum, to deter abuse.
- CORS configured to allow only the known frontend origin(s).
- CSRF protection where Django's session-based mechanisms apply; for a
  token/JSON API, follow DRF's standard guidance.

## Contact Form / Spam Protection

- Server-side validation (never trust client-side validation alone).
- Basic spam mitigation (e.g. honeypot field and/or rate limiting) before
  considering a third-party CAPTCHA service.
- No sensitive data exposed in error responses.

## File Uploads (if/when introduced)

- Validate file type and size server-side.
- Never execute or serve uploaded files as code.
- Store outside the web root or behind controlled media serving.

## Database Security

- Least-privilege DB credentials for the application user.
- Parameterized queries via the ORM (no raw string-built SQL).

## Dependency Security

- Keep dependencies reasonably current.
- Avoid unmaintained packages (see `RULES.md` dependency discipline).

## Web Security Baseline

- XSS: rely on React/Next.js's default escaping; avoid `dangerouslySetInnerHTML`
  unless content is fully trusted/sanitized.
- CSRF: per Django/DRF standard mechanisms.
- Security headers: standard set (CSP, X-Content-Type-Options,
  X-Frame-Options or frame-ancestors, Referrer-Policy) — finalize specifics
  in the phase that ships production deployment.

## Logging & Privacy

- Don't log secrets or full contact-form PII beyond what's operationally
  necessary.
- Don't expose internal stack traces or error details to end users (see
  `RULES.md` / error handling).

## Scope Discipline

Do not over-engineer security for features that don't exist yet (e.g. no
OAuth/SSO infrastructure until there's an actual authenticated feature).
Security implementation should match the actual features being built.
