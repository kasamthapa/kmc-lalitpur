import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../components/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "World-class facilities at KMC Lalitpur — science labs, computer lab, library, auditorium, sports complex, cafeteria, hostel, transport, counselling centre, and Wi-Fi campus in Balkumari, Lalitpur.",
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconArrow = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconCheck = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconMicroscope = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 18h8" />
    <path d="M3 21h18" />
    <path d="M14 21v-4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4" />
    <path d="M10 2v8" />
    <path d="M6 6h8" />
    <circle cx="10" cy="10" r="2" />
  </svg>
);
const IconMonitor = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const IconBook = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
  </svg>
);
const IconTrophy = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);
const IconUtensils = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);
const IconUsers = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconHome = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconBus = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 6v6" />
    <path d="M15 6v6" />
    <path d="M2 12h19.6" />
    <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
    <circle cx="7" cy="18" r="2" />
    <path d="M9 18h5" />
    <circle cx="16" cy="18" r="2" />
  </svg>
);
const IconHeart = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
);
const IconBulb = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V18H9v-3.8C7.21 13.16 6 11.22 6 9a6 6 0 0 1 6-6Z" />
  </svg>
);
const IconWifi = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);
const IconShield = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconMic = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

// ─── Facility data ────────────────────────────────────────────────────────────
const mainFacilities = [
  {
    id: "labs",
    icon: <IconMicroscope />,
    title: "Science Laboratories",
    image: "/images/science-lab.png",
    desc: "Separate, fully equipped Physics, Chemistry, and Biology labs with modern apparatus, microscopes, and research-grade instruments for hands-on experimentation.",
    features: [
      "Individual Physics, Chemistry & Biology labs",
      "Modern apparatus and research-grade instruments",
      "Safe experimentation protocols",
      "Qualified lab technicians on duty",
      "Mass Communication practical room",
      "Hotel Management lab",
    ],
  },
  {
    id: "computer",
    icon: <IconMonitor />,
    title: "Computer Laboratory",
    image: "/images/computer-lab.png",
    desc: "High-end workstations with latest software, networking infrastructure, and high-speed internet for programming, data science, and digital literacy training.",
    features: [
      "Latest computer workstations",
      "High-speed broadband internet",
      "Professional software suites",
      "Dedicated IT support team",
      "Learning Management System (LMS)",
      "Digital resource access",
    ],
  },
  {
    id: "library",
    icon: <IconBook />,
    title: "Central Library",
    image: "/images/library.png",
    desc: "Spacious reading area with 10,000+ books, digital resources, journals, newspapers, encyclopaedias, and a quiet study section for focused research.",
    features: [
      "10,000+ books across all streams",
      "Digital databases and e-resources",
      "Quiet study and research area",
      "Journals, newspapers and magazines",
      "Encyclopaedias and reference books",
      "Librarian support available",
    ],
  },
  {
    id: "sports",
    icon: <IconTrophy />,
    title: "Sports Complex",
    image: "/images/sports-facility.png",
    desc: "Comprehensive sports facilities encouraging physical fitness and team spirit, with certified coaches guiding students across multiple disciplines.",
    features: [
      "Basketball and volleyball courts",
      "Badminton court",
      "Running track",
      "Fitness and exercise area",
      "Certified sports coaches",
      "Inter-school and intra-school competitions",
    ],
  },
  {
    id: "cafeteria",
    icon: <IconUtensils />,
    title: "Modern Cafeteria",
    image: "/images/cafeteria.png",
    desc: "Spacious dining hall serving nutritious, hygienic meals prepared by professional chefs. Weekly varied menu to ensure balanced nutrition for all students.",
    features: [
      "Nutritious, hygienically prepared meals",
      "Weekly varied menu",
      "Food safety certified kitchen",
      "Comfortable seating area",
      "Affordable pricing for students",
      "Separate hostel dining facility",
    ],
  },
  {
    id: "auditorium",
    icon: <IconUsers />,
    title: "Seminar Hall & Auditorium",
    image: "/images/auditorium.png",
    desc: "State-of-the-art auditorium with professional lighting, premium sound system, and 200+ seating capacity for cultural events, workshops, and assemblies.",
    features: [
      "200+ seating capacity",
      "Professional audio-visual system",
      "Stage with professional lighting",
      "Used for drama, debate and events",
      "Training and seminar hosting",
      "School assembly hall",
    ],
  },
];

const additionalFacilities = [
  {
    icon: <IconHome />,
    title: "Hostel",
    desc: "Comfortable residential facility with clean rooms, hygienic meals, counselling support, and a home-like environment for outstation students.",
    link: "/campus/hostel",
    linkLabel: "View Hostel Details",
  },
  {
    icon: <IconBus />,
    title: "School Transport",
    desc: "Safe and reliable bus service covering multiple routes across Lalitpur and Kathmandu with GPS tracking and trained drivers.",
    link: "/campus/transport",
    linkLabel: "View Transport Routes",
  },
  {
    icon: <IconHeart />,
    title: "Counselling Centre",
    desc: "Qualified counsellors provide academic guidance, career counselling, and emotional support. Regular motivational sessions with guest speakers.",
    link: null,
    linkLabel: null,
  },
  {
    icon: <IconBulb />,
    title: "Incubation & Ideation Lab",
    desc: "A dedicated space for students to develop creative ideas, work on projects, and explore entrepreneurship and innovation.",
    link: null,
    linkLabel: null,
  },
  {
    icon: <IconMic />,
    title: "Student Quality Circle",
    desc: "SQC rooms where small groups of 6–8 students meet weekly to discuss academic challenges, share solutions and strengthen peer learning.",
    link: null,
    linkLabel: null,
  },
  {
    icon: <IconWifi />,
    title: "Wi-Fi Campus",
    desc: "Entire campus covered with high-speed Wi-Fi. Students have access to LMS, digital resources and online learning tools throughout the day.",
    link: null,
    linkLabel: null,
  },
  {
    icon: <IconShield />,
    title: "Security & Safety",
    desc: "24/7 CCTV surveillance, trained security personnel, first aid facilities, and emergency protocols to ensure a safe environment for all.",
    link: null,
    linkLabel: null,
  },
  {
    icon: <IconHeart />,
    title: "Medical Room",
    desc: "On-campus medical room with first aid facilities and a nurse available during school hours for student health and emergency needs.",
    link: null,
    linkLabel: null,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Facilities() {
  return (
    <main className="bg-white pt-25">
      <Header />

      {/* Schema */}
      <BreadcrumbSchema items={[{ name: "Facilities", href: "/facilities" }]} />
      <WebPageSchema
        title="Facilities | KMC Lalitpur"
        description="World-class facilities at KMC Lalitpur — science labs, computer lab, library, auditorium, sports complex, cafeteria, hostel, transport, counselling centre and Wi-Fi campus."
        path="/facilities"
      />

      {/* Hero */}
      <section className="relative pt-20 pb-20 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute top-0 right-0 w-100 h-100 rounded-full bg-amber-400/8 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-10 text-sm text-[#8ba7c7]">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="text-[#8ba7c7]/50">/</span>
            <Link
              href="/facilities"
              className="hover:text-amber-400 transition-colors"
            >
              Campus
            </Link>
            <span className="text-[#8ba7c7]/50">/</span>
            <span className="text-amber-400 font-medium">Facilities</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded">
              Campus Infrastructure
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              World-Class
              <br />
              <span className="text-amber-400">Facilities</span>
            </h1>
            <p className="text-lg text-[#8ba7c7] leading-relaxed max-w-xl">
              State-of-the-art infrastructure designed to support contemporary
              education, holistic development, and a world-class learning
              experience.
            </p>
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap gap-3 mt-10">
            {mainFacilities.map((f) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                className="px-4 py-2 bg-white/10 hover:bg-amber-400 hover:text-[#0B1F3A] text-white text-sm font-semibold rounded-lg transition-all duration-200 border border-white/20 hover:border-amber-400"
              >
                {f.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-amber-400 py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: "10,000+", label: "Books in Library" },
              { n: "200+", label: "Auditorium Seats" },
              { n: "3", label: "Science Labs" },
              { n: "24/7", label: "Security & CCTV" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-[#0B1F3A]">{s.n}</p>
                <p className="text-[#0B1F3A]/70 text-xs font-medium mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
            Our Infrastructure
          </span>
          <h2 className="text-4xl font-bold text-[#0B1F3A] mb-5">
            Built for Excellence
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Every facility at KMC Lalitpur is carefully designed and maintained
            to create an optimal learning environment. From advanced science
            laboratories to a well-stocked library, our infrastructure supports
            academic excellence and holistic student development at every level.
          </p>
        </div>
      </section>

      {/* Main facilities — alternating layout */}
      {mainFacilities.map((facility, idx) => (
        <section
          key={facility.id}
          id={facility.id}
          className={`py-20 ${idx % 2 === 0 ? "bg-[#f7f5f0]" : "bg-white"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Image */}
              <div
                className={`relative h-80 rounded-2xl overflow-hidden shadow-lg ${idx % 2 !== 0 ? "lg:order-2" : ""}`}
              >
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="w-11 h-11 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A]">
                    {facility.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={idx % 2 !== 0 ? "lg:order-1" : ""}>
                <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
                  Campus Facility
                </span>
                <h2 className="text-3xl font-bold text-[#0B1F3A] mb-4">
                  {facility.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                  {facility.desc}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {facility.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-[#0B1F3A]">
                        <IconCheck />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Additional facilities grid */}
      <section className="py-24 bg-[#0B1F3A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/30 px-3 py-1.5 rounded">
              More Facilities
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">
              Additional Facilities
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Beyond the main facilities, KMC Lalitpur provides a comprehensive
              support ecosystem for every student
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {additionalFacilities.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/30 hover:bg-white/8 transition-all duration-300 flex flex-col"
              >
                <div className="w-11 h-11 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A] mb-5 shrink-0">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white mb-3 text-sm">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed flex-1">
                  {item.desc}
                </p>
                {item.link && (
                  <Link
                    href={item.link}
                    className="mt-4 inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold hover:text-amber-300 transition-colors group"
                  >
                    {item.linkLabel}
                    <span className="group-hover:translate-x-1 transition-transform">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hostel + Transport quick links */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hostel */}
            <div className="group relative overflow-hidden rounded-2xl bg-[#f7f5f0] border border-[#e8e8e8] hover:border-amber-300 hover:shadow-lg transition-all p-8 flex flex-col">
              <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A] mb-6">
                <IconHome />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1F3A] mb-3">
                Student Hostel
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                KMC Lalitpur provides a safe, clean, and homely hostel facility
                for outstation students. Rooms are well-furnished with all
                modern amenities, hygienic meals are served daily, and qualified
                counsellors are available for support.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Clean, furnished rooms",
                  "Hygienic meals — weekly varied menu",
                  "24/7 security and supervision",
                  "Counselling and academic support",
                ].map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-slate-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center shrink-0 text-[#0B1F3A]">
                      <IconCheck />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/campus/hostel"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3A] text-white font-bold rounded-xl hover:bg-amber-400 hover:text-[#0B1F3A] transition-all text-sm"
              >
                View Hostel Details <IconArrow />
              </Link>
            </div>

            {/* Transport */}
            <div className="group relative overflow-hidden rounded-2xl bg-[#f7f5f0] border border-[#e8e8e8] hover:border-amber-300 hover:shadow-lg transition-all p-8 flex flex-col">
              <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A] mb-6">
                <IconBus />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1F3A] mb-3">
                School Transport
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                KMC Lalitpur operates a reliable transport service covering key
                areas across Lalitpur and Kathmandu. All buses are GPS tracked,
                driven by trained and licensed drivers, ensuring students travel
                safely every day.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Multiple routes across Lalitpur & Kathmandu",
                  "GPS tracking on all vehicles",
                  "Trained and licensed drivers",
                  "Punctual and reliable service",
                ].map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-slate-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center shrink-0 text-[#0B1F3A]">
                      <IconCheck />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/campus/transport"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3A] text-white font-bold rounded-xl hover:bg-amber-400 hover:text-[#0B1F3A] transition-all text-sm"
              >
                View Transport Routes <IconArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-[#0B1F3A] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full border border-amber-400/10" />
            </div>
            <div className="relative">
              <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/30 px-3 py-1.5 rounded">
                Experience KMC
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                See Our Facilities in Person
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
                Words and photos can only tell you so much. Visit our campus and
                experience the KMC Lalitpur environment firsthand. We welcome
                prospective students and parents for a guided tour.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/9779851138595?text=I+would+like+to+schedule+a+campus+visit+at+KMC+Lalitpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
                >
                  Book a Campus Visit <IconArrow />
                </a>
                <Link
                  href="/campus/virtual-tour"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  Take a Virtual Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
