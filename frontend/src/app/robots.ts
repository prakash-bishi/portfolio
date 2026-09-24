import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /status is an internal connectivity check for development, not
      // a page meant to be publicly indexed.
      disallow: ["/status"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
