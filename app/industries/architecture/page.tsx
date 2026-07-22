import type { Metadata } from "next";
import ArchitectureIndustryClient from "./ArchitectureIndustryClient";
import { getIndustryGridTools } from "../../../lib/tools";

export const metadata: Metadata = {
  title: "AI Tools for Architecture Firms | SmartAI for Work",
  description:
    "From concept design and BIM modeling to rendering and client presentations, discover AI tools that help architecture firms win more projects.",
  alternates: { canonical: "/industries/architecture" },
  openGraph: {
    title: "AI Tools for Architecture Firms | SmartAI for Work",
    description:
      "From concept design and BIM modeling to rendering and client presentations, discover AI tools that help architecture firms win more projects.",
    url: "/industries/architecture",
    type: "website",
  },
};

// Reflects the visible breadcrumb (BreadcrumbSection in
// ArchitectureIndustryClient): Home > Industries > Architecture.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.smartaiforwork.com/industries" },
    { "@type": "ListItem", position: 3, name: "Architecture", item: "https://www.smartaiforwork.com/industries/architecture" },
  ],
};

export default function Page() {
  const allTools = getIndustryGridTools("architecture");

  // Data-driven from the exact same list rendered on the page — never drifts.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Tools for Architecture Firms",
    url: "https://www.smartaiforwork.com/industries/architecture",
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
      <ArchitectureIndustryClient allTools={allTools} />
    </>
  );
}
