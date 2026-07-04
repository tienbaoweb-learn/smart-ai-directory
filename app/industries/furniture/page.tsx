import type { Metadata } from "next";
import FurnitureIndustryClient from "./FurnitureIndustryClient";
import { getIndustryGridTools } from "../../../lib/tools";

export const metadata: Metadata = {
  title: "AI Tools for Furniture Businesses | SmartAI for Work",
  description:
    "Discover the best AI tools for furniture manufacturers, retailers, and designers — product visuals, catalog automation, and more sales.",
  alternates: { canonical: "/industries/furniture" },
  openGraph: {
    title: "AI Tools for Furniture Businesses | SmartAI for Work",
    description:
      "Discover the best AI tools for furniture manufacturers, retailers, and designers — product visuals, catalog automation, and more sales.",
    url: "/industries/furniture",
    type: "website",
  },
};

export default function Page() {
  return (
    <FurnitureIndustryClient allTools={getIndustryGridTools("furniture")} />
  );
}
