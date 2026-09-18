import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export default function Home() {
  return (
    <Container>
      <div className="flex min-h-[68vh] items-center py-16 sm:py-20">
        {/* The corner brackets frame the name itself — a bounding box
            around the subject, which is the point of the motif. Framing
            the whole text block instead leaves the bottom-right mark
            floating in empty space, since the block's content is
            left-weighted and ragged. */}
        <div className="max-w-2xl">
          <p className="font-display text-sm text-ink-muted">Raipur, India</p>

          <h1 className="relative mt-3 inline-block text-3xl font-medium leading-tight sm:text-4xl">
            <span
              aria-hidden="true"
              className="absolute -left-3 -top-2 h-4 w-4 border-l-2 border-t-2 border-accent sm:h-5 sm:w-5"
            />
            Prakash Bishi
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -right-3 h-4 w-4 border-b-2 border-r-2 border-accent sm:h-5 sm:w-5"
            />
          </h1>

          <p className="mt-5 text-lg text-ink-muted">
            Assistant Professor of Computer Science, working in AI/ML and
            computer vision — and building an early-stage AI/data and
            computer vision practice.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/about">About me</Button>
            <Button variant="secondary" href="/contact">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
