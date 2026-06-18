"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { ALL_TOOLS } from "./data/tools";
import { TOOL_LOGO_URLS } from "./data/tool-logos";

// ─── DATA ───────────────────────────────────────────────────────────────────

const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  "interior-design": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-pink-600">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  furniture: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-amber-700">
      <path d="M2 8h20v10H2z" />
      <path d="M6 8V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
      <line x1="6" y1="18" x2="6" y2="21" />
      <line x1="18" y1="18" x2="18" y2="21" />
      <line x1="2" y1="13" x2="22" y2="13" />
    </svg>
  ),
  architecture: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-slate-600">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
      <rect x="10" y="9" width="4" height="4" />
    </svg>
  ),
  construction: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-orange-600">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M12 6V2" />
      <path d="M8 6V4" />
      <path d="M16 6V4" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
  realestate: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-blue-600">
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  ),
};

const INDUSTRY_CARDS = [
  {
    id: "interior-design",
    href: "/industries/interior-design",
    label: "Interior Design",
    count: 20,
    bg: "from-pink-800 to-pink-600",
    desc: "Visualize, plan, and transform interior spaces faster with AI.",
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
  },
  {
    id: "furniture",
    href: "/industries/furniture",
    label: "Furniture",
    count: 18,
    bg: "from-amber-800 to-amber-600",
    desc: "Design, visualize, and sell furniture smarter with AI.",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    id: "architecture",
    href: "/industries/architecture",
    label: "Architecture",
    count: 22,
    bg: "from-slate-700 to-slate-500",
    desc: "Design, plan, and visualize architecture projects with AI.",
    img: "https://images.unsplash.com/photo-1492091501265-be9af13d99fc?w=600&q=80",
  },
  {
    id: "construction",
    href: "/industries/construction",
    label: "Construction",
    count: 24,
    bg: "from-orange-800 to-orange-600",
    desc: "Plan, build, and manage construction projects efficiently with AI.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    id: "realestate",
    href: "/industries/real-estate",
    label: "Real Estate",
    count: 26,
    bg: "from-blue-800 to-blue-600",
    desc: "Find leads, value properties, and close deals faster with AI.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
];

// Hero 2×2 cards → link to Best Of pages
const HERO_CARDS = [
  {
    id: "interior-design",
    href: "/best-of/interior-design",
    label: "Interior Design",
    count: 20,
    img: "https://plus.unsplash.com/premium_photo-1661962771640-426ce94f16c6?w=600&q=80",
  },
  {
    id: "architecture",
    href: "/best-of/architecture",
    label: "Architecture",
    count: 22,
    img: "https://images.unsplash.com/photo-1489465033131-30f7e2025f68?w=600&q=80",
  },
  {
    id: "construction",
    href: "/best-of/construction",
    label: "Construction",
    count: 24,
    img: "https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=600&q=80",
  },
  {
    id: "realestate",
    href: "/best-of/real-estate",
    label: "Real Estate",
    count: 26,
    img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80",
  },
];

const TOOLS = [
  {
    id: 1,
    slug: "planner-5d",
    name: "Planner 5D",
    industry: "Furniture",
    industryColor: "bg-amber-100 text-amber-700",
    logoBg: "bg-green-500",
    logoText: "5d",
    logoTextColor: "text-white text-lg font-black",
    desc: "AI interior design & room planning",
    rating: 4.8,
    category: "design",
  },
  {
    id: 2,
    slug: "archicad-ai",
    name: "Archicad AI",
    industry: "Architecture",
    industryColor: "bg-slate-100 text-slate-700",
    logoBg: "bg-white border border-gray-200",
    logoText: "AC",
    logoTextColor: "text-blue-600 text-base font-black",
    desc: "AI-enhanced BIM for architectural design",
    rating: 4.7,
    category: "design",
  },
  {
    id: 3,
    slug: "buildots",
    name: "Buildots",
    industry: "Construction",
    industryColor: "bg-orange-100 text-orange-700",
    logoBg: "bg-white border border-gray-200",
    logoText: "●",
    logoTextColor: "text-gray-900 text-2xl",
    desc: "AI construction progress tracking & analytics",
    rating: 4.6,
    category: "automation",
  },
  {
    id: 4,
    slug: "offrs",
    name: "Offrs",
    industry: "Real Estate",
    industryColor: "bg-blue-100 text-blue-700",
    logoBg: "bg-white border border-gray-200",
    logoText: "offrs",
    logoTextColor: "text-gray-900 text-xs font-black tracking-tight",
    desc: "AI lead generation for real estate agents",
    rating: 4.9,
    category: "sales",
  },
  {
    id: 5,
    slug: "midjourney",
    name: "Midjourney",
    industry: "Interior Design",
    industryColor: "bg-pink-100 text-pink-700",
    logoBg: "bg-gray-900",
    logoText: "MJ",
    logoTextColor: "text-white text-sm font-black",
    desc: "AI image generation for concept visualizations",
    rating: 4.8,
    category: "design",
  },
  {
    id: 6,
    slug: "revaluate",
    name: "Revaluate",
    industry: "Real Estate",
    industryColor: "bg-blue-100 text-blue-700",
    logoBg: "bg-red-600",
    logoText: "R",
    logoTextColor: "text-white text-xl font-black",
    desc: "AI property valuation & market insights",
    rating: 4.7,
    category: "sales",
  },
];

const BENEFIT_ICONS = [
  // Clock - Save Time
  <svg key="time" className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" /></svg>,
  // Dollar - Reduce Costs
  <svg key="cost" className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  // Chart - Increase Productivity
  <svg key="prod" className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  // Brain - Make Smarter Decisions
  <svg key="smart" className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  // Rocket - Stay Ahead
  <svg key="ahead" className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.818m2.784-7.421A6 6 0 016.592 9.6" /></svg>,
];

const BENEFIT_CIRCLE_BG = [
  "bg-orange-100",
  "bg-green-100",
  "bg-orange-100",
  "bg-purple-100",
  "bg-sky-100",
];

const BENEFITS = [
  {
    title: "Save Time",
    desc: "Automate repetitive tasks and focus on what matters.",
  },
  {
    title: "Reduce Costs",
    desc: "Cut operational costs and improve efficiency.",
  },
  {
    title: "Increase Productivity",
    desc: "Get more done in less time with AI-powered tools.",
  },
  {
    title: "Make Smarter Decisions",
    desc: "Leverage data and AI insights to make better decisions.",
  },
  {
    title: "Stay Ahead",
    desc: "Innovate faster and stay ahead of the competition.",
  },
];

const ARTICLES = [
  {
    tag: "GUIDE",
    tagColor: "bg-blue-100 text-blue-700",
    title: "10 AI Interior Design Tools That Save You Hours Every Week",
    excerpt:
      "Discover the best AI tools for furniture design and interior visualization.",
    date: "May 20, 2026",
    readTime: "7 min read",
    thumbImg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    tag: "COMPARISON",
    tagColor: "bg-teal-100 text-teal-700",
    title: "ChatGPT vs Claude: Which AI Assistant Is Better for Your Business?",
    excerpt:
      "We compare ChatGPT and Claude to help you choose the right AI assistant for your workflow.",
    date: "May 18, 2026",
    readTime: "8 min read",
    thumbImg: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  },
  {
    tag: "TOOLS",
    tagColor: "bg-purple-100 text-purple-700",
    title: "Best AI Tools for Real Estate in 2026 [Tried & Tested]",
    excerpt:
      "The top AI tools helping real estate professionals find leads and close more deals.",
    date: "May 15, 2026",
    readTime: "6 min read",
    thumbImg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
];

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= Math.floor(rating) ? "text-amber-400" : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function HeroSection() {
  const trustBadges = [
    {
      bold: "200+",
      light: "AI Tools",
      icon: (
        <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      bold: "Expert",
      light: "Tested & Reviewed",
      icon: (
        <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      bold: "Unbiased",
      light: "Independent Reviews",
      icon: (
        <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      bold: "Updated",
      light: "Weekly",
      icon: (
        <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="hero" className="bg-white pt-16 sm:pt-24 pb-8 sm:pb-12 overflow-hidden relative">
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 items-center">
          {/* Left */}
          <div>
            <span className="inline-block px-4 py-2 bg-orange-50 text-xs font-bold tracking-widest uppercase mb-5 rounded-full bg-gradient-to-r from-[#F97316] via-[#F59E0B] to-[#0EA5E9] bg-clip-text text-transparent border border-orange-200">
              AI Tools for Your Industry
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E293B] leading-tight mb-7">
              AI Tools That Power{" "}
              <span className="bg-gradient-to-r from-[#F97316] via-[#F59E0B] to-[#0EA5E9] bg-clip-text text-transparent">Your Industry</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-xl leading-relaxed mb-10 max-w-lg">
              Discover handpicked AI tools for furniture, architecture,
              construction, and real estate. Save time, reduce costs, and grow
              your business with AI.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
              <Link href="/ai-tools" className="flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange-100">
                Explore AI Tools <span>→</span>
              </Link>
              <Link href="/ai-tools#top-picks" className="flex items-center justify-center gap-2 border-2 border-[#1E293B] text-[#1E293B] hover:bg-[#2B7FFF] hover:border-[#2B7FFF] hover:text-white font-bold text-base px-8 py-4 rounded-xl transition-colors">
                See Top Picks
              </Link>
            </div>

            {/* Trust badges with icons */}
            <div className="flex gap-4 sm:gap-6 flex-wrap">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-0.5 shrink-0">{badge.icon}</div>
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-gray-700">{badge.bold}</span>
                    <br />
                    <span className="text-gray-500">{badge.light}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 2×2 industry card grid → Best Of pages */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {HERO_CARDS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-40 sm:h-60 block"
              >
                <Image
                  src={card.img}
                  alt={card.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="relative h-full flex flex-col justify-between p-3 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                    {INDUSTRY_ICONS[card.id]}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm sm:text-lg leading-tight">
                      {card.label}
                    </p>
                    <p className="text-white/80 text-xs sm:text-sm">
                      {card.count} AI Tools
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    {
      value: "200+",
      label: "AI Tools Reviewed",
      iconBg: "bg-[#eff4fd]",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      value: "5",
      label: "Industries Covered",
      iconBg: "bg-[#eff4fd]",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
      ),
    },
    {
      value: "80+",
      label: "Hours of Testing",
      iconBg: "bg-amber-50",
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-2M9 3a2 2 0 002 2h2a2 2 0 002-2M9 3a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      value: "Weekly",
      label: "Updated Rankings",
      iconBg: "bg-teal-50",
      icon: (
        <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
  ];
  return (
    <section id="stats" className="py-6 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading - outside frame */}
        <p className="text-[27px] font-bold text-[#1E293B] text-center tracking-wide mb-4 sm:mb-6">
          Built on Real Research, Not Guesswork
        </p>

        {/* Stats container */}
        <div className="bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300 transition-all rounded-[20px] py-5 sm:py-6 px-4 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex gap-3 sm:gap-4 items-start">
                {/* Icon column */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${s.iconBg} flex items-center justify-center`}>
                    {s.icon}
                  </div>
                </div>

                {/* Text column */}
                <div className="flex flex-col justify-center">
                  <p className="text-xl sm:text-3xl font-extrabold text-slate-800">
                    {s.value}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm font-medium">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Logo lookup từ app/data/tools.ts (single source of truth với review pages)
const TOOL_LOGO_MAP = Object.fromEntries(
  ALL_TOOLS.map((t) => [t.slug, { logoBg: t.logoBg, logoText: t.logoText, logoTextClass: t.logoTextClass }])
);

function TopTools() {
  const tabs = [
    "All",
    "Interior Design",
    "Furniture",
    "Architecture",
    "Construction",
    "Real Estate",
  ];
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? TOOLS : TOOLS.filter((t) => t.industry === active);

  return (
    <section id="top-tools" className="pt-[41px] pb-16 sm:pt-[52px] sm:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B]">
            Top AI Tools Across Industries
          </h2>
          <Link
            href="/ai-tools"
            className="text-[#2B7FFF] text-sm font-semibold hover:opacity-80 hidden sm:block whitespace-nowrap"
          >
            View all tools →
          </Link>
        </div>
        <p className="text-gray-500 text-sm sm:text-base mb-8">Most popular and highly rated AI tools</p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border whitespace-nowrap transition-colors ${
                active === tab
                  ? "bg-[#F97316] border-[#F97316] text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#F97316] hover:text-[#F97316]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {filtered.map((tool) => (
            <div
              key={tool.id}
              className="relative border border-gray-100 rounded-2xl p-[15px] sm:p-[26px] pt-[42px] sm:pt-[47px] hover:shadow-lg hover:border-orange-100 transition-all group flex flex-col items-center text-center"
            >
              {/* Industry tag — absolute top-left, 5% from border */}
              <span className={`absolute top-[5%] left-[5%] text-xs font-semibold px-2 py-0.5 rounded-full ${tool.industryColor}`}>
                {tool.industry}
              </span>

              {/* Logo — ưu tiên logo image từ review page, fallback về colored box */}
              {TOOL_LOGO_URLS[tool.slug] ? (
                <div className="w-[62px] h-[62px] rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-3 shrink-0 overflow-hidden p-1.5">
                  <Image
                    src={TOOL_LOGO_URLS[tool.slug]}
                    alt={tool.name}
                    width={52}
                    height={52}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className={`w-[62px] h-[62px] rounded-xl ${tool.logoBg} flex items-center justify-center mb-3 shrink-0`}>
                  <span className={`${tool.logoTextColor} leading-none`}>{tool.logoText}</span>
                </div>
              )}

              {/* Name */}
              <p className="font-bold text-[#1E293B] text-sm mb-1">{tool.name}</p>

              <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                {tool.desc}
              </p>

              {/* Rating — centered */}
              <div className="flex items-center justify-center gap-1 mb-4">
                <StarRating rating={tool.rating} />
                <span className="text-xs font-bold text-[#1E293B]">
                  {tool.rating}
                </span>
              </div>

              <Link
                href={`/ai-tools/${tool.slug}`}
                className="w-full border border-[#F97316] text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white font-semibold text-sm py-2.5 rounded-xl transition-colors block text-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/ai-tools"
            className="text-[#2B7FFF] text-sm font-semibold hover:opacity-80"
          >
            View all tools →
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowAIHelps() {
  return (
    <section id="how-ai-helps" className="py-8 sm:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mb-10 sm:mb-12">
          How AI Helps Your Business
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all flex flex-row items-start gap-4"
            >
              <div className={`w-12 h-12 rounded-full ${BENEFIT_CIRCLE_BG[i]} flex items-center justify-center shrink-0`}>
                {BENEFIT_ICONS[i]}
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-[#1E293B] text-sm mb-1">{b.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestInsights() {
  return (
    <section id="insights" className="pt-[41px] pb-[38px] sm:pt-[52px] sm:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mb-2">
              Latest AI Insights &amp; Guides
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Stay up to date with expert reviews, comparisons, and how-to
              guides.
            </p>
          </div>
          <a
            href="#"
            className="bg-gradient-to-r from-[#F97316] via-[#F59E0B] to-[#0EA5E9] bg-clip-text text-transparent text-sm font-semibold hover:opacity-80 hidden sm:block whitespace-nowrap"
          >
            View all articles →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {ARTICLES.map((a, i) => (
            <article
              key={i}
              className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <Image
                  src={a.thumbImg}
                  alt={a.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${a.tagColor}`}
                >
                  {a.tag}
                </span>
                <h3 className="mt-3 font-bold text-[#1E293B] text-base leading-snug group-hover:text-[#F97316] transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">
                  {a.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                  <span>{a.date}</span>
                  <span>·</span>
                  <span>{a.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <a
            href="#"
            className="bg-gradient-to-r from-[#F97316] via-[#F59E0B] to-[#0EA5E9] bg-clip-text text-transparent text-sm font-semibold hover:opacity-80"
          >
            View all articles →
          </a>
        </div>
      </div>
    </section>
  );
}


// ─── PAGE ────────────────────────────────────────────────────────────────────
function ExploreByIndustry() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  function slide(dir: "prev" | "next") {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | null;
    const cardW = card ? card.offsetWidth + 24 : el.clientWidth / 4;
    el.scrollBy({ left: dir === "next" ? cardW : -cardW, behavior: "smooth" });
  }

  return (
    <section id="explore" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mb-2">
              Explore AI Tools by Industry
            </h2>
            <p className="text-gray-500 text-base sm:text-lg">
              Find the perfect AI tools tailored to your industry needs.
            </p>
          </div>
          {/* Arrow buttons */}
          <div className="flex gap-2 flex-shrink-0 ml-6">
            <button
              onClick={() => slide("prev")}
              disabled={!canPrev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-[#F97316] hover:border-[#F97316] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => slide("next")}
              disabled={!canNext}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-[#F97316] hover:border-[#F97316] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {INDUSTRY_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="flex-none rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow bg-white block w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
            >
              {/* Image area with centered icon */}
              <div className="relative h-44 sm:h-52">
                <Image
                  src={card.img}
                  alt={card.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                {/* Center icon in white circle */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                    {INDUSTRY_ICONS[card.id]}
                  </div>
                </div>

                {/* Industry name overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <p className="text-white font-extrabold text-lg">{card.label}</p>
                </div>
              </div>

              {/* Content below image */}
              <div className="p-5">
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {card.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-[#2B7FFF] text-sm font-bold hover:opacity-80">
                  Explore Tools →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ExploreByIndustry />
      <TopTools />
      <HowAIHelps />
      <LatestInsights />
      <Newsletter />
      <Footer />
    </div>
  );
}
