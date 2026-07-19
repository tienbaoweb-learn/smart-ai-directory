import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Calendar, Clock, Globe, Quote } from "lucide-react";

import Navbar from "../../../components/Navbar";
import Newsletter from "../../../components/Newsletter";
import Footer from "../../../components/Footer";
import { caseStudies, type CaseStudyContentBlock } from "../../../../lib/case-studies-content";
import { tagsData } from "../../../../lib/tags-data";
import { getToolBySlug } from "../../../../lib/tools";

// ── Tag → destination resolver ────────────────────────────────────────────────
// Case-study tags are free-form editorial phrases. Link the ones that map to a
// live hub (industry pages, tag pages); the rest render as plain gray chips so
// we never ship fake or dead links.
const TAG_SLUGS = new Set(tagsData.map((t) => t.slug));

const TAG_DESTINATIONS: Record<string, string> = {
  "ai tools for furniture": "/industries/furniture",
  "ai tools for architects": "/industries/architecture",
  "ai tools for construction": "/industries/construction",
  "ai tools for interior design": "/industries/interior-design",
  "ai tools for real estate": "/industries/real-estate",
  "ai product photography": "/tags/ai-image-generation",
  "ai rendering software": "/tags/ai-image-generation",
  "room staging ai": "/tags/ai-image-generation",
  "virtual staging ai": "/tags/ai-image-generation",
  "ai room visualization": "/tags/ai-image-generation",
  "architecture visualization": "/tags/ai-image-generation",
  "furniture copywriting": "/tags/ai-writing",
  "real estate marketing automation": "/tags/automation",
};

function resolveTagHref(tag: string): string | null {
  const key = tag.toLowerCase();
  if (TAG_DESTINATIONS[key]) return TAG_DESTINATIONS[key];
  const slug = key.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return TAG_SLUGS.has(slug) ? `/tags/${slug}` : null;
}

function TagChip({ tag }: { tag: string }) {
  const href = resolveTagHref(tag);
  return href ? (
    <Link
      href={href}
      className="text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-2.5 py-1 hover:bg-blue-100 transition-colors"
    >
      #{tag}
    </Link>
  ) : (
    <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-1">
      {tag}
    </span>
  );
}

// ── generateStaticParams + generateMetadata ────────────────────────────────────

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: `${cs.title} | SmartAIforWork`,
    description: cs.excerpt,
    alternates: { canonical: `/resources/case-studies/${slug}` },
    openGraph: {
      title: cs.title,
      description: cs.excerpt,
      type: "article",
      url: `https://www.smartaiforwork.com/resources/case-studies/${slug}`,
      images: [{ url: cs.thumbnail }],
    },
  };
}

// ── Content block renderer ──────────────────────────────────────────────────────

function ContentBlock({ block }: { block: CaseStudyContentBlock }) {
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

    case "quote":
      return (
        <blockquote className="border-l-4 border-orange-500 bg-orange-50/50 rounded-r-lg pl-5 pr-4 py-4 my-6">
          <Quote size={16} className="text-orange-500 mb-2" />
          <p className="text-[#1E293B] font-medium leading-relaxed">
            {block.text}
          </p>
        </blockquote>
      );

    case "stat-table":
      return (
        <div className="my-6 overflow-x-auto border border-gray-100 rounded-xl">
          <table className="min-w-[480px] w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">
                  Metric
                </th>
                <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">
                  Before
                </th>
                <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">
                  After
                </th>
              </tr>
            </thead>
            <tbody>
              {(block.rows ?? []).map((row) => (
                <tr key={row.label} className="border-t border-gray-100">
                  <td className="py-3 px-4 text-[#1E293B] font-medium">
                    {row.label}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{row.before}</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold">
                    {row.after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "cta":
      return (
        <div className="my-8 rounded-xl p-6 bg-gradient-to-r from-blue-600 to-orange-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold">{block.ctaText}</p>
          <Link
            href={block.ctaLink ?? "#"}
            className="bg-white text-[#1E293B] rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors shrink-0"
          >
            Explore Tools →
          </Link>
        </div>
      );

    default:
      return null;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  // Reviewed tools featured in this story — internal review link + affiliate CTA
  const recommendedTools = (cs.recommendedTools ?? [])
    .map(({ slug: toolSlug, note }) => {
      const tool = getToolBySlug(toolSlug);
      if (!tool) return null;
      const f = tool.frontmatter;
      return {
        slug: toolSlug,
        note,
        name: f.toolName || f.title.split(":")[0].trim(),
        rating: f.rating,
        affiliateHref: f.affiliateLink || f.websiteUrl || "",
      };
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.smartaiforwork.com/resources" },
      { "@type": "ListItem", position: 3, name: "Case Studies", item: "https://www.smartaiforwork.com/resources/case-studies" },
      { "@type": "ListItem", position: 4, name: cs.title, item: `https://www.smartaiforwork.com/resources/case-studies/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
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
            <Link href="/resources/case-studies" className="hover:text-blue-600 transition-colors">
              Case Studies
            </Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium line-clamp-1">{cs.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero image (with category + title overlaid) ── */}
      {cs.heroImage && (
        <div className="relative w-full h-56 sm:h-80 lg:h-[420px]">
          <Image
            src={cs.heroImage}
            alt={cs.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-10">
              <span className="inline-block bg-orange-500 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                {cs.industry}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-md">
                {cs.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* ── Title (fallback when no hero) + meta ── */}
      <section className="py-8 sm:py-10 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!cs.heroImage && (
            <>
              <span className="inline-block bg-orange-50 text-orange-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                {cs.industry}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] leading-tight">
                {cs.title}
              </h1>
            </>
          )}

          <p className="text-gray-600 mt-3 leading-relaxed">{cs.excerpt}</p>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
              <Briefcase size={13} className="shrink-0" />
              {cs.businessSize}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
              <Globe size={13} className="shrink-0" />
              {cs.market}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
              <Clock size={13} className="shrink-0" />
              {cs.timeFrame}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
              <Calendar size={13} className="shrink-0" />
              {cs.readingTime} read
            </span>
          </div>

          {/* Tags — linked when they map to a live industry/tag hub */}
          <div className="flex flex-wrap gap-2 mt-4">
            {cs.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <section className="py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {cs.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}

          {/* Tools used in this case study — review link + affiliate CTA */}
          {recommendedTools.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold text-[#1E293B] mb-1">
                Tools Used in This Case Study
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                The reviewed tools behind the results above — read our full
                review or try them yourself.
              </p>

              <ul className="space-y-3">
                {recommendedTools.map((tool) => (
                  <li
                    key={tool.slug}
                    className="border border-gray-100 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="text-sm font-semibold text-[#1E293B] hover:text-blue-600 transition-colors"
                        >
                          {tool.name}
                        </Link>
                        <span className="text-xs font-semibold text-amber-500">
                          ★ {tool.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                        {tool.note}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-blue-600 text-sm font-medium hover:underline whitespace-nowrap"
                      >
                        Read review
                      </Link>
                      {tool.affiliateHref && (
                        <a
                          href={tool.affiliateHref}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors whitespace-nowrap"
                        >
                          Visit site →
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-400 mt-3">
                Some links above are affiliate links — we may earn a commission
                at no extra cost to you. See our{" "}
                <Link
                  href="/affiliate-disclosure"
                  className="underline hover:text-gray-600"
                >
                  affiliate disclosure
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
