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
"additional documentation" rule in `../AGENTS.md`).

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

**Implemented (Phase 7):**
- Server-side validation via DRF serializer (`backend/contact/
  serializers.py`) — name/email/message required, email format checked,
  message capped at 5000 characters. Client-side validation exists too
  (HTML5 `required`/`type="email"`) but is a UX convenience only, never
  trusted as the actual check.
- Honeypot field (`website`) — hidden from real visitors via CSS,
  `tabIndex={-1}`, and `aria-hidden`. A filled honeypot is silently
  treated as a fake success (still 201, nothing saved or emailed) so
  bots aren't tipped off that they were caught.
- Per-IP rate limiting via DRF's `AnonRateThrottle`, scoped to the
  contact endpoint specifically (`5/hour` default, overridable via
  `CONTACT_THROTTLE_RATE`).
- No sensitive data exposed in error responses — validation errors
  return only the field-level messages DRF generates, never internal
  details.
- Escalation path if spam still gets through in practice: add a
  third-party CAPTCHA (reCAPTCHA/hCaptcha) as the next step, per the
  original plan — not a silent rewrite of the honeypot/throttle
  approach. See `docs/DECISIONS.md` for the reasoning.

The submitted message is always saved to the database as its own step,
independent of whether the Resend notification email succeeds — see
"Email / Contact Notifications" below.

## Email / Contact Notifications

- Resend (see `docs/DECISIONS.md` for why), via `RESEND_API_KEY` — a
  real secret, never committed, never logged.
- `CONTACT_RECIPIENT_EMAIL` must match the email address on the Resend
  account unless/until a custom domain is verified there — Resend
  restricts unverified-domain sending to the account's own address (see
  `backend/contact/email.py`'s docstring).
- Email sending failure is caught and logged, never raised as a 500 to
  the visitor, and never blocks or loses the underlying database record
  — `ContactMessage.email_notification_sent` tracks the outcome for
  admin visibility without making delivery a hard dependency.

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
