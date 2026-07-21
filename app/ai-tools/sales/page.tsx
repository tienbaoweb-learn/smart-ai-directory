import type { Metadata } from "next";
import { getUseCaseTools, getUseCaseCategoryCounts } from "@/lib/tools";
import SalesToolsClient from "./SalesToolsClient";

export const metadata: Metadata = {
  title: "AI Sales & Lead Generation Tools | SmartAI for Work",
  description:
    "Top AI sales and lead generation tools to find prospects, write outreach, and close deals faster.",
  alternates: { canonical: "/ai-tools/sales" },
  openGraph: {
    title: "AI Sales & Lead Generation Tools | SmartAI for Work",
    description:
      "Top AI sales and lead generation tools to find prospects, write outreach, and close deals faster.",
    url: "/ai-tools/sales",
    type: "website",
  },
};

// Previously-curated tools, preserved as "featured" (shown first) now that the
// grid pulls every eligible review instead of only these 7. Validated at
// build time against real frontmatter in getUseCaseTools — see lib/tools.ts.
const FEATURED_SLUGS = [
  // "reimagine-home" moved to the design page — its real frontmatter
  // aiToolsCategory is "design", not "sales".
  "buzz-ai",
  "grape-leads",
  "guideflow",
  "involve-me",
  "leader-crm",
  "warmupinbox",
];

export default function Page() {
  const tools = getUseCaseTools("sales", FEATURED_SLUGS);
  const categoryCounts = getUseCaseCategoryCounts();
  return <SalesToolsClient tools={tools} categoryCounts={categoryCounts} />;
}
