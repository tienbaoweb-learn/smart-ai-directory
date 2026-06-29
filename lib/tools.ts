import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

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
      : `aicat:${fm.aiToolsCategory ?? "uncategorized"}`;

  const f = current.frontmatter;
  const hub: RelatedHub | null =
    f.bestOf && f.bestOf.length > 0
      ? (INDUSTRY_HUBS[f.bestOf[0]] ?? null)
      : f.aiToolsCategory
        ? (AI_CATEGORY_HUBS[f.aiToolsCategory] ?? null)
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
