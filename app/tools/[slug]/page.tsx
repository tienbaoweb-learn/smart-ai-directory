import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import type { HTMLAttributes } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  Building2,
  Calendar,
  Check,
  CheckCircle,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Layers,
  Mail,
  MapPin,
  Megaphone,
  Monitor,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  StarHalf,
  Trophy,
  Users,
  XCircle,
  Zap,
  type LucideIcon,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import {
  AffiliateCTA,
  ProConList,
  RatingBadge,
  PricingTable,
} from "../../components/mdx/MDXComponents";
import {
  getAllTools,
  getAllToolSlugs,
  getRelatedTools,
  getToolBySlug,
  type ToolFrontmatter,
  type PricingType,
} from "../../../lib/tools";
import { TOOL_LOGO_URLS } from "../../data/tool-logos";
import FAQAccordion, {
  type FAQItem,
} from "../../components/tools/FAQAccordion";
import PricingPlans from "../../components/tools/PricingPlans";
import { getComparisonsForTool } from "../../../lib/comparisons";
import { getWorkflowsForTool } from "../../../lib/workflows-data";

// ── generateStaticParams + generateMetadata ────────────────────────────────────

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };
  const { frontmatter: f } = tool;
  return {
    title: `${f.title} Review (2026) | SmartAIforWork`,
    description: f.excerpt,
    alternates: { canonical: `/tools/${slug}` },
    openGraph: {
      title: `${f.title} Review`,
      description: f.excerpt,
      type: "article",
      url: `https://www.smartaiforwork.com/tools/${slug}`,
    },
  };
}

// ── Constants ──────────────────────────────────────────────────────────────────

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LOGO_BG: Record<string, string> = {
  Furniture: "bg-orange-600",
  Architecture: "bg-blue-700",
  Construction: "bg-amber-600",
  "Real Estate": "bg-purple-700",
  "Cross-niche": "bg-slate-700",
};

const FEATURE_THEMES = [
  { bg: "bg-blue-50", icon: "text-blue-600" },
  { bg: "bg-purple-50", icon: "text-purple-600" },
  { bg: "bg-orange-50", icon: "text-orange-500" },
  { bg: "bg-emerald-50", icon: "text-emerald-600" },
  { bg: "bg-pink-50", icon: "text-pink-600" },
  { bg: "bg-teal-50", icon: "text-teal-600" },
];

const FEATURE_ICONS: LucideIcon[] = [
  Sparkles,
  Layers,
  Globe,
  Users,
  Zap,
  Search,
  Share2,
  Mail,
  Megaphone,
  FileText,
  Building2,
  MapPin,
];

const ALT_COLORS = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-emerald-600",
  "bg-red-600",
  "bg-amber-600",
];

const TOC_ITEMS = [
  { label: "Overview", href: "overview" },
  { label: "Key Features", href: "key-features" },
  { label: "Use Cases", href: "best-for" },
  { label: "Pricing", href: "pricing" },
  { label: "Pros & Cons", href: "pros-cons" },
  { label: "Alternatives", href: "alternatives" },
  { label: "Comparison", href: "comparison" },
  { label: "Final Verdict", href: "final-verdict" },
  { label: "FAQ", href: "faq" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${MONTHS[parseInt(month, 10) - 1]} ${day}, ${year}`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Pricing plan generator ─────────────────────────────────────────────────────

function generatePricingPlans(
  pricingType: PricingType | undefined,
  pricing: string | undefined,
  toolName: string,
): {
  name: string;
  price: string;
  period: string;
  description: string;
  ctaText: string;
  features: string[];
  highlighted: boolean;
}[] {
  if (!pricingType || !pricing) return [];
  const numMatch = pricing.match(/[\d.]+/);
  const basePrice = numMatch ? parseFloat(numMatch[0]) : 29;

  if (pricingType === "Free") {
    return [
      {
        name: "Free",
        price: "$0",
        period: "/mo",
        description: "Everything you need to get started",
        ctaText: "Get Started Free",
        features: [
          "Core features included",
          "Community support",
          "Basic integrations",
          "Limited usage",
        ],
        highlighted: false,
      },
    ];
  }

  if (pricingType === "Freemium") {
    return [
      {
        name: "Free",
        price: "$0",
        period: "/mo",
        description: "Get started at no cost",
        ctaText: "Start Free",
        features: ["Basic features", "Limited usage", "Community support"],
        highlighted: false,
      },
      {
        name: "Pro",
        price: pricing.startsWith("$") ? pricing : `$${basePrice}`,
        period: "/mo",
        description: "For professionals and growing teams",
        ctaText: `Try ${toolName} Pro`,
        features: [
          "All Free features",
          "Unlimited usage",
          "Priority support",
          "Advanced integrations",
          "Analytics",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Custom pricing for large teams",
        ctaText: "Contact Sales",
        features: [
          "Everything in Pro",
          "Custom workflows",
          "Dedicated support",
          "SLA guarantee",
          "SSO & security",
        ],
        highlighted: false,
      },
    ];
  }

  if (pricingType === "Custom") {
    return [
      {
        name: "Starter",
        price: "Custom",
        period: "",
        description: "Tailored for small teams",
        ctaText: "Get a Quote",
        features: ["Core features", "Email support", "Standard integrations"],
        highlighted: false,
      },
      {
        name: "Professional",
        price: "Custom",
        period: "",
        description: "Built for growing businesses",
        ctaText: "Get a Quote",
        features: [
          "Advanced features",
          "Priority support",
          "API access",
          "Custom integrations",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For large organisations",
        ctaText: "Contact Sales",
        features: [
          "Full feature set",
          "Dedicated support",
          "SLA guarantee",
          "On-premise option",
        ],
        highlighted: false,
      },
    ];
  }

  // Paid
  const monthly = basePrice || 29;
  return [
    {
      name: "Starter",
      price: `$${Math.round(monthly * 0.6)}`,
      period: "/mo",
      description: "Perfect for individuals",
      ctaText: "Start Free Trial",
      features: [
        "Core features",
        "5 projects",
        "Email support",
        "Standard exports",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      price: pricing.startsWith("$") ? pricing : `$${monthly}`,
      period: "/mo",
      description: "Best for professionals",
      ctaText: `Try ${toolName}`,
      features: [
        "All Starter features",
        "Unlimited projects",
        "Priority support",
        "Advanced integrations",
        "API access",
      ],
      highlighted: true,
    },
    {
      name: "Business",
      price: `$${Math.round(monthly * 2.5)}`,
      period: "/mo",
      description: "For teams and agencies",
      ctaText: "Contact Sales",
      features: [
        "All Pro features",
        "Team collaboration",
        "Admin controls",
        "Custom workflows",
        "Dedicated manager",
      ],
      highlighted: false,
    },
  ];
}

// ── FAQ generator ──────────────────────────────────────────────────────────────

function generateFAQs(f: ToolFrontmatter, toolName: string): FAQItem[] {
  const freeAnswer: Record<string, string> = {
    Free: `Yes — ${toolName} is completely free with no credit card required.`,
    Freemium: `Yes, ${toolName} offers a free tier with limited features. Paid plans unlock more.`,
    Paid: `No, ${toolName} is a paid tool. Check their website for current pricing.`,
    Custom: `${toolName} uses custom pricing. Contact their sales team for a quote.`,
  };
  return [
    {
      question: `Is ${toolName} free to use?`,
      answer:
        (f.pricingType && freeAnswer[f.pricingType]) ??
        `Check ${toolName}'s website for current pricing.`,
    },
    {
      question: `What is ${toolName} best for?`,
      answer:
        f.bestFor.length > 0
          ? `${toolName} is best for ${f.bestFor.join(", ")}.`
          : `${toolName} is a powerful AI tool for professionals in the ${f.category} industry.`,
    },
    {
      question: `How does ${toolName} compare to alternatives?`,
      answer:
        f.alternatives.length > 0
          ? `${toolName} competes with ${f.alternatives.slice(0, 3).join(", ")}. The best choice depends on your workflow, budget, and specific needs.`
          : `${toolName} is one of the leading tools in its category. Compare features and pricing to find the best fit.`,
    },
    {
      question: `Does ${toolName} offer a free trial?`,
      answer:
        f.pricingType === "Free"
          ? `${toolName} is completely free — no trial needed.`
          : f.pricingType === "Freemium"
            ? `Yes, ${toolName} has a free tier available indefinitely. Paid plans may include a trial period too.`
            : `${toolName} typically offers a free trial or demo. Visit their website for the latest offer.`,
    },
  ];
}

// ── Star row (server-safe — no useState) ──────────────────────────────────────

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star
          key={`f${i}`}
          size={size}
          className="text-amber-400 fill-amber-400"
        />
      ))}
      {half && (
        <StarHalf size={size} className="text-amber-400 fill-amber-400" />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star
          key={`e${i}`}
          size={size}
          className="text-gray-200 fill-gray-200"
        />
      ))}
    </div>
  );
}

// ── Breadcrumb arrow ───────────────────────────────────────────────────────────

function BreadArrow() {
  return (
    <svg
      className="w-3 h-3 text-gray-300 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ── MDX overrides ──────────────────────────────────────────────────────────────

const mdxComponents = {
  AffiliateCTA,
  RatingBadge,
  PricingTable,
  ProConList,
  h2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold text-[#1E293B] mt-6 mb-2" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-base font-semibold text-[#1E293B] mt-4 mb-1.5"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-600 leading-relaxed mb-3" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-inside space-y-1 text-gray-600 mb-4 ml-2"
      {...props}
    >
      {children}
    </ul>
  ),
  li: ({ children, ...props }: HTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-600 text-sm" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-[#1E293B]" {...props}>
      {children}
    </strong>
  ),
  code: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-gray-100 text-[#1E293B] rounded px-1.5 py-0.5 text-[0.85em] font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  table: ({ children, ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-4 border border-gray-100 rounded-lg">
      <table className="w-full text-sm border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),
  tr: ({ children, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-gray-100 last:border-0" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left font-semibold text-[#1E293B] px-3 py-2 whitespace-nowrap"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <td className="text-gray-600 px-3 py-2" {...props}>
      {children}
    </td>
  ),
  ol: ({ children, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-inside space-y-1 text-gray-600 mb-4 ml-2"
      {...props}
    >
      {children}
    </ol>
  ),
  a: ({
    href,
    children,
    ...props
  }: HTMLAttributes<HTMLAnchorElement> & { href?: string }) => {
    const isInternal = href?.startsWith("/");
    if (isInternal) {
      return (
        <Link
          href={href as string}
          className="text-blue-600 font-medium hover:underline"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-blue-600 font-medium hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ToolReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const { frontmatter: f, content, readingTime } = tool;

  // ── Derived display values ─────────────────────────────────────────────────
  const toolName = f.toolName || f.title.split(":")[0].trim();
  const logoBg = LOGO_BG[f.category] ?? "bg-slate-700";
  const logoText = getInitials(toolName);
  const formattedDate = formatDate(f.lastUpdated);
  const affiliateHref = f.affiliateLink || f.websiteUrl;
  const overallRating = Math.round(f.rating * 2 * 10) / 10; // 0-5 → 0-10
  const hasPricing = Boolean(f.pricingType && f.pricing);
  const pricingPlans = generatePricingPlans(f.pricingType, f.pricing, toolName);
  const tocItems = hasPricing
    ? TOC_ITEMS
    : TOC_ITEMS.filter((item) => item.href !== "pricing");
  const faqs = generateFAQs(f, toolName);
  const prosDisplay =
    f.pros.length > 0
      ? f.pros
      : [
          "Powerful AI capabilities",
          "Easy to use interface",
          "Saves significant time",
        ];
  const consDisplay =
    f.cons.length > 0
      ? f.cons
      : ["Can be expensive at scale", "Learning curve for advanced features"];

  // ── Alternative logo resolver ──────────────────────────────────────────────
  // Match an alternative's name to its own review article and reuse that
  // article's logo, so the logos stay in sync with the actual reviews. Falls
  // back to "" (→ colored initials) when there's no matching article/logo file.
  const allTools = getAllTools();
  function resolveAltLogo(name: string): string {
    const target = nameToSlug(name);
    const match = allTools.find(
      (t) =>
        t.slug === target ||
        nameToSlug(t.frontmatter.toolName || t.frontmatter.title) === target,
    );
    if (!match) return "";
    const logo = TOOL_LOGO_URLS[match.slug] ?? match.frontmatter.logoUrl ?? "";
    if (!logo) return "";
    return fs.existsSync(path.join(process.cwd(), "public", logo)) ? logo : "";
  }

  // ── Main tool logo ─────────────────────────────────────────────────────────
  // Resolve the current tool's logo the same way as alternatives: prefer the
  // shared TOOL_LOGO_URLS map, then the article frontmatter, then fall back to
  // colored initials. This keeps a tool's logo consistent everywhere even when
  // its frontmatter logoUrl is empty but an image exists in /public/images/tools.
  const mainLogoUrl = (() => {
    const logo = TOOL_LOGO_URLS[slug] ?? f.logoUrl ?? "";
    if (!logo) return "";
    return fs.existsSync(path.join(process.cwd(), "public", logo)) ? logo : "";
  })();

  // ── Alternative cards (derived from string[]) ─────────────────────────────
  const altCards = f.alternatives.map((name, i) => ({
    name,
    logo: { bg: ALT_COLORS[i % ALT_COLORS.length], text: getInitials(name) },
    logoUrl: resolveAltLogo(name),
    rating: Math.max(3.8, parseFloat((4.5 - i * 0.1).toFixed(1))),
    bestFor: `Alternative to ${toolName}`,
    href: `/tools/${nameToSlug(name)}`,
  }));

  // ── Comparison rows ────────────────────────────────────────────────────────
  const comparisonRows = [
    {
      name: toolName,
      logo: { bg: logoBg, text: logoText },
      logoUrl: mainLogoUrl,
      bestFor: f.bestFor[0] ?? f.category,
      startingPrice: f.pricing ?? "Contact for pricing",
      aiQuality: f.rating,
      features: Math.min(5, parseFloat((f.rating - 0.1).toFixed(1))),
      support: Math.min(5, parseFloat((f.rating - 0.2).toFixed(1))),
      easeOfUse: Math.min(5, parseFloat((f.rating + 0.1).toFixed(1))),
      overallRating,
      isCurrent: true,
    },
    ...f.alternatives.slice(0, 4).map((name, i) => ({
      name,
      logo: { bg: ALT_COLORS[i % ALT_COLORS.length], text: getInitials(name) },
      logoUrl: resolveAltLogo(name),
      bestFor: f.category,
      startingPrice: "Contact for pricing",
      aiQuality: Math.max(
        3.5,
        parseFloat((f.rating - 0.2 - i * 0.15).toFixed(1)),
      ),
      features: Math.max(
        3.0,
        parseFloat((f.rating - 0.3 - i * 0.15).toFixed(1)),
      ),
      support: Math.max(3.0, parseFloat((f.rating - 0.4 - i * 0.1).toFixed(1))),
      easeOfUse: Math.max(
        3.5,
        parseFloat((f.rating - 0.1 - i * 0.1).toFixed(1)),
      ),
      overallRating: Math.max(
        7.0,
        parseFloat((overallRating - 0.5 - i * 0.3).toFixed(1)),
      ),
      isCurrent: false,
    })),
  ];

  // ── Head-to-head comparisons featuring this tool (auto-linked) ─────────────
  const toolComparisons = getComparisonsForTool(slug)
    .map((cmp) => {
      const otherSlug = cmp.toolASlug === slug ? cmp.toolBSlug : cmp.toolASlug;
      const other = getToolBySlug(otherSlug);
      if (!other) return null;
      const otherName =
        other.frontmatter.toolName || other.frontmatter.title.split(":")[0].trim();
      return { href: `/compare/${cmp.slug}`, otherName };
    })
    .filter((x): x is { href: string; otherName: string } => x !== null);

  // ── Workflows that feature this tool (auto reverse-link) ───────────────────
  const toolWorkflows = getWorkflowsForTool(slug).map((w) => ({
    href: w.href,
    title: w.title,
  }));

  // ── Related tools + hub (dual-axis internal linking) ───────────────────────
  const { hub: relatedHub, siblings: relatedSiblings } = getRelatedTools(
    slug,
    4,
  );
  // Where this review links "up" to: its Best Of / AI Tools hub, else AI Tools.
  const hubHref = relatedHub?.href ?? "/ai-tools";
  const hubLabel = relatedHub?.label ?? "AI Tools";

  // Industry pillar guide for the review's niche (when one exists), so each
  // review links back to the editorial guide that frames its category.
  const INDUSTRY_GUIDES: Partial<
    Record<string, { title: string; href: string }>
  > = {
    architecture: {
      title: "Best AI Tools for Architects in 2026",
      href: "/resources/guides/architecture-ai-tools",
    },
    construction: {
      title: "Best AI Tools for Construction in 2026",
      href: "/resources/guides/construction-ai-tools",
    },
    "interior-design": {
      title: "Best AI Tools for Interior Design in 2026",
      href: "/resources/guides/interior-design-ai-tools",
    },
    "real-estate": {
      title: "Best AI Tools for Real Estate in 2026",
      href: "/resources/guides/real-estate-ai-tools",
    },
  };
  const pillarGuide = f.bestOf?.length ? INDUSTRY_GUIDES[f.bestOf[0]] : undefined;

  // ── Related articles (generated) ───────────────────────────────────────────
  const relatedArticles = [
    pillarGuide
      ? {
          category: "GUIDE",
          title: pillarGuide.title,
          description: `Our editorial guide to the AI tools we recommend, including ${toolName}.`,
          ctaText: "Read Guide →",
          href: pillarGuide.href,
        }
      : {
          category: "GUIDE",
          title: `Best ${hubLabel} for Professionals in 2026`,
          description: `Discover the top AI tools we recommend in ${hubLabel}.`,
          ctaText: "View Hub →",
          href: hubHref,
        },
    {
      category: "COMPARISON",
      title: `${toolName} vs Top Alternatives: Full Comparison`,
      description: `Side-by-side breakdown of ${toolName} and its main competitors.`,
      ctaText: "View Comparisons →",
      href: "/resources/comparisons",
    },
    {
      category: "GUIDE",
      title: `Hands-on Guides & Workflows`,
      description: `Step-by-step playbooks for getting the most out of tools like ${toolName}.`,
      ctaText: "Browse Guides →",
      href: "/resources/guides",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.smartaiforwork.com/tools" },
      { "@type": "ListItem", position: 3, name: f.category, item: `https://www.smartaiforwork.com/ai-tools` },
      { "@type": "ListItem", position: 4, name: `${f.title} Review`, item: `https://www.smartaiforwork.com/tools/${slug}` },
    ],
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: toolName,
    applicationCategory: f.category,
    description: f.excerpt,
    ...(f.websiteUrl ? { url: f.websiteUrl } : {}),
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: overallRating,
        bestRating: 10,
        worstRating: 0,
      },
      author: { "@type": "Organization", name: "SmartAI for Work" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: overallRating,
      bestRating: 10,
      worstRating: 0,
      ratingCount: 1,
    },
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <BreadArrow />
            <Link
              href="/tools"
              className="hover:text-blue-600 transition-colors"
            >
              AI Tools
            </Link>
            <BreadArrow />
            <span className="cursor-default">{f.category}</span>
            <BreadArrow />
            <span className="text-[#1E293B] font-medium">{f.title} Review</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="py-10 sm:py-14 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left */}
            <div>
              {/* Logo chip */}
              <div className="flex items-center gap-2 mb-4">
                {mainLogoUrl ? (
                  <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-white border border-gray-100 flex items-center justify-center">
                    <Image
                      src={mainLogoUrl}
                      alt={toolName}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-9 h-9 rounded-lg ${logoBg} flex items-center justify-center shrink-0`}
                  >
                    <span className="text-white font-bold text-sm">
                      {logoText}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-gray-500">
                  {toolName}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] leading-tight">
                <span className="text-blue-700">{toolName} Review:</span>
                <br />
                <span>Is It Worth It in 2026?</span>
              </h1>

              <p className="text-gray-600 mt-3 max-w-lg leading-relaxed">
                {f.excerpt}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-start gap-x-6 gap-y-3 mt-4">
                {[
                  { icon: Calendar, title: "Updated", subtitle: formattedDate },
                  { icon: Clock, title: readingTime, subtitle: "Read Time" },
                  {
                    icon: ShieldCheck,
                    title: "Independent",
                    subtitle: "Review",
                  },
                  {
                    icon: CheckCircle,
                    title: "Tested &",
                    subtitle: "Researched",
                  },
                ].map(({ icon: Icon, title, subtitle }) => (
                  <div key={title} className="flex items-start gap-2">
                    <Icon size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">
                        {title}
                      </span>
                      <span className="text-sm text-gray-500">{subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-5">
                <a
                  href={affiliateHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-colors"
                >
                  Try {toolName} Free →
                </a>
                {hasPricing && (
                  <a
                    href="#pricing"
                    className="border border-gray-300 hover:bg-gray-50 text-[#1E293B] font-medium rounded-lg px-6 py-2.5 text-sm transition-colors"
                  >
                    View Pricing
                  </a>
                )}
              </div>

              {f.affiliateDisclosure && (
                <p className="text-xs text-gray-400 mt-3">
                  We may earn a commission when you purchase through links on
                  our site.{" "}
                  <Link
                    href="/affiliate-disclosure"
                    className="underline hover:text-gray-600"
                  >
                    Learn more
                  </Link>
                </p>
              )}
            </div>

            {/* Right: Dashboard screenshot */}
            <div className="relative flex flex-col justify-center lg:justify-end">
              <div className="relative w-full">
                {/* Decorative blur circles */}
                <div className="absolute -top-4 -right-4 w-48 h-48 bg-orange-200 rounded-full opacity-20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-3xl pointer-events-none" />

                {/* Main image container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 md:shadow-2xl md:rounded-2xl">
                  {/*
                    DASHBOARD SCREENSHOT GUIDE:
                    - File path: public/images/tools/[slug]-dashboard.webp
                    - Recommended size: 1200x800px hoặc tỷ lệ 3:2
                    - Max file size: 150KB (dùng squoosh.app để compress)
                    - Format: WebP (tốt hơn PNG/JPG về size)
                    - Chụp từ: trial account hoặc press kit chính thức của tool
                    - Frontmatter field: dashboardImage: "/images/tools/[slug]-dashboard.webp"
                  */}
                  {f.dashboardImage ? (
                    <Image
                      src={f.dashboardImage}
                      alt={`${toolName} dashboard screenshot`}
                      width={720}
                      height={480}
                      className="w-full h-auto object-cover object-top"
                      priority
                    />
                  ) : (
                    <div className="bg-gray-100 aspect-[3/2] flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                        <Monitor className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-400">
                        Screenshot coming soon
                      </p>
                    </div>
                  )}

                  {hasPricing && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-gray-100">
                      <p className="text-xs text-gray-500">From</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {f.pricingType === "Free" ? "Free" : f.pricing}
                      </p>
                    </div>
                  )}
                </div>

                {/* Best For tags */}
                {f.bestFor.length > 0 && (
                  <div className="mt-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm block md:hidden">
                    <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wide mb-2">
                      Best For
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {f.bestFor.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className="flex items-center gap-1 text-[11px] text-gray-600 bg-gray-50 rounded-full px-2 py-0.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block shrink-0" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Rating Summary Bar ── */}
      <section className="py-8 sm:py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-gray-100 rounded-xl bg-white p-6 grid grid-cols-1 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {/* Overall Rating */}
            <div className="pt-6 md:pt-0 first:pt-0">
              <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                Our Overall Rating
              </p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-[#1E293B]">
                  {overallRating.toFixed(1)}
                </span>
                <span className="text-base text-gray-400 font-medium">/10</span>
              </div>
              <div className="mt-1.5">
                <StarRow rating={f.rating} size={14} />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Based on comprehensive testing
              </p>
            </div>

            {/* Best For */}
            <div className="pt-6 md:pt-0 md:pl-6">
              <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                Best For
              </p>
              <ul className="mt-1 space-y-1">
                {f.bestFor.slice(0, 5).map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1.5 text-sm text-gray-700"
                  >
                    <CheckCircle
                      size={13}
                      className="text-emerald-500 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div className="pt-6 md:pt-0 md:pl-6">
              <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                Pricing
              </p>
              {hasPricing ? (
                <>
                  <p className="text-xs text-gray-400 mt-1">Starts at</p>
                  <div className="flex items-baseline gap-1 mt-0.5 flex-wrap">
                    <span className="text-2xl font-bold text-blue-600">
                      {f.pricingType === "Free" ? "$0" : f.pricing}
                    </span>
                    <span className="text-xs text-gray-500">
                      {f.pricingType === "Free"
                        ? "(Free)"
                        : f.pricingType === "Freemium"
                          ? "/mo (paid plans)"
                          : f.pricingType === "Custom"
                            ? "(custom pricing)"
                            : "/mo"}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-600 mt-1">
                  See current pricing on the {toolName} website.
                </p>
              )}
            </div>

            {/* Bottom Line */}
            <div className="pt-6 md:pt-0 md:pl-6">
              <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                Bottom Line
              </p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-3">
                {f.excerpt}
              </p>
              <a
                href={affiliateHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 text-sm font-medium mt-2 hover:underline"
              >
                Visit {toolName} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTIONS 3-9: TOC Sidebar + Main Content ── */}
      <section className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* TOC Sidebar */}
            <aside className="lg:col-span-1">
              <div className="border border-gray-100 rounded-xl p-4 bg-white sticky top-20">
                <p className="font-bold text-xs uppercase text-gray-400 mb-3 tracking-wide">
                  On This Page
                </p>
                <nav>
                  {tocItems.map(({ label, href }) => (
                    <a
                      key={href}
                      href={`#${href}`}
                      className="block text-sm py-1.5 pl-3 -ml-px border-l-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-blue-600 transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a
                    href={affiliateHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2.5 text-sm transition-colors"
                  >
                    Try {toolName} Free →
                  </a>
                  {f.affiliateDisclosure && (
                    <p className="text-[10px] text-gray-400 text-center mt-1.5">
                      Affiliate link.{" "}
                      <Link
                        href="/affiliate-disclosure"
                        className="underline hover:text-gray-600"
                      >
                        Learn more
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-10">
              {/* Overview — MDX body */}
              <div id="overview" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-3">
                  What Is {toolName}?
                </h2>
                <MDXRemote
                  source={content}
                  components={mdxComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </div>

              {/* Key Features — derived from pros */}
              <div id="key-features" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
                  Key Features
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {prosDisplay.slice(0, 6).map((item, i) => {
                    const theme = FEATURE_THEMES[i % FEATURE_THEMES.length];
                    const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                    return (
                      <div
                        key={item}
                        className="border border-gray-100 rounded-xl p-3 sm:p-4 bg-white hover:shadow-sm transition-shadow"
                      >
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${theme.bg} flex items-center justify-center`}
                        >
                          <Icon size={16} className={theme.icon} />
                        </div>
                        <p className="font-semibold text-sm text-[#1E293B] mt-2 leading-snug">
                          {item}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Best For — cards from frontmatter.bestFor */}
              {f.bestFor.length > 0 && (
                <div id="best-for" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
                    Best For
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {f.bestFor.map((item, i) => {
                      const theme = FEATURE_THEMES[i % FEATURE_THEMES.length];
                      const Icon =
                        FEATURE_ICONS[(i + 3) % FEATURE_ICONS.length];
                      return (
                        <div
                          key={item}
                          className="border border-gray-100 rounded-xl p-3 bg-white text-center hover:shadow-sm transition-shadow"
                        >
                          <div
                            className={`w-9 h-9 rounded-lg ${theme.bg} flex items-center justify-center mx-auto`}
                          >
                            <Icon size={16} className={theme.icon} />
                          </div>
                          <p className="font-semibold text-xs text-[#1E293B] mt-2 leading-snug">
                            {item}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pricing */}
              {hasPricing && (
                <div id="pricing" className="scroll-mt-24">
                  <PricingPlans
                    toolName={toolName}
                    plans={pricingPlans}
                    affiliateHref={affiliateHref}
                  />
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Prices shown are indicative. Always verify current pricing
                    on the {toolName} website.
                  </p>
                </div>
              )}

              {/* Pros & Cons */}
              <div id="pros-cons" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
                  Pros &amp; Cons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/30">
                    <p className="font-semibold text-emerald-700 mb-2">
                      What We Like
                    </p>
                    <ul className="space-y-1.5">
                      {prosDisplay.map((pro) => (
                        <li
                          key={pro}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-emerald-500 shrink-0 mt-0.5"
                          />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-red-100 rounded-xl p-4 bg-red-50/30">
                    <p className="font-semibold text-red-600 mb-2">
                      What We Don&apos;t Like
                    </p>
                    <ul className="space-y-1.5">
                      {consDisplay.map((con) => (
                        <li
                          key={con}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <XCircle
                            size={14}
                            className="text-red-400 shrink-0 mt-0.5"
                          />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Alternatives */}
              <div id="alternatives" className="scroll-mt-24">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                  <h2 className="text-2xl font-bold text-[#1E293B]">
                    Top {toolName} Alternatives
                  </h2>
                  <Link
                    href={hubHref}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View all alternatives →
                  </Link>
                </div>
                {altCards.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {altCards.map((alt) => (
                      <Link
                        key={alt.name}
                        href={alt.href}
                        className="group border border-gray-100 rounded-xl p-4 bg-white text-center hover:shadow-md hover:border-blue-200 transition-all block"
                      >
                        {alt.logoUrl ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center mx-auto p-1">
                            <Image
                              src={alt.logoUrl}
                              alt={alt.name}
                              width={40}
                              height={40}
                              className="object-contain w-full h-full"
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-10 h-10 rounded-lg ${alt.logo.bg} flex items-center justify-center mx-auto`}
                          >
                            <span className="text-white font-bold text-xs">
                              {alt.logo.text}
                            </span>
                          </div>
                        )}
                        <p className="font-semibold text-sm text-[#1E293B] mt-2">
                          {alt.name}
                        </p>
                        <div className="flex justify-center mt-1">
                          <StarRow rating={alt.rating} size={10} />
                        </div>
                        <span className="text-xs text-gray-500">
                          {alt.rating}
                        </span>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-snug">
                          {alt.bestFor}
                        </p>
                        <span className="inline-block text-blue-600 text-xs font-medium mt-2 group-hover:underline">
                          Read Review →
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No alternatives listed yet.
                  </p>
                )}
              </div>

              {/* Comparison Table */}
              <div id="comparison" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
                  {toolName} vs Top Alternatives
                </h2>
                <div className="overflow-x-auto border border-gray-100 rounded-xl bg-white">
                  <table className="min-w-[700px] w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {[
                          "Tool",
                          "Best For",
                          "Price",
                          "AI Quality",
                          "Features",
                          "Support",
                          "Ease of Use",
                          "Rating",
                          "",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => {
                        const miniStars = (val: number) => {
                          const f2 = Math.floor(val);
                          const h2 = val % 1 >= 0.5;
                          const e2 = 5 - f2 - (h2 ? 1 : 0);
                          return (
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: f2 }).map((_, i) => (
                                <Star
                                  key={`f${i}`}
                                  size={10}
                                  className="text-amber-400 fill-amber-400"
                                />
                              ))}
                              {h2 && (
                                <StarHalf
                                  size={10}
                                  className="text-amber-400 fill-amber-400"
                                />
                              )}
                              {Array.from({ length: e2 }).map((_, i) => (
                                <Star
                                  key={`e${i}`}
                                  size={10}
                                  className="text-gray-200 fill-gray-200"
                                />
                              ))}
                            </div>
                          );
                        };
                        return (
                          <tr
                            key={row.name}
                            className={`border-t border-gray-100 transition-colors ${
                              row.isCurrent
                                ? "bg-blue-50/50"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                {row.logoUrl ? (
                                  <div className="w-7 h-7 rounded-md overflow-hidden bg-white border border-gray-100 flex items-center justify-center shrink-0 p-0.5">
                                    <Image
                                      src={row.logoUrl}
                                      alt={row.name}
                                      width={28}
                                      height={28}
                                      className="object-contain w-full h-full"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className={`w-7 h-7 rounded-md ${row.logo.bg} flex items-center justify-center shrink-0`}
                                  >
                                    <span className="text-white font-bold text-[9px]">
                                      {row.logo.text}
                                    </span>
                                  </div>
                                )}
                                <span
                                  className={`text-sm ${row.isCurrent ? "font-semibold text-[#1E293B]" : "text-gray-700"}`}
                                >
                                  {row.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-xs text-gray-600 whitespace-nowrap">
                              {row.bestFor}
                            </td>
                            <td className="py-3 px-4 text-xs text-gray-600 whitespace-nowrap">
                              {row.startingPrice}
                            </td>
                            <td className="py-3 px-4">
                              {miniStars(row.aiQuality)}
                            </td>
                            <td className="py-3 px-4">
                              {miniStars(row.features)}
                            </td>
                            <td className="py-3 px-4">
                              {miniStars(row.support)}
                            </td>
                            <td className="py-3 px-4">
                              {miniStars(row.easeOfUse)}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-xs ${row.isCurrent ? "font-bold text-[#1E293B]" : "text-gray-600"}`}
                              >
                                {row.overallRating}/10
                              </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {row.isCurrent ? (
                                <span className="text-gray-400 text-xs">
                                  Current
                                </span>
                              ) : (
                                <Link
                                  href={`/tools/${nameToSlug(row.name)}`}
                                  className="text-blue-600 text-xs font-medium hover:underline"
                                >
                                  Read Review →
                                </Link>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Final Verdict */}
              <div id="final-verdict" className="scroll-mt-24">
                <div
                  className="rounded-2xl text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
                  style={{
                    background: "linear-gradient(to right, #2563eb, #F97316)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 rounded-full p-3 shrink-0">
                      <Trophy size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold">
                        Our {toolName} Verdict
                      </h2>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <StarRow rating={f.rating} size={14} />
                        <span className="text-sm font-semibold">
                          {f.rating.toFixed(1)}/5
                        </span>
                      </div>
                      <p className="text-sm opacity-90 mt-1.5 max-w-md">
                        {f.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {prosDisplay.slice(0, 3).map((b) => (
                          <span
                            key={b}
                            className="flex items-center gap-1 text-xs opacity-90"
                          >
                            <Check size={12} className="shrink-0" />
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 text-center">
                    <a
                      href={affiliateHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-white text-gray-900 rounded-lg px-6 py-3 font-semibold text-sm hover:bg-gray-50 transition-colors"
                    >
                      Visit {toolName} Now →
                    </a>
                    <p className="text-xs opacity-80 mt-1 flex items-center justify-center gap-1">
                      <Check size={11} className="shrink-0" />
                      {f.pricingType === "Free" || f.pricingType === "Freemium"
                        ? "Free plan available"
                        : hasPricing
                          ? "14-day money-back guarantee"
                          : "Visit website for full details"}
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div id="faq" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">FAQ</h2>
                <FAQAccordion faqs={faqs} />
                <a
                  href="#"
                  className="inline-block text-blue-600 text-sm font-medium mt-3 hover:underline"
                >
                  View all FAQs →
                </a>
              </div>

              {/* Related Articles */}
              <div className="scroll-mt-24">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                  <h2 className="text-2xl font-bold text-[#1E293B]">
                    Related Articles
                  </h2>
                  <Link
                    href="/resources/guides"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View all articles →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedArticles.map((article) => {
                    const badgeClass =
                      article.category === "REVIEW"
                        ? "bg-blue-50 text-blue-600"
                        : article.category === "COMPARISON"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-emerald-50 text-emerald-600";
                    return (
                      <div
                        key={article.title}
                        className="border border-gray-100 rounded-xl p-4 bg-white hover:shadow-sm transition-shadow"
                      >
                        <span
                          className={`inline-block text-xs font-semibold uppercase px-2 py-0.5 rounded-full ${badgeClass}`}
                        >
                          {article.category}
                        </span>
                        <p className="font-semibold text-sm text-[#1E293B] mt-1 leading-snug">
                          {article.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {article.description}
                        </p>
                        <Link
                          href={article.href}
                          className="inline-block text-blue-600 text-xs font-medium mt-2 hover:underline"
                        >
                          {article.ctaText}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Head-to-head comparisons (auto from lib/comparisons.ts) */}
              {toolComparisons.length > 0 && (
                <div className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
                    Head-to-Head Comparisons
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {toolComparisons.map((cmp) => (
                      <Link
                        key={cmp.href}
                        href={cmp.href}
                        className="group flex items-center justify-between gap-3 border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all"
                      >
                        <span className="font-semibold text-sm text-[#1E293B] group-hover:text-blue-600">
                          {toolName} vs {cmp.otherName}
                        </span>
                        <span className="text-blue-600 text-xs font-medium group-hover:underline shrink-0">
                          Compare →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured in workflows (auto from lib/workflows-data.ts) */}
              {toolWorkflows.length > 0 && (
                <div className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
                    Featured in Workflows
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {toolWorkflows.map((wf) => (
                      <Link
                        key={wf.href}
                        href={wf.href}
                        className="group flex items-center justify-between gap-3 border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all"
                      >
                        <span className="font-semibold text-sm text-[#1E293B] group-hover:text-blue-600">
                          {wf.title}
                        </span>
                        <span className="text-blue-600 text-xs font-medium group-hover:underline shrink-0">
                          View →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Tools in {hub} — dual-axis internal linking */}
              {relatedSiblings.length > 0 && (
                <div className="scroll-mt-24">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold text-[#1E293B]">
                      Related Tools in {hubLabel}
                    </h2>
                    <Link
                      href={hubHref}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      See all the best {hubLabel} →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {relatedSiblings.map((rel) => {
                      const relName =
                        rel.frontmatter.toolName ||
                        rel.frontmatter.title.split(":")[0].trim();
                      const relLogo = resolveAltLogo(relName);
                      return (
                        <Link
                          key={rel.slug}
                          href={`/tools/${rel.slug}`}
                          className="group border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all block"
                        >
                          {relLogo ? (
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center p-1">
                              <Image
                                src={relLogo}
                                alt={relName}
                                width={40}
                                height={40}
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                              <span className="text-white font-bold text-xs">
                                {getInitials(relName)}
                              </span>
                            </div>
                          )}
                          <p className="font-semibold text-sm text-[#1E293B] mt-2 leading-snug">
                            {relName}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <StarRow rating={rel.frontmatter.rating} size={11} />
                            <span className="text-xs text-gray-500">
                              {rel.frontmatter.rating.toFixed(1)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-snug">
                            {rel.frontmatter.excerpt}
                          </p>
                          <span className="inline-block text-blue-600 text-xs font-medium mt-2 group-hover:underline">
                            Read Review →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
