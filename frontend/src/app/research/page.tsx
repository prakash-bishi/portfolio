import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PublicationItem } from "@/components/PublicationItem";
import { SectionHeading } from "@/components/SectionHeading";
import { researchInterests } from "@/content/research";
import { getPublications } from "@/lib/research";

export const metadata: Metadata = {
  title: "Research — Prakash Bishi",
  description:
    "Research interests and publications: computer vision for agriculture, novel class discovery, and efficient object detection.",
};

export const dynamic = "force-dynamic";

export default async function ResearchPage() {
  let publications: Awaited<ReturnType<typeof getPublications>> = [];
  let error: string | null = null;

  try {
    publications = await getPublications();
  } catch {
    error = "Could not load publications right now. Please try again shortly.";
  }

  return (
    <Container>
      <div className="py-16 sm:py-20">
        <h1 className="text-3xl font-medium sm:text-4xl">Research</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Research interests and academic work, alongside teaching and
          building.
        </p>

        <div className="mt-16 flex flex-col gap-16">
          <section aria-labelledby="interests">
            <SectionHeading id="interests">Interests</SectionHeading>
            <div className="mt-6 flex flex-col gap-8">
              {researchInterests.map((interest) => (
                <div key={interest.title}>
                  <h3 className="font-display text-base font-medium">
                    {interest.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-ink-muted">
                    {interest.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="publications">
            <SectionHeading id="publications">Publications</SectionHeading>
            <div className="mt-2">
              {error && <p className="mt-4 text-ink-muted">{error}</p>}
              {!error && publications.length === 0 && (
                <p className="mt-4 text-ink-muted">
                  Publications are being added — check back soon.
                </p>
              )}
              {!error &&
                publications.map((publication) => (
                  <PublicationItem key={publication.id} publication={publication} />
                ))}
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
