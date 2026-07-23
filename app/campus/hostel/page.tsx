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
  "Dedicated quiet study halls open until 10 PM",
  "Attached bathrooms with hot water",
  "Laundry service (2×/week)",
  "Indoor recreation room (TT, carom, board games)",
  "Medical room with first-aid provisions",
  "Regular hostel warden on duty",
  "Yoga and meditation room",
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
      <section className="pt-28 pb-20 bg-[#1B3E72] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-10 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <span className="hover:text-amber-400 transition">Campus</span>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Hostel</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight leading-none">
                Hostel<br />Facilities
              </h1>
              <p className="text-lg text-[#8ba7c7] leading-relaxed mb-8 max-w-lg">
                A safe, comfortable, and academically focused living environment for students from outside the Kathmandu Valley. Everything you need to focus on your studies.
              </p>
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-400 text-[#1B3E72] font-bold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                <IconPhone size={17} />
                Inquire Now
              </a>
            </div>

            {/* Stats — horizontal rule style */}
            <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
              {[
                { label: "Capacity", value: "200+" },
                { label: "Meals / Day", value: "3" },
                { label: "Security", value: "24/7" },
                { label: "Hot Water", value: "24/7" },
              ].map((s) => (
                <div key={s.label} className="bg-[#1B3E72] px-8 py-8">
                  <div className="text-3xl font-bold text-amber-400 tabular-nums mb-1">{s.value}</div>
                  <div className="text-[#8ba7c7] text-xs uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Amenities — split layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            {/* Left: heading */}
            <div className="lg:w-72 shrink-0 lg:sticky lg:top-28">
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-3xl font-bold text-[#1B3E72] mb-4">
                What&apos;s<br />Included
              </h2>
              <p className="text-[#6b7280] text-sm leading-relaxed">
                Every room and common area is designed with your comfort, safety, and academic focus in mind.
              </p>
            </div>

            {/* Right: numbered list */}
            <div className="flex-1">
              <div className="divide-y divide-[#eae6de]">
                {amenities.map((item, i) => (
                  <div key={item} className="flex items-start gap-5 py-4 group">
                    <span className="text-xs font-bold text-amber-500 tabular-nums mt-0.5 w-5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#374151] text-sm leading-relaxed group-hover:text-[#1B3E72] transition">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules & Info strip */}
      <section className="py-16 bg-[#f7f5f0] border-y border-[#eae6de]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Admission",
                desc: "Priority given to students from outside Kathmandu Valley. Applications open with college admission.",
              },
              {
                title: "Rules & Curfew",
                desc: "Gates close at 9 PM. Lights-out at 10:30 PM on weekdays. Guests must sign the visitor register.",
              },
              {
                title: "Fees",
                desc: "Hostel fee is charged per semester. Includes meals, security, laundry, and recreational facilities.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-px bg-amber-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[#1B3E72] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1B3E72] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="w-6 h-px bg-amber-400 mb-4" />
              <h2 className="text-3xl font-bold mb-2">Ready to Apply for Hostel?</h2>
              <p className="text-[#8ba7c7] text-lg max-w-md leading-relaxed">
                Limited seats available. Contact our hostel office to check availability and reserve your room.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-400 text-[#1B3E72] font-bold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                <IconPhone size={17} />
                Call Hostel Office
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:border-amber-400 transition-all duration-200"
              >
                <IconMail size={17} />
                Email Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
