import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * jsdom (this project's test environment) always defines `window`. Real
 * Next.js Server Components run in Node with no `window` at all — these
 * tests simulate that by temporarily deleting it, so we're actually
 * exercising the server-side code path, not just re-testing the client
 * path twice.
 */
function withoutWindow<T>(fn: () => Promise<T>): Promise<T> {
  const originalWindow = globalThis.window;
  // @ts-expect-error -- deliberately removing window to simulate SSR
  delete globalThis.window;
  return fn().finally(() => {
    globalThis.window = originalWindow;
  });
}

describe("getHealth base URL selection", () => {
  const originalEnv = { ...process.env };
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ status: "ok", database: "ok" }),
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
  });

  it("on the server, uses INTERNAL_API_BASE_URL when set (the Docker case)", async () => {
    process.env.INTERNAL_API_BASE_URL = "http://backend:8000";
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:8000";

    await withoutWindow(async () => {
      const { getHealth } = await import("../api");
      await getHealth();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "http://backend:8000/api/health/",
      expect.anything()
    );
  });

  it("on the server, falls back to NEXT_PUBLIC_API_BASE_URL when no internal URL is set (the non-Docker case)", async () => {
    delete process.env.INTERNAL_API_BASE_URL;
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:8000";

    await withoutWindow(async () => {
      const { getHealth } = await import("../api");
      await getHealth();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/health/",
      expect.anything()
    );
  });

  it("in the browser, always uses NEXT_PUBLIC_API_BASE_URL, ignoring INTERNAL_API_BASE_URL", async () => {
    process.env.INTERNAL_API_BASE_URL = "http://backend:8000";
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:8000";

    const { getHealth } = await import("../api");
    await getHealth();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/health/",
      expect.anything()
    );
  });
});
