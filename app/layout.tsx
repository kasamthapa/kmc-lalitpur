import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { WhatsAppFloat } from "./components/whatsapp";

const geist = Geist({ subsets: ["latin"] });

// ── Viewport (separate export required in Next.js 14+) ──────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "KMC Lalitpur | Kathmandu Model Secondary School",
    template: "%s | KMC Lalitpur",
  },
  description:
    "Kathmandu Model Secondary School (KMC Lalitpur) in Balkumari, Lalitpur — NEB affiliated +2 programs in Science, Management, Law & Humanities. 100% NEB pass rate, 150+ faculty, world-class facilities.",
  keywords: [
    "KMC Lalitpur",
    "Kathmandu Model Secondary School",
    "KMSS Lalitpur",
    "NEB +2 Lalitpur",
    "Science stream Nepal",
    "Management stream Nepal",
    "Law stream Nepal",
    "Humanities Nepal",
    "Best +2 college Lalitpur",
    "Balkumari school",
    "NEB affiliated school Nepal",
    "KMC school",
  ],
  authors: [{ name: "KMC Lalitpur" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "KMC Lalitpur | Kathmandu Model Secondary School",
    description:
      "NEB affiliated +2 programs in Science, Management, Law & Humanities. 100% pass rate, 150+ expert faculty, world-class facilities in Balkumari, Lalitpur.",
    type: "website",
    locale: "en_US",
    siteName: "KMC Lalitpur",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "KMC Lalitpur - Kathmandu Model Secondary School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KMC Lalitpur | Kathmandu Model Secondary School",
    description:
      "NEB affiliated +2 programs in Science, Management, Law & Humanities. 100% pass rate, world-class facilities.",
    images: ["/images/og-image.png"],
  },
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        {children}
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
