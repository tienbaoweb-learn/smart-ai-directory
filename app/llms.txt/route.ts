import { getAllTools } from "@/lib/tools";
import { guidesData } from "@/lib/guides-data";
import { comparisonsData } from "@/lib/comparisons-data";
import { workflowsData } from "@/lib/workflows-data";

// llms.txt — a plain-text site guide for AI crawlers and answer engines
// (see https://llmstxt.org). Generated from the same data as the sitemap so
// it never drifts from the published content.
export const dynamic = "force-static";

const BASE = "https://www.smartaiforwork.com";

export function GET() {
  const tools = getAllTools();
  const featured = tools.filter((t) => t.frontmatter.featured).slice(0, 20);

  const lines: string[] = [
    "# SmartAI for Work",
    "",
    "> Independent directory of AI tools for furniture, architecture, construction,",
    "> interior design, and real estate professionals. Every tool page is an",
    "> editorial review with ratings, pricing, pros & cons, alternatives, and FAQs.",
    "",
    "## Main sections",
    "",
    `- [All tool reviews](${BASE}/tools): ${tools.length} in-depth AI tool reviews`,
    `- [AI Tools hub](${BASE}/ai-tools): tools by use case (design, sales, automation, content, productivity)`,
    `- [Best Of lists](${BASE}/best-of): curated top tools per industry`,
    `- [Industries](${BASE}/industries): furniture, architecture, construction, interior design, real estate`,
    `- [Comparisons](${BASE}/resources/comparisons): head-to-head tool comparisons`,
    `- [Guides](${BASE}/resources/guides): editorial buying guides per industry`,
    `- [Workflows](${BASE}/resources/workflows): step-by-step AI workflows`,
    `- [AI Glossary](${BASE}/ai-glossary): plain-English AI terminology`,
    "",
    "## Industry guides",
    "",
    ...guidesData.map(
      (g) => `- [${g.title}](${BASE}${g.href})`,
    ),
    "",
    "## Popular comparisons",
    "",
    ...comparisonsData.map(
      (c) => `- [${c.title}](${BASE}${c.href}): ${c.description}`,
    ),
    "",
    "## Featured tool reviews",
    "",
    ...featured.map((t) => {
      const name =
        t.frontmatter.toolName || t.frontmatter.title.split(":")[0].trim();
      return `- [${name} review](${BASE}/tools/${t.slug}): ${t.frontmatter.excerpt}`;
    }),
    "",
    "## Workflows",
    "",
    ...workflowsData.map((w) => `- [${w.title}](${BASE}${w.href})`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
