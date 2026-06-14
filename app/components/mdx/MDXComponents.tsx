import { CheckCircle, XCircle, Star } from "lucide-react";
import Link from "next/link";

// ── AffiliateCTA ─────────────────────────────────────────────────────────────

interface AffiliateCTAProps {
  toolName: string;
  affiliateLink: string;
  ctaText: string;
  disclosure?: boolean;
}

export function AffiliateCTA({
  toolName,
  affiliateLink,
  ctaText,
  disclosure = true,
}: AffiliateCTAProps) {
  return (
    <div className="border border-blue-100 rounded-xl bg-blue-50/50 p-5 my-6">
      <p className="font-semibold text-sm text-[#1E293B] mb-3">
        Ready to try {toolName}?
      </p>
      <a
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="block w-full text-center bg-[#F97316] hover:bg-orange-600 text-white font-semibold rounded-lg px-5 py-3 text-sm transition-colors"
      >
        {ctaText}
      </a>
      {disclosure && (
        <p className="text-[10px] text-gray-400 text-center mt-2">
          Affiliate link — we may earn a commission at no extra cost to you.{" "}
          <Link
            href="/affiliate-disclosure"
            className="underline hover:text-gray-600"
          >
            Learn more
          </Link>
        </p>
      )}
    </div>
  );
}

// ── RatingBadge ───────────────────────────────────────────────────────────────

interface RatingBadgeProps {
  rating: number;
}

export function RatingBadge({ rating = 0 }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="inline-flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <Star
            key={`f${i}`}
            size={16}
            className="text-amber-400 fill-amber-400"
          />
        ))}
        {half && (
          <span className="relative inline-block w-4 h-4">
            <Star
              size={16}
              className="text-gray-200 fill-gray-200 absolute inset-0"
            />
            <span className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={16} className="text-amber-400 fill-amber-400" />
            </span>
          </span>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <Star
            key={`e${i}`}
            size={16}
            className="text-gray-200 fill-gray-200"
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-[#1E293B]">
        {rating.toFixed(1)}/5
      </span>
    </div>
  );
}

// ── PricingTable ──────────────────────────────────────────────────────────────

interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

interface PricingTableProps {
  tiers: PricingTier[];
}

export function PricingTable({ tiers }: PricingTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border border-gray-100 rounded-xl overflow-hidden text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-4 py-3 font-semibold text-[#1E293B]">
              Plan
            </th>
            <th className="text-left px-4 py-3 font-semibold text-[#1E293B]">
              Price
            </th>
            <th className="text-left px-4 py-3 font-semibold text-[#1E293B]">
              What&apos;s included
            </th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, i) => (
            <tr
              key={tier.name}
              className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
            >
              <td className="px-4 py-3 font-medium text-[#1E293B] whitespace-nowrap">
                {tier.name}
              </td>
              <td className="px-4 py-3 text-blue-600 font-semibold whitespace-nowrap">
                {tier.price}
              </td>
              <td className="px-4 py-3 text-gray-600">
                <ul className="space-y-0.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5">
                      <CheckCircle
                        size={12}
                        className="text-emerald-500 shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── ProConList ────────────────────────────────────────────────────────────────

interface ProConListProps {
  pros: string[];
  cons: string[];
}

export function ProConList({ pros = [], cons = [] }: { pros?: string[]; cons?: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/30">
        <p className="font-semibold text-emerald-700 text-sm mb-3">Pros</p>
        <ul className="space-y-2">
          {pros.map((pro) => (
            <li
              key={pro}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <CheckCircle
                size={14}
                className="text-emerald-500 shrink-0 mt-0.5"
              />
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-red-100 rounded-xl p-4 bg-red-50/30">
        <p className="font-semibold text-red-600 text-sm mb-3">Cons</p>
        <ul className="space-y-2">
          {cons.map((con) => (
            <li
              key={con}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Default export (component map for MDXRemote) ─────────────────────────────

const MDXComponents = {
  AffiliateCTA,
  RatingBadge,
  PricingTable,
  ProConList,
};

export default MDXComponents;
