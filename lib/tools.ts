import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const TOOLS_DIR = path.join(process.cwd(), "content/tools");

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
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
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
