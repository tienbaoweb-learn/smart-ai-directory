import type { Metadata } from "next";
import Link from "next/link";
import { Hash, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { tagsData } from "@/lib/tags-data";

export const metadata: Metadata = {
  title: "Browse AI Topics & Tags | SmartAI for Work",
  description:
    "Explore AI tools, guides, tutorials, comparisons, and workflows by topic — from AI agents and prompt engineering to automation and no-code.",
  alternates: { canonical: "/tags" },
  openGraph: {
    title: "Browse AI Topics & Tags | SmartAI for Work",
    description:
      "Explore AI tools, guides, tutorials, comparisons, and workflows by topic.",
    url: "/tags",
    type: "website",
  },
};

export default function TagsIndexPage() {
  const trending = tagsData.filter((t) => t.isTrending);
  const others = tagsData.filter((t) => !t.isTrending);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Tags</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Hash className="w-5 h-5 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Browse by Topic</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Every guide, tutorial, comparison, and workflow on SmartAI for Work,
            organised by topic. Pick a tag to see everything we&apos;ve published
            about it.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Trending */}
        {trending.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-900">Trending Topics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trending.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-orange-200 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-orange-500 shrink-0" />
                    <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {tag.name}
                    </p>
                    <span className="bg-orange-100 text-orange-600 text-[10px] font-semibold px-2 py-0.5 rounded-full ml-auto shrink-0">
                      Trending
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {tag.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All other topics */}
        {others.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">All Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-orange-200 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors shrink-0" />
                    <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {tag.name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {tag.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
