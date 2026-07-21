import type { Metadata } from "next";
import { getUseCaseTools, getUseCaseCategoryCounts } from "@/lib/tools";
import DesignToolsClient from "./DesignToolsClient";

export const metadata: Metadata = {
  title: "AI Design & Visualization Tools | SmartAI for Work",
  description:
    "The best AI design and visualization tools for rendering, concept art, and photorealistic 3D — tested for real business use.",
  alternates: { canonical: "/ai-tools/design" },
  openGraph: {
    title: "AI Design & Visualization Tools | SmartAI for Work",
    description:
      "The best AI design and visualization tools for rendering, concept art, and photorealistic 3D.",
    url: "/ai-tools/design",
    type: "website",
  },
};

// Previously-curated tools, preserved as "featured" (shown first) now that the
// grid pulls every eligible review instead of only these 11. Validated at
// build time against real frontmatter in getUseCaseTools — see lib/tools.ts.
const FEATURED_SLUGS = [
  "aihomedesign",
  "collov-ai",
  "d5-render",
  "designsense",
  "homedesigns",
  "ideal-house",
  "midjourney",
  "planner-5d",
  "sofabrain",
  "rendar-ai",
  "turbologo",
  "reimagine-home", // moved here from the sales page — its real frontmatter aiToolsCategory is "design", not "sales"
];

export default function Page() {
  const tools = getUseCaseTools("design", FEATURED_SLUGS);
  const categoryCounts = getUseCaseCategoryCounts();
  return <DesignToolsClient tools={tools} categoryCounts={categoryCounts} />;
}
