import type { Metadata } from "next";
import AutomationToolsClient from "./AutomationToolsClient";

export const metadata: Metadata = {
  title: "AI Automation & Workflow Tools | SmartAI for Work",
  description:
    "Top AI automation and workflow tools to eliminate repetitive tasks and connect your business systems.",
  alternates: { canonical: "/ai-tools/automation" },
  openGraph: {
    title: "AI Automation & Workflow Tools | SmartAI for Work",
    description:
      "Top AI automation and workflow tools to eliminate repetitive tasks and connect your business systems.",
    url: "/ai-tools/automation",
    type: "website",
  },
};

export default function Page() {
  return <AutomationToolsClient />;
}
