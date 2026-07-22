import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { getAllTools } from "../../lib/tools";
import ToolsFilter from "./ToolsFilter";

export const metadata = {
  title: "AI Tool Reviews | SmartAIforWork",
  description:
    "Independent, hands-on reviews of AI tools for Furniture, Architecture, Construction, and Real Estate professionals.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "AI Tool Reviews | SmartAI for Work",
    description:
      "Independent, hands-on reviews of AI tools for Furniture, Architecture, Construction, and Real Estate professionals.",
    url: "/tools",
    type: "website",
  },
};

// No visible breadcrumb UI exists on this page — schema-only (per session
// scope, not adding visible breadcrumb UI here).
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "AI Tool Reviews", item: "https://www.smartaiforwork.com/tools" },
  ],
};

export default function ToolsIndexPage() {
  const tools = getAllTools();

  // Data-driven from the exact same list rendered on the page — never drifts.
  // Capped at 30 per the session's ItemList guidance (239 reviews total).
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Tool Reviews",
    url: "https://www.smartaiforwork.com/tools",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools.slice(0, 30).map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.frontmatter.toolName || t.frontmatter.title,
        url: `https://www.smartaiforwork.com/tools/${t.slug}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">AI Tool Reviews</h1>
          <p className="text-gray-600 mt-3 max-w-2xl leading-relaxed">
            Independent, hands-on reviews of AI tools for Furniture, Architecture, Construction, and Real Estate professionals.
          </p>
          <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-500">
            <span>✓ {tools.length} reviews published</span>
            <span>✓ No sponsored rankings</span>
            <span>✓ Tested by our team</span>
          </div>
        </div>
      </section>

      {/* ── Tools grid + filter ── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolsFilter tools={tools} />
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
