import Link from "next/link";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

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

      {/* SECTION 2: Choose Your Industry (placeholder for next task) */}
      <div id="industry-picks" />

      <Newsletter />
      <Footer />
    </div>
  );
}
