import type { Metadata } from "next";
import BestArchitectureClient, { FAQ_ITEMS } from "./BestArchitectureClient";
import { getIndustryGridTools } from "../../../lib/tools";

export const metadata: Metadata = {
  title: "The Best AI Tools for Architects | SmartAI for Work",
  description:
    "Hand-ranked list of the best AI tools for architects — concept design, BIM, rendering, and client presentations.",
  alternates: { canonical: "/best-of/architecture" },
  openGraph: {
    title: "The Best AI Tools for Architects | SmartAI for Work",
    description:
      "Hand-ranked list of the best AI tools for architects — concept design, BIM, rendering, and client presentations.",
    url: "/best-of/architecture",
    type: "website",
  },
};

// Serialized from the same FAQ_ITEMS array the page renders as a visible
// accordion (BestArchitectureClient) — text here must never drift from what's
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
      <BestArchitectureClient allTools={getIndustryGridTools("architecture")} />
    </>
  );
}
