import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Apply to KMC Lalitpur's +2 Science, Management, or Law program. Check eligibility, entrance exam dates, scholarship criteria, and start your application today.",
  openGraph: {
    title: "Admissions — KMC Lalitpur",
    description:
      "Apply for Science, Management, or Law stream at Kathmandu Model Secondary School, Lalitpur. Limited seats — apply now.",
    url: "https://kmclalitpur.edu.np/admissions",
  },
};

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
