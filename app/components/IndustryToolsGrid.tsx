import Link from "next/link";
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";

// Plain, serializable shape passed from a server page into the (client) hub
// components. Resolved on the server in lib/tools.ts (getIndustryGridTools).
export interface GridTool {
  slug: string;
  name: string;
  excerpt: string;
  rating: number;
  category: string;
  logoUrl: string;
  pricing?: string;
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

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} size={11} className="text-amber-400 fill-amber-400" />
      ))}
      {half && <StarHalf size={11} className="text-amber-400 fill-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} size={11} className="text-gray-200 fill-gray-200" />
      ))}
    </div>
  );
}

export default function IndustryToolsGrid({
  title,
  subtitle,
  tools,
  seeAllHref = "/all-reviews",
}: {
  title: string;
  subtitle?: string;
  tools: GridTool[];
  seeAllHref?: string;
}) {
  if (!tools || tools.length === 0) return null;
  return (
    <section className="py-12 sm:py-14 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-end gap-2 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">{title}</h2>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <Link
            href={seeAllHref}
            className="text-blue-600 text-sm font-medium hover:underline shrink-0"
          >
            Browse all reviews →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="group border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all block"
            >
              <div className="flex items-center gap-2">
                {t.logoUrl ? (
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center p-1 shrink-0">
                    <Image
                      src={t.logoUrl}
                      alt={t.name}
                      width={36}
                      height={36}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xs">
                      {getInitials(t.name)}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-[#1E293B] truncate group-hover:text-blue-600">
                    {t.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <Stars rating={t.rating} />
                    <span className="text-[11px] text-gray-500">
                      {t.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-snug">
                {t.excerpt}
              </p>
              <span className="inline-block text-blue-600 text-xs font-medium mt-2 group-hover:underline">
                Read review →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
