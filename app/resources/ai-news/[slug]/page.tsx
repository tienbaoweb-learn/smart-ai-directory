import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

import Navbar from "../../../components/Navbar";
import Newsletter from "../../../components/Newsletter";
import Footer from "../../../components/Footer";
import {
  aiNewsPosts,
  industryColor,
  NEWS_TYPE_LABEL,
  type QuickHitItem,
} from "../../../../lib/ai-news-data";
import { guidesData } from "../../../../lib/guides-data";
import { tagsData } from "../../../../lib/tags-data";
import { getToolBySlug } from "../../../../lib/tools";

// ── Tag → destination resolver ────────────────────────────────────────────────
// News tags are free-form editorial phrases. Link the ones that map to a live
// hub (industry pages, tag pages, the news hub); everything else renders as
// plain text so we never ship fake or dead links.
const TAG_SLUGS = new Set(tagsData.map((t) => t.slug));

const TAG_DESTINATIONS: Record<string, string> = {
  construction: "/industries/construction",
  architecture: "/industries/architecture",
  "real estate": "/industries/real-estate",
  "real estate ai": "/industries/real-estate",
  "commercial real estate": "/industries/real-estate",
  proptech: "/industries/real-estate",
  "interior design": "/industries/interior-design",
  furniture: "/industries/furniture",
  homebuilding: "/industries/construction",
  "agentic ai": "/tags/ai-agents",
  agentic: "/tags/ai-agents",
  "image ai": "/tags/ai-image-generation",
  rendering: "/tags/ai-image-generation",
  "ai news": "/resources/ai-news",
  "weekly roundup": "/resources/ai-news",
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
  return aiNewsPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = aiNewsPosts.find((p) => p.slug === slug);
  if (!post) return { title: "AI News Not Found" };
  return {
    title: `${post.title} | SmartAIforWork`,
    description: post.excerpt,
    alternates: { canonical: `/resources/ai-news/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://www.smartaiforwork.com/resources/ai-news/${slug}`,
      ...(post.thumbnail ? { images: [{ url: post.thumbnail }] } : {}),
    },
  };
}

// ── Quick Hit item ──────────────────────────────────────────────────────────────

function QuickHit({ item }: { item: QuickHitItem }) {
  const color = industryColor(item.industry);
  return (
    <article className="border border-gray-100 rounded-xl p-5 sm:p-6 bg-white">
      <span
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1"
        style={{ backgroundColor: `${color}1a`, color }}
      >
        <span aria-hidden>{item.emoji}</span>
        {item.industry}
      </span>

      <h3 className="text-lg font-bold text-[#1E293B] mt-3 leading-snug">
        {item.title}
      </h3>

      <div className="mt-2 space-y-3">
        {item.body.split(/\n\n+/).map((para, j) => (
          <p key={j} className="text-gray-600 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {item.whyItMatters && (
        <p className="text-gray-700 leading-relaxed mt-3 border-l-2 border-orange-400 pl-3">
          <span className="font-semibold text-[#1E293B]">Why it matters for you: </span>
          {item.whyItMatters}
        </p>
      )}

      {item.relatedLink && (
        <p className="mt-3">
          <Link
            href={item.relatedLink.href}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            {item.relatedLink.label} →
          </Link>
        </p>
      )}

      {item.source && (
        <p className="text-xs text-gray-400 italic mt-3">
          Source:{" "}
          {item.sourceUrl ? (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              {item.source}
            </a>
          ) : (
            item.source
          )}
        </p>
      )}

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {item.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}

// ── In-article image ─────────────────────────────────────────────────────────────

function InArticleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="my-2">
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-gray-100">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </figure>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AINewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = aiNewsPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const typeLabel = NEWS_TYPE_LABEL[post.newsType];
  const images = post.inArticleImages ?? [];

  // Related guides — ưu tiên danh sách riêng của bài, fallback về bộ mặc định
  const relatedSlugs =
    post.relatedGuides ??
    ["construction-ai-tools", "real-estate-ai-tools", "architecture-ai-tools"];
  const related = relatedSlugs
    .map((s) => guidesData.find((g) => g.slug === s))
    .filter((g): g is (typeof guidesData)[number] => Boolean(g));

  // Tool liên quan — internal link tới bài review + affiliate CTA (rel="sponsored")
  const recommendedTools = (post.recommendedTools ?? [])
    .map(({ slug: toolSlug, note }) => {
      const tool = getToolBySlug(toolSlug);
      if (!tool) return null;
      const f = tool.frontmatter;
      return {
        slug: toolSlug,
        note,
        name: f.toolName || f.title.split(":")[0].trim(),
        affiliateHref: f.affiliateLink || f.websiteUrl || "",
        // Chỉ true khi có affiliate link thật — dòng disclosure bên dưới chỉ
        // hiển thị khi ít nhất một tool thực sự là affiliate.
        isAffiliate: Boolean(f.affiliateLink),
      };
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  const hasAffiliateTool = recommendedTools.some((t) => t.isAffiliate);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.smartaiforwork.com/resources" },
      { "@type": "ListItem", position: 3, name: "AI News", item: "https://www.smartaiforwork.com/resources/ai-news" },
      { "@type": "ListItem", position: 4, name: post.title, item: `https://www.smartaiforwork.com/resources/ai-news/${slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: `https://www.smartaiforwork.com${post.thumbnail}`,
    datePublished: post.publishedDate,
    author: { "@type": "Organization", name: "SmartAI for Work" },
    publisher: { "@type": "Organization", name: "SmartAI for Work" },
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/resources/ai-news" className="hover:text-blue-600 transition-colors">AI News</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero (shared heroImage as full-width background + overlay text) ── */}
      <section className="relative w-full h-72 sm:h-96 lg:h-[460px]">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
            <span className="inline-block bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {typeLabel}
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} className="shrink-0" />
                {post.publishedDate}
              </span>
              {post.weekOf && (
                <span className="inline-flex items-center gap-1.5">
                  Week of {post.weekOf}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="shrink-0" />
                {post.readingTime} read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <section className="py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.content.map((block, i) => {
            switch (block.type) {
              case "editor-pick":
                return (
                  <div
                    key={i}
                    className="rounded-xl border-l-4 border-orange-500 bg-orange-50/60 px-5 sm:px-6 py-6 mb-10"
                  >
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600">
                      Editor&apos;s Pick
                    </span>
                    {block.heading && (
                      <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] mt-2 leading-snug">
                        {block.heading}
                      </h2>
                    )}
                    <div className="mt-3 space-y-4">
                      {(block.paragraphs ?? []).map((p, j) => (
                        <p key={j} className="text-gray-700 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                );

              case "quick-hits": {
                const items = block.items ?? [];
                // Rải ảnh minh hoạ đều theo số story: với 5 story ra đúng vị trí
                // cũ (sau story #2 và #4); với 3 story là sau #2 và #3.
                const firstImageAfter = Math.floor(items.length / 3);
                const secondImageAfter = Math.floor((items.length * 2) / 3);
                return (
                  <div key={i} className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1E293B] mb-5">{block.heading ?? "Quick Hits"}</h2>
                    <div className="space-y-6">
                      {items.map((item, idx) => (
                        <div key={item.title}>
                          <QuickHit item={item} />
                          {idx === firstImageAfter && images[0] && (
                            <InArticleImage src={images[0]} alt={`${post.title} — illustration 1`} />
                          )}
                          {idx === secondImageAfter && images[1] && (
                            <InArticleImage src={images[1]} alt={`${post.title} — illustration 2`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              case "what-to-watch":
                return (
                  <div
                    key={i}
                    className="rounded-xl bg-[#1E293B] text-white px-5 sm:px-6 py-6 mb-10"
                  >
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-400">
                      {block.heading ?? "What to Watch"}
                    </span>
                    {block.leadIn && (
                      <p className="text-lg font-semibold mt-2 leading-snug">{block.leadIn}</p>
                    )}
                    <div className="mt-3 space-y-4">
                      {(block.paragraphs ?? []).map((p, j) => (
                        <p key={j} className="text-white/80 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                );

              case "disclaimer":
                return (
                  <p
                    key={i}
                    className="text-sm text-gray-400 italic leading-relaxed mt-8 pt-6 border-t border-gray-100"
                  >
                    {block.text}
                  </p>
                );

              case "table": {
                const columns = block.columns ?? [];
                const rows = block.rows ?? [];
                if (columns.length === 0 || rows.length === 0) return null;
                return (
                  <div key={i} className="mb-10">
                    {block.heading && (
                      <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
                        {block.heading}
                      </h2>
                    )}
                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                      <table className="min-w-[640px] w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-100">
                            {columns.map((col) => (
                              <th
                                key={col}
                                className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, r) => (
                            <tr key={r} className="border-t border-gray-100">
                              {row.map((cell, c) => (
                                <td
                                  key={c}
                                  className={
                                    c === 0
                                      ? "py-3 px-4 text-[#1E293B] font-medium whitespace-nowrap"
                                      : "py-3 px-4 text-gray-500"
                                  }
                                >
                                  {cell}
                                </td>
                              ))}
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
              }

              case "bullet-list": {
                const bullets = block.bullets ?? [];
                if (bullets.length === 0) return null;
                return (
                  <div key={i} className="mb-10">
                    {block.heading && (
                      <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
                        {block.heading}
                      </h2>
                    )}
                    <ul className="space-y-3">
                      {bullets.map((b, j) => (
                        <li
                          key={j}
                          className="border-l-2 border-gray-200 pl-4 text-gray-600 leading-relaxed"
                        >
                          {b.title && (
                            <span className="font-semibold text-[#1E293B]">
                              {b.title}
                              {" — "}
                            </span>
                          )}
                          {b.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              case "heading":
                return (
                  <h2 key={i} className="text-2xl font-bold text-[#1E293B] mt-8 mb-3">
                    {block.text}
                  </h2>
                );

              case "paragraph":
                return (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">
                    {block.text}
                  </p>
                );

              default:
                return null;
            }
          })}

          {/* Tags — linked when they map to a live industry/tag hub */}
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>

          {/* Next roundup */}
          {post.nextRoundup && (
            <div className="mt-8 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
              <Calendar size={15} className="shrink-0 text-orange-500" />
              <span>
                <span className="font-semibold text-[#1E293B]">Next roundup:</span>{" "}
                {post.nextRoundup}
              </span>
            </div>
          )}

          {/* Tools liên quan — internal review link + affiliate CTA */}
          {recommendedTools.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold text-[#1E293B] mb-1">
                Tools Worth Evaluating
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Picked by our editors as relevant to the themes above — not mentioned in, or
                affiliated with, the reporting we covered.
              </p>

              <ul className="space-y-3">
                {recommendedTools.map((tool) => (
                  <li
                    key={tool.slug}
                    className="border border-gray-100 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3"
                  >
                    <div className="flex-1">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-sm font-semibold text-[#1E293B] hover:text-blue-600 transition-colors"
                      >
                        {tool.name}
                      </Link>
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
                {hasAffiliateTool ? (
                  <>
                    Some links above are affiliate links — we may earn a commission at no
                    extra cost to you. See our{" "}
                    <Link href="/affiliate-disclosure" className="underline hover:text-gray-600">
                      affiliate disclosure
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    We don&apos;t earn a commission on the links above. See our{" "}
                    <Link href="/affiliate-disclosure" className="underline hover:text-gray-600">
                      affiliate disclosure
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
          )}

          {/* Related guides */}
          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold text-[#1E293B] mb-4">Related Guides</h2>
              <ul className="space-y-3">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={g.href}
                      className="group flex items-center justify-between gap-3 border border-gray-100 rounded-xl px-4 py-3 hover:shadow-md transition-shadow"
                    >
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wide text-orange-600">
                          {g.category}
                        </span>
                        <span className="block text-sm font-medium text-[#1E293B] mt-0.5 group-hover:text-blue-600 transition-colors">
                          {g.title}
                        </span>
                      </span>
                      <ArrowRight size={16} className="shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Explore next — hub / best-of / alternatives liên quan */}
          {(post.exploreNext ?? []).length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-[#1E293B] mb-4">Explore Next</h2>
              <div className="flex flex-wrap gap-2">
                {(post.exploreNext ?? []).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 border border-gray-200 rounded-full px-4 py-2 text-sm text-[#1E293B] hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                    <ArrowRight size={14} className="shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sources */}
          {(post.sources ?? []).length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h2 className="text-base font-bold text-[#1E293B] mb-3">Sources</h2>
              <ul className="space-y-1.5">
                {(post.sources ?? []).map((s) => (
                  <li key={s.url} className="text-sm text-gray-500 leading-relaxed">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <Newsletter
        heading="Get Weekly AI News in Your Inbox"
        subtitle="Join 10,000+ professionals who get the most important AI updates for architecture, construction, real estate, and design every week."
      />
      <Footer />
    </div>
  );
}
