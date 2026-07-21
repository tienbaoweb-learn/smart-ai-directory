// Plain data module (no "use client") — imported by both
// BestRealEstateClient (visible accordion) and page.tsx (FAQPage schema),
// so the two can never drift and neither has to import a data export
// through a client-component boundary (which breaks production builds).

export const FAQ_ITEMS = [
  {
    q: "How are these AI tools for real estate tested?",
    a: "Our team tests each tool hands-on across real estate workflows — from lead generation and listing creation to CRM automation and client follow-ups. We evaluate ease of use, output quality, integrations, and value for money.",
  },
  {
    q: "Which AI tool is best for solo agents?",
    a: "REimagineHome and Zillow Showcase are the most accessible for solo agents — both are easy to set up, require no technical skills, and deliver immediate value for listings and virtual staging.",
  },
  {
    q: "Can these tools create virtual staging or listing photos?",
    a: "Yes. REimagineHome specialises in AI-powered virtual staging, transforming empty rooms into furnished spaces in seconds. Zillow Showcase also offers enhanced listing photo tools for standout property presentations.",
  },
  {
    q: "Do these tools integrate with MLS or CRM platforms?",
    a: "Lofty AI and Structurely offer integrations with major CRM platforms. Offrs connects with several MLS data providers for predictive analytics and lead scoring.",
  },
];
