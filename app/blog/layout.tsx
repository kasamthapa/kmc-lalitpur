import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, guides, and updates from Kathmandu Model Secondary School — college admission tips, NEB exam strategies, career advice for Science, Management & Law streams.",
  openGraph: {
    title: "Blog | KMC Lalitpur",
    description:
      "Expert insights and guides from KMC Lalitpur — NEB exam tips, admission guides, career advice for +2 students in Nepal.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
