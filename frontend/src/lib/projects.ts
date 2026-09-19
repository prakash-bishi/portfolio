import { getApiBaseUrl } from "./api";

/**
 * API client for the /api/projects/ endpoints. Reuses getApiBaseUrl()
 * from api.ts rather than hardcoding a URL — see that file's comment
 * for why the server-side vs. browser-side distinction matters under
 * Docker (a real bug this project hit once already).
 */

export type Project = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  status: string;
  status_display: string;
  external_url: string;
};

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/projects/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unexpected projects list response: ${response.status}`);
  }

  return response.json();
}

export async function getProject(slug: string): Promise<Project | null> {
  const response = await fetch(`${getApiBaseUrl()}/api/projects/${slug}/`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Unexpected project detail response: ${response.status}`);
  }

  return response.json();
}
