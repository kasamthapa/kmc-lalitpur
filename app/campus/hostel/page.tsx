import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../../components/schema";
import {
  IconChevronRight,
  IconCheck,
  IconPhone,
  IconMail,
  IconArrow,
} from "../../components/icons";
import { SITE_CONFIG } from "../../config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hostel Facilities",
  description:
    "KMC Lalitpur offers safe, comfortable, and affordable hostel accommodation for students from outside the Kathmandu Valley. Learn about rooms, meals, rules, and fees.",
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

const roomTypes = [
  {
    type: "Single Room",
    capacity: "1 student",
    features: ["Private attached bathroom", "Study desk & chair", "Built-in wardrobe", "Reading lamp", "Window with valley view"],
    priceMonthly: "Rs. 12,000",
    priceAnnual: "Rs. 1,30,000",
    tag: "Most Private",
    color: "border-amber-400",
    tagColor: "bg-amber-400 text-[#0B1F3A]",
  },
  {
    type: "Double Room",
    capacity: "2 students",
    features: ["Shared attached bathroom", "Individual study desks", "Personal wardrobes", "Good ventilation", "Balcony access"],
    priceMonthly: "Rs. 8,500",
    priceAnnual: "Rs. 95,000",
    tag: "Most Popular",
    color: "border-[#0B1F3A]",
    tagColor: "bg-[#0B1F3A] text-white",
  },
  {
    type: "Dormitory",
    capacity: "4–6 students",
    features: ["Shared bathroom (per floor)", "Individual study cubicles", "Shared wardrobes", "Common lounge access", "Cost-effective"],
    priceMonthly: "Rs. 6,000",
    priceAnnual: "Rs. 65,000",
    tag: "Most Affordable",
    color: "border-[#eae6de]",
    tagColor: "bg-[#f7f5f0] text-[#374151]",
  },
];

const rules = [
  "Lights out by 10:30 PM on weekdays, 11:00 PM on weekends",
  "No visitors of the opposite gender in rooms",
  "Mobile phones allowed; internet restricted after 10 PM",
  "Alcohol, tobacco, and narcotics strictly prohibited",
  "Gate entry permitted until 6:30 PM; late return requires prior permission",
  "Maintain cleanliness of personal room and shared areas",
  "Attend mandatory morning assembly (6:45 AM)",
  "Weekly room inspection by hostel warden",
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
        name="Hostel Facilities — KMC Lalitpur"
        description="Safe and comfortable hostel accommodation for KMC students."
      />
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-[#0B1F3A] text-white">
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

      {/* Room Types */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">Accommodation Options</p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">Room Types & Fees</h2>
            <p className="text-[#6b7280] mt-4">All fees include meals, Wi-Fi, and basic utilities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomTypes.map((room) => (
              <div
                key={room.type}
                className={`bg-white rounded-2xl border-2 ${room.color} overflow-hidden hover:shadow-xl transition`}
              >
                <div className="p-6 border-b border-[#eae6de]">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${room.tagColor} mb-4 inline-block`}>
                    {room.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">{room.type}</h3>
                  <p className="text-sm text-[#6b7280] mb-4">{room.capacity}</p>
                  <div className="text-3xl font-bold text-[#0B1F3A]">{room.priceMonthly}</div>
                  <div className="text-sm text-[#6b7280]">per month</div>
                  <div className="text-sm text-amber-600 font-semibold mt-1">{room.priceAnnual} / year</div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {room.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#374151]">
                        <IconCheck size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-6 w-full py-3 border-2 border-[#0B1F3A] text-[#0B1F3A] font-bold rounded-xl hover:bg-[#0B1F3A] hover:text-white transition flex items-center justify-center gap-2 text-sm"
                  >
                    Book This Room
                    <IconArrow size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">Guidelines</p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">Hostel Rules & Regulations</h2>
            <p className="text-[#6b7280] mt-4 max-w-2xl mx-auto">
              Our rules are designed to create a safe, disciplined, and academically focused environment for all residents.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-[#eae6de] bg-[#f7f5f0]">
                <span className="w-7 h-7 rounded-full bg-[#0B1F3A] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-[#374151] leading-relaxed">{rule}</span>
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
