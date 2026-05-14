import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import type { Metadata } from "next";
import { BreadcrumbSchema, WebPageSchema } from "../components/schema";

export const metadata: Metadata = {
  title: "Facilities & Infrastructure",
  description:
    "Explore KMC Lalitpur's world-class facilities — 21 classrooms, 52-computer lab, 230-seat auditorium, cafeteria, E-library, science labs, moot court, hostel, and more.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Facilities() {
  return (
    <main className="bg-white pt-25">
      <Header />
      <BreadcrumbSchema items={[{ name: "Facilities", href: "/facilities" }]} />
      <WebPageSchema
        title="Facilities & Infrastructure | KMC Lalitpur"
        description="KMC Lalitpur offers world-class facilities — 21 modern classrooms, 52-computer lab with dedicated IP, 230-seat auditorium, cafeteria, E-library, science labs, moot court and hostel."
        path="/facilities"
      />

      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-400/8 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#1a3a5c]/60 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-10 text-sm text-[#8ba7c7]">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="text-[#8ba7c7]/50">/</span>
            <span className="text-amber-400 font-medium">Facilities</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded">
              World-Class Infrastructure
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Our Facilities
              <br />
              <span className="text-amber-400">&amp; Campus</span>
            </h1>
            <p className="text-lg text-[#8ba7c7] leading-relaxed max-w-xl">
              Every detail, from our 21 spacious classrooms and science labs
              to the cafeteria and moot court, is designed to inspire
              and empower KMC students.
            </p>
          </div>

          {/* Quick stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
            {[
              { n: "21", label: "Classrooms" },
              { n: "52", label: "Computers" },
              { n: "230", label: "Seat Auditorium" },
              { n: "10K+", label: "Library Books" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
              >
                <p className="text-2xl font-bold text-amber-400">{s.n}</p>
                <p className="text-[#8ba7c7] text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Facilities Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-14">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Infrastructure
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] leading-tight">
              Core Facilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Classrooms */}
            <div className="bg-[#f7f5f0] border border-[#e8e8e8] rounded-2xl p-7 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 mb-5 shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <h3 className="text-[#0B1F3A] font-bold text-base mb-3">21 Classrooms</h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                Spacious, well-ventilated, naturally lit, and equipped with modern decor
                and audio-visual aids — our 21 classrooms inspire a practical and
                engaging learning environment.
              </p>
              <ul className="mt-4 space-y-1.5">
                {["Projectors & multimedia", "Natural lighting & ventilation", "Comfortable seating", "Audio-visual aids"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Computer Lab */}
            <div className="bg-[#f7f5f0] border border-[#e8e8e8] rounded-2xl p-7 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 mb-5 shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3 className="text-[#0B1F3A] font-bold text-base mb-3">Computer Lab — 52 Computers</h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                Well-equipped with 52 computers, high-speed internet with dedicated IP,
                and a spacious, naturally lit environment designed to enhance digital
                learning and technical skill development.
              </p>
              <ul className="mt-4 space-y-1.5">
                {["52 workstations", "Dedicated IP internet", "Spacious & naturally lit", "Professional software"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Science Labs */}
            <div className="bg-[#f7f5f0] border border-[#e8e8e8] rounded-2xl p-7 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 mb-5 shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11l-5 5M9 14h10l-5 5"/>
                </svg>
              </div>
              <h3 className="text-[#0B1F3A] font-bold text-base mb-3">Science Laboratories</h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                Bright, airy, and equipped with ample instruments and materials, our
                dedicated Physics, Chemistry, and Biology labs provide the perfect
                space for experimentation, research, and discovery.
              </p>
              <ul className="mt-4 space-y-1.5">
                {["Physics, Chemistry & Biology labs", "Modern apparatus", "Research-grade instruments", "Qualified lab technicians"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Auditorium */}
            <div className="bg-[#f7f5f0] border border-[#e8e8e8] rounded-2xl p-7 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 mb-5 shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="text-[#0B1F3A] font-bold text-base mb-3">230-Seat Auditorium</h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                A simple yet elegant auditorium featuring French windows for natural
                light and fresh air, alongside internet hookup facilities for each of
                its 230 plush red seats.
              </p>
              <ul className="mt-4 space-y-1.5">
                {["230 plush red seats", "French windows (natural light)", "Internet hookup at each seat", "Events & assemblies"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Moot Court */}
            <div className="bg-[#f7f5f0] border border-[#e8e8e8] rounded-2xl p-7 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 mb-5 shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21V11h6v10"/>
                </svg>
              </div>
              <h3 className="text-[#0B1F3A] font-bold text-base mb-3">Moot Court</h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                A dedicated moot court facility for Law stream students to practise advocacy,
                argumentation, and courtroom procedures in a realistic legal setting under
                the guidance of experienced faculty.
              </p>
              <ul className="mt-4 space-y-1.5">
                {["Realistic courtroom setup", "Law stream exclusive", "Advocacy & argumentation practice", "Faculty-guided sessions"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cafeteria */}
            <div className="bg-[#f7f5f0] border border-[#e8e8e8] rounded-2xl p-7 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 mb-5 shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                </svg>
              </div>
              <h3 className="text-[#0B1F3A] font-bold text-base mb-3">Cafeteria</h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                A clean, well-maintained cafeteria serving fresh and hygienic meals
                daily in a comfortable and welcoming environment — keeping students
                energised throughout the day.
              </p>
              <ul className="mt-4 space-y-1.5">
                {["Fresh & hygienic meals daily", "Clean & well-maintained", "Comfortable seating", "Affordable for students"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Library & E-Library */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/30 px-3 py-1.5 rounded">
                Knowledge Hub
              </span>
              <h2 className="text-3xl font-bold text-white mb-5 leading-tight">
                Library &amp;
                <br />
                E-Library
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Our updated and rich library includes a vast collection of books,
                references, periodicals, and videos. Access to our dedicated
                E-library extends the learning process beyond physical boundaries —
                available anytime, anywhere.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "10,000+ books and reference materials",
                  "Periodicals, journals, and newspapers",
                  "Dedicated quiet study areas",
                  "Digital databases and video resources",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="http://kmclibrary.edu.np"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm"
              >
                Visit E-Library
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "10K+", label: "Books" },
                { n: "24/7", label: "E-Library Access" },
                { n: "∞", label: "Digital Resources" },
                { n: "kmclibrary.edu.np", label: "E-Library URL", small: true },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
                >
                  <p className={`font-bold text-amber-400 ${s.small ? "text-base" : "text-2xl"}`}>
                    {s.n}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Wellbeing */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-14">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Care & Support
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] leading-tight">
              Student
              <br />
              Wellbeing
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Health Care",
                desc: "Separate medical rooms for girls and boys providing emergency primary health services when needed.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                ),
              },
              {
                title: "Psychosocial Counselling",
                desc: "Comprehensive counselling services to support students' mental, emotional, and social well-being.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                ),
              },
              {
                title: "Transportation",
                desc: "KMC owns its buses for student transport at reasonable cost. Multiple shuttle service routes available.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                ),
              },
              {
                title: "Security & Safety",
                desc: "CCTV surveillance, security personnel, first aid facilities, and emergency protocols throughout campus.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white hover:bg-[#0B1F3A] rounded-2xl p-6 border border-[#e8e8e8] hover:border-[#0B1F3A] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/15 group-hover:bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-600 mb-4 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-[#0B1F3A] group-hover:text-white mb-2 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-500 group-hover:text-[#8ba7c7] text-xs leading-relaxed transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hostel */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
                A Home Away from Home
              </span>
              <h2 className="text-4xl font-bold text-[#0B1F3A] mb-6 leading-tight">
                Hostel Life
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                KMC Lalitpur has separate hostels for girls and boys, overseen
                by dedicated wardens and resident teachers. A sincere effort has
                been made to provide all facilities that create a homely
                environment — both in infrastructure and human care.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Every Saturday, parents are encouraged to call their children
                within a stipulated time. Regular and need-based extra classes
                are arranged for better academic performance.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Separate blocks for boys & girls",
                  "Dedicated wardens (male & female)",
                  "Resident teachers on-site",
                  "Regular & need-based extra classes",
                  "Festival celebrations",
                  "Parent communication every Saturday",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-amber-600">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    <span className="text-slate-600 text-xs leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hostel Activities */}
            <div className="bg-[#0B1F3A] rounded-2xl p-8">
              <h3 className="text-white font-bold text-base mb-6">Hostel Activities</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Numerous activities are arranged to make the hostel stay charming,
                lively, and educative:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Hiking", icon: "🥾" },
                  { name: "Theatre Activities", icon: "🎭" },
                  { name: "Swimming", icon: "🏊" },
                  { name: "Yoga", icon: "🧘" },
                  { name: "Meditation", icon: "🌿" },
                  { name: "Study Sessions", icon: "📚" },
                ].map((act) => (
                  <div
                    key={act.name}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3"
                  >
                    <span className="text-lg">{act.icon}</span>
                    <span className="text-white text-sm font-medium">{act.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports & ECAs */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-14">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Beyond Academics
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] leading-tight">
              Sports &amp; ECAs
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mt-4">
              At KMC, extra and co-curricular activities are an integral part of
              nurturing well-rounded individuals ready to make meaningful
              contributions in society.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-[#e8e8e8] rounded-2xl p-7">
              <h3 className="font-bold text-[#0B1F3A] mb-4 text-sm uppercase tracking-wider">Sports</h3>
              <div className="flex flex-wrap gap-2">
                {["Badminton", "Swimming", "Basketball", "Table Tennis", "Futsal", "Cricket", "Chess", "Tug-of-War", "Fun Races"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 bg-[#0B1F3A] text-white text-xs font-semibold rounded-lg"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white border border-[#e8e8e8] rounded-2xl p-7">
              <h3 className="font-bold text-[#0B1F3A] mb-4 text-sm uppercase tracking-wider">Events &amp; Competitions</h3>
              <div className="flex flex-wrap gap-2">
                {["Technofest", "Fun Mania", "Mr. & Miss KMC", "Math Olympiad", "Debate & Quiz", "Essay Writing", "Art Competitions", "Group Rangoli", "Talent Shows"].map((e) => (
                  <span
                    key={e}
                    className="px-3 py-1.5 bg-amber-400/15 border border-amber-400/30 text-amber-700 text-xs font-semibold rounded-lg"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-amber-400/10" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience KMC in Person
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed text-sm">
            Visit our campus at Balkumari, Lalitpur and see our world-class
            facilities firsthand. Schedule a campus tour or contact our
            admissions team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors"
            >
              Schedule a Visit
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
