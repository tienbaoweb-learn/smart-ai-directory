"use client";

import { useState } from "react";
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

// ─── TOOLS DATA ───────────────────────────────────────────────────────────────

const ALL_TOOLS = [
  { name: "Vizcom",          slug: "vizcom",          logoBg: "bg-black",                                                              logoText: "VZ", rating: 4.8, reviews: 420, bestFor: "Concept Design",          desc: "AI-powered concept design and visualization tool for architects.",                          pricingType: "Freemium", price: "From $X / month", category: "Architecture",    pricingTier: "Freemium" },
  { name: "Buildots",        slug: "buildots",        logoBg: "bg-orange-600",                                                         logoText: "BD", rating: 4.8, reviews: 420, bestFor: "Construction Monitoring",desc: "AI-powered site monitoring and progress tracking for construction teams.",               pricingType: "Custom",   price: "From $X / month", category: "Construction",   pricingTier: "Paid"     },
  { name: "REimagineHome",   slug: "reimaginehome",   logoBg: "bg-purple-700",                                                         logoText: "RH", rating: 4.8, reviews: 420, bestFor: "Real Estate Marketing",  desc: "AI tool to generate virtual staging and property visuals.",                                pricingType: "Freemium", price: "From $X / month", category: "Real Estate",    pricingTier: "Freemium" },
  { name: "Planner 5D",      slug: "planner5d",       logoBg: "bg-green-600",                                                          logoText: "P5", rating: 4.8, reviews: 420, bestFor: "Interior Design",        desc: "All-in-one design and planning tool with AI for layout and interior design.",              pricingType: "Freemium", price: "From $6.99 / month",category: "Interior Design",pricingTier: "Freemium" },
  { name: "RoomGPT",         slug: "roomgpt",         logoBg: "bg-gray-900",                                                           logoText: "RG", rating: 4.7, reviews: 310, bestFor: "Quick Concepts",         desc: "Generate interior ideas instantly from room photos using AI.",                              pricingType: "Freemium", price: "From $9.99 / month",category: "Interior Design",pricingTier: "Freemium" },
  { name: "Coohom",          slug: "coohom",          logoBg: "bg-blue-500",                                                           logoText: "C",  rating: 4.7, reviews: 280, bestFor: "3D Visualization",       desc: "Professional 3D design and rendering platform for all interior projects.",                  pricingType: "Free Plan",price: "From $15 / month",  category: "Interior Design",pricingTier: "Free"     },
  { name: "Autodesk Forma",  slug: "autodesk-forma",  logoBg: "bg-gray-900",                                                           logoText: "AF", rating: 4.7, reviews: 310, bestFor: "Site Analysis",          desc: "AI-powered site analysis and early-stage design tool for architects.",                      pricingType: "Freemium", price: "From $X / month", category: "Architecture",   pricingTier: "Freemium" },
  { name: "OpenSpace",       slug: "openspace",       logoBg: "bg-gray-900",                                                           logoText: "OS", rating: 4.7, reviews: 310, bestFor: "Site Documentation",     desc: "Automatically capture and organize site photos for construction projects.",                  pricingType: "Custom",   price: "From $X / month", category: "Construction",   pricingTier: "Paid"     },
  { name: "Offrs",           slug: "offrs",           logoBg: "bg-emerald-600",                                                        logoText: "OF", rating: 4.7, reviews: 300, bestFor: "Lead Generation",        desc: "AI-powered lead generation and prediction for real estate agents.",                         pricingType: "Custom",   price: "From $X / month", category: "Real Estate",    pricingTier: "Paid"     },
  { name: "Midjourney",      slug: "midjourney",      logoBg: "bg-black",                                                              logoText: "MJ", rating: 4.6, reviews: 230, bestFor: "Visualization",          desc: "AI image generation tool widely used for architectural visualization.",                     pricingType: "Freemium", price: "From $X / month", category: "Architecture",   pricingTier: "Freemium" },
  { name: "Homestyler",      slug: "homestyler",      logoBg: "bg-gradient-to-br from-red-400 via-yellow-400 to-green-400",            logoText: "H",  rating: 4.6, reviews: 230, bestFor: "Homeowners",             desc: "User-friendly 3D interior design tool with AI and a huge model library.",                   pricingType: "Freemium", price: "From $4.90 / month",category: "Interior Design",pricingTier: "Freemium" },
  { name: "Foyr Neo",        slug: "foyrneo",         logoBg: "bg-gray-900",                                                           logoText: "FN", rating: 4.6, reviews: 190, bestFor: "Professionals",           desc: "AI-powered interior design software with photorealistic renders.",                          pricingType: "—",        price: "From $30 / month",  category: "Interior Design",pricingTier: "Paid"     },
];

// ─── FILTER DATA ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Architecture",
  "Construction",
  "Real Estate",
  "Interior Design",
  "Furniture",
  "Marketing",
  "Productivity",
  "AI Writing",
];

const PRICING_OPTIONS = ["Free", "Freemium", "Paid"];

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

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AllReviewsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing]       = useState<string[]>([]);
  const [selectedRating, setSelectedRating]         = useState<string>("any");
  const [searchQuery, setSearchQuery]               = useState<string>("");
  const [sortValue, setSortValue]                   = useState<string>("rating");

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function togglePricing(p: string) {
    setSelectedPricing((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  function resetFilters() {
    setSelectedCategories([]);
    setSelectedPricing([]);
    setSelectedRating("any");
    setSearchQuery("");
    setSortValue("rating");
  }

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
              { icon: CheckCircle, label: "150+ Tools Reviewed" },
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
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                          onChange={() => setSelectedRating(value)}
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
                <p className="text-sm text-gray-500">Showing {ALL_TOOLS.length} tools</p>
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
                {ALL_TOOLS.map((tool) => (
                  <div key={tool.slug} className="border border-gray-100 rounded-xl p-3 sm:p-4 bg-white flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    {/* Logo */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${tool.logoBg} flex items-center justify-center mx-auto`}>
                      <span className="text-white text-xs sm:text-sm font-bold">{tool.logoText}</span>
                    </div>

                    {/* Name */}
                    <p className="font-semibold text-sm sm:text-base text-[#1E293B] mt-2 leading-snug">{tool.name}</p>

                    {/* Rating */}
                    <div className="flex justify-center items-center gap-1 mt-1 flex-wrap">
                      <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
                      <span className="text-xs font-medium text-[#1E293B]">{tool.rating}</span>
                      <span className="text-[10px] text-gray-500">({tool.reviews})</span>
                    </div>

                    {/* Best-for tag */}
                    <p className="text-[10px] sm:text-xs text-blue-600 font-medium mt-1 leading-snug">Best for {tool.bestFor}</p>

                    {/* Description */}
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-2 leading-relaxed line-clamp-2 flex-1">{tool.desc}</p>

                    {/* Pricing */}
                    <div className="mt-2">
                      <span className="text-[10px] sm:text-xs font-medium text-[#1E293B]">{tool.pricingType}</span>
                      <span className="text-[10px] sm:text-xs text-gray-500"> · {tool.price}</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-1.5 sm:gap-2 mt-3 w-full">
                      <Link
                        href={`/ai-tools/${tool.slug}`}
                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
                      >
                        Read Review →
                      </Link>
                      <a
                        href="#"
                        className="flex-1 text-center border border-gray-300 hover:bg-gray-50 text-gray-700 text-[10px] sm:text-xs font-medium px-1.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
                      >
                        Visit Website ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Pagination ── */}
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  disabled
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-400 opacity-50 cursor-not-allowed"
                >
                  ← Previous
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      page === 1
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Next →
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
