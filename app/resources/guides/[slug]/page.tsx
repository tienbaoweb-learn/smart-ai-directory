import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Briefcase, Calendar, Clock } from "lucide-react";

import Navbar from "../../../components/Navbar";
import Newsletter from "../../../components/Newsletter";
import Footer from "../../../components/Footer";
import { guidesContent, type GuideContentBlock } from "../../../../lib/guides-content";

// ── generateStaticParams + generateMetadata ────────────────────────────────────

export async function generateStaticParams() {
  return guidesContent.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesContent.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: `${guide.title} | SmartAIforWork`,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      url: `https://smartaiforwork.com/resources/guides/${slug}`,
      ...(guide.thumbnail ? { images: [{ url: guide.thumbnail }] } : {}),
    },
  };
}

// ── Content block renderer ──────────────────────────────────────────────────────

function ContentBlock({ block }: { block: GuideContentBlock }) {
  switch (block.type) {
    case "heading": {
      const Tag = block.level === 3 ? "h3" : "h2";
      return (
        <Tag
          className={
            block.level === 3
              ? "text-lg font-bold text-[#1E293B] mt-6 mb-2"
              : "text-2xl font-bold text-[#1E293B] mt-8 mb-3"
          }
        >
          {block.text}
        </Tag>
      );
    }

    case "paragraph":
      return <p className="text-gray-600 leading-relaxed mb-4">{block.text}</p>;

    case "comparison-table":
      return (
        <div className="my-6">
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="min-w-[640px] w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Tool</th>
                  <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Category</th>
                  <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Best For</th>
                  <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                {(block.rows ?? []).map((row) => (
                  <tr key={row.tool} className="border-t border-gray-100">
                    <td className="py-3 px-4 text-[#1E293B] font-medium whitespace-nowrap">{row.tool}</td>
                    <td className="py-3 px-4 text-gray-500">{row.category}</td>
                    <td className="py-3 px-4 text-gray-500">{row.bestFor}</td>
                    <td className="py-3 px-4 text-gray-500">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && (
            <p className="text-xs text-gray-400 mt-2 italic">{block.note}</p>
          )}
        </div>
      );

    case "faq":
      return (
        <div className="my-6 space-y-4">
          {(block.items ?? []).map((item) => (
            <div key={item.question} className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-[#1E293B] mb-1.5">{item.question}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      );

    case "disclaimer":
      return (
        <p className="text-sm text-gray-400 italic leading-relaxed mt-8 pt-6 border-t border-gray-100">
          {block.text}
        </p>
      );

    default:
      return null;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guidesContent.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/resources" className="hover:text-blue-600 transition-colors">
              Resources
            </Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/resources/guides" className="hover:text-blue-600 transition-colors">
              Guides
            </Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium line-clamp-1">{guide.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Title + meta ── */}
      <section className="py-8 sm:py-10 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-orange-50 text-orange-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            {guide.industry}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] leading-tight">
            {guide.title}
          </h1>

          <p className="text-gray-600 mt-3 leading-relaxed">{guide.excerpt}</p>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
              <Briefcase size={13} className="shrink-0" />
              {guide.bestFor}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
              <Clock size={13} className="shrink-0" />
              {guide.readingTime} read
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
              <Calendar size={13} className="shrink-0" />
              {guide.publishedDate}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {guide.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-blue-600 bg-blue-50 rounded-full px-2.5 py-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <section className="py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {guide.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
