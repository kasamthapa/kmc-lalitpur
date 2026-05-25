import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { FloatingWidgets } from "./components/FloatingWidgets";
import { SitePopup } from "./components/SitePopup";
import { SchemaOrg } from "./components/schema";

const geist = Geist({ subsets: ["latin"], display: "swap" });

// ── Viewport ──────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1F3A",
};

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://kmclalitpur.edu.np"),
  title: {
    default: "KMC Lalitpur | Kathmandu Model Secondary School",
    template: "%s | KMC Lalitpur",
  },
  description:
    "KMC Lalitpur — Kathmandu Model Secondary School, Balkumari, Lalitpur. Nepal's top NEB-affiliated +2 school offering Science, Management & BA.LLB Law streams. 97% NEB pass rate, 2,500+ students, ISO 9001:2015 certified. Admissions open 2082.",
  keywords: [
    // Primary brand terms
    "KMC Lalitpur",
    "KMC",
    "Kathmandu Model Secondary School",
    "Kathmandu Model College Lalitpur",
    "KMSS Lalitpur",
    "KMC school Nepal",
    "KMC Balkumari",

    // Location-specific
    "best +2 college Lalitpur",
    "best school Lalitpur",
    "Balkumari school Lalitpur",
    "NEB +2 Lalitpur",
    "NEB affiliated school Nepal",
    "+2 college Balkumari",

    // Stream-specific
    "science stream Nepal",
    "science stream Lalitpur",
    "management stream Nepal",
    "management stream Lalitpur",
    "law stream Nepal",
    "BA LLB Nepal",
    "BA.LLB +2 Nepal",

    // Intent-based
    "+2 admission Nepal 2082",
    "+2 admission 2082",
    "SEE result college admission Nepal",
    "best +2 college Nepal",
    "top +2 school Nepal",
    "NEB 97 percent pass rate",
    "ISO certified school Nepal",

    // Long-tail
    "Kathmandu Model Secondary School Lalitpur admission",
    "KMC Lalitpur admission 2082",
    "KMC Lalitpur science stream",
    "KMC Lalitpur management stream",
    "KMC Lalitpur law stream",
    "KMC Lalitpur fees",
    "KMC Lalitpur scholarship",
  ],
  authors: [{ name: "KMC Lalitpur", url: "https://kmclalitpur.edu.np" }],
  creator: "KMC Lalitpur",
  publisher: "Kathmandu Model Secondary School",
  category: "Education",
  classification: "Secondary School, +2 College, Educational Institution",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "any" },
    ],
    apple: [{ url: "/favicon.png" }],
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kmclalitpur.edu.np",
    siteName: "KMC Lalitpur",
    title: "KMC Lalitpur | Kathmandu Model Secondary School",
    description:
      "KMC Lalitpur — Nepal's top NEB-affiliated +2 school. Science, Management & BA.LLB Law streams. 97% pass rate, ISO certified, Balkumari Lalitpur. Admissions open 2082.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KMC Lalitpur - Kathmandu Model Secondary School, Balkumari, Lalitpur",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kmclalitpur",
    creator: "@kmclalitpur",
    title: "KMC Lalitpur | Kathmandu Model Secondary School",
    description:
      "KMC Lalitpur — Nepal's top NEB-affiliated +2 school. Science, Management & BA.LLB Law. 97% pass rate, ISO certified, Balkumari Lalitpur.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://kmclalitpur.edu.np",
    languages: {
      "en-US": "https://kmclalitpur.edu.np",
    },
  },
  verification: {
    google: "67429ce20a55fb35",
    // Bing Webmaster Tools: add msvalidate.01 here once available
    // other: { "msvalidate.01": "paste-bing-verification-code-here" },
  },
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Global JSON-LD schema — appears on every page */}
        <SchemaOrg />
      </head>
      <body className={`${geist.className} antialiased`}>
        {children}
        <FloatingWidgets />
        <SitePopup />
        <Analytics />
      </body>
    </html>
  );
}
