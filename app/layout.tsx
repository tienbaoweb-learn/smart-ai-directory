import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://smart-ai-tools-for-work-directory.vercel.app"),
  title: "SmartAI for Work - AI Tools Directory",
  description:
    "Discover handpicked AI tools for furniture, architecture, construction, and real estate.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "SmartAI for Work - AI Tools Directory",
    description:
      "Discover handpicked AI tools for furniture, architecture, construction, and real estate.",
    url: "https://smart-ai-tools-for-work-directory.vercel.app",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
