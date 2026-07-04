import Image from "next/image";
import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Explore",
    links: [
      { label: "AI Tools",    href: "/ai-tools"            },
      { label: "Industries",  href: "/industries"          },
      { label: "Best Of",     href: "/best-of"             },
      { label: "All Reviews", href: "/all-reviews"         },
      { label: "Workflows",   href: "/resources/workflows" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Furniture",     href: "/industries/furniture"     },
      { label: "Architecture",  href: "/industries/architecture"  },
      { label: "Construction",  href: "/industries/construction"  },
      { label: "Real Estate",   href: "/industries/real-estate"   },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides",       href: "/resources/guides"      },
      { label: "Comparisons",  href: "/resources/comparisons" },
      { label: "AI Glossary",  href: "/ai-glossary"           },
      { label: "Browse Topics",href: "/tags"                  },
      { label: "Submit a Tool",href: "/contact"               },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us",             href: "/about-us"             },
      { label: "How We Review",        href: "/how-we-review"        },
      { label: "Contact",              href: "/contact"              },
      { label: "Privacy Policy",       href: "/privacy-policy"       },
      { label: "Terms of Use",         href: "/terms-of-use"         },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    ],
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
                { label: "X",        icon: "✕" },
                { label: "LinkedIn", icon: "in" },
                { label: "YouTube",  icon: "▶" },
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
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors">
                      {label}
                    </Link>
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

        {/* Affiliate disclosure notice */}
        <div className="mb-4 text-center">
          <p className="text-xs text-[#777F8A] leading-relaxed">
            Some links on this site are affiliate links. We may earn a commission at no extra cost to you.{" "}
            <Link href="/affiliate-disclosure" className="underline hover:text-white/70 transition-colors">
              Learn more →
            </Link>
          </p>
          <p className="text-xs text-[#777F8A] leading-relaxed mt-1">
            Ratings on this site reflect our team&apos;s independent testing and research, not aggregated user reviews.
          </p>
        </div>

        {/* Copyright line */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-white/40 text-xs">
          <p>© 2026 SmartAIforWork. All rights reserved.</p>
          <span className="hidden sm:inline">·</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy"       className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use"         className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
