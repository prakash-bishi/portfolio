import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("research API client", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("getPublications", () => {
    it("returns the parsed publication list on success", async () => {
      const mockPublications = [
        {
          id: 1,
          title: "Test Paper",
          authors: "Prakash Bishi",
          venue: "Test Venue",
          year: 2025,
          publication_type: "paper",
          publication_type_display: "Paper",
          summary: "",
          external_url: "",
        },
      ];
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockPublications,
      }) as unknown as typeof fetch;

      const { getPublications } = await import("../research");
      const result = await getPublications();

      expect(result).toEqual(mockPublications);
    });

    it("returns an empty array when nothing is published yet", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [],
      }) as unknown as typeof fetch;

      const { getPublications } = await import("../research");
      const result = await getPublications();

      expect(result).toEqual([]);
    });

    it("throws on a non-ok response", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      }) as unknown as typeof fetch;

      const { getPublications } = await import("../research");
      await expect(getPublications()).rejects.toThrow(/500/);
    });
  });
});
