import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni Network",
  description:
    "Connect with the KMC Lalitpur alumni community. Discover where our graduates are today — doctors, engineers, lawyers, CAs — and register as an alumnus.",
};

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  return children;
}
