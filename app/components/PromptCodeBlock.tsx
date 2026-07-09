"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Prompt template block with a Copy button — preserves whitespace exactly. */
export default function PromptCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — leave the button as-is.
    }
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden bg-[#1E293B] border border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span className="text-[11px] uppercase tracking-widest text-slate-400 font-medium">
          Prompt template
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy prompt to clipboard"
          className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            copied
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-white/10 text-slate-200 hover:bg-white/20"
          }`}
        >
          {copied ? (
            <>
              <Check size={13} className="shrink-0" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={13} className="shrink-0" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-100 whitespace-pre font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
