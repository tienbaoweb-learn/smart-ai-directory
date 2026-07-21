import type { Metadata } from "next";
import AIGlossaryClient, { GLOSSARY_TERMS } from "./AIGlossaryClient";

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

// Reflects the visible breadcrumb: Home > AI Glossary.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "AI Glossary", item: "https://www.smartaiforwork.com/ai-glossary" },
  ],
};

// DefinedTermSet (not CollectionPage/ItemList): a glossary is a set of terms
// defined on this one page, not a list of separate detail pages — there's no
// per-term url to point to, so this is the schema.org type that actually
// matches the content instead of fabricating urls. Serialized from the same
// GLOSSARY_TERMS array the page renders.
const glossarySchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "AI Glossary",
  url: "https://www.smartaiforwork.com/ai-glossary",
  hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.def,
    inDefinedTermSet: "https://www.smartaiforwork.com/ai-glossary",
  })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />
      <AIGlossaryClient />
    </>
  );
}
