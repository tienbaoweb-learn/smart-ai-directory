import type { MetadataRoute } from "next";
import { getAllTools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://smartaiforwork.com";

  const staticPages = [
    "",
    "/tools",
    "/about-us",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
    "/affiliate-disclosure",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const tools = getAllTools();
  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.frontmatter.lastUpdated),
    changeFrequency: "weekly" as const,
    priority: tool.frontmatter.featured ? 0.9 : 0.7,
  }));

  return [...staticPages, ...toolPages];
}
