import { describe, expect, it } from "vitest";

import robots from "../robots";

describe("robots", () => {
  it("allows all crawlers to access the site by default", () => {
    const result = robots();
    expect(result.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });

  it("disallows /status, the internal connectivity check page", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules.disallow).toContain("/status");
  });

  it("points to the sitemap", () => {
    const result = robots();
    expect(result.sitemap).toBe("http://localhost:3000/sitemap.xml");
  });
});
