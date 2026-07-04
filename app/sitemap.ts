import type { MetadataRoute } from "next";
import { getAllTools } from "@/lib/tools";
import { guidesData } from "@/lib/guides-data";
import { caseStudiesData } from "@/lib/case-studies-data";
import { tagsData } from "@/lib/tags-data";
import { comparisonsData } from "@/lib/comparisons-data";
import { aiNewsPosts } from "@/lib/ai-news-data";
import { workflowsData } from "@/lib/workflows-data";

const baseUrl = "https://www.smartaiforwork.com";

// Static pages tiered by importance. lastModified is intentionally omitted for
// static pages — claiming "modified today" on every build is a noise signal
// crawlers learn to ignore.
const HUB_PAGES = [
  "",
  "/tools",
  "/ai-tools",
  "/best-of",
  "/industries",
  "/resources",
];

const SECTION_PAGES = [
  "/ai-tools/automation",
  "/ai-tools/content-marketing",
  "/ai-tools/design",
  "/ai-tools/productivity",
  "/ai-tools/sales",
  "/all-reviews",
  "/ai-glossary",
  "/best-of/architecture",
  "/best-of/construction",
  "/best-of/interior-design",
  "/best-of/real-estate",
  "/industries/architecture",
  "/industries/construction",
  "/industries/furniture",
  "/industries/interior-design",
  "/industries/real-estate",
  "/resources/ai-news",
  "/resources/case-studies",
  "/resources/comparisons",
  "/resources/guides",
  "/resources/tutorials",
  "/resources/workflows",
  "/tags",
  "/about-us",
  "/how-we-review",
  "/contact",
];

const LEGAL_PAGES = ["/privacy-policy", "/terms-of-use", "/affiliate-disclosure"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    ...HUB_PAGES.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.9,
    })),
    ...SECTION_PAGES.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...LEGAL_PAGES.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  const tools = getAllTools();
  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.frontmatter.lastUpdated),
    changeFrequency: "weekly" as const,
    priority: tool.frontmatter.featured ? 0.9 : 0.7,
  }));

  const guidePages = guidesData.map((guide) => ({
    url: `${baseUrl}/resources/guides/${guide.slug}`,
    lastModified: new Date(guide.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const caseStudyPages = caseStudiesData.map((cs) => ({
    url: `${baseUrl}/resources/case-studies/${cs.slug}`,
    lastModified: new Date(cs.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparisonPages = comparisonsData.map((cmp) => ({
    url: `${baseUrl}/compare/${cmp.slug}`,
    lastModified: new Date(cmp.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const newsPages = aiNewsPosts.map((post) => ({
    url: `${baseUrl}/resources/ai-news/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const workflowPages = workflowsData.map((wf) => ({
    url: `${baseUrl}/resources/workflows/${wf.slug}`,
    lastModified: new Date(wf.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tagPages = tagsData.map((tag) => ({
    url: `${baseUrl}/tags/${tag.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...toolPages,
    ...guidePages,
    ...caseStudyPages,
    ...comparisonPages,
    ...newsPages,
    ...workflowPages,
    ...tagPages,
  ];
}
