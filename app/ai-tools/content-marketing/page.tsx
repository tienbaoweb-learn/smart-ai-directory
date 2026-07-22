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

// Reflects the visible breadcrumb: Home > AI Tools > AI Content & Marketing.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.smartaiforwork.com/ai-tools" },
    { "@type": "ListItem", position: 3, name: "AI Content & Marketing", item: "https://www.smartaiforwork.com/ai-tools/content-marketing" },
  ],
};

export default function Page() {
  const tools = getUseCaseTools("content-marketing", FEATURED_SLUGS);
  const categoryCounts = getUseCaseCategoryCounts();

  // Data-driven from the exact same list rendered on the page — never drifts.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Content & Marketing Tools",
    url: "https://www.smartaiforwork.com/ai-tools/content-marketing",
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
      <ContentMarketingToolsClient tools={tools} categoryCounts={categoryCounts} />
    </>
  );
}
