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

export default function Page() {
  return (
    <RealEstateIndustryClient allTools={getIndustryGridTools("real-estate")} />
  );
}
