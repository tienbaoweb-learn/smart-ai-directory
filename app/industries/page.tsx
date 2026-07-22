import type { Metadata } from "next";
import IndustriesHubClient from "./IndustriesHubClient";

export const metadata: Metadata = {
  title: "AI Tools by Industry | SmartAI for Work",
  description:
    "Explore AI tools, workflows, and best practices customized for furniture, architecture, construction, and real estate.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "AI Tools by Industry | SmartAI for Work",
    description:
      "Explore AI tools, workflows, and best practices customized for furniture, architecture, construction, and real estate.",
    url: "/industries",
    type: "website",
  },
};

// No visible breadcrumb UI exists on this hub — schema-only (per session scope,
// not adding visible breadcrumb UI here).
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.smartaiforwork.com/industries" },
  ],
};

// The 5 industry pages this hub links to (matches INDUSTRY_CARDS-style
// navigation rendered by IndustriesHubClient).
const INDUSTRIES = [
  { name: "Architecture", slug: "architecture" },
  { name: "Construction", slug: "construction" },
  { name: "Furniture", slug: "furniture" },
  { name: "Interior Design", slug: "interior-design" },
  { name: "Real Estate", slug: "real-estate" },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Tools by Industry",
  url: "https://www.smartaiforwork.com/industries",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: INDUSTRIES.map((ind, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: ind.name,
      url: `https://www.smartaiforwork.com/industries/${ind.slug}`,
    })),
  },
};

export default function Page() {
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
      <IndustriesHubClient />
    </>
  );
}
