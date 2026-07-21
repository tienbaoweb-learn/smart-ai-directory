import type { Metadata } from "next";
import BestConstructionClient from "./BestConstructionClient";
import { FAQ_ITEMS } from "./faq-items";
import { getIndustryGridTools } from "../../../lib/tools";

export const metadata: Metadata = {
  title: "The Best AI Tools for Construction Teams | SmartAI for Work",
  description:
    "Hand-ranked list of the best AI tools for construction teams — project planning, site monitoring, and progress tracking.",
  alternates: { canonical: "/best-of/construction" },
  openGraph: {
    title: "The Best AI Tools for Construction Teams | SmartAI for Work",
    description:
      "Hand-ranked list of the best AI tools for construction teams — project planning, site monitoring, and progress tracking.",
    url: "/best-of/construction",
    type: "website",
  },
};

// Reflects the visible breadcrumb: Home > Best Of > Best AI Tools for
// Construction Teams.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "Best Of", item: "https://www.smartaiforwork.com/best-of" },
    { "@type": "ListItem", position: 3, name: "Best AI Tools for Construction Teams", item: "https://www.smartaiforwork.com/best-of/construction" },
  ],
};

export default function Page() {
  const allTools = getIndustryGridTools("construction");

  // Computed inside the component (not at module scope) — FAQ_ITEMS is
  // exported from a "use client" module, and evaluating .map() on it at
  // server-module top level breaks the production build. Serialized from
  // the same array the page renders as a visible accordion
  // (BestConstructionClient) — text here must never drift from what's on
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
    name: "The Best AI Tools for Construction Teams",
    url: "https://www.smartaiforwork.com/best-of/construction",
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
      <BestConstructionClient allTools={allTools} />
    </>
  );
}
