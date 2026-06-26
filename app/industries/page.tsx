import type { Metadata } from "next";
import IndustriesHubClient from "./IndustriesHubClient";

export const metadata: Metadata = {
  title: "AI Tools by Industry | SmartAI for Work",
  description:
    "Explore AI tools, workflows, and best practices customized for furniture, architecture, construction, and real estate.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "AI Tools by Industry | SmartAI for Work",
    description:
      "Explore AI tools, workflows, and best practices customized for furniture, architecture, construction, and real estate.",
    url: "/industries",
    type: "website",
  },
};

export default function Page() {
  return <IndustriesHubClient />;
}
