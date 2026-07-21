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

// Reflects the visible breadcrumb: Home > AI Tools > AI Sales & Lead
// Generation.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.smartaiforwork.com/ai-tools" },
    { "@type": "ListItem", position: 3, name: "AI Sales & Lead Generation", item: "https://www.smartaiforwork.com/ai-tools/sales" },
  ],
};

export default function Page() {
  const tools = getUseCaseTools("sales", FEATURED_SLUGS);
  const categoryCounts = getUseCaseCategoryCounts();

  // Data-driven from the exact same list rendered on the page — never drifts.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Sales & Lead Generation Tools",
    url: "https://www.smartaiforwork.com/ai-tools/sales",
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
      <SalesToolsClient tools={tools} categoryCounts={categoryCounts} />
    </>
  );
}
