import type { Metadata } from "next";
import AIToolsHubClient from "./AIToolsHubClient";

export const metadata: Metadata = {
  title: "Discover AI Tools That Help You Work Smarter",
  description:
    "Explore the best AI writing, automation, marketing, productivity and agent tools tested for real business use. Save time and get more done with AI.",
  alternates: { canonical: "/ai-tools" },
  openGraph: {
    title: "Discover AI Tools That Help You Work Smarter | SmartAI for Work",
    description:
      "Explore the best AI writing, automation, marketing, productivity and agent tools tested for real business use.",
    url: "/ai-tools",
    type: "website",
  },
};

export default function Page() {
  return <AIToolsHubClient />;
}
