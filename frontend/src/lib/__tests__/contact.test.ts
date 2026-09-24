import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("contact API client", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const payload = { name: "Jane", email: "jane@example.com", message: "Hi" };

  it("returns ok on a 201 response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 201,
      json: async () => ({ status: "ok" }),
    }) as unknown as typeof fetch;

    const { submitContactForm } = await import("../contact");
    const result = await submitContactForm(payload);

    expect(result).toEqual({ status: "ok" });
  });

  it("returns rate_limited on a 429 response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 429,
      json: async () => ({}),
    }) as unknown as typeof fetch;

    const { submitContactForm } = await import("../contact");
    const result = await submitContactForm(payload);

    expect(result).toEqual({ status: "rate_limited" });
  });

  it("returns error with field errors on a 400 response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 400,
      json: async () => ({ email: ["Enter a valid email address."] }),
    }) as unknown as typeof fetch;

    const { submitContactForm } = await import("../contact");
    const result = await submitContactForm(payload);

    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.fieldErrors).toEqual({
        email: ["Enter a valid email address."],
      });
    }
  });

  it("returns a generic error on an unexpected status", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 500,
      json: async () => ({}),
    }) as unknown as typeof fetch;

    const { submitContactForm } = await import("../contact");
    const result = await submitContactForm(payload);

    expect(result.status).toBe("error");
  });

  it("returns a generic error when fetch itself throws (network failure)", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network down"));

    const { submitContactForm } = await import("../contact");
    const result = await submitContactForm(payload);

    expect(result.status).toBe("error");
  });
});
