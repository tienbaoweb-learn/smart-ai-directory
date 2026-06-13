import Image from "next/image";

const FOOTER_COLS = [
  {
    title: "Explore",
    links: ["AI Tools", "Industries", "Best Of", "All Reviews", "Workflows"],
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

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white pt-12 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <Image
                src="/SmartaiforworkLogo.webp"
                alt="SmartAI for Work"
                width={162}
                height={51}
                className="h-11 w-auto"
              />
            </div>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-5">
              Helping professionals in furniture, architecture, construction, and real estate work smarter with AI.
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

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p className="font-bold text-xs sm:text-sm text-white mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

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

        <div className="mb-8">
          <p className="text-xs text-[#777F8A] leading-relaxed">
            Disclaimer: Some links on this page are affiliate links, meaning we may earn a commission at no cost to you. We only recommend tools we believe provide real value. This helps support our independent research. Thank you!
          </p>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-white/40 text-xs">
          <p>© 2026 SmartAI for Work. All rights reserved.</p>
          <span className="hidden sm:inline">·</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
