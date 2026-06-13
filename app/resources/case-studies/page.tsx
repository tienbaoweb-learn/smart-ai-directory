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
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";

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

const FEATURED_CASES = [
  {
    badge: "INTERIOR DESIGN",
    company: { name: "Studio Luxe", bg: "bg-black",      letter: "S" },
    imageHint: "luxury living room interior",
    title: "How Studio Luxe Cut Rendering Time by 70% with AI",
    desc: "Using Midjourney and DALL-E 3, Studio Luxe delivers high-quality concepts in minutes instead of days.",
    stats: [
      { icon: Clock,       value: "70%",   label: "Time Saved"     },
      { icon: TrendingUp,  value: "45%",   label: "More Projects"  },
      { icon: DollarSign,  value: "$120K", label: "Annual Savings" },
    ],
  },
  {
    badge: "ARCHITECTURE",
    company: { name: "ArchVision", bg: "bg-slate-700", letter: "A" },
    imageHint: "modern architecture building rendering",
    title: "ArchVision Increases Client Approvals with AI Visuals",
    desc: "AI-generated visuals helped ArchVision improve client understanding and increase approval rate.",
    stats: [
      { icon: CheckCircle, value: "60%",   label: "Approval Rate"     },
      { icon: Zap,         value: "35%",   label: "Faster Decisions"  },
      { icon: DollarSign,  value: "$200K", label: "Revenue Impact"    },
    ],
  },
  {
    badge: "CONSTRUCTION",
    company: { name: "BuildSmart", bg: "bg-yellow-500", letter: "B" },
    imageHint: "construction site aerial view",
    title: "BuildSmart Saves 1,200+ Hours Monthly with AI Automation",
    desc: "AI automation for reports, progress tracking, and documentation saved hours every week.",
    stats: [
      { icon: Clock,        value: "1,200+", label: "Hours Saved"      },
      { icon: TrendingDown, value: "30%",    label: "Cost Reduction"   },
      { icon: DollarSign,   value: "$350K",  label: "Annual Savings"   },
    ],
  },
  {
    badge: "REAL ESTATE",
    company: { name: "Prime Realty", bg: "bg-gray-900", letter: "P" },
    imageHint: "modern house exterior dusk",
    title: "Prime Realty Generates 3x More Leads with AI Marketing",
    desc: "AI-powered content and ad automation helped Prime Realty triple their qualified leads.",
    stats: [
      { icon: Users,        value: "3x",    label: "More Leads"      },
      { icon: TrendingDown, value: "50%",   label: "Lower CPL"       },
      { icon: DollarSign,   value: "$160K", label: "Pipeline Value"  },
    ],
  },
];

const LATEST_CASE_BADGE: Record<string, string> = {
  "INTERIOR DESIGN": "text-purple-600 bg-purple-50",
  "CONSTRUCTION":    "text-orange-600 bg-orange-50",
  "REAL ESTATE":     "text-emerald-600 bg-emerald-50",
  "MARKETING":       "text-pink-600 bg-pink-50",
  "ARCHITECTURE":    "text-blue-600 bg-blue-50",
};

const LATEST_CASES = [
  { badge: "INTERIOR DESIGN", title: "From 20 Hours to 2: How AI Transformed Our Design Process",          company: "Studio Nest",       tools: "Midjourney, RoomGPT",  result: "↑ 90% Time Saved",      date: "May 20, 2026" },
  { badge: "CONSTRUCTION",    title: "AI-Powered Cost Estimation That Improved Our Bidding Accuracy",      company: "ConstructPro",      tools: "Buildots AI",          result: "↑ 38% More Accurate",   date: "May 18, 2026" },
  { badge: "REAL ESTATE",     title: "How AI Helped Us Close $2M in Deals in Just 60 Days",               company: "Urban Nest Realty", tools: "ChatGPT + Zapier",     result: "↑ $2M Pipeline",        date: "May 16, 2026" },
  { badge: "MARKETING",       title: "Automating Content Creation: Our AI Workflow for 10x More Output",  company: "DesignFlow",        tools: "Jasper + Canva AI",    result: "↑ 10x More Content",    date: "May 14, 2026" },
  { badge: "ARCHITECTURE",    title: "AI Design Tools That Helped Us Win More Competitions",              company: "NextForm Studio",   tools: "Vizcom",               result: "↑ More Wins",           date: "May 12, 2026" },
];

const SIDEBAR_TOPICS_CS = [
  "AI in Architecture",
  "AI in Construction",
  "AI in Real Estate",
  "AI in Interior Design",
  "AI Automation",
  "AI Marketing",
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
  { label: "Architecture",          icon: Building2, sub: "16 Case Studies" },
  { label: "Construction",          icon: HardHat,   sub: "16 Case Studies" },
  { label: "Real Estate",           icon: Home,      sub: "14 Case Studies" },
  { label: "Interior Design",       icon: Sofa,      sub: "15 Case Studies" },
  { label: "Furniture",             icon: Armchair,  sub: "10 Case Studies" },
  { label: "View All Industries",   icon: Grid3x3,   sub: "All Case Studies"},
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

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

              {/* Main image placeholder */}
              {/* TODO: replace with Unsplash image "modern living room interior" */}
              <div className="relative bg-gray-200 rounded-2xl aspect-[4/3] w-full overflow-hidden flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12h.008v.008H13.5V12z" />
                </svg>
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
            {INDUSTRIES.map(({ label, icon: Icon, sub }) => {
              const theme = INDUSTRY_THEME[label];
              return (
                <a
                  key={label}
                  href="#"
                  className="border border-gray-100 rounded-xl p-4 bg-white text-center hover:shadow-md transition-shadow flex flex-col items-center"
                >
                  <div className={`w-10 h-10 rounded-lg ${theme.iconBg} flex items-center justify-center`}>
                    <Icon size={20} className={theme.iconColor} />
                  </div>
                  <p className="font-semibold text-sm text-[#1E293B] mt-2">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                  <span className="text-blue-600 text-xs mt-1 hover:underline">→</span>
                </a>
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
            <a href="#" className="hidden md:inline-block text-blue-600 text-sm font-medium hover:underline shrink-0">
              View all case studies →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_CASES.map((cs) => (
              <div key={cs.title} className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow flex flex-col">
                {/* Thumbnail */}
                <div className="bg-gray-300 aspect-[4/3] relative">
                  {/* TODO: replace with Unsplash image — hint: {cs.imageHint} */}
                  <span className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${CASE_BADGE[cs.badge]}`}>
                    {cs.badge}
                  </span>
                  <div className="absolute bottom-2 left-2 bg-white/95 rounded-lg px-2 py-1 flex items-center gap-1.5">
                    <span className={`w-5 h-5 rounded ${cs.company.bg} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                      {cs.company.letter}
                    </span>
                    <span className="text-xs font-semibold text-[#1E293B]">{cs.company.name}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="font-semibold text-sm text-[#1E293B] line-clamp-2 leading-snug">{cs.title}</p>
                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-3 leading-relaxed flex-1">{cs.desc}</p>

                  {/* Mini stats */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {cs.stats.map(({ icon: Icon, value, label }) => (
                      <div key={label} className="flex flex-col items-center text-center">
                        <Icon size={12} className="text-gray-400 mb-0.5" />
                        <span className="font-bold text-sm text-[#1E293B] leading-none">{value}</span>
                        <span className="text-[10px] text-gray-400 leading-snug mt-0.5">{label}</span>
                      </div>
                    ))}
                  </div>

                  <a href="#" className="text-blue-600 text-xs font-medium mt-3 hover:underline inline-block">
                    Read Case Study →
                  </a>
                </div>
              </div>
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
                {LATEST_CASES.map((item) => (
                  <li key={item.title} className="flex gap-4 items-start py-4 border-b border-gray-100 last:border-0">
                    {/* Thumbnail */}
                    <div className="bg-gray-300 rounded-lg w-20 h-16 md:w-24 md:h-20 flex-shrink-0">
                      {/* TODO: replace with image */}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <a href="#" className="font-semibold text-sm md:text-base text-[#1E293B] hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </a>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                        <span className={`rounded-full px-2 py-0.5 font-semibold ${LATEST_CASE_BADGE[item.badge]}`}>
                          {item.badge}
                        </span>
                        <span className="text-gray-500">{item.company}</span>
                        <span className="text-gray-400">&bull; {item.tools}</span>
                        <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                          <TrendingUp size={11} className="shrink-0" />
                          {item.result.replace("↑ ", "")}
                        </span>
                        <span className="text-gray-400 ml-auto hidden sm:inline">{item.date}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <a href="#" className="text-blue-600 text-sm font-medium mt-4 hover:underline block text-center">
                Load more case studies →
              </a>
            </div>

            {/* ── RIGHT COL: Sidebar ── */}
            <div className="lg:col-span-1">

              {/* Box 1: Popular Topics */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white mb-6">
                <h3 className="font-bold text-base text-[#1E293B] mb-3">Popular Topics</h3>
                <ul>
                  {SIDEBAR_TOPICS_CS.map((topic) => (
                    <li key={topic}>
                      <a
                        href="#"
                        className="flex justify-between items-center text-sm text-gray-700 hover:text-blue-600 py-1.5 border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <span>{topic}</span>
                        <ChevronRight size={14} className="shrink-0 text-gray-400" />
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="block w-full border border-blue-600 text-blue-600 rounded-lg py-2 text-sm font-medium text-center mt-3 hover:bg-blue-50 transition-colors"
                >
                  View all topics
                </a>
              </div>

              {/* Box 2: Share Your Story */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white">
                <h3 className="font-bold text-base text-[#1E293B] mb-1">Share Your Story</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Have a success story with AI tools? We&apos;d love to feature it.
                </p>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
                >
                  Submit Your Case Study
                  <ArrowRight size={15} className="shrink-0" />
                </a>
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
