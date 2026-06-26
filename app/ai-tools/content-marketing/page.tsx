import type { Metadata } from "next";
import ContentMarketingToolsClient from "./ContentMarketingToolsClient";

export const metadata: Metadata = {
  title: "AI Content & Marketing Tools | SmartAI for Work",
  description:
    "The best AI content and marketing tools for copywriting, social media, SEO, and campaign automation.",
  alternates: { canonical: "/ai-tools/content-marketing" },
  openGraph: {
    title: "AI Content & Marketing Tools | SmartAI for Work",
    description:
      "The best AI content and marketing tools for copywriting, social media, SEO, and campaign automation.",
    url: "/ai-tools/content-marketing",
    type: "website",
  },
};

export default function Page() {
  return <ContentMarketingToolsClient />;
}
