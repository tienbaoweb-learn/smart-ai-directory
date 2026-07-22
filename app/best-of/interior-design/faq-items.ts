// Plain data module (no "use client") — imported by both
// BestInteriorDesignClient (visible accordion) and page.tsx (FAQPage
// schema), so the two can never drift and neither has to import a data
// export through a client-component boundary (which breaks production
// builds).

export const FAQ_ITEMS = [
  {
    q: "How are these AI tools for interior design tested?",
    a: "Our team tests each tool hands-on across real design workflows — from concept generation to client presentations. We evaluate ease of use, output quality, features, and value for money.",
  },
  {
    q: "Which AI tool is best for beginners?",
    a: "Planner 5D and RoomGPT are the most beginner-friendly — both require no design experience and produce impressive results within minutes.",
  },
  {
    q: "Can these tools create photorealistic renders?",
    a: "Yes. Coohom and Foyr specialise in photorealistic 3D rendering, delivering high-quality visuals suitable for professional client presentations.",
  },
  {
    q: "Do these tools work on Mac and Windows?",
    a: "Most tools in this list are browser-based and work on any platform. Foyr and Coohom also offer desktop applications for both Mac and Windows.",
  },
];
