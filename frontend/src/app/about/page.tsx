import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillTag } from "@/components/SkillTag";
import { TimelineItem } from "@/components/TimelineItem";
import { education, experience, skillGroups } from "@/content/profile";

export const metadata: Metadata = {
  title: "About — Prakash Bishi",
  description:
    "Education, experience, and technical skills of Prakash Bishi, Assistant Professor of Computer Science working in AI/ML and computer vision.",
};

export default function AboutPage() {
  return (
    <Container>
      <div className="py-16 sm:py-20">
        <h1 className="text-3xl font-medium sm:text-4xl">About</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          I teach computer science and work in AI/ML and computer vision —
          alongside building an early-stage practice in AI data and
          computer vision services.
        </p>

        <div className="mt-16 flex flex-col gap-16">
          <section aria-labelledby="experience">
            <SectionHeading id="experience">Experience</SectionHeading>
            <div className="mt-2">
              {experience.map((entry) => (
                <TimelineItem
                  key={entry.role}
                  title={entry.role}
                  subtitle={entry.organization}
                  period={entry.period}
                  current={entry.current}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="education">
            <SectionHeading id="education">Education</SectionHeading>
            <div className="mt-2">
              {education.map((entry) => (
                <TimelineItem
                  key={entry.degree}
                  title={entry.degree}
                  subtitle={entry.institution}
                  period={entry.period}
                  detail={entry.detail}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="skills">
            <SectionHeading id="skills">Skills</SectionHeading>
            <div className="mt-6 flex flex-col gap-6">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="font-display text-sm font-medium text-ink-muted">
                    {group.label}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <SkillTag key={skill}>{skill}</SkillTag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
