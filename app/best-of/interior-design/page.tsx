import type { Metadata } from "next";
import BestInteriorDesignClient from "./BestInteriorDesignClient";
import { FAQ_ITEMS } from "./faq-items";
import { getIndustryGridTools } from "../../../lib/tools";

export const metadata: Metadata = {
  title: "The Best AI Tools for Interior Designers | SmartAI for Work",
  description:
    "Hand-ranked list of the best AI tools for interior designers — mood boards, space planning, and 3D rendering.",
  alternates: { canonical: "/best-of/interior-design" },
  openGraph: {
    title: "The Best AI Tools for Interior Designers | SmartAI for Work",
    description:
      "Hand-ranked list of the best AI tools for interior designers — mood boards, space planning, and 3D rendering.",
    url: "/best-of/interior-design",
    type: "website",
  },
};

// Reflects the visible breadcrumb: Home > Best Of > Best AI Tools for
// Interior Designers.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "Best Of", item: "https://www.smartaiforwork.com/best-of" },
    { "@type": "ListItem", position: 3, name: "Best AI Tools for Interior Designers", item: "https://www.smartaiforwork.com/best-of/interior-design" },
  ],
};

export default function Page() {
  const allTools = getIndustryGridTools("interior-design");

  // Computed inside the component (not at module scope) — FAQ_ITEMS is
  // exported from a "use client" module, and evaluating .map() on it at
  // server-module top level breaks the production build. Serialized from
  // the same array the page renders as a visible accordion
  // (BestInteriorDesignClient) — text here must never drift from what's on
  // the page.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  // Data-driven from the exact same list rendered on the page — never drifts.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "The Best AI Tools for Interior Designers",
    url: "https://www.smartaiforwork.com/best-of/interior-design",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <BestInteriorDesignClient allTools={allTools} />
    </>
  );
}
