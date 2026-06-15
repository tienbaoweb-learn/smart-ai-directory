"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Briefcase,
  Building,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock,
  ListChecks,
  PenTool,
  Search,
  Sparkles,
  Star,
  Trophy,
  User,
  Wrench,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";

// ─── RANK BADGE STYLES (full Tailwind classes — no dynamic concatenation) ────

const RANK_BADGE: Record<number, string> = {
  1: "bg-yellow-500 text-white",
  2: "bg-gray-400 text-white",
  3: "bg-orange-700 text-white",
  4: "bg-gray-300 text-gray-700",
  5: "bg-gray-300 text-gray-700",
};

// ─── TOP PICKS DATA ───────────────────────────────────────────────────────────

const TOP_PICKS = [
  {
    rank: 1,
    name: "Planner 5D",
    logoBg: "bg-green-600",
    logoText: "P5",
    rating: 4.8,
    reviews: 420,
    bestFor: "Best Overall",
    desc: "All-in-one design and planning tool with AI for layout and interior design.",
    pricingLabel: "Freemium",
    price: "From $6.99 / month",
    href: "/ai-tools/design",
  },
  {
    rank: 2,
    name: "RoomGPT",
    logoBg: "bg-gray-900",
    logoText: "RG",
    rating: 4.7,
    reviews: 310,
    bestFor: "Best for Quick Concepts",
    desc: "Generate interior ideas instantly from room photos using AI.",
    pricingLabel: "Freemium",
    price: "From $9.99 / month",
    href: "/ai-tools/design",
  },
  {
    rank: 3,
    name: "Coohom",
    logoBg: "bg-blue-500",
    logoText: "C",
    rating: 4.7,
    reviews: 280,
    bestFor: "Best for 3D Visualization",
    desc: "Professional 3D design and rendering platform for all interior projects.",
    pricingLabel: "Free Plan",
    price: "From $15 / month",
    href: "/ai-tools/design",
  },
  {
    rank: 4,
    name: "Homestyler",
    logoBg: "bg-gradient-to-br from-red-400 via-yellow-400 to-green-400",
    logoText: "H",
    rating: 4.6,
    reviews: 230,
    bestFor: "Best for Homeowners",
    desc: "User-friendly 3D interior design tool with AI and a huge model library.",
    pricingLabel: "Freemium",
    price: "From $4.90 / month",
    href: "/ai-tools/design",
  },
  {
    rank: 5,
    name: "Foyr Neo",
    logoBg: "bg-gray-900",
    logoText: "FN",
    rating: 4.6,
    reviews: 190,
    bestFor: "Best for Professionals",
    desc: "AI-powered interior design software with photorealistic renders.",
    pricingLabel: "—",
    price: "From $30 / month",
    href: "/ai-tools/design",
  },
];

// ─── COMPARE TABLE DATA ───────────────────────────────────────────────────────

const COMPARE_TOOLS = [
  { name: "Planner 5D", logoBg: "bg-green-600",  logoText: "P5", bestFor: "All-in-one Design",  ease: 9.2, features: 9.0, quality: 9.1, price: 8.8, overall: 9.0 },
  { name: "RoomGPT",    logoBg: "bg-gray-900",   logoText: "RG", bestFor: "Quick Concepts",     ease: 9.6, features: 8.2, quality: 8.3, price: 8.6, overall: 8.7 },
  { name: "Coohom",     logoBg: "bg-blue-500",   logoText: "C",  bestFor: "3D Visualization",   ease: 8.7, features: 9.3, quality: 9.2, price: 8.1, overall: 8.8 },
  { name: "Homestyler", logoBg: "bg-gradient-to-br from-red-400 via-yellow-400 to-green-400", logoText: "H", bestFor: "Homeowners", ease: 9.1, features: 8.4, quality: 8.6, price: 9.0, overall: 8.7 },
  { name: "Foyr Neo",   logoBg: "bg-gray-900",   logoText: "FN", bestFor: "Professional Use",   ease: 8.3, features: 9.1, quality: 9.3, price: 7.9, overall: 8.6 },
];

const MAX_OVERALL = Math.max(...COMPARE_TOOLS.map((t) => t.overall));

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "How are these AI tools for interior design tested?",
    a: "Our team tests each tool hands-on across real design workflows — from concept generation to client presentations. We evaluate ease of use, output quality, features, and value for money.",
  },
  {
    q: "Which AI tool is best for beginners?",
    a: "Planner 5D and RoomGPT are the most beginner-friendly — both require no design experience and produce impressive results within minutes.",
  },
  {
    q: "Can these tools create photorealistic renders?",
    a: "Yes. Coohom and Foyr Neo specialise in photorealistic 3D rendering, delivering high-quality visuals suitable for professional client presentations.",
  },
  {
    q: "Do these tools work on Mac and Windows?",
    a: "Most tools in this list are browser-based and work on any platform. Foyr Neo and Coohom also offer desktop applications for both Mac and Windows.",
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function BestInteriorDesignToolsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-[#35966a] transition-colors">Home</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/best-of" className="hover:text-[#35966a] transition-colors">Best Of</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium">Best AI Tools for Interior Designers</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 overflow-hidden relative">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e6f4ee] rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              {/* Badge */}
              <div className="mb-5">
                <span className="inline-block bg-[#e6f4ee] text-[#35966a] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                  Best of Interior Design
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight mb-5">
                The Best AI Tools for{" "}
                <br className="hidden sm:block" />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #35966a 0%, #5fb88a 100%)" }}
                >
                  Interior Designers
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                We tested and ranked the top AI tools that help interior designers
                create beautiful designs, visualize spaces, and streamline workflows.
              </p>

              {/* Stats row — 4-cell grid with dividers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-200 rounded-xl overflow-hidden divide-x divide-y sm:divide-y-0 divide-gray-200 mb-6">
                <div className="flex flex-col items-center justify-center gap-1 px-4 py-3 text-center">
                  <Wrench size={15} className="text-[#35966a]" />
                  <span className="text-lg font-bold text-[#1E293B] leading-none">12</span>
                  <span className="text-xs text-gray-500">Tools Tested</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 py-3 text-center">
                  <Clock size={15} className="text-[#35966a]" />
                  <span className="text-lg font-bold text-[#1E293B] leading-none">80+</span>
                  <span className="text-xs text-gray-500">Hours of Research</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 py-3 text-center">
                  <span className="text-lg font-bold text-[#1E293B] leading-none">6</span>
                  <span className="text-xs text-gray-500">Key Criteria</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 py-3 text-center">
                  <span className="text-xs text-gray-400">Last updated</span>
                  <span className="text-sm font-medium text-gray-600">Jun 2, 2026</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#top-picks"
                  className="inline-flex items-center gap-2 bg-[#35966a] hover:bg-[#2c7d58] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm shadow-sm"
                >
                  See Top Picks →
                </a>
                <a
                  href="#compare"
                  className="inline-flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  Compare Tools →
                </a>
              </div>
            </div>

            {/* Right — image + decorative overlays */}
            <div className="relative hidden lg:block">
              {/* Main image placeholder */}
              {/* TODO: replace with Unsplash image "modern interior design living room" */}
              <div className="relative bg-gray-200 rounded-2xl aspect-[4/3] w-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12h.008v.008H13.5V12z" />
                  </svg>
                </div>
              </div>

              {/* Overlay card 1 — Design Faster (top-left) */}
              <div className="absolute -left-5 top-6 bg-white rounded-xl shadow-lg border border-gray-100 p-3 max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={16} className="text-[#35966a] shrink-0" />
                  <p className="font-semibold text-sm text-[#1E293B]">Design Faster</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Generate ideas, layouts, and renders in minutes.
                </p>
              </div>

              {/* Overlay card 2 — Delight Clients (bottom-right) */}
              <div className="absolute -right-5 bottom-6 bg-white rounded-xl shadow-lg border border-gray-100 p-3 max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <Star size={16} className="text-amber-400 fill-amber-400 shrink-0" />
                  <p className="font-semibold text-sm text-[#1E293B]">Delight Clients</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Create stunning visuals that win projects.
                </p>
              </div>

              {/* Badge tròn — Expert Ranked (top-right) */}
              <div className="absolute -right-4 top-5 bg-[#35966a] rounded-full p-3 flex flex-col items-center justify-center w-16 h-16 shadow-lg">
                <Trophy size={18} className="text-white" />
                <p className="text-white text-[9px] font-semibold leading-tight mt-0.5 text-center">Expert Ranked</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: Who is this for? ── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#e6f4ee] rounded-2xl p-8">
            {/* Heading */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#35966a]">Who is this for?</h2>
              <p className="text-sm text-gray-600 mt-1">
                These rankings are for interior design professionals who want to work smarter with AI.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {[
                {
                  icon: PenTool,
                  title: "Interior Designers",
                  desc: "Create concepts, layouts, and presentations faster.",
                },
                {
                  icon: Building,
                  title: "Design Studios",
                  desc: "Standardize workflows and scale projects.",
                },
                {
                  icon: User,
                  title: "Freelancers",
                  desc: "Save time and deliver high-quality results.",
                },
                {
                  icon: Briefcase,
                  title: "Design Businesses",
                  desc: "Win more clients and increase profitability.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                      <Icon size={20} className="text-[#35966a]" />
                    </div>
                    <p className="font-semibold text-sm text-[#1E293B]">{item.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Top Picks for Interior Designers ── */}
      <section id="top-picks" className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header row */}
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Top Picks for Interior Designers
            </h2>
            <Link
              href="/ai-tools/design"
              className="hidden sm:inline-flex text-[#35966a] font-medium text-sm hover:underline"
            >
              View all tools →
            </Link>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {TOP_PICKS.map((tool) => (
              <div key={tool.name} className="border border-gray-100 rounded-xl p-3 sm:p-4 bg-white relative flex flex-col h-full items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <span className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${RANK_BADGE[tool.rank]}`}>
                  {tool.rank}
                </span>

                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${tool.logoBg} flex items-center justify-center mt-5 shrink-0`}>
                  <span className="text-white text-sm font-bold">{tool.logoText}</span>
                </div>

                <p className="font-semibold text-sm text-[#1E293B] mt-2">{tool.name}</p>

                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-medium text-[#1E293B]">{tool.rating}</span>
                  <span className="text-[10px] sm:text-xs text-gray-400">({tool.reviews})</span>
                </div>

                <p className="text-[10px] sm:text-xs text-[#35966a] font-medium mt-1">{tool.bestFor}</p>

                <p className="text-[11px] sm:text-xs text-gray-600 mt-2 leading-relaxed line-clamp-3">
                  {tool.desc}
                </p>

                <div className="mt-2">
                  <span className="text-[10px] sm:text-xs font-medium text-[#1E293B]">{tool.pricingLabel}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500"> · {tool.price}</span>
                </div>

                <div className="flex flex-row flex-nowrap gap-1.5 mt-auto pt-3 w-full">
                  <Link
                    href={tool.href}
                    className="flex-1 text-center bg-[#35966a] hover:bg-[#2c7d58] text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
                  >
                    Read Review →
                  </Link>
                  <a
                    href="#"
                    className="flex-1 text-center border border-gray-300 hover:bg-gray-50 text-gray-700 text-[10px] sm:text-xs font-medium px-1.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
                  >
                    Visit Site ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Compare Top Interior Design AI Tools ── */}
      <section id="compare" className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
                Compare Top Interior Design AI Tools
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Side-by-side comparison to help you choose the right tool.
              </p>
            </div>
            {/* Filter dropdowns (visual only) */}
            <div className="flex gap-2 shrink-0">
              <button className="flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                All Pricing <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Sort by: Overall Score <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Responsive table */}
          <div className="overflow-x-auto border border-gray-100 rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Tool</th>
                  <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Best For</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Ease of Use</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Features</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Quality</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Price</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Overall Score</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Learn More</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_TOOLS.map((tool) => {
                  const isWinner = tool.overall === MAX_OVERALL;
                  return (
                    <tr key={tool.name} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      {/* Tool */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-lg ${tool.logoBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {tool.logoText}
                          </span>
                          <span className="font-medium text-[#1E293B] whitespace-nowrap">{tool.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{tool.bestFor}</td>
                      <td className="py-3 px-4 text-center font-medium text-gray-700">{tool.ease}</td>
                      <td className="py-3 px-4 text-center font-medium text-gray-700">{tool.features}</td>
                      <td className="py-3 px-4 text-center font-medium text-gray-700">{tool.quality}</td>
                      <td className="py-3 px-4 text-center font-medium text-gray-700">{tool.price}</td>
                      {/* Overall Score */}
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 font-bold ${isWinner ? "text-[#35966a]" : "text-[#1E293B]"}`}>
                          {isWinner && <Trophy size={14} className="text-amber-400 fill-amber-400 shrink-0" />}
                          <span className={isWinner ? "bg-[#e6f4ee] px-2 py-0.5 rounded-md" : ""}>{tool.overall}</span>
                        </span>
                      </td>
                      {/* Learn More */}
                      <td className="py-3 px-4 text-center">
                        <Link
                          href="/ai-tools/design"
                          className="text-[#35966a] text-sm font-medium hover:underline whitespace-nowrap"
                        >
                          Read Review →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Best AI Tools by Use Case ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Best AI Tools by Use Case
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find the perfect AI tool for your specific interior design needs.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
            {[
              { label: "Best for Concept Inspiration",   labelClass: "text-blue-600",    logoBg: "bg-gray-900",  logoText: "RG", name: "RoomGPT",    desc: "Instant ideas from photos.",                      href: "/ai-tools/design" },
              { label: "Best for Space Planning",         labelClass: "text-[#35966a]",   logoBg: "bg-green-600", logoText: "P5", name: "Planner 5D", desc: "Smart layouts and space optimization.",            href: "/ai-tools/design" },
              { label: "Best for 3D Rendering",           labelClass: "text-purple-600",  logoBg: "bg-blue-500",  logoText: "C",  name: "Coohom",     desc: "High-quality 3D renders in minutes.",             href: "/ai-tools/design" },
              { label: "Best for Client Presentations",   labelClass: "text-red-500",     logoBg: "bg-gray-900",  logoText: "FN", name: "Foyr Neo",   desc: "Stunning visuals that impress clients.",          href: "/ai-tools/design" },
              { label: "Best for Material & Furniture",   labelClass: "text-orange-600",  logoBg: "bg-gradient-to-br from-red-400 via-yellow-400 to-green-400", logoText: "H", name: "Homestyler", desc: "Huge library of models and materials.", href: "/ai-tools/design" },
              { label: "Best for Ecommerce Content",      labelClass: "text-indigo-600",  logoBg: "bg-gray-900",  logoText: "FN", name: "Foyr Neo",   desc: "Create product visuals and catalog images.",      href: "/ai-tools/design" },
            ].map((card) => (
              <div key={card.label} className="border border-gray-100 rounded-xl p-4 bg-white text-center flex flex-col items-center hover:shadow-md transition-shadow">
                <p className={`text-xs font-semibold leading-snug ${card.labelClass}`}>{card.label}</p>
                <div className={`w-10 h-10 rounded-lg ${card.logoBg} flex items-center justify-center mt-2 shrink-0`}>
                  <span className="text-white text-xs font-bold">{card.logoText}</span>
                </div>
                <p className="font-semibold text-sm text-[#1E293B] mt-2">{card.name}</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2 flex-1">{card.desc}</p>
                <Link href={card.href} className="text-xs text-[#35966a] font-medium mt-2 hover:underline inline-block">
                  See why →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: How We Choose the Best ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              How We Choose the Best
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Our expert process ensures you get reliable recommendations.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connector line — desktop only */}
            <div className="hidden lg:block absolute top-6 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] border-t-2 border-dashed border-gray-200 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                { icon: Search,        title: "1. Research",         desc: "We analyze hundreds of tools and user feedback." },
                { icon: User,          title: "2. Hands-on Testing", desc: "Our team tests each tool in real workflows." },
                { icon: ClipboardList, title: "3. Score & Evaluate", desc: "We rate tools across key criteria and use cases." },
                { icon: Award,         title: "4. Rank & Review",    desc: "We rank the best and write detailed reviews." },
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#e6f4ee] flex items-center justify-center shrink-0">
                      <Icon size={22} className="text-[#35966a]" />
                    </div>
                    <p className="font-semibold text-sm text-[#1E293B] mt-2">{step.title}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed max-w-[180px]">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FAQ + Need Help Choosing ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left — FAQ (lg:col-span-2) */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4">
                Frequently Asked Questions
              </h2>
              <div className="divide-y divide-gray-200">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div key={idx} className="py-4">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full flex justify-between items-center text-left font-medium text-sm text-[#1E293B] hover:text-[#35966a] transition-colors gap-3"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — Need Help Choosing */}
            <div>
              <div className="relative bg-[#e6f4ee] rounded-2xl p-6 overflow-hidden">
                <h3 className="font-bold text-lg text-[#1E293B]">Need Help Choosing?</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  Not sure which tool is right for you? Our guides and workflows can help you decide.
                </p>

                <ul className="mt-4 flex flex-col gap-3">
                  {[
                    "How to Choose the Right AI Design Tool",
                    "AI Workflow for Interior Designers",
                    "Compare All Tools",
                  ].map((label) => (
                    <li key={label}>
                      <Link
                        href="/ai-tools/design"
                        className="flex items-center gap-1 text-sm text-[#35966a] font-medium hover:underline"
                      >
                        <ChevronRight size={14} className="shrink-0" />
                        {label} →
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Decorative icon */}
                <ClipboardCheck
                  size={80}
                  className="absolute -bottom-4 -right-4 text-[#35966a] opacity-20 pointer-events-none"
                />
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
