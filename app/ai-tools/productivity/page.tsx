import type { Metadata } from "next";
import ProductivityToolsClient from "./ProductivityToolsClient";

export const metadata: Metadata = {
  title: "AI Productivity & Management Tools | SmartAI for Work",
  description:
    "The best AI productivity and management tools to organize work, manage projects, and get more done.",
  alternates: { canonical: "/ai-tools/productivity" },
  openGraph: {
    title: "AI Productivity & Management Tools | SmartAI for Work",
    description:
      "The best AI productivity and management tools to organize work, manage projects, and get more done.",
    url: "/ai-tools/productivity",
    type: "website",
  },
};

export default function Page() {
  return <ProductivityToolsClient />;
}
