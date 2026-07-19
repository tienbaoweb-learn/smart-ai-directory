import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  Grid3x3,
  LayersIcon,
  LayoutGrid,
  Megaphone,
  Quote,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import ResourceCard from "../../components/ResourceCard";
import ResourceListRow from "../../components/ResourceListRow";
import { guidesData } from "../../../lib/guides-data";

// ─── CATEGORY CARD THEMES ─────────────────────────────────────────────────────

const CAT_THEME: Record<string, { iconBg: string; iconColor: string }> = {
  "AI Strategy":        { iconBg: "bg-blue-50",   iconColor: "text-blue-600"   },
  "Prompt Engineering": { iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  "AI for Marketing":   { iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  "AI for Operations":  { iconBg: "bg-teal-50",   iconColor: "text-teal-600"   },
  "AI Ethics & Safety": { iconBg: "bg-emerald-50",iconColor: "text-emerald-600"},
  "View All Guides":    { iconBg: "bg-gray-100",  iconColor: "text-gray-500"   },
};

// ─── FEATURED GUIDE BADGE STYLES ─────────────────────────────────────────────

const FEAT_BADGE: Record<string, string> = {
  ARCHITECTURE:       "bg-sky-600 text-white",
  CONSTRUCTION:       "bg-amber-600 text-white",
  "INTERIOR DESIGN":  "bg-pink-600 text-white",
  "REAL ESTATE":      "bg-emerald-600 text-white",
  VISUALIZATION:      "bg-violet-600 text-white",
  FURNITURE:          "bg-orange-600 text-white",
};

// ─── RESULT CARD THEMES ───────────────────────────────────────────────────────

const RESULT_THEME: Record<string, { bg: string; color: string }> = {
  blue:   { bg: "bg-blue-50",   color: "text-blue-600"   },
  purple: { bg: "bg-purple-50", color: "text-purple-600" },
  orange: { bg: "bg-orange-50", color: "text-orange-500" },
  yellow: { bg: "bg-yellow-50", color: "text-yellow-600" },
  green:  { bg: "bg-emerald-50",color: "text-emerald-600"},
};

// ─── LATEST GUIDE BADGE STYLES ───────────────────────────────────────────────

const LATEST_BADGE: Record<string, string> = {
  STRATEGY:   "text-blue-600 bg-blue-50",
  MARKETING:  "text-orange-600 bg-orange-50",
  ETHICS:     "text-green-600 bg-green-50",
  PROMPTS:    "text-purple-600 bg-purple-50",
  OPERATIONS: "text-teal-600 bg-teal-50",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: FileText,   count: "100+",    label: "Guides"          },
  { icon: LayoutGrid, count: "25+",     label: "Topics Covered"  },
  { icon: Users,      count: "50K+",    label: "Monthly Readers" },
  { icon: Calendar,   count: "Updated", label: "Every Week"      },
];

const CATEGORIES = [
  { label: "AI Strategy",        icon: Compass,    sub: "16 Guides"  },
  { label: "Prompt Engineering", icon: Sparkles,   sub: "20 Guides"  },
  { label: "AI for Marketing",   icon: Megaphone,  sub: "18 Guides"  },
  { label: "AI for Operations",  icon: Settings,   sub: "14 Guides"  },
  { label: "AI Ethics & Safety", icon: ShieldCheck,sub: "10 Guides"  },
  { label: "View All Guides",    icon: Grid3x3,    sub: "All Guides" },
];

const FEATURED_GUIDES = guidesData.filter((g) => g.isFeatured);
const LATEST_GUIDES_DATA = guidesData.filter((g) => !g.isFeatured);

const RESULT_CARDS = [
  { value: "100+",   label: "In-depth guides",        icon: FileText,   theme: "blue"   },
  { value: "25+",    label: "Topics covered",          icon: LayoutGrid, theme: "purple" },
  { value: "10 min", label: "Average read time",       icon: Clock,      theme: "orange" },
  { value: "4.9/5",  label: "Average reader rating",   icon: Star,       theme: "yellow" },
  { value: "Weekly", label: "New guides published",    icon: RefreshCw,  theme: "green"  },
];


const SIDEBAR_TOPICS = [
  { label: "Prompt Engineering",   href: "/tags/prompt-engineering" },
  { label: "AI for Business",      href: "/tags/ai-for-business"    },
  { label: "AI Automation",        href: "/tags/automation"         },
  { label: "AI Writing",           href: "/tags/ai-writing"         },
  { label: "AI Agents",            href: "/tags/ai-agents"          },
  { label: "AI Image Generation",  href: "/tags/ai-image-generation" },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "AI Guides: Step-by-Step Help for Industry Professionals",
  description:
    "In-depth AI guides to help furniture, architecture, construction, and real estate professionals choose and implement the right AI tools.",
  alternates: { canonical: "/resources/guides" },
  openGraph: {
    title: "AI Guides | SmartAI for Work",
    description:
      "In-depth AI guides to help furniture, architecture, construction, and real estate professionals choose and implement the right AI tools.",
    url: "/resources/guides",
    type: "website",
  },
};

export default function GuidesPage() {
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
            <Link href="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium">Guides</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-50 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <div className="mb-5">
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                  In-Depth Guides
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight mb-4">
                AI Guides to
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #2563eb 0%, #9333ea 100%)" }}
                >
                  Work Smarter
                </span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                In-depth guides covering AI strategy, tools, and best practices to help you and your team work smarter, faster, and more efficiently.
              </p>

              {/* Stats row — 4-cell grid with dividers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-200 rounded-xl overflow-hidden divide-x divide-y sm:divide-y-0 divide-gray-200 mb-6">
                {STATS.map(({ icon: Icon, count, label }) => (
                  <div key={label} className="flex flex-col items-center justify-center gap-1 px-4 py-3 text-center">
                    <Icon size={15} className="text-blue-600" />
                    <span className="text-lg font-bold text-[#1E293B] leading-none">{count}</span>
                    <span className="text-xs text-gray-500">{label}</span>
                  </div>
                ))}
              </div>

              {/* Search bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search guides (e.g. AI strategy, prompt engineering...)"
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-colors shrink-0">
                  Search
                </button>
              </div>
            </div>

            {/* Right — image + decorative cards */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40" />
              <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-orange-100 rounded-full blur-3xl opacity-40" />

              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src="/guides.webp" alt="Guides illustration" className="w-full h-auto object-cover" />
              </div>

              {/* Decorative card 1 — stats stack (top-left) */}
              <div className="absolute -left-6 top-6 bg-white rounded-xl shadow-lg border border-gray-100 p-3 flex flex-col gap-2 min-w-[200px]">
                {[
                  { icon: BadgeCheck,  bg: "bg-purple-50", color: "text-purple-600", value: "100+ Guides",      label: "Curated by Experts"      },
                  { icon: LayersIcon,  bg: "bg-blue-50",   color: "text-blue-600",   value: "25+ Topics",       label: "From Basics to Advanced" },
                  { icon: Clock,       bg: "bg-orange-50", color: "text-orange-500", value: "10 min Read",      label: "Average Guide Length"    },
                ].map(({ icon: Icon, bg, color, value, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                      <Icon size={14} className={color} />
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-bold text-[#1E293B]">{value}</p>
                      <p className="text-xs text-gray-500">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative quote card (bottom-right) */}
              <div className="absolute -right-4 -bottom-4 bg-gray-900 text-white rounded-xl p-4 max-w-[240px] shadow-xl">
                <Quote size={14} className="text-gray-400 mb-1" />
                <p className="text-xs text-gray-200 leading-relaxed">
                  This guide gave us a clear roadmap for adopting AI across our entire team.
                </p>
                <p className="text-xs text-gray-400 mt-2">— Anh P. · Operations Lead</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: Explore by Category ── */}
      <section className="py-12 sm:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Explore Guides by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find guides that match your role, goals, and experience level.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(({ label, icon: Icon, sub }) => {
              const theme = CAT_THEME[label];
              return (
                <div
                  key={label}
                  className="border border-gray-100 rounded-xl p-4 bg-white text-center flex flex-col items-center"
                >
                  <div className={`w-10 h-10 rounded-lg ${theme.iconBg} flex items-center justify-center`}>
                    <Icon size={20} className={theme.iconColor} />
                  </div>
                  <p className="font-semibold text-sm text-[#1E293B] mt-2">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Featured Guides ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Featured Guides</h2>
              <p className="text-sm text-gray-500 mt-1">Essential reading for AI-powered teams and professionals.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_GUIDES.map((g) => (
              <ResourceCard
                key={g.slug}
                href={g.href}
                thumbnailSrc={g.thumbnail}
                thumbnailAlt={g.title}
                thumbnailContent={
                  <span className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${FEAT_BADGE[g.badge]}`}>
                    {g.badge}
                  </span>
                }
                title={g.title}
                description={g.description}
                footer={
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Clock size={11} className="shrink-0" />
                    <span>{g.readTime}</span>
                  </div>
                }
                linkText="Read Guide →"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Why Read Our Guides ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Why Read Our Guides</h2>
            <p className="text-sm text-gray-500 mt-1">Written by practitioners — not academics — for people who get things done.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {RESULT_CARDS.map(({ value, label, icon: Icon, theme }) => {
              const t = RESULT_THEME[theme];
              return (
                <div key={label} className="border border-gray-100 rounded-xl p-4 bg-white text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full ${t.bg} flex items-center justify-center`}>
                    <Icon size={18} className={t.color} />
                  </div>
                  <p className="text-xl font-bold text-[#1E293B] mt-2">{value}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 + SIDEBAR: 2-column layout ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── LEFT COL: Latest Guides ── */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#1E293B]">Latest Guides</h2>
                <p className="text-sm text-gray-500 mt-1">Fresh perspectives and practical AI knowledge, published weekly.</p>
              </div>

              <ul>
                {LATEST_GUIDES_DATA.map((item) => (
                  <ResourceListRow
                    key={item.slug}
                    href={item.href}
                    title={item.title}
                    badge={{ label: item.badge, className: LATEST_BADGE[item.badge] }}
                    metaContent={
                      <>
                        <span className="text-gray-500">{item.category}</span>
                        <span className="text-gray-500 flex items-center gap-1">
                          <Clock size={11} className="shrink-0" />
                          {item.readTime}
                        </span>
                      </>
                    }
                    date={item.date}
                  />
                ))}
              </ul>
            </div>

            {/* ── RIGHT COL: Sidebar ── */}
            <div className="lg:col-span-1">

              {/* Box 1: Popular Topics */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white mb-6">
                <h3 className="font-bold text-base text-[#1E293B] mb-3">Popular Topics</h3>
                <ul>
                  {SIDEBAR_TOPICS.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="flex justify-between items-center text-sm text-gray-700 hover:text-blue-600 py-1.5 border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <span>{label}</span>
                        <ChevronRight size={14} className="shrink-0 text-gray-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/tags"
                  className="block w-full border border-blue-600 text-blue-600 rounded-lg py-2 text-sm font-medium text-center mt-3 hover:bg-blue-50 transition-colors"
                >
                  View all topics
                </Link>
              </div>

              {/* Box 2: Suggest a Guide Topic */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white">
                <h3 className="font-bold text-base text-[#1E293B] mb-1">Suggest a Guide Topic</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Want us to cover something specific? Send us your idea.
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
                >
                  Submit a Topic
                  <ArrowRight size={15} className="shrink-0" />
                </Link>
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
