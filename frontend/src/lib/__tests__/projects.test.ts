import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("projects API client", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("getProjects", () => {
    it("returns the parsed project list on success", async () => {
      const mockProjects = [
        { id: 1, title: "Test Project", slug: "test-project", summary: "x", tags: [], status: "", status_display: "", external_url: "" },
      ];
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockProjects,
      }) as unknown as typeof fetch;

      const { getProjects } = await import("../projects");
      const result = await getProjects();

      expect(result).toEqual(mockProjects);
    });

    it("throws on a non-ok response", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      }) as unknown as typeof fetch;

      const { getProjects } = await import("../projects");
      await expect(getProjects()).rejects.toThrow(/500/);
    });

    it("returns an empty array when the backend returns no projects", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [],
      }) as unknown as typeof fetch;

      const { getProjects } = await import("../projects");
      const result = await getProjects();

      expect(result).toEqual([]);
    });
  });

  describe("getProject", () => {
    it("returns the parsed project on success", async () => {
      const mockProject = {
        id: 1,
        title: "Test Project",
        slug: "test-project",
        summary: "x",
        tags: ["Django"],
        status: "in_development",
        status_display: "In development",
        external_url: "",
      };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockProject,
      }) as unknown as typeof fetch;

      const { getProject } = await import("../projects");
      const result = await getProject("test-project");

      expect(result).toEqual(mockProject);
    });

    it("returns null (not a thrown error) for a 404", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({}),
      }) as unknown as typeof fetch;

      const { getProject } = await import("../projects");
      const result = await getProject("does-not-exist");

      expect(result).toBeNull();
    });

    it("throws on a non-404 error response", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      }) as unknown as typeof fetch;

      const { getProject } = await import("../projects");
      await expect(getProject("test-project")).rejects.toThrow(/500/);
    });
  });
});
