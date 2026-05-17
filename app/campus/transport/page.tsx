import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../../components/schema";
import { IconChevronRight, IconMapPin, IconPhone, IconCheck } from "../../components/icons";
import { SITE_CONFIG } from "../../config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transport Service",
  description:
    "KMC Lalitpur provides safe and reliable school transport service across Kathmandu, Lalitpur and Bhaktapur. Students are dropped at the nearest location to their home.",
};

// Routes in logical geographic sequence
const routes = {
  Kathmandu: {
    color: { dot: "bg-[#1a4a7a]", line: "#1a4a7a", tag: "bg-[#f0f4f9] border-[#d0dce8] text-[#1a4a7a]", zone: "bg-[#1a4a7a]" },
    stops: [
      "Thankot", "Sitapaila", "Kalanki", "Kuleshwor", "Kirtipur",
      "Babarmahal", "Baneshwor", "Buddhanagar", "Chabahil",
      "Boudha", "Mulpani", "Jorpati", "Sukedhara", "Pepsicola",
    ],
  },
  Bhaktapur: {
    color: { dot: "bg-[#7b2d8b]", line: "#7b2d8b", tag: "bg-[#f9f0fa] border-[#ddb8e4] text-[#7b2d8b]", zone: "bg-[#7b2d8b]" },
    stops: [
      "Lokanthali", "Gatthaghar", "Thimi", "Madhyapur", "Bhaktapur",
      "Kamalbinayak", "Suryabinayak", "Tathali", "Jagati", "Balkot",
      "Sipadol", "Katunje", "Sallaghari", "Bode", "Radhe Radhe",
      "Changunarayan", "Nagarkot",
    ],
  },
  Lalitpur: {
    color: { dot: "bg-[#2d6a4f]", line: "#2d6a4f", tag: "bg-[#f0faf5] border-[#b7dfc9] text-[#2d6a4f]", zone: "bg-[#2d6a4f]" },
    stops: [
      "Pulchowk", "Jawalakhel", "Sanepa", "Jhamsikhel", "Kupondole",
      "Ekantakuna", "Bagdol", "Lagankhel", "Satdobato", "Gwarko",
      "Nakhu", "Chobar", "Mahalaxmisthan", "Imadol", "Tikathali",
      "Thaiba", "Lubhu", "Harisiddhi", "Sunakothi", "Bungamati",
      "Khokana", "Bhaisepati", "Tyanglaphat", "Lamatar", "Chapagaon", "Godavari",
    ],
  },
};

const totalAreas = Object.values(routes).reduce((sum, r) => sum + r.stops.length, 0);

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

function RouteStrip({ stops, dotColor, lineColor }: { stops: string[]; dotColor: string; lineColor: string }) {
  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4">
      <div className="flex items-center min-w-max py-2">
        {stops.map((stop, i) => (
          <div key={stop} className="flex items-center">
            {/* Stop */}
            <div className="flex flex-col items-center" style={{ minWidth: 64 }}>
              {/* Label above for even */}
              <div className={`h-7 flex items-end pb-1.5 ${i % 2 === 0 ? "visible" : "invisible"}`}>
                <span className="text-[10px] font-bold text-[#0B1F3A] whitespace-nowrap leading-tight text-center">
                  {stop}
                </span>
              </div>

              {/* Dot + number */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 border-white shadow-md z-10 flex items-center justify-center ${dotColor}`}
                />
              </div>

              {/* Label below for odd */}
              <div className={`h-7 flex items-start pt-1.5 ${i % 2 !== 0 ? "visible" : "invisible"}`}>
                <span className="text-[10px] font-bold text-[#0B1F3A] whitespace-nowrap leading-tight text-center">
                  {stop}
                </span>
              </div>
            </div>

            {/* Road connector */}
            {i < stops.length - 1 && (
              <div
                className="flex-shrink-0 h-0.5 w-6"
                style={{
                  background: `repeating-linear-gradient(to right, ${lineColor} 0px, ${lineColor} 6px, transparent 6px, transparent 10px)`,
                }}
              />
            )}
          </div>
        ))}

        {/* School destination badge */}
        <div className="ml-3 flex items-center gap-1.5 bg-amber-400 text-[#0B1F3A] px-3 py-1.5 rounded-full shadow-sm shrink-0">
          <IconMapPin size={12} />
          <span className="text-[10px] font-bold whitespace-nowrap">KMC Balkumari</span>
        </div>
      </div>
    </div>
  );
}

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
        description="School transport coverage areas and route map for KMC Lalitpur students across Kathmandu, Lalitpur and Bhaktapur."
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
              Safe, reliable, and punctual school transport covering major areas across Kathmandu, Lalitpur and Bhaktapur — with drop-off at the nearest point to your home.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {[
              { label: "Areas Covered", value: `${totalAreas}+` },
              { label: "Students Served", value: "400+" },
              { label: "Fleet Size",     value: "8 Buses" },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white/10 rounded-2xl p-5">
                <div className="text-3xl font-bold text-amber-400">{s.value}</div>
                <div className="text-[#8ba7c7] text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearest drop-off banner */}
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

      {/* Route Maps */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
              Route Map
            </p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">Transport Routes</h2>
            <p className="text-[#6b7280] mt-4 max-w-xl mx-auto">
              Each route follows a real road path — stops are shown in the order the bus travels.
              Scroll horizontally to see all stops on each route.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {Object.entries(routes).map(([zone, { color, stops }]) => (
              <div key={zone} className="bg-[#f7f5f0] rounded-2xl p-6 border border-[#eae6de]">
                {/* Zone header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-3 h-3 rounded-full ${color.dot}`} />
                  <h3 className="text-lg font-bold text-[#0B1F3A]">{zone}</h3>
                  <span className="text-xs font-semibold text-[#6b7280] bg-white border border-[#eae6de] px-2 py-0.5 rounded-full">
                    {stops.length} stops
                  </span>
                  <div className="flex-1 h-px bg-[#eae6de]" />
                </div>

                {/* Road strip */}
                <RouteStrip stops={stops} dotColor={color.dot} lineColor={color.line} />

                {/* Stop tags */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#eae6de]">
                  {stops.map((stop, i) => (
                    <span
                      key={stop}
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${color.tag}`}
                    >
                      {i + 1}. {stop}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-10 bg-[#f7f5f0] border border-[#eae6de] rounded-2xl p-6 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <IconMapPin size={16} className="text-amber-600" />
            </div>
            <div>
              <p className="font-bold text-[#0B1F3A] mb-1">Don&apos;t see your area?</p>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Our coverage is continuously expanding. Contact the transport office — if you live near any of the listed areas, we&apos;ll do our best to include a nearby pickup or drop-off point for you.
              </p>
            </div>
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
