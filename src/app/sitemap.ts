import type { MetadataRoute } from "next";
import { projects } from "@/lib/portfolio";
import { STUDIO } from "@/lib/studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/work", "/contact"].map(
    (path) => ({
      url: `${STUDIO.siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const projectRoutes = projects.map((p) => ({
    url: `${STUDIO.siteUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
