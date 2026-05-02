import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../../components/schema";
import {
  IconChevronRight,
  IconCheck,
  IconPhone,
  IconMail,
} from "../../components/icons";
import { SITE_CONFIG } from "../../config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hostel Facilities",
  description:
    "KMC Lalitpur offers safe, comfortable, and academically focused hostel accommodation for students from outside the Kathmandu Valley. Explore our hostel amenities and facilities.",
};

const amenities = [
  "Fully furnished rooms (beds, wardrobes, study desks)",
  "Three nutritious meals per day (dal bhat + snacks)",
  "24-hour security with CCTV surveillance",
  "High-speed Wi-Fi in all rooms and common areas",
  "Dedicated quiet study halls open until 10 PM",
  "Attached bathrooms with hot water",
  "Laundry service (2×/week)",
  "Indoor recreation room (TT, carom, board games)",
  "Medical room with first-aid provisions",
  "Regular hostel warden on duty",
  "Prayer/meditation room",
  "Weekly general cleaning and pest control",
];


export default function HostelPage() {
  return (
    <main className="bg-white">
      <BreadcrumbSchema
        items={[
          { name: "Campus", href: "/campus" },
          { name: "Hostel", href: "/campus/hostel" },
        ]}
      />
      <WebPageSchema
        title="Hostel Facilities — KMC Lalitpur"
        description="Safe and comfortable hostel accommodation for KMC students."
        path="/campus/hostel"
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <span className="hover:text-amber-400 transition">Campus</span>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Hostel</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
                On-Campus Living
              </p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                Hostel Facilities
              </h1>
              <p className="text-xl text-[#8ba7c7] leading-relaxed mb-8">
                A safe, comfortable, and academically focused living environment for students from outside the Kathmandu Valley. Everything you need to focus on your studies.
              </p>
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition"
              >
                <IconPhone size={18} />
                Inquire Now
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Capacity", value: "200+" },
                { label: "Meals/Day", value: "3" },
                { label: "Security", value: "24/7" },
                { label: "Wi-Fi", value: "Free" },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">{s.value}</div>
                  <div className="text-[#8ba7c7] text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">What&apos;s Included</p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">Hostel Amenities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenities.map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-[#f7f5f0] border border-[#eae6de]">
                <div className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                  <IconCheck size={12} className="text-amber-600" />
                </div>
                <span className="text-sm text-[#374151]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply for Hostel?</h2>
          <p className="text-[#8ba7c7] text-lg mb-10">
            Limited seats available. Contact our hostel office to check availability and reserve your room.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition"
            >
              <IconPhone size={18} />
              Call Hostel Office
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              <IconMail size={18} />
              Email Inquiry
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
