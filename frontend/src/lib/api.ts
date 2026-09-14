/**
 * Minimal API client for the Django backend.
 *
 * Keep this file thin: it's a foundation-phase helper, not a full
 * data-fetching layer. Expand per-domain as real endpoints are added
 * (e.g. projects, research) rather than growing this into a catch-all.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export type HealthStatus = {
  status: "ok" | "error";
  database: "ok" | "unreachable";
};

export async function getHealth(): Promise<HealthStatus> {
  const response = await fetch(`${API_BASE_URL}/api/health/`, {
    // Always hit the backend fresh for a health check — never cache this.
    cache: "no-store",
  });

  if (!response.ok && response.status !== 503) {
    throw new Error(`Unexpected health check response: ${response.status}`);
  }

  return response.json();
}
