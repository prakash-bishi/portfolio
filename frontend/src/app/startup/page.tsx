import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillTag } from "@/components/SkillTag";
import { capabilityGroups } from "@/content/startup";

export const metadata: Metadata = {
  title: "Startup — Prakash Bishi",
  description:
    "An early-stage AI/Data and Computer Vision practice — capabilities in annotation, computer vision, and AI/ML.",
};

export default function StartupPage() {
  return (
    <Container>
      <div className="py-16 sm:py-20">
        <h1 className="text-3xl font-medium sm:text-4xl">Startup</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          An early-stage AI/Data and Computer Vision practice, built on
          the same technical work shown in{" "}
          <Link href="/about" className="underline underline-offset-4 hover:no-underline">
            About
          </Link>{" "}
          and{" "}
          <Link href="/projects" className="underline underline-offset-4 hover:no-underline">
            Projects
          </Link>
          .
        </p>
        <p className="mt-4 max-w-2xl text-ink-muted">
          This is not an established company — there are no clients,
          case studies, or production deployments to point to yet. The
          capabilities below reflect real technical skills; formal
          services will be added here only once they&apos;re genuinely
          offered.
        </p>

        <div className="mt-16 flex flex-col gap-16">
          <section aria-labelledby="capabilities">
            <SectionHeading id="capabilities">Capabilities</SectionHeading>
            <div className="mt-6 flex flex-col gap-10">
              {capabilityGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="font-display text-base font-medium">
                    {group.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-ink-muted">
                    {group.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <SkillTag key={item}>{item}</SkillTag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-ink-muted">
              Interested in working together, or have a project this
              could help with?
            </p>
            <div className="mt-4">
              <Button href="/contact">Get in touch</Button>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
