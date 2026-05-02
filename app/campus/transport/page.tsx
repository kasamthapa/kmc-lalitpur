import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../../components/schema";
import { IconChevronRight, IconMapPin, IconPhone, IconClock, IconCheck } from "../../components/icons";
import { SITE_CONFIG } from "../../config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transport Service",
  description:
    "KMC Lalitpur provides safe and reliable school transport service across Lalitpur, Kathmandu, and Bhaktapur. View routes, stops, and timings.",
};

const routes = [
  {
    id: "R1",
    name: "Kathmandu Central Route",
    color: "#1a4a7a",
    pickup: "6:45 AM",
    drop: "5:30 PM",
    stops: [
      "Ratnapark (Start)",
      "Sundhara",
      "Tripureswor",
      "Thapathali",
      "Maitighar",
      "Tikathali",
      "Balkumari (KMC)",
    ],
  },
  {
    id: "R2",
    name: "Patan / Lalitpur Route",
    color: "#2d6a4f",
    pickup: "6:55 AM",
    drop: "5:20 PM",
    stops: [
      "Lagankhel (Start)",
      "Mangalbazar",
      "Ekantakuna",
      "Jawalakhel",
      "Sanepa",
      "Pulchok",
      "Balkumari (KMC)",
    ],
  },
  {
    id: "R3",
    name: "Bhaktapur Route",
    color: "#7b2d8b",
    pickup: "6:30 AM",
    drop: "5:45 PM",
    stops: [
      "Bhaktapur Buspark (Start)",
      "Thimi",
      "Jadibuti",
      "Koteshwor",
      "Tinkune",
      "Sinamangal",
      "Balkumari (KMC)",
    ],
  },
  {
    id: "R4",
    name: "Baneshwor / Dillibazar Route",
    color: "#c75000",
    pickup: "6:50 AM",
    drop: "5:25 PM",
    stops: [
      "Dillibazar (Start)",
      "Putalisadak",
      "Bijulibazar",
      "Baneshwor",
      "Old Baneshwor",
      "Naxal",
      "Balkumari (KMC)",
    ],
  },
  {
    id: "R5",
    name: "Gwarko / Imadol Route",
    color: "#374151",
    pickup: "7:00 AM",
    drop: "5:15 PM",
    stops: [
      "Gwarko (Start)",
      "Imadol",
      "Satdobato",
      "Khumaltar",
      "Nakhu",
      "Balkumari (KMC)",
    ],
  },
];

const policies = [
  "Students must be at the pickup point 5 minutes before scheduled time",
  "ID cards must be carried at all times on school transport",
  "No standing in the aisle while the vehicle is in motion",
  "Students are responsible for their own belongings",
  "Route changes require 7 days advance notice to the transport office",
  "Monthly pass must be renewed by the 5th of each month",
  "Transport pass is non-transferable",
  "Emergency contact updates must be communicated immediately",
];

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
        description="School transport routes, stops, and timings for KMC Lalitpur students."
        path="/campus/transport"
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
            <span className="text-amber-400 font-semibold">Transport</span>
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
              School Transport
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Transport Service
            </h1>
            <p className="text-xl text-[#8ba7c7] leading-relaxed">
              Safe, reliable, and punctual school transport covering 5 major routes across Lalitpur, Kathmandu, and Bhaktapur.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: "Routes", value: "5" },
              { label: "Stops", value: "30+" },
              { label: "Students/Day", value: "400+" },
              { label: "Fleet Size", value: "8 Buses" },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white/10 rounded-2xl p-5">
                <div className="text-3xl font-bold text-amber-400">{s.value}</div>
                <div className="text-[#8ba7c7] text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">Coverage</p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">All Routes & Stops</h2>
            <p className="text-[#6b7280] mt-4">Select the route closest to your location to find your pickup point.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {routes.map((route) => (
              <div
                key={route.id}
                className="rounded-2xl overflow-hidden border border-[#eae6de] hover:shadow-xl transition"
              >
                {/* Header */}
                <div
                  className="px-6 py-5 text-white"
                  style={{ background: `linear-gradient(135deg, ${route.color}, ${route.color}cc)` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                      {route.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{route.name}</h3>
                  <div className="flex gap-4 mt-3 text-sm opacity-90">
                    <span className="flex items-center gap-1.5">
                      <IconClock size={12} />
                      Pickup: {route.pickup}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <IconClock size={12} />
                      Drop: {route.drop}
                    </span>
                  </div>
                </div>

                {/* Stops */}
                <div className="p-5 bg-[#f7f5f0]">
                  <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-3">Stops</p>
                  <div className="relative">
                    <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-[#eae6de]" />
                    <ul className="space-y-2">
                      {route.stops.map((stop, i) => (
                        <li key={stop} className="flex items-center gap-3 relative">
                          <div
                            className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shrink-0 z-10"
                            style={{ background: i === 0 || i === route.stops.length - 1 ? route.color : "#d1d5db" }}
                          >
                            {(i === 0 || i === route.stops.length - 1) && (
                              <IconMapPin size={10} className="text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${i === route.stops.length - 1 ? "font-bold text-[#0B1F3A]" : "text-[#374151]"}`}>
                            {stop}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">Guidelines</p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">Transport Policies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.map((policy, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#eae6de]">
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
            Contact our transport office to register for a monthly pass or inquire about routes.
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
