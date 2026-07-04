import type { Metadata } from "next";
import BestConstructionClient from "./BestConstructionClient";
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

export default function Page() {
  return (
    <BestConstructionClient allTools={getIndustryGridTools("construction")} />
  );
}
