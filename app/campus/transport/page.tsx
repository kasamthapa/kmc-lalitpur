import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../../components/schema";
import { IconChevronRight, IconMapPin, IconPhone, IconCheck } from "../../components/icons";
import { SITE_CONFIG } from "../../config/site";
import { routeData } from "./_components/TransportMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transport Service",
  description:
    "KMC Lalitpur provides safe and reliable school transport service across Kathmandu, Lalitpur and Bhaktapur. Students are dropped at the nearest location to their home.",
};

const totalAreas = Object.values(routeData).reduce((s, r) => s + r.stops.length, 0);

const policies = [
  "Students must be at their pickup point 5 minutes before scheduled time",
  "ID cards must be carried at all times on school transport",
  "No standing in the aisle while the vehicle is in motion",
  "Students are responsible for their own belongings",
  "Route or stop changes require 7 days advance notice to the transport office",
  "Monthly pass must be renewed by the 5th of each month",
  "Transport pass is non-transferable",
  "Emergency contact updates must be communicated to the office immediately",
];

const districtMeta: Record<string, { bg: string; border: string; badge: string; text: string; headerBg: string }> = {
  Kathmandu: {
    bg:       "bg-white",
    border:   "border-blue-100",
    badge:    "bg-blue-600",
    text:     "text-blue-700",
    headerBg: "bg-blue-50",
  },
  Bhaktapur: {
    bg:       "bg-white",
    border:   "border-violet-100",
    badge:    "bg-violet-600",
    text:     "text-violet-700",
    headerBg: "bg-violet-50",
  },
  Lalitpur: {
    bg:       "bg-white",
    border:   "border-emerald-100",
    badge:    "bg-emerald-600",
    text:     "text-emerald-700",
    headerBg: "bg-emerald-50",
  },
};

export default function TransportPage() {
  return (
    <main className="bg-white">
      <BreadcrumbSchema
        items={[
          { name: "Campus", href: "/campus" },
          { name: "Transport", href: "/campus/transport" },
        ]}
      />
      <WebPageSchema
        title="Transport Service — KMC Lalitpur"
        description="School transport route map for KMC Lalitpur students across Kathmandu, Lalitpur and Bhaktapur."
        path="/campus/transport"
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <span>Campus</span>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Transport</span>
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">School Transport</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Transport Service</h1>
            <p className="text-xl text-[#8ba7c7] leading-relaxed">
              Safe, reliable school transport covering major areas across Kathmandu, Lalitpur and Bhaktapur — drop-off at the nearest point to your home.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {[
              { label: "Areas Covered",   value: `${totalAreas}+` },
              { label: "Students Served", value: "400+" },
              { label: "Fleet Size",      value: "8 Buses" },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white/10 rounded-2xl p-5">
                <div className="text-3xl font-bold text-amber-400">{s.value}</div>
                <div className="text-[#8ba7c7] text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drop-off banner */}
      <section className="bg-amber-400 py-5">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#0B1F3A]/10 flex items-center justify-center shrink-0">
            <IconMapPin size={20} className="text-[#0B1F3A]" />
          </div>
          <p className="text-[#0B1F3A] font-semibold text-base leading-snug">
            Our transport drops every student at the{" "}
            <span className="underline underline-offset-2">nearest location to their home</span>{" "}
            within the covered areas.
          </p>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">Coverage Areas</p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">Areas We Serve</h2>
            <p className="text-[#6b7280] mt-3 max-w-lg mx-auto">
              All routes connect to KMC Balkumari. Find your area below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {Object.entries(routeData).map(([zone, route]) => {
              const m = districtMeta[zone];
              return (
                <div
                  key={zone}
                  className={`rounded-2xl border ${m.border} ${m.bg} overflow-hidden shadow-sm`}
                >
                  {/* Header */}
                  <div className={`${m.headerBg} px-5 py-4 flex items-center gap-3 border-b ${m.border}`}>
                    <span
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                      style={{ background: route.color }}
                    />
                    <h3 className="font-bold text-[#0B1F3A] text-lg">{zone}</h3>
                    <span className={`ml-auto text-white text-xs font-bold px-2.5 py-1 rounded-full ${m.badge}`}>
                      {route.stops.length} stops
                    </span>
                  </div>

                  {/* Stop chips */}
                  <div className="px-5 py-5">
                    <div className="flex flex-wrap gap-2">
                      {route.stops.map((stop) => (
                        <span
                          key={stop.name}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#374151] bg-[#f7f5f0] border border-[#e5e1d8] px-3 py-1.5 rounded-full"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: route.color }}
                          />
                          {stop.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className={`px-5 py-3 border-t ${m.border} flex items-center gap-2 ${m.headerBg}`}>
                    <IconMapPin size={13} style={{ color: route.color }} />
                    <span className={`text-xs font-semibold ${m.text}`}>
                      All stops → KMC Balkumari
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Don't see your area */}
          <div className="mt-8 bg-white border border-[#eae6de] rounded-2xl p-6 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <IconMapPin size={16} className="text-amber-600" />
            </div>
            <div>
              <p className="font-bold text-[#0B1F3A] mb-1">Don&apos;t see your area?</p>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Our coverage is continuously expanding. Contact the transport office — if you live near any listed area, we&apos;ll do our best to include a nearby pickup point for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">Guidelines</p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">Transport Policies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.map((policy, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#f7f5f0] border border-[#eae6de]">
                <div className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                  <IconCheck size={12} className="text-amber-600" />
                </div>
                <span className="text-sm text-[#374151] leading-relaxed">{policy}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Register for Transport</h2>
          <p className="text-[#8ba7c7] text-lg mb-10">
            Contact our transport office to register, confirm your pickup point, or inquire about coverage in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition"
            >
              <IconPhone size={18} />
              {SITE_CONFIG.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              Contact Admin
              <IconChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
