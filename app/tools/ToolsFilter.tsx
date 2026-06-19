"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Tool, ToolCategory } from "../../lib/tools";

const CATEGORIES: Array<ToolCategory | "All"> = [
  "All",
  "Furniture",
  "Architecture",
  "Construction",
  "Real Estate",
  "Cross-niche",
];

const CATEGORY_COLORS: Record<string, string> = {
  Furniture:    "bg-orange-50 text-orange-600",
  Architecture: "bg-blue-50 text-blue-600",
  Construction: "bg-yellow-50 text-yellow-700",
  "Real Estate":"bg-purple-50 text-purple-600",
  "Cross-niche":"bg-gray-100 text-gray-600",
};

const PRICING_COLORS: Record<string, string> = {
  Free:     "bg-emerald-50 text-emerald-600",
  Freemium: "bg-blue-50 text-blue-600",
  Paid:     "bg-orange-50 text-orange-600",
  Custom:   "bg-gray-100 text-gray-600",
};

function StarRow({ rating }: { rating: number }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full  }).map((_, i) => <Star key={`f${i}`} size={12} className="text-amber-400 fill-amber-400" />)}
      {half && <Star size={12} className="text-amber-300 fill-amber-300" />}
      {Array.from({ length: empty }).map((_, i) => <Star key={`e${i}`} size={12} className="text-gray-200 fill-gray-200" />)}
      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ToolsFilter({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState<ToolCategory | "All">("All");

  const filtered =
    active === "All"
      ? tools
      : tools.filter((t) => t.frontmatter.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === cat
                ? "bg-[#1E293B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-400 mb-5">
        Showing {filtered.length} review{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm py-12 text-center">
          No reviews in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tool) => {
            const f = tool.frontmatter;
            const initials = f.title
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();
            return (
              <div
                key={tool.slug}
                className="border border-gray-100 rounded-xl p-5 bg-white hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Logo / initials */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1E293B] flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">{initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#1E293B] truncate">{f.title}</p>
                    <StarRow rating={f.rating} />
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${CATEGORY_COLORS[f.category] ?? "bg-gray-100 text-gray-600"}`}>
                    {f.category}
                  </span>
                  {f.pricingType && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${PRICING_COLORS[f.pricingType] ?? "bg-gray-100 text-gray-600"}`}>
                      {f.pricingType}
                    </span>
                  )}
                </div>

                {/* Excerpt */}
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 flex-1 mb-4">
                  {f.excerpt}
                </p>

                {/* Pricing + CTA */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <span className="text-xs font-medium text-gray-500">{f.pricing ?? "See pricing"}</span>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Read Review →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
