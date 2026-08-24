import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  Globe,
  Grid3x3,
  Newspaper,
  Quote,
  RefreshCw,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Unlock,
  Zap,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import ResourceCard from "../../components/ResourceCard";
import ResourceListRow from "../../components/ResourceListRow";
import { aiNewsPosts, NEWS_TYPE_LABEL } from "../../../lib/ai-news-data";

// ─── CATEGORY CARD THEMES ─────────────────────────────────────────────────────

const CAT_THEME: Record<string, { iconBg: string; iconColor: string }> = {
  "Tool Launches":      { iconBg: "bg-blue-50",   iconColor: "text-blue-600"   },
  "Industry Trends":   { iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  "AI Updates":        { iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  "Case Studies":      { iconBg: "bg-emerald-50",iconColor: "text-emerald-600"},
  "Research & Reports":{ iconBg: "bg-teal-50",   iconColor: "text-teal-600"   },
  "View All News":     { iconBg: "bg-gray-100",  iconColor: "text-gray-500"   },
};

// ─── FEATURED NEWS BADGE STYLES ───────────────────────────────────────────────

const FEAT_BADGE: Record<string, string> = {
  BREAKING: "bg-red-500 text-white",
  TREND:    "bg-purple-500 text-white",
  UPDATE:   "bg-blue-500 text-white",
  REPORT:   "bg-emerald-500 text-white",
};

// ─── RESULT CARD THEMES ───────────────────────────────────────────────────────

const RESULT_THEME: Record<string, { bg: string; color: string }> = {
  blue:   { bg: "bg-blue-50",   color: "text-blue-600"   },
  purple: { bg: "bg-purple-50", color: "text-purple-600" },
  orange: { bg: "bg-orange-50", color: "text-orange-500" },
  green:  { bg: "bg-emerald-50",color: "text-emerald-600"},
  teal:   { bg: "bg-teal-50",   color: "text-teal-600"   },
};

// ─── LATEST NEWS BADGE STYLES ─────────────────────────────────────────────────

const LATEST_BADGE: Record<string, string> = {
  "TOOL LAUNCH": "text-blue-600 bg-blue-50",
  "INDUSTRY":    "text-purple-600 bg-purple-50",
  "UPDATE":      "text-orange-600 bg-orange-50",
  "RESEARCH":    "text-green-600 bg-green-50",
  "TREND":       "text-pink-600 bg-pink-50",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Newspaper,   count: "50+",     label: "Articles Published" },
  { icon: TrendingUp,  count: "Weekly",  label: "New Updates"        },
  { icon: Globe,       count: "10+",     label: "Industries Covered" },
  { icon: Calendar,    count: "Updated", label: "Every Week"         },
];

const CATEGORIES = [
  { label: "Tool Launches",       icon: Rocket,      sub: "15 Articles" },
  { label: "Industry Trends",     icon: TrendingUp,  sub: "20 Articles" },
  { label: "AI Updates",          icon: RefreshCw,   sub: "18 Articles" },
  { label: "Case Studies",        icon: Briefcase,   sub: "12 Articles" },
  { label: "Research & Reports",  icon: BarChart3,   sub: "10 Articles" },
  { label: "View All News",       icon: Grid3x3,     sub: "All Articles"},
];

const RESULT_CARDS = [
  { value: "50+",      label: "Articles published",        icon: Newspaper,  theme: "blue"   },
  { value: "Weekly",   label: "Fresh updates every week",  icon: RefreshCw,  theme: "purple" },
  { value: "10+",      label: "Industries covered",        icon: Globe,      theme: "orange" },
  { value: "100%",     label: "Free to read",              icon: Unlock,     theme: "green"  },
  { value: "Verified", label: "Trusted sources only",      icon: ShieldCheck,theme: "teal"   },
];

const SIDEBAR_TOPICS = [
  { label: "Construction AI",        href: "/industries/construction"    },
  { label: "Architecture AI",        href: "/industries/architecture"    },
  { label: "Real Estate AI",         href: "/industries/real-estate"     },
  { label: "Interior Design AI",     href: "/industries/interior-design" },
  { label: "AI Case Studies",        href: "/resources/case-studies"     },
  { label: "AI Tool Comparisons",    href: "/resources/comparisons"      },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "AI News & Trends for Furniture, Architecture & Real Estate",
  description:
    "The latest AI news and trends shaping furniture, architecture, construction, and real estate — curated for industry professionals.",
  alternates: { canonical: "/resources/ai-news" },
  openGraph: {
    title: "AI News & Trends | SmartAI for Work",
    description:
      "The latest AI news and trends shaping furniture, architecture, construction, and real estate — curated for industry professionals.",
    url: "/resources/ai-news",
    type: "website",
  },
};

// Reflects the visible breadcrumb: Home > Resources > AI News.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.smartaiforwork.com/resources" },
    { "@type": "ListItem", position: 3, name: "AI News", item: "https://www.smartaiforwork.com/resources/ai-news" },
  ],
};

// Data-driven from the exact same list rendered on the page — never drifts.
const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI News",
  url: "https://www.smartaiforwork.com/resources/ai-news",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: aiNewsPosts.slice(0, 30).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `https://www.smartaiforwork.com/resources/ai-news/${p.slug}`,
    })),
  },
};

export default function AINewsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
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
            <span className="text-[#1E293B] font-medium">AI News</span>
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
                  Latest AI News & Updates
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight mb-4">
                AI News &
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #2563eb 0%, #9333ea 100%)" }}
                >
                  Industry Updates
                </span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                Stay up to date with the latest AI news, tool launches, industry trends, and insights — curated weekly for professionals in architecture, construction, real estate, and design.
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
                  placeholder="Search AI news (e.g. ChatGPT update, AI trends 2026...)"
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
                <img src="/ai-news-update.webp" alt="AI News illustration" className="w-full h-auto object-cover" />
              </div>

              {/* Decorative card 1 — stats stack (top-left) */}
              <div className="absolute -left-6 top-6 bg-white rounded-xl shadow-lg border border-gray-100 p-3 flex flex-col gap-2 min-w-[200px]">
                {[
                  { icon: Zap,        bg: "bg-blue-50",   color: "text-blue-600",   value: "Breaking",  label: "Latest AI Tool Launches"   },
                  { icon: RefreshCw,  bg: "bg-purple-50", color: "text-purple-600", value: "Weekly",    label: "Curated Industry Updates"  },
                  { icon: ShieldCheck,bg: "bg-orange-50", color: "text-orange-500", value: "Trusted",   label: "Verified Sources Only"     },
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
                  This is the fastest way to stay on top of AI without spending hours reading.
                </p>
                <p className="text-xs text-gray-400 mt-2">— Linh N. · Architecture Firm Owner</p>
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
              Explore News by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Browse the latest AI news by topic and industry.
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

      {/* ── SECTION 3: Featured News ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Featured News</h2>
              <p className="text-sm text-gray-500 mt-1">The biggest AI stories shaping your industry this week.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Real published posts only — every card links to a live article */}
            {aiNewsPosts.map((post) => (
              <ResourceCard
                key={post.slug}
                href={`/resources/ai-news/${post.slug}`}
                thumbnailSrc={post.thumbnail}
                thumbnailAlt={post.title}
                thumbnailContent={
                  <span className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${FEAT_BADGE.TREND}`}>
                    {NEWS_TYPE_LABEL[post.newsType]}
                  </span>
                }
                title={post.title}
                description={post.excerpt}
                footer={
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Clock size={11} className="shrink-0" />
                    <span>{post.publishedDate} • {post.readingTime} read</span>
                  </div>
                }
                linkText="Read Article →"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Why Follow Our AI News ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Why Follow Our AI News</h2>
            <p className="text-sm text-gray-500 mt-1">Curated by industry professionals — so you never miss what matters.</p>
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

            {/* ── LEFT COL: Latest News ── */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#1E293B]">Latest News</h2>
                <p className="text-sm text-gray-500 mt-1">Fresh AI news and industry updates, curated every week.</p>
              </div>

              <ul>
                {aiNewsPosts.map((post) => (
                  <ResourceListRow
                    key={post.slug}
                    href={`/resources/ai-news/${post.slug}`}
                    thumbnailSrc={post.thumbnail}
                    thumbnailAlt={post.title}
                    title={post.title}
                    badge={{
                      label: NEWS_TYPE_LABEL[post.newsType],
                      className: LATEST_BADGE.TREND ?? "text-blue-600 bg-blue-50",
                    }}
                    metaContent={
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock size={11} className="shrink-0" />
                        {post.readingTime} read
                      </span>
                    }
                    date={post.publishedDate}
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

              {/* Box 2: Submit a News Tip */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white">
                <h3 className="font-bold text-base text-[#1E293B] mb-1">Submit a News Tip</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Spotted an AI news story we should cover? Let us know.
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
                >
                  Submit a Tip
                  <ArrowRight size={15} className="shrink-0" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Newsletter
        heading="Get Weekly AI News in Your Inbox"
        subtitle="Join 10,000+ professionals who get the most important AI updates for architecture, construction, real estate, and design every week."
      />
      <Footer />
    </div>
  );
}
