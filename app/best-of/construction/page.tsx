import type { Metadata } from "next";
import BestConstructionClient, { FAQ_ITEMS } from "./BestConstructionClient";
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

// Serialized from the same FAQ_ITEMS array the page renders as a visible
// accordion (BestConstructionClient) — text here must never drift from what's
// on the page.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BestConstructionClient allTools={getIndustryGridTools("construction")} />
    </>
  );
}
