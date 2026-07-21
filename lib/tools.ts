import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { TOOL_LOGO_URLS } from "../app/data/tool-logos";
import type { GridTool } from "../app/components/IndustryToolsGrid";

const TOOLS_DIR = path.join(process.cwd(), "content/tools");

// Authoring template, not a real tool review — must never be publicly routable.
const EXCLUDED_SLUGS = new Set(["sample-tool"]);

export type ToolCategory =
  | "Furniture"
  | "Architecture"
  | "Construction"
  | "Real Estate"
  | "Cross-niche";

export type PricingType = "Free" | "Freemium" | "Paid" | "Custom";

export type IndustrySlug =
  | "architecture"
  | "construction"
  | "furniture"
  | "interior-design"
  | "real-estate";

export type AiToolsCategory =
  | "design"
  | "content-marketing"
  | "automation"
  | "sales"
  | "productivity";

export type ToolFrontmatter = {
  toolName?: string;
  title: string;
  slug: string;
  category: ToolCategory;
  industries?: IndustrySlug[];
  aiToolsCategory?: AiToolsCategory;
  bestOf?: IndustrySlug[];
  tags?: string[];
  excerpt: string;
  rating: number;
  pricing?: string;
  pricingType?: PricingType;
  // Real pricing tiers. When present, the review renders these instead of the
  // synthetic generator; an empty array [] shows the accurate "starts at" price
  // but skips tier cards entirely (use when only the entry price is known).
  pricingPlans?: {
    name: string;
    price: string;
    period: string;
    description: string;
    ctaText: string;
    features: string[];
    highlighted: boolean;
  }[];
  affiliateLink: string;
  websiteUrl: string;
  logoUrl: string;
  dashboardImage?: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  alternatives: string[];
  featured: boolean;
  lastUpdated: string;
  affiliateDisclosure: boolean;
};

export type Tool = {
  frontmatter: ToolFrontmatter;
  content: string;
  readingTime: string;
  slug: string;
};

function readToolFile(filename: string): Tool | null {
  const filePath = path.join(TOOLS_DIR, filename);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const slug = filename.replace(/\.mdx?$/, "");
    const rt = readingTime(content);
    return {
      frontmatter: data as ToolFrontmatter,
      content,
      readingTime: rt.text,
      slug: (data.slug as string) || slug,
    };
  } catch {
    return null;
  }
}

function getMdxFiles(): string[] {
  if (!fs.existsSync(TOOLS_DIR)) return [];
  return fs
    .readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .filter((f) => !EXCLUDED_SLUGS.has(f.replace(/\.mdx?$/, "")));
}

export function getAllTools(): Tool[] {
  return getMdxFiles()
    .map(readToolFile)
    .filter((t): t is Tool => t !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.lastUpdated).getTime() -
        new Date(a.frontmatter.lastUpdated).getTime()
    );
}

export function getToolBySlug(slug: string): Tool | null {
  const files = getMdxFiles();
  for (const filename of files) {
    const tool = readToolFile(filename);
    if (tool && tool.slug === slug) return tool;
  }
  return null;
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return getAllTools().filter((t) => t.frontmatter.category === category);
}

export function getFeaturedTools(): Tool[] {
  return getAllTools().filter((t) => t.frontmatter.featured);
}

export function getAllToolSlugs(): string[] {
  return getAllTools().map((t) => t.slug);
}

export function getToolsByIndustry(industry: IndustrySlug): Tool[] {
  return getAllTools().filter((t) =>
    t.frontmatter.industries?.includes(industry)
  );
}

export function getToolsByAiCategory(category: AiToolsCategory): Tool[] {
  return getAllTools().filter(
    (t) => t.frontmatter.aiToolsCategory === category
  );
}

export function getBestOfTools(industry: IndustrySlug): Tool[] {
  return getAllTools()
    .filter((t) => t.frontmatter.bestOf?.includes(industry))
    .sort((a, b) => b.frontmatter.rating - a.frontmatter.rating);
}

export function getToolsByTag(tag: string): Tool[] {
  return getAllTools().filter((t) => t.frontmatter.tags?.includes(tag));
}

// ── Data-driven grid for the Best Of / Industries hub pages ──────────────────
// Resolves each tool to a plain, serializable shape (with a verified logo path)
// so a server page can pass it into the client hub components.

function toGridTool(t: Tool): GridTool {
  const name =
    t.frontmatter.toolName || t.frontmatter.title.split(":")[0].trim();
  const logo = TOOL_LOGO_URLS[t.slug] ?? t.frontmatter.logoUrl ?? "";
  const logoUrl =
    logo && fs.existsSync(path.join(process.cwd(), "public", logo)) ? logo : "";
  return {
    slug: t.slug,
    name,
    excerpt: t.frontmatter.excerpt,
    rating: t.frontmatter.rating,
    category: t.frontmatter.category,
    logoUrl,
    pricing: t.frontmatter.pricing,
  };
}

/**
 * Tools to feature on an industry hub page. Uses the curated Best Of set when
 * one exists (rating-sorted), otherwise falls back to everything tagged with
 * that industry. Rating-sorted, capped so the grid stays reasonable.
 */
export function getIndustryGridTools(
  industry: IndustrySlug,
  limit = 32
): GridTool[] {
  let list = getBestOfTools(industry);
  if (list.length === 0) {
    list = getToolsByIndustry(industry).sort(
      (a, b) => b.frontmatter.rating - a.frontmatter.rating
    );
  }
  return list.slice(0, limit).map(toGridTool);
}

// ── Internal linking: dual-axis hub + sibling resolution ─────────────────────
//
// Reviews cluster on one of two axes:
//   1. Industry niche  — tools curated into a Best Of hub (frontmatter.bestOf).
//   2. AI Tools category — everything else, grouped by frontmatter.aiToolsCategory.
//
// Each review links "up" to its hub and "across" to sibling reviews in the same
// group. Siblings are chosen with a rating-sorted ring so EVERY tool in a group
// is linked from `count` others — this structurally prevents orphan pages.

export type RelatedHub = { label: string; href: string };

const INDUSTRY_HUBS: Record<IndustrySlug, RelatedHub> = {
  architecture: { label: "Architecture", href: "/best-of/architecture" },
  construction: { label: "Construction", href: "/best-of/construction" },
  "interior-design": {
    label: "Interior Design",
    href: "/best-of/interior-design",
  },
  "real-estate": { label: "Real Estate", href: "/best-of/real-estate" },
  // Furniture has no Best Of hub — fall back to its Industries landing page.
  furniture: { label: "Furniture", href: "/industries/furniture" },
};

const AI_CATEGORY_HUBS: Record<AiToolsCategory, RelatedHub> = {
  design: { label: "AI Design Tools", href: "/ai-tools/design" },
  "content-marketing": {
    label: "AI Content & Marketing Tools",
    href: "/ai-tools/content-marketing",
  },
  automation: { label: "AI Automation Tools", href: "/ai-tools/automation" },
  sales: { label: "AI Sales Tools", href: "/ai-tools/sales" },
  productivity: {
    label: "AI Productivity Tools",
    href: "/ai-tools/productivity",
  },
};

// Newer reviews use more granular aiToolsCategory values than the five that have
// hub pages. Fold each granular value into its closest canonical hub so every
// review still gets a real hub link and a non-trivial sibling group (prevents
// singleton-category orphans). Canonical values map to themselves.
const CATEGORY_NORMALIZE: Record<string, AiToolsCategory> = {
  design: "design",
  "content-marketing": "content-marketing",
  automation: "automation",
  sales: "sales",
  productivity: "productivity",
  // granular → canonical
  crm: "sales",
  "lead-generation": "sales",
  "customer-support": "automation",
  "marketing-automation": "automation",
  "image-generation": "design",
  "product-visualization": "design",
  rendering: "design",
  copywriting: "content-marketing",
  analytics: "productivity",
  presentation: "productivity",
  "project-management": "productivity",
  "legal-compliance": "productivity",
};

function normalizeCategory(
  cat: string | undefined
): AiToolsCategory | undefined {
  if (!cat) return undefined;
  return CATEGORY_NORMALIZE[cat] ?? "productivity";
}

export function getRelatedTools(
  slug: string,
  count = 4
): { hub: RelatedHub | null; siblings: Tool[] } {
  const all = getAllTools();
  const current = all.find((t) => t.slug === slug);
  if (!current) return { hub: null, siblings: [] };

  // A single deterministic primary key per tool keeps every group symmetric:
  // each member rings over the exact same set, so coverage is guaranteed and no
  // review is left orphaned. Industry tools key on their first Best Of industry;
  // cross-niche tools key on their AI Tools category.
  const primaryKey = (fm: ToolFrontmatter): string =>
    fm.bestOf && fm.bestOf.length > 0
      ? `industry:${fm.bestOf[0]}`
      : `aicat:${normalizeCategory(fm.aiToolsCategory) ?? "uncategorized"}`;

  const f = current.frontmatter;
  const normalizedCat = normalizeCategory(f.aiToolsCategory);
  const hub: RelatedHub | null =
    f.bestOf && f.bestOf.length > 0
      ? (INDUSTRY_HUBS[f.bestOf[0]] ?? null)
      : normalizedCat
        ? (AI_CATEGORY_HUBS[normalizedCat] ?? null)
        : null;

  const key = primaryKey(f);
  const group = all.filter((t) => primaryKey(t.frontmatter) === key);

  // Rating-sorted ring → full coverage, deterministic, no self-reference.
  const sorted = [...group].sort(
    (a, b) =>
      b.frontmatter.rating - a.frontmatter.rating ||
      a.slug.localeCompare(b.slug)
  );
  const idx = sorted.findIndex((t) => t.slug === slug);
  const siblings: Tool[] = [];
  if (idx !== -1) {
    for (let k = 1; k <= sorted.length - 1 && siblings.length < count; k++) {
      siblings.push(sorted[(idx + k) % sorted.length]);
    }
  }

  return { hub, siblings };
}

// ── AI-tools use-case pillar pages (design/automation/productivity/sales/content-marketing) ──
//
// Plain, serializable shape for the 5 /ai-tools/[usecase] client pages —
// resolved server-side (uses fs via getAllTools) and passed as a prop, same
// pattern as GridTool for the industry/best-of hubs.

export interface UseCaseTool {
  slug: string;
  name: string;
  /** Single-industry label for the sidebar filter, or "All" for cross-industry tools. */
  industry: string;
  rating: number;
  excerpt: string;
  bestFor: string;
  pricingType: PricingType;
  pricing: string;
  logoUrl: string;
  logoBg: string;
  logoText: string;
  hasReview: true;
  affiliateHref: string;
}

const USE_CASE_INDUSTRY_LABEL: Record<IndustrySlug, string> = {
  furniture: "Furniture",
  architecture: "Architecture",
  construction: "Construction",
  "interior-design": "Interior Design",
  "real-estate": "Real Estate",
};

// Same category → color mapping as the tool review page's logo chip, so a
// tool's fallback color is consistent whether it's rendered on its own review
// or on a use-case pillar page.
const USE_CASE_LOGO_BG: Record<string, string> = {
  Furniture: "bg-orange-600",
  Architecture: "bg-blue-700",
  Construction: "bg-amber-600",
  "Real Estate": "bg-purple-700",
  "Cross-niche": "bg-slate-700",
};

function useCaseInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function toUseCaseTool(t: Tool): UseCaseTool {
  const f = t.frontmatter;
  const name = f.toolName || f.title.split(":")[0].trim();
  const industries = f.industries ?? [];
  const industry =
    industries.length === 1 ? USE_CASE_INDUSTRY_LABEL[industries[0]] : "All";
  const logo = TOOL_LOGO_URLS[t.slug] ?? f.logoUrl ?? "";
  const logoUrl =
    logo && fs.existsSync(path.join(process.cwd(), "public", logo)) ? logo : "";
  return {
    slug: t.slug,
    name,
    industry,
    rating: f.rating,
    excerpt: f.excerpt,
    bestFor: f.bestFor[0] ?? f.category,
    pricingType: f.pricingType ?? "Custom",
    pricing: f.pricing ?? "Contact for pricing",
    logoUrl,
    logoBg: USE_CASE_LOGO_BG[f.category] ?? "bg-slate-700",
    logoText: useCaseInitials(name),
    hasReview: true,
    affiliateHref: f.affiliateLink || f.websiteUrl || "",
  };
}

/**
 * All reviews eligible for a /ai-tools/[usecase] pillar page: every review
 * whose (normalized) `aiToolsCategory` matches, regardless of whether it also
 * carries a `bestOf` industry tag — a tool can legitimately appear on both an
 * industry hub and a use-case hub, these are independent browsing axes.
 *
 * `featuredSlugs` pins specific tools to the front (editorial curation) in the
 * given order; everything else follows, sorted by rating (desc). Throws at
 * build time if a slug doesn't resolve to a real review, or resolves to one
 * whose real category doesn't match `category` — catches curation drift
 * immediately instead of silently dropping/misplacing a featured tool.
 */
export function getUseCaseTools(
  category: AiToolsCategory,
  featuredSlugs: string[] = []
): UseCaseTool[] {
  const all = getAllTools();
  const eligible = all.filter(
    (t) => normalizeCategory(t.frontmatter.aiToolsCategory) === category
  );

  for (const slug of featuredSlugs) {
    const tool = all.find((t) => t.slug === slug);
    if (!tool) {
      throw new Error(
        `getUseCaseTools("${category}"): featuredSlugs contains "${slug}", which has no matching review in content/tools/. Fix the slug or remove it.`
      );
    }
    const norm = normalizeCategory(tool.frontmatter.aiToolsCategory);
    if (norm !== category) {
      throw new Error(
        `getUseCaseTools("${category}"): featuredSlugs contains "${slug}", but its aiToolsCategory ("${tool.frontmatter.aiToolsCategory}") normalizes to "${norm}", not "${category}". Move it to the matching use-case page or fix its frontmatter.`
      );
    }
  }

  const featuredSet = new Set(featuredSlugs);
  const featured = featuredSlugs
    .map((slug) => eligible.find((t) => t.slug === slug))
    .filter((t): t is Tool => Boolean(t));
  const rest = eligible
    .filter((t) => !featuredSet.has(t.slug))
    .sort((a, b) => b.frontmatter.rating - a.frontmatter.rating);

  return [...featured, ...rest].map(toUseCaseTool);
}

/**
 * Eligible-tool count per use-case category (same normalization as
 * getUseCaseTools). Powers the "N Tools" label on each use-case page's
 * "Explore Other Categories" cross-links, so those counts stay in sync with
 * the real grid instead of a stale hardcoded number.
 */
export function getUseCaseCategoryCounts(): Record<AiToolsCategory, number> {
  const counts: Record<AiToolsCategory, number> = {
    design: 0,
    "content-marketing": 0,
    automation: 0,
    sales: 0,
    productivity: 0,
  };
  for (const t of getAllTools()) {
    const cat = normalizeCategory(t.frontmatter.aiToolsCategory);
    if (cat) counts[cat]++;
  }
  return counts;
}

// ── Tag pages ──────────────────────────────────────────────────────────────
//
// Plain, serializable shape for the /tags/[slug] client page's "AI Tools"
// section — same rationale as GridTool/UseCaseTool: resolved server-side,
// passed down as a prop. Reuses the UseCaseTool shape (it already carries
// everything the tag-page card needs: review link data + confirmed-or-empty
// affiliate href).

/**
 * Every review tagged with `tag` (frontmatter.tags), rating-sorted. Replaces
 * the old lib/ai-tools-data.ts curated list, which only covered ~35 tools and
 * had a broken/placeholder affiliateHref on 33 of them.
 */
export function getUseCaseToolsByTag(tag: string): UseCaseTool[] {
  return getToolsByTag(tag)
    .sort((a, b) => b.frontmatter.rating - a.frontmatter.rating)
    .map(toUseCaseTool);
}
