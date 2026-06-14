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
    icon: "/favicon.svg",
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
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
      <GoogleAnalytics gaId="G-L89TF2X49L" />
    </html>
  );
}
