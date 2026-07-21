import type { Metadata } from "next";
import RealEstateIndustryClient from "./RealEstateIndustryClient";
import { getIndustryGridTools } from "../../../lib/tools";

export const metadata: Metadata = {
  title: "AI Tools for Real Estate Professionals | SmartAI for Work",
  description:
    "From lead generation and listing copywriting to virtual staging and deal closing, discover AI tools that help real estate professionals grow their business.",
  alternates: { canonical: "/industries/real-estate" },
  openGraph: {
    title: "AI Tools for Real Estate Professionals | SmartAI for Work",
    description:
      "From lead generation and listing copywriting to virtual staging and deal closing, discover AI tools that help real estate professionals grow their business.",
    url: "/industries/real-estate",
    type: "website",
  },
};

// Reflects the visible breadcrumb: Home > Industries > Real Estate.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.smartaiforwork.com/industries" },
    { "@type": "ListItem", position: 3, name: "Real Estate", item: "https://www.smartaiforwork.com/industries/real-estate" },
  ],
};

export default function Page() {
  const allTools = getIndustryGridTools("real-estate");

  // Data-driven from the exact same list rendered on the page — never drifts.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Tools for Real Estate Professionals",
    url: "https://www.smartaiforwork.com/industries/real-estate",
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
      <RealEstateIndustryClient allTools={allTools} />
    </>
  );
}
