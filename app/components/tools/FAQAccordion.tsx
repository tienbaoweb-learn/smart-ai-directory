"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-100 rounded-xl bg-white overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-start text-left px-5 py-4 text-sm font-semibold text-[#1E293B] hover:bg-gray-50 transition-colors gap-3"
          >
            <span>{faq.question}</span>
            <ChevronDown
              size={16}
              className={`text-gray-400 shrink-0 mt-0.5 transition-transform duration-200 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4 pt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
