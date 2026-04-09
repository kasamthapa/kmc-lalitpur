import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  WebPageSchema,
} from "../components/schema";
import {
  IconCheck,
  IconArrow,
  IconStar,
  IconUsers,
  IconBook,
  IconZap,
  IconGlobe,
  IconScale,
  IconMic,
} from "../components/icons";
export const metadata: Metadata = {
  title: "Academic Programs",
  description:
    "Explore KMC Lalitpur's NEB-affiliated +2 programs — Science, Management, and Law. Detailed subject lists, eligibility criteria, entrance exam info, and career pathways.",
};


// ─── Stream data ──────────────────────────────────────────────────────────────
const streams = [
  {
    id: "science",
    title: "Science Stream",
    shortTitle: "Science",
    icon: <IconZap size={22} />,
    color: "bg-blue-950",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    accentColor: "text-blue-700",
    image: "/images/sceince.png",
    tagline: "Medicine · Engineering · Research · Technology",
    overview:
      "The Science stream is designed for students passionate about scientific inquiry and research. With advanced laboratory facilities and experienced faculty, KMC prepares students for careers in medicine, engineering, pharmacy, and scientific innovation.",
    subjects: [
      { name: "Physics", note: "Core" },
      { name: "Chemistry", note: "Core" },
      { name: "Biology", note: "Core / Optional" },
      { name: "Mathematics", note: "Core" },
      { name: "Computer Science", note: "Alternative to Biology" },
      { name: "English", note: "Compulsory" },
      { name: "Nepali", note: "Compulsory" },
    ],
    eligibility: {
      cgpa: "2.85+",
      subjects: [
        "B+ in Science",
        "B+ in Mathematics",
        "B+ in Optional Mathematics",
        "B+ in English",
      ],
      note: "Must have passed Optional Mathematics",
    },
    entranceExam: {
      format: "Paper-based MCQ",
      breakdown: [
        { subject: "Science", marks: 40 },
        { subject: "Mathematics", marks: 40 },
        { subject: "English", marks: 20 },
      ],
      total: 100,
      note: "Results published within 2 days. Model questions sent via email.",
    },
    features: [
      "Separate Physics, Chemistry, and Biology labs with modern apparatus",
      "Research projects and practical experiments every semester",
      "University collaboration and MBBS/Engineering entrance coaching",
      "Science Olympiad and inter-school competitions",
      "Guest lectures from medical and engineering professionals",
      "Digital learning resources and LMS access",
    ],
    careers: [
      "MBBS / Medicine",
      "B.E. Engineering",
      "B.Sc.",
      "Pharmacy",
      "Forestry",
      "Agriculture",
      "BSc Nursing",
    ],
    passRate: "98%",
  },
  {
    id: "management",
    title: "Management Stream",
    shortTitle: "Management",
    icon: <IconGlobe size={22} />,
    color: "bg-emerald-900",
    lightColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    accentColor: "text-emerald-700",
    image: "/images/management.png",
    tagline: "Business · Finance · Entrepreneurship · CA",
    overview:
      "The Management stream prepares students for careers in business, finance, and entrepreneurship. With a curriculum that covers NEB requirements while also preparing students for competitive exams like CA and BBA entrance, this stream builds practical business acumen.",
    subjects: [
      { name: "Accountancy", note: "Core" },
      { name: "Business Studies", note: "Core" },
      { name: "Economics", note: "Core" },
      { name: "Mathematics", note: "Core" },
      { name: "English", note: "Compulsory" },
      { name: "Nepali", note: "Compulsory" },
      { name: "Hotel Management / Computer", note: "Optional" },
    ],
    eligibility: {
      cgpa: "2.05+",
      subjects: ["C grade in Mathematics", "C grade in English"],
      note: "Open to all SEE graduates meeting minimum criteria",
    },
    entranceExam: {
      format: "Physical + Computer-based MCQ",
      breakdown: [
        { subject: "English", marks: 45 },
        { subject: "General Knowledge", marks: 15 },
        { subject: "Mathematics", marks: 15 },
      ],
      total: 75,
      note: "Results published on the same day. Scholarship based on SEE (25%) + Entrance (75%).",
    },
    features: [
      "Business simulation exercises and case study analysis",
      "CA and BBA entrance examination preparation",
      "Financial literacy and investment management modules",
      "Entrepreneurship incubation and ideation lab access",
      "Hotel Management and Computer practical rooms",
      "Guest lectures from business leaders and entrepreneurs",
    ],
    careers: [
      "BBA / BBS",
      "CA (Chartered Accountancy)",
      "Finance & Banking",
      "Entrepreneurship",
      "Marketing",
      "Public Administration",
    ],
    passRate: "97%",
  },
  {
    id: "law",
    title: "Law Stream",
    shortTitle: "Law",
    icon: <IconScale size={22} />,
    color: "bg-amber-900",
    lightColor: "bg-amber-50",
    borderColor: "border-amber-200",
    accentColor: "text-amber-700",
    image: "/images/law.png",
    tagline: "Legal Studies · Politics · Advocacy · Civil Service",
    overview:
      "Established in 2019, the Law stream at KMC Lalitpur provides a comprehensive introduction to legal studies and political science. Led by reputed academicians with professional law backgrounds, this stream prepares students for LLB, civil service, and careers in advocacy and public policy.",
    subjects: [
      { name: "Political Science", note: "Core" },
      { name: "History", note: "Core" },
      { name: "Social Studies", note: "Core" },
      { name: "English", note: "Compulsory" },
      { name: "Nepali", note: "Compulsory" },
      { name: "Mathematics", note: "Core" },
      { name: "Economics", note: "Optional" },
    ],
    eligibility: {
      cgpa: "2.05+",
      subjects: ["C grade in Mathematics", "C grade in English"],
      note: "Open to all SEE graduates meeting minimum criteria",
    },
    entranceExam: {
      format: "Physical + Computer-based MCQ",
      breakdown: [
        { subject: "English", marks: 45 },
        { subject: "General Knowledge", marks: 15 },
        { subject: "Mathematics", marks: 15 },
      ],
      total: 75,
      note: "Results published on the same day. Scholarship based on SEE (25%) + Entrance (75%).",
    },
    features: [
      "Constitutional law and legal framework studies",
      "Moot court and formal debate competitions",
      "Mentorship from practicing advocates and legal professionals",
      "Civil service and LLB entrance examination coaching",
      "Model United Nations (MUN) participation",
      "Legal writing and case study workshops",
    ],
    careers: [
      "LLB / Law",
      "Civil Service",
      "Advocacy & Legal Aid",
      "Public Policy",
      "Diplomacy",
      "Political Science (BA)",
    ],
    passRate: "95%",
  },
];

const teachingApproach = [
  {
    title: "Student Quality Circle (SQC)",
    desc: "Small groups of 6–8 students meet weekly to discuss academic challenges, share solutions, and strengthen each other's understanding.",
  },
  {
    title: "Practical & Lab-Based Learning",
    desc: "Hands-on experiments, practicals, and real-world projects that reinforce theoretical knowledge across all streams.",
  },
  {
    title: "Digital & LMS Integration",
    desc: "Learning Management System with digital resources, assignments, and progress tracking accessible to all students.",
  },
  {
    title: "Competitive Exam Coaching",
    desc: "Dedicated preparation for entrance exams — MBBS, Engineering, CA, BBA, Civil Service — embedded into the curriculum.",
  },
  {
    title: "Guest Lectures & Mentorship",
    desc: "Regular sessions with industry professionals, university professors, and successful alumni across all streams.",
  },
  {
    title: "Co-curricular Excellence",
    desc: "Debate, Olympiads, drama, journalism, and innovation expo — developing the whole student beyond academics.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Academics() {
  return (
    <main className="bg-white pt-[100px]">
      <Header />
      <BreadcrumbSchema items={[{ name: "Academics", href: "/academics" }]} />
      <WebPageSchema
        title="Academic Programs | KMC Lalitpur"
        description="Three NEB-affiliated +2 programs at KMC Lalitpur — Science, Management, and Law. Detailed subjects, eligibility, entrance exam info and career pathways."
        path="/academics"
      />
      <CourseSchema
        courses={[
          {
            name: "Science Stream (+2)",
            description:
              "NEB-affiliated +2 Science program covering Physics, Chemistry, Biology/Computer and Mathematics. Entrance exam: 100 marks. Requires CGPA 2.85+ with B+ in Science, Maths and English.",
            provider: "KMC Lalitpur",
            url: "/academics#science",
          },
          {
            name: "Management Stream (+2)",
            description:
              "NEB-affiliated +2 Management program covering Accountancy, Business Studies, Economics and Mathematics. Entrance exam: 75 marks. Requires CGPA 2.05+ with C in Maths and English.",
            provider: "KMC Lalitpur",
            url: "/academics#management",
          },
          {
            name: "Law Stream (+2)",
            description:
              "NEB-affiliated +2 Law program covering Political Science, History, Social Studies, English and Nepali. Entrance exam: 75 marks. Requires CGPA 2.05+.",
            provider: "KMC Lalitpur",
            url: "/academics#law",
          },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-20 pb-20 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-400/8 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-10 text-sm text-[#8ba7c7]">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="text-[#8ba7c7]/50">/</span>
            <span className="text-amber-400 font-medium">Academics</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded">
              NEB Affiliated · +2 Programs
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Academic
              <br />
              <span className="text-amber-400">Excellence</span>
            </h1>
            <p className="text-lg text-[#8ba7c7] leading-relaxed max-w-xl">
              Four comprehensive NEB-aligned +2 programs designed to develop
              critical thinking, foster creativity, and prepare students for
              global success.
            </p>
          </div>

          {/* Stream quick-nav */}
          <div className="flex flex-wrap gap-3 mt-10">
            {streams.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-amber-400 hover:text-[#0B1F3A] text-white text-sm font-semibold rounded-lg transition-all duration-200 border border-white/20 hover:border-amber-400"
              >
                <span className="text-amber-400 hover:text-[#0B1F3A]">
                  {s.icon}
                </span>
                {s.shortTitle}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="/images/teach.png"
                alt="KMC Classroom"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/30 to-transparent" />
            </div>
            <div>
              <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
                Our Philosophy
              </span>
              <h2 className="text-3xl font-bold text-[#0B1F3A] mb-5 leading-tight">
                Education Beyond
                <br />
                the Textbook
              </h2>
              <p className="text-slate-600 mb-5 leading-relaxed text-sm">
                At KMC Lalitpur, exceptional education goes beyond rote
                learning. Our pedagogy combines rigorous academic instruction
                with real-world application, critical thinking development, and
                character building — preparing students not just for exams, but
                for life.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                Every teacher is committed to student-centred learning and
                individual attention. Our Student Quality Circle (SQC) model,
                LMS integration, and co-curricular programmes ensure that each
                student develops holistically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stream sections */}
      {streams.map((stream, idx) => (
        <section
          key={stream.id}
          id={stream.id}
          className={`py-24 ${idx % 2 === 0 ? "bg-[#f7f5f0]" : "bg-white"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12">
              <div
                className={`w-14 h-14 rounded-2xl ${stream.color} flex items-center justify-center text-amber-400 flex-shrink-0`}
              >
                {stream.icon}
              </div>
              <div>
                <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-1 border border-amber-400/40 px-3 py-1 rounded bg-amber-50">
                  {stream.tagline}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]">
                  {stream.title}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Left: image + pass rate */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={stream.image}
                    alt={stream.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                      Pass Rate
                    </span>
                    <p className="text-4xl font-bold text-white">
                      {stream.passRate}
                    </p>
                  </div>
                </div>

                {/* Entrance exam box */}
                <div className="bg-[#0B1F3A] rounded-2xl p-6 text-white">
                  <p className="text-amber-400 text-xs font-bold tracking-wider uppercase mb-3">
                    Entrance Exam
                  </p>
                  <p className="text-slate-300 text-xs mb-4">
                    {stream.entranceExam.format}
                  </p>
                  <div className="space-y-2 mb-4">
                    {stream.entranceExam.breakdown.map((b) => (
                      <div
                        key={b.subject}
                        className="flex items-center justify-between"
                      >
                        <span className="text-slate-300 text-sm">
                          {b.subject}
                        </span>
                        <span className="text-amber-400 font-bold text-sm">
                          {b.marks} marks
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-2 flex items-center justify-between">
                      <span className="text-white font-bold text-sm">
                        Total
                      </span>
                      <span className="text-amber-400 font-bold">
                        {stream.entranceExam.total} marks
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {stream.entranceExam.note}
                  </p>
                </div>
              </div>

              {/* Right: details */}
              <div className="lg:col-span-3 space-y-8">
                <p className="text-slate-600 leading-relaxed">
                  {stream.overview}
                </p>

                {/* Subjects */}
                <div>
                  <h3 className="font-bold text-[#0B1F3A] mb-4 text-sm uppercase tracking-wider">
                    Subjects
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {stream.subjects.map((s) => (
                      <div
                        key={s.name}
                        className="flex items-center justify-between gap-2 p-3 bg-white rounded-xl border border-[#e8e8e8]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                            <IconCheck />
                          </span>
                          <span className="text-slate-700 text-sm font-medium">
                            {s.name}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">
                          {s.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eligibility */}
                <div
                  className={`${stream.lightColor} border ${stream.borderColor} rounded-2xl p-6`}
                >
                  <h3
                    className={`font-bold ${stream.accentColor} mb-3 text-sm uppercase tracking-wider`}
                  >
                    Eligibility Criteria
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-[#0B1F3A]">
                      CGPA {stream.eligibility.cgpa}
                    </span>
                    <span className="text-slate-500 text-sm">
                      minimum required
                    </span>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {stream.eligibility.subjects.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <span className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                          <IconCheck />
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                  {stream.eligibility.note && (
                    <p className="text-xs text-slate-500 italic">
                      {stream.eligibility.note}
                    </p>
                  )}
                </div>

                {/* Special Features */}
                <div>
                  <h3 className="font-bold text-[#0B1F3A] mb-4 text-sm uppercase tracking-wider">
                    Special Features
                  </h3>
                  <ul className="space-y-2">
                    {stream.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#0B1F3A]">
                          <IconStar />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Career paths */}
                <div>
                  <h3 className="font-bold text-[#0B1F3A] mb-4 text-sm uppercase tracking-wider">
                    Career Pathways
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stream.careers.map((c) => (
                      <span
                        key={c}
                        className="px-3 py-1.5 bg-[#0B1F3A] text-white text-xs font-semibold rounded-lg"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm"
                >
                  Apply for {stream.shortTitle}
                  <IconArrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Teaching Approach */}
      <section className="py-24 bg-[#0B1F3A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/30 px-3 py-1.5 rounded">
              How We Teach
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Teaching Approach
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              KMC Lalitpur uses a blend of traditional rigour and modern
              pedagogy to ensure every student thrives
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {teachingApproach.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/30 hover:bg-white/8 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-[#0B1F3A] font-bold text-sm mb-5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-bold text-white mb-3 text-sm">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty snapshot */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Our Team
            </span>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">
              Dedicated Faculty
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              150+ qualified educators bringing expertise, passion, and
              dedication to every classroom
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <IconBook size={22} />,
                title: "Subject Matter Experts",
                desc: "Educators with advanced degrees — many holding Masters and PhD qualifications — and years of experience in their specialized fields.",
              },
              {
                icon: <IconUsers size={22} />,
                title: "Mentors & Guides",
                desc: "Beyond teaching, our faculty guide students personally through academic decisions, entrance preparation, and career planning.",
              },
              {
                icon: <IconZap size={22} />,
                title: "Continuous Learners",
                desc: "Regular professional development, workshops, and training to stay current with the latest pedagogical methods and curriculum changes.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#f7f5f0] rounded-2xl p-8 border border-[#e8e8e8] hover:border-amber-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A] mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/campus/faculty"
              className="inline-flex items-center gap-2 text-[#0B1F3A] font-bold hover:text-amber-600 transition-colors group text-sm"
            >
              Meet Our Faculty
              <span className="group-hover:translate-x-1 transition-transform">
                <IconArrow />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Outcomes
            </span>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">
              Student Learning Outcomes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Academic Excellence",
                desc: "Mastery of subject content with deep understanding and real-world application skills — consistently reflected in top NEB results.",
              },
              {
                title: "Critical Thinking",
                desc: "Ability to analyse, evaluate, and solve complex problems independently — a skill cultivated through our SQC model and project work.",
              },
              {
                title: "Communication Skills",
                desc: "Effective oral and written communication in English and Nepali, developed through debate, speech events, and classroom presentation.",
              },
              {
                title: "Character Development",
                desc: "Growth as responsible citizens with ethical values, social awareness, and leadership skills shaped through co-curricular engagement.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-5 bg-white rounded-2xl p-7 border border-[#e8e8e8] hover:border-amber-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:bg-amber-400 group-hover:text-[#0B1F3A] transition-colors">
                  <span className="font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1F3A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
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
            Ready to Choose Your Stream?
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Apply now for the 2082/83 academic year. View the full admission
            guide or contact our admissions team for personalised guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors"
            >
              View Admission Guide <IconArrow />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
