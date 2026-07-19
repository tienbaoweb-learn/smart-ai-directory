import type { Metadata } from "next";
import Link from "next/link";
import {
  Armchair,
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  Grid3x3,
  HardHat,
  Home,
  LayoutGrid,
  Quote,
  Sofa,
  Timer,
  TrendingDown,
  TrendingUp,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import ResourceCard from "../../components/ResourceCard";
import ResourceListRow from "../../components/ResourceListRow";
import { caseStudiesData } from "../../../lib/case-studies-data";
import { caseStudies } from "../../../lib/case-studies-content";

// ─── INDUSTRY CARD THEMES ─────────────────────────────────────────────────────

const INDUSTRY_THEME: Record<string, { iconBg: string; iconColor: string }> = {
  Architecture:          { iconBg: "bg-blue-50",   iconColor: "text-blue-600"   },
  Construction:          { iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  "Real Estate":         { iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  "Interior Design":     { iconBg: "bg-emerald-50",iconColor: "text-emerald-600"},
  Furniture:             { iconBg: "bg-teal-50",   iconColor: "text-teal-600"   },
  "View All Industries": { iconBg: "bg-gray-100",  iconColor: "text-gray-500"   },
};

// ─── FEATURED CASE STUDY BADGE STYLES ────────────────────────────────────────

const CASE_BADGE: Record<string, string> = {
  "INTERIOR DESIGN": "bg-purple-600 text-white",
  "ARCHITECTURE":    "bg-blue-600 text-white",
  "CONSTRUCTION":    "bg-orange-500 text-white",
  "REAL ESTATE":     "bg-emerald-600 text-white",
  "FURNITURE":       "bg-teal-600 text-white",
};

// ─── RESULTS CARD THEMES ──────────────────────────────────────────────────────

const RESULT_THEME: Record<string, { bg: string; color: string }> = {
  blue:   { bg: "bg-blue-50",   color: "text-blue-600"   },
  orange: { bg: "bg-orange-50", color: "text-orange-500" },
  green:  { bg: "bg-emerald-50",color: "text-emerald-600"},
  purple: { bg: "bg-purple-50", color: "text-purple-600" },
  red:    { bg: "bg-red-50",    color: "text-red-500"    },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Clock, TrendingUp, TrendingDown, DollarSign, CheckCircle, Zap, Users, BarChart3, Timer,
};

// Real case studies (Featured Case Studies section) — all 5 entries from lib/case-studies-content.ts.
// Replaces every placeholder previously shown here (furniture was migrated in an earlier pass;
// architecture/construction/interior-design/real-estate were imported from content/drafts/).
function findCase(slug: string) {
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) throw new Error(`Missing case study: ${slug}`);
  return cs;
}

const FEATURED_REAL_CASES = [
  {
    cs: findCase("furniture-ai-tools"),
    badge: "FURNITURE",
    company: { name: "Lumera Studio", logo: { bg: "bg-teal-600", text: "LS" } },
    stats: [
      { icon: "DollarSign",   value: "-70%",   label: "Photo Costs"   },
      { icon: "Clock",        value: "20min",  label: "Visualization" },
      { icon: "TrendingDown", value: "6 days", label: "Sales Cycle"   },
    ],
  },
  {
    cs: findCase("case-study-architecture-archvision"),
    badge: "ARCHITECTURE",
    company: { name: "ArchVision", logo: { bg: "bg-blue-700", text: "AV" } },
    stats: [
      { icon: "Clock",      value: "3-4 days", label: "Approval Time" },
      { icon: "TrendingUp", value: "73%",      label: "Approval Rate" },
      { icon: "DollarSign", value: "+€200K",   label: "Revenue Impact" },
    ],
  },
  {
    cs: findCase("case-study-construction-buildsmart"),
    badge: "CONSTRUCTION",
    company: { name: "BuildSmart", logo: { bg: "bg-amber-600", text: "BS" } },
    stats: [
      { icon: "Clock",      value: "1,200+", label: "Hours Saved/mo" },
      { icon: "TrendingUp", value: "31%",    label: "Bid Win Rate"   },
      { icon: "DollarSign", value: "$350K",  label: "Annual Savings" },
    ],
  },
  {
    cs: findCase("case-study-interior-design-studio-nova"),
    badge: "INTERIOR DESIGN",
    company: { name: "Studio Nova", logo: { bg: "bg-pink-600", text: "SN" } },
    stats: [
      { icon: "Clock",      value: "8-10 days", label: "Approval Time"   },
      { icon: "TrendingUp", value: "~2x",       label: "Revenue/Designer" },
      { icon: "Users",      value: "5",         label: "Active Projects" },
    ],
  },
  {
    cs: findCase("case-study-real-estate-prime-realty"),
    badge: "REAL ESTATE",
    company: { name: "Prime Realty", logo: { bg: "bg-emerald-600", text: "PR" } },
    stats: [
      { icon: "Users",        value: "94",     label: "Qualified Leads/mo" },
      { icon: "TrendingDown", value: "$92",    label: "Cost per Lead"      },
      { icon: "DollarSign",   value: "$4.7M",  label: "Pipeline Value"     },
    ],
  },
].map(({ cs, badge, company, stats }) => ({
  title: cs.title,
  description: cs.excerpt,
  badge,
  thumbnail: cs.thumbnail,
  company,
  stats,
  href: `/resources/case-studies/${cs.slug}`,
}));

const LATEST_CASES = caseStudiesData.filter((cs) => !cs.isFeatured);

const LATEST_CASE_BADGE: Record<string, string> = {
  "INTERIOR DESIGN": "text-purple-600 bg-purple-50",
  "CONSTRUCTION":    "text-orange-600 bg-orange-50",
  "REAL ESTATE":     "text-emerald-600 bg-emerald-50",
  "MARKETING":       "text-pink-600 bg-pink-50",
  "ARCHITECTURE":    "text-blue-600 bg-blue-50",
};

const SIDEBAR_TOPICS_CS = [
  { label: "AI in Architecture",    href: "/industries/architecture"    },
  { label: "AI in Construction",    href: "/industries/construction"    },
  { label: "AI in Real Estate",     href: "/industries/real-estate"     },
  { label: "AI in Interior Design", href: "/industries/interior-design" },
  { label: "AI Automation",         href: "/tags/automation"            },
  { label: "AI for Business",       href: "/tags/ai-for-business"       },
];

const RESULT_CARDS = [
  { value: "+62%",   label: "Average productivity increase",         icon: TrendingUp, theme: "blue"   },
  { value: "-45%",   label: "Average time spent on manual tasks",    icon: Clock,      theme: "orange" },
  { value: "$4.3M+", label: "Total cost savings generated",          icon: DollarSign, theme: "green"  },
  { value: "2.8x",   label: "Average ROI on AI investments",         icon: BarChart3,  theme: "purple" },
  { value: "1,250+", label: "Hours saved per month (average)",       icon: Timer,      theme: "red"    },
];

const STATS = [
  { icon: BookOpen,   count: "80+",      label: "Case Studies"      },
  { icon: LayoutGrid, count: "20+",      label: "Industries"        },
  { icon: Wrench,     count: "150+",     label: "AI Tools Featured" },
  { icon: Calendar,   count: "Updated",  label: "Every Week"        },
];

const INDUSTRIES = [
  { label: "Architecture",        icon: Building2, sub: "AI tools & stories", href: "/industries/architecture"    },
  { label: "Construction",        icon: HardHat,   sub: "AI tools & stories", href: "/industries/construction"    },
  { label: "Real Estate",         icon: Home,      sub: "AI tools & stories", href: "/industries/real-estate"     },
  { label: "Interior Design",     icon: Sofa,      sub: "AI tools & stories", href: "/industries/interior-design" },
  { label: "Furniture",           icon: Armchair,  sub: "AI tools & stories", href: "/industries/furniture"       },
  { label: "View All Industries", icon: Grid3x3,   sub: "Industry hubs",      href: "/industries"                 },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "AI Case Studies: Real Results in Furniture, Architecture & Real Estate",
  description:
    "Real-world AI case studies with measurable results for furniture, architecture, construction, and real estate businesses.",
  alternates: { canonical: "/resources/case-studies" },
  openGraph: {
    title: "AI Case Studies | SmartAI for Work",
    description:
      "Real-world AI case studies with measurable results for furniture, architecture, construction, and real estate businesses.",
    url: "/resources/case-studies",
    type: "website",
  },
};

export default function CaseStudiesPage() {
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
            <span className="text-[#1E293B] font-medium">Case Studies</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 overflow-hidden relative">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-50 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <div className="mb-5">
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                  Real Results. Real Impact.
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight mb-4">
                AI Case Studies
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #2563eb 0%, #f97316 100%)" }}
                >
                  That Deliver Results
                </span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                Explore real-world examples of how professionals and businesses use AI tools to solve problems, save time, and achieve measurable results.
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
                  placeholder="Search case studies (e.g. architecture, automation...)"
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-colors shrink-0">
                  Search
                </button>
              </div>
            </div>

            {/* Right — image + decorative cards */}
            <div className="relative hidden lg:block">
              {/* Background blur circles */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40" />
              <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-orange-100 rounded-full blur-3xl opacity-40" />

              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src="/casestudies.webp" alt="Case Studies illustration" className="w-full h-auto object-cover" />
              </div>

              {/* Decorative card 1 — stats stack (top-left) */}
              <div className="absolute -left-6 top-6 bg-white rounded-xl shadow-lg border border-gray-100 p-3 flex flex-col gap-2 min-w-[200px]">
                {[
                  { icon: TrendingUp, bg: "bg-purple-50", color: "text-purple-600", value: "+62%",   label: "Avg. Productivity Increase" },
                  { icon: Clock,      bg: "bg-blue-50",   color: "text-blue-600",   value: "1,250+", label: "Hours Saved Per Month"      },
                  { icon: DollarSign, bg: "bg-yellow-50", color: "text-yellow-600", value: "$4.3M+", label: "Cost Savings Generated"      },
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
                  AI helped us cut rendering time by 70% and close more projects faster.
                </p>
                <p className="text-xs text-gray-400 mt-2">— Sarah L. · Interior Design Studio</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: Explore Case Studies by Industry ── */}
      <section className="py-12 sm:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Explore Case Studies by Industry
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              See how AI is making an impact across different industries.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRIES.map(({ label, icon: Icon, sub, href }) => {
              const theme = INDUSTRY_THEME[label];
              return (
                <Link
                  key={label}
                  href={href}
                  className="border border-gray-100 rounded-xl p-4 bg-white text-center hover:shadow-md transition-shadow flex flex-col items-center"
                >
                  <div className={`w-10 h-10 rounded-lg ${theme.iconBg} flex items-center justify-center`}>
                    <Icon size={20} className={theme.iconColor} />
                  </div>
                  <p className="font-semibold text-sm text-[#1E293B] mt-2">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                  <span className="text-blue-600 text-xs mt-1 hover:underline">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Featured Case Studies ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Featured Case Studies</h2>
              <p className="text-sm text-gray-500 mt-1">Success stories from professionals and businesses using AI.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_REAL_CASES.map((cs) => (
              <ResourceCard
                key={cs.href}
                href={cs.href}
                thumbnailSrc={cs.thumbnail}
                thumbnailBgClassName="bg-gray-100"
                thumbnailContent={
                  <>
                    <span className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${CASE_BADGE[cs.badge]}`}>
                      {cs.badge}
                    </span>
                    <div className="absolute bottom-2 right-2 bg-white/95 rounded-lg px-2 py-1 flex items-center gap-1.5">
                      <span className={`w-5 h-5 rounded ${cs.company.logo.bg} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                        {cs.company.logo.text}
                      </span>
                      <span className="text-xs font-semibold text-[#1E293B]">{cs.company.name}</span>
                    </div>
                  </>
                }
                title={cs.title}
                description={cs.description}
                footer={
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {cs.stats.map(({ icon: iconName, value, label }) => {
                      const Icon = ICON_MAP[iconName] ?? Clock;
                      return (
                        <div key={label} className="flex flex-col items-center text-center">
                          <Icon size={12} className="text-gray-400 mb-0.5" />
                          <span className="font-bold text-sm text-[#1E293B] leading-none">{value}</span>
                          <span className="text-[10px] text-gray-400 leading-snug mt-0.5">{label}</span>
                        </div>
                      );
                    })}
                  </div>
                }
                linkText="Read Case Study →"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Real Results from Real Businesses ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Real Results from Real Businesses</h2>
            <p className="text-sm text-gray-500 mt-1">The average impact of AI adoption based on our case studies.</p>
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

            {/* ── LEFT COL: Latest Case Studies ── */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#1E293B]">Latest Case Studies</h2>
                <p className="text-sm text-gray-500 mt-1">Fresh success stories and real-world AI implementations.</p>
              </div>

              <ul>
                {/* These entries have no detail pages yet — render without links so we never emit internal 404s */}
                {LATEST_CASES.map((item) => (
                  <ResourceListRow
                    key={item.title}
                    title={item.title}
                    badge={{ label: item.badge, className: LATEST_CASE_BADGE[item.badge] }}
                    metaContent={
                      <>
                        <span className="text-gray-500">{item.company.name}</span>
                        <span className="text-gray-400">&bull; {item.tools}</span>
                        <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                          <TrendingUp size={11} className="shrink-0" />
                          {(item.result ?? "").replace("↑ ", "")}
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
                  {SIDEBAR_TOPICS_CS.map(({ label, href }) => (
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

              {/* Box 2: Share Your Story */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white">
                <h3 className="font-bold text-base text-[#1E293B] mb-1">Share Your Story</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Have a success story with AI tools? We&apos;d love to feature it.
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
                >
                  Submit Your Case Study
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
