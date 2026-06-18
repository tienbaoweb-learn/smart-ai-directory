"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { ALL_TOOLS, CATEGORY_LABELS } from "../data/tools";

// ─── DATA ────────────────────────────────────────────────────────────────────

const INDUSTRY_CARDS = [
  {
    id: "furniture",
    href: "/industries/furniture",
    label: "Furniture",
    desc: "Design, visualise & sell furniture smarter",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    id: "architecture",
    href: "/industries/architecture",
    label: "Architecture",
    desc: "Design, plan & visualize architectural projects",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    id: "construction",
    href: "/industries/construction",
    label: "Construction",
    desc: "Build, manage & track projects efficiently",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    id: "realestate",
    href: "/industries/real-estate",
    label: "Real Estate",
    desc: "Find leads, list & close deals faster",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
];

const topPicks = [
  {
    rank: 1,
    category: "AI Content & Marketing",
    categoryHref: "/ai-tools/content-marketing",
    categoryColor: "bg-blue-100 text-blue-600",
    name: "Jasper",
    slug: "jasper",
    logo: { bg: "bg-purple-600", text: "J" },
    rating: 4.6,
    bestFor: "Marketing Teams & Agencies",
    description: "The leading AI writing platform for creating high-quality marketing content, blog posts, and ad copy at scale.",
    pricing: "Freemium",
    price: "From $39/month",
    isFeatured: true,
    reviewHref: "/ai-tools/jasper",
    affiliateHref: "https://www.jasper.ai",
  },
  {
    rank: 2,
    category: "AI Design & Visualization",
    categoryHref: "/ai-tools/design",
    categoryColor: "bg-purple-100 text-purple-600",
    name: "Midjourney",
    slug: "midjourney",
    logo: { bg: "bg-black", text: "MJ" },
    rating: 4.8,
    bestFor: "Architects & Designers",
    description: "Industry-leading AI image generation tool for creating stunning architectural visualizations and design concepts.",
    pricing: "Paid",
    price: "From $10/month",
    isFeatured: true,
    reviewHref: "/ai-tools/midjourney",
    affiliateHref: "#",
  },
  {
    rank: 3,
    category: "AI Automation & Workflow",
    categoryHref: "/ai-tools/automation",
    categoryColor: "bg-orange-100 text-orange-600",
    name: "Buildots",
    slug: "buildots",
    logo: { bg: "bg-[#6484A4]", text: "BD" },
    rating: 4.8,
    bestFor: "Construction Teams",
    description: "AI-powered construction monitoring platform that automates site progress tracking and reporting workflows.",
    pricing: "Custom",
    price: "Contact for pricing",
    isFeatured: true,
    reviewHref: "/ai-tools/buildots",
    affiliateHref: "#",
  },
  {
    rank: 4,
    category: "AI Productivity & Management",
    categoryHref: "/ai-tools/productivity",
    categoryColor: "bg-green-100 text-green-600",
    name: "Planner 5D",
    slug: "planner-5d",
    logo: { bg: "bg-green-600", text: "P5" },
    rating: 4.8,
    bestFor: "Interior Designers & Homeowners",
    description: "All-in-one AI design and planning tool to create professional 2D & 3D floor plans and interior layouts.",
    pricing: "Freemium",
    price: "From $7/month",
    isFeatured: true,
    reviewHref: "/ai-tools/planner-5d",
    affiliateHref: "#",
  },
  {
    rank: 5,
    category: "AI Sales & Lead Generation",
    categoryHref: "/ai-tools/sales",
    categoryColor: "bg-emerald-100 text-emerald-600",
    name: "REimagineHome",
    slug: "reimaginehome",
    logo: { bg: "bg-purple-700", text: "RH" },
    rating: 4.9,
    bestFor: "Real Estate Agents & Brokerages",
    description: "AI virtual staging and redesign tool that helps real estate agents generate more leads and close deals faster.",
    pricing: "Freemium",
    price: "From $29/month",
    isFeatured: true,
    reviewHref: "/ai-tools/reimaginehome",
    affiliateHref: "#",
  },
];

const CATEGORIES = [
  { name: "AI Design & Visualization",    href: "/ai-tools/design",            value: "design",             count: 13, color: "bg-violet-100",  iconColor: "text-violet-500" },
  { name: "AI Content & Marketing",       href: "/ai-tools/content-marketing", value: "content-marketing",  count: 18, color: "bg-purple-100",  iconColor: "text-purple-500" },
  { name: "AI Automation & Workflow",     href: "/ai-tools/automation",        value: "automation",         count: 16, color: "bg-orange-100",  iconColor: "text-orange-500" },
  { name: "AI Sales & Lead Generation",   href: "/ai-tools/sales",             value: "sales",              count: 10, color: "bg-green-100",   iconColor: "text-green-500" },
  { name: "AI Productivity & Management", href: "/ai-tools/productivity",      value: "productivity",       count: 17, color: "bg-yellow-100",  iconColor: "text-yellow-600" },
];


const CATEGORY_COLOR_MAP: Record<string, string> = {
  "content-marketing": "bg-blue-100 text-blue-600",
  design: "bg-purple-100 text-purple-600",
  automation: "bg-orange-100 text-orange-600",
  productivity: "bg-green-100 text-green-600",
  sales: "bg-emerald-100 text-emerald-600",
};

const INDUSTRY_ICON_MAP: Record<string, { emoji: string; color: string }> = {
  furniture: { emoji: "🪑", color: "bg-amber-100" },
  architecture: { emoji: "🏛️", color: "bg-slate-100" },
  construction: { emoji: "🏗️", color: "bg-orange-100" },
  realestate: { emoji: "🏙️", color: "bg-blue-100" },
};

const POPULAR_SEARCHES = ["ChatGPT", "Automation", "Writing", "No-code", "Marketing"];

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────

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

function CategoryIcon({ name, colorClass }: { name: string; colorClass: string }) {
  const icons: Record<string, React.ReactElement> = {
    "AI Design & Visualization": (
      <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    "AI Content & Marketing": (
      <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    "AI Automation & Workflow": (
      <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    "AI Sales & Lead Generation": (
      <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "AI Productivity & Management": (
      <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };
  return icons[name] ?? null;
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function HeroSection({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}) {
  const statBadges = [
    {
      value: "200+",
      label: "Tools Reviewed",
      icon: (
        <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      value: "12",
      label: "Categories",
      icon: (
        <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      value: "200+",
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
    <section className="bg-white pt-14 pb-10 sm:pt-20 sm:pb-14 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-orange-50 rounded-full blur-3xl -z-10 opacity-80" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-50 rounded-full blur-3xl -z-10 opacity-80" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-10 items-center">
          {/* Left */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-5 text-[#0EA5E9]">
              AI Tools for Every Workflow
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] leading-tight mb-5">
              Discover AI Tools<br />
              That Help You{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#9333EA] bg-clip-text text-transparent text-[1.3em]">
                Work Smarter
              </span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Explore the best AI writing, automation, marketing, productivity and agent tools tested for real business use. Save time, automate workflows and get more done with AI.
            </p>

            {/* Stat badges */}
            <div className="flex gap-3 mb-8">
              {statBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
                  <div className="shrink-0">{badge.icon}</div>
                  <div className="leading-none">
                    <p className="font-extrabold text-[#1E293B] text-sm">{badge.value}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{badge.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Search bar */}
            <div className="flex gap-2 mb-5">
              <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:border-orange-300 transition-colors">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools (e.g. writing, automation, productivity...)"
                  className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
                />
              </div>
              <button className="bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shrink-0 shadow-md shadow-orange-100">
                Search
              </button>
            </div>

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

          {/* Right — banner mockup image */}
          <div className="relative flex justify-center lg:justify-end lg:-translate-x-[35px]">
            <div className="absolute -top-8 right-4 w-60 h-60 bg-orange-100 rounded-full opacity-70 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 -left-4 w-52 h-52 bg-sky-100 rounded-full opacity-70 blur-3xl pointer-events-none" />

            <div
              className="relative w-full max-w-[480px]"
              style={{
                maskImage:
                  "radial-gradient(ellipse 90% 85% at 52% 46%, black 42%, rgba(0,0,0,0.75) 62%, rgba(0,0,0,0.3) 80%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 85% at 52% 46%, black 42%, rgba(0,0,0,0.75) 62%, rgba(0,0,0,0.3) 80%, transparent 100%)",
              }}
            >
              <Image
                src="/bannerMockupAITools.webp"
                alt="Why trust our reviews — AI Tools mockup"
                width={960}
                height={1020}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustrySection() {
  return (
    <section className="py-10 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-1">
          Looking for tools by industry?
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mb-6">
          Explore curated AI tools and workflows for your industry.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {INDUSTRY_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-2xl bg-white hover:border-orange-200 hover:shadow-md transition-all group"
            >
              {/* Image — full-width on mobile (+30% → h-[104px]), fixed 80px square on desktop */}
              <div className="relative w-full h-[104px] sm:w-20 sm:h-20 sm:shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text — slightly larger on mobile to match the bigger card */}
              <div className="flex-1">
                <p className="font-bold text-[#1E293B] text-sm sm:text-base mb-0.5 leading-tight">{card.label}</p>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>

              {/* Arrow — hidden on mobile stacked layout, shown on desktop row layout */}
              <span className="hidden sm:block text-gray-400 group-hover:text-[#F97316] transition-colors shrink-0">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TopPicksSection() {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👑</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">Top Picks</h2>
          </div>
          <a href="#" className="text-[#2B7FFF] text-sm font-semibold hover:opacity-80 hidden sm:block whitespace-nowrap">
            View all top picks →
          </a>
        </div>
        <p className="text-gray-500 text-sm mb-8">Our highest-rated AI tools this month</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {topPicks.map((tool) => (
            <div
              key={tool.rank}
              className="relative border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-orange-100 transition-all flex flex-col items-center text-center group"
            >
              {/* Rank badge */}
              <div
                className={`absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                  tool.rank === 1
                    ? "bg-[#F97316] text-white"
                    : tool.rank === 2
                    ? "bg-gray-300 text-gray-700"
                    : tool.rank === 3
                    ? "bg-amber-400 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tool.rank}
              </div>

              {/* Category badge */}
              <Link
                href={tool.categoryHref}
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${tool.categoryColor} hover:opacity-80 transition-opacity`}
              >
                {tool.category}
              </Link>

              {/* Logo */}
              <div className={`w-16 h-16 rounded-2xl ${tool.logo.bg} flex items-center justify-center mx-auto mt-4 mb-3 shrink-0 shadow-sm`}>
                <span className="text-white font-black text-sm">{tool.logo.text}</span>
              </div>

              <p className="font-semibold text-[#1E293B] text-sm mb-1">{tool.name}</p>

              <div className="flex items-center justify-center gap-1 mb-1">
                <StarRating rating={tool.rating} />
                <span className="text-xs font-bold text-[#1E293B]">{tool.rating}</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Editorial Rating</p>

              <span className="text-xs font-semibold text-blue-600 mb-2 block">{tool.bestFor}</span>

              <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-3 flex-1">{tool.description}</p>

              <div className="text-center mb-3">
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                    tool.pricing === "Freemium"
                      ? "bg-green-50 text-green-700"
                      : tool.pricing === "Paid"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {tool.pricing}
                </span>
                <p className="text-gray-400 text-xs mt-0.5">{tool.price}</p>
              </div>

              <Link
                href={tool.reviewHref}
                className="w-full bg-[#2B7FFF] hover:bg-blue-600 text-white font-semibold text-xs py-2 rounded-lg transition-colors mb-2 block text-center"
              >
                Read Review →
              </Link>
              {tool.affiliateHref !== "#" ? (
                <a
                  href={tool.affiliateHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-gray-200 hover:border-[#F97316] text-gray-600 hover:text-[#F97316] hover:bg-orange-50 font-semibold text-xs py-2 rounded-lg transition-colors block text-center"
                >
                  Visit Website ↗
                </a>
              ) : (
                <button className="w-full border border-gray-200 hover:border-[#F97316] text-gray-600 hover:text-[#F97316] hover:bg-orange-50 font-semibold text-xs py-2 rounded-lg transition-colors">
                  Visit Website ↗
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <a href="#" className="text-[#2B7FFF] text-sm font-semibold hover:opacity-80">
            View all top picks →
          </a>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-10 sm:py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-1.5">
          <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">Browse AI Tools by Category</h2>
        </div>
        <p className="text-gray-500 text-sm mb-8 ml-7">Find AI tools for every use case and workflow.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all p-4 group"
            >
              <div className={`w-9 h-9 rounded-xl ${cat.color} flex items-center justify-center shrink-0`}>
                <CategoryIcon name={cat.name} colorClass={cat.iconColor} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[#1E293B] text-xs sm:text-sm leading-tight group-hover:text-[#F97316] transition-colors line-clamp-2">
                  {cat.name}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">{cat.count} Tools</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/ai-tools" className="inline-flex items-center gap-1 text-[#2B7FFF] text-sm font-semibold hover:opacity-80">
            View all categories →
          </Link>
        </div>
      </div>
    </section>
  );
}

function AllToolsTable({
  searchQuery,
  categoryFilter,
  setCategoryFilter,
  pricingFilter,
  setPricingFilter,
  sortBy,
  setSortBy,
}: {
  searchQuery: string;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  pricingFilter: string;
  setPricingFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
}) {
  let filtered = ALL_TOOLS;

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.bestFor.toLowerCase().includes(q) ||
        t.keyFeatures.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }

  if (categoryFilter !== "All Categories") {
    filtered = filtered.filter((t) => t.category === categoryFilter);
  }

  if (pricingFilter !== "All Pricing") {
    filtered = filtered.filter((t) => t.pricing === pricingFilter);
  }

  if (sortBy === "Highest Rated") {
    filtered = [...filtered].sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.rating - a.rating;
    });
  } else if (sortBy === "Most Reviews") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "Name A-Z") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }

  const pricingOptions = ["All Pricing", "Freemium", "Paid"];
  const sortOptions = ["Highest Rated", "Most Reviews", "Name A-Z"];

  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">All AI Tools</h2>
            <p className="text-gray-500 text-sm mt-1">Explore our handpicked collection of the best AI tools for work.</p>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 bg-white focus:outline-none focus:border-orange-300 cursor-pointer"
            >
              <option value="All Categories">All Categories</option>
              {(Object.entries(CATEGORY_LABELS) as [string, string][]).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <select
              value={pricingFilter}
              onChange={(e) => setPricingFilter(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 bg-white focus:outline-none focus:border-orange-300 cursor-pointer"
            >
              {pricingOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 bg-white focus:outline-none focus:border-orange-300 cursor-pointer"
            >
              {sortOptions.map((s) => <option key={s}>Sort by: {s}</option>)}
            </select>
          </div>
        </div>

        {/* Table — desktop */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 font-semibold uppercase tracking-wide">
                <th className="text-left px-5 py-4 w-48">Tool</th>
                <th className="text-left px-4 py-4 w-40">Best For</th>
                <th className="text-left px-4 py-4">Key Features</th>
                <th className="text-left px-4 py-4 w-32">Pricing</th>
                <th className="text-left px-4 py-4 w-36">Rating</th>
                <th className="text-left px-4 py-4 w-28">Industries</th>
                <th className="text-left px-4 py-4 w-36">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((tool) => (
                <tr key={tool.name} className="hover:bg-gray-50/70 transition-colors">
                  {/* Tool */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${tool.logoBg} flex items-center justify-center shrink-0`}>
                        <span className={tool.logoTextClass}>{tool.logoText}</span>
                      </div>
                      <div>
                        <p className="font-bold text-[#1E293B] text-sm">{tool.name}</p>
                        <p className="text-gray-400 text-xs">{tool.company}</p>
                        <Link
                          href={`/ai-tools/${tool.category}`}
                          className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-1 ${CATEGORY_COLOR_MAP[tool.category]} hover:opacity-80 transition-opacity`}
                        >
                          {CATEGORY_LABELS[tool.category]}
                        </Link>
                      </div>
                    </div>
                  </td>
                  {/* Best For */}
                  <td className="px-4 py-4">
                    <p className="text-gray-600 text-xs leading-relaxed">{tool.bestFor}</p>
                  </td>
                  {/* Key Features */}
                  <td className="px-4 py-4 max-w-xs">
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{tool.keyFeatures}</p>
                  </td>
                  {/* Pricing */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1 ${
                        tool.pricing === "Freemium"
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {tool.pricing}
                    </span>
                    <p className="text-gray-400 text-xs">{tool.pricingDetail}</p>
                  </td>
                  {/* Rating */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 mb-0.5">
                      <StarRating rating={tool.rating} />
                      <span className="font-bold text-[#1E293B] text-xs">{tool.rating}</span>
                    </div>
                    <p className="text-gray-400 text-xs">Editorial Rating</p>
                  </td>
                  {/* Industries */}
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {tool.industries.map((ind) => (
                        <span
                          key={ind}
                          title={ind}
                          className={`text-sm w-6 h-6 rounded-md ${INDUSTRY_ICON_MAP[ind]?.color} flex items-center justify-center`}
                        >
                          {INDUSTRY_ICON_MAP[ind]?.emoji}
                        </span>
                      ))}
                    </div>
                  </td>
                  {/* Action */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1.5">
                      <Link
                        href={`/ai-tools/${tool.slug}`}
                        className="bg-[#2B7FFF] hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap text-center block"
                      >
                        Read Review →
                      </Link>
                      {tool.affiliateHref !== "#" ? (
                        <a
                          href={tool.affiliateHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-gray-200 hover:border-[#F97316] text-gray-600 hover:text-[#F97316] hover:bg-orange-50 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap text-center block"
                        >
                          Visit Website ↗
                        </a>
                      ) : (
                        <button className="border border-gray-200 hover:border-[#F97316] text-gray-600 hover:text-[#F97316] hover:bg-orange-50 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                          Visit Website ↗
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm">No tools match your filters. Try adjusting your search.</p>
            </div>
          )}
        </div>

        {/* Card list — mobile */}
        <div className="lg:hidden space-y-4">
          {filtered.map((tool) => (
            <div key={tool.name} className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${tool.logoBg} flex items-center justify-center shrink-0`}>
                  <span className={tool.logoTextClass}>{tool.logoText}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-[#1E293B] text-sm">{tool.name}</p>
                      <p className="text-gray-400 text-xs">{tool.company}</p>
                      <Link
                        href={`/ai-tools/${tool.category}`}
                        className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-1 ${CATEGORY_COLOR_MAP[tool.category]} hover:opacity-80 transition-opacity`}
                      >
                        {CATEGORY_LABELS[tool.category]}
                      </Link>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <StarRating rating={tool.rating} />
                      <span className="text-xs font-bold text-[#1E293B]">{tool.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-xs mb-1"><span className="font-medium">Best for:</span> {tool.bestFor}</p>
              <p className="text-gray-600 text-xs mb-3 line-clamp-2">{tool.keyFeatures}</p>
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1">
                  {tool.industries.map((ind) => (
                    <span key={ind} className={`text-xs w-6 h-6 rounded-md ${INDUSTRY_ICON_MAP[ind]?.color} flex items-center justify-center`}>
                      {INDUSTRY_ICON_MAP[ind]?.emoji}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link href={`/ai-tools/${tool.slug}`} className="bg-[#2B7FFF] text-white text-xs font-semibold px-3 py-1.5 rounded-lg block">
                    Read Review →
                  </Link>
                  {tool.affiliateHref !== "#" ? (
                    <a href={tool.affiliateHref} target="_blank" rel="noopener noreferrer" className="border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg block">
                      Visit ↗
                    </a>
                  ) : (
                    <button className="border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg">
                      Visit ↗
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">No tools match your filters.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <a href="#" className="inline-flex items-center gap-1 text-[#2B7FFF] text-sm font-semibold hover:opacity-80">
            View all tools →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AIToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [pricingFilter, setPricingFilter] = useState("All Pricing");
  const [sortBy, setSortBy] = useState("Highest Rated");

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <IndustrySection />
      <TopPicksSection />
      <CategoriesSection />
      <AllToolsTable
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        pricingFilter={pricingFilter}
        setPricingFilter={setPricingFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <Newsletter />
      <Footer />
    </div>
  );
}
