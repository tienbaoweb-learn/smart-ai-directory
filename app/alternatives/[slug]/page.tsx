import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ShieldCheck, Star, StarHalf } from "lucide-react";

import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { TOOL_LOGO_URLS } from "../../data/tool-logos";
import { getToolBySlug, type Tool } from "../../../lib/tools";
import {
  getAllAlternativesSlugs,
  getAlternativesBySlug,
  type AlternativesEntry,
} from "../../../lib/alternatives";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${MONTHS[parseInt(month, 10) - 1]} ${day}, ${year}`;
}

function toolName(t: Tool): string {
  return t.frontmatter.toolName || t.frontmatter.title.split(":")[0].trim();
}

// Same resolution order as the tool review page: shared map → frontmatter → ""
// (colored initials fallback), but only if the file actually exists.
function resolveLogo(t: Tool): string {
  const logo = TOOL_LOGO_URLS[t.slug] ?? t.frontmatter.logoUrl ?? "";
  if (!logo) return "";
  return fs.existsSync(path.join(process.cwd(), "public", logo)) ? logo : "";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function BreadArrow() {
  return (
    <svg
      className="w-3 h-3 text-gray-300 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} size={size} className="text-amber-400 fill-amber-400" />
      ))}
      {half && <StarHalf size={size} className="text-amber-400 fill-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} size={size} className="text-gray-200 fill-gray-200" />
      ))}
    </div>
  );
}

// Integer 1-5 "editorial score" stars (comparisonRows), distinct from the
// review-rating StarRow above.
function ScoreStars({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < score ? "text-blue-600 fill-blue-600" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  );
}

// Resolve every alternative slug up front; throw loudly at build time if an
// entry references a tool review that doesn't exist — never render a broken
// alternatives page.
function resolveAlternatives(entry: AlternativesEntry): Tool[] {
  return entry.alternativeSlugs.map((slug) => {
    const tool = getToolBySlug(slug);
    if (!tool) {
      throw new Error(
        `alternatives entry "${entry.incumbentSlug}": alternative slug "${slug}" has no matching review in content/tools/`
      );
    }
    return tool;
  });
}

// ── Static params + metadata ────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllAlternativesSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getAlternativesBySlug(slug);
  if (!entry) return { title: "Alternatives Not Found" };
  const incumbent = getToolBySlug(entry.incumbentSlug);
  if (!incumbent) return { title: "Alternatives Not Found" };
  const name = toolName(incumbent);

  const title = `${entry.alternativeSlugs.length} Best ${name} Alternatives in 2026 | SmartAIforWork`;
  return {
    title,
    description: entry.shortDescription,
    alternates: { canonical: `/alternatives/${slug}` },
    openGraph: {
      title,
      description: entry.shortDescription,
      type: "article",
      url: `https://www.smartaiforwork.com/alternatives/${slug}`,
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function AlternativesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getAlternativesBySlug(slug);
  if (!entry) notFound();

  const incumbent = getToolBySlug(entry.incumbentSlug);
  if (!incumbent) notFound();

  const alternatives = resolveAlternatives(entry);
  const name = toolName(incumbent);
  const incumbentLogo = resolveLogo(incumbent);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
      { "@type": "ListItem", position: 2, name: "Tool Reviews", item: "https://www.smartaiforwork.com/tools" },
      {
        "@type": "ListItem",
        position: 3,
        name: `${name} Alternatives`,
        item: `https://www.smartaiforwork.com/alternatives/${slug}`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${name} Alternatives`,
    itemListElement: alternatives.map((alt, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: toolName(alt),
      url: `https://www.smartaiforwork.com/tools/${alt.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <BreadArrow />
            <Link href="/tools" className="hover:text-blue-600 transition-colors">
              Tool Reviews
            </Link>
            <BreadArrow />
            <span className="text-[#1E293B] font-medium">{name} Alternatives</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="py-10 sm:py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            {incumbentLogo ? (
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center p-1 shrink-0">
                <Image src={incumbentLogo} alt={name} width={40} height={40} className="object-contain w-full h-full" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xs">{getInitials(name)}</span>
              </div>
            )}
            <Link href={`/tools/${incumbent.slug}`} className="text-sm text-blue-600 hover:underline font-medium">
              Read the full {name} review →
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] leading-tight">
            {alternatives.length} Best {name} Alternatives in 2026
          </h1>
          <p className="text-gray-600 mt-3 max-w-3xl leading-relaxed">{entry.shortDescription}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={15} className="text-blue-600 shrink-0" />
              Updated {formatDate(entry.lastUpdated)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-blue-600 shrink-0" />
              Independent comparison
            </span>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* ── Alternative cards ── */}
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Which One Should You Choose?</h2>
            <div className="space-y-6">
              {entry.chooseIf.map((choice) => {
                const alt = alternatives.find((a) => a.slug === choice.slug);
                if (!alt) return null;
                const logo = resolveLogo(alt);
                const altHref = alt.frontmatter.affiliateLink || alt.frontmatter.websiteUrl;
                const isAffiliate = Boolean(alt.frontmatter.affiliateLink);
                return (
                  <div key={choice.slug} className="rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-start gap-4">
                      {logo ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center p-1 shrink-0">
                          <Image src={logo} alt={toolName(alt)} width={48} height={48} className="object-contain w-full h-full" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                          <span className="text-white font-bold text-sm">{getInitials(toolName(alt))}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Link href={`/tools/${alt.slug}`} className="font-bold text-[#1E293B] hover:text-blue-600 transition-colors">
                            {toolName(alt)}
                          </Link>
                          <StarRow rating={alt.frontmatter.rating} size={12} />
                          <span className="text-xs text-gray-500">{alt.frontmatter.rating}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{choice.body}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          <Link href={`/tools/${alt.slug}`} className="text-sm font-medium text-blue-600 hover:underline">
                            Read the full review →
                          </Link>
                          {altHref && (
                            <>
                              <a
                                href={altHref}
                                target="_blank"
                                rel="sponsored noopener noreferrer"
                                className="text-sm font-medium text-white bg-[#F97316] hover:bg-orange-600 transition-colors px-3 py-1.5 rounded-lg"
                              >
                                Visit {toolName(alt)} ↗
                              </a>
                              {isAffiliate && (
                                <Link href="/affiliate-disclosure" className="text-xs text-gray-400 hover:text-gray-600 underline">
                                  Affiliate disclosure
                                </Link>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Quick comparison table ── */}
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Quick Comparison</h2>
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="min-w-[720px] w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Tool</th>
                    <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Style range</th>
                    <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Output quality</th>
                    <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Professional workflow</th>
                    <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Ease of use</th>
                    <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Typical pricing</th>
                  </tr>
                </thead>
                <tbody>
                  {entry.comparisonRows.map((row) => {
                    const alt = alternatives.find((a) => a.slug === row.slug);
                    if (!alt) return null;
                    return (
                      <tr key={row.slug} className="border-t border-gray-100">
                        <td className="py-3 px-4 font-medium text-[#1E293B]">
                          <Link href={`/tools/${alt.slug}`} className="hover:text-blue-600 transition-colors">
                            {toolName(alt)}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{row.styleRange}</td>
                        <td className="py-3 px-4 text-gray-600">{row.outputQuality}</td>
                        <td className="py-3 px-4"><ScoreStars score={row.professionalWorkflow} /></td>
                        <td className="py-3 px-4"><ScoreStars score={row.easeOfUse} /></td>
                        <td className="py-3 px-4 text-gray-600">{row.pricing}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
