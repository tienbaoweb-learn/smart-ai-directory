import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  Blocks,
  Bot,
  Camera,
  Check,
  CheckCircle,
  ChevronRight,
  Circle,
  ClipboardList,
  Globe,
  Image,
  Megaphone,
  MessageSquare,
  Palette,
  PenLine,
  RefreshCw,
  Send,
  Settings,
  Star,
  TrendingUp,
  Video,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { comparisonsData } from "../../../lib/comparisons-data";
import { ALL_TOOLS } from "../../data/tools";
import CompareTools from "../../ai-tools/CompareTools";
import FeaturedComparisons from "./FeaturedComparisons";
import LatestComparisons from "./LatestComparisons";
import ComparisonSearch from "./ComparisonSearch";

// ─── CATEGORY CARD THEMES ─────────────────────────────────────────────────────

const CAT_THEME: Record<string, { iconBg: string; iconColor: string }> = {
  "AI Writing":          { iconBg: "bg-blue-50",   iconColor: "text-blue-600"   },
  "AI Automation":       { iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  "AI Design & Visuals": { iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  "Productivity":        { iconBg: "bg-green-50",  iconColor: "text-green-600"  },
  "Marketing":           { iconBg: "bg-red-50",    iconColor: "text-red-500"    },
  "AI Agents":           { iconBg: "bg-teal-50",   iconColor: "text-teal-600"   },
  "Video & Audio":       { iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  "No-code Tools":       { iconBg: "bg-yellow-50", iconColor: "text-yellow-600" },
  "Sales & CRM":         { iconBg: "bg-emerald-50",iconColor: "text-emerald-600"},
  "Project Management":  { iconBg: "bg-pink-50",   iconColor: "text-pink-600"   },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FEATURE_ROWS = [
  { icon: MessageSquare, label: "Conversation" },
  { icon: Image,         label: "Image Gen"    },
  { icon: Zap,           label: "Speed"        },
  { icon: Globe,         label: "Web Access"   },
];

// ─── FEATURED COMPARISON BADGE STYLES ────────────────────────────────────────

const FEAT_BADGE: Record<string, string> = {
  WRITING:        "bg-blue-600 text-white",
  DESIGN:         "bg-purple-600 text-white",
  PRODUCTIVITY:   "bg-emerald-600 text-white",
  MARKETING:      "bg-orange-500 text-white",
  CONSTRUCTION:   "bg-amber-600 text-white",
  ARCHITECTURE:   "bg-blue-700 text-white",
  INTERIOR:       "bg-rose-600 text-white",
  "REAL ESTATE":  "bg-teal-600 text-white",
};

// Every comparison in comparisonsData links to a real /compare/<slug> detail
// page (both tools are validated to have reviews when the entry is authored),
// so no catalog gate is needed here.
const FEATURED_COMPARISONS = comparisonsData.filter((c) => c.isFeatured);
const LATEST_COMPARISONS   = comparisonsData.filter((c) => !c.isFeatured);

const SIDEBAR_TOPICS_CMP = [
  { label: "AI Tutorials",             href: "/resources/tutorials"        },
  { label: "Best AI Tools by Industry",href: "/best-of"                    },
  { label: "AI for Content Creation",  href: "/ai-tools/content-marketing" },
  { label: "AI Automation Workflows",  href: "/resources/workflows"        },
  { label: "AI Agents Explained",      href: "/tags/ai-agents"             },
  { label: "No-code AI Tools",         href: "/tags/no-code"               },
];

const CATEGORIES = [
  { label: "AI Writing",          icon: PenLine,      sub: "12 comparisons" },
  { label: "AI Automation",       icon: Workflow,     sub: "14 comparisons" },
  { label: "AI Design & Visuals", icon: Palette,      sub: "15 comparisons" },
  { label: "Productivity",        icon: Zap,          sub: "10 comparisons" },
  { label: "Marketing",           icon: Megaphone,    sub: "11 comparisons" },
  { label: "AI Agents",           icon: Bot,          sub: "9 comparisons"  },
  { label: "Video & Audio",       icon: Video,        sub: "8 comparisons"  },
  { label: "No-code Tools",       icon: Blocks,       sub: "7 comparisons"  },
  { label: "Sales & CRM",         icon: TrendingUp,   sub: "6 comparisons"  },
  { label: "Project Management",  icon: ClipboardList,sub: "6 comparisons"  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Compare AI Tools Side-by-Side | SmartAI for Work",
  description:
    "Compare top AI tools for furniture, architecture, construction, and real estate side-by-side — features, pricing, and which one wins for each use case.",
  alternates: { canonical: "/resources/comparisons" },
  openGraph: {
    title: "Compare AI Tools Side-by-Side | SmartAI for Work",
    description:
      "Compare top AI tools for furniture, architecture, construction, and real estate side-by-side — features, pricing, and which one wins for each use case.",
    url: "/resources/comparisons",
    type: "website",
  },
};

export default function ComparisonsPage() {
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
            <span className="text-[#1E293B] font-medium">Comparisons</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <div className="mb-5">
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                  AI Tool Comparisons
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight mb-4">
                Compare AI Tools
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #2563eb 0%, #9333ea 100%)" }}
                >
                  Side by Side
                </span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                Find the right AI tools for your needs. We compare features, pricing, pros &amp; cons, and real use cases so you can choose with confidence.
              </p>

              {/* 4 feature mini row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: Settings,  l1: "Unbiased",      l2: "Comparisons" },
                  { icon: Wrench,    l1: "Hands-on",      l2: "Testing"     },
                  { icon: Camera,    l1: "Feature & Price",l2: "Breakdown"  },
                  { icon: RefreshCw, l1: "Updated",       l2: "Regularly"   },
                ].map(({ icon: Icon, l1, l2 }) => (
                  <div key={l1} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-blue-600" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-xs font-semibold text-[#1E293B]">{l1}</p>
                      <p className="text-xs text-gray-500">{l2}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Search bar */}
              <ComparisonSearch comparisons={comparisonsData} />

              {/* Popular searches — real published comparisons */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-sm text-gray-500 shrink-0">Popular searches:</span>
                {comparisonsData
                  .filter((c) => c.isFeatured)
                  .slice(0, 4)
                  .map((c) => (
                    <Link key={c.slug} href={c.href} className="text-sm text-blue-600 hover:underline">
                      {c.title}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Right — comparison mockup card */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40" />
              <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-blue-100 rounded-full blur-3xl opacity-40" />

              <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

                {/* Tool header row */}
                <div className="flex items-center justify-between mb-5">
                  {/* ChatGPT */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">G</span>
                    </div>
                    <p className="font-semibold text-sm text-[#1E293B]">ChatGPT</p>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">4.9</span>
                    </div>
                  </div>

                  {/* VS badge */}
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    VS
                  </div>

                  {/* Claude */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <p className="font-semibold text-sm text-[#1E293B]">Claude</p>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">4.7</span>
                    </div>
                  </div>
                </div>

                {/* Feature comparison rows */}
                <div className="flex flex-col gap-3">
                  {FEATURE_ROWS.map(({ icon: Icon, label }, idx) => (
                    <div key={label} className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                      {/* Left — ChatGPT result */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full" />
                        <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                      </div>

                      {/* Centre — feature label */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
                          <Icon size={13} className="text-gray-400" />
                        </div>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{label}</span>
                      </div>

                      {/* Right — Claude result */}
                      <div className="flex items-center gap-2">
                        {idx < 3
                          ? <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                          : <AlertCircle size={16} className="text-orange-400 shrink-0" />
                        }
                        <div className="flex-1 h-2 bg-gray-100 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA row (decorative mockup) */}
                <div className="mt-5 flex items-center justify-center w-full bg-blue-600 text-white text-sm font-medium rounded-lg py-2.5">
                  See Full Comparison →
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: Browse Comparisons by Category ── */}
      <section className="py-12 sm:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Browse Comparisons by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Explore the most useful AI tool comparisons for your workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map(({ label, icon: Icon, sub }) => {
              const theme = CAT_THEME[label];
              return (
                <div
                  key={label}
                  className="border border-gray-100 rounded-xl p-4 bg-white flex flex-col"
                >
                  <div className={`w-10 h-10 rounded-lg ${theme.iconBg} flex items-center justify-center shrink-0`}>
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

      {/* ── Compare AI Tools (interactive) ── */}
      <CompareTools tools={ALL_TOOLS} />

      {/* ── SECTION 5: Featured Comparisons ── */}
      <FeaturedComparisons comparisons={FEATURED_COMPARISONS} featBadge={FEAT_BADGE} />

      {/* ── SECTION 6: Latest Comparisons + Sidebar ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── LEFT COL: Latest Comparisons table ── */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#1E293B]">Latest Comparisons</h2>
                <p className="text-sm text-gray-500 mt-1">Fresh comparisons to help you make better decisions.</p>
              </div>

              <LatestComparisons comparisons={LATEST_COMPARISONS} />
            </div>

            {/* ── RIGHT COL: Sidebar ── */}
            <div className="lg:col-span-1">

              {/* Box 1: Popular Topics */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white mb-6">
                <h3 className="font-bold text-base text-[#1E293B] mb-3">Popular Topics</h3>
                <ul>
                  {SIDEBAR_TOPICS_CMP.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className="flex justify-between items-center text-sm text-gray-700 hover:text-blue-600 py-1.5 border-b border-gray-100 last:border-0 transition-colors">
                        <span>{label}</span>
                        <ChevronRight size={14} className="shrink-0 text-gray-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/tags" className="block w-full border border-blue-600 text-blue-600 rounded-lg py-2 text-sm font-medium text-center mt-3 hover:bg-blue-50 transition-colors">
                  View all topics
                </Link>
              </div>

              {/* Box 2: Stay Updated */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white">
                <h3 className="font-bold text-base text-[#1E293B] mb-1">Stay Updated</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Get the latest comparison guides and AI insights in your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-colors shrink-0">
                    <Send size={16} />
                  </button>
                </div>
                <ul className="mt-2 flex flex-col gap-1">
                  {["No spam", "Unsubscribe anytime", "100% Free"].map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Check size={12} className="text-blue-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
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
