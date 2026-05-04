import type { Metadata } from "next";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { IconChevronRight } from "../../components/icons";
import Link from "next/link";
import { EntranceForm } from "./_components/EntranceForm";

export const metadata: Metadata = {
  title: "Entrance Examination Form | KMC Lalitpur",
  description:
    "Apply for the KMC Lalitpur entrance examination for Science, Management, or Law stream. Fill in your details and upload your SEE fee payment proof.",
};

export default function EntranceFormPage() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-14 bg-[#0B1F3A] text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <Link href="/admissions" className="hover:text-amber-400 transition">Admissions</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Entrance Form</span>
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
              2083 Admissions
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
              Entrance Examination Application
            </h1>
            <p className="text-lg text-[#8ba7c7] leading-relaxed">
              Fill in your details carefully. After submission you will receive a
              reference number — keep it safe for future correspondence with the college.
            </p>
          </div>

          {/* Info strips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {[
              { label: "Application Fee", value: "Rs. 500 (dummy)" },
              { label: "Entrance Date", value: "To be announced" },
              { label: "Result", value: "Within 3 working days" },
            ].map((s) => (
              <div key={s.label} className="bg-white/[0.06] border border-white/10 rounded-xl px-5 py-4">
                <p className="text-[#8ba7c7] text-xs font-semibold uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-white font-bold">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 bg-[#f7f5f0]">
        <div className="max-w-5xl mx-auto px-4">
          <EntranceForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
