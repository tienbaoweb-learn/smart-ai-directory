import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found | SmartAI for Work",
  description:
    "The page you are looking for does not exist. Browse our AI tool reviews, industry hubs, and resources instead.",
  robots: { index: false, follow: true },
};

const DESTINATIONS = [
  {
    href: "/all-reviews",
    label: "All AI Tool Reviews",
    desc: "Every tool we have tested, scored, and compared.",
  },
  {
    href: "/industries",
    label: "Browse by Industry",
    desc: "Architecture, construction, real estate, interior design, furniture.",
  },
  {
    href: "/ai-tools",
    label: "Browse by Use Case",
    desc: "Design, marketing, automation, sales, productivity.",
  },
  {
    href: "/resources",
    label: "Guides & Resources",
    desc: "Guides, tutorials, workflows, comparisons, and case studies.",
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B] flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-bold tracking-widest uppercase text-[#F97316]">
              Error 404
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 leading-tight">
              We couldn&apos;t find that page
            </h1>
            <p className="text-gray-600 mt-4 leading-relaxed">
              The link may be outdated, or the tool review you are looking for has
              moved. Try one of the sections below — or start from the full review
              library.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 text-left">
              {DESTINATIONS.map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="border border-gray-100 rounded-xl p-5 bg-white hover:border-orange-200 hover:shadow-md transition-all group"
                >
                  <p className="font-semibold text-[#1E293B] group-hover:text-[#F97316] transition-colors">
                    {d.label}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{d.desc}</p>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/"
                className="inline-block bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Back to homepage
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
