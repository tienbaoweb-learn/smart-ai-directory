import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { getAllTools, type ToolFrontmatter } from "../../lib/tools";
import { TOOL_LOGO_URLS } from "../data/tool-logos";
import AllReviewsClient, { type ReviewTool } from "./AllReviewsClient";

export const metadata: Metadata = {
  title: "All AI Tool Reviews (2026) | SmartAI for Work",
  description:
    "Browse our complete library of AI tool reviews — tested, scored, and compared for furniture, architecture, construction, and real estate teams.",
};

// Industry slug → sidebar category label.
const INDUSTRY_LABELS: Record<string, string> = {
  architecture: "Architecture",
  construction: "Construction",
  furniture: "Furniture",
  "real-estate": "Real Estate",
  "interior-design": "Interior Design",
};

// aiToolsCategory → sidebar category label.
const AI_CATEGORY_LABELS: Record<string, string> = {
  "content-marketing": "Marketing",
  productivity: "Productivity",
  automation: "Automation",
  sales: "AI Sales",
};

// industries/tags that signal an AI writing tool.
const AI_WRITING_SIGNALS = new Set([
  "ai-writing",
  "copywriting",
  "content-generation",
  "content-platform",
  "ebooks",
  "blog-writing",
]);

// Build the list of sidebar categories a tool belongs to (a tool can match several).
function deriveCategories(f: ToolFrontmatter): string[] {
  const cats = new Set<string>();

  for (const ind of f.industries ?? []) {
    if (INDUSTRY_LABELS[ind]) cats.add(INDUSTRY_LABELS[ind]);
  }
  // Fall back to the base category for industry tagging.
  for (const label of Object.values(INDUSTRY_LABELS)) {
    if (f.category === label) cats.add(label);
  }

  if (f.aiToolsCategory && AI_CATEGORY_LABELS[f.aiToolsCategory]) {
    cats.add(AI_CATEGORY_LABELS[f.aiToolsCategory]);
  }

  const signals = [...(f.industries ?? []), ...(f.tags ?? [])];
  if (signals.some((s) => AI_WRITING_SIGNALS.has(s))) cats.add("AI Writing");

  return [...cats];
}

// Only use a logo path when the image actually exists in /public — otherwise the
// card falls back to initials instead of rendering a broken image.
function resolveLogo(slug: string, frontmatterLogo?: string): string {
  const logo = TOOL_LOGO_URLS[slug] ?? frontmatterLogo ?? "";
  if (!logo) return "";
  return fs.existsSync(path.join(process.cwd(), "public", logo)) ? logo : "";
}

export default function AllReviewsPage() {
  // Pull the real review articles so cards (and their logos) stay in sync with each review.
  const tools: ReviewTool[] = getAllTools()
    .map((t) => {
      const f = t.frontmatter;
      return {
        name: f.toolName || f.title,
        slug: t.slug,
        rating: f.rating ?? 0,
        bestFor: f.bestFor?.[0] ?? "",
        desc: f.excerpt ?? "",
        pricingType: f.pricingType ?? "",
        price: f.pricing ?? "",
        categories: deriveCategories(f),
        pricingTier: f.pricingType ?? "",
        logoUrl: resolveLogo(t.slug, f.logoUrl),
        // "Visit Website" points to the affiliate link, falling back to the
        // plain site URL when no affiliate link is set.
        affiliateUrl: f.affiliateLink || f.websiteUrl || "#",
      };
    });

  return <AllReviewsClient tools={tools} />;
}
