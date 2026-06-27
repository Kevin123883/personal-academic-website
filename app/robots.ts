import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Next.js serves this at /robots.txt. We allow all crawlers across the whole
// site and point them at the sitemap so Google can discover every page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
