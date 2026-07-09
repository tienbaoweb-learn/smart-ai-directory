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
  metadataBase: new URL("https://www.smartaiforwork.com"),
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
    url: "https://www.smartaiforwork.com",
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
  url: "https://www.smartaiforwork.com",
  description:
    "Discover handpicked AI tools for furniture, architecture, construction, and real estate professionals.",
};

const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SmartAI for Work",
  url: "https://www.smartaiforwork.com",
  logo: "https://www.smartaiforwork.com/favicon-512.png",
  description:
    "AI Tools Directory for Furniture, Architecture, Construction, and Real Estate industries.",
  sameAs: [
    "https://www.tiktok.com/@smartaiforwork",
    "https://www.facebook.com/smartaiforwork",
    "https://www.instagram.com/smartaiforwork/",
    "https://www.linkedin.com/company/smart-ai-for-work/",
    "https://x.com/smartaiforwork",
    "https://www.youtube.com/@SmartAIforWork",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "tienbao.web@gmail.com",
    contactType: "customer support",
  },
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
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
      <GoogleAnalytics gaId="G-L89TF2X49L" />
    </html>
  );
}
