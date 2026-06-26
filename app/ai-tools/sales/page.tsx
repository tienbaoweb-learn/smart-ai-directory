import type { Metadata } from "next";
import SalesToolsClient from "./SalesToolsClient";

export const metadata: Metadata = {
  title: "AI Sales & Lead Generation Tools | SmartAI for Work",
  description:
    "Top AI sales and lead generation tools to find prospects, write outreach, and close deals faster.",
  alternates: { canonical: "/ai-tools/sales" },
  openGraph: {
    title: "AI Sales & Lead Generation Tools | SmartAI for Work",
    description:
      "Top AI sales and lead generation tools to find prospects, write outreach, and close deals faster.",
    url: "/ai-tools/sales",
    type: "website",
  },
};

export default function Page() {
  return <SalesToolsClient />;
}
