import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../components/schema";
import { SITE_CONFIG } from "../config/site";
import { IconArrow, IconChevronRight } from "../components/icons";

export const metadata: Metadata = {
  title: "Mock Entrance Exam Practice | KMC Lalitpur",
  description:
    "Practice your KMC entrance exam with official mock tests for Science, Management, and Law streams. Powered by Microsoft Forms — results shown instantly on completion.",
};

const streams = [
  {
    id: "science",
    name: "Science",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    badge: "bg-blue-100 text-blue-700",
    btnColor: "bg-[#0B1F3A] hover:bg-[#162d54]",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
    format: "Science 40 + Maths 40 + English 20",
    total: "100 marks",
    duration: "60 minutes",
    eligibility: "CGPA 2.85+ (B+ in Science/Maths/OptMaths/English)",
    formUrl: SITE_CONFIG.mockTestForms.science,
  },
  {
    id: "management",
    name: "Management",
    color: "bg-amber-50 border-amber-200 hover:border-amber-400",
    badge: "bg-amber-100 text-amber-700",
    btnColor: "bg-amber-500 hover:bg-amber-400",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    format: "English 45 + GK 15 + Maths 15",
    total: "75 marks",
    duration: "60 minutes",
    eligibility: "CGPA 2.05+ (C in Maths/English)",
    formUrl: SITE_CONFIG.mockTestForms.management,
  },
  {
    id: "law",
    name: "Law",
    color: "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
    badge: "bg-emerald-100 text-emerald-700",
    btnColor: "bg-emerald-700 hover:bg-emerald-600",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    format: "English 45 + GK 15 + Maths 15",
    total: "75 marks",
    duration: "60 minutes",
    eligibility: "CGPA 2.05+ (C in Maths/English)",
    formUrl: SITE_CONFIG.mockTestForms.law,
  },
];

export default function MockTest() {
  return (
    <main className="bg-white pt-25">
      <Header />

      <BreadcrumbSchema items={[{ name: "Mock Test", href: "/mock-test" }]} />
      <WebPageSchema
        title="Mock Entrance Exam Practice | KMC Lalitpur"
        description="Practice your KMC entrance exam with official mock tests for Science, Management, and Law streams."
        path="/mock-test"
      />

      {/* Hero */}
      <section className="relative pt-20 pb-20 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-400/8 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-400/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-10 text-sm text-[#8ba7c7]">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-medium">Mock Test</span>
          </nav>
          <div className="max-w-2xl">
            <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded">
              Exam Preparation
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Mock Entrance
              <br />
              <span className="text-amber-400">Exam Practice</span>
            </h1>
            <p className="text-lg text-[#8ba7c7] leading-relaxed">
              Practice your KMC entrance exam with our official mock tests, powered by Microsoft Forms.
              Select your stream to begin.
            </p>
          </div>
        </div>
      </section>

      {/* Stream Cards */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Choose Your Stream
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]">
              Select a Stream to Start
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {streams.map((stream) => (
              <div
                key={stream.id}
                className={`rounded-2xl border-2 p-8 flex flex-col transition-all duration-200 ${stream.color}`}
              >
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="text-[#0B1F3A]">{stream.icon}</div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${stream.badge}`}>
                    {stream.total}
                  </span>
                </div>

                {/* Stream name */}
                <h3 className="text-2xl font-bold text-[#0B1F3A] mb-2">{stream.name}</h3>
                <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-6">
                  +2 Stream
                </p>

                {/* Entrance format */}
                <div className="bg-white/70 rounded-xl p-4 mb-6 space-y-2">
                  <p className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1">
                    Entrance Format
                  </p>
                  <p className="text-sm font-semibold text-[#374151]">{stream.format}</p>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs text-[#6b7280] flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                      </svg>
                      {stream.duration}
                    </span>
                    <span className="text-xs text-[#6b7280]">·</span>
                    <span className="text-xs text-[#6b7280]">{stream.total}</span>
                  </div>
                </div>

                {/* Eligibility */}
                <p className="text-xs text-[#6b7280] leading-relaxed mb-8 flex-1">
                  <span className="font-semibold text-[#374151]">Eligibility: </span>
                  {stream.eligibility}
                </p>

                {/* CTA button */}
                {stream.formUrl ? (
                  <a
                    href={stream.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-bold text-sm transition-colors ${stream.btnColor}`}
                  >
                    Start Mock Test <IconArrow size={16} />
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#e8e6e0] text-[#9ca3af] font-bold text-sm cursor-not-allowed">
                    Coming Soon
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-center text-sm text-[#6b7280] mt-10">
            Results are shown immediately on completion. Your responses are saved automatically.
          </p>
        </div>
      </section>

      {/* Info strip */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Free to Use",
                desc: "All mock tests are completely free for KMC entrance aspirants.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },
              {
                title: "Instant Results",
                desc: "Get your score and correct answers immediately after submitting.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                ),
              },
              {
                title: "Official Format",
                desc: "Questions follow the actual KMC entrance exam pattern and marking scheme.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl border border-[#eae6de] bg-[#f7f5f0]">
                <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1F3A] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B1F3A]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Apply?
          </h2>
          <p className="text-[#8ba7c7] mb-8">
            After practising with mock tests, take the next step and apply for admission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://ktmmodelcollege.edu.np/apply-to-kmss/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors"
            >
              Apply for Admission <IconArrow size={16} />
            </a>
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              View Admission Guide
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
