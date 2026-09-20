import { getApiBaseUrl } from "./api";

/**
 * API client for the /api/publications/ endpoint. Reuses getApiBaseUrl()
 * from api.ts — see that file's comment on why hardcoding a URL here
 * would silently break under Docker.
 */

export type Publication = {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: number | null;
  publication_type: string;
  publication_type_display: string;
  summary: string;
  external_url: string;
};

export async function getPublications(): Promise<Publication[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/publications/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Unexpected publications list response: ${response.status}`
    );
  }

  return response.json();
}
