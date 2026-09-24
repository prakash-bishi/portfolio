import { afterEach, describe, expect, it, vi } from "vitest";

import * as projectsLib from "@/lib/projects";

import sitemap from "../sitemap";

describe("sitemap", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("includes all static routes", async () => {
    vi.spyOn(projectsLib, "getProjects").mockResolvedValue([]);

    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    for (const path of [
      "",
      "/about",
      "/projects",
      "/research",
      "/startup",
      "/contact",
    ]) {
      expect(urls).toContain(`http://localhost:3000${path}`);
    }
  });

  it("does not include /status (internal connectivity check)", async () => {
    vi.spyOn(projectsLib, "getProjects").mockResolvedValue([]);

    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls.some((url) => url.endsWith("/status"))).toBe(false);
  });

  it("includes live project slugs from the backend", async () => {
    vi.spyOn(projectsLib, "getProjects").mockResolvedValue([
      {
        id: 1,
        title: "Test Project",
        slug: "test-project",
        summary: "",
        tags: [],
        status: "",
        status_display: "",
        external_url: "",
      },
    ]);

    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toContain("http://localhost:3000/projects/test-project");
  });

  it("falls back to static routes only when the backend is unreachable", async () => {
    vi.spyOn(projectsLib, "getProjects").mockRejectedValue(
      new Error("backend down")
    );

    const entries = await sitemap();

    expect(entries.length).toBe(6); // just the static routes
  });
});
