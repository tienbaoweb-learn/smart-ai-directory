import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Calendar, Clock } from "lucide-react";

import Navbar from "../../../components/Navbar";
import Newsletter from "../../../components/Newsletter";
import Footer from "../../../components/Footer";
import { guidesContent, type GuideContentBlock } from "../../../../lib/guides-content";
import { tagsData } from "../../../../lib/tags-data";

const TAG_SLUGS = new Set(tagsData.map((t) => t.slug));
import {
  getToolBySlug,
  getBestOfTools,
  type IndustrySlug,
} from "../../../../lib/tools";

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
    alternates: { canonical: `/resources/guides/${slug}` },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      url: `https://www.smartaiforwork.com/resources/guides/${slug}`,
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

    case "image":
      return (
        <figure className="my-6">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-gray-100">
            <Image
              src={block.src ?? ""}
              alt={block.alt ?? ""}
              fill
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-xs text-gray-400 text-center mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

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
                    <td className="py-3 px-4 text-[#1E293B] font-medium whitespace-nowrap">
                      {row.slug ? (
                        <Link
                          href={`/tools/${row.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          {row.tool}
                        </Link>
                      ) : (
                        row.tool
                      )}
                    </td>
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

    case "related-reviews": {
      // Prefer an industry (auto-resolves all current + future Best Of reviews,
      // so the block never goes stale); otherwise fall back to explicit slugs.
      const reviews = block.industry
        ? getBestOfTools(block.industry as IndustrySlug)
        : (block.reviews ?? [])
            .map((slug) => getToolBySlug(slug))
            .filter((t): t is NonNullable<typeof t> => t !== null);
      if (reviews.length === 0) return null;
      return (
        <div className="my-8">
          {block.text && (
            <h2 className="text-2xl font-bold text-[#1E293B] mt-8 mb-3">
              {block.text}
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((t) => {
              const name =
                t.frontmatter.toolName ||
                t.frontmatter.title.split(":")[0].trim();
              return (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className="group border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all block"
                >
                  <p className="font-semibold text-sm text-[#1E293B] group-hover:text-blue-600">
                    {name} Review
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-snug">
                    {t.frontmatter.excerpt}
                  </p>
                  <span className="inline-block text-blue-600 text-xs font-medium mt-2 group-hover:underline">
                    Read full review →
                  </span>
                </Link>
              );
            })}
          </div>
          {block.note && (
            <p className="text-xs text-gray-400 mt-2 italic">{block.note}</p>
          )}
        </div>
      );
    }

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

  const faqItems = guide.content.flatMap((block) =>
    block.type === "faq" ? block.items ?? [] : []
  );
  const faqSchema = faqItems.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.smartaiforwork.com/resources" },
      { "@type": "ListItem", position: 3, name: "Guides", item: "https://www.smartaiforwork.com/resources/guides" },
      { "@type": "ListItem", position: 4, name: guide.title, item: `https://www.smartaiforwork.com/resources/guides/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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

      {/* ── Hero image (with category + title overlaid) ── */}
      {guide.heroImage && (
        <div className="relative w-full h-56 sm:h-80 lg:h-[420px]">
          <Image
            src={guide.heroImage}
            alt={guide.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-10">
              <span className="inline-block bg-orange-500 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                {guide.industry}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-md">
                {guide.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* ── Title (fallback when no hero) + meta ── */}
      <section className="py-8 sm:py-10 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!guide.heroImage && (
            <>
              <span className="inline-block bg-orange-50 text-orange-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                {guide.industry}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] leading-tight">
                {guide.title}
              </h1>
            </>
          )}

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

          {/* Tags — link to the tag hub when a matching tag page exists */}
          <div className="flex flex-wrap gap-2 mt-4">
            {guide.tags.map((tag) =>
              TAG_SLUGS.has(tag) ? (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="text-xs text-blue-600 bg-blue-50 rounded-full px-2.5 py-1 hover:bg-blue-100 transition-colors"
                >
                  #{tag}
                </Link>
              ) : (
                <span
                  key={tag}
                  className="text-xs text-blue-600 bg-blue-50 rounded-full px-2.5 py-1"
                >
                  #{tag}
                </span>
              ),
            )}
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
