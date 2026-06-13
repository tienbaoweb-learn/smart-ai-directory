import React from "react";
import Link from "next/link";
import { BarChart3, Building2, ClipboardCheck, Clock, DollarSign, FlaskConical, HardHat, Home, Lightbulb, Mail, RefreshCw, Rocket, Sofa, Sparkles, Star, Tag, TrendingUp, Trophy, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

// ─── ARTICLES DATA ────────────────────────────────────────────────────────────

const ARTICLES = [
  {
    badge: "REVIEW",
    badgeClass: "text-blue-600",
    title: "Top AI Tools for Architects (June 2026)",
    date: "Jun 5, 2026",
    readTime: "8 min read",
    imageHint: "modern architecture building exterior",
  },
  {
    badge: "RANKING",
    badgeClass: "text-orange-600",
    title: "Best AI Tools for Construction Teams",
    date: "Jun 4, 2026",
    readTime: "9 min read",
    imageHint: "construction site with crane",
  },
  {
    badge: "COMPARISON",
    badgeClass: "text-purple-600",
    title: "Midjourney vs. Vizcom: Which is Better?",
    date: "Jun 3, 2026",
    readTime: "7 min read",
    imageHint: "two AI generated architecture renders side by side",
  },
  {
    badge: "GUIDE",
    badgeClass: "text-emerald-600",
    title: "How to Choose the Right AI Tool for Your Business",
    date: "Jun 2, 2026",
    readTime: "6 min read",
    imageHint: "person analyzing charts on laptop",
  },
];

// ─── EDITOR PICKS DATA ────────────────────────────────────────────────────────

const EDITOR_PICKS: {
  badge: string;
  badgeIcon: React.ElementType;
  badgeClass: string;
  toolName: string;
  toolLogoBg: string;
  toolLogoChar: string;
  description: string;
  href: string;
}[] = [
  {
    badge: "Best New Tool",
    badgeIcon: Sparkles,
    badgeClass: "text-blue-600",
    toolName: "Vizcom",
    toolLogoBg: "bg-black",
    toolLogoChar: "V",
    description: "Innovative AI concept design platform.",
    href: "/ai-tools/design",
  },
  {
    badge: "Most Innovative",
    badgeIcon: Lightbulb,
    badgeClass: "text-purple-600",
    toolName: "Pika Labs",
    toolLogoBg: "bg-slate-700",
    toolLogoChar: "P",
    description: "Next-gen AI video generation platform.",
    href: "/ai-tools/design",
  },
  {
    badge: "Best Value",
    badgeIcon: Tag,
    badgeClass: "text-emerald-600",
    toolName: "Notion AI",
    toolLogoBg: "bg-black",
    toolLogoChar: "N",
    description: "Powerful AI assistant at an affordable price.",
    href: "/ai-tools/productivity",
  },
  {
    badge: "Highest ROI",
    badgeIcon: TrendingUp,
    badgeClass: "text-orange-600",
    toolName: "Buildots",
    toolLogoBg: "bg-yellow-500",
    toolLogoChar: "B",
    description: "Proven to save time and reduce costs.",
    href: "/ai-tools/automation",
  },
];

// ─── PROCESS STEPS DATA ───────────────────────────────────────────────────────

const PROCESS_THEME = {
  blue:   { iconBg: "bg-blue-100",   iconColor: "text-blue-600"   },
  green:  { iconBg: "bg-green-100",  iconColor: "text-green-600"  },
  purple: { iconBg: "bg-purple-100", iconColor: "text-purple-600" },
  orange: { iconBg: "bg-orange-100", iconColor: "text-orange-500" },
} as const;

type ProcessThemeKey = keyof typeof PROCESS_THEME;

const PROCESS_STEPS: {
  title: string;
  description: string;
  icon: React.ElementType;
  theme: ProcessThemeKey;
}[] = [
  {
    title: "Hands-on Testing",
    description: "We test every tool in real workflows.",
    icon: FlaskConical,
    theme: "blue",
  },
  {
    title: "Score & Evaluate",
    description: "We rate tools on speed, value, features, and more.",
    icon: ClipboardCheck,
    theme: "green",
  },
  {
    title: "Compare & Rank",
    description: "Data-driven comparison to find the winners.",
    icon: BarChart3,
    theme: "purple",
  },
  {
    title: "Publish & Update",
    description: "Rankings updated regularly to stay accurate.",
    icon: RefreshCw,
    theme: "orange",
  },
];

// ─── GOAL THEME MAP ──────────────────────────────────────────────────────────

const GOAL_THEME = {
  green:  { iconBg: "bg-green-100",  iconColor: "text-green-600"  },
  orange: { iconBg: "bg-orange-100", iconColor: "text-orange-500" },
  blue:   { iconBg: "bg-blue-100",   iconColor: "text-blue-600"   },
  purple: { iconBg: "bg-purple-100", iconColor: "text-purple-600" },
  yellow: { iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
} as const;

type GoalThemeKey = keyof typeof GOAL_THEME;

// ─── BEST BY GOAL DATA ────────────────────────────────────────────────────────

const BEST_BY_GOAL: {
  goal: string;
  icon: React.ElementType;
  theme: GoalThemeKey;
  bestTool: string;
  toolLogoBg: string;
  toolLogoChar: string;
  href: string;
}[] = [
  {
    goal: "Increase Productivity",
    icon: Rocket,
    theme: "green",
    bestTool: "ChatGPT",
    toolLogoBg: "bg-emerald-600",
    toolLogoChar: "C",
    href: "/ai-tools/productivity",
  },
  {
    goal: "Save Time on Admin",
    icon: Clock,
    theme: "orange",
    bestTool: "Notion AI",
    toolLogoBg: "bg-black",
    toolLogoChar: "N",
    href: "/ai-tools/productivity",
  },
  {
    goal: "Generate Leads",
    icon: Users,
    theme: "blue",
    bestTool: "Offrs",
    toolLogoBg: "bg-orange-500",
    toolLogoChar: "O",
    href: "/ai-tools/sales",
  },
  {
    goal: "Improve Design Quality",
    icon: Sparkles,
    theme: "purple",
    bestTool: "Midjourney",
    toolLogoBg: "bg-black",
    toolLogoChar: "M",
    href: "/ai-tools/design",
  },
  {
    goal: "Reduce Project Costs",
    icon: DollarSign,
    theme: "yellow",
    bestTool: "Buildots",
    toolLogoBg: "bg-yellow-500",
    toolLogoChar: "B",
    href: "/ai-tools/automation",
  },
];

// ─── COMPARE TABLE DATA ───────────────────────────────────────────────────────

const COMPARE_TOOLS = [
  { name: "Vizcom",          logoBg: "bg-black",       logoChar: "V", bestFor: "Concept Design",       ease: 9.6, features: 9.4, value: 9.0, overall: 9.4 },
  { name: "Autodesk Forma",  logoBg: "bg-purple-600",  logoChar: "F", bestFor: "Site Analysis",        ease: 9.2, features: 9.1, value: 8.8, overall: 9.1 },
  { name: "TestFit",         logoBg: "bg-gray-800",    logoChar: "T", bestFor: "Feasibility Studies",   ease: 8.9, features: 9.2, value: 8.5, overall: 8.9 },
  { name: "Midjourney",      logoBg: "bg-black",       logoChar: "M", bestFor: "Visualization",         ease: 9.0, features: 8.9, value: 8.2, overall: 8.7 },
];

const MAX_OVERALL = Math.max(...COMPARE_TOOLS.map((t) => t.overall));

// ─── THEME COLOR MAPS (full class strings for Tailwind JIT) ──────────────────

const THEME = {
  blue: {
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    button: "border-blue-600 text-blue-600 hover:bg-blue-50",
  },
  orange: {
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    button: "border-orange-500 text-orange-500 hover:bg-orange-50",
  },
  purple: {
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    button: "border-purple-600 text-purple-600 hover:bg-purple-50",
  },
  emerald: {
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    button: "border-emerald-600 text-emerald-600 hover:bg-emerald-50",
  },
} as const;

type ThemeKey = keyof typeof THEME;

// ─── LEADERBOARD DATA ────────────────────────────────────────────────────────

const LEADERBOARDS: {
  title: string;
  icon: React.ElementType;
  theme: ThemeKey;
  href: string;
  items: string[];
}[] = [
  {
    title: "Best AI Tools for Architects",
    icon: Building2,
    theme: "blue",
    href: "/industries/architecture",
    items: ["Vizcom", "Autodesk Forma", "TestFit", "Midjourney", "ArkDesign AI"],
  },
  {
    title: "Best AI Tools for Construction",
    icon: HardHat,
    theme: "orange",
    href: "/industries/construction",
    items: ["Buildots", "OpenSpace", "ALICE Technologies", "Procore AI", "Pillar"],
  },
  {
    title: "Best AI Tools for Real Estate",
    icon: Home,
    theme: "purple",
    href: "/industries/real-estate",
    items: ["REimagineHome", "Offrs", "Lofty AI", "Structurely", "Zillow Showcase"],
  },
  {
    title: "Best AI Tools for Interior Designers",
    icon: Sofa,
    theme: "emerald",
    href: "/industries/furniture",
    items: ["Planner 5D", "RoomGPT", "Coohom", "Homestyler", "Foyr Neo"],
  },
];

// ─── INDUSTRY CARDS DATA ──────────────────────────────────────────────────────

const INDUSTRY_CARDS = [
  {
    title: "For Architects",
    description: "Design, visualize, and deliver better projects with AI.",
    tools: 12,
    rating: 4.8,
    updated: "Jun 2026",
    buttonClass: "bg-blue-600 hover:bg-blue-700",
    imageHint: "modern architecture building exterior",
    icon: Building2,
    iconColor: "text-blue-600",
    href: "/industries/architecture",
  },
  {
    title: "For Construction Teams",
    description: "Plan, manage, and build smarter with AI.",
    tools: 15,
    rating: 4.7,
    updated: "Jun 2026",
    buttonClass: "bg-orange-500 hover:bg-orange-600",
    imageHint: "construction site with crane",
    icon: HardHat,
    iconColor: "text-orange-500",
    href: "/industries/construction",
  },
  {
    title: "For Real Estate Professionals",
    description: "Generate leads, market properties, and close deals faster.",
    tools: 13,
    rating: 4.8,
    updated: "Jun 2026",
    buttonClass: "bg-purple-600 hover:bg-purple-700",
    imageHint: "modern house exterior at night",
    icon: Home,
    iconColor: "text-purple-600",
    href: "/industries/real-estate",
  },
  {
    title: "For Interior Designers",
    description: "Create stunning interiors and delight clients with AI.",
    tools: 12,
    rating: 4.7,
    updated: "Jun 2026",
    buttonClass: "bg-emerald-600 hover:bg-emerald-700",
    imageHint: "modern living room interior",
    icon: Sofa,
    iconColor: "text-emerald-600",
    href: "/industries/furniture",
  },
];

// ─── TRUST BADGE DATA ─────────────────────────────────────────────────────────

const TRUST_BADGES = [
  {
    title: "Hands-on Testing",
    desc: "Every tool is tested by our team",
    icon: (
      // FlaskConical
      <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M9 3v7.172a4 4 0 00-1.172 2.828L5 20h14l-2.828-7A4 4 0 0015 10.172V3M9 3h6" />
      </svg>
    ),
    iconBg: "bg-violet-50",
  },
  {
    title: "Unbiased Reviews",
    desc: "Independent ratings you can trust",
    icon: (
      // ShieldCheck
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    iconBg: "bg-blue-50",
  },
  {
    title: "Updated Regularly",
    desc: "Rankings refreshed every month",
    icon: (
      // RefreshCw
      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    iconBg: "bg-emerald-50",
  },
  {
    title: "Real Workflows",
    desc: "Based on how tools actually work",
    icon: (
      // Workflow
      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    iconBg: "bg-orange-50",
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function BestOfPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#F97316] transition-colors">
              Home
            </Link>
            <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium">Best Of AI Tools</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 overflow-hidden relative">
        {/* background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-60 -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-50 rounded-full blur-3xl opacity-60 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              {/* Small badge */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Curated
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Tested
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Trusted
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight mb-5">
                Best AI Tools —{" "}
                <br className="hidden sm:block" />
                Handpicked for{" "}
                <span className="bg-gradient-to-r from-violet-600 to-red-500 bg-clip-text text-transparent">
                  Professionals
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                We test, rank, and compare the best AI tools across industries
                and use cases so you can choose the right tools with confidence.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#rankings"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-opacity text-sm shadow-md shadow-blue-100"
                >
                  Explore Rankings →
                </a>
                <a
                  href="#industry-picks"
                  className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-300 bg-white text-[#1E293B] font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  See Industry Picks
                </a>
              </div>
            </div>

            {/* Right — image placeholder with overlay cards */}
            <div className="relative">
              {/* TODO: replace with Unsplash image */}
              <div className="relative bg-gray-100 rounded-2xl aspect-video w-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12h.008v.008H13.5V12zm0 0h.008v.008H13.5V12z" />
                  </svg>
                </div>
              </div>

              {/* Overlay card — Best Overall */}
              <div className="absolute -left-4 top-6 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3 min-w-[160px]">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Best Overall</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Overlay card — Best Value */}
              <div className="absolute -right-4 top-1/3 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 min-w-[150px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
                    </svg>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Best Value</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "88%" }} />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">88 / 100 score</p>
              </div>

              {/* Overlay card — Easiest to Use */}
              <div className="absolute -left-4 bottom-6 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3 min-w-[160px]">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.818m2.784-7.421A6 6 0 016.592 9.6" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Easiest to Use</p>
                  <p className="text-xs font-bold text-[#1E293B] mt-0.5">4.9 / 5.0</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Trust badges ── */}
      <section className="py-10 border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.title} className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl ${badge.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                  {badge.icon}
                </div>
                <div>
                  <p className="font-semibold text-[#1E293B] text-sm">{badge.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Choose Your Industry ── */}
      <section id="industry-picks" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-3">
              Choose Your Industry
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Find the top-rated AI tools tailored to your profession.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Image placeholder */}
                  <div className="relative aspect-[4/3] bg-gray-200 rounded-xl mx-3 mt-3 overflow-hidden">
                    {/* TODO: replace with Unsplash image — "{card.imageHint}" */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12h.008v.008H13.5V12z" />
                      </svg>
                    </div>
                    {/* Industry icon badge — top-left */}
                    <div className="absolute top-2.5 left-2.5 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center">
                      <Icon className={`w-4.5 h-4.5 ${card.iconColor}`} size={18} />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-4 pt-4 pb-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg text-[#1E293B] mb-1 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                      {card.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 flex-wrap">
                      <span>{card.tools} tools</span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {card.rating}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span>Updated {card.updated}</span>
                    </div>

                    {/* CTA button */}
                    <Link
                      href={card.href}
                      className={`mt-auto block w-full text-center text-white font-medium text-sm py-2.5 rounded-lg transition-colors ${card.buttonClass}`}
                    >
                      View Ranking →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 3: Top Ranked Lists (By Industry) ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header row */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
                Top Ranked Lists (By Industry)
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Our experts&apos; top 5 picks in each category
              </p>
            </div>
            <Link
              href="/industries"
              className="hidden md:inline-flex text-blue-600 font-medium text-sm hover:underline"
            >
              View all industry rankings →
            </Link>
          </div>

          {/* Leaderboard cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERBOARDS.map((board) => {
              const Icon = board.icon;
              const t = THEME[board.theme];
              return (
                <div
                  key={board.title}
                  className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col"
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-full ${t.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className={`${t.iconColor}`} size={18} />
                    </div>
                    <h3 className="font-semibold text-sm text-[#1E293B] leading-snug">
                      {board.title}
                    </h3>
                  </div>

                  {/* Tool list */}
                  <ul className="flex-1 mb-4">
                    {board.items.map((tool, idx) => (
                      <li
                        key={tool}
                        className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
                      >
                        {idx === 0 ? (
                          <span className="flex items-center justify-center w-5 shrink-0">
                            <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" />
                          </span>
                        ) : (
                          <span className="w-5 shrink-0 text-center text-xs font-medium text-gray-400">
                            {idx + 1}.
                          </span>
                        )}
                        <span
                          className={`text-sm ${
                            idx === 0
                              ? "font-semibold text-[#1E293B]"
                              : "font-medium text-gray-700"
                          }`}
                        >
                          {tool}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={board.href}
                    className={`block w-full text-center text-sm font-medium py-2.5 rounded-lg border transition-colors ${t.button}`}
                  >
                    View Full Ranking →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 4: Compare Winners ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header row */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
                Compare Winners
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Side-by-side comparison of top tools in key categories.
              </p>
            </div>
            <Link
              href="/ai-tools/design"
              className="hidden md:inline-flex text-blue-600 font-medium text-sm hover:underline"
            >
              Compare all categories →
            </Link>
          </div>

          {/* Responsive table */}
          <div className="overflow-x-auto border border-gray-100 rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Tool</th>
                  <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Best For</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Ease of Use</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Features</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Value for Money</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Overall Score</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Winner</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_TOOLS.map((tool) => {
                  const isWinner = tool.overall === MAX_OVERALL;
                  return (
                    <tr
                      key={tool.name}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      {/* Tool */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-lg ${tool.logoBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {tool.logoChar}
                          </span>
                          <span className="font-medium text-[#1E293B] whitespace-nowrap">{tool.name}</span>
                        </div>
                      </td>
                      {/* Best For */}
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{tool.bestFor}</td>
                      {/* Ease of Use */}
                      <td className="py-3 px-4 text-center font-medium text-gray-700">{tool.ease}</td>
                      {/* Features */}
                      <td className="py-3 px-4 text-center font-medium text-gray-700">{tool.features}</td>
                      {/* Value for Money */}
                      <td className="py-3 px-4 text-center font-medium text-gray-700">{tool.value}</td>
                      {/* Overall Score */}
                      <td className={`py-3 px-4 text-center font-bold ${isWinner ? "text-blue-600" : "text-[#1E293B]"}`}>
                        <span className={isWinner ? "bg-blue-50 px-2 py-0.5 rounded-md" : ""}>
                          {tool.overall}
                        </span>
                      </td>
                      {/* Winner */}
                      <td className="py-3 px-4 text-center">
                        {isWinner ? (
                          <Trophy className="w-4 h-4 text-amber-400 fill-amber-400 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Section 5: Best By Goal ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Best By Goal{" "}
              <span className="text-base font-normal text-gray-500">(What do you want to achieve?)</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find the best tools for your specific goals.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BEST_BY_GOAL.map((item) => {
              const Icon = item.icon;
              const t = GOAL_THEME[item.theme];
              return (
                <div
                  key={item.goal}
                  className="border border-gray-100 rounded-xl p-5 bg-white hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full ${t.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className={t.iconColor} size={20} />
                  </div>

                  {/* Goal title */}
                  <p className="font-semibold text-sm text-[#1E293B] mt-3 leading-snug">
                    {item.goal}
                  </p>

                  {/* Best tool */}
                  <p className="text-xs text-gray-400 mt-2">Best Tool:</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`w-5 h-5 rounded ${item.toolLogoBg} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                      {item.toolLogoChar}
                    </span>
                    <span className="font-medium text-sm text-[#1E293B]">{item.bestTool}</span>
                  </div>

                  {/* Link */}
                  <Link
                    href={item.href}
                    className="text-xs text-blue-600 font-medium hover:underline mt-2 inline-block"
                  >
                    See why →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 6: How We Choose the Best ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              How We Choose the Best
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Our 4-step testing and evaluation process.
            </p>
          </div>

          {/* Timeline grid */}
          <div className="relative">
            {/* Connector line — desktop only, sits behind icons */}
            <div className="hidden lg:block absolute top-7 left-[calc(12.5%+1.75rem)] right-[calc(12.5%+1.75rem)] border-t-2 border-dashed border-gray-200 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {PROCESS_STEPS.map((step, idx) => {
                const Icon = step.icon;
                const t = PROCESS_THEME[step.theme];
                return (
                  <div key={step.title} className="flex flex-col items-center text-center lg:items-center">
                    {/* Icon with step badge */}
                    <div className="relative shrink-0">
                      <div className={`w-14 h-14 rounded-full ${t.iconBg} flex items-center justify-center`}>
                        <Icon className={t.iconColor} size={24} />
                      </div>
                      {/* Step number badge */}
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[10px] font-bold text-gray-500">
                        {idx + 1}
                      </span>
                    </div>

                    <h3 className="font-semibold text-base text-[#1E293B] mt-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed max-w-[200px]">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: Editor Picks ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Editor Picks
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Special picks from our team this month.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EDITOR_PICKS.map((pick) => {
              const BadgeIcon = pick.badgeIcon;
              return (
                <div
                  key={pick.toolName}
                  className="border border-gray-100 rounded-xl p-5 bg-white hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Badge */}
                  <div className={`flex items-center gap-1.5 text-xs font-semibold uppercase ${pick.badgeClass}`}>
                    <BadgeIcon size={13} />
                    {pick.badge}
                  </div>

                  {/* Tool name + logo */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`w-8 h-8 rounded-lg ${pick.toolLogoBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {pick.toolLogoChar}
                    </span>
                    <span className="font-semibold text-base text-[#1E293B]">{pick.toolName}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-2 flex-1">
                    {pick.description}
                  </p>

                  {/* Link */}
                  <a
                    href={pick.href}
                    className="text-xs text-blue-600 font-medium hover:underline mt-3 inline-block"
                  >
                    Read why →
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 8A: Latest Rankings & Guides ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header row */}
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Latest Rankings &amp; Guides
            </h2>
            <Link
              href="/blog"
              className="hidden md:inline-flex text-blue-600 font-medium text-sm hover:underline"
            >
              View all articles →
            </Link>
          </div>

          {/* Article cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARTICLES.map((article) => (
              <div key={article.title} className="flex flex-col">
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden">
                  {/* TODO: replace with Unsplash image — "{article.imageHint}" */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12h.008v.008H13.5V12z" />
                    </svg>
                  </div>
                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`inline-block px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold uppercase ${article.badgeClass}`}>
                      {article.badge}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-semibold text-base text-[#1E293B] mt-3 leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {article.date} · {article.readTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8B: Newsletter CTA ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            {/* Left */}
            <div className="flex flex-col gap-3">
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Mail className="text-white" size={22} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                Get Weekly AI Tools Rankings &amp; Insights
              </h2>
              <p className="text-sm text-white/90 max-w-md leading-relaxed">
                Join 10,000+ professionals who get the best AI tools, rankings, and guides delivered every week.
              </p>
            </div>

            {/* Right — form */}
            <div className="flex flex-col gap-2 md:min-w-[320px]">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 md:w-64 rounded-lg px-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="button"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </div>
              <p className="text-xs text-white/80 mt-1">
                ✓ No spam &nbsp; ✓ Unsubscribe anytime &nbsp; ✓ 100% Free
              </p>
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
