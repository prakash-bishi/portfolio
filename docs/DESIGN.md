# DESIGN.md — Visual & Interaction Design

## Direction

**Scientific + Cool + Clean + Professional.**

- **Scientific** — structured layouts, technical visual language, subtle
  data/AI references, clean information hierarchy.
- **Cool** — modern typography, refined motion, tasteful interaction
  details.
- **Clean** — generous whitespace, restrained components, clear hierarchy,
  minimal clutter.
- **Professional** — credible, mature, readable, trustworthy.

## Grounding Concept

The visual identity is grounded in Prakash's actual computer vision work
— specifically, object-detection/image annotation (bounding boxes,
keypoints, segmentation masks drawn over images). This gives a concrete,
non-generic source for the palette and one structural motif, rather than
reaching for generic "AI" visual clichés (neural-net graphics, gradients,
glowing orbs, robots).

## Color System

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F6F7F5` | Page background — pale, cool "lab paper," not the common cream/terracotta AI-generated default |
| `--surface` | `#FFFFFF` | Cards/panels (used sparingly — most content sits directly on `--bg`) |
| `--ink` | `#12181F` | Primary text — deep slate, not pure black |
| `--ink-muted` | `#52606D` | Secondary/supporting text |
| `--line` | `#D8DEE3` | Hairline borders, dividers |
| `--accent` | `#15C46B` | "Detection green" — the conventional color of an object-detection bounding box in CV tooling. One deliberate accent, used sparingly (hover states, focus rings, the hero's corner-bracket motif) — never as a background wash or repeated decoration. |
| `--accent-ink` | `#FFFFFF` | Text/icon color when placed on the accent color |

Defined as CSS custom properties in `frontend/src/app/globals.css` and
mapped into Tailwind v4's `@theme` block, so they're available both as
Tailwind utility classes (`bg-ink`, `text-accent`, `border-line`, etc.)
and as raw CSS variables where needed.

## Typography

Two typefaces, each with one clear job (not decoration):

- **Space Grotesk** — headings, navigation, buttons, UI chrome. A
  technical, slightly engineered grotesk that fits the CV/engineering
  side of the identity.
- **Source Serif 4** — body/reading text. Adds academic warmth (fits the
  Assistant Professor identity) and contrasts deliberately with the
  grotesk headings.

Loaded via `next/font/google` in `frontend/src/app/layout.tsx`. Falls
back gracefully to system fonts if Google Fonts is unreachable (verified
in Claude's sandbox, which cannot reach `fonts.googleapis.com` — the
owner should confirm the real fonts load correctly on a machine with
normal internet access).

**Type scale** (modular, ~1.25 ratio, base 17px — serif body reads
better slightly larger than the usual 16px default):

| Token | Size |
|---|---|
| `--text-xs` | 13px |
| `--text-sm` | 15px |
| `--text-base` | 17px |
| `--text-lg` | 20px |
| `--text-xl` | 25px |
| `--text-2xl` | 31px |
| `--text-3xl` | 39px |
| `--text-4xl` | 49px |

Body line length is kept under ~80 characters via `max-w-*` utilities on
prose containers; serif body copy uses slightly more line-height (1.65)
than the sans UI chrome.

## Layout

- **Alignment:** left-aligned, asymmetric compositions — deliberately
  not the centered-hero SaaS default.
- **Max content width:** 1120px, via the shared `Container` component
  (`frontend/src/components/Container.tsx`).
- **Radii:** sharp/minimal (2–4px), not the rounded-card default.
- **Borders over shadows:** hairline `--line` borders are preferred over
  soft drop shadows for separating content.
- **One structural motif:** small corner-bracket marks (referencing a
  bounding-box frame) appear once, framing the name in the homepage hero
  — a bounding box around the subject. Not repeated as decoration
  elsewhere on the site. Framing a wider text block was tried first and
  failed visually: with left-weighted, ragged content the bottom-right
  mark floats in empty space and reads as a stray glitch rather than a
  frame. Keep the motif tight around the element it frames.

## Explicitly Avoided (and why)

Per the frontend-design skill's calibration notes on common
AI-generated-page tells, this project deliberately avoids:
- Warm cream background + terracotta accent + serif display (the most
  common AI-generated default combination)
- Centered hero with a big number, gradient accent, and rounded SaaS cards
- Monospace type used decoratively for small labels (only justified if
  displaying genuine code/data content, not as a "techy" label style)
- Tracked-out ALL-CAPS eyebrow labels, middle-dot-joined meta strings,
  '→' appended to every link/button
- Excessive gradients, excessive animation, unnecessary 3D effects,
  generic AI iconography (robots, neural-net graphics, glowing orbs)
- Childish styling or visual clutter

## Components (Phase 2)

Built as reusable primitives in `frontend/src/components/`:

- `Navbar` — responsive, keyboard-accessible, active-link state, mobile
  menu toggle
- `Footer` — matching nav links, dynamic copyright year
- `Container` — the one horizontal max-width/padding primitive every
  section should use
- `Button` — renders as a real `<button>` or as a Next.js `Link`
  depending on whether `href` is passed; primary/secondary variants
- `ComingSoon` — shared placeholder for routes that exist for
  navigation (Phase 2) but don't have real content yet (later phases)

More primitives (Card, form inputs, etc.) get added as later phases
introduce content that genuinely needs them — not built speculatively
ahead of that need.

## Accessibility

- Visible focus states everywhere (`:focus-visible` uses the accent
  color as an outline — never suppressed).
- `prefers-reduced-motion` respected (smooth scroll is the only motion
  currently in use, and it's gated behind `prefers-reduced-motion:
  no-preference`).
- Semantic landmarks (`header`, `nav` with `aria-label`, `main`,
  `footer`) and `aria-current="page"` on the active nav link.
- Mobile nav toggle has proper `aria-expanded`/`aria-controls`/
  `aria-label` state.

## Known Gap

No actual screenshot/visual review has been done yet — Claude's sandbox
has no headless browser available (same class of network restriction as
the font-loading and Docker gaps from Phase 1). The owner should view the
site directly (`npm run dev` or via Docker) and sanity-check spacing,
contrast, and the overall feel against this document before Phase 2 is
considered fully verified, the same way Phase 1's Docker networking bugs
were only caught by hands-on verification.
