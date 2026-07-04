import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import readingTime from "reading-time";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  StarHalf,
  Trophy,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import FAQAccordion, {
  type FAQItem,
} from "../../components/tools/FAQAccordion";
import { TOOL_LOGO_URLS } from "../../data/tool-logos";
import { getToolBySlug, type IndustrySlug, type Tool } from "../../../lib/tools";
import {
  getAllComparisonSlugs,
  getComparisonBySlug,
  type Comparison,
  type ComparisonEdge,
} from "../../../lib/comparisons";

// Static year keeps output deterministic (no Date.now()), per CLAUDE.md.
const YEAR = 2026;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const INDUSTRY_HUBS: Record<
  IndustrySlug,
  { label: string; href: string }
> = {
  architecture: { label: "Architecture", href: "/best-of/architecture" },
  construction: { label: "Construction", href: "/best-of/construction" },
  "interior-design": {
    label: "Interior Design",
    href: "/best-of/interior-design",
  },
  "real-estate": { label: "Real Estate", href: "/best-of/real-estate" },
  furniture: { label: "Furniture", href: "/industries/furniture" },
};

// ── Helpers (small, pure — mirror the review page's inline helpers) ──────────────

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${MONTHS[parseInt(month, 10) - 1]} ${day}, ${year}`;
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

function toolName(t: Tool): string {
  return t.frontmatter.toolName || t.frontmatter.title.split(":")[0].trim();
}

// Resolve a tool's logo the same way the review page does: shared map → frontmatter
// → "" (colored initials fallback), but only if the file actually exists.
function resolveLogo(t: Tool): string {
  const logo = TOOL_LOGO_URLS[t.slug] ?? t.frontmatter.logoUrl ?? "";
  if (!logo) return "";
  return fs.existsSync(path.join(process.cwd(), "public", logo)) ? logo : "";
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

// Collect all editorial prose so reading time is computed the site's way.
function comparisonText(c: Comparison): string {
  return [
    c.verdict,
    c.tldr,
    c.sections.features.body,
    c.sections.pricing.body,
    c.sections.easeOfUse.body,
    c.sections.useCases.body,
    ...c.chooseA,
    ...c.chooseB,
    ...c.faq.flatMap((f) => [f.q, f.a]),
  ].join(" ");
}

// ── Static params + metadata ────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) return { title: "Comparison Not Found" };
  const a = getToolBySlug(c.toolASlug);
  const b = getToolBySlug(c.toolBSlug);
  if (!a || !b) return { title: "Comparison Not Found" };
  const an = toolName(a);
  const bn = toolName(b);
  return {
    title: `${an} vs ${bn}: Which Is Better in ${YEAR}? | SmartAIforWork`,
    description: c.verdict,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title: `${an} vs ${bn}: ${YEAR} Comparison`,
      description: c.verdict,
      type: "article",
      url: `https://www.smartaiforwork.com/compare/${slug}`,
    },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) notFound();

  const a = getToolBySlug(c.toolASlug);
  const b = getToolBySlug(c.toolBSlug);
  if (!a || !b) notFound();

  const an = toolName(a);
  const bn = toolName(b);
  const hub = INDUSTRY_HUBS[c.niche];

  const lastUpdated =
    c.lastUpdated ??
    ([a.frontmatter.lastUpdated, b.frontmatter.lastUpdated]
      .filter(Boolean)
      .sort()
      .pop() as string);
  const readTime = readingTime(comparisonText(c)).text;

  const aLogo = resolveLogo(a);
  const bLogo = resolveLogo(b);
  const aHref = a.frontmatter.affiliateLink || a.frontmatter.websiteUrl;
  const bHref = b.frontmatter.affiliateLink || b.frontmatter.websiteUrl;
  const aIsAffiliate = Boolean(a.frontmatter.affiliateLink);
  const bIsAffiliate = Boolean(b.frontmatter.affiliateLink);

  const edgeLabel = (edge: ComparisonEdge): string =>
    edge === "A" ? an : edge === "B" ? bn : "Too close to call";

  const faqItems: FAQItem[] = c.faq.map((f) => ({
    question: f.q,
    answer: f.a,
  }));

  const rounds: {
    id: string;
    title: string;
    section: Comparison["sections"][keyof Comparison["sections"]];
  }[] = [
    { id: "features", title: "Features", section: c.sections.features },
    { id: "pricing", title: "Pricing & Value", section: c.sections.pricing },
    { id: "ease-of-use", title: "Ease of Use", section: c.sections.easeOfUse },
    { id: "use-cases", title: "Use Cases: Who It's For", section: c.sections.useCases },
  ];

  // At-a-glance rows. Pricing / free-tier come from tool data when present;
  // otherwise a clearly-labeled fallback (never fabricated).
  const glanceRows: { label: string; a: string; b: string }[] = [
    {
      label: "Pricing",
      a: a.frontmatter.pricing ?? "Not published — see website",
      b: b.frontmatter.pricing ?? "Not published — see website",
    },
    {
      label: "Free tier",
      a: a.frontmatter.pricingType
        ? a.frontmatter.pricingType === "Free" ||
          a.frontmatter.pricingType === "Freemium"
          ? "Yes"
          : "No"
        : "See website",
      b: b.frontmatter.pricingType
        ? b.frontmatter.pricingType === "Free" ||
          b.frontmatter.pricingType === "Freemium"
          ? "Yes"
          : "No"
        : "See website",
    },
    {
      label: "Best for",
      a: a.frontmatter.bestFor[0] ?? a.frontmatter.category,
      b: b.frontmatter.bestFor[0] ?? b.frontmatter.category,
    },
    {
      label: "Key strength",
      a: a.frontmatter.pros[0] ?? "—",
      b: b.frontmatter.pros[0] ?? "—",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://www.smartaiforwork.com/compare" },
      {
        "@type": "ListItem",
        position: 3,
        name: `${an} vs ${bn}`,
        item: `https://www.smartaiforwork.com/compare/${slug}`,
      },
    ],
  };

  // Small reusable logo chip.
  const LogoChip = ({ t, logo }: { t: Tool; logo: string }) =>
    logo ? (
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center p-1 shrink-0">
        <Image
          src={logo}
          alt={toolName(t)}
          width={40}
          height={40}
          className="object-contain w-full h-full"
        />
      </div>
    ) : (
      <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
        <span className="text-white font-bold text-xs">
          {getInitials(toolName(t))}
        </span>
      </div>
    );

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
            <span className="cursor-default">Compare</span>
            <BreadArrow />
            <span className="text-[#1E293B] font-medium">
              {an} vs {bn}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="py-10 sm:py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <LogoChip t={a} logo={aLogo} />
            <span className="text-gray-300 font-bold text-lg">vs</span>
            <LogoChip t={b} logo={bLogo} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] leading-tight">
            {an} vs {bn}: {YEAR} Comparison
          </h1>
          <p className="text-gray-600 mt-3 max-w-3xl leading-relaxed">
            {c.verdict}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={15} className="text-blue-600 shrink-0" />
              Updated {formatDate(lastUpdated)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} className="text-blue-600 shrink-0" />
              {readTime}
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
          {/* ── TL;DR verdict box ── */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={18} className="text-blue-600 shrink-0" />
              <h2 className="text-lg font-bold text-[#1E293B]">
                The Verdict, in Short
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{c.tldr}</p>
          </div>

          {/* ── At-a-glance table ── */}
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
              {an} vs {bn} at a Glance
            </h2>
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="min-w-[560px] w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4 w-32">
                      &nbsp;
                    </th>
                    <th className="text-left font-semibold text-[#1E293B] py-3 px-4">
                      <div className="flex items-center gap-2">
                        <LogoChip t={a} logo={aLogo} />
                        {an}
                      </div>
                    </th>
                    <th className="text-left font-semibold text-[#1E293B] py-3 px-4">
                      <div className="flex items-center gap-2">
                        <LogoChip t={b} logo={bLogo} />
                        {bn}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Editorial rating row */}
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-500 align-top">
                      Editorial rating
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <StarRow rating={a.frontmatter.rating} size={13} />
                        <span className="text-gray-600">
                          {a.frontmatter.rating.toFixed(1)}/5
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <StarRow rating={b.frontmatter.rating} size={13} />
                        <span className="text-gray-600">
                          {b.frontmatter.rating.toFixed(1)}/5
                        </span>
                      </div>
                    </td>
                  </tr>
                  {glanceRows.map((row) => (
                    <tr key={row.label} className="border-t border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-500 align-top">
                        {row.label}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{row.a}</td>
                      <td className="py-3 px-4 text-gray-600">{row.b}</td>
                    </tr>
                  ))}
                  {/* Review row */}
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-500 align-top">
                      Review
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/tools/${a.slug}`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-xs transition-colors"
                      >
                        Detail Review →
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/tools/${b.slug}`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-xs transition-colors"
                      >
                        Detail Review →
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Facts pulled from our independent {an} and {bn} reviews. Always
              verify current pricing on each vendor&apos;s website.
            </p>
          </div>

          {/* ── Round-by-round ── */}
          {rounds.map((r) => (
            <div key={r.id} id={r.id} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#1E293B] mb-3">
                {r.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                {r.section.body}
              </p>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E293B] bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5">
                <Trophy size={14} className="text-amber-500 shrink-0" />
                Edge: {edgeLabel(r.section.edge)}
              </p>
            </div>
          ))}

          {/* ── Decision block ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-100 rounded-xl p-5 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <LogoChip t={a} logo={aLogo} />
                <h3 className="font-bold text-[#1E293B]">Choose {an} if…</h3>
              </div>
              <ul className="space-y-2">
                {c.chooseA.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-gray-100 rounded-xl p-5 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <LogoChip t={b} logo={bLogo} />
                <h3 className="font-bold text-[#1E293B]">Choose {bn} if…</h3>
              </div>
              <ul className="space-y-2">
                {c.chooseB.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Dual CTA ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={aHref}
              target="_blank"
              rel={aIsAffiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-4 transition-colors"
            >
              Try {an} →
            </a>
            <a
              href={bHref}
              target="_blank"
              rel={bIsAffiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
              className="block text-center bg-[#F97316] hover:bg-orange-600 text-white font-semibold rounded-xl px-6 py-4 transition-colors"
            >
              Try {bn} →
            </a>
          </div>

          {/* ── FAQ ── */}
          <div id="faq" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={faqItems} />
          </div>

          {/* ── Related links ── */}
          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
              Keep Reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={`/tools/${a.slug}`}
                className="group border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all"
              >
                <p className="font-semibold text-sm text-[#1E293B] group-hover:text-blue-600">
                  {an} review
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {a.frontmatter.excerpt}
                </p>
              </Link>
              <Link
                href={`/tools/${b.slug}`}
                className="group border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all"
              >
                <p className="font-semibold text-sm text-[#1E293B] group-hover:text-blue-600">
                  {bn} review
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {b.frontmatter.excerpt}
                </p>
              </Link>
              {hub && (
                <Link
                  href={hub.href}
                  className="group border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <p className="font-semibold text-sm text-[#1E293B] group-hover:text-blue-600">
                    Best AI Tools for {hub.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    See our full ranked hub for {hub.label.toLowerCase()}.
                  </p>
                </Link>
              )}
              {(c.related ?? []).map((relSlug) => {
                const rel = getComparisonBySlug(relSlug);
                if (!rel) return null;
                const ra = getToolBySlug(rel.toolASlug);
                const rb = getToolBySlug(rel.toolBSlug);
                if (!ra || !rb) return null;
                return (
                  <Link
                    key={relSlug}
                    href={`/compare/${relSlug}`}
                    className="group border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <p className="font-semibold text-sm text-[#1E293B] group-hover:text-blue-600">
                      {toolName(ra)} vs {toolName(rb)} comparison
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {rel.verdict}
                    </p>
                  </Link>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-gray-400 flex items-center gap-1.5">
              <Check size={12} className="shrink-0" />
              Independent editorial comparison — not a paid placement.
            </p>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
