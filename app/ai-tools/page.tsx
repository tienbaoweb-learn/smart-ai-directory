import type { Metadata } from "next";
import { getAllUseCaseTools } from "@/lib/tools";
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

// No visible breadcrumb UI exists on this hub — schema-only (per session
// scope, not adding visible breadcrumb UI here).
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.smartaiforwork.com/ai-tools" },
  ],
};

// The 5 use-case pages this hub links to.
const USE_CASES = [
  { name: "AI Design & Visualization", slug: "design" },
  { name: "AI Sales & Lead Generation", slug: "sales" },
  { name: "AI Content & Marketing", slug: "content-marketing" },
  { name: "AI Automation & Workflow", slug: "automation" },
  { name: "AI Productivity & Management", slug: "productivity" },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Discover AI Tools That Help You Work Smarter",
  url: "https://www.smartaiforwork.com/ai-tools",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: USE_CASES.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: u.name,
      url: `https://www.smartaiforwork.com/ai-tools/${u.slug}`,
    })),
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <AIToolsHubClient tools={getAllUseCaseTools()} />
    </>
  );
}
