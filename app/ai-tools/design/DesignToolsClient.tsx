"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { ALL_TOOLS, CATEGORY_LABELS } from "../../data/tools";
import { TOOL_LOGO_URLS } from "../../data/tool-logos";
import CompareTools from "../CompareTools";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const DESIGN_TOOLS = ALL_TOOLS.filter((t) => t.category === "design");

const INDUSTRY_OPTIONS = [
  { label: "All Industries", value: "All" },
  { label: "Furniture", value: "Furniture" },
  { label: "Architecture", value: "Architecture" },
  { label: "Construction", value: "Construction" },
  { label: "Real Estate", value: "Real Estate" },
];

const PRICING_OPTIONS = ["Free", "Freemium", "Paid"];

const RATING_OPTIONS = [
  { label: "4.5+ Stars", value: "4.5" },
  { label: "4.0+ Stars", value: "4.0" },
  { label: "All Ratings", value: "all" },
];

const INDUSTRY_BADGE: Record<string, string> = {
  Furniture:    "bg-amber-100 text-amber-700",
  Architecture: "bg-slate-100 text-slate-700",
  Construction: "bg-orange-100 text-orange-700",
  "Real Estate": "bg-violet-100 text-violet-700",
  All:          "bg-gray-100 text-gray-600",
};

const OTHER_CATEGORIES = [
  {
    value: "content-marketing",
    label: CATEGORY_LABELS["content-marketing"],
    href: "/ai-tools/content-marketing",
    color: "bg-purple-100",
    iconColor: "text-purple-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    value: "automation",
    label: CATEGORY_LABELS["automation"],
    href: "/ai-tools/automation",
    color: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: "sales",
    label: CATEGORY_LABELS["sales"],
    href: "/ai-tools/sales",
    color: "bg-green-100",
    iconColor: "text-green-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "productivity",
    label: CATEGORY_LABELS["productivity"],
    href: "/ai-tools/productivity",
    color: "bg-yellow-100",
    iconColor: "text-yellow-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.floor(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function getIndustryCount(value: string) {
  if (value === "All") return DESIGN_TOOLS.length;
  return DESIGN_TOOLS.filter(
    (t) => t.industry === value || t.industry === "All"
  ).length;
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function BreadcrumbSection() {
  return (
    <div className="bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#F97316] transition-colors">Home</Link>
          <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/ai-tools" className="hover:text-[#F97316] transition-colors">AI Tools</Link>
          <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#1E293B] font-medium">AI Design &amp; Visualization</span>
        </nav>
      </div>
    </div>
  );
}

const POPULAR_SEARCHES = ["3D Rendering", "Interior Design", "Midjourney", "D5 Render", "Visualization"];

function HeroSection({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}) {
  const avgRating =
    DESIGN_TOOLS.length > 0
      ? (DESIGN_TOOLS.reduce((sum, t) => sum + t.rating, 0) / DESIGN_TOOLS.length).toFixed(1)
      : "—";

  const stats = [
    {
      value: "20+",
      label: "Tools Reviewed",
      icon: (
        <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      value: "4",
      label: "Industries",
      icon: (
        <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      value: "100+",
      label: "Hours Tested",
      icon: (
        <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
        </svg>
      ),
    },
    {
      value: "1000+",
      label: "Happy Readers",
      icon: (
        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white pt-12 pb-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <span className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757V14.243zM16 13.757l-1.121-1.122A4.5 4.5 0 0116 9.5V8a1 1 0 012 0v1.5a6.5 6.5 0 01-1.879 4.621L16 13.757z" clipRule="evenodd" />
          </svg>
          AI Tools Category
        </span>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight mb-4 max-w-3xl">
          AI{" "}
          <span
            style={{ background: "linear-gradient(90deg, #7C3AED 0%, #F97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Design &amp; Visualization
          </span>{" "}
          Tools
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
          Discover AI tools for rendering, 3D modeling, mood boards, and visual content — built for furniture, architecture, construction, and real estate professionals.
        </p>

        {/* Stat badges */}
        <div className="flex gap-3 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
              <div className="shrink-0">{s.icon}</div>
              <div className="leading-none">
                <p className="font-extrabold text-[#1E293B] text-sm">{s.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("all-tools")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex gap-3 mb-5 max-w-[610px]"
        >
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:border-orange-300 transition-colors">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search design tools (e.g. rendering, 3D modeling, visualization...)"
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shrink-0 shadow-md shadow-orange-100"
          >
            Search
          </button>
        </form>

        {/* Popular searches */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Popular searches:</span>
          {POPULAR_SEARCHES.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-orange-50 hover:text-[#F97316] text-gray-600 border border-gray-100 hover:border-orange-200 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolRow({
  tool,
  onReset,
}: {
  tool: (typeof ALL_TOOLS)[0];
  onReset: () => void;
}) {
  void onReset;
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-5 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-sm transition-all">
      {/* Logo */}
      <div className={`w-14 h-14 rounded-xl overflow-hidden ${TOOL_LOGO_URLS[tool.slug] ? "bg-white border border-gray-100 p-1" : tool.logoBg} flex items-center justify-center shrink-0`}>
        {TOOL_LOGO_URLS[tool.slug] ? (
          <Image src={TOOL_LOGO_URLS[tool.slug]} alt={tool.name} width={56} height={56} className="object-contain w-full h-full" />
        ) : (
          <span className={tool.logoTextClass}>{tool.logoText}</span>
        )}
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-bold text-[#1E293B] text-base">{tool.name}</h3>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${INDUSTRY_BADGE[tool.industry] ?? INDUSTRY_BADGE["All"]}`}>
            {tool.industry === "All" ? "All Industries" : tool.industry}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={tool.rating} />
          <span className="font-bold text-[#1E293B] text-xs">{tool.rating}</span>
          <span className="text-gray-400 text-xs">Editorial Rating</span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{tool.keyFeatures}</p>
        <p className="text-gray-400 text-xs mt-1">{tool.bestFor}</p>
      </div>

      {/* Right: pricing + buttons */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
        <div className="text-right">
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1 ${
            tool.pricing === "Freemium" ? "bg-green-50 text-green-700" :
            tool.pricing === "Free"     ? "bg-blue-50 text-blue-700" :
                                          "bg-orange-50 text-orange-700"
          }`}>
            {tool.pricing}
          </span>
          <p className="text-gray-400 text-xs">{tool.pricingDetail}</p>
        </div>
        <div className="flex sm:flex-col gap-2">
          {tool.hasReview ? (
            <Link
              href={`/tools/${tool.slug}`}
              className="text-xs font-semibold border border-gray-200 text-gray-600 hover:border-gray-300 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors"
            >
              Read Review
            </Link>
          ) : (
            <span className="text-xs font-semibold border border-gray-200 text-gray-400 px-3 py-1.5 rounded-lg whitespace-nowrap cursor-default">
              Review Coming Soon
            </span>
          )}
          <a
            href={tool.affiliateHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold bg-[#2B7FFF] hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Visit Website →
          </a>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50">
      <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p className="text-gray-500 font-semibold mb-1">No tools match your filters</p>
      <p className="text-gray-400 text-sm mb-4">Try adjusting or clearing your filters.</p>
      <button
        onClick={onReset}
        className="text-sm font-semibold text-[#F97316] hover:underline"
      >
        Reset Filters
      </button>
    </div>
  );
}

// ─── COMPARE SECTION ─────────────────────────────────────────────────────────

const COMPARE_SLOTS = [
  { name: "Midjourney",  bg: "bg-[#1E293B]", initials: "MJ" },
  { name: "D5 Render",   bg: "bg-blue-500",  initials: "D5" },
  { name: "Canva AI",    bg: "bg-[#00C4CC]", initials: "CA" },
];

function ExploreOtherCategories() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-[#1E293B] mb-2">Explore Other Categories</h2>
        <p className="text-gray-500 text-sm mb-8">Find AI tools across every use case for your workflow.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {OTHER_CATEGORIES.map((cat) => {
            const count = ALL_TOOLS.filter((t) => t.category === cat.value).length;
            return (
              <Link
                key={cat.value}
                href={cat.href}
                className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all p-4 group"
              >
                <div className={`w-9 h-9 rounded-xl ${cat.color} flex items-center justify-center shrink-0 ${cat.iconColor}`}>
                  {cat.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#1E293B] text-xs sm:text-sm leading-tight group-hover:text-[#F97316] transition-colors line-clamp-2">
                    {cat.label}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{count} Tools</p>
                  <p className="text-[#F97316] text-xs font-semibold mt-1 group-hover:underline">Explore →</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function DesignToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [pricingFilters, setPricingFilters] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("Highest Rated");

  const togglePricing = (p: string) =>
    setPricingFilters((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  const resetFilters = () => {
    setIndustryFilter("All");
    setPricingFilters([]);
    setRatingFilter("all");
    setSortBy("Highest Rated");
  };

  const filtered = useMemo(() => {
    let tools = DESIGN_TOOLS;

    if (industryFilter !== "All") {
      tools = tools.filter(
        (t) => t.industry === industryFilter || t.industry === "All"
      );
    }

    if (pricingFilters.length > 0) {
      tools = tools.filter((t) => pricingFilters.includes(t.pricing));
    }

    if (ratingFilter === "4.5") {
      tools = tools.filter((t) => t.rating >= 4.5);
    } else if (ratingFilter === "4.0") {
      tools = tools.filter((t) => t.rating >= 4.0);
    }

    if (sortBy === "Highest Rated") {
      tools = [...tools].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Most Reviewed") {
      tools = [...tools].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Name A-Z") {
      tools = [...tools].sort((a, b) => a.name.localeCompare(b.name));
    }

    return tools;
  }, [searchQuery, industryFilter, pricingFilters, ratingFilter, sortBy]);

  const hasActiveFilters =
    industryFilter !== "All" || pricingFilters.length > 0 || ratingFilter !== "all";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <BreadcrumbSection />
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Two-column layout */}
      <section id="all-tools" className="py-10 sm:py-14 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">

                {/* Industry */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <h3 className="font-bold text-[#1E293B] text-sm mb-3">Industry</h3>
                  <div className="space-y-2">
                    {INDUSTRY_OPTIONS.map((opt) => {
                      const count = getIndustryCount(opt.value);
                      return (
                        <label key={opt.value} className="flex items-center justify-between gap-2 cursor-pointer group">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="industry"
                              checked={industryFilter === opt.value}
                              onChange={() => setIndustryFilter(opt.value)}
                              className="accent-[#F97316] w-4 h-4"
                            />
                            <span className={`text-sm transition-colors ${industryFilter === opt.value ? "text-[#1E293B] font-semibold" : "text-gray-600 group-hover:text-[#1E293B]"}`}>
                              {opt.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 bg-white border border-gray-100 rounded-full px-2 py-0.5">{count}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <h3 className="font-bold text-[#1E293B] text-sm mb-3">Pricing</h3>
                  <div className="space-y-2">
                    {PRICING_OPTIONS.map((p) => (
                      <label key={p} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={pricingFilters.includes(p)}
                          onChange={() => togglePricing(p)}
                          className="accent-[#F97316] w-4 h-4 rounded"
                        />
                        <span className={`text-sm transition-colors ${pricingFilters.includes(p) ? "text-[#1E293B] font-semibold" : "text-gray-600 group-hover:text-[#1E293B]"}`}>
                          {p}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <h3 className="font-bold text-[#1E293B] text-sm mb-3">Rating</h3>
                  <div className="space-y-2">
                    {RATING_OPTIONS.map((r) => (
                      <label key={r.value} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="rating"
                          checked={ratingFilter === r.value}
                          onChange={() => setRatingFilter(r.value)}
                          className="accent-[#F97316] w-4 h-4"
                        />
                        <span className={`text-sm transition-colors ${ratingFilter === r.value ? "text-[#1E293B] font-semibold" : "text-gray-600 group-hover:text-[#1E293B]"}`}>
                          {r.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="w-full text-sm font-semibold border border-gray-200 hover:border-[#F97316] hover:text-[#F97316] text-gray-600 py-2.5 rounded-xl transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </aside>

            {/* ── Tool list ── */}
            <div className="lg:col-span-3">
              {/* Sort bar */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-[#1E293B]">{filtered.length}</span> tool{filtered.length !== 1 ? "s" : ""} found
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 bg-white focus:outline-none focus:border-orange-300 cursor-pointer"
                >
                  {["Highest Rated", "Most Reviewed", "Name A-Z"].map((s) => (
                    <option key={s}>Sort by: {s}</option>
                  ))}
                </select>
              </div>

              {/* Tool rows or empty state */}
              {filtered.length === 0 ? (
                <EmptyState onReset={resetFilters} />
              ) : (
                <div className="space-y-4">
                  {filtered.map((tool) => (
                    <ToolRow key={tool.name} tool={tool} onReset={resetFilters} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <CompareTools tools={DESIGN_TOOLS} />
      <ExploreOtherCategories />
      <Newsletter />
      <Footer />
    </div>
  );
}
