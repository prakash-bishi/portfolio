import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Prakash Bishi",
  description:
    "Computer vision and web development projects by Prakash Bishi.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  let error: string | null = null;

  try {
    projects = await getProjects();
  } catch {
    error = "Could not load projects right now. Please try again shortly.";
  }

  return (
    <Container>
      <div className="py-16 sm:py-20">
        <h1 className="text-3xl font-medium sm:text-4xl">Projects</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Computer vision and web development work, in progress and
          ongoing.
        </p>

        <div className="mt-12">
          {error && <p className="text-ink-muted">{error}</p>}
          {!error && projects.length === 0 && (
            <p className="text-ink-muted">
              No projects published yet — check back soon.
            </p>
          )}
          {!error &&
            projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
        </div>
      </div>
    </Container>
  );
}
