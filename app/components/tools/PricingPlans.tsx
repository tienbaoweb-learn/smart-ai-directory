"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  ctaText: string;
  features: string[];
  highlighted: boolean;
}

function toYearlyPrice(price: string): string {
  const match = price.match(/^\$([\d.]+)$/);
  if (!match) return price;
  const monthly = parseFloat(match[1]);
  return `$${Math.round(monthly * 0.8)}`;
}

export default function PricingPlans({
  toolName,
  plans,
  affiliateHref,
}: {
  toolName: string;
  plans: PricingPlan[];
  affiliateHref: string;
}) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <h2 className="text-2xl font-bold text-[#1E293B]">
          {toolName} Pricing
        </h2>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 text-xs">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              billing === "monthly"
                ? "bg-white shadow-sm text-[#1E293B]"
                : "text-gray-500"
            }`}
          >
            Pay Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling("yearly")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              billing === "yearly"
                ? "bg-white shadow-sm text-[#1E293B]"
                : "text-gray-500"
            }`}
          >
            Pay Yearly (Save 20%)
          </button>
        </div>
      </div>
      <div
        className={`grid gap-4 ${
          plans.length === 1
            ? "grid-cols-1 max-w-xs"
            : plans.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-3"
        }`}
      >
        {plans.map((plan) => {
          const displayPrice =
            billing === "yearly" ? toYearlyPrice(plan.price) : plan.price;
          return (
            <div
              key={plan.name}
              className={`rounded-xl p-5 bg-white relative ${
                plan.highlighted
                  ? "border-2 border-blue-600"
                  : "border border-gray-100"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-semibold rounded-full px-2.5 py-0.5 whitespace-nowrap">
                  Most Popular
                </span>
              )}
              <p className="font-semibold text-sm text-gray-500">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-[#1E293B]">
                  {displayPrice}
                </span>
                {plan.period && (
                  <span className="text-sm text-gray-400">
                    {plan.period}
                  </span>
                )}
              </div>
              {billing === "yearly" && displayPrice !== plan.price && (
                <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                  Billed annually
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {plan.description}
              </p>
              <a
                href={affiliateHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full mt-3 rounded-lg py-2 text-sm font-medium text-center transition-colors ${
                  plan.highlighted
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border border-gray-300 hover:bg-gray-50 text-[#1E293B]"
                }`}
              >
                {plan.ctaText}
              </a>
              <ul className="mt-4 space-y-1.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-1.5 text-xs text-gray-600"
                  >
                    <Check size={12} className="text-emerald-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
