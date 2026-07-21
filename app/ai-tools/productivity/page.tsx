import type { Metadata } from "next";
import { getUseCaseTools, getUseCaseCategoryCounts } from "@/lib/tools";
import ProductivityToolsClient from "./ProductivityToolsClient";

export const metadata: Metadata = {
  title: "AI Productivity & Management Tools | SmartAI for Work",
  description:
    "The best AI productivity and management tools to organize work, manage projects, and get more done.",
  alternates: { canonical: "/ai-tools/productivity" },
  openGraph: {
    title: "AI Productivity & Management Tools | SmartAI for Work",
    description:
      "The best AI productivity and management tools to organize work, manage projects, and get more done.",
    url: "/ai-tools/productivity",
    type: "website",
  },
};

// Previously-curated tools, preserved as "featured" (shown first) now that the
// grid pulls every eligible review instead of only these 8-10. Validated at
// build time against real frontmatter in getUseCaseTools — see lib/tools.ts.
const FEATURED_SLUGS = [
  "notion-ai",
  "perplexity-ai",
  "homesage-ai",
  "insightful",
  "joiin",
  "leavo",
  "signeasy",
  "team-pulse",
  // Moved here from the content-marketing page — their real frontmatter
  // aiToolsCategory is "productivity", not "content-marketing".
  "chatgpt",
  "claude",
];

export default function Page() {
  const tools = getUseCaseTools("productivity", FEATURED_SLUGS);
  const categoryCounts = getUseCaseCategoryCounts();
  return (
    <ProductivityToolsClient tools={tools} categoryCounts={categoryCounts} />
  );
}
