"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu, X, ChevronDown,
  Layers, Star, Sparkles, Tag, PenLine, Palette, Workflow, BarChart3, TrendingUp,
  Building2, HardHat, Home, Sofa, Armchair, Grid3x3,
  Trophy, ArrowRight,
  BookOpen, GraduationCap, Scale, Briefcase, BookMarked, Newspaper,
  Info, Mail, Shield, FileText,
} from "lucide-react";

// ── Desktop dropdown data ──────────────────────────────────────────────────────

type DropdownItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  accent?: boolean;
};

type DropdownSection = {
  title?: string;
  items: DropdownItem[];
};

const DROPDOWNS: Record<string, { minWidth: string; sections: DropdownSection[] }> = {
  "AI Tools": {
    minWidth: "min-w-[260px]",
    sections: [
      {
        title: "BROWSE TOOLS",
        items: [
          { icon: Layers,    label: "All AI Tools",   href: "/ai-tools" },
          { icon: Star,      label: "Top Rated",      href: "/ai-tools?sort=top-rated" },
          { icon: Sparkles,  label: "New Arrivals",   href: "/ai-tools?sort=newest" },
          { icon: Tag,       label: "Free Tools",     href: "/ai-tools?pricing=free" },
        ],
      },
      {
        title: "BY CATEGORY",
        items: [
          { icon: PenLine,    label: "AI Content & Marketing",       href: "/ai-tools/content-marketing" },
          { icon: Palette,    label: "AI Design & Visualization",    href: "/ai-tools/design" },
          { icon: Workflow,   label: "AI Automation & Workflow",     href: "/ai-tools/automation" },
          { icon: BarChart3,  label: "AI Productivity & Management", href: "/ai-tools/productivity" },
          { icon: TrendingUp, label: "AI Sales & Lead Generation",   href: "/ai-tools/sales" },
        ],
      },
    ],
  },
  "Industries": {
    minWidth: "min-w-[240px]",
    sections: [
      {
        title: "INDUSTRIES",
        items: [
          { icon: Building2, label: "Architecture",    href: "/industries/architecture" },
          { icon: HardHat,   label: "Construction",    href: "/industries/construction" },
          { icon: Home,      label: "Real Estate",     href: "/industries/real-estate" },
          { icon: Sofa,      label: "Interior Design", href: "/industries/interior-design" },
          { icon: Armchair,  label: "Furniture",       href: "/industries/furniture" },
        ],
      },
      {
        items: [
          { icon: Grid3x3, label: "View All Industries →", href: "/industries", accent: true },
        ],
      },
    ],
  },
  "Best Of": {
    minWidth: "min-w-[240px]",
    sections: [
      {
        title: "RANKINGS",
        items: [
          { icon: Trophy,    label: "Best Overall",             href: "/best-of" },
          { icon: Building2, label: "Best for Architecture",    href: "/best-of/architecture" },
          { icon: HardHat,   label: "Best for Construction",    href: "/best-of/construction" },
          { icon: Home,      label: "Best for Real Estate",     href: "/best-of/real-estate" },
          { icon: Sofa,      label: "Best for Interior Design", href: "/best-of/interior-design" },
        ],
      },
      {
        items: [
          { icon: ArrowRight, label: "View All Rankings →", href: "/best-of", accent: true },
        ],
      },
    ],
  },
  "Resources": {
    minWidth: "min-w-[260px]",
    sections: [
      {
        title: "LEARN",
        items: [
          { icon: BookOpen,      label: "Guides",      href: "/resources/guides" },
          { icon: GraduationCap, label: "Tutorials",   href: "/resources/tutorials" },
          { icon: Workflow,      label: "Workflows",   href: "/resources/workflows" },
          { icon: Scale,         label: "Comparisons", href: "/resources/comparisons" },
        ],
      },
      {
        title: "EXPLORE",
        items: [
          { icon: Briefcase,  label: "Case Studies", href: "/resources/case-studies" },
          { icon: BookMarked, label: "AI Glossary",  href: "/ai-glossary" },
          { icon: Newspaper,  label: "AI News",      href: "/resources/ai-news" },
        ],
      },
    ],
  },
  "About": {
    minWidth: "min-w-[200px]",
    sections: [
      {
        items: [
          { icon: Info,     label: "About Us",       href: "/about-us" },
          { icon: Mail,     label: "Contact",        href: "/contact" },
          { icon: Shield,   label: "Privacy Policy", href: "/privacy-policy" },
          { icon: FileText, label: "Terms of Use",   href: "/terms-of-use" },
        ],
      },
    ],
  },
};

// Route for clicking the desktop nav label directly
const DESKTOP_NAV_ROUTES: Record<string, string> = {
  "AI Tools":   "/ai-tools",
  "Industries": "/industries",
  "Best Of":    "/best-of",
  "Resources":  "/resources",
  "About":      "/about-us",
};

const DESKTOP_NAV = ["AI Tools", "Industries", "Best Of", "Resources", "About"];

// ── Mobile nav with accordion submenus ────────────────────────────────────────

type MobileSubItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  dividerLabel?: string; // renders a section label above this item
};

type MobileNavItem =
  | { label: "Home"; href: "/"; sub?: never }
  | { label: string; href: string; sub: MobileSubItem[] };

const MOBILE_NAV: MobileNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "AI Tools",
    href: "/ai-tools",
    sub: [
      { icon: Layers,    label: "All AI Tools",   href: "/ai-tools" },
      { icon: Star,      label: "Top Rated",      href: "/ai-tools?sort=top-rated" },
      { icon: Sparkles,  label: "New Arrivals",   href: "/ai-tools?sort=newest" },
      { icon: Tag,       label: "Free Tools",     href: "/ai-tools?pricing=free" },
      { icon: PenLine,    label: "AI Content & Marketing",       href: "/ai-tools/content-marketing",  dividerLabel: "BY CATEGORY" },
      { icon: Palette,    label: "AI Design & Visualization",    href: "/ai-tools/design" },
      { icon: Workflow,   label: "AI Automation & Workflow",     href: "/ai-tools/automation" },
      { icon: BarChart3,  label: "AI Productivity & Management", href: "/ai-tools/productivity" },
      { icon: TrendingUp, label: "AI Sales & Lead Generation",   href: "/ai-tools/sales" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    sub: [
      { icon: Building2, label: "Architecture",          href: "/industries/architecture" },
      { icon: HardHat,   label: "Construction",          href: "/industries/construction" },
      { icon: Home,      label: "Real Estate",           href: "/industries/real-estate" },
      { icon: Sofa,      label: "Interior Design",       href: "/industries/interior-design" },
      { icon: Armchair,  label: "Furniture",             href: "/industries/furniture" },
      { icon: Grid3x3,   label: "View All Industries",   href: "/industries" },
    ],
  },
  {
    label: "Best Of",
    href: "/best-of",
    sub: [
      { icon: Trophy,    label: "Best Overall",             href: "/best-of" },
      { icon: Building2, label: "Best for Architecture",    href: "/best-of/architecture" },
      { icon: HardHat,   label: "Best for Construction",    href: "/best-of/construction" },
      { icon: Home,      label: "Best for Real Estate",     href: "/best-of/real-estate" },
      { icon: Sofa,      label: "Best for Interior Design", href: "/best-of/interior-design" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    sub: [
      { icon: BookOpen,      label: "Guides",       href: "/resources/guides" },
      { icon: GraduationCap, label: "Tutorials",    href: "/resources/tutorials" },
      { icon: Workflow,      label: "Workflows",    href: "/resources/workflows" },
      { icon: Scale,         label: "Comparisons",  href: "/resources/comparisons" },
      { icon: Briefcase,     label: "Case Studies", href: "/resources/case-studies" },
      { icon: BookMarked,    label: "AI Glossary",  href: "/ai-glossary" },
      { icon: Newspaper,     label: "AI News",      href: "/resources/ai-news" },
    ],
  },
  {
    label: "About",
    href: "/about-us",
    sub: [
      { icon: Info,     label: "About Us",       href: "/about-us" },
      { icon: Mail,     label: "Contact",        href: "/contact" },
      { icon: Shield,   label: "Privacy Policy", href: "/privacy-policy" },
      { icon: FileText, label: "Terms of Use",   href: "/terms-of-use" },
    ],
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen]               = useState(false);
  const [activeDropdown, setActiveDropdown]       = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navbarRef  = useRef<HTMLElement>(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleEnter(name: string) {
    clearTimeout(leaveTimer.current);
    setActiveDropdown(name);
  }

  function handleLeave() {
    leaveTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  }

  function toggleMobileSubmenu(name: string) {
    setOpenMobileSubmenu((prev) => (prev === name ? null : name));
  }

  function closeMobileMenu() {
    setIsMenuOpen(false);
    setOpenMobileSubmenu(null);
  }

  return (
    <header ref={navbarRef} className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
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
            {DESKTOP_NAV.map((name) => {
              const isOpen = activeDropdown === name;
              const dropdown = DROPDOWNS[name];
              return (
                <div
                  key={name}
                  className="relative"
                  onMouseEnter={() => handleEnter(name)}
                  onMouseLeave={handleLeave}
                >
                  {/* Label is a Link so clicking navigates; hover on wrapper shows dropdown */}
                  <Link
                    href={DESKTOP_NAV_ROUTES[name]}
                    onClick={() => setActiveDropdown(null)}
                    className={`flex items-center gap-1.5 text-[15px] font-medium px-4 py-2.5 rounded-md transition-colors ${
                      isOpen ? "text-[#F97316]" : "text-[#1E293B] hover:text-[#F97316]"
                    }`}
                  >
                    {name}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Dropdown panel */}
                  {isOpen && (
                    <div
                      className={`absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-4 ${dropdown.minWidth}`}
                      onMouseEnter={() => handleEnter(name)}
                      onMouseLeave={handleLeave}
                    >
                      {dropdown.sections.map((section, si) => (
                        <div key={si}>
                          {si > 0 && <div className="border-t border-gray-100 my-2" />}
                          {section.title && (
                            <p className="text-[10px] uppercase text-gray-400 font-semibold mb-2 px-2">
                              {section.title}
                            </p>
                          )}
                          {section.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href + item.label}
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className={`flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-gray-50 text-sm transition-colors ${
                                  item.accent ? "text-blue-600 font-medium" : "text-gray-700"
                                }`}
                              >
                                <Icon size={15} className="shrink-0" />
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right side */}
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

      {/* ── Mobile menu ── */}
      {isMenuOpen && (
        <nav
          role="navigation"
          aria-label="Mobile navigation"
          className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg z-50 max-h-[80vh] overflow-y-auto"
        >
          <div className="px-4 py-2">
            {MOBILE_NAV.map((item) => {
              // "Home" — no submenu
              if (!item.sub) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block py-3 text-base font-medium text-gray-700 border-b border-gray-100 hover:text-[#F97316] transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              }

              const isSubOpen = openMobileSubmenu === item.label;

              return (
                <div key={item.label} className="border-b border-gray-100">
                  {/* Row: link label (left) + chevron toggle (right) */}
                  <div className="flex justify-between items-center py-3">
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="text-base font-medium text-gray-700 hover:text-[#F97316] transition-colors"
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() => toggleMobileSubmenu(item.label)}
                      className="p-1 text-gray-400 hover:text-[#F97316] transition-colors"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isSubOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Accordion submenu */}
                  {isSubOpen && (
                    <div className="bg-gray-50 rounded-lg mx-0 my-1 py-2 px-3">
                      {item.sub.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <div key={sub.href + sub.label}>
                            {sub.dividerLabel && (
                              <p className="text-[10px] uppercase text-gray-400 font-semibold mt-2 mb-1 px-1">
                                {sub.dividerLabel}
                              </p>
                            )}
                            <Link
                              href={sub.href}
                              onClick={closeMobileMenu}
                              className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[#F97316] transition-colors rounded-md"
                            >
                              <Icon size={14} className="shrink-0" />
                              {sub.label}
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Subscribe button */}
            <Link
              href="#"
              onClick={closeMobileMenu}
              className="block mt-3 mb-2 bg-[#F97316] hover:bg-orange-600 text-white text-base font-semibold text-center py-3 rounded-lg transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
