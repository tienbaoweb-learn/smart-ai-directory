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

// Reflects the visible breadcrumb: Home > AI Tools > AI Productivity &
// Management.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.smartaiforwork.com/ai-tools" },
    { "@type": "ListItem", position: 3, name: "AI Productivity & Management", item: "https://www.smartaiforwork.com/ai-tools/productivity" },
  ],
};

export default function Page() {
  const tools = getUseCaseTools("productivity", FEATURED_SLUGS);
  const categoryCounts = getUseCaseCategoryCounts();

  // Data-driven from the exact same list rendered on the page — never drifts.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Productivity & Management Tools",
    url: "https://www.smartaiforwork.com/ai-tools/productivity",
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
      <ProductivityToolsClient tools={tools} categoryCounts={categoryCounts} />
    </>
  );
}
