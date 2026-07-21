// Plain data module (no fs) — safe to import from client components.
// lib/tools.ts re-exports both of these, so server code can keep importing
// everything from "@/lib/tools"; client components import from here directly
// (importing lib/tools.ts into a client bundle would pull in fs).

export type AiToolsCategory =
  | "design"
  | "content-marketing"
  | "automation"
  | "sales"
  | "productivity";

// Display labels for the 5 use-case categories, shared by the /ai-tools hub,
// the 5 use-case pages, and the CompareTools widget. Moved here from the
// retired app/data/tools.ts.
export const CATEGORY_LABELS: Record<AiToolsCategory, string> = {
  design: "AI Design & Visualization",
  "content-marketing": "AI Content & Marketing",
  automation: "AI Automation & Workflow",
  sales: "AI Sales & Lead Generation",
  productivity: "AI Productivity & Management",
};
