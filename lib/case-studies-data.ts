export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  company: { name: string; logo: { bg: string; text: string } };
  imageHint: string;
  stats: Array<{ icon: string; value: string; label: string }>;
  isFeatured: boolean;
  date: string;
  readTime: string;
  tags: string[];
  href: string;
  // Latest-only fields
  tools?: string;
  result?: string;
}

// Listing-only placeholder case studies were removed: none of them had a detail
// page, so every entry pointed at a 404 (surfaced through the /resources search
// box, which links straight to item.href). Real case studies live in
// lib/case-studies-content.ts and are rendered by the Featured section.
// Add entries here again only when the matching detail page exists.
export const caseStudiesData: CaseStudy[] = [];
