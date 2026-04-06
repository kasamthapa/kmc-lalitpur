"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../components/schema";
// ─── Icons ────────────────────────────────────────────────────────────────────
const IconCheck = () => (
  <svg
    width="14"
    height="14"
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
const IconChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconDoc = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const IconAward = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const IconCalendar = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconPhone = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.42 2 2 0 0 1 3.58 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconInfo = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const streams = {
  science: {
    label: "Science Stream",
    color: "bg-blue-950",
    steps: [
      {
        num: 1,
        title: "Fill Online Form",
        details:
          "Fill the online admission form available on our website after SEE results are announced. Attach a recent passport-size photo with white background.",
        requirements: [
          "Minimum CGPA 2.85 in SEE",
          "B+ grade in Science",
          "B+ grade in Mathematics",
          "B+ grade in Optional Mathematics",
          "B+ grade in English",
          "Must have passed Optional Mathematics",
        ],
        info: "Prospectus, fee structure, model questions, entrance center, symbol number, date and time will be sent to your registered email ID.",
      },
      {
        num: 2,
        title: "Appear for Entrance Exam",
        details:
          "KMC conducts a paper-based MCQ entrance exam. Model questions are provided via email before the exam date.",
        requirements: [
          "Science: 40 marks",
          "Mathematics: 40 marks",
          "English: 20 marks",
          "Total: 100 marks",
          "Answer sheets checked by computer",
          "Follow all invigilator instructions",
        ],
        info: "Results published within 2 days. Students are informed via email/SMS about direct admission or interview requirement.",
      },
      {
        num: 3,
        title: "Secure Your Admission",
        details:
          "Students on the direct admission list do not need an interview. Interview students must pass to proceed. Get admitted before the deadline.",
        requirements: [
          "Direct admission students skip interview",
          "Interview students must pass assessment",
          "Merit list published with more students than seats",
          "Scholarships available first-come-first-served",
          "Pay fees within deadline to confirm seat",
          "Accurate knowledge of fee structure required",
        ],
        info: "Scholarship quota is limited. Ensure you apply for scholarship before the quota is filled. Admission before seats are fulfilled is strongly recommended.",
      },
    ],
  },
  management: {
    label: "Management Stream",
    color: "bg-emerald-900",
    steps: [
      {
        num: 1,
        title: "Fill Online Form",
        details:
          "Fill the online admission form on our website after SEE results. Attach a recent passport-size photo with white background.",
        requirements: [
          "Minimum CGPA 2.05 in SEE",
          "C grade in Mathematics",
          "C grade in English",
          "Recent passport-size photo (white background)",
        ],
        info: "Prospectus, fee structure, model questions, entrance center, symbol number, date and time will be sent to your registered email ID.",
      },
      {
        num: 2,
        title: "Appear for Entrance Exam",
        details:
          "KMC conducts a physical and computer-based MCQ entrance exam. Model questions are sent to your email before the exam.",
        requirements: [
          "English: 45 marks",
          "General Knowledge: 15 marks",
          "Mathematics: 15 marks",
          "Total: 75 marks",
          "Computer-checked answers",
          "Follow all invigilator instructions",
        ],
        info: "Results published on the same day or informed during examination. Scholarship calculated on SEE (25%) + Entrance (75%).",
      },
      {
        num: 3,
        title: "Secure Your Admission",
        details:
          "Students on the merit list are informed to admit directly within the given deadline.",
        requirements: [
          "Direct admission for merit list students",
          "Deadline provided along with results",
          "Merit list has more entries than available seats",
          "Wide range of scholarships for deserving students",
          "First-come-first-served scholarship basis",
          "Get admission before scholarship quota fills",
        ],
        info: "KMC publishes higher numbers in the merit list than its intake capacity. Students should get admission before seats are fulfilled.",
      },
    ],
  },
  humanities: {
    label: "Humanities Stream",
    color: "bg-purple-900",
    steps: [
      {
        num: 1,
        title: "Fill Online Form",
        details:
          "Fill the online admission form on our website after SEE results. Attach a recent passport-size photo with white background.",
        requirements: [
          "Minimum CGPA 2.05 in SEE",
          "C grade in Mathematics",
          "C grade in English",
          "Recent passport-size photo (white background)",
        ],
        info: "Prospectus, fee structure, model questions, entrance center, symbol number, date and time will be sent to your registered email ID.",
      },
      {
        num: 2,
        title: "Appear for Entrance Exam",
        details:
          "KMC conducts a physical and computer-based MCQ entrance exam. Model questions are sent to your email before the exam.",
        requirements: [
          "English: 45 marks",
          "General Knowledge: 15 marks",
          "Mathematics: 15 marks",
          "Total: 75 marks",
          "Computer-checked answers",
          "Follow all invigilator instructions",
        ],
        info: "Results published on the same day. Scholarship calculated on SEE (25%) + Entrance (75%).",
      },
      {
        num: 3,
        title: "Secure Your Admission",
        details:
          "Students on the merit list are informed to admit directly within the given deadline.",
        requirements: [
          "Direct admission for merit list students",
          "Deadline provided along with results",
          "Merit list has more entries than available seats",
          "Wide range of scholarships for deserving students",
          "First-come-first-served scholarship basis",
          "Get admission before scholarship quota fills",
        ],
        info: "KMC publishes higher numbers in the merit list than its intake capacity. Students should get admission before seats are fulfilled.",
      },
    ],
  },
  law: {
    label: "Law Stream",
    color: "bg-amber-900",
    steps: [
      {
        num: 1,
        title: "Fill Online Form",
        details:
          "Fill the online admission form on our website after SEE results. Attach a recent passport-size photo with white background.",
        requirements: [
          "Minimum CGPA 2.05 in SEE",
          "C grade in Mathematics",
          "C grade in English",
          "Recent passport-size photo (white background)",
        ],
        info: "Prospectus, fee structure, model questions, entrance center, symbol number, date and time will be sent to your registered email ID.",
      },
      {
        num: 2,
        title: "Appear for Entrance Exam",
        details:
          "KMC conducts a physical and computer-based MCQ entrance exam. Model questions are sent to your email before the exam.",
        requirements: [
          "English: 45 marks",
          "General Knowledge: 15 marks",
          "Mathematics: 15 marks",
          "Total: 75 marks",
          "Computer-checked answers",
          "Follow all invigilator instructions",
        ],
        info: "Results published on the same day. Scholarship calculated on SEE (25%) + Entrance (75%).",
      },
      {
        num: 3,
        title: "Secure Your Admission",
        details:
          "Students on the merit list are informed to admit directly within the given deadline.",
        requirements: [
          "Direct admission for merit list students",
          "Deadline provided along with results",
          "Merit list has more entries than available seats",
          "Wide range of scholarships for deserving students",
          "First-come-first-served scholarship basis",
          "Get admission before scholarship quota fills",
        ],
        info: "KMC publishes higher numbers in the merit list than its intake capacity. Students should get admission before seats are fulfilled.",
      },
    ],
  },
};

const scholarships = [
  {
    title: "Merit Scholarship",
    badge: "All Streams",
    badgeColor: "bg-amber-100 text-amber-700",
    desc: "Awarded based on cumulative marks: SEE results (25%) + KMC Entrance Exam (75%). Higher the combined score, higher the scholarship percentage.",
    details: [
      "Valid for first 3 months (until First Term Exam)",
      "Renewed or revised based on terminal exam performance",
      "First-come-first-served — limited quota",
      "Admission required before quota is filled",
    ],
  },
  {
    title: "Sushil Memorial Scholarship",
    badge: "Special",
    badgeColor: "bg-blue-100 text-blue-700",
    desc: "Established in memory of Late Sushil Sahani. Awarded to the top performers from the first entrance examination.",
    details: [
      "Top 2 students from first entrance exam",
      "1 top student from Madhesi community",
      "Awarded at time of admission",
      "Based purely on entrance merit",
    ],
  },
  {
    title: "Government School Scholarship",
    badge: "Special Entrance",
    badgeColor: "bg-green-100 text-green-700",
    desc: "Separate entrance examination conducted for students from government/public schools who apply for special scholarship consideration.",
    details: [
      "Separate entrance test for govt. school students",
      "Limited scholarship seats available",
      "Merit-based selection",
      "Encourages students from public schools",
    ],
  },
  {
    title: "Need-Based Financial Aid",
    badge: "Need Based",
    badgeColor: "bg-purple-100 text-purple-700",
    desc: "Financial assistance available for students from economically disadvantaged backgrounds who demonstrate academic potential.",
    details: [
      "Income certificate required",
      "Academic performance considered",
      "Counselled by administration",
      "Subject to availability",
    ],
  },
];

const documents = [
  "Completed online admission form",
  "SEE mark sheet / Grade sheet (original + photocopy)",
  "Character certificate from previous school",
  "Migration certificate (if applicable)",
  "Passport-size photographs — 4 copies (white background)",
  "Citizenship certificate of parent/guardian",
  "Birth certificate of the student",
  "Residence proof / Municipality letter",
];

const timeline = [
  {
    period: "April – May",
    event: "SEE Results Published",
    desc: "Online admission forms open on our website after SEE results are announced.",
  },
  {
    period: "May – June",
    event: "Entrance Examinations",
    desc: "Stream-specific entrance exams held. Symbol number and exam center sent via email.",
  },
  {
    period: "June",
    event: "Results & Merit List",
    desc: "Merit list published. Direct admission or interview schedule communicated.",
  },
  {
    period: "June – July",
    event: "Interviews (if required)",
    desc: "Interview rounds for students not in direct admission category.",
  },
  {
    period: "July",
    event: "Admission & Fee Payment",
    desc: "Confirm seat by paying fees within deadline. Scholarship applied at this stage.",
  },
  {
    period: "August",
    event: "Classes Commence",
    desc: "Orientation and commencement of the new academic year 2082/83.",
  },
];

const streamKeys = ["science", "management", "humanities", "law"] as const;
type StreamKey = (typeof streamKeys)[number];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Admissions() {
  const [activeStream, setActiveStream] = useState<StreamKey>("science");
  const currentGuide = streams[activeStream];

  return (
    <main className="bg-white pt-[100px]">
      <Header />
      <BreadcrumbSchema items={[{ name: "Admissions", href: "/admissions" }]} />
      <WebPageSchema
        title="Admissions | KMC Lalitpur"
        description="How to apply to KMC Lalitpur — entrance exam details, eligibility criteria, scholarship information, required documents and admission timeline for 2082/83."
        path="/admissions"
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
            <span className="text-amber-400 font-medium">Admissions</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded">
                2082/83 Academic Year
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
                Join Our
                <br />
                <span className="text-amber-400">Community</span>
              </h1>
              <p className="text-lg text-[#8ba7c7] leading-relaxed mb-8">
                Begin your journey of academic excellence at Kathmandu Model
                Secondary School, Lalitpur. Admissions are open — limited seats
                available across all four streams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://ktmmodelcollege.edu.np/apply-to-kmss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
                >
                  Apply Online Now
                  <IconArrow />
                </a>
                <a
                  href="https://wa.me/9779851138595?text=I+want+to+know+about+admissions+at+KMC+Lalitpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  n: "4",
                  label: "Academic Streams",
                  sub: "Science, Management, Humanities, Law",
                },
                {
                  n: "100%",
                  label: "NEB Pass Rate",
                  sub: "Consistently every year",
                },
                {
                  n: "10,000+",
                  label: "Annual Applicants",
                  sub: "Seats are limited — apply early",
                },
                {
                  n: "Free",
                  label: "Scholarship Available",
                  sub: "Merit & need based",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <p className="text-2xl font-bold text-amber-400 leading-none">
                    {s.n}
                  </p>
                  <p className="text-white font-semibold text-sm mt-1">
                    {s.label}
                  </p>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Process Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              How to Apply
            </span>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">
              Admission in 3 Simple Steps
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              A straightforward process designed to help you secure your place
              at KMC Lalitpur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-amber-200 z-0" />

            {[
              {
                step: "01",
                title: "Fill Online Form",
                desc: "Complete the admission form on our website after SEE results. Attach your photo and submit.",
              },
              {
                step: "02",
                title: "Entrance Exam",
                desc: "Appear for the MCQ-based entrance exam in your chosen stream. Model questions sent via email.",
              },
              {
                step: "03",
                title: "Get Admitted",
                desc: "Check merit list, complete interview if required, pay fees and secure your seat before the deadline.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative z-10 bg-white border border-[#e8e8e8] rounded-2xl p-8 text-center hover:shadow-lg hover:border-amber-300 transition-all"
              >
                <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-400/30">
                  <span className="text-[#0B1F3A] font-bold text-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-[#0B1F3A] mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Admission Guide */}
      <section id="guide" className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Step by Step
            </span>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">
              Detailed Admission Guide
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Select your stream to view the specific admission requirements and
              process
            </p>
          </div>

          {/* Stream tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {streamKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveStream(key)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  activeStream === key
                    ? "bg-amber-400 text-[#0B1F3A] shadow-lg shadow-amber-400/30"
                    : "bg-white text-[#374151] border border-[#e8e8e8] hover:border-amber-300 hover:text-[#0B1F3A]"
                }`}
              >
                {streams[key].label}
              </button>
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {currentGuide.steps.map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#e8e8e8] overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6 p-8">
                  <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center text-[#0B1F3A] font-bold text-xl flex-shrink-0 shadow-md">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                      {step.details}
                    </p>

                    <div className="mb-5">
                      <h4 className="font-bold text-[#0B1F3A] mb-3 text-sm uppercase tracking-wider">
                        Requirements & Details
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {step.requirements.map((req, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#0B1F3A]">
                              <IconCheck />
                            </span>
                            <span className="text-slate-600 text-sm">
                              {req}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {step.info && (
                      <div className="flex items-start gap-3 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                        <span className="text-amber-600 flex-shrink-0 mt-0.5">
                          <IconInfo />
                        </span>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {step.info}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://ktmmodelcollege.edu.np/apply-to-kmss/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              Apply Online for {currentGuide.label}
              <IconArrow />
            </a>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section id="scholarships" className="py-24 bg-[#0B1F3A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/30 px-3 py-1.5 rounded">
              Financial Aid
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">
              Scholarships & Financial Aid
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              KMC Lalitpur believes every deserving student should have access
              to quality education. We offer multiple scholarship options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {scholarships.map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-amber-400/30 hover:bg-white/8 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-400 flex items-center justify-center text-[#0B1F3A] flex-shrink-0">
                    <IconAward />
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${s.badgeColor}`}
                  >
                    {s.badge}
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <ul className="space-y-2">
                  {s.details.map((d, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <span className="w-4 h-4 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-amber-400">
                        <IconCheck />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Scholarship note */}
          <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-6 flex items-start gap-4">
            <span className="text-amber-400 flex-shrink-0 mt-0.5">
              <IconInfo />
            </span>
            <div>
              <p className="font-bold text-amber-400 mb-2">
                Important Scholarship Note
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Scholarship quota is limited and awarded on a first-come,
                first-served basis. Scholarships at admission are valid for the
                first 3 months (until First Term Exam). Renewal or revision of
                scholarships will be based on your terminal exam performance
                thereafter. Get admitted early to secure your scholarship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Key Dates
            </span>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">
              Admission Timeline
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Approximate schedule for the 2082/83 academic year admission
              process
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-amber-200" />
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 text-[#0B1F3A] shadow-md z-10 group-hover:scale-110 transition-transform">
                      <IconCalendar />
                    </div>
                    <div className="flex-1 bg-[#f7f5f0] rounded-2xl p-5 border border-[#e8e8e8] hover:border-amber-300 hover:shadow-sm transition-all">
                      <span className="text-amber-600 font-bold text-xs tracking-wider uppercase">
                        {item.period}
                      </span>
                      <h3 className="font-bold text-[#0B1F3A] mt-1 mb-1">
                        {item.event}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Requirements
            </span>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">
              Eligibility & Documents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Documents */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e8e8e8]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A]">
                  <IconDoc />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A]">
                  Required Documents
                </h3>
              </div>
              <ul className="space-y-3">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#0B1F3A]">
                      <IconCheck />
                    </span>
                    <span className="text-slate-600 text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* General Eligibility */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e8e8e8]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A]">
                  <IconAward />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A]">
                  Stream Eligibility
                </h3>
              </div>
              <div className="space-y-5">
                {[
                  {
                    stream: "Science",
                    cgpa: "CGPA 2.85+",
                    req: "B+ in Science, Maths, Optional Maths & English",
                    color: "bg-blue-50 border-blue-200",
                  },
                  {
                    stream: "Management",
                    cgpa: "CGPA 2.05+",
                    req: "C grade in Mathematics & English",
                    color: "bg-emerald-50 border-emerald-200",
                  },
                  {
                    stream: "Humanities",
                    cgpa: "CGPA 2.05+",
                    req: "C grade in Mathematics & English",
                    color: "bg-purple-50 border-purple-200",
                  },
                  {
                    stream: "Law",
                    cgpa: "CGPA 2.05+",
                    req: "C grade in Mathematics & English",
                    color: "bg-amber-50 border-amber-200",
                  },
                ].map((s, i) => (
                  <div key={i} className={`${s.color} border rounded-xl p-4`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#0B1F3A] text-sm">
                        {s.stream} Stream
                      </span>
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        {s.cgpa}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs">{s.req}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA cards */}
      <section className="py-24 bg-[#0B1F3A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-amber-400/30 hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A] mx-auto mb-5">
                <IconCalendar />
              </div>
              <h3 className="font-bold text-white mb-3">Campus Tour</h3>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                Schedule a personalised campus visit to explore our facilities
                and meet our faculty.
              </p>
              <a
                href="https://wa.me/9779851138595?text=I+would+like+to+schedule+a+campus+visit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors"
              >
                Book a Visit <IconChevronRight />
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-amber-400/30 hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A] mx-auto mb-5">
                <IconDoc />
              </div>
              <h3 className="font-bold text-white mb-3">Application Support</h3>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                Get personalised help with your application form, documents, and
                eligibility questions.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors"
              >
                Get Support <IconChevronRight />
              </Link>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-amber-400/30 hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A] mx-auto mb-5">
                <IconPhone />
              </div>
              <h3 className="font-bold text-white mb-3">Call Admissions</h3>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                Speak directly with our admissions team during office hours for
                immediate assistance.
              </p>
              <a
                href="tel:+97715918595"
                className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors"
              >
                +977-1-5918595 <IconChevronRight />
              </a>
            </div>
          </div>

          {/* FAQ link */}
          <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white mb-1">Have more questions?</p>
              <p className="text-slate-400 text-sm">
                Browse our frequently asked questions for quick answers about
                admission, scholarships, fees, and campus life.
              </p>
            </div>
            <Link
              href="/faq"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm"
            >
              View FAQ <IconArrow />
            </Link>
          </div>

          <div className="text-center mt-14">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Apply?
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              Don&apos;t wait — seats are limited and scholarships are
              first-come-first-served. Apply online today for the 2082/83
              academic year.
            </p>
            <a
              href="https://ktmmodelcollege.edu.np/apply-to-kmss/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              Apply Online Now
              <IconArrow />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
