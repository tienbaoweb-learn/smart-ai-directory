export interface AIToolReview {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: { bg: string; text: string };
  updatedDate: string;
  readTime: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
  affiliateDisclosure: string;
  heroImage: { headline: string; subheadline: string; ctaText: string };
  overallRating: number;
  ratingStars: number;
  ratingBasis: string;
  bestFor: string[];
  pricingStartsAt: string;
  pricingNote: string;
  bottomLine: string;
  whatIsTitle: string;
  whatIsParagraphs: string[];
  companyInfo: { founded: string; headquarters: string; teamSize: string; website: string };
  keyFeatures: Array<{ icon: string; title: string; description: string }>;
  bestForCards: Array<{ icon: string; title: string; description: string }>;
  pricingPlans: Array<{
    name: string;
    price: string;
    period: string;
    description: string;
    ctaText: string;
    features: string[];
    highlighted: boolean;
  }>;
  pricingNote2: string;
  pros: string[];
  cons: string[];
  alternatives: Array<{
    name: string;
    logo: { bg: string; text: string };
    rating: number;
    bestFor: string;
    href: string;
  }>;
  comparisonTable: Array<{
    name: string;
    logo: { bg: string; text: string };
    bestFor: string;
    startingPrice: string;
    aiQuality: number;
    templates: number;
    seoFeatures: number;
    easeOfUse: number;
    overallRating: number;
    isCurrent: boolean;
  }>;
  finalVerdictTitle: string;
  finalVerdictDescription: string;
  finalVerdictBullets: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedArticles: Array<{
    category: string;
    title: string;
    description: string;
    ctaText: string;
    href: string;
  }>;
}

export const aiToolsData: AIToolReview[] = [
  {
    slug: "jasper",
    name: "Jasper",
    tagline: "Is It Worth It in 2026?",
    description:
      "Our hands-on review of Jasper AI, including features, pricing, pros, cons, and best alternatives.",
    logo: { bg: "bg-purple-600", text: "J" },
    updatedDate: "May 15, 2026",
    readTime: "8-Min Read",
    ctaPrimary: { text: "Visit Jasper →", href: "#" },
    ctaSecondary: { text: "View Pricing", href: "#" },
    affiliateDisclosure:
      "We may earn a commission when you purchase through links on our site.",
    heroImage: {
      headline: "The AI copilot built for marketing performance",
      subheadline: "Jasper helps you create amazing content 10X faster with AI.",
      ctaText: "Start Free Trial",
    },
    overallRating: 9.1,
    ratingStars: 4.5,
    ratingBasis: "Based on comprehensive testing",
    bestFor: ["Marketing Teams", "Agencies", "Content Creators", "Entrepreneurs"],
    pricingStartsAt: "$39",
    pricingNote: "/month • 14-day money-back guarantee • Free trial available",
    bottomLine:
      "Jasper is one of the best AI writing tools for teams and businesses that need high-quality content at scale.",
    whatIsTitle: "What Is Jasper?",
    whatIsParagraphs: [
      "Jasper is an AI-powered content generation platform designed for marketers, content teams, and businesses.",
      "It helps you create blog posts, marketing copy, social media content, emails, ad copy, and more—10X faster.",
      "With Brand Voice, AI templates, and collaborative features, Jasper is built to scale content production.",
    ],
    companyInfo: {
      founded: "2021",
      headquarters: "Austin, Texas, USA",
      teamSize: "201-500",
      website: "jasper.ai",
    },
    keyFeatures: [
      { icon: "Layers",   title: "AI Content Generation", description: "Create high-quality content for blogs, ads, emails, and more in seconds."          },
      { icon: "FileText", title: "50+ Templates",          description: "Choose from a library of proven templates for every content type."                  },
      { icon: "Mic",      title: "Brand Voice",            description: "Train Jasper on your brand data to create content in your voice."                   },
      { icon: "Search",   title: "SEO Mode",               description: "Optimize content with SEO suggestions and competitor insights."                     },
      { icon: "Users",    title: "Team Collaboration",     description: "Work together in real-time with comments and shared documents."                     },
      { icon: "Plug",     title: "Integrations",           description: "Connect with Surfer SEO, Grammarly, Zapier, and more."                             },
    ],
    bestForCards: [
      { icon: "FileEdit",  title: "Content Marketing", description: "Create blog posts, guides, and long-form content."    },
      { icon: "Search",    title: "SEO Teams",         description: "Optimize content for search rankings and traffic."    },
      { icon: "Building2", title: "Agencies",          description: "Scale content production for multiple clients."       },
      { icon: "Mail",      title: "Email Marketing",   description: "Write high-converting email campaigns."               },
      { icon: "Megaphone", title: "Ad Copy",           description: "Generate compelling ads that drive results."          },
      { icon: "Share2",    title: "Social Media",      description: "Create engaging posts for any platform."             },
    ],
    pricingPlans: [
      {
        name: "Creator", price: "$39", period: "/month",
        description: "For individuals and solo creators.",
        ctaText: "Start Free Trial", highlighted: false,
        features: ["1 user seat", "50+ AI templates", "Brand Voice", "Plagiarism checker", "Chrome extension"],
      },
      {
        name: "Teams", price: "$99", period: "/month",
        description: "For small teams and growing businesses.",
        ctaText: "Start Free Trial", highlighted: true,
        features: ["3 user seats", "Everything in Creator", "Team collaboration", "Document analytics", "Style guides"],
      },
      {
        name: "Business", price: "Custom", period: "",
        description: "For large teams and enterprises.",
        ctaText: "Contact Sales", highlighted: false,
        features: ["Custom user seats", "Everything in Teams", "Advanced security", "Admin controls", "Priority support"],
      },
    ],
    pricingNote2: "All plans include a 14-day money-back guarantee.",
    pros: [
      "High-quality content output",
      "Easy to use and beginner-friendly",
      "Large template library",
      "Strong brand voice feature",
      "Excellent for teams and agencies",
    ],
    cons: [
      "Can be expensive for small businesses",
      "Output can be generic at times",
      "Fact-checking still needed",
      "Limited credits on lower plans",
    ],
    alternatives: [
      { name: "ChatGPT",   logo: { bg: "bg-emerald-500", text: "GPT" }, rating: 4.8, bestFor: "Best for general writing and brainstorming.",  href: "#" },
      { name: "Writesonic",logo: { bg: "bg-blue-600",    text: "WS"  }, rating: 4.6, bestFor: "Best for SEO content and marketing copy.",     href: "#" },
      { name: "Copy.ai",   logo: { bg: "bg-emerald-400", text: "C"   }, rating: 4.5, bestFor: "Best for short-form copy and sales emails.",   href: "#" },
      { name: "Claude",    logo: { bg: "bg-orange-600",  text: "AI"  }, rating: 4.5, bestFor: "Best for long-form and detailed content.",     href: "#" },
      { name: "Rytr",      logo: { bg: "bg-yellow-400",  text: "R"   }, rating: 4.4, bestFor: "Best budget-friendly AI writing tool.",        href: "#" },
    ],
    comparisonTable: [
      { name: "Jasper",     logo: { bg: "bg-purple-600",  text: "J"   }, bestFor: "Teams & Marketing",  startingPrice: "$39/mo", aiQuality: 4.5, templates: 4.8, seoFeatures: 4.5, easeOfUse: 4.5, overallRating: 9.1, isCurrent: true  },
      { name: "ChatGPT",   logo: { bg: "bg-emerald-500", text: "GPT" }, bestFor: "General Writing",    startingPrice: "Free",   aiQuality: 4.7, templates: 3.5, seoFeatures: 3.0, easeOfUse: 4.8, overallRating: 8.8, isCurrent: false },
      { name: "Writesonic",logo: { bg: "bg-blue-600",    text: "WS"  }, bestFor: "SEO & Marketing",    startingPrice: "$19/mo", aiQuality: 4.3, templates: 4.5, seoFeatures: 4.6, easeOfUse: 4.4, overallRating: 8.6, isCurrent: false },
      { name: "Copy.ai",   logo: { bg: "bg-emerald-400", text: "C"   }, bestFor: "Sales & Copy",       startingPrice: "$36/mo", aiQuality: 4.2, templates: 4.4, seoFeatures: 4.0, easeOfUse: 4.5, overallRating: 8.4, isCurrent: false },
      { name: "Claude",    logo: { bg: "bg-orange-600",  text: "AI"  }, bestFor: "Long-form Content",  startingPrice: "$20/mo", aiQuality: 4.6, templates: 3.0, seoFeatures: 3.2, easeOfUse: 4.3, overallRating: 8.3, isCurrent: false },
    ],
    finalVerdictTitle: "Should You Use Jasper?",
    finalVerdictDescription:
      "If you're a marketer, agency, or business looking to scale content production with AI, Jasper is one of the best investments you can make.",
    finalVerdictBullets: [
      "Great for teams and agencies",
      "Powerful templates and brand voice",
      "High quality content at scale",
    ],
    faqs: [
      {
        question: "Is Jasper free to use?",
        answer: "Jasper offers a free trial, but does not have a permanent free plan. Paid plans start at $39/month.",
      },
      {
        question: "How much does Jasper cost?",
        answer: "Jasper's Creator plan starts at $39/month, with Teams and Business plans available for larger needs.",
      },
      {
        question: "Is Jasper better than ChatGPT?",
        answer:
          "Jasper is better suited for marketing teams that need brand voice, templates, and SEO features, while ChatGPT is more general-purpose.",
      },
      {
        question: "Can Jasper detect AI content?",
        answer:
          "Jasper includes a built-in plagiarism checker, but it does not have a dedicated AI content detector.",
      },
    ],
    relatedArticles: [
      { category: "REVIEW",     title: "Best AI Writing Tools in 2026", description: "Top 10 tools reviewed and compared.",    ctaText: "Read Guide →",       href: "#" },
      { category: "COMPARISON", title: "Jasper vs ChatGPT",              description: "Which AI writing tool is better?",      ctaText: "Read Comparison →",  href: "#" },
      { category: "TUTORIAL",   title: "How to Use Jasper for SEO",      description: "Step-by-step guide for beginners.",     ctaText: "Read Guide →",       href: "#" },
    ],
  },
];
