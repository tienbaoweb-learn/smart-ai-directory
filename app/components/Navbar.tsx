"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "AI Tools",   href: "/ai-tools" },
  { label: "Industries", href: "/industries" },
  { label: "Best Of",    href: "/best-of" },
  { label: "Resources",  href: "/resources" },
  { label: "About",      href: "/about-us" },
];

function ChevronDown() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/SmartaiforworkLogo.webp"
              alt="SmartAI for Work"
              width={216}
              height={68}
              className="h-[60px] w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.filter((l) => l.label !== "Home").map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 text-[15px] font-medium text-[#1E293B] hover:text-[#F97316] px-4 py-2.5 rounded-md transition-colors"
              >
                {item.label}
                <ChevronDown />
              </Link>
            ))}
          </nav>

          {/* Right side: search + subscribe + hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="p-2.5 text-gray-500 hover:text-[#F97316] transition-colors rounded-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
            </button>
            <button className="hidden sm:inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-orange-100">
              Subscribe
            </button>
            {/* Hamburger — mobile only */}
            <button
              className="flex lg:hidden p-2 text-gray-600 hover:text-[#F97316] transition-colors rounded-md"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav
          role="navigation"
          aria-label="Mobile navigation"
          className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg z-50"
        >
          <div className="px-4 py-4">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-base font-medium text-gray-700 border-b border-gray-100 last:border-0 hover:text-[#F97316] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="block mt-3 bg-[#F97316] hover:bg-orange-600 text-white text-base font-semibold text-center py-3 rounded-lg transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
