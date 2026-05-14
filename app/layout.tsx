import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { FloatingWidgets } from "./components/FloatingWidgets";
import { SitePopup } from "./components/SitePopup";
import { SchemaOrg } from "./components/schema";

const geist = Geist({ subsets: ["latin"] });

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
    "Kathmandu Model Secondary School (KMC Lalitpur) in Balkumari, Lalitpur — NEB affiliated +2 programs in Science, Management & Law. 97% NEB pass rate, 150+ faculty, world-class facilities.",
  keywords: [
    "KMC Lalitpur",
    "Kathmandu Model Secondary School",
    "KMSS Lalitpur",
    "NEB +2 Lalitpur",
    "best +2 college Lalitpur",
    "science stream Nepal",
    "management stream Nepal",
    "law stream Nepal",

    "Balkumari school Lalitpur",
    "NEB affiliated school Nepal",
    "KMC school Nepal",
    "+2 admission Nepal 2082",
    "SEE result college admission",
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
      "NEB affiliated +2 programs in Science, Management & Law. 97% pass rate, 150+ expert faculty, world-class facilities in Balkumari, Lalitpur.",
    images: [
      {
        url: "/images/og-image.png",
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
      "NEB affiliated +2 programs in Science, Management & Law. 97% pass rate, world-class facilities in Lalitpur, Nepal.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "https://kmclalitpur.edu.np",
    languages: {
      "en-US": "https://kmclalitpur.edu.np",
    },
  },
  verification: {
    // ── HOW TO GET THESE (do this after deploying) ──────────────────────────
    // Google Search Console: https://search.google.com/search-console
    //   → Add property → URL prefix → https://kmclalitpur.edu.np
    //   → Verify via HTML tag → copy the content= value below
    // google: "paste-google-verification-code-here",
    //
    // Bing Webmaster Tools: https://www.bing.com/webmasters
    //   → Add site → verify via meta tag → copy the content= value below
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
