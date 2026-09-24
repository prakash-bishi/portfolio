import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STATIC_ROUTES = ["", "/about", "/projects", "/research", "/startup", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  // /status is an internal connectivity check, not a real public page —
  // deliberately excluded (see robots.ts too).

  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectEntries = projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(),
    }));
  } catch {
    // Backend unreachable when the sitemap is generated — fall back to
    // static routes only rather than failing the whole sitemap.
  }

  return [...staticEntries, ...projectEntries];
}
