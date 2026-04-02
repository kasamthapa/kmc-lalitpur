import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { WhatsAppFloat } from "./components/whatsapp";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kathmandu Model Secondary School - Premium Education in Lalitpur",
  description:
    "Kathmandu Model Secondary School (KMC Lalitpur) in Balkumari, Lalitpur offers world-class education with modern facilities, experienced faculty, and focus on holistic development. NEB Board affiliated.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Kathmandu Model Secondary School - KMC Lalitpur",
    description: "Excellence in Education",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
