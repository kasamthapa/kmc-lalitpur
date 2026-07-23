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
    image: "/images/science-v2.png",
    tagline: "Medicine · Engineering · Research · Technology",
    overview:
      "The Science stream is designed for students passionate about scientific inquiry and research. With advanced laboratory facilities and experienced faculty, KMC prepares students for careers in medicine, engineering, pharmacy, and scientific innovation.",
    subjects: [
      { name: "Compulsory English", note: "Compulsory" },
      { name: "Compulsory Nepali", note: "Compulsory" },
      { name: "Physics", note: "Core" },
      { name: "Chemistry", note: "Core" },
      { name: "Biology", note: "Core / Optional" },
      { name: "Computer Science", note: "Alternative to Biology" },
      {
        name: "Compulsory Maths / Social Studies & Life Skills",
        note: "Compulsory",
      },
    ],
    timing: "Morning: 6:20 AM – 12:50 PM  |  Day: 11:00 AM – 5:30 PM",
    eligibility: {
      cgpa: "2.0+",
      subjects: [
        "B+ in Science",
        "B+ in Mathematics",
        "B+ in Optional Mathematics",
        "B+ in English",
      ],
      note: "Must have passed Optional Mathematics",
    },
    entranceExam: {
      format: "Paper-based MCQ — 100 marks, 60 minutes",
      breakdown: [
        { subject: "Mathematics", marks: "30%" },
        { subject: "Science", marks: "40%" },
        { subject: "English", marks: "20%" },
        { subject: "GK & IQ", marks: "10%" },
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
      "Pre-medical & pre-engineering classes",
      "Extra Saturday classes for advanced preparation",
      "Mock test every Saturday",
      "Numerical classes for problem-solving mastery",
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
    passRate: "97%",
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
      { name: "Compulsory English", note: "Compulsory" },
      { name: "Compulsory Nepali", note: "Compulsory" },
      { name: "Accountancy", note: "Core" },
      { name: "Economics", note: "Core" },
      {
        name: "Comp. Social Studies & Life Skills / Mathematics",
        note: "Compulsory",
      },
      {
        name: "Business Maths / Computer Science/Hotel Management / Business Studies",
        note: "Optional",
      },
    ],
    timing: "Morning: 6:20 AM – 11:00 AM",
    eligibility: {
      cgpa: "2.0+",
      subjects: ["C grade in Mathematics", "C grade in English"],
      note: "Open to all SEE graduates meeting minimum criteria",
    },
    entranceExam: {
      format: "Physical + Computer-based MCQ — 75 marks, 60 minutes",
      breakdown: [
        { subject: "Mathematics", marks: "36%" },
        { subject: "English", marks: "36%" },
        { subject: "Nepali & General Knowledge", marks: "28%" },
      ],
      total: 75,
      note: "Results published on the same day. Scholarship based on SEE (25%) + Entrance (75%).",
    },
    features: [
      "Business simulation exercises and case study analysis",
      "CA, ACCA and BBA entrance examination preparation",
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
      "Established in 2019, the Law stream at KMC Lalitpur provides a comprehensive introduction to legal studies and political science. Led by reputed academicians with professional law backgrounds, this stream prepares students for BA.LLB, civil service, and careers in advocacy and public policy.",
    subjects: [
      { name: "Compulsory English", note: "Compulsory" },
      { name: "Compulsory Nepali", note: "Compulsory" },
      { name: "Comp. Social Studies & Life Skills", note: "Compulsory" },
      { name: "Jurisprudence & Legal Theories (Gr. XI)", note: "Core" },
      { name: "Procedural Law (Gr. XI)", note: "Core" },
      { name: "Constitutional Law (Gr. XI)", note: "Core" },
      { name: "Nepalese Legal System (Gr. XII)", note: "Core" },
      { name: "Civil & Criminal Law & Justice (Gr. XII)", note: "Core" },
      { name: "Legal Drafting (Gr. XII)", note: "Core" },
    ],
    timing: "Morning: 6:20 AM – 11:00 AM",
    eligibility: {
      cgpa: "2.0+",
      subjects: ["C grade in Mathematics", "C grade in English"],
      note: "Open to all SEE graduates meeting minimum criteria",
    },
    entranceExam: {
      format: "Physical + Computer-based MCQ — 75 marks, 60 minutes",
      breakdown: [
        { subject: "English", marks: "30%" },
        { subject: "Nepali", marks: "30%" },
        { subject: "Social Studies & General Knowledge", marks: "40%" },
      ],
      total: 75,
      note: "Results published on the same day. Scholarship based on SEE (25%) + Entrance (75%).",
    },
    features: [
      "Nepal's first +2 law school — pioneer in legal education at secondary level",
      "Consistent 100% result for 5 consecutive years",
      "15-day internship at prestigious law firms under renowned lawyers",
      "Moot court, Mock Parliament, and formal debate competitions",
      "Constitutional law, jurisprudence, civil and criminal law curriculum",
      "Clinical legal education — court visits, custody visits, legal awareness programs",
      "Civil service and BA.LLB entrance examination coaching",
      "Legal research, analytical training, and case study workshops",
    ],
    careers: [
      "BA.LLB / Law",
      "Civil Service",
      "Advocacy & Legal Aid",
      "Public Policy",
      "Diplomacy",
      "Political Science (BA)",
    ],
    passRate: "100%",
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
              "NEB-affiliated +2 Science program covering Physics, Chemistry, Biology/Computer and Mathematics. Entrance exam: 100 marks (Maths 30%, Science 40%, English 20%, GK & IQ 10%). Requires GPA 2.0+ with B+ in Science, Maths and English.",
            provider: "KMC Lalitpur",
            url: "/academics#science",
          },
          {
            name: "Management Stream (+2)",
            description:
              "NEB-affiliated +2 Management program covering Accountancy, Economics and Business Studies. Entrance exam: 75 marks (Maths 36%, English 36%, Nepali & GK 28%). Requires GPA 2.0+ with C in Maths and English.",
            provider: "KMC Lalitpur",
            url: "/academics#management",
          },
          {
            name: "Law Stream (+2)",
            description:
              "NEB-affiliated +2 Law program covering Constitutional Law, Jurisprudence, Procedural Law (Gr. XI) and Nepalese Legal System, Civil & Criminal Law, Legal Drafting (Gr. XII). Entrance exam: 75 marks (English 30%, Nepali 30%, Social Studies & GK 40%). Requires GPA 2.0+.",
            provider: "KMC Lalitpur",
            url: "/academics#law",
          },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-[#1B3E72] overflow-hidden">
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
            <p className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              NEB Affiliated · +2 Programs
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Academic
              <br />
              <span className="text-amber-400">Excellence</span>
            </h1>
            <p className="text-lg text-[#8ba7c7] leading-relaxed max-w-xl">
              Three comprehensive NEB-aligned +2 programs designed to develop
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
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-amber-400 hover:text-[#1B3E72] text-white text-sm font-semibold rounded-lg transition-all duration-200 border border-white/20 hover:border-amber-400"
              >
                <span className="text-amber-400 hover:text-[#1B3E72]">
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
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-16 items-center">
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src="/images/teach.png"
                alt="KMC Classroom"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1B3E72]/30 to-transparent pointer-events-none" />
            </div>
            <div>
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-3xl font-bold text-[#1B3E72] mb-5 leading-tight">
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
                className={`w-14 h-14 rounded-xl ${stream.color} flex items-center justify-center text-amber-400 shrink-0`}
              >
                {stream.icon}
              </div>
              <div>
                <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-1">
                  {stream.tagline}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1B3E72]">
                  {stream.title}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Left: image + pass rate */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={stream.image}
                    alt={stream.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#1B3E72]/60 to-transparent pointer-events-none" />
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
                <div className="bg-[#1B3E72] rounded-xl p-6 text-white">
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
                          {b.marks}
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

                {/* Class Timing */}
                {"timing" in stream && (
                  <div className="bg-amber-400/10 border border-amber-400/30 rounded-lg p-5">
                    <p className="text-amber-700 text-xs font-bold tracking-wider uppercase mb-2">
                      Class Timings
                    </p>
                    <p className="text-[#1B3E72] text-sm font-medium leading-relaxed">
                      {(stream as { timing: string }).timing}
                    </p>
                  </div>
                )}
              </div>

              {/* Right: details */}
              <div className="lg:col-span-3 space-y-8">
                <p className="text-slate-600 leading-relaxed">
                  {stream.overview}
                </p>

                {/* Subjects */}
                <div>
                  <h3 className="font-bold text-[#1B3E72] mb-4 text-sm uppercase tracking-wider">
                    Subjects
                  </h3>
                  {stream.id === "law" ? (
                    /* Law: split into Grade XI and Grade XII columns */
                    (() => {
                      const common = stream.subjects.filter(
                        (s) =>
                          !s.name.includes("Gr. XI") &&
                          !s.name.includes("Gr. XII"),
                      );
                      const gradeXI = stream.subjects.filter((s) =>
                        s.name.includes("Gr. XI"),
                      );
                      const gradeXII = stream.subjects.filter((s) =>
                        s.name.includes("Gr. XII"),
                      );
                      const SubjectCard = ({
                        s,
                      }: {
                        s: { name: string; note: string };
                      }) => (
                        <div className="flex items-center justify-between gap-2 p-3 bg-white rounded-lg border border-[#e8e8e8]">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                              <IconCheck />
                            </span>
                            <span className="text-slate-700 text-sm font-medium">
                              {s.name
                                .replace(" (Gr. XI)", "")
                                .replace(" (Gr. XII)", "")}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-medium">
                            {s.note}
                          </span>
                        </div>
                      );
                      return (
                        <div className="space-y-4">
                          {/* Common subjects */}
                          {common.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {common.map((s) => (
                                <SubjectCard key={s.name} s={s} />
                              ))}
                            </div>
                          )}
                          {/* Grade XI & XII side by side */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 px-1">
                                Grade XI
                              </p>
                              <div className="space-y-2">
                                {gradeXI.map((s) => (
                                  <SubjectCard key={s.name} s={s} />
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 px-1">
                                Grade XII
                              </p>
                              <div className="space-y-2">
                                {gradeXII.map((s) => (
                                  <SubjectCard key={s.name} s={s} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {stream.subjects.map((s) => (
                        <div
                          key={s.name}
                          className="flex items-center justify-between gap-2 p-3 bg-white rounded-lg border border-[#e8e8e8]"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
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
                  )}
                </div>

                {/* Eligibility */}
                <div
                  className={`${stream.lightColor} border ${stream.borderColor} rounded-lg p-6`}
                >
                  <h3
                    className={`font-bold ${stream.accentColor} mb-3 text-sm uppercase tracking-wider`}
                  >
                    Eligibility Criteria
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-[#1B3E72]">
                      GPA {stream.eligibility.cgpa}
                    </span>
                    <span className="text-slate-500 text-sm">
                      minimum required
                    </span>
                  </div>
                </div>

                {/* Special Features */}
                <div>
                  <h3 className="font-bold text-[#1B3E72] mb-4 text-sm uppercase tracking-wider">
                    Special Features
                  </h3>
                  <ul className="space-y-2">
                    {stream.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-[#1B3E72]">
                          <IconStar />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Career paths */}
                <div>
                  <h3 className="font-bold text-[#1B3E72] mb-4 text-sm uppercase tracking-wider">
                    Career Pathways
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stream.careers.map((c) => (
                      <span
                        key={c}
                        className="px-3 py-1.5 bg-[#1B3E72] text-white text-xs font-semibold rounded-lg"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#1B3E72] font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm"
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
      <section className="py-24 bg-[#1B3E72]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Our Teaching Approach
              </h2>
              <div className="w-10 h-0.5 bg-amber-400 mt-3" />
            </div>
            <p className="text-slate-400 max-w-xs text-sm leading-relaxed md:text-right">
              KMC Lalitpur uses a blend of traditional rigour and modern
              pedagogy to ensure every student thrives
            </p>
          </div>
          {/* Asymmetric: first item full-width, rest in grid */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col sm:flex-row gap-6 hover:border-amber-400/30 transition-colors duration-200">
              <div className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center text-[#1B3E72] font-bold text-sm shrink-0">
                01
              </div>
              <div>
                <h3 className="font-bold text-white mb-2 text-base">
                  {teachingApproach[0].title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                  {teachingApproach[0].desc}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teachingApproach.slice(1).map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-400/30 hover:bg-white/8 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center text-[#1B3E72] font-bold text-sm mb-5 shrink-0">
                    {String(i + 2).padStart(2, "0")}
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
        </div>
      </section>

      {/* Faculty snapshot */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start mb-12">
            <div>
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-4xl font-bold text-[#1B3E72] leading-tight">
                Dedicated Faculty
              </h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed lg:pt-8">
              150+ qualified educators bringing expertise, passion, and
              dedication to every classroom
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e8e8e8] rounded-xl overflow-hidden">
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
                className="bg-[#f7f5f0] hover:bg-white p-8 transition-colors duration-200 group"
              >
                <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center text-[#1B3E72] mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1B3E72] mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/campus/faculty"
              className="inline-flex items-center gap-2 text-[#1B3E72] font-bold hover:text-amber-600 transition-colors group text-sm"
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
          <div className="mb-14">
            <h2 className="text-4xl font-bold text-[#1B3E72] leading-tight">
              Student Learning Outcomes
            </h2>
            <div className="w-10 h-0.5 bg-amber-400 mt-3" />
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
                className="flex gap-5 bg-white rounded-xl p-7 border border-[#e8e8e8] hover:border-amber-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1B3E72] flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-400 group-hover:text-[#1B3E72] transition-colors">
                  <span className="font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-[#1B3E72] mb-2">
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

      {/* Professional IT Courses */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Beyond the NEB Curriculum
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1B3E72] leading-tight">
                Professional
                <br />
                IT Courses
              </h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs md:text-right">
              Three globally certified courses alongside the NEB curriculum, in
              collaboration with{" "}
              <strong className="text-[#1B3E72]">NCC Education (UK)</strong> —
              regulated by Ofqual and recognized in 40+ countries.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Cyber Security & Ethical Hacking",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                topics: [
                  "Cryptography Fundamentals",
                  "Public-Key Infrastructure",
                  "Web & Email Security",
                  "Data Protection",
                  "Vulnerability Assessment",
                  "Authentication & Access Control",
                  "Firewalls, VPN & Remote Access",
                  "Wireless Security",
                ],
              },
              {
                title: "Artificial Intelligence",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                ),
                topics: [
                  "Problem Solving Using Search",
                  "Knowledge Representation & Fuzzy Logic",
                  "Machine Learning & Neural Networks",
                  "Decision Trees & Genetic Algorithms",
                  "Expert Systems & NLP",
                  "Intelligent Agents",
                ],
              },
              {
                title: "Data Science",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                ),
                topics: [
                  "Data Collection and Analysis",
                  "Algorithms & Data Representation",
                  "Manipulating & Structuring Data",
                  "Developing & Testing Program Code",
                  "Inferential Statistics & Data Visualization",
                  "Data Science Project Lifecycle",
                ],
              },
            ].map((course, i) => (
              <div
                key={i}
                className="bg-[#1B3E72] rounded-xl p-7 flex flex-col hover:shadow-2xl transition-shadow duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-5 shrink-0">
                  {course.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-4">
                  {course.title}
                </h3>
                <ul className="space-y-2 flex-1">
                  {course.topics.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2 text-xs text-[#8ba7c7]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-bold text-[#1B3E72] text-sm">
                NCC Education Certification
              </p>
              <p className="text-slate-600 text-xs leading-relaxed mt-1">
                Courses are certified by NCC Education UK, founded in 1976 and
                regulated by Ofqual. Internationally recognized in 40+ centers
                worldwide — giving KMC students a globally competitive edge.
              </p>
            </div>
            <div className="shrink-0 px-5 py-3 bg-[#1B3E72] text-amber-400 rounded-lg text-xs font-bold text-center">
              NCC Education
              <br />
              <span className="text-white font-normal">UK Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1B3E72] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-amber-400/10" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Choose Your Stream?
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Apply now for the 2083 academic year. View the full admission guide
            or contact our admissions team for personalised guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#1B3E72] font-bold rounded-lg hover:bg-amber-300 transition-colors"
            >
              View Admission Guide <IconArrow />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
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
