// Plain data module (no "use client") — imported by both
// BestConstructionClient (visible accordion) and page.tsx (FAQPage schema),
// so the two can never drift and neither has to import a data export
// through a client-component boundary (which breaks production builds).

export const FAQ_ITEMS = [
  {
    q: "How are these AI tools for construction tested?",
    a: "Our team tests each tool hands-on in real construction workflows — from site documentation to project scheduling and cost tracking. We evaluate ease of use, output quality, integration capabilities, and value for money.",
  },
  {
    q: "Which AI tool is best for small contractors?",
    a: "Procore AI and OpenSpace are the most accessible for smaller teams — both offer scalable pricing and are straightforward to deploy without a large IT team.",
  },
  {
    q: "Can these tools track project progress in real time?",
    a: "Yes. Buildots and OpenSpace specialise in real-time site monitoring, using computer vision and 360° cameras to automatically track construction progress against BIM models.",
  },
  {
    q: "Do these tools integrate with Procore or BIM software?",
    a: "Most tools on this list offer integrations with Procore, Autodesk BIM 360, or both. ALICE Technologies and Buildots have native BIM integrations for seamless workflow connectivity.",
  },
];
