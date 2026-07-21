import type { Metadata } from "next";
import BestRealEstateClient, { FAQ_ITEMS } from "./BestRealEstateClient";
import { getIndustryGridTools } from "../../../lib/tools";

export const metadata: Metadata = {
  title: "The Best AI Tools for Real Estate Professionals | SmartAI for Work",
  description:
    "Hand-ranked list of the best AI tools for real estate professionals — lead generation, valuation, and deal closing.",
  alternates: { canonical: "/best-of/real-estate" },
  openGraph: {
    title: "The Best AI Tools for Real Estate Professionals | SmartAI for Work",
    description:
      "Hand-ranked list of the best AI tools for real estate professionals — lead generation, valuation, and deal closing.",
    url: "/best-of/real-estate",
    type: "website",
  },
};

// Serialized from the same FAQ_ITEMS array the page renders as a visible
// accordion (BestRealEstateClient) — text here must never drift from what's
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
      <BestRealEstateClient allTools={getIndustryGridTools("real-estate")} />
    </>
  );
}
