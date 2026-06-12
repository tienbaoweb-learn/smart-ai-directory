export default function Newsletter() {
  return (
    <section id="newsletter" className="pt-3 pb-5 sm:pt-[17px] sm:pb-7 bg-white">
      <div className="max-w-[1215px] mx-auto px-4 sm:px-6 lg:px-8 pb-[10px]">
        <div
          className="rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 px-8 sm:px-12 py-10"
          style={{ background: "linear-gradient(to right, #1062B1 0%, #5cdce7 35%, #F5A623 70%, #F97316 100%)" }}
        >
          {/* Left — icon + heading + subtitle */}
          <div className="flex flex-row items-center gap-5 flex-[3]">
            <div className="bg-white rounded-2xl p-4 shadow-lg shrink-0">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-1 leading-snug">
                Get Weekly AI Tools &amp; Workflow Ideas
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Join 1000+ professionals who get practical AI tips, tool reviews, and workflows every week.
              </p>
            </div>
          </div>

          {/* Right — input + button + trust badges */}
          <div className="flex-[2] w-full flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl text-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
              <button className="bg-[#1E293B] hover:bg-slate-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors whitespace-nowrap text-sm">
                Subscribe Now
              </button>
            </div>
            <div className="flex flex-wrap gap-4 text-white text-xs">
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
