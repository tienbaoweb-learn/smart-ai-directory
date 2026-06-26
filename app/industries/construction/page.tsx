import type { Metadata } from "next";
import ConstructionIndustryClient from "./ConstructionIndustryClient";

export const metadata: Metadata = {
  title: "AI Tools for Construction Companies | SmartAI for Work",
  description:
    "From project planning and site monitoring to progress tracking and compliance reporting, discover AI tools that help construction companies deliver on time.",
  alternates: { canonical: "/industries/construction" },
  openGraph: {
    title: "AI Tools for Construction Companies | SmartAI for Work",
    description:
      "From project planning and site monitoring to progress tracking and compliance reporting, discover AI tools that help construction companies deliver on time.",
    url: "/industries/construction",
    type: "website",
  },
};

export default function Page() {
  return <ConstructionIndustryClient />;
}
