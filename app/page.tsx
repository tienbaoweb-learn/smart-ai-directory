"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = ["AI Tools", "Industries", "Best Of", "Resources", "About"];

const INDUSTRY_CARDS = [
  {
    id: "furniture",
    label: "Furniture",
    count: 18,
    icon: "🪑",
    bg: "from-amber-800 to-amber-600",
    desc: "Design, visualize, and sell furniture with AI-powered tools.",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    id: "architecture",
    label: "Architecture",
    count: 22,
    icon: "🏛️",
    bg: "from-slate-700 to-slate-500",
    desc: "Speed up design workflows and automate drafting with AI.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    id: "construction",
    label: "Construction",
    count: 24,
    icon: "🏗️",
    bg: "from-orange-800 to-orange-600",
    desc: "Optimize project management, safety, and cost estimation.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    id: "realestate",
    label: "Real Estate",
    count: 26,
    icon: "🏙️",
    bg: "from-blue-800 to-blue-600",
    desc: "Generate leads, price properties, and close deals faster.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
];

const TOOLS = [
  {
    id: 1,
    name: "Planner 5D",
    industry: "Furniture",
    industryColor: "bg-amber-100 text-amber-700",
    emoji: "🪑",
    emojiColor: "bg-amber-50",
    desc: "AI-powered interior design and furniture layout tool with photorealistic rendering.",
    rating: 4.7,
    reviews: "1,243",
  },
  {
    id: 2,
    name: "Archicad AI",
    industry: "Architecture",
    industryColor: "bg-slate-100 text-slate-700",
    emoji: "📐",
    emojiColor: "bg-slate-50",
    desc: "Intelligent BIM software that automates drafting and design documentation.",
    rating: 4.6,
    reviews: "987",
  },
  {
    id: 3,
    name: "Buildots",
    industry: "Construction",
    industryColor: "bg-orange-100 text-orange-700",
    emoji: "🏗️",
    emojiColor: "bg-orange-50",
    desc: "Computer vision AI that tracks construction progress automatically on-site.",
    rating: 4.7,
    reviews: "652",
  },
  {
    id: 4,
    name: "Offrs",
    industry: "Real Estate",
    industryColor: "bg-blue-100 text-blue-700",
    emoji: "🏠",
    emojiColor: "bg-blue-50",
    desc: "Predictive AI that identifies homeowners likely to sell before they list.",
    rating: 4.6,
    reviews: "834",
  },
  {
    id: 5,
    name: "Midjourney",
    industry: "Architecture",
    industryColor: "bg-slate-100 text-slate-700",
    emoji: "🎨",
    emojiColor: "bg-purple-50",
    desc: "Generate stunning architectural concepts and mood boards in seconds.",
    rating: 4.7,
    reviews: "3,102",
  },
  {
    id: 6,
    name: "Revaluate",
    industry: "Real Estate",
    industryColor: "bg-blue-100 text-blue-700",
    emoji: "📊",
    emojiColor: "bg-blue-50",
    desc: "AI that predicts which clients are ready to move with 83% accuracy.",
    rating: 4.6,
    reviews: "491",
  },
];

const BENEFITS = [
  {
    icon: "⏱️",
    title: "Save Time",
    desc: "Automate repetitive tasks so your team focuses on high-value work that actually moves the needle.",
  },
  {
    icon: "💰",
    title: "Reduce Costs",
    desc: "Cut overhead on manual labor and error-prone processes with purpose-built AI automation.",
  },
  {
    icon: "📈",
    title: "Increase Productivity",
    desc: "Do more with the same team. AI tools multiply output without multiplying headcount.",
  },
  {
    icon: "🧠",
    title: "Make Smarter Decisions",
    desc: "Turn raw project data into clear insights, forecasts, and actionable recommendations.",
  },
  {
    icon: "🚀",
    title: "Stay Ahead",
    desc: "Adopt AI before your competition does. Early movers in every industry win market share.",
  },
];

const ARTICLES = [
  {
    tag: "GUIDE",
    tagColor: "bg-blue-100 text-blue-700",
    title: "10 AI Interior Design Tools That Save You Hours Every Week",
    excerpt:
      "Discover the best AI tools that are transforming interior design workflows with AI-powered visualization and planning.",
    date: "May 20, 2025",
    readTime: "6 min read",
    thumbImg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    tag: "COMPARISON",
    tagColor: "bg-teal-100 text-teal-700",
    title: "ChatGPT vs Claude: Which AI Assistant Is Better for Your Business?",
    excerpt:
      "We compare ChatGPT and Claude on features, pricing, and real-world performance for professionals.",
    date: "May 15, 2025",
    readTime: "8 min read",
    thumbImg: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  },
  {
    tag: "TOOLS",
    tagColor: "bg-purple-100 text-purple-700",
    title: "Best AI Tools for Real Estate in 2026 [Tried & Tested]",
    excerpt:
      "Find leads and close more deals faster with these AI tools helping real estate professionals.",
    date: "May 10, 2025",
    readTime: "6 min read",
    thumbImg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
];

const FOOTER_COLS = [
  {
    title: "Explore",
    links: ["AI Tools", "Categories", "Best Of", "All Reviews", "Workflows"],
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
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#F97316] flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-[#1E293B] text-lg tracking-tight">
                SmartAI
              </span>
              <span className="text-[#F97316] text-xs font-semibold tracking-wide uppercase">
                for Work
              </span>
            </div>
          </a>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                className="flex items-center gap-1.5 text-[15px] font-medium text-[#1E293B] hover:text-[#F97316] px-4 py-2.5 rounded-md transition-colors"
              >
                {item}
                <ChevronDown />
              </button>
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
  return (
    <section className="bg-white pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden relative">
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest text-[#F97316] uppercase mb-5">
              AI Tools for Your Industry
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E293B] leading-tight mb-7">
              AI Tools That Power{" "}
              <span className="text-[#F97316]">Your Industry</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-xl leading-relaxed mb-10 max-w-lg">
              Discover handpicked AI tools for furniture, architecture,
              construction, and real estate. Save time, reduce costs, and grow
              your business with AI.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
              <button className="flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg shadow-orange-100">
                Explore AI Tools <span>→</span>
              </button>
              <button className="flex items-center justify-center gap-2 border-2 border-[#1E293B] text-[#1E293B] hover:bg-[#1E293B] hover:text-white font-bold text-base px-8 py-4 rounded-xl transition-colors">
                See Top Picks
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-x-8 sm:gap-y-3">
              {[
                "✅ 200+ AI Tools",
                "🔍 Expert Tested & Reviewed",
                "⚖️ Unbiased Independent Reviews",
                "🔄 Updated Weekly",
              ].map((badge) => (
                <span key={badge} className="text-sm text-gray-500 font-medium">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right — 2×2 industry card grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {INDUSTRY_CARDS.map((card) => (
              <div
                key={card.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-32 sm:h-48"
              >
                <Image
                  src={card.img}
                  alt={card.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="relative h-full flex flex-col justify-between p-3 sm:p-5">
                  <span className="text-lg sm:text-3xl">{card.icon}</span>
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
    { value: "20K+", label: "Professionals", icon: "👥" },
    { value: "50K+", label: "Monthly Visitors", icon: "📊" },
    { value: "4.9/5", label: "Average Rating", icon: "⭐" },
    { value: "100+", label: "Countries", icon: "🌍" },
  ];
  return (
    <section className="bg-gray-50 border border-gray-200 shadow-sm py-12 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-xs font-bold tracking-widest uppercase mb-8 sm:mb-10">
          Trusted by Professionals Worldwide
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-4 sm:px-6 py-2">
              <p className="text-2xl sm:text-3xl mb-2">{s.icon}</p>
              <p className="text-2xl sm:text-4xl font-extrabold text-slate-800 mb-1">
                {s.value}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">{s.label}</p>
            </div>
          ))}
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
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B]">
            Top AI Tools Across Industries
          </h2>
          <a
            href="#"
            className="text-[#F97316] text-sm font-semibold hover:underline hidden sm:block whitespace-nowrap"
          >
            View all tools →
          </a>
        </div>

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((tool) => (
            <div
              key={tool.id}
              className="border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-orange-100 transition-all group"
            >
              {/* Logo + name */}
              <div className="flex items-start gap-4 mb-3">
                <div
                  className={`w-14 h-14 rounded-xl ${tool.emojiColor} flex items-center justify-center text-2xl font-bold border-2 ${tool.industryColor.replace('text-', 'border-')} shrink-0`}
                >
                  {tool.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1E293B] text-base truncate">
                    {tool.name}
                  </p>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block ${tool.industryColor}`}
                  >
                    {tool.industry}
                  </span>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                {tool.desc}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={tool.rating} />
                <span className="text-sm font-bold text-[#1E293B]">
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
            className="text-[#F97316] text-sm font-semibold hover:underline"
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
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mb-4">
            How AI Helps Your Business
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            Whether you're managing a job site or a design studio, AI tools
            deliver measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-3xl mb-5 shrink-0">
                {b.icon}
              </div>
              <p className="font-bold text-[#1E293B] text-base mb-2">
                {b.title}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestInsights() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mb-2">
              Latest AI Insights & Guides
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Stay up to date with expert reviews, comparisons, and how-to
              guides.
            </p>
          </div>
          <a
            href="#"
            className="text-[#F97316] text-sm font-semibold hover:underline hidden sm:block whitespace-nowrap"
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
            className="text-[#F97316] text-sm font-semibold hover:underline"
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
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0EA5E9] to-[#F97316]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">
          📬
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Get Weekly AI Tools & Industry Insights
        </h2>
        <p className="text-white/70 text-sm sm:text-base mb-8">
          Join 100,000+ professionals who get the best AI tools, guides, and
          industry news delivered every week.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
          />
          <button className="bg-[#1E293B] hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
            Subscribe Now
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5 text-white/60 text-xs">
          {["🚫 No spam", "🔓 Unsubscribe anytime", "💯 100% Free"].map((b) => (
            <span key={b}>{b}</span>
          ))}
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
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-white text-base">
                  SmartAI
                </span>
                <span className="text-[#F97316] text-xs font-semibold uppercase tracking-wide">
                  for Work
                </span>
              </div>
            </div>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-5">
              The world's largest directory of AI tools for the built
              environment industries.
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
              Weekly AI tools and insights for industry professionals.
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
  const [offset, setOffset] = useState(0);
  const cardWidth = 272; // w-64 (256) + gap-4 (16)
  const maxOffset = (INDUSTRY_CARDS.length - 3) * cardWidth;

  useEffect(() => {
    let currentOffset = 0;
    const interval = setInterval(() => {
      currentOffset = (currentOffset + cardWidth) % ((maxOffset + cardWidth));
      setOffset(currentOffset);
    }, 5000); // Scroll every 5 seconds

    return () => clearInterval(interval);
  }, [cardWidth, maxOffset]);

  return (
    <section className="py-20 bg-gray-50">
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

        {/* Slider wrapper */}
        <div className="relative -mx-4 sm:mx-0">
          {/* Left arrow */}
          <button
            onClick={() => setOffset((o) => Math.max(0, o - cardWidth))}
            disabled={offset === 0}
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-white border-2 border-gray-200 shadow-md flex items-center justify-center text-gray-400 hover:border-[#F97316] hover:text-[#F97316] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
          >
            ←
          </button>

          {/* Cards track */}
          <div className="overflow-hidden px-4 sm:px-0">
            <div
              className="flex gap-4 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {INDUSTRY_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="relative flex-shrink-0 w-64 h-72 rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={card.img}
                    alt={card.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                  {/* Center icon in white circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-lg">
                      {card.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div></div>
                    <div>
                      <p className="text-white font-extrabold text-xl mb-1">
                        {card.label}
                      </p>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">
                        {card.desc}
                      </p>
                      <span className="inline-flex items-center gap-1 bg-white/90 hover:bg-white text-[#F97316] text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
                        Explore Tools →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => setOffset((o) => Math.min(maxOffset, o + cardWidth))}
            disabled={offset >= maxOffset}
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-white border-2 border-gray-200 shadow-md flex items-center justify-center text-gray-400 hover:border-[#F97316] hover:text-[#F97316] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
          >
            →
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {INDUSTRY_CARDS.map((card, i) => (
            <button
              key={card.id}
              onClick={() => setOffset(Math.min(i * cardWidth, maxOffset))}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.round(offset / cardWidth) === i
                  ? "bg-[#F97316] w-5"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
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
