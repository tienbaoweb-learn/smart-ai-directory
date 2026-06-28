import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import HomeClient, { type HomeTool } from "./HomeClient";
import { getAllTools } from "../lib/tools";
import { TOOL_LOGO_URLS } from "./data/tool-logos";

export const metadata: Metadata = {
  title: "SmartAI for Work - AI Tools Directory",
  description:
    "Discover handpicked AI tools for furniture, architecture, construction, and real estate. Save time, reduce costs, and grow your business with AI.",
  alternates: { canonical: "/" },
};

// Industry slug → display label used by the "Top AI Tools Across Industries" tabs.
const INDUSTRY_LABEL: Record<string, string> = {
  architecture: "Architecture",
  construction: "Construction",
  furniture: "Furniture",
  "interior-design": "Interior Design",
  "real-estate": "Real Estate",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Only use a logo path when the image actually exists in /public.
function resolveLogo(slug: string, frontmatterLogo?: string): string {
  const logo = TOOL_LOGO_URLS[slug] ?? frontmatterLogo ?? "";
  if (!logo) return "";
  return fs.existsSync(path.join(process.cwd(), "public", logo)) ? logo : "";
}

export default function Page() {
  // Build the live tool list from the real review articles so the homepage
  // section reflects current ratings and stays in sync per industry.
  const topTools: HomeTool[] = getAllTools()
    .map((t) => {
      const f = t.frontmatter;
      const name = f.toolName || f.title;
      const industries = (f.industries ?? [])
        .map((s) => INDUSTRY_LABEL[s])
        .filter((v, i, arr): v is string => Boolean(v) && arr.indexOf(v) === i);
      return {
        slug: t.slug,
        name,
        rating: f.rating ?? 0,
        desc: f.bestFor?.[0] ? `Best for ${f.bestFor[0]}` : f.excerpt ?? "",
        industries,
        logoUrl: resolveLogo(t.slug, f.logoUrl),
        logoText: initials(name),
      };
    })
    .filter((t) => t.industries.length > 0)
    .sort((a, b) => b.rating - a.rating);

  return <HomeClient topTools={topTools} />;
}
