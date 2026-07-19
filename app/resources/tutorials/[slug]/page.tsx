import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Calendar, Clock, GraduationCap } from "lucide-react";

import Navbar from "../../../components/Navbar";
import Newsletter from "../../../components/Newsletter";
import Footer from "../../../components/Footer";
import PromptCodeBlock from "../../../components/PromptCodeBlock";
import {
  tutorialsContent,
  type TutorialContentBlock,
} from "../../../../lib/tutorials-content";
import { guidesData } from "../../../../lib/guides-data";
import { tutorialsData } from "../../../../lib/tutorials-data";
import { tagsData } from "../../../../lib/tags-data";
import { getToolBySlug } from "../../../../lib/tools";

// ── Niche pill colors (brand palette per industry) ─────────────────────────────

const NICHE_PILL: Record<string, string> = {
  Architecture: "bg-[#2d5cf3] text-white",
  Construction: "bg-[#6484A4] text-white",
  "Real Estate": "bg-[#8c21f1] text-white",
  "Interior Design": "bg-[#35966a] text-white",
  Furniture: "bg-[#F97316] text-white",
};
const DEFAULT_NICHE_PILL = "bg-[#F97316] text-white";

// Niche pills double as internal links to the matching industry hub.
const NICHE_HREF: Record<string, string> = {
  Architecture: "/industries/architecture",
  Construction: "/industries/construction",
  "Real Estate": "/industries/real-estate",
  "Interior Design": "/industries/interior-design",
  Furniture: "/industries/furniture",
};

// ── Tag → destination resolver ────────────────────────────────────────────────
// Tutorial tags are free-form editorial phrases. Link the ones that map to a
// live hub (industry pages, tag pages); the rest render as plain gray chips so
// we never ship fake or dead links.
const TAG_SLUGS = new Set(tagsData.map((t) => t.slug));

const TAG_DESTINATIONS: Record<string, string> = {
  "chatgpt prompts": "/tags/chatgpt",
  "chatgpt construction": "/tags/chatgpt",
  "claude prompts": "/tags/prompt-engineering",
  "ai for architects": "/industries/architecture",
  "ai for construction": "/industries/construction",
  "ai construction estimating": "/industries/construction",
  "construction documentation": "/industries/construction",
  "ai for contractors": "/industries/construction",
  "real estate ai writing": "/tags/ai-writing",
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

// ── Heading anchors for the table of contents ─────────────────────────────────

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ── generateStaticParams + generateMetadata ────────────────────────────────────

export async function generateStaticParams() {
  return tutorialsContent.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = tutorialsContent.find((t) => t.slug === slug);
  if (!tutorial) return { title: "Tutorial Not Found" };
  return {
    title: `${tutorial.title} | SmartAIforWork`,
    description: tutorial.excerpt,
    alternates: { canonical: `/resources/tutorials/${slug}` },
    openGraph: {
      title: tutorial.title,
      description: tutorial.excerpt,
      type: "article",
      url: `https://www.smartaiforwork.com/resources/tutorials/${slug}`,
      ...(tutorial.thumbnail ? { images: [{ url: tutorial.thumbnail }] } : {}),
    },
  };
}

// ── Content block renderer ──────────────────────────────────────────────────────

function ContentBlock({ block }: { block: TutorialContentBlock }) {
  switch (block.type) {
    case "heading": {
      if (block.level === 3) {
        return (
          <h3 className="text-lg font-bold text-[#1E293B] mt-6 mb-2">
            {block.text}
          </h3>
        );
      }
      return (
        <h2
          id={slugifyHeading(block.text ?? "")}
          className="text-2xl font-bold text-[#1E293B] mt-10 mb-3 scroll-mt-24"
        >
          {block.text}
        </h2>
      );
    }

    case "paragraph":
      return <p className="text-gray-600 leading-relaxed mb-4">{block.text}</p>;

    case "code-block":
      return <PromptCodeBlock code={block.code ?? ""} />;

    case "callout":
      if (block.variant === "warning") {
        return (
          <div className="my-6 flex gap-3 border-l-4 border-orange-500 bg-orange-50 rounded-r-xl p-4">
            <AlertTriangle size={18} className="text-orange-500 shrink-0 mt-0.5" />
            <p className="text-sm text-orange-900 leading-relaxed">{block.text}</p>
          </div>
        );
      }
      return (
        <div className="my-6 border-l-4 border-sky-500 bg-sky-50 rounded-r-xl p-4">
          <p className="text-sm text-sky-900 leading-relaxed">{block.text}</p>
        </div>
      );

    case "bullet-list": {
      const isWarning = block.variant === "warning";
      const wrapper = isWarning
        ? "my-6 border border-orange-200 bg-orange-50/60 rounded-xl p-5"
        : block.variant === "info"
          ? "my-6 border border-sky-200 bg-sky-50/60 rounded-xl p-5"
          : "my-6";
      return (
        <div className={wrapper}>
          {block.title && (
            <p
              className={`font-semibold mb-2.5 flex items-center gap-2 ${
                isWarning ? "text-orange-800" : "text-[#1E293B]"
              }`}
            >
              {isWarning && (
                <AlertTriangle size={16} className="text-orange-500 shrink-0" />
              )}
              {block.title}
            </p>
          )}
          <ul className="space-y-2">
            {(block.items ?? []).map((item) => (
              <li key={item} className="flex gap-2.5 text-gray-600 leading-relaxed">
                <span
                  className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
                    isWarning ? "bg-orange-400" : "bg-sky-400"
                  }`}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "faq":
      return (
        <div className="my-6 space-y-4">
          {(block.faqItems ?? []).map((item) => (
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

export default async function TutorialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = tutorialsContent.find((t) => t.slug === slug);
  if (!tutorial) notFound();

  const tocItems = tutorial.content
    .filter((b) => b.type === "heading" && b.level === 2 && b.text)
    .map((b) => ({ id: slugifyHeading(b.text!), label: b.text! }));

  const relatedGuide = tutorial.relatedGuideSlug
    ? guidesData.find((g) => g.slug === tutorial.relatedGuideSlug)
    : undefined;

  // The reviewed tool this tutorial is built around (from tutorialsData.toolSlug)
  // — rendered as an internal review link + affiliate CTA below the article.
  const toolSlug = tutorialsData.find((t) => t.slug === slug)?.toolSlug;
  const tutorialTool = (() => {
    if (!toolSlug) return null;
    const tool = getToolBySlug(toolSlug);
    if (!tool) return null;
    const f = tool.frontmatter;
    return {
      slug: toolSlug,
      name: f.toolName || f.title.split(":")[0].trim(),
      rating: f.rating,
      excerpt: f.excerpt,
      affiliateHref: f.affiliateLink || f.websiteUrl || "",
    };
  })();

  const faqItems = tutorial.content.flatMap((block) =>
    block.type === "faq" ? block.faqItems ?? [] : []
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
      { "@type": "ListItem", position: 3, name: "Tutorials", item: "https://www.smartaiforwork.com/resources/tutorials" },
      { "@type": "ListItem", position: 4, name: tutorial.title, item: `https://www.smartaiforwork.com/resources/tutorials/${slug}` },
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
            <Link href="/resources/tutorials" className="hover:text-blue-600 transition-colors">
              Tutorials
            </Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium line-clamp-1">{tutorial.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Header ── */}
      <section className="py-8 sm:py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {tutorial.level}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] leading-tight">
              {tutorial.title}
            </h1>

            <p className="text-gray-600 mt-3 leading-relaxed">{tutorial.excerpt}</p>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
                <GraduationCap size={13} className="shrink-0" />
                {tutorial.level}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
                <Clock size={13} className="shrink-0" />
                {tutorial.readingTime} read
              </span>
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
                <Calendar size={13} className="shrink-0" />
                {tutorial.publishedDate}
              </span>
            </div>

            {/* Niche pills — link to the matching industry hub */}
            <div className="flex flex-wrap gap-2 mt-4">
              {tutorial.niches.map((niche) =>
                NICHE_HREF[niche] ? (
                  <Link
                    key={niche}
                    href={NICHE_HREF[niche]}
                    className={`text-xs font-medium rounded-full px-3 py-1 hover:opacity-90 transition-opacity ${NICHE_PILL[niche] ?? DEFAULT_NICHE_PILL}`}
                  >
                    {niche}
                  </Link>
                ) : (
                  <span
                    key={niche}
                    className={`text-xs font-medium rounded-full px-3 py-1 ${NICHE_PILL[niche] ?? DEFAULT_NICHE_PILL}`}
                  >
                    {niche}
                  </span>
                ),
              )}
            </div>

            {/* Tags — linked when they map to a live industry/tag hub */}
            <div className="flex flex-wrap gap-2 mt-4">
              {tutorial.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Body + sticky TOC sidebar ── */}
      <section className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
            <article className="max-w-3xl">
              {tutorial.content.map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))}

              {/* Tool used in this tutorial — review link + affiliate CTA */}
              {tutorialTool && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h2 className="text-xl font-bold text-[#1E293B] mb-1">
                    Tool Used in This Tutorial
                  </h2>
                  <div className="border border-gray-100 rounded-xl px-4 py-3 mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/tools/${tutorialTool.slug}`}
                          className="text-sm font-semibold text-[#1E293B] hover:text-blue-600 transition-colors"
                        >
                          {tutorialTool.name}
                        </Link>
                        <span className="text-xs font-semibold text-amber-500">
                          ★ {tutorialTool.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                        {tutorialTool.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        href={`/tools/${tutorialTool.slug}`}
                        className="text-blue-600 text-sm font-medium hover:underline whitespace-nowrap"
                      >
                        Read review
                      </Link>
                      {tutorialTool.affiliateHref && (
                        <a
                          href={tutorialTool.affiliateHref}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors whitespace-nowrap"
                        >
                          Visit site →
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    The link above may be an affiliate link — we may earn a
                    commission at no extra cost to you.{" "}
                    <Link
                      href="/affiliate-disclosure"
                      className="underline hover:text-gray-600"
                    >
                      Learn more
                    </Link>
                  </p>
                </div>
              )}

              {/* Related guide */}
              {relatedGuide && (
                <Link
                  href={relatedGuide.href}
                  className="group flex items-center gap-4 border border-gray-100 rounded-xl p-4 mt-8 bg-gray-50 hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <div className="bg-gray-300 rounded-lg w-24 sm:w-28 aspect-[2/1] relative overflow-hidden shrink-0">
                    <Image
                      src={relatedGuide.thumbnail}
                      alt={relatedGuide.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                      Related guide
                    </p>
                    <p className="font-semibold text-sm text-[#1E293B] mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {relatedGuide.title}
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 shrink-0 group-hover:text-blue-600 transition-colors" />
                </Link>
              )}
            </article>

            {/* TOC */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 border border-gray-100 rounded-xl p-5 bg-white">
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
                    On this page
                  </p>
                  <ul className="space-y-1">
                    {tocItems.map(({ id, label }) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className="block text-sm text-gray-600 hover:text-blue-600 py-1 leading-snug transition-colors"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
