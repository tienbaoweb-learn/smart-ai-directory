import type { Metadata } from "next";
import ArchitectureIndustryClient from "./ArchitectureIndustryClient";
import { getIndustryGridTools } from "../../../lib/tools";

export const metadata: Metadata = {
  title: "AI Tools for Architecture Firms | SmartAI for Work",
  description:
    "From concept design and BIM modeling to rendering and client presentations, discover AI tools that help architecture firms win more projects.",
  alternates: { canonical: "/industries/architecture" },
  openGraph: {
    title: "AI Tools for Architecture Firms | SmartAI for Work",
    description:
      "From concept design and BIM modeling to rendering and client presentations, discover AI tools that help architecture firms win more projects.",
    url: "/industries/architecture",
    type: "website",
  },
};

export default function Page() {
  return (
    <ArchitectureIndustryClient
      allTools={getIndustryGridTools("architecture")}
    />
  );
}
