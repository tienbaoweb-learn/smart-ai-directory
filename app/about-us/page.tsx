import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About SmartAI for Work | AI Tools Directory",
  description:
    "SmartAI for Work bridges the gap between AI innovation and industry professionals in furniture, architecture, construction, and real estate.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About SmartAI for Work | AI Tools Directory",
    description:
      "SmartAI for Work bridges the gap between AI innovation and industry professionals in furniture, architecture, construction, and real estate.",
    url: "/about-us",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      <main>
        {/* ── Section 1: Hero ── */}
        <section className="border-b border-gray-100 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">
              About SmartAIforWork
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Bridging the gap between AI innovation and industry professionals.
            </p>
          </div>
        </section>

        {/* ── Section 2: Who We Are ── */}
        <section className="py-12 sm:py-16 border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-5">Who We Are</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                SmartAIforWork is an independent research and consulting platform dedicated to helping professionals in Furniture, Architecture, Construction, and Real Estate navigate the rapidly evolving AI landscape.
              </p>
              <p>
                Our team combines backgrounds in AI research, enterprise software evaluation, and industry-specific consulting. We test, review, and curate AI tools through a rigorous methodology — assessing real-world applicability, integration complexity, ROI potential, and vendor credibility.
              </p>
              <p>
                We operate independently. We are not affiliated with any AI vendor. Our editorial process is funded through affiliate partnerships and consulting engagements, all of which are clearly disclosed.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 3: What We Do ── */}
        <section className="py-12 sm:py-16 border-b border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-8">What We Do</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔍",
                  title: "Independent AI Tool Reviews",
                  body: "We evaluate AI tools against real industry workflows — not marketing claims. Each review follows a standardized framework covering functionality, pricing, integrations, and limitations.",
                },
                {
                  icon: "🏗️",
                  title: "Industry-Specific Guidance",
                  body: "Generic AI advice rarely fits specialized industries. We translate AI capabilities into practical recommendations tailored to Furniture design, Architecture workflows, Construction management, and Real Estate operations.",
                },
                {
                  icon: "🤝",
                  title: "Trusted Affiliate Partnerships",
                  body: "When we recommend a tool, we may earn a commission at no extra cost to you. Every partnership is disclosed, and our editorial independence is never compromised.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="border border-gray-200 rounded-xl p-5 bg-white">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="font-semibold text-base text-[#1E293B] mt-3 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: Editorial Standards ── */}
        <section className="py-12 sm:py-16 border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Our Editorial Standards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Independence First",
                  body: "No vendor pays for editorial coverage or higher ratings.",
                },
                {
                  title: "Hands-On Testing",
                  body: "Every tool reviewed is tested by our team in relevant use cases.",
                },
                {
                  title: "Transparent Affiliates",
                  body: "Affiliate relationships are disclosed on every relevant page.",
                },
                {
                  title: "Regular Updates",
                  body: "Reviews are updated as tools evolve, ensuring accuracy over time.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="border border-gray-100 rounded-xl p-4 bg-white">
                  <p className="font-semibold text-sm text-[#1E293B]">{title}</p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 5: Why Trust Us ── */}
        <section className="py-12 sm:py-16 border-b border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-5">
              Why Professionals Trust SmartAIforWork
            </h2>
            <p className="text-gray-600 leading-relaxed">
              AI tool selection is a business decision — not a trend to chase. Our platform exists because professionals in architecture, construction, furniture, and real estate deserve research-grade insights, not influencer opinions. We bring the rigor of enterprise software evaluation to an audience that expects precision.
            </p>
          </div>
        </section>

        {/* ── Section 6: CTA ── */}
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-2">
              Have a question or partnership inquiry?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We welcome collaboration with AI vendors, industry associations, and professionals seeking guidance.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#F97316] hover:bg-orange-600 text-white font-semibold rounded-lg px-6 py-3 text-sm transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}
