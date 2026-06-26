import type { MetadataRoute } from "next";
import { getAllTools } from "@/lib/tools";
import { guidesData } from "@/lib/guides-data";
import { caseStudiesData } from "@/lib/case-studies-data";
import { tagsData } from "@/lib/tags-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.smartaiforwork.com";

  const staticPages = [
    "",
    "/tools",
    "/ai-tools",
    "/ai-tools/automation",
    "/ai-tools/content-marketing",
    "/ai-tools/design",
    "/ai-tools/productivity",
    "/ai-tools/sales",
    "/all-reviews",
    "/ai-glossary",
    "/best-of",
    "/best-of/architecture",
    "/best-of/construction",
    "/best-of/interior-design",
    "/best-of/real-estate",
    "/industries",
    "/industries/architecture",
    "/industries/construction",
    "/industries/furniture",
    "/industries/interior-design",
    "/industries/real-estate",
    "/resources",
    "/resources/ai-news",
    "/resources/case-studies",
    "/resources/comparisons",
    "/resources/guides",
    "/resources/tutorials",
    "/resources/workflows",
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

  const guidePages = guidesData.map((guide) => ({
    url: `${baseUrl}/resources/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyPages = caseStudiesData.map((cs) => ({
    url: `${baseUrl}/resources/case-studies/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tagPages = tagsData.map((tag) => ({
    url: `${baseUrl}/tags/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...guidePages, ...caseStudyPages, ...tagPages];
}
