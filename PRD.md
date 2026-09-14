# PRD.md — Product Requirements

## What This Is

A personal professional website for **Prakash Bishi** that serves two logically
distinct but related purposes:

1. **Personal Professional Identity** — Assistant Professor (CS), AI/ML and
   Computer Vision practitioner, educator, researcher-in-progress, builder.
2. **Emerging AI/Data Startup** — a developing (not yet established) business
   direction around AI data services: annotation, dataset preparation,
   computer vision, and related capabilities.

The startup is early-stage. The site must communicate credibility through
clarity, technical substance, and real work — never through fabricated
achievements, clients, revenue, or traction.

## Why We're Building It

- Recruiters and employers need a fast, accurate picture of skills and work.
- The academic community needs to see teaching, research interests, and
  technical depth.
- Potential clients need to understand real AI/data/CV capabilities and how
  to make contact.
- Collaborators need to see technical/research interests and startup
  direction.
- General visitors need to navigate easily and come away with an accurate
  professional impression.

## Users / Audiences

| Audience | Needs |
|---|---|
| Recruiters/Employers | Who I am, what I know, what I've built |
| Academic community | Education, teaching, research interests, projects |
| Potential clients | AI/data/CV capabilities, services, contact method |
| Collaborators | Technical/research interests, startup direction |
| General visitors | Easy navigation, clear identity |

## Goals

1. Clearly communicate identity (see AUDIENCE table above).
2. Present education and professional experience accurately.
3. Demonstrate technical skills truthfully.
4. Showcase genuine projects only.
5. Present research interests/work honestly (labeled by actual status).
6. Introduce the AI/Data/CV startup direction without overstating maturity.
7. Explain genuine capabilities/services (labeled: current capability,
   prototype, research, future service, future product — never blurred).
8. Provide a professional, secure contact mechanism.
9. Work well on mobile, tablet, and desktop.
10. Be SEO-friendly, accessible, and performant.
11. Be maintainable and easy to extend.
12. Support future AI-powered features without requiring premature
    implementation now.

## Non-Goals (for the current phase)

- No fabricated business traction of any kind (see RULES.md — Truth Rule).
- No AI chatbot / RAG / agent framework in the initial build (see ROADMAP.md
  Phase 9 — future, explicitly gated).
- No enterprise infrastructure (Kubernetes, microservices, event-driven
  systems, complex data pipelines) unless a real requirement emerges.
- No payments, client portal, or authentication system until genuinely
  required.

## Scope — Initial Site (Core Pages)

Home, About, Experience, Education, Skills, Projects, Project Details,
Research, Startup, Contact.

## Future Scope (not built now, architecture should not block them)

Blog, Teaching, Publications, AI Demos, Services, Case Studies, Resources,
AI assistant, annotation platform, dataset platform, client portal.

## Content Truth Standard

See RULES.md for the full non-negotiable list. In short: never fabricate
clients, revenue, users, funding, partnerships, publications, or traction.
Use honest status language: "In development", "Research", "Prototype",
"Exploration", "Planned", "Capability", "Currently developing".

## Reference Facts (source of truth for content, not for over-inclusion)

**Education**
- B.Tech, Computer Science & Engineering — RCET, Raipur — Completed 2020
- M.Tech, Artificial Intelligence & Machine Learning — SSIPMT, Raipur —
  Completed 2024 — 76.59%

**Current Role**
- Assistant Professor, Shri Shankaracharya Institute of Professional
  Management & Technology (SSIPMT), Raipur

**Previous Experience**
- AIML Trainer for PM SHRI Schools, Chhattisgarh

**Technical Skills**
Python, Django, HTML, CSS, JavaScript, PHP (beginner), PyTorch, YOLOv8,
YOLOv9, OpenCV, Computer Vision, Image Annotation (bounding box, polygon,
segmentation, keypoint, 3D cuboid), Text Categorization/Cleaning/Annotation,
Audio Categorization, Dataset Preparation, Machine Learning, Deep Learning,
Web Development.

Do not place every fact on every page — distribute according to page
purpose (see DESIGN.md / ARCHITECTURE.md content models).
