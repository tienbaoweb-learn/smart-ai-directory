// Plain data module (no "use client") — imported by both
// BestArchitectureClient (visible accordion) and page.tsx (FAQPage schema),
// so the two can never drift and neither has to import a data export
// through a client-component boundary (which breaks production builds).

export const FAQ_ITEMS = [
  {
    q: "How are these AI tools for architecture tested?",
    a: "Our team tests each tool hands-on across real architecture workflows — from concept sketching to site analysis and client presentations. We evaluate ease of use, output quality, features, and value for money.",
  },
  {
    q: "Which AI tool is best for beginners?",
    a: "Vizcom and Midjourney are the most beginner-friendly — both require minimal technical knowledge and can generate impressive architectural visuals within minutes.",
  },
  {
    q: "Can these tools generate 3D renders and visualizations?",
    a: "Yes. Vizcom and Midjourney specialise in AI-generated architectural visualizations, delivering high-quality renders suitable for concept presentations and client pitches.",
  },
  {
    q: "Do these tools integrate with AutoCAD or Revit?",
    a: "Autodesk Forma integrates natively with the Autodesk ecosystem including Revit. Other tools like TestFit support common file formats compatible with AutoCAD workflows.",
  },
];
