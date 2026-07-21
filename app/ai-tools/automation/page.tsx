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

// Reflects the visible breadcrumb: Home > AI Tools > AI Automation & Workflow.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.smartaiforwork.com/ai-tools" },
    { "@type": "ListItem", position: 3, name: "AI Automation & Workflow", item: "https://www.smartaiforwork.com/ai-tools/automation" },
  ],
};

export default function Page() {
  const tools = getUseCaseTools("automation", FEATURED_SLUGS);
  const categoryCounts = getUseCaseCategoryCounts();

  // Data-driven from the exact same list rendered on the page — never drifts.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Automation & Workflow Tools",
    url: "https://www.smartaiforwork.com/ai-tools/automation",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools.slice(0, 30).map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.name,
        url: `https://www.smartaiforwork.com/tools/${t.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <AutomationToolsClient tools={tools} categoryCounts={categoryCounts} />
    </>
  );
}
