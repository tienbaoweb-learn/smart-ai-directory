import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smartaiforwork.com"),
  title: "SmartAI for Work - AI Tools Directory",
  description:
    "Discover handpicked AI tools for furniture, architecture, construction, and real estate.",
  verification: {
    google: "Z4JIndYC-yoGI9FOu3WU7sEkqzZgR9i8-d5nWGTzyyA",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/favicon-192.png",
  },
  openGraph: {
    title: "SmartAI for Work - AI Tools Directory",
    description:
      "Discover handpicked AI tools for furniture, architecture, construction, and real estate.",
    url: "https://smartaiforwork.com",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "SmartAI for Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartAI for Work - AI Tools Directory",
    description:
      "Discover handpicked AI tools for furniture, architecture, construction, and real estate.",
    images: ["/og-image.svg"],
  },
};

const schemaWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SmartAI for Work",
  url: "https://smartaiforwork.com",
  description:
    "Discover handpicked AI tools for furniture, architecture, construction, and real estate professionals.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://smartaiforwork.com/tools?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SmartAI for Work",
  url: "https://smartaiforwork.com",
  logo: "https://smartaiforwork.com/favicon-512.png",
  description:
    "AI Tools Directory for Furniture, Architecture, Construction, and Real Estate industries.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    email: "tienbao.web@gmail.com",
    contactType: "customer support",
  },
};

const schemaItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Top AI Tools for Work",
  description:
    "Handpicked AI tools for furniture design, architecture, construction management, and real estate.",
  url: "https://smartaiforwork.com",
  numberOfItems: 6,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "SoftwareApplication",
        name: "Planner 5D",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web, iOS, Android",
        url: "https://smartaiforwork.com/tools/planner-5d",
        description: "AI interior design & room planning tool for furniture professionals.",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "3520" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "SoftwareApplication",
        name: "Archicad AI",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web, Windows, macOS",
        url: "https://smartaiforwork.com/tools/archicad-ai",
        description: "AI-enhanced BIM software for architectural design and documentation.",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "256" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "SoftwareApplication",
        name: "Buildots",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS",
        url: "https://smartaiforwork.com/tools/buildots",
        description: "AI construction progress tracking and analytics platform.",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.6", reviewCount: "199" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "SoftwareApplication",
        name: "Offrs",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://smartaiforwork.com/tools/offrs",
        description: "AI lead generation platform for real estate agents.",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "412" },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "SoftwareApplication",
        name: "Midjourney",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        url: "https://smartaiforwork.com/tools/midjourney",
        description: "AI image generation for architectural concept visualizations.",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "532" },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "SoftwareApplication",
        name: "Revaluate",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://smartaiforwork.com/tools/revaluate",
        description: "AI property valuation and market insights for real estate professionals.",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "506" },
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
      <GoogleAnalytics gaId="G-L89TF2X49L" />
    </html>
  );
}
