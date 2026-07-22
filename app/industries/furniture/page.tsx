import type { Metadata } from "next";
import FurnitureIndustryClient from "./FurnitureIndustryClient";
import { getIndustryGridTools } from "../../../lib/tools";

export const metadata: Metadata = {
  title: "AI Tools for Furniture Businesses | SmartAI for Work",
  description:
    "Discover the best AI tools for furniture manufacturers, retailers, and designers — product visuals, catalog automation, and more sales.",
  alternates: { canonical: "/industries/furniture" },
  openGraph: {
    title: "AI Tools for Furniture Businesses | SmartAI for Work",
    description:
      "Discover the best AI tools for furniture manufacturers, retailers, and designers — product visuals, catalog automation, and more sales.",
    url: "/industries/furniture",
    type: "website",
  },
};

// Reflects the visible breadcrumb: Home > Industries > Furniture.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.smartaiforwork.com/industries" },
    { "@type": "ListItem", position: 3, name: "Furniture", item: "https://www.smartaiforwork.com/industries/furniture" },
  ],
};

export default function Page() {
  const allTools = getIndustryGridTools("furniture");

  // Data-driven from the exact same list rendered on the page — never drifts.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Tools for Furniture Businesses",
    url: "https://www.smartaiforwork.com/industries/furniture",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allTools.slice(0, 30).map((t, i) => ({
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
      <FurnitureIndustryClient allTools={allTools} />
    </>
  );
}
