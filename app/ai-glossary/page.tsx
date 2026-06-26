import type { Metadata } from "next";
import AIGlossaryClient from "./AIGlossaryClient";

export const metadata: Metadata = {
  title: "AI Glossary: Key AI Terms Explained | SmartAI for Work",
  description:
    "Plain-English definitions of the AI terms you'll run into when researching AI tools for furniture, architecture, construction, and real estate.",
  alternates: { canonical: "/ai-glossary" },
  openGraph: {
    title: "AI Glossary | SmartAI for Work",
    description:
      "Plain-English definitions of the AI terms you'll run into when researching AI tools for your industry.",
    url: "/ai-glossary",
    type: "website",
  },
};

export default function Page() {
  return <AIGlossaryClient />;
}
