import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with KMC Lalitpur — call, email, or visit us at Imadol, Balkumari, Lalitpur. Admissions enquiries, campus visits, and general questions welcome.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
