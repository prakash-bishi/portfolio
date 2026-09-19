import Link from "next/link";

import type { Project } from "@/lib/projects";

import { SkillTag } from "./SkillTag";

type ProjectCardProps = {
  project: Project;
};

/**
 * A single project entry on the /projects listing page. Links to the
 * project's detail page. Status badge only renders when status is set
 * — projects with an unconfirmed status show no badge rather than a
 * guessed one (see the seed migration's comment on this).
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block border-b border-line py-6 first:pt-0 last:border-b-0"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="font-display text-lg font-medium">{project.title}</h2>
        {project.status_display && (
          <span className="text-sm text-ink-muted sm:shrink-0">
            {project.status_display}
          </span>
        )}
      </div>
      <p className="mt-2 max-w-2xl text-ink-muted">{project.summary}</p>
      {project.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <SkillTag key={tag}>{tag}</SkillTag>
          ))}
        </div>
      )}
    </Link>
  );
}
