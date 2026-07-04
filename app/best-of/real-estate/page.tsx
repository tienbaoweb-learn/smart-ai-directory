import type { Metadata } from "next";
import BestRealEstateClient from "./BestRealEstateClient";
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

export default function Page() {
  return (
    <BestRealEstateClient allTools={getIndustryGridTools("real-estate")} />
  );
}
