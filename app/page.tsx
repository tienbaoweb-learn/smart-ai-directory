"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "AI Tools", href: "#top-tools" },
  { label: "Industries", href: "#explore" },
  { label: "Best Of", href: "#top-tools" },
  { label: "Resources", href: "#insights" },
  { label: "About", href: "#newsletter" },
];

const INDUSTRY_CARDS = [
  {
    id: "furniture",
    label: "Furniture",
    count: 18,
    icon: "🪑",
    bg: "from-amber-800 to-amber-600",
    desc: "Design, visualize, and sell furniture smarter with AI.",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    id: "architecture",
    label: "Architecture",
    count: 22,
    icon: "🏛️",
    bg: "from-slate-700 to-slate-500",
    desc: "Design, plan, and visualize architecture projects with AI.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    id: "construction",
    label: "Construction",
    count: 24,
    icon: "🏗️",
    bg: "from-orange-800 to-orange-600",
    desc: "Plan, build, and manage construction projects efficiently with AI.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    id: "realestate",
    label: "Real Estate",
    count: 26,
    icon: "🏙️",
    bg: "from-blue-800 to-blue-600",
    desc: "Find leads, value properties, and close deals faster with AI.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
];

const TOOLS = [
  {
    id: 1,
    name: "Planner 5D",
    industry: "Furniture",
    industryColor: "bg-amber-100 text-amber-700",
    logoBg: "bg-green-500",
    logoText: "5d",
    logoTextColor: "text-white text-lg font-black",
    desc: "AI interior design & room planning",
    rating: 4.8,
    reviews: "3,520",
  },
  {
    id: 2,
    name: "Archicad AI",
    industry: "Architecture",
    industryColor: "bg-slate-100 text-slate-700",
    logoBg: "bg-white border border-gray-200",
    logoText: "AC",
    logoTextColor: "text-blue-600 text-base font-black",
    desc: "AI-enhanced BIM for architectural design",
    rating: 4.7,
    reviews: "256",
  },
  {
    id: 3,
    name: "Buildots",
    industry: "Construction",
    industryColor: "bg-orange-100 text-orange-700",
    logoBg: "bg-white border border-gray-200",
    logoText: "●",
    logoTextColor: "text-gray-900 text-2xl",
    desc: "AI construction progress tracking & analytics",
    rating: 4.6,
    reviews: "199",
  },
  {
    id: 4,
    name: "Offrs",
    industry: "Real Estate",
    industryColor: "bg-blue-100 text-blue-700",
    logoBg: "bg-white border border-gray-200",
    logoText: "offrs",
    logoTextColor: "text-gray-900 text-xs font-black tracking-tight",
    desc: "AI lead generation for real estate agents",
    rating: 4.9,
    reviews: "412",
  },
  {
    id: 5,
    name: "Midjourney",
    industry: "Architecture",
    industryColor: "bg-slate-100 text-slate-700",
    logoBg: "bg-gray-900",
    logoText: "MJ",
    logoTextColor: "text-white text-sm font-black",
    desc: "AI image generation for concept visualizations",
    rating: 4.8,
    reviews: "532",
  },
  {
    id: 6,
    name: "Revaluate",
    industry: "Real Estate",
    industryColor: "bg-blue-100 text-blue-700",
    logoBg: "bg-red-600",
    logoText: "R",
    logoTextColor: "text-white text-xl font-black",
    desc: "AI property valuation & market insights",
    rating: 4.7,
    reviews: "506",
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

const FOOTER_COLS = [
  {
    title: "Explore",
    links: ["AI Tools", "By Industry", "Best Of", "All Reviews", "Workflows"],
  },
  {
    title: "Industries",
    links: ["Furniture", "Architecture", "Construction", "Real Estate"],
  },
  {
    title: "Resources",
    links: ["Guides", "Comparisons", "AI Glossary", "Submit a Tool"],
  },
  {
    title: "Company",
    links: ["About Us", "Contact", "Privacy Policy", "Terms of Use"],
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

function ChevronDown() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Logo */}
          <a href="#" className="shrink-0">
            <Image
              src="/SmartaiforworkLogo.webp"
              alt="SmartAI for Work"
              width={160}
              height={50}
              className="h-11 w-auto"
              priority
            />
          </a>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 text-[15px] font-medium text-[#1E293B] hover:text-[#F97316] px-4 py-2.5 rounded-md transition-colors"
              >
                {item.label}
                <ChevronDown />
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="p-2.5 text-gray-500 hover:text-[#F97316] transition-colors rounded-md">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
                />
              </svg>
            </button>
            <button className="hidden sm:inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-orange-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

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
              <a href="#explore" className="flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange-100">
                Explore AI Tools <span>→</span>
              </a>
              <a href="#top-tools" className="flex items-center justify-center gap-2 border-2 border-[#1E293B] text-[#1E293B] hover:bg-[#2B7FFF] hover:border-[#2B7FFF] hover:text-white font-bold text-base px-8 py-4 rounded-xl transition-colors">
                See Top Picks
              </a>
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

          {/* Right — 2×2 industry card grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {INDUSTRY_CARDS.map((card) => (
              <div
                key={card.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-40 sm:h-60"
              >
                <Image
                  src={card.img}
                  alt={card.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="relative h-full flex flex-col justify-between p-3 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-lg sm:text-3xl shadow-md">
                    {card.icon}
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
              </div>
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
      value: "20K+",
      label: "Professionals",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      value: "50K+",
      label: "Monthly Visitors",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      value: "4.9/5",
      label: "Average Rating",
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
    },
    {
      value: "100+",
      label: "Countries",
      icon: (
        <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];
  return (
    <section id="stats" className="py-6 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading - outside frame */}
        <p className="text-[34px] font-semibold text-gray-500 text-center tracking-wide mb-4 sm:mb-6">
          Trusted by Professionals Worldwide
        </p>

        {/* Stats container */}
        <div className="bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300 transition-all rounded-[20px] py-5 sm:py-6 px-4 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex gap-3 sm:gap-4 items-start">
                {/* Icon column */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#eff4fd] flex items-center justify-center">
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

function TopTools() {
  const tabs = [
    "All",
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
          <a
            href="#"
            className="text-[#2B7FFF] text-sm font-semibold hover:opacity-80 hidden sm:block whitespace-nowrap"
          >
            View all tools →
          </a>
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

        {/* Tool grid — gap reduced 35% */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {filtered.map((tool) => (
            <div
              key={tool.id}
              className="relative border border-gray-100 rounded-2xl p-3 sm:p-5 pt-8 sm:pt-9 hover:shadow-lg hover:border-orange-100 transition-all group flex flex-col items-center text-center"
            >
              {/* Industry tag — absolute top-left, 5% from border */}
              <span className={`absolute top-[5%] left-[5%] text-xs font-semibold px-2 py-0.5 rounded-full ${tool.industryColor}`}>
                {tool.industry}
              </span>

              {/* Logo — centered */}
              <div className={`w-14 h-14 rounded-xl ${tool.logoBg} flex items-center justify-center mb-3 shrink-0`}>
                <span className={`${tool.logoTextColor} leading-none`}>{tool.logoText}</span>
              </div>

              {/* Name */}
              <p className="font-bold text-[#1E293B] text-sm mb-1">{tool.name}</p>

              <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                {tool.desc}
              </p>

              {/* Rating — centered */}
              <div className="flex items-center justify-center gap-1.5 mb-4">
                <StarRating rating={tool.rating} />
                <span className="text-xs font-bold text-[#1E293B]">
                  {tool.rating}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  ({tool.reviews})
                </span>
              </div>

              <button className="w-full border border-[#F97316] text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <a
            href="#"
            className="text-[#2B7FFF] text-sm font-semibold hover:opacity-80"
          >
            View all tools →
          </a>
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
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 shrink-0">
                {BENEFIT_ICONS[i]}
              </div>
              <p className="font-bold text-[#1E293B] text-sm mb-2">
                {b.title}
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestInsights() {
  return (
    <section id="insights" className="pt-[41px] pb-16 sm:pt-[52px] sm:pb-20 bg-white">
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

function Newsletter() {
  return (
    <section id="newsletter" className="py-0 bg-white">
      <div className="max-w-[1215px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-3 bg-gradient-to-r from-[#FFF0E0] via-[#FFFCF0] to-[#E0F2FF] rounded-3xl">
        <div className="rounded-2xl overflow-hidden grid sm:grid-cols-2">
          {/* Left — blue gradient matching reference */}
          <div className="bg-gradient-to-br from-[#1A56DB] to-[#1E40AF] p-4 sm:p-6 flex flex-col justify-center">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white mb-2 leading-snug">
              Get Weekly AI Tools &amp; Industry Insights
            </h2>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Join 10,000+ professionals who get the best AI tools, tips, and
              workflows every week.
            </p>
          </div>

          {/* Right — orange gradient matching reference */}
          <div className="bg-gradient-to-br from-[#F97316] to-[#EA580C] p-4 sm:p-6 flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-3 py-2.5 rounded-xl text-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-[#1E293B] hover:bg-slate-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap text-sm">
                Subscribe Now
              </button>
            </div>

            <div className="flex flex-wrap gap-3 text-white/80 text-xs">
              {["✓ No spam", "✓ Unsubscribe anytime", "✓ 100% Free"].map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white pt-12 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mb-12">
          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <Image
                src="/SmartaiforworkLogo.webp"
                alt="SmartAI for Work"
                width={120}
                height={38}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-5">
              Helping professionals in furniture, architecture, construction, and
              real estate work smarter with AI.
            </p>
            <div className="flex gap-2">
              {[
                { label: "X", icon: "✕" },
                { label: "LinkedIn", icon: "in" },
                { label: "YouTube", icon: "▶" },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F97316] flex items-center justify-center text-xs font-bold transition-colors"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Cols 2-5 — Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p className="font-bold text-xs sm:text-sm text-white mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Col 6 — Newsletter */}
          <div>
            <p className="font-bold text-xs sm:text-sm text-white mb-4">Newsletter</p>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4">
              Get the latest AI tools and insights delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/40"
              />
              <button className="bg-[#F97316] hover:bg-orange-500 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors shrink-0">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-8">
          <p className="text-xs text-[#777F8A] leading-relaxed">
            Disclaimer: Some links on this page are affiliate links, meaning we may earn a commission at no cost to you. We only recommend tools we believe provide real value. This helps support our independent research. Thank you!
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-white/40 text-xs">
          <p>© 2026 SmartAI for Work. All rights reserved.</p>
          <span className="hidden sm:inline">·</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
function ExploreByIndustry() {
  return (
    <section id="explore" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mb-4">
            Explore AI Tools by Industry
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            Find the perfect AI tools tailored to your industry needs.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {INDUSTRY_CARDS.map((card) => (
            <div
              key={card.id}
              className="rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow bg-white"
            >
              {/* Image area with centered icon */}
              <div className="relative h-36 sm:h-48">
                <Image
                  src={card.img}
                  alt={card.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                {/* Center icon in white circle */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-lg">
                    {card.icon}
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
                <a
                  href="#top-tools"
                  className="inline-flex items-center gap-1 text-[#2B7FFF] text-sm font-bold hover:opacity-80"
                >
                  Explore Tools →
                </a>
              </div>
            </div>
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
