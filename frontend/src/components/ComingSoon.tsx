import { Container } from "./Container";

type ComingSoonProps = {
  title: string;
  note?: string;
};

/**
 * Lightweight placeholder for routes that exist for navigation purposes
 * (Phase 2 — Site Shell) but don't have real content yet (content lands
 * in later phases per docs/ROADMAP.md). Deliberately minimal — this is
 * not the page design, just a working link instead of a 404.
 */
export function ComingSoon({ title, note }: ComingSoonProps) {
  return (
    <Container>
      <div className="py-24">
        <h1 className="font-display text-3xl font-medium">{title}</h1>
        <p className="mt-4 max-w-prose text-ink-muted">
          {note ?? "This section is being built. Check back soon."}
        </p>
      </div>
    </Container>
  );
}
