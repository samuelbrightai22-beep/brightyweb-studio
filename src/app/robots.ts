import type { MetadataRoute } from "next";
import { STUDIO } from "@/lib/studio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${STUDIO.siteUrl}/sitemap.xml`,
  };
}
