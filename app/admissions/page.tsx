"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../components/schema";
import {
  IconCheck,
  IconArrow,
  IconChevronRight,
  IconDoc,
  IconAward,
  IconCalendar,
  IconPhone,
  IconInfo,
} from "../components/icons";
import { SITE_CONFIG } from "../config/site";

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
          "Minimum GPA 2.0 in SEE",
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
          "Mathematics: 35 marks",
          "Science: 35 marks",
          "English, Nepali & GK: 30 marks",
          "Total: 100 marks — 60 minutes",
          "Answer sheets checked by computer",
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
          "Minimum C+ grade in SEE",
          "C+ grade in Mathematics",
          "C+ grade in English",
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
          "Mathematics: 35 marks",
          "English: 35 marks",
          "Nepali & General Knowledge: 30 marks",
          "Total: 100 marks — 60 minutes",
          "Computer-checked answers",
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
          "Minimum C+ grade in SEE",
          "C+ grade in Mathematics",
          "C+ grade in English",
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
          "English: 30 marks",
          "Nepali: 30 marks",
          "Social Studies & General Knowledge: 40 marks",
          "Total: 100 marks — 60 minutes",
          "Computer-checked answers",
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
    step: "Step 1",
    event: "SEE Results Published",
    desc: "Online admission forms open on our website after SEE results are announced.",
  },
  {
    step: "Step 2",
    event: "Entrance Examinations",
    desc: "Stream-specific entrance exams held. Symbol number and exam center sent via email.",
  },
  {
    step: "Step 3",
    event: "Results & Merit List",
    desc: "Merit list published. Direct admission or interview schedule communicated.",
  },
  {
    step: "Step 4",
    event: "Interviews (if required)",
    desc: "Interview rounds for students not in direct admission category.",
  },
  {
    step: "Step 5",
    event: "Admission & Fee Payment",
    desc: "Confirm seat by paying fees within deadline. Scholarship applied at this stage.",
  },
  {
    step: "Step 6",
    event: "Classes Commence",
    desc: "Orientation and commencement of the new academic year.",
  },
];

const streamKeys = ["science", "management", "law"] as const;
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
        description="How to apply to KMC Lalitpur — entrance exam details, eligibility criteria, scholarship information, required documents and admission timeline for 2083."
        path="/admissions"
      />

      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-[#0B1F3A] overflow-hidden">
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
              <p className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                2083 Academic Year
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
                Join Our
                <br />
                <span className="text-amber-400">Community</span>
              </h1>
              <p className="text-lg text-[#8ba7c7] leading-relaxed mb-8">
                Begin your journey of academic excellence at Kathmandu Model
                Secondary School, Lalitpur. Admissions are open — limited seats
                available across all three streams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://app.kmclalitpur.edu.np/applicant/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
                >
                  Apply Online Now
                  <IconArrow />
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=I+want+to+know+about+admissions+at+KMC+Lalitpur`}
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
                  n: "3",
                  label: "Academic Streams",
                  sub: "Science, Management, Law",
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
                  className="bg-white/5 border border-white/10 rounded-lg p-5"
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

      {/* ── Entrance Exam CTA Banner ─────────────────────────────────────── */}
      <section className="bg-amber-400 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-3xl hidden sm:block">🎓</span>
            <div>
              <p className="text-[#0B1F3A] font-bold text-lg leading-tight">
                2083 Entrance Examinations — Now Open
              </p>
              <p className="text-[#0B1F3A]/70 text-sm mt-0.5">
                Apply online for Science, Management, or Law stream. Limited seats available.
              </p>
            </div>
          </div>
          <a
            href="https://app.kmclalitpur.edu.np/applicant/login"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-[#0B1F3A] text-white font-bold rounded-xl hover:bg-[#162e57] transition-colors whitespace-nowrap"
          >
            Apply for Entrance
            <IconArrow size={16} />
          </a>
        </div>
      </section>

      {/* ── Model Question Papers ─────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-[#eae6de]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-600 mb-1">Entrance Preparation</p>
              <h2 className="text-xl font-bold text-[#0B1F3A]">Model Question Papers 2083</h2>
            </div>
            <p className="text-sm text-[#6b7280] max-w-sm">
              Download the official KMC model question papers to prepare for your stream's entrance examination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {/* Management */}
            <a
              href="/downloads/model-questions-management-2083.pdf"
              download
              className="group flex items-center gap-4 p-5 border-2 border-[#eae6de] hover:border-amber-400 hover:bg-amber-50 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-amber-400 flex items-center justify-center shrink-0 text-[#0B1F3A] group-hover:bg-amber-300 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#0B1F3A] text-sm leading-tight">Management Stream</p>
                <p className="text-xs text-[#6b7280] mt-0.5">Model Questions 2083 · PDF · 474 KB</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:stroke-amber-600 transition-colors" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>

            {/* Law */}
            <a
              href="/downloads/model-questions-law-2083.pdf"
              download
              className="group flex items-center gap-4 p-5 border-2 border-[#eae6de] hover:border-amber-400 hover:bg-amber-50 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-[#0B1F3A] flex items-center justify-center shrink-0 text-amber-400 group-hover:bg-[#162e57] transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#0B1F3A] text-sm leading-tight">Law Stream</p>
                <p className="text-xs text-[#6b7280] mt-0.5">Model Questions 2083 · PDF · 432 KB</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:stroke-amber-600 transition-colors" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Process Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <div>
              <div className="w-6 h-px bg-amber-500 mb-3" />
              <h2 className="text-4xl font-bold text-[#0B1F3A]">
                Admission in 3 Steps
              </h2>
            </div>
            <p className="text-slate-500 max-w-xs text-sm leading-relaxed md:text-right">
              A straightforward process designed to help you secure your place at KMC Lalitpur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
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
                className={`relative p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ${i < 2 ? "md:border-r border-[#eae6de]" : ""}`}
              >
                <p className="text-[7rem] font-bold text-[#0B1F3A]/[0.05] leading-none select-none absolute top-4 right-6">
                  {item.step}
                </p>
                <p className="text-amber-500 font-bold text-xs tracking-widest uppercase mb-3">
                  Step {item.step}
                </p>
                <h3 className="font-bold text-[#0B1F3A] text-xl mb-3 relative">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed relative">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-[#eae6de] mt-0" />
        </div>
      </section>

      {/* Detailed Admission Guide */}
      <section id="guide" className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-2">
              Detailed Admission Guide
            </h2>
            <div className="w-10 h-0.5 bg-amber-400 mt-3 mb-6" />
            <p className="text-slate-500 max-w-xl text-sm">
              Select your stream to view the specific admission requirements and process
            </p>
          </div>

          {/* Stream tabs */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-[#e0dcd4]">
            {streamKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveStream(key)}
                className={`px-5 py-2.5 font-bold text-sm transition-all duration-200 border-b-2 -mb-px ${
                  activeStream === key
                    ? "border-amber-400 text-[#0B1F3A]"
                    : "border-transparent text-slate-400 hover:text-[#0B1F3A]"
                }`}
              >
                {streams[key].label}
              </button>
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-px">
            {currentGuide.steps.map((step, i) => (
              <div
                key={i}
                className="bg-white border border-[#e8e8e8] overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-8 p-8">
                  <div className="shrink-0 pt-1">
                    <p className="text-5xl font-bold text-[#0B1F3A]/10 leading-none select-none">
                      {step.num}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                      {step.details}
                    </p>

                    <div className="mb-5">
                      <p className="font-bold text-[#0B1F3A] mb-3 text-xs uppercase tracking-wider">
                        Requirements & Details
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {step.requirements.map((req, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                            <span className="text-slate-600 text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {step.info && (
                      <div className="flex items-start gap-3 border-l-4 border-amber-400 pl-4 py-1">
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {step.info}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="https://app.kmclalitpur.edu.np/applicant/login"
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
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Scholarships & Financial Aid
              </h2>
              <div className="w-10 h-0.5 bg-amber-400 mt-3" />
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed md:text-right">
              All Grade XI scholarships are based on Cumulative Marks = SEE (25%) + KMC Entrance (75%)
            </p>
          </div>

          {/* Grade XI Merit Scholarship Table */}
          <div className="mb-8">
            <p className="text-white/60 font-semibold text-xs mb-4 uppercase tracking-wider">
              Grade XI — Admission Scholarship (Science, Management & Law)
            </p>
            <div className="overflow-x-auto border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/10 text-amber-400 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">S.N.</th>
                    <th className="px-4 py-3 text-left">Cumulative Marks</th>
                    <th className="px-4 py-3 text-center">Annual Fee</th>
                    <th className="px-4 py-3 text-center">Tuition Fee</th>
                    <th className="px-4 py-3 text-center">Quota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { sn: 1, marks: "85 & Above", annual: "100%", tuition: "100%", quota: 25 },
                    { sn: 2, marks: "80 – 84", annual: "75%", tuition: "75%", quota: 25 },
                    { sn: 3, marks: "75 – 79", annual: "50%", tuition: "50%", quota: 25 },
                    { sn: 4, marks: "70 – 74", annual: "50%", tuition: "25%", quota: 25 },
                    { sn: 5, marks: "65 – 69", annual: "25%", tuition: "25%", quota: 25 },
                    { sn: 6, marks: "60 – 64", annual: "25%", tuition: "—", quota: 25 },
                  ].map((r) => (
                    <tr key={r.sn} className="bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <td className="px-4 py-3 text-slate-400 text-xs">{r.sn}</td>
                      <td className="px-4 py-3 text-white font-medium">{r.marks}</td>
                      <td className="px-4 py-3 text-center text-amber-400 font-bold">{r.annual}</td>
                      <td className="px-4 py-3 text-center text-amber-300 font-semibold">{r.tuition}</td>
                      <td className="px-4 py-3 text-center text-slate-400 text-xs">{r.quota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-500 text-xs mt-2 italic">
              Valid for first 3 months (until First Term Exam). First-come, first-served. Limited quota.
            </p>
          </div>

          {/* Grade XII / Terminal Exam Scholarship */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Grade XII based on Grade XI GPA */}
            <div>
              <p className="text-white/60 font-semibold text-xs mb-4 uppercase tracking-wider">
                Grade XII — Based on Grade XI GPA
              </p>
              <div className="overflow-x-auto border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/10 text-amber-400 text-xs uppercase tracking-wider">
                      <th className="px-4 py-3 text-left">Final GPA</th>
                      <th className="px-4 py-3 text-center">Scholarship</th>
                      <th className="px-4 py-3 text-center">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { gpa: "3.91 & Above", schol: "100%", dur: "3 months" },
                      { gpa: "3.86 – 3.90", schol: "75%", dur: "3 months" },
                      { gpa: "3.81 – 3.85", schol: "50%", dur: "3 months" },
                      { gpa: "3.71 – 3.80", schol: "25%", dur: "3 months" },
                      { gpa: "3.61 – 3.70", schol: "10%", dur: "3 months" },
                    ].map((r) => (
                      <tr key={r.gpa} className="bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                        <td className="px-4 py-3 text-white font-medium text-xs">{r.gpa}</td>
                        <td className="px-4 py-3 text-center text-amber-400 font-bold">{r.schol} on Tuition</td>
                        <td className="px-4 py-3 text-center text-slate-400 text-xs">{r.dur}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Terminal Exam Performance */}
            <div>
              <p className="text-white/60 font-semibold text-xs mb-4 uppercase tracking-wider">
                Terminal Exam Performance
              </p>
              <div className="overflow-x-auto border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/10 text-amber-400 text-xs uppercase tracking-wider">
                      <th className="px-4 py-3 text-left">Marks in Terminal</th>
                      <th className="px-4 py-3 text-center">Scholarship</th>
                      <th className="px-4 py-3 text-center">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { marks: "Topper / 85%+", schol: "100%", dur: "3 months" },
                      { marks: "80% and above", schol: "75%", dur: "3 months" },
                      { marks: "75% and above", schol: "50%", dur: "3 months" },
                      { marks: "70% and above", schol: "25%", dur: "3 months" },
                      { marks: "65% and above", schol: "10%", dur: "3 months" },
                    ].map((r) => (
                      <tr key={r.marks} className="bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                        <td className="px-4 py-3 text-white font-medium text-xs">{r.marks}</td>
                        <td className="px-4 py-3 text-center text-amber-400 font-bold">{r.schol} on Tuition</td>
                        <td className="px-4 py-3 text-center text-slate-400 text-xs">{r.dur}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Special Scholarships — left-border treatment */}
          <div className="space-y-4 mb-8">
            {[
              {
                title: "Sushil Memorial Scholarship",
                badge: "Special",
                desc: "Awarded to the top 2 students from the first entrance examination + 1 top student from the Madhesi community.",
                details: ["Top 2 from first entrance exam", "1 Madhesi community student", "Based on entrance merit"],
              },
              {
                title: "Government School Scholarship",
                badge: "Special Entrance",
                desc: "Separate entrance examination for students from government/public schools, conducted in collaboration with local government.",
                details: ["Separate entrance test", "Limited scholarship seats", "Merit-based selection"],
              },
              {
                title: "Need-Based Financial Aid",
                badge: "Need Based",
                desc: "Financial assistance for students from economically disadvantaged backgrounds who demonstrate academic potential.",
                details: ["Income certificate required", "Academic performance considered", "Contact administration"],
              },
            ].map((s, i) => (
              <div
                key={i}
                className="border-l-4 border-amber-400 pl-6 py-4 hover:border-amber-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-bold text-white text-sm">{s.title}</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-400/15 text-amber-400 border border-amber-400/20 shrink-0">
                    {s.badge}
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">{s.desc}</p>
                <div className="flex flex-wrap gap-4">
                  {s.details.map((d) => (
                    <span key={d} className="text-xs text-slate-300 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />{d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Scholarship note */}
          <div className="border-l-4 border-amber-400 pl-6 py-4">
            <p className="font-bold text-amber-400 mb-2 text-sm">Important Scholarship Note</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Scholarship quota is limited and awarded on a first-come,
              first-served basis. Scholarships at admission are valid for the
              first 3 months (until First Term Exam). Renewal or revision of
              scholarships will be based on your terminal exam performance
              thereafter. Get admitted early to secure your scholarship.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <div>
              <div className="w-6 h-px bg-amber-500 mb-3" />
              <h2 className="text-4xl font-bold text-[#0B1F3A]">
                Admission Timeline
              </h2>
            </div>
            <p className="text-slate-500 max-w-xs text-sm leading-relaxed md:text-right">
              Approximate schedule for the 2083 academic year
            </p>
          </div>

          <div className="max-w-3xl">
            <div className="relative">
              <div className="absolute left-0 top-3 bottom-3 w-px bg-[#eae6de]" />
              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-8 group pl-8 relative">
                    <div className="absolute left-0 top-4 w-px h-full bg-[#eae6de]" />
                    <div className="absolute left-[-4px] top-4 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-white group-hover:scale-125 transition-transform z-10" />
                    <div className="flex-1 pb-8">
                      <p className="text-amber-600 font-bold text-xs tracking-wider uppercase mb-0.5">
                        {item.step}
                      </p>
                      <h3 className="font-bold text-[#0B1F3A] mb-1">
                        {item.event}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
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
          <div className="mb-14">
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-2">
              Eligibility & Documents
            </h2>
            <div className="w-10 h-0.5 bg-amber-400 mt-3 mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Documents */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-[#0B1F3A]">
                  <IconDoc size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A]">
                  Required Documents
                </h3>
              </div>
              <ul className="space-y-3">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 pb-3 border-b border-[#eae6de] last:border-0">
                    <span className="text-amber-500 font-bold text-xs shrink-0 mt-0.5 w-5 text-right">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-slate-600 text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* General Eligibility */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-[#0B1F3A]">
                  <IconAward size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A]">
                  Stream Eligibility
                </h3>
              </div>
              <div className="space-y-0">
                {[
                  {
                    stream: "Science",
                    cgpa: "GPA 2.0+",
                    req: "B+ in Science, Maths, Optional Maths & English",
                    color: "bg-blue-50 border-blue-200",
                  },
                  {
                    stream: "Management",
                    cgpa: "GPA 2.0+",
                    req: "C grade in Mathematics & English",
                    color: "bg-emerald-50 border-emerald-200",
                  },
                  {
                    stream: "Law",
                    cgpa: "GPA 2.0+",
                    req: "C grade in Mathematics & English",
                    color: "bg-amber-50 border-amber-200",
                  },
                ].map((s, i) => (
                  <div key={i} className="border-l-4 border-amber-400 pl-4 py-4 mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#0B1F3A] text-sm">
                        {s.stream} Stream
                      </span>
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        {s.cgpa}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs">{s.req}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10 mb-14">
            <div className="p-8 hover:bg-white/[0.03] transition-colors">
              <div className="mb-5 text-amber-400">
                <IconCalendar size={22} />
              </div>
              <h3 className="font-bold text-white mb-3">Campus Tour</h3>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                Schedule a personalised campus visit to explore our facilities
                and meet our faculty.
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=I+would+like+to+schedule+a+campus+visit`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors"
              >
                Book a Visit <IconChevronRight />
              </a>
            </div>

            <div className="p-8 hover:bg-white/[0.03] transition-colors">
              <div className="mb-5 text-amber-400">
                <IconDoc size={22} />
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

            <div className="p-8 hover:bg-white/[0.03] transition-colors">
              <div className="mb-5 text-amber-400">
                <IconPhone size={20} />
              </div>
              <h3 className="font-bold text-white mb-3">Call Admissions</h3>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                Speak directly with our admissions team during office hours for
                immediate assistance.
              </p>
              <a
                href="tel:+97715201331"
                className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors"
              >
                +977-1-5201331 <IconChevronRight />
              </a>
            </div>
          </div>

          {/* FAQ link */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10 pt-10 mb-14">
            <div>
              <p className="font-bold text-white mb-1">Have more questions?</p>
              <p className="text-slate-400 text-sm">
                Browse our frequently asked questions for quick answers about
                admission, scholarships, fees, and campus life.
              </p>
            </div>
            <Link
              href="/faq"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm"
            >
              View FAQ <IconArrow />
            </Link>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Apply?
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              Don&apos;t wait — seats are limited and scholarships are
              first-come-first-served. Apply online today for the 2083
              academic year.
            </p>
            <a
              href="https://app.kmclalitpur.edu.np/applicant/login"
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
