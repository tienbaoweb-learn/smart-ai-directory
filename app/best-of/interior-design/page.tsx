import type { Metadata } from "next";
import BestInteriorDesignClient, { FAQ_ITEMS } from "./BestInteriorDesignClient";
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

// Serialized from the same FAQ_ITEMS array the page renders as a visible
// accordion (BestInteriorDesignClient) — text here must never drift from
// what's on the page.
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
      <BestInteriorDesignClient
        allTools={getIndustryGridTools("interior-design")}
      />
    </>
  );
}
