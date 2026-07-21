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

// Reflects the visible breadcrumb: Home > AI Tools > AI Design & Visualization.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.smartaiforwork.com/ai-tools" },
    { "@type": "ListItem", position: 3, name: "AI Design & Visualization", item: "https://www.smartaiforwork.com/ai-tools/design" },
  ],
};

export default function Page() {
  const tools = getUseCaseTools("design", FEATURED_SLUGS);
  const categoryCounts = getUseCaseCategoryCounts();

  // Data-driven from the exact same list rendered on the page — never drifts.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Design & Visualization Tools",
    url: "https://www.smartaiforwork.com/ai-tools/design",
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
      <DesignToolsClient tools={tools} categoryCounts={categoryCounts} />
    </>
  );
}
