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

export default function ToolsIndexPage() {
  const tools = getAllTools();

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
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
