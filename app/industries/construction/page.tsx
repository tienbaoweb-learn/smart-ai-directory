import type { Metadata } from "next";
import ConstructionIndustryClient from "./ConstructionIndustryClient";
import { getIndustryGridTools } from "../../../lib/tools";

export const metadata: Metadata = {
  title: "AI Tools for Construction Companies | SmartAI for Work",
  description:
    "From project planning and site monitoring to progress tracking and compliance reporting, discover AI tools that help construction companies deliver on time.",
  alternates: { canonical: "/industries/construction" },
  openGraph: {
    title: "AI Tools for Construction Companies | SmartAI for Work",
    description:
      "From project planning and site monitoring to progress tracking and compliance reporting, discover AI tools that help construction companies deliver on time.",
    url: "/industries/construction",
    type: "website",
  },
};

// Reflects the visible breadcrumb: Home > Industries > Construction.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.smartaiforwork.com/industries" },
    { "@type": "ListItem", position: 3, name: "Construction", item: "https://www.smartaiforwork.com/industries/construction" },
  ],
};

export default function Page() {
  const allTools = getIndustryGridTools("construction");

  // Data-driven from the exact same list rendered on the page — never drifts.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Tools for Construction Companies",
    url: "https://www.smartaiforwork.com/industries/construction",
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
      <ConstructionIndustryClient allTools={allTools} />
    </>
  );
}
