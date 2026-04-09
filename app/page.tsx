"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { AwardsCarousel } from "./components/awards-carousel";
import { CourseSchema, WebPageSchema } from "./components/schema";
import {
  IconArrow,
  IconCheck,
  IconStar,
  IconAward,
  IconUsers,
  IconBook,
  IconZap,
  IconGlobe,
  IconScale,
  IconMic,
  IconChevronRight,
} from "./components/icons";
// ── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  { value: "22+", label: "Years of Excellence" },
  { value: "100%", label: "NEB Pass Rate" },
  { value: "10,000+", label: "Students Annually" },
  { value: "6", label: "National Awards" },
];

const programs = [
  {
    id: "science",
    title: "Science",
    color: "from-blue-900 to-blue-700",
    icon: <IconZap size={28} />,
    image: "/images/sceince.png",
    tagline: "Medicine · Engineering · Research",
    subjects: [
      "Physics",
      "Chemistry",
      "Biology / Computer",
      "Mathematics",
      "English",
    ],
    eligibility: "CGPA 2.85+ | B+ in Science, Maths & English",
    careers: ["MBBS", "Engineering", "Pharmacy", "BSc"],
    href: "/academics#science",
  },
  {
    id: "management",
    title: "Management",
    color: "from-emerald-900 to-emerald-700",
    icon: <IconGlobe size={28} />,
    image: "/images/management.png",
    tagline: "Business · Finance · Entrepreneurship",
    subjects: [
      "Accountancy",
      "Business Studies",
      "Economics",
      "Mathematics",
      "English",
    ],
    eligibility: "CGPA 2.05+ | C in Maths & English",
    careers: ["BBA", "CA", "BBS", "Finance"],
    href: "/academics#management",
  },
  {
    id: "law",
    title: "Law",
    color: "from-amber-900 to-amber-700",
    icon: <IconScale size={28} />,
    image: "/images/law.png",
    tagline: "Legal Studies · Politics · Civil Service",
    subjects: [
      "Political Science",
      "History",
      "Social Studies",
      "English",
      "Nepali",
    ],
    eligibility: "CGPA 2.05+ | C in Maths & English",
    careers: ["LLB", "Civil Service", "Advocacy", "Public Policy"],
    href: "/academics#law",
  },
];

const whyKMC = [
  {
    icon: <IconAward size={28} />,
    title: "Award Winning",
    desc: "6 national awards including Ministry of Education Excellence Award among 4000+ schools.",
  },
  {
    icon: <IconUsers size={28} />,
    title: "Expert Faculty",
    desc: "150+ highly qualified educators with advanced degrees and years of field experience.",
  },
  {
    icon: <IconBook size={28} />,
    title: "Modern Facilities",
    desc: "State-of-the-art labs, library, auditorium, sports complex, and digital infrastructure.",
  },
  {
    icon: <IconZap size={28} />,
    title: "100% NEB Results",
    desc: "Consistent 100% pass rate every year with students topping national examinations.",
  },
  {
    icon: <IconGlobe size={28} />,
    title: "Global Perspective",
    desc: "International partnerships, exchange programmes, and global college admissions support.",
  },
  {
    icon: <IconMic size={28} />,
    title: "Holistic Growth",
    desc: "Debate, Olympiads, drama, sports, SQC, and student leadership programmes.",
  },
];

const testimonials = [
  {
    quote:
      "KMC transformed my academic journey. The dedicated faculty and supportive environment helped me secure top marks in NEB and gain admission to a top medical college.",
    name: "Ananya Sharma",
    role: "Science Stream, 2080 — Now studying MBBS",
    stars: 5,
  },
  {
    quote:
      "The holistic education at KMC goes beyond textbooks. My son developed leadership skills and confidence that opened doors to international scholarships.",
    name: "Rajesh Patel",
    role: "Parent — Management Stream student",
    stars: 5,
  },
  {
    quote:
      "The modern facilities and innovative teaching methods made learning engaging. I'm now studying law at a top university. Thank you, KMC Lalitpur!",
    name: "Priya Desai",
    role: "Law Stream, 2079 — Now at Tribhuvan University",
    stars: 5,
  },
];

const latestNews = [
  {
    title: "KMC Talent and Innovation Expo 2082",
    date: "February 2, 2026",
    category: "Events",
    image: "/images/news4.png",
    featured: true,
  },
  {
    title: "Voices of Experience – MBBS Achievers Panel Discussion",
    date: "February 2, 2026",
    category: "Academic",
    image: "/images/news1.png",
  },
  {
    title: "Theme Drama Competition 2082 at KMC Seminar Hall",
    date: "February 2, 2026",
    category: "Cultural",
    image: "/images/news3.png",
  },
  {
    title: "World NGO Day — Building Partnerships for Change",
    date: "February 1, 2026",
    category: "Community",
    image: "/images/news5.png",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="bg-white">
      <Header />
      <WebPageSchema
        title="KMC Lalitpur | Kathmandu Model Secondary School"
        description="NEB affiliated +2 programs in Science, Management & Law. 100% NEB pass rate, 150+ faculty, Balkumari Lalitpur."
        path="/"
      />
      <CourseSchema
        courses={[
          {
            name: "Science Stream (+2)",
            description:
              "NEB-affiliated +2 Science program covering Physics, Chemistry, Biology/Computer and Mathematics. Prepares students for MBBS, Engineering and BSc.",
            provider: "KMC Lalitpur",
            url: "/academics#science",
          },
          {
            name: "Management Stream (+2)",
            description:
              "NEB-affiliated +2 Management program covering Accountancy, Business Studies, Economics and Mathematics. Prepares students for BBA, CA and BBS.",
            provider: "KMC Lalitpur",
            url: "/academics#management",
          },
          {
            name: "Law Stream (+2)",
            description:
              "NEB-affiliated +2 Law program covering Political Science, History, Social Studies and English. Prepares students for LLB and Civil Service.",
            provider: "KMC Lalitpur",
            url: "/academics#law",
          },
        ]}
      />
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center overflow-hidden mt-25">
        {/* YouTube background */}
        <iframe
          className="absolute top-0 left-0 w-full h-full scale-110"
          src="https://www.youtube.com/embed/YGcczHq0Nmk?autoplay=1&mute=1&loop=1&playlist=YGcczHq0Nmk&controls=0&modestbranding=1&rel=0"
          title="KMC Lalitpur Campus"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ zIndex: 0, border: "none" }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-linear-to-r from-[#0B1F3A]/80 via-[#0B1F3A]/60 to-transparent"
          style={{ zIndex: 1 }}
        />

        {/* Content */}
        <div
          className="relative max-w-7xl mx-auto w-full px-4 sm:px-6"
          style={{ zIndex: 2 }}
        >
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              NEB Affiliated · Est. 2000 · Balkumari, Lalitpur
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
              Shape Your
              <br />
              <span className="text-amber-400">Future</span> at
              <br />
              KMC Lalitpur
            </h1>
            <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-xl">
              Kathmandu Model Secondary School delivers world-class education
              across Science, Management, and Law — with 100% NEB pass rate and
              a legacy of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-400/30"
              >
                Apply for Admission
                <IconArrow />
              </Link>
              <a
                href="https://wa.me/9779851138595?text=I+would+like+to+schedule+a+campus+visit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/60 text-white font-bold rounded-xl hover:bg-white hover:text-[#0B1F3A] transition-all duration-200 backdrop-blur-sm"
              >
                Book a Campus Visit
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ zIndex: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── Notice / Announcement strip ──────────────────────────────────── */}
      <div className="bg-amber-400 text-[#0B1F3A] py-3 overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap px-4">
          {[
            "🎓 Admissions Open for 2082/83 Academic Year",
            "📢 Entrance Exam Registration Available Online",
            "🏆 KMC Lalitpur — Ministry of Education Excellence Award Winner",
            "📚 100% NEB Pass Rate — Consistently Every Year",
            "🌟 Scholarships Available — Merit & Need Based",
            "📞 Call +977-1-5918595 for Admission Enquiries",
          ].map((notice, i) => (
            <span key={i} className="text-sm font-semibold inline-block">
              {notice}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="group">
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <p className="text-slate-300 font-medium text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards Carousel ───────────────────────────────────────────────── */}
      <AwardsCarousel />

      {/* ── About snapshot ───────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative h-120 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/campus.png"
                  alt="KMC Lalitpur Campus"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/30 to-transparent" />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-6 bg-[#0B1F3A] text-white rounded-2xl px-8 py-6 shadow-2xl">
                <p className="text-amber-400 text-4xl font-bold leading-none">
                  22+
                </p>
                <p className="text-slate-300 text-sm mt-1">
                  Years of Excellence
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="lg:pl-4">
              <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-6 leading-tight">
                Leading Institution of
                <br />
                Learning Excellence
              </h2>
              <p className="text-slate-600 mb-5 leading-relaxed">
                Kathmandu Model Secondary School stands as a beacon of
                educational excellence in the Kathmandu Valley. Established in
                2000, our commitment to academic rigour, character development,
                and innovation has shaped thousands of successful individuals.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                With state-of-the-art facilities, a team of 150+ dedicated
                educators, and a comprehensive NEB-aligned curriculum, we
                provide an environment where every student can flourish —
                academically, socially, and personally.
              </p>

              {/* Mini feature grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Award Winning", sub: "6 national recognitions" },
                  { label: "Expert Faculty", sub: "150+ qualified educators" },
                  { label: "Modern Curriculum", sub: "NEB aligned programs" },
                  { label: "Innovation Focused", sub: "21st-century skills" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <IconCheck size={15} />
                    </span>
                    <div>
                      <p className="font-bold text-[#0B1F3A] text-sm">
                        {f.label}
                      </p>
                      <p className="text-xs text-slate-500">{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#0B1F3A] font-bold hover:text-amber-600 transition-colors group"
              >
                Learn More About Us
                <span className="group-hover:translate-x-1 transition-transform">
                  <IconArrow />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Programs ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Academic Streams
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-4">
              Our Programs
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Four comprehensive NEB-aligned +2 programs designed to nurture
              excellence and prepare you for your future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => (
              <div
                key={p.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#e8e8e8] hover:border-amber-300 flex flex-col"
              >
                {/* Image */}
                <div
                  className={`relative h-44 bg-linear-to-br ${p.color} overflow-hidden shrink-0`}
                >
                  <Image
                    src={p.image}
                    alt={`${p.title} Stream`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center text-[#0B1F3A] mb-2">
                      {p.icon}
                    </div>
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="text-xs text-white/70">{p.tagline}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Core Subjects
                    </p>
                    <ul className="space-y-1">
                      {p.subjects.map((s) => (
                        <li
                          key={s}
                          className="flex items-center gap-2 text-sm text-slate-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-xs font-semibold text-amber-700 mb-1">
                      Eligibility
                    </p>
                    <p className="text-xs text-slate-600">{p.eligibility}</p>
                  </div>

                  <div className="mb-5">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Career Paths
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.careers.map((c) => (
                        <span
                          key={c}
                          className="text-xs bg-[#0B1F3A]/8 text-[#0B1F3A] px-2 py-0.5 rounded font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={p.href}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#0B1F3A] hover:text-amber-600 transition-colors group"
                  >
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">
                      <IconChevronRight />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/academics"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B1F3A] text-white font-bold rounded-xl hover:bg-[#162d4a] transition-colors"
            >
              View All Programs
              <IconArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Admissions quick-look ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
                How to Apply
              </span>
              <h2 className="text-4xl font-bold text-[#0B1F3A] mb-6 leading-tight">
                Simple 3-Step
                <br />
                Admission Process
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Joining KMC Lalitpur is straightforward. Fill out your form
                online after SEE results, appear for our entrance exam, and
                secure your spot in Nepal&lsquo;s top +2 institution.
              </p>

              <div className="space-y-5 mb-8">
                {[
                  {
                    step: "01",
                    title: "Fill Online Form",
                    desc: "Available on our website after SEE results are announced. Submit with your photo.",
                  },
                  {
                    step: "02",
                    title: "Appear for Entrance Exam",
                    desc: "MCQ-based exam. Science: 100 marks. Management/Law: 75 marks.",
                  },
                  {
                    step: "03",
                    title: "Secure Your Admission",
                    desc: "Merit list published same or next day. Get admitted before seats fill up.",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center text-[#0B1F3A] font-bold text-sm shrink-0 group-hover:scale-110 transition-transform">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0B1F3A] mb-1">
                        {s.title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors"
              >
                Full Admission Guide
                <IconArrow />
              </Link>
            </div>

            {/* Scholarship highlight */}
            <div className="bg-[#0B1F3A] rounded-2xl p-8 text-white">
              <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/30 px-3 py-1.5 rounded">
                Scholarships
              </span>
              <h3 className="text-2xl font-bold mb-6">
                Scholarships & Financial Aid
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                KMC Lalitpur offers merit-based and need-based scholarships to
                deserving students. Scholarships are awarded on a first-come,
                first-served basis.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "Merit Scholarship",
                    desc: "Based on SEE (25%) + KMC Entrance (75%) cumulative marks",
                  },
                  {
                    title: "Sushil Memorial Scholarship",
                    desc: "Top 2 students from first entrance exam + 1 Madhesi community student",
                  },
                  {
                    title: "Government School Scholarship",
                    desc: "Separate entrance test for students from government schools",
                  },
                  {
                    title: "Need-based Aid",
                    desc: "Available for students from economically disadvantaged backgrounds",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <span className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-[#0B1F3A] font-bold text-xs shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-white text-sm">{s.title}</p>
                      <p className="text-slate-400 text-xs mt-1">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/admissions#scholarships"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm w-full justify-center"
              >
                View All Scholarships
                <IconArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why KMC ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Why Choose KMC
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-4">
              Why Students Thrive Here
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Six reasons KMC Lalitpur is the preferred choice for quality +2
              education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyKMC.map((item, i) => (
              <div
                key={i}
                className="group bg-white hover:bg-[#0B1F3A] rounded-2xl p-7 transition-colors duration-300 border border-[#e8e8e8] hover:border-[#0B1F3A]"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 group-hover:bg-amber-400/20 mb-5 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#0B1F3A] group-hover:text-white mb-3 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 group-hover:text-slate-300 leading-relaxed transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── News & Updates ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
                Latest News
              </span>
              <h2 className="text-4xl font-bold text-[#0B1F3A]">
                News & Updates
              </h2>
            </div>
            <Link
              href="/news"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[#0B1F3A] hover:text-amber-600 transition-colors group"
            >
              View All News
              <span className="group-hover:translate-x-1 transition-transform">
                <IconArrow />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured */}
            <div className="lg:col-span-2 group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#e8e8e8] hover:border-amber-300">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={latestNews[0].image}
                  alt={latestNews[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-amber-400 text-[#0B1F3A] text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {latestNews[0].category}
                  </span>
                  <h3 className="text-white font-bold text-xl leading-tight">
                    {latestNews[0].title}
                  </h3>
                  <p className="text-white/60 text-xs mt-1">
                    {latestNews[0].date}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {latestNews.slice(1).map((news, i) => (
                <div
                  key={i}
                  className="group flex gap-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#e8e8e8] hover:border-amber-300 cursor-pointer p-4"
                >
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-xs font-bold text-amber-600 mb-1">
                      {news.category}
                    </span>
                    <h4 className="text-sm font-bold text-[#0B1F3A] leading-tight line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {news.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">{news.date}</p>
                  </div>
                </div>
              ))}

              <Link
                href="/news"
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#0B1F3A]/20 text-[#0B1F3A] font-bold text-sm rounded-xl hover:bg-[#0B1F3A] hover:text-white hover:border-[#0B1F3A] transition-all"
              >
                All News & Events
                <IconArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/30 px-3 py-1.5 rounded">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Hear from our students and parents about their transformative
              experience at KMC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-400/40 hover:bg-white/8 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5 text-amber-400">
                  {[...Array(t.stars)].map((_, j) => (
                    <span key={j}>
                      <IconStar />
                    </span>
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                  &quot;{t.quote}&quot;
                </p>
                <div className="border-t border-white/10 pt-5">
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Co-curricular / Student Life ─────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
                Student Life
              </span>
              <h2 className="text-4xl font-bold text-[#0B1F3A] mb-6 leading-tight">
                Beyond the
                <br />
                Classroom
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                At KMC, education extends far beyond textbooks. We nurture every
                student&apos;s unique talents through a rich ecosystem of
                co-curricular and extra-curricular activities.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Debate & Speech Events",
                  "Maths Olympiad",
                  "Theme Drama Competition",
                  "Talent & Innovation Expo",
                  "Student Catalyst Committee",
                  "Sports Championships",
                  "Cultural Celebrations",
                  "Community Service",
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-slate-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                      <IconCheck size={15} />
                    </span>
                    {activity}
                  </div>
                ))}
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-[#0B1F3A] font-bold hover:text-amber-600 transition-colors group"
              >
                See Latest Events
                <span className="group-hover:translate-x-1 transition-transform">
                  <IconArrow />
                </span>
              </Link>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/news1.png", alt: "Panel Discussion" },
                { src: "/images/news3.png", alt: "Drama Competition" },
                { src: "/images/news4.png", alt: "Innovation Expo" },
                { src: "/images/news5.png", alt: "NGO Day" },
              ].map((img, i) => (
                <div
                  key={i}
                  className="relative h-44 rounded-xl overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0B1F3A]/20 group-hover:bg-[#0B1F3A]/10 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full border border-amber-400/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full border border-amber-400/10" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-6 border border-amber-400/30 px-3 py-1.5 rounded">
            Join KMC Lalitpur
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform
            <br />
            Your Future?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Join KMC Lalitpur and be part of a legacy of excellence. Admissions
            are open — seats are limited.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              Start Your Journey
              <IconArrow />
            </Link>
            <a
              href="https://wa.me/9779851138595?text=I+want+to+know+more+about+KMC+Lalitpur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: inline-flex;
          gap: 4rem;
        }
      `}</style>
    </main>
  );
}
