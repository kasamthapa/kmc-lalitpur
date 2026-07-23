import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  WebPageSchema,
  PrincipalSchema,
} from "../components/schema";
import { SITE_CONFIG } from "../config/site";
import {
  IconLightbulb,
  IconGlobe,
  IconHeart,
  IconBook,
  IconUsers,
  IconDiamond,
  IconCheck,
  IconArrow,
  IconAward,
  IconMapPin,
  IconPhone,
  IconMail,
} from "../components/icons";
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Kathmandu Model Secondary School — our story, mission, vision, values, principal's message, and why we are the premier +2 institution in Lalitpur, Nepal.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const pillars = [
  {
    Icon: IconBook,
    title: "Academic Excellence",
    desc: "Rigorous NEB-aligned curriculum with advanced teaching methodologies and consistent 97% pass rates.",
  },
  {
    Icon: IconUsers,
    title: "Student-Centric",
    desc: "Personalised mentorship and individual attention tailored to each student's unique strengths.",
  },
  {
    Icon: IconLightbulb,
    title: "Innovation",
    desc: "21st-century skill development — critical thinking, digital fluency, and creative problem-solving.",
  },
  {
    Icon: IconDiamond,
    title: "Holistic Growth",
    desc: "Character building, sports, arts, debate, and academics combined for complete personal development.",
  },
];

const whyKMC = [
  {
    title: "NEB Affiliated",
    desc: "Recognized by Nepal Education Board with curriculum aligned to national standards and best practices.",
  },
  {
    title: "Experienced Faculty",
    desc: "150+ qualified educators with advanced degrees and years of proven teaching excellence.",
  },
  {
    title: "State-of-the-Art Facilities",
    desc: "Modern labs, library, auditorium, sports complex, hostel, and cutting-edge digital infrastructure.",
  },
  {
    title: "97% NEB Pass Rate",
    desc: "Consistent 97% pass rate every year with students securing top positions nationally.",
  },
  {
    title: "Holistic Development",
    desc: "Balanced focus on academics, sports, arts, counselling, and character development.",
  },
  {
    title: "Global Perspective",
    desc: "International partnerships, MoU collaborations, and overseas university placement support.",
  },
];

const milestones = [
  {
    year: "2000",
    title: "Founded",
    desc: "Established under the KMC Educational Network offering Science, Management, and Law streams.",
  },
  {
    year: "2003",
    title: "Lalitpur Campus",
    desc: "Expanded to Balkumari, Lalitpur — KMC Lalitpur campus inaugurated serving thousands of students.",
  },
  {
    year: "2010",
    title: "ISO Certified",
    desc: "Received ISO 9001:2015 certification for quality management systems in education.",
  },
  {
    year: "2019",
    title: "Law Department",
    desc: "Formal establishment of the Law stream with dedicated faculty and comprehensive curriculum.",
  },
  {
    year: "2022",
    title: "Global Achievement",
    desc: "Seven students accepted to 16 top global universities with combined scholarships over NPR 60 crore.",
  },
  {
    year: "2019",
    title: "Ministry Award",
    desc: "Received the Excellence Award (Letter of Appreciation) in 2074 & 2075 B.S. from the Ministry of Education, Nepal — recognized among 4,000+ Plus Two schools nationwide.",
  },
];

const accreditations = [
  { label: "NEB Affiliated", sub: "National Examinations Board" },
  { label: "ISO 9001:2015", sub: "Quality Certified Institution" },
  {
    label: "Excellence Award 2074 & 2075",
    sub: "Ministry of Education, Nepal",
  },
  { label: "Top Among 4,000+ Schools", sub: "Nationwide Recognition" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main className="bg-white">
      <Header />
      <BreadcrumbSchema items={[{ name: "About Us", href: "/about" }]} />
      <WebPageSchema
        title="About Us | KMC Lalitpur"
        description="Learn about Kathmandu Model Secondary School — established 2000, NEB affiliated, Excellence Award winner 2074 & 2075, Balkumari Lalitpur."
        path="/about"
      />
      <PrincipalSchema />
      {/* Hero */}
      <section className="relative h-[92vh] min-h-[580px] flex items-end overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/aboutPage/about.jpeg"
          alt="KMC Lalitpur Campus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16 md:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-sm text-white/60">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-amber-400 font-medium">About Us</span>
          </nav>

          <p className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            Est. 2000 · Balkumari, Lalitpur
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
            About
            <br />
            <span className="text-amber-400">KMC Lalitpur</span>
          </h1>

          <p className="text-lg text-white/75 leading-relaxed max-w-xl mb-10">
            Over 25 years of academic excellence, character-building, and
            transformative +2 education in the Kathmandu Valley.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { n: "2,500+", label: "Students" },
              { n: "97%", label: "NEB Pass Rate" },
              { n: "150+", label: "Faculty" },
              { n: "25+", label: "Years" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl font-bold text-amber-400 leading-none">
                  {s.n}
                </span>
                <span className="text-white/60 text-xs mt-1 font-medium tracking-wide uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation strip */}
      <section className="bg-amber-400 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {accreditations.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#101F46] flex items-center justify-center shrink-0 text-amber-400">
                  <IconAward />
                </div>
                <div>
                  <p className="font-bold text-[#101F46] text-sm leading-tight">
                    {a.label}
                  </p>
                  <p className="text-[#101F46]/70 text-xs">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative pb-10 pr-10">
              <div className="relative h-110 rounded-xl overflow-hidden">
                <Image
                  src="/images/campus.png"
                  alt="KMC Lalitpur Campus"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#101F46]/20 to-transparent pointer-events-none" />
              </div>
              <div className="absolute bottom-0 right-0 bg-[#101F46] text-white rounded-lg px-8 py-6 shadow-xl">
                <p className="text-amber-400 text-4xl font-bold leading-none">
                  25+
                </p>
                <p className="text-[#8ba7c7] text-sm mt-1">
                  Years of Excellence
                </p>
              </div>
            </div>
            <div>
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#101F46] mb-6 leading-tight">
                Building Excellence
                <br />
                Since 2000
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Kathmandu Model Secondary School was established in 2000 as part
                of the KMC Educational Network, with a vision to provide
                world-class +2 education in Nepal. Starting with Science,
                Management, and Law streams, we quickly grew into one of the
                most respected secondary institutions in the country.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                KMC now serves +2 students through two connected locations:
                Bagbazar, Kathmandu and Balkumari, Lalitpur. Both campuses
                carry the same Kathmandu Model Secondary School identity,
                academic standards, and commitment to Science, Management, and
                Law education — with different locations for easier access
                across the valley.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#e8e8e8]">
                {[
                  { n: "2,500+", label: "Active Students" },
                  { n: "97%", label: "NEB Pass Rate" },
                  { n: "150+", label: "Expert Faculty" },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="text-3xl font-bold text-amber-500 leading-none">
                      {s.n}
                    </p>
                    <p className="text-slate-500 text-xs mt-1.5 font-medium">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared KMC Locations */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-12 items-start">
            <div>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                One KMC Family
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#101F46] leading-tight">
                Same Institution,
                <br />
                Two Locations
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mt-5">
                Kathmandu Model Secondary School is represented in both
                Kathmandu and Lalitpur. The Lalitpur campus is the current site
                for this website, while the Bagbazar campus is the Kathmandu
                location shown on the official KMSS website.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SITE_CONFIG.campuses.map((campus) => (
                <div
                  key={campus.name}
                  className="bg-white border border-[#e8e8e8] rounded-lg p-6"
                >
                  <p className="text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">
                    {campus.name}
                  </p>
                  <h3 className="text-xl font-bold text-[#101F46] mb-4">
                    {campus.label}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <a
                      href={campus.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-slate-600 hover:text-amber-600 transition-colors"
                    >
                      <span className="text-amber-500 mt-0.5 shrink-0">
                        <IconMapPin size={16} />
                      </span>
                      {campus.location}
                    </a>
                    <a
                      href={campus.phoneHref}
                      className="flex items-start gap-3 text-slate-600 hover:text-amber-600 transition-colors"
                    >
                      <span className="text-amber-500 mt-0.5 shrink-0">
                        <IconPhone size={16} />
                      </span>
                      {campus.phone}
                    </a>
                    <a
                      href={`mailto:${campus.email}`}
                      className="flex items-start gap-3 text-slate-600 hover:text-amber-600 transition-colors"
                    >
                      <span className="text-amber-500 mt-0.5 shrink-0">
                        <IconMail size={16} />
                      </span>
                      {campus.email}
                    </a>
                  </div>
                  <a
                    href={campus.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#101F46] hover:text-amber-600 transition-colors mt-5"
                  >
                    Visit Website
                    <IconArrow size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#101F46] leading-tight">
                Key Milestones
              </h2>
              <div className="w-10 h-0.5 bg-amber-400 mt-3" />
            </div>
            <p className="text-slate-500 text-sm md:text-right max-w-xs leading-relaxed">
              A quarter-century of growth, recognition, and student success
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-5.5 md:left-1/2 top-0 bottom-0 w-px bg-amber-200 md:-translate-x-px" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className={`relative flex items-start gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-11 h-11 rounded-full bg-amber-400 flex items-center justify-center text-[#101F46] font-bold text-xs shrink-0 shadow-lg z-10">
                    {m.year.slice(2)}
                  </div>
                  <div
                    className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}
                  >
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e8e8e8] hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                      <span className="text-xs font-bold text-amber-600 tracking-wider">
                        {m.year}
                      </span>
                      <h3 className="text-lg font-bold text-[#101F46] mt-1 mb-2">
                        {m.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <div className="w-6 h-px bg-amber-500 mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#101F46] leading-tight">
              Mission, Vision &amp; Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#101F46] rounded-3xl p-8 flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6">
                <IconLightbulb />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-[#8ba7c7] leading-relaxed text-sm flex-1">
                To establish KMC Lalitpur as a center of academic excellence,
                fostering transformative growth, we strive to create an
                inspiring environment that equips learners with refined skills
                and value-based knowledge, empowering them to excel and
                contribute meaningfully to society.
              </p>
            </div>
            <div className="bg-amber-400 rounded-3xl p-8 flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-[#101F46]/20 flex items-center justify-center text-[#101F46] mb-6">
                <IconGlobe />
              </div>
              <h3 className="text-xl font-bold text-[#101F46] mb-4">
                Our Vision
              </h3>
              <p className="text-[#3d2e0a] leading-relaxed text-sm flex-1">
                To establish itself as a center of academic excellence at par
                with national and international standards, fostering
                transformative growth by shaping minds from greatness to
                goodness with integrity, innovation, and purpose.
              </p>
            </div>
            <div className="bg-white border border-[#e8e8e8] rounded-3xl p-8 flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-[#f7f5f0] border border-[#e8e8e8] flex items-center justify-center text-[#101F46] mb-6">
                <IconHeart />
              </div>
              <h3 className="text-xl font-bold text-[#101F46] mb-5">
                Our Values
              </h3>
              <ul className="space-y-2.5 flex-1">
                {[
                  "Integrity",
                  "Excellence",
                  "Innovation",
                  "Collaboration",
                  "Inclusivity & Social Equity",
                  "Ethical Leadership",
                  "Reliability & Accountability",
                  "Optimism & Resilience",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-600">
                      <IconCheck />
                    </span>
                    <span className="text-[#374151] font-medium text-sm">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Objectives */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-4xl md:text-5xl font-bold text-[#101F46] leading-tight">
                Institutional
                <br />
                Objectives
              </h2>
              <div className="w-10 h-0.5 bg-amber-400 mt-4 mb-6" />
              <p className="text-slate-500 text-sm leading-relaxed">
                Ten core commitments guiding every program, faculty decision,
                and student experience at KMC.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Achieve academic excellence with innovative teaching and practical learning.",
                "Prepare capable students for higher studies and professional success.",
                "Provide globally recognized quality education with practical and technical skills.",
                "Encourage holistic growth through ECA and CCA programs.",
                "Develop socially responsible and result-oriented professionals.",
                "Build interpersonal skills like leadership, self-management, and communication.",
                "Offer personalized attention through small classes and individual focus.",
                "Produce professionals for business, law, development, and public sectors.",
                "Create international collaborations for academic and global exposure.",
                "Foster critical thinking, logical reasoning, and lifelong learning.",
              ].map((obj, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-lg p-5 border-l-4 border-amber-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                >
                  <span className="text-amber-500 font-bold text-xs shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* International Partnerships */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Global Reach
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#101F46] leading-tight">
                International
                <br />
                Partnerships
              </h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs md:text-right">
              Memorandums of Understanding with leading universities worldwide —
              enabling exchange, research, and study-abroad opportunities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Stony Brook University",
                country: "New York, USA",
                logo: "/images/partnerships/Stony Brook University.png",
              },
              {
                name: "Georgia Southwestern State University",
                country: "USA",
                logo: "/images/partnerships/Georgia Southwestern State University.png",
              },
              {
                name: "University of Missouri",
                country: "USA",
                logo: "/images/partnerships/University of Missouri.png",
              },
              {
                name: "Mokpo KMC University",
                country: "South Korea",
                logo: "/images/partnerships/Mokpo KMC University.png",
              },
              {
                name: "Yeoju Institute of Technology (YIT)",
                country: "South Korea",
                logo: "/images/partnerships/Yeoju Institute of Technology (YIT).png",
              },
              {
                name: "Shandong University",
                country: "China",
                logo: "/images/partnerships/Shandong University.png",
              },
              {
                name: "Tongren Polytechnic College",
                country: "China",
                logo: "/images/partnerships/Tongren Polytechnic College.png",
              },
              {
                name: "Qtec Learning Solutions",
                country: "United Kingdom",
                logo: "/images/partnerships/Qtec Learning Solutions.png",
              },
              {
                name: "National Computer Council (NCC)",
                country: "United Kingdom",
                logo: "/images/partnerships/National Computer Council (NCC).png",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="group bg-white hover:bg-[#f7f5f0] rounded-xl p-6 border border-[#e8e8e8] hover:border-amber-300 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                <div className="h-16 flex items-center mb-4">
                  <div className="bg-white rounded-lg p-2 flex items-center justify-center">
                    <Image
                      src={p.logo}
                      alt={`${p.name} logo`}
                      width={120}
                      height={52}
                      className="object-contain max-h-12 w-auto"
                    />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-[#101F46] mb-1">
                  {p.name}
                </h3>
                <p className="text-slate-500 text-xs">{p.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#101F46] leading-tight">
                What We
                <br />
                Stand For
              </h2>
              <div className="w-10 h-0.5 bg-amber-400 mt-3" />
            </div>
            <p className="text-slate-500 max-w-xs leading-relaxed md:text-right text-sm">
              Four essential pillars defining KMC Lalitpur&apos;s commitment to
              excellence
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="group relative bg-white hover:border-amber-400 rounded-xl p-7 transition-all duration-200 overflow-hidden border border-[#e8e8e8] hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="absolute top-4 right-5 text-6xl font-bold text-black/5 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <div className="w-11 h-11 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-600 mb-6">
                    <Icon />
                  </div>
                  <h3 className="text-base font-bold text-[#101F46] mb-3">
                    {title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section id="principal" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="relative w-full max-w-sm">
                <div className="relative h-120 rounded-xl overflow-hidden">
                  <Image
                    src="/images/principalProfile.png"
                    alt="Dr. Nagendra Aryal – Principal"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#101F46]/70 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-bold text-lg leading-tight">
                    Dr. Nagendra Aryal
                  </p>
                  <p className="text-amber-400 text-sm font-medium mt-1">
                    Principal
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#101F46] mb-8 leading-tight">
                Principal&apos;s
                <br />
                Message
              </h2>
              <blockquote className="border-l-4 border-amber-400 pl-6 mb-8">
                <p className="text-[#101F46] text-lg font-medium italic leading-relaxed">
                  &quot;Education is the foundation of a better future — and at
                  KMC Lalitpur, that foundation is built on excellence, empathy,
                  and unwavering purpose.&quot;
                </p>
              </blockquote>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  I’d like, before all else, to extend my deepest gratitude to
                  our valued parents and guardians for the faith and trust
                  bestowed upon KMSS!
                </p>
                <p>
                  It is deemed righteous to serve the seekers of knowledge, and
                  it is in the ethos of KMSS to empower every learner who finds
                  their way to our portal. Inspired by our motto—”Academic
                  Excellence through Quality Education”—we galvanize our
                  students to develop a lasting passion for learning and enable
                  them to look beyond their abilities and achieve what they once
                  thought impossible. We mold our students to be flexible,
                  collaborative, creative, critical thinkers, and proactive
                  lifelong learners to adapt in an increasingly fluid and
                  rapidly evolving global society. KMSS is a quintessence of
                  academic excellence and also espouses a wide range of
                  co-curricular and extra-curricular activities to help them
                  perceive the world from diverse angles.
                </p>
                <p>
                  Moreover, we focus on the preparation for various competitive
                  entrance examinations. As a result, a significant number of
                  students excel in CA and BBA courses in reputed national and
                  international universities.
                </p>
                <p>
                  Being a part of KMSS means being part of a warm and welcoming
                  family, the KMC Educational Network. It’s my privilege to
                  invite all fresh SEE graduates to join this family. We assure
                  you that you will embark on a global career, leaving a blazing
                  trail of success. KMSS will provide you with a plethora of
                  unparalleled opportunities to experience the joy of learning,
                  the wonders of new knowledge, and help you unearth your
                  limitless potential.
                </p>
                <p>
                  Visit KMSS and feel good about receiving a quality education.
                  Be the yardstick of quality, soak in the spirit of learning
                  that KMSS embodies, and take your career dreams to the next
                  level.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-[#e2ddd4]">
                <p className="font-bold text-[#101F46]">Dr. Nagendra Aryal</p>
                <p className="text-slate-500 text-sm">Principal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose KMC */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-[#101F46] leading-tight">
              Why Choose
              <br />
              KMC Lalitpur?
            </h2>
            <div className="w-10 h-0.5 bg-amber-400 mt-3 mb-0" />
          </div>
          {/* Asymmetric layout: first item large, rest in grid */}
          <div className="space-y-4">
            <div className="bg-[#101F46] rounded-xl p-8 flex flex-col sm:flex-row sm:items-start gap-6">
              <span className="text-6xl font-bold text-white/10 leading-none shrink-0 select-none">
                01
              </span>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {whyKMC[0].title}
                </h3>
                <p className="text-[#8ba7c7] text-sm leading-relaxed">
                  {whyKMC[0].desc}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whyKMC.slice(1, 5).map((item, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-lg p-6 border border-[#e8e8e8] hover:border-amber-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-amber-500 tracking-widest">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="flex-1 h-px bg-amber-400/30" />
                  </div>
                  <h3 className="text-base font-bold text-[#101F46] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-amber-400 rounded-xl p-8 flex flex-col sm:flex-row sm:items-start gap-6">
              <span className="text-6xl font-bold text-[#101F46]/15 leading-none shrink-0 select-none">
                06
              </span>
              <div>
                <h3 className="text-lg font-bold text-[#101F46] mb-2">
                  {whyKMC[5].title}
                </h3>
                <p className="text-[#3d2e0a] text-sm leading-relaxed">
                  {whyKMC[5].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Achievement */}
      <section className="py-20 bg-[#101F46]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                Global Success
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Our Students Reach
                <br />
                the World&apos;s Best Universities
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                In 2022, seven brilliant students from KMC were accepted to 16
                of the most prestigious universities and liberal arts colleges
                in the world — with combined scholarships exceeding NPR 60
                crore. This is a testament to the quality of education and
                mentorship at KMC Lalitpur.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { n: "7", label: "Students" },
                  { n: "16", label: "Top Universities" },
                  { n: "60Cr+", label: "In Scholarships" },
                  { n: "97%", label: "NEB Pass Rate" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-amber-400">{s.n}</p>
                    <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/alumni"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#101F46] font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm"
              >
                Meet Our Alumni <IconArrow />
              </Link>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src="/images/campus.png"
                alt="KMC Lalitpur Students"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#101F46] via-[#101F46]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-amber-400 font-bold text-lg">
                  &quot;Academic Excellence through Quality Education&quot;
                </p>
                <p className="text-slate-300 text-sm mt-1">
                  KMC Lalitpur Motto
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-amber-400/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-amber-400/10" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#101F46] mb-6 leading-tight">
            Join Our Growing
            <br />
            Community
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Be part of an institution committed to excellence, innovation, and
            your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#101F46] font-bold rounded-lg hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              Contact Admissions <IconArrow />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#101F46]/20 text-[#101F46] font-bold rounded-lg hover:bg-[#101F46] hover:text-white transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
