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
      <section className="relative pt-28 pb-20 bg-[#1B3E72] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-400/8 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#1a3a5c]/60 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-12 text-sm text-[#8ba7c7]">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="text-[#8ba7c7]/40 mx-1">/</span>
            <span className="text-white/60">Facilities</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6">
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-[0.97] mb-6 tracking-tight">
                Our Facilities<br />
                <span className="text-amber-400">&amp; Campus</span>
              </h1>
              <p className="text-lg text-[#8ba7c7] leading-relaxed max-w-lg">
                Every detail — from our 21 spacious classrooms and science labs to the cafeteria and moot court — is designed to inspire and empower KMC students.
              </p>
            </div>

            {/* Quick stat strip — editorial numbers */}
            <div className="lg:col-span-6 grid grid-cols-4 gap-6">
              {[
                { n: "21", label: "Classrooms" },
                { n: "52", label: "Computers" },
                { n: "230", label: "Seat Auditorium" },
                { n: "10K+", label: "Library Books" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-amber-400 leading-none">{s.n}</p>
                  <p className="text-[#8ba7c7] text-xs mt-2 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Facilities — alternating horizontal layout */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <div className="w-6 h-px bg-amber-500 mb-4" />
            <div className="flex items-end justify-between gap-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1B3E72] leading-tight">
                Core Facilities
              </h2>
              <p className="hidden md:block text-sm text-[#6b7280] max-w-sm leading-relaxed pb-1">
                Purpose-built spaces that support every dimension of student learning and growth.
              </p>
            </div>
          </div>

          {/* Facilities as horizontal strips — image left / right alternating feel using color accent */}
          <div className="divide-y divide-[#f0ede7]">
            {/* Classrooms */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 py-12 group">
              <div className="md:col-span-1 flex items-start pt-1">
                <span className="text-xs font-bold text-[#d1cfc9] uppercase tracking-[0.2em]">01</span>
              </div>
              <div className="md:col-span-4 pr-8">
                <div className="w-8 h-0.5 bg-amber-400 mb-4" />
                <h3 className="text-2xl font-bold text-[#1B3E72] mb-3">21 Classrooms</h3>
                <p className="text-[#4b5563] text-sm leading-relaxed">
                  Spacious, well-ventilated, naturally lit, and equipped with modern decor and audio-visual aids — our 21 classrooms inspire a practical and engaging learning environment.
                </p>
              </div>
              <div className="md:col-span-7 mt-6 md:mt-0 pl-0 md:pl-8">
                <ul className="grid grid-cols-2 gap-3">
                  {["Projectors & multimedia", "Natural lighting & ventilation", "Comfortable seating", "Audio-visual aids"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#374151]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Computer Lab */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 py-12">
              <div className="md:col-span-1 flex items-start pt-1">
                <span className="text-xs font-bold text-[#d1cfc9] uppercase tracking-[0.2em]">02</span>
              </div>
              <div className="md:col-span-4 pr-8">
                <div className="w-8 h-0.5 bg-amber-400 mb-4" />
                <h3 className="text-2xl font-bold text-[#1B3E72] mb-3">Computer Lab</h3>
                <p className="text-[#4b5563] text-sm leading-relaxed">
                  Well-equipped with 52 computers, high-speed internet with dedicated IP, and a spacious, naturally lit environment designed to enhance digital learning.
                </p>
              </div>
              <div className="md:col-span-7 mt-6 md:mt-0 pl-0 md:pl-8">
                <ul className="grid grid-cols-2 gap-3">
                  {["52 workstations", "Dedicated IP internet", "Spacious & naturally lit", "Professional software"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#374151]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Science Labs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 py-12">
              <div className="md:col-span-1 flex items-start pt-1">
                <span className="text-xs font-bold text-[#d1cfc9] uppercase tracking-[0.2em]">03</span>
              </div>
              <div className="md:col-span-4 pr-8">
                <div className="w-8 h-0.5 bg-amber-400 mb-4" />
                <h3 className="text-2xl font-bold text-[#1B3E72] mb-3">Science Laboratories</h3>
                <p className="text-[#4b5563] text-sm leading-relaxed">
                  Bright, airy, and equipped with ample instruments and materials — dedicated Physics, Chemistry, and Biology labs provide the perfect space for experimentation and discovery.
                </p>
              </div>
              <div className="md:col-span-7 mt-6 md:mt-0 pl-0 md:pl-8">
                <ul className="grid grid-cols-2 gap-3">
                  {["Physics, Chemistry & Biology", "Modern apparatus", "Research-grade instruments", "Qualified lab technicians"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#374151]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Auditorium */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 py-12">
              <div className="md:col-span-1 flex items-start pt-1">
                <span className="text-xs font-bold text-[#d1cfc9] uppercase tracking-[0.2em]">04</span>
              </div>
              <div className="md:col-span-4 pr-8">
                <div className="w-8 h-0.5 bg-amber-400 mb-4" />
                <h3 className="text-2xl font-bold text-[#1B3E72] mb-3">230-Seat Auditorium</h3>
                <p className="text-[#4b5563] text-sm leading-relaxed">
                  A simple yet elegant auditorium featuring French windows for natural light and fresh air, alongside internet hookup facilities for each of its 230 plush red seats.
                </p>
              </div>
              <div className="md:col-span-7 mt-6 md:mt-0 pl-0 md:pl-8">
                <ul className="grid grid-cols-2 gap-3">
                  {["230 plush red seats", "French windows (natural light)", "Internet hookup at each seat", "Events & assemblies"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#374151]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Moot Court */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 py-12">
              <div className="md:col-span-1 flex items-start pt-1">
                <span className="text-xs font-bold text-[#d1cfc9] uppercase tracking-[0.2em]">05</span>
              </div>
              <div className="md:col-span-4 pr-8">
                <div className="w-8 h-0.5 bg-amber-400 mb-4" />
                <h3 className="text-2xl font-bold text-[#1B3E72] mb-3">Moot Court</h3>
                <p className="text-[#4b5563] text-sm leading-relaxed">
                  A dedicated moot court for Law stream students to practise advocacy, argumentation, and courtroom procedures in a realistic legal setting under experienced faculty.
                </p>
              </div>
              <div className="md:col-span-7 mt-6 md:mt-0 pl-0 md:pl-8">
                <ul className="grid grid-cols-2 gap-3">
                  {["Realistic courtroom setup", "Law stream exclusive", "Advocacy practice", "Faculty-guided sessions"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#374151]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cafeteria */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 py-12">
              <div className="md:col-span-1 flex items-start pt-1">
                <span className="text-xs font-bold text-[#d1cfc9] uppercase tracking-[0.2em]">06</span>
              </div>
              <div className="md:col-span-4 pr-8">
                <div className="w-8 h-0.5 bg-amber-400 mb-4" />
                <h3 className="text-2xl font-bold text-[#1B3E72] mb-3">Cafeteria</h3>
                <p className="text-[#4b5563] text-sm leading-relaxed">
                  A clean, well-maintained cafeteria serving fresh and hygienic meals daily in a comfortable and welcoming environment — keeping students energised throughout the day.
                </p>
              </div>
              <div className="md:col-span-7 mt-6 md:mt-0 pl-0 md:pl-8">
                <ul className="grid grid-cols-2 gap-3">
                  {["Fresh & hygienic meals daily", "Clean & well-maintained", "Comfortable seating", "Affordable for students"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#374151]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library & E-Library — dark, horizontal split */}
      <section className="py-20 bg-[#1B3E72]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-6 h-px bg-amber-400 mb-5" />
              <h2 className="text-4xl font-bold text-white mb-5 leading-tight">
                Library &amp;<br />E-Library
              </h2>
              <p className="text-[#8ba7c7] text-sm leading-relaxed mb-8">
                Our updated and rich library includes a vast collection of books, references, periodicals, and videos. Access to our dedicated E-library extends learning beyond physical boundaries — available anytime, anywhere.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "10,000+ books and reference materials",
                  "Periodicals, journals, and newspapers",
                  "Dedicated quiet study areas",
                  "Digital databases and video resources",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#b0c4d8]">
                    <svg className="mt-0.5 shrink-0 text-amber-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="http://kmclibrary.edu.np"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#1B3E72] font-bold text-sm hover:bg-amber-300 transition-colors"
              >
                Visit E-Library
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>

            {/* Stats — large editorial numbers */}
            <div className="grid grid-cols-2 gap-8">
              {[
                { n: "10K+", label: "Books & References", desc: "Covering all streams and subjects" },
                { n: "24/7", label: "E-Library Access", desc: "Online, anytime, anywhere" },
                { n: "∞", label: "Digital Resources", desc: "Videos, databases, journals" },
                { n: "kmclibrary.edu.np", label: "Online Portal", desc: "Dedicated E-Library URL" },
              ].map((s, i) => (
                <div key={i} className="border-t border-white/10 pt-6">
                  <p className={`font-bold text-amber-400 leading-none mb-1 ${s.n.length > 6 ? "text-base" : "text-3xl"}`}>
                    {s.n}
                  </p>
                  <p className="text-white text-sm font-semibold mt-2">{s.label}</p>
                  <p className="text-[#8ba7c7] text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Wellbeing — flat list, not hovering dark boxes */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14 items-end">
            <div className="lg:col-span-5">
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#1B3E72] leading-tight">
                Student<br />Wellbeing
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[#6b7280] text-sm leading-relaxed">
                Beyond academics, KMC invests in the health, safety, and emotional wellbeing of every student on campus.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Health Care",
                desc: "Separate medical rooms for girls and boys providing emergency primary health services when needed.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                ),
              },
              {
                title: "Psychosocial Counselling",
                desc: "Comprehensive counselling services to support students' mental, emotional, and social well-being.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                ),
              },
              {
                title: "Transportation",
                desc: "KMC owns its buses for student transport at reasonable cost. Multiple shuttle service routes available.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                ),
              },
              {
                title: "Security & Safety",
                desc: "CCTV surveillance, security personnel, first aid facilities, and emergency protocols throughout campus.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-[#e8e8e8] p-7 flex gap-5 hover:border-amber-300 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
              >
                <div className="shrink-0 mt-0.5 w-9 h-9 border border-[#e8e8e8] flex items-center justify-center text-amber-600">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#1B3E72] text-base mb-2">{item.title}</h3>
                  <p className="text-[#4b5563] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hostel — two-column, premium feel */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-4xl font-bold text-[#1B3E72] mb-6 leading-tight">
                Hostel Life
              </h2>
              <p className="text-[#4b5563] text-sm leading-relaxed mb-5">
                KMC Lalitpur has separate hostels for girls and boys, overseen by dedicated wardens and resident teachers. A sincere effort has been made to provide all facilities that create a homely environment — both in infrastructure and human care.
              </p>
              <p className="text-[#4b5563] text-sm leading-relaxed mb-10">
                Every Saturday, parents are encouraged to call their children within a stipulated time. Regular and need-based extra classes are arranged for better academic performance.
              </p>

              <div className="border-t border-[#f0ede7] pt-8 grid grid-cols-1 gap-3">
                {[
                  "Separate blocks for boys & girls",
                  "Dedicated wardens (male & female)",
                  "Resident teachers on-site",
                  "Regular & need-based extra classes",
                  "Festival celebrations",
                  "Parent communication every Saturday",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <svg className="mt-0.5 shrink-0 text-amber-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="text-[#374151] text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hostel Activities — clean dark panel */}
            <div className="bg-[#1B3E72] p-8 lg:p-10">
              <div className="w-6 h-px bg-amber-400 mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">Hostel Activities</h3>
              <p className="text-[#8ba7c7] text-sm mb-8 leading-relaxed">
                Activities arranged to make the hostel stay charming, lively, and educative:
              </p>
              <div className="divide-y divide-white/8">
                {[
                  { name: "Hiking", detail: "Outdoor exploration & team building" },
                  { name: "Theatre Activities", detail: "Drama, performance, public speaking" },
                  { name: "Swimming", detail: "Physical fitness & recreation" },
                  { name: "Yoga & Meditation", detail: "Mental clarity & well-being" },
                  { name: "Study Sessions", detail: "Peer learning & academic support" },
                ].map((act) => (
                  <div key={act.name} className="py-4 flex items-center justify-between gap-4">
                    <span className="text-white text-sm font-semibold">{act.name}</span>
                    <span className="text-[#8ba7c7] text-xs text-right">{act.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports & ECAs — editorial */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14 items-end">
            <div className="lg:col-span-5">
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#1B3E72] leading-tight">
                Sports &amp; ECAs
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[#6b7280] text-sm leading-relaxed">
                At KMC, extra and co-curricular activities are an integral part of nurturing well-rounded individuals ready to make meaningful contributions in society.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xs font-bold text-[#1B3E72] uppercase tracking-[0.15em] mb-5">Sports</h3>
              <div className="flex flex-wrap gap-2">
                {["Badminton", "Swimming", "Basketball", "Table Tennis", "Futsal", "Cricket", "Chess", "Tug-of-War", "Fun Races"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 bg-[#1B3E72] text-white text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1B3E72] uppercase tracking-[0.15em] mb-5">Events &amp; Competitions</h3>
              <div className="flex flex-wrap gap-2">
                {["Technofest", "Fun Mania", "Mr. & Miss KMC", "Math Olympiad", "Debate & Quiz", "Essay Writing", "Art Competitions", "Group Rangoli", "Talent Shows"].map((e) => (
                  <span
                    key={e}
                    className="px-3 py-1.5 border border-amber-400/50 text-amber-700 text-xs font-medium bg-amber-50"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — clean, editorial */}
      <section className="py-20 bg-[#1B3E72]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Experience KMC in Person
              </h2>
              <p className="text-[#8ba7c7] text-sm leading-relaxed">
                Visit our campus at Balkumari, Lalitpur and see our world-class facilities firsthand. Schedule a campus tour or contact our admissions team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-amber-400 text-[#1B3E72] font-bold text-sm hover:bg-amber-300 transition-colors"
              >
                Schedule a Visit
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-white/20 text-white font-bold text-sm hover:bg-white/8 transition-colors"
              >
                Admission Info
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
