import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { SkillTag } from "@/components/SkillTag";
import { getProject } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project not found — Prakash Bishi" };
  }

  return {
    title: `${project.title} — Prakash Bishi`,
    description: project.summary,
  };
}

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <Container>
      <div className="py-16 sm:py-20">
        <Link href="/projects" className="text-sm text-ink-muted hover:text-ink">
          ← All projects
        </Link>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h1 className="text-3xl font-medium sm:text-4xl">{project.title}</h1>
          {project.status_display && (
            <span className="text-sm text-ink-muted sm:shrink-0">
              {project.status_display}
            </span>
          )}
        </div>

        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          {project.summary}
        </p>

        {project.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <SkillTag key={tag}>{tag}</SkillTag>
            ))}
          </div>
        )}

        {project.external_url && (
          <a
            href={project.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block text-sm text-accent underline underline-offset-4 hover:no-underline"
          >
            View project
          </a>
        )}
      </div>
    </Container>
  );
}
