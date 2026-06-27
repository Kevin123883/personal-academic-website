import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Next.js serves this at /sitemap.xml. Every public route is listed with a
// self-referencing absolute URL (built from the canonical domain), plus the
// lastModified / changeFrequency / priority hints search engines use to
// schedule crawls and weight pages relative to one another.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "monthly", priority: 1.0 },
    { path: "/research", changeFrequency: "monthly", priority: 0.9 },
    { path: "/news", changeFrequency: "weekly", priority: 0.8 },
    { path: "/teaching", changeFrequency: "yearly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
