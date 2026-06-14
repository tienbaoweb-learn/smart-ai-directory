"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const TOC_ITEMS = [
  { label: "Overview",          href: "#overview"      },
  { label: "Key Features",      href: "#key-features"  },
  { label: "Pricing",           href: "#pricing"       },
  { label: "Pros & Cons",       href: "#pros-cons"     },
  { label: "Who It's Best For", href: "#best-for"      },
  { label: "Alternatives",      href: "#alternatives"  },
  { label: "Final Verdict",     href: "#final-verdict" },
  { label: "FAQ",               href: "#faq"           },
];

export default function TableOfContents() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-16 z-20 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mobile: collapsible toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex justify-between items-center py-3 text-sm font-medium text-gray-700 lg:hidden"
        >
          <span>On this page</span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-200 ${
              mobileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Mobile: dropdown nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-3 flex flex-col gap-0.5">
            {TOC_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-gray-600 hover:text-blue-600 py-1.5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Desktop: horizontal pill row */}
        <nav className="hidden lg:flex items-center gap-1 py-2 overflow-x-auto">
          {TOC_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

      </div>
    </div>
  );
}
