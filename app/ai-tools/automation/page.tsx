import type { Metadata } from "next";
import { getUseCaseTools, getUseCaseCategoryCounts } from "@/lib/tools";
import AutomationToolsClient from "./AutomationToolsClient";

export const metadata: Metadata = {
  title: "AI Automation & Workflow Tools | SmartAI for Work",
  description:
    "Top AI automation and workflow tools to eliminate repetitive tasks and connect your business systems.",
  alternates: { canonical: "/ai-tools/automation" },
  openGraph: {
    title: "AI Automation & Workflow Tools | SmartAI for Work",
    description:
      "Top AI automation and workflow tools to eliminate repetitive tasks and connect your business systems.",
    url: "/ai-tools/automation",
    type: "website",
  },
};

// Previously-curated tools, preserved as "featured" (shown first) now that the
// grid pulls every eligible review instead of only these 10. Validated at
// build time against real frontmatter in getUseCaseTools — see lib/tools.ts.
const FEATURED_SLUGS = [
  "buildots",
  "zapier",
  "algomo",
  "customgpt-ai",
  "deskwoot",
  "dynamiq",
  "emaillistverify",
  "pricefy",
  "help-center",
  "make",
];

export default function Page() {
  const tools = getUseCaseTools("automation", FEATURED_SLUGS);
  const categoryCounts = getUseCaseCategoryCounts();
  return <AutomationToolsClient tools={tools} categoryCounts={categoryCounts} />;
}
