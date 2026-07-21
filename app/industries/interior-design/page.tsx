import type { Metadata } from "next";
import InteriorDesignIndustryClient from "./InteriorDesignIndustryClient";
import { getIndustryGridTools } from "../../../lib/tools";

export const metadata: Metadata = {
  title: "AI Tools for Interior Designers | SmartAI for Work",
  description:
    "From AI mood boards and space planning to photorealistic 3D rendering, discover the tools that help interior designers win more projects.",
  alternates: { canonical: "/industries/interior-design" },
  openGraph: {
    title: "AI Tools for Interior Designers | SmartAI for Work",
    description:
      "From AI mood boards and space planning to photorealistic 3D rendering, discover the tools that help interior designers win more projects.",
    url: "/industries/interior-design",
    type: "website",
  },
};

// Reflects the visible breadcrumb: Home > Industries > Interior Design.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.smartaiforwork.com/industries" },
    { "@type": "ListItem", position: 3, name: "Interior Design", item: "https://www.smartaiforwork.com/industries/interior-design" },
  ],
};

export default function Page() {
  const allTools = getIndustryGridTools("interior-design");

  // Data-driven from the exact same list rendered on the page — never drifts.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Tools for Interior Designers",
    url: "https://www.smartaiforwork.com/industries/interior-design",
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
      <InteriorDesignIndustryClient allTools={allTools} />
    </>
  );
}
