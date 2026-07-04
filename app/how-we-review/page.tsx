import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ClipboardList,
  DollarSign,
  RefreshCw,
  Scale,
  ShieldCheck,
  Star,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "How We Review AI Tools | SmartAI for Work",
  description:
    "Our editorial methodology: how SmartAI for Work tests, rates, and reviews AI tools for furniture, architecture, construction, and real estate professionals.",
  alternates: { canonical: "/how-we-review" },
  openGraph: {
    title: "How We Review AI Tools | SmartAI for Work",
    description:
      "Our editorial methodology: how we test, rate, and review AI tools.",
    url: "/how-we-review",
    type: "website",
  },
};

const CRITERIA = [
  {
    icon: Star,
    title: "AI Quality",
    desc: "How good the AI output actually is for real professional work — accuracy, realism, and consistency across repeated runs.",
  },
  {
    icon: ClipboardList,
    title: "Features & Depth",
    desc: "Whether the feature set covers a professional workflow end-to-end, or only handles the easy 20% of the job.",
  },
  {
    icon: CheckCircle2,
    title: "Ease of Use",
    desc: "Time from sign-up to first useful result, learning curve, and how much the interface gets out of your way.",
  },
  {
    icon: DollarSign,
    title: "Pricing & Value",
    desc: "What the tool costs at realistic usage levels, what the free tier really includes, and how pricing scales with a team.",
  },
  {
    icon: ShieldCheck,
    title: "Support & Reliability",
    desc: "Documentation quality, response times, uptime, and how the company handles data privacy.",
  },
];

export default function HowWeReviewPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#1E293B] font-medium">How We Review</span>
          </nav>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            How We Review AI Tools
          </h1>
          <p className="text-gray-600 mt-4 leading-relaxed">
            SmartAI for Work is an independent directory of AI tools for
            furniture, architecture, construction, interior design, and real
            estate professionals. Every review on this site follows the same
            editorial process, and our ratings are never for sale.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-3">Our process</h2>
          <ol className="space-y-4 text-gray-600 leading-relaxed list-none">
            <li className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center">1</span>
              <span>
                <strong className="text-[#1E293B]">Hands-on research.</strong>{" "}
                We sign up for the tool (trial or free tier where available),
                run it against tasks a real professional in the target industry
                would do, and review official documentation, changelogs, and
                verified user feedback.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center">2</span>
              <span>
                <strong className="text-[#1E293B]">Scoring.</strong> Each tool
                is rated 0–10 overall, built from the five criteria below. We
                compare it directly against its closest alternatives, not
                against a generic ideal.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center">3</span>
              <span>
                <strong className="text-[#1E293B]">Ongoing updates.</strong>{" "}
                AI tools change fast. Reviews carry a &ldquo;last
                updated&rdquo; date, and we revisit pricing, features, and
                ratings when a tool ships significant changes.
              </span>
            </li>
          </ol>

          <h2 className="text-2xl font-bold mt-10 mb-4">What we score</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CRITERIA.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="border border-gray-100 rounded-xl p-4 bg-white"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Icon size={16} className="text-blue-600" />
                  </div>
                  <p className="font-semibold text-sm">{title}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-3">
            Independence & affiliate links
          </h2>
          <div className="flex gap-3 text-gray-600 leading-relaxed">
            <Scale size={20} className="text-blue-600 shrink-0 mt-1" />
            <p>
              Some links on this site are affiliate links: if you buy through
              them, we may earn a commission at no extra cost to you. Affiliate
              partnerships never influence scores, rankings, or whether a tool
              gets covered — several of our highest-rated tools pay us nothing.
              See our{" "}
              <Link
                href="/affiliate-disclosure"
                className="text-blue-600 font-medium hover:underline"
              >
                affiliate disclosure
              </Link>{" "}
              for details.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-3">Corrections</h2>
          <div className="flex gap-3 text-gray-600 leading-relaxed">
            <RefreshCw size={20} className="text-blue-600 shrink-0 mt-1" />
            <p>
              Spotted outdated pricing or a factual error?{" "}
              <Link
                href="/contact"
                className="text-blue-600 font-medium hover:underline"
              >
                Contact us
              </Link>{" "}
              and we&apos;ll verify and update the review.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
