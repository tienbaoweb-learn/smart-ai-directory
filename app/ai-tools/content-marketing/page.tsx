import type { Metadata } from "next";
import { getUseCaseTools, getUseCaseCategoryCounts } from "@/lib/tools";
import ContentMarketingToolsClient from "./ContentMarketingToolsClient";

export const metadata: Metadata = {
  title: "AI Content & Marketing Tools | SmartAI for Work",
  description:
    "The best AI content and marketing tools for copywriting, social media, SEO, and campaign automation.",
  alternates: { canonical: "/ai-tools/content-marketing" },
  openGraph: {
    title: "AI Content & Marketing Tools | SmartAI for Work",
    description:
      "The best AI content and marketing tools for copywriting, social media, SEO, and campaign automation.",
    url: "/ai-tools/content-marketing",
    type: "website",
  },
};

// Previously-curated tools, preserved as "featured" (shown first) now that the
// grid pulls every eligible review instead of only these 9-11. Validated at
// build time against real frontmatter in getUseCaseTools — see lib/tools.ts.
const FEATURED_SLUGS = [
  // "chatgpt" and "claude" moved to the productivity page — their real
  // frontmatter aiToolsCategory is "productivity", not "content-marketing".
  "grammarly",
  "adturbo",
  "alli-ai",
  "audiorista",
  "geo-targetly",
  "gixo-ai",
  "jasper-ai",
  "searchatlas",
  "pushalert",
];

export default function Page() {
  const tools = getUseCaseTools("content-marketing", FEATURED_SLUGS);
  const categoryCounts = getUseCaseCategoryCounts();
  return (
    <ContentMarketingToolsClient tools={tools} categoryCounts={categoryCounts} />
  );
}
