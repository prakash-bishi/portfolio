/**
 * Minimal API client for the Django backend.
 *
 * Keep this file thin: it's a foundation-phase helper, not a full
 * data-fetching layer. Expand per-domain as real endpoints are added
 * (e.g. projects, research) rather than growing this into a catch-all.
 *
 * Two base URLs matter here, and they are NOT interchangeable:
 *
 * - NEXT_PUBLIC_API_BASE_URL — used by code that runs in the browser.
 *   Inside Docker, the browser is on the host machine, so this must be
 *   the host-mapped address (e.g. http://localhost:8000).
 * - INTERNAL_API_BASE_URL — used by code that runs on the server (e.g.
 *   inside a Server Component, like this project's /status page). Inside
 *   Docker Compose, "localhost" from the frontend container refers to
 *   the frontend container itself, NOT the backend container — so
 *   server-side fetches must use the backend's Compose service name
 *   (e.g. http://backend:8000) instead.
 *
 * getApiBaseUrl() picks the right one automatically based on whether the
 * code is currently running on the server or in the browser.
 */

function getApiBaseUrl(): string {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return (
      process.env.INTERNAL_API_BASE_URL ??
      process.env.NEXT_PUBLIC_API_BASE_URL ??
      "http://localhost:8000"
    );
  }

  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
}

export type HealthStatus = {
  status: "ok" | "error";
  database: "ok" | "unreachable";
};

export async function getHealth(): Promise<HealthStatus> {
  const response = await fetch(`${getApiBaseUrl()}/api/health/`, {
    // Always hit the backend fresh for a health check — never cache this.
    cache: "no-store",
  });

  if (!response.ok && response.status !== 503) {
    throw new Error(`Unexpected health check response: ${response.status}`);
  }

  return response.json();
}
