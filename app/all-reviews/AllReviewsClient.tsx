"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  ChevronDown,
  RefreshCw,
  Search,
  Star,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type ReviewTool = {
  name: string;
  slug: string;
  rating: number;
  bestFor: string;
  desc: string;
  pricingType: string; // tier label shown on card (Free / Freemium / Paid / Custom)
  price: string; // human-readable price string
  categories: string[]; // sidebar category labels this tool belongs to
  pricingTier: string; // used by the pricing filter
  logoUrl: string; // real logo from the review article (empty → initials fallback)
  affiliateUrl: string; // "Visit Website" → affiliate link (falls back to site URL)
};

// ─── FILTER DATA ──────────────────────────────────────────────────────────────

// Fixed sidebar category list (industry + AI-function categories).
const CATEGORIES = [
  "Architecture",
  "Construction",
  "Real Estate",
  "Interior Design",
  "Furniture",
  "Marketing",
  "Productivity",
  "AI Writing",
  "Automation",
  "AI Sales",
];

const RATING_OPTIONS = [
  { label: "Any",  value: "any"  },
  { label: "4.0+", value: "4.0"  },
  { label: "4.5+", value: "4.5"  },
  { label: "4.8+", value: "4.8"  },
];

const SORT_OPTIONS = [
  { label: "Sort by: Highest Rating", value: "rating"  },
  { label: "Sort by: Newest",         value: "newest"  },
  { label: "Sort by: A-Z",            value: "az"      },
];

const PAGE_SIZE = 15;

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AllReviewsClient({ tools }: { tools: ReviewTool[] }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing]       = useState<string[]>([]);
  const [selectedRating, setSelectedRating]         = useState<string>("any");
  const [searchQuery, setSearchQuery]               = useState<string>("");
  const [sortValue, setSortValue]                   = useState<string>("rating");
  const [currentPage, setCurrentPage]               = useState<number>(1);

  // Pricing options derived from the real review articles.
  const PRICING_OPTIONS = Array.from(new Set(tools.map((t) => t.pricingTier).filter(Boolean))).sort();

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  }

  function togglePricing(p: string) {
    setSelectedPricing((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
    setCurrentPage(1);
  }

  function resetFilters() {
    setSelectedCategories([]);
    setSelectedPricing([]);
    setSelectedRating("any");
    setSearchQuery("");
    setSortValue("rating");
    setCurrentPage(1);
  }

  let filteredTools = tools;

  if (selectedCategories.length > 0) {
    filteredTools = filteredTools.filter((t) =>
      t.categories.some((c) => selectedCategories.includes(c))
    );
  }

  if (selectedPricing.length > 0) {
    filteredTools = filteredTools.filter((t) => selectedPricing.includes(t.pricingTier));
  }

  if (selectedRating !== "any") {
    const minRating = parseFloat(selectedRating);
    filteredTools = filteredTools.filter((t) => t.rating >= minRating);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    filteredTools = filteredTools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.bestFor.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q)
    );
  }

  if (sortValue === "rating") {
    filteredTools = [...filteredTools].sort((a, b) => b.rating - a.rating);
  } else if (sortValue === "az") {
    filteredTools = [...filteredTools].sort((a, b) => a.name.localeCompare(b.name));
  }
  // "newest" keeps the incoming order (tools arrive sorted by lastUpdated desc).

  const totalPages = Math.max(1, Math.ceil(filteredTools.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedTools = filteredTools.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium">All Reviews</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="py-10 sm:py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B]">All AI Tool Reviews</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Browse our complete library of AI tool reviews — tested, scored, and compared by our team.
          </p>
          <div className="flex flex-wrap gap-6 mt-3">
            {[
              { icon: CheckCircle, label: `${tools.length}+ Tools Reviewed` },
              { icon: Star,        label: "Independent Ratings"  },
              { icon: RefreshCw,   label: "Updated Weekly"       },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-sm text-gray-500">
                <Icon size={15} className="text-blue-600 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Filter Sidebar + Grid ── */}
      <section className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-1">
              <div className="border border-gray-100 rounded-xl p-5 bg-white lg:sticky lg:top-4">

                {/* Search */}
                <div className="relative mb-4">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="Search tools..."
                    className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category filter */}
                <div className="mb-4">
                  <p className="font-semibold text-sm text-[#1E293B] mb-2">Category</p>
                  <ul className="flex flex-col">
                    {CATEGORIES.map((cat) => (
                      <li key={cat} className="flex items-center gap-2 py-1">
                        <input
                          type="checkbox"
                          id={`cat-${cat}`}
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor={`cat-${cat}`} className="text-sm text-gray-700 cursor-pointer select-none">
                          {cat}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing filter */}
                <div className="mb-4">
                  <p className="font-semibold text-sm text-[#1E293B] mb-2">Pricing</p>
                  <ul className="flex flex-col">
                    {PRICING_OPTIONS.map((p) => (
                      <li key={p} className="flex items-center gap-2 py-1">
                        <input
                          type="checkbox"
                          id={`price-${p}`}
                          checked={selectedPricing.includes(p)}
                          onChange={() => togglePricing(p)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor={`price-${p}`} className="text-sm text-gray-700 cursor-pointer select-none">
                          {p}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rating filter */}
                <div className="mb-4">
                  <p className="font-semibold text-sm text-[#1E293B] mb-2">Minimum Rating</p>
                  <ul className="flex flex-col">
                    {RATING_OPTIONS.map(({ label, value }) => (
                      <li key={value} className="flex items-center gap-2 py-1">
                        <input
                          type="radio"
                          id={`rating-${value}`}
                          name="rating"
                          value={value}
                          checked={selectedRating === value}
                          onChange={() => { setSelectedRating(value); setCurrentPage(1); }}
                          className="w-4 h-4 border-gray-300 text-blue-600 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor={`rating-${value}`} className="text-sm text-gray-700 cursor-pointer select-none">
                          {label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reset */}
                <button
                  onClick={resetFilters}
                  className="w-full border border-gray-300 text-gray-600 rounded-lg py-2 text-sm font-medium mt-2 hover:bg-gray-50 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* ── Grid Tools ── */}
            <div className="lg:col-span-3">

              {/* Header row */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">Showing {filteredTools.length} tools</p>
                <div className="relative">
                  <select
                    value={sortValue}
                    onChange={(e) => setSortValue(e.target.value)}
                    className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-white"
                  >
                    {SORT_OPTIONS.map(({ label, value }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* ── SECTION 3: Tools Grid ── */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {paginatedTools.map((tool) => (
                  <div key={tool.slug} className="border border-gray-100 rounded-xl p-3 sm:p-4 bg-white flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    {/* Logo — synced with the review article */}
                    {tool.logoUrl ? (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center mx-auto p-1">
                        <Image src={tool.logoUrl} alt={tool.name} width={48} height={48} className="object-contain w-full h-full" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-700 flex items-center justify-center mx-auto">
                        <span className="text-white text-xs sm:text-sm font-bold">{initials(tool.name)}</span>
                      </div>
                    )}

                    {/* Name */}
                    <p className="font-semibold text-sm sm:text-base text-[#1E293B] mt-2 leading-snug">{tool.name}</p>

                    {/* Rating */}
                    <div className="flex justify-center items-center gap-1 mt-1 flex-wrap">
                      <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
                      <span className="text-xs font-medium text-[#1E293B]">{tool.rating}</span>
                      <span className="text-[10px] text-gray-500">Editorial Rating</span>
                    </div>

                    {/* Best-for tag */}
                    {tool.bestFor && (
                      <p className="text-[10px] sm:text-xs text-blue-600 font-medium mt-1 leading-snug">Best for {tool.bestFor}</p>
                    )}

                    {/* Description */}
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-2 leading-relaxed line-clamp-2 flex-1">{tool.desc}</p>

                    {/* Pricing */}
                    {(tool.pricingType || tool.price) && (
                      <div className="mt-2">
                        {tool.pricingType && (
                          <span className="text-[10px] sm:text-xs font-medium text-[#1E293B]">{tool.pricingType}</span>
                        )}
                        {tool.price && (
                          <span className="text-[10px] sm:text-xs text-gray-500">{tool.pricingType ? " · " : ""}{tool.price}</span>
                        )}
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-1.5 sm:gap-2 mt-3 w-full">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
                      >
                        Read Review →
                      </Link>
                      {tool.affiliateUrl && tool.affiliateUrl !== "#" ? (
                        <a
                          href={tool.affiliateUrl}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                          className="flex-1 text-center border border-gray-300 hover:bg-gray-50 text-gray-700 text-[10px] sm:text-xs font-medium px-1.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
                        >
                          Visit Website ↗
                        </a>
                      ) : (
                        <span className="flex-1 text-center border border-gray-200 text-gray-400 text-[10px] sm:text-xs font-medium px-1.5 sm:px-3 py-1.5 rounded-md whitespace-nowrap cursor-not-allowed">
                          Visit Website ↗
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredTools.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-sm">No tools match your filters. Try adjusting your search.</p>
                </div>
              )}

              {/* ── Pagination — shows when there are more than 15 tools ── */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    disabled={safePage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={`border border-gray-300 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      safePage === 1
                        ? "text-gray-400 opacity-50 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    ← Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                        page === safePage
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    disabled={safePage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={`border border-gray-300 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      safePage === totalPages
                        ? "text-gray-400 opacity-50 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next →
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
