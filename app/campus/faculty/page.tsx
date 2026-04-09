"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { IconChevronRight, IconUsers, IconBook, IconMail, IconPhone } from "../../components/icons";
import { SITE_CONFIG } from "../../config/site";

const departments = ["All", "Science", "Management", "Law", "Administration"];

const faculty = [
  // Science
  { name: "Dr. Rajendra Adhikari", title: "Head of Science Department", dept: "Science", qualification: "PhD Physics, TU", experience: "18 years", subjects: "Physics, Mechanics", email: "r.adhikari@kmclalitpur.edu.np" },
  { name: "Ms. Sita Karmacharya", title: "Senior Lecturer", dept: "Science", qualification: "M.Sc Chemistry, TU", experience: "12 years", subjects: "Chemistry, Organic Chemistry", email: "s.karmacharya@kmclalitpur.edu.np" },
  { name: "Mr. Binod Shrestha", title: "Lecturer", dept: "Science", qualification: "M.Sc Biology, KU", experience: "9 years", subjects: "Biology, Botany", email: "b.shrestha@kmclalitpur.edu.np" },
  { name: "Ms. Priya Manandhar", title: "Lecturer", dept: "Science", qualification: "BE Computer Engineering, IOE", experience: "7 years", subjects: "Computer Science, Programming", email: "p.manandhar@kmclalitpur.edu.np" },
  { name: "Mr. Ashok Tamrakar", title: "Lab Instructor", dept: "Science", qualification: "B.Sc Physics, TU", experience: "10 years", subjects: "Physics Practical, Lab", email: "a.tamrakar@kmclalitpur.edu.np" },

  // Management
  { name: "Mr. Dipak Thapa", title: "Head of Management", dept: "Management", qualification: "MBA Finance, PU", experience: "15 years", subjects: "Accountancy, Finance", email: "d.thapa@kmclalitpur.edu.np" },
  { name: "Ms. Reena Shakya", title: "Senior Lecturer", dept: "Management", qualification: "MBS Economics, TU", experience: "11 years", subjects: "Economics, Business Studies", email: "r.shakya@kmclalitpur.edu.np" },
  { name: "Mr. Suresh Maharjan", title: "Lecturer", dept: "Management", qualification: "MBS Marketing, TU", experience: "8 years", subjects: "Marketing, Entrepreneurship", email: "s.maharjan@kmclalitpur.edu.np" },
  { name: "Ms. Nirmala Basnet", title: "Lecturer", dept: "Management", qualification: "BBA, KUSOM", experience: "6 years", subjects: "Business Maths, Statistics", email: "n.basnet@kmclalitpur.edu.np" },

  // Law
  { name: "Adv. Sunita Rana", title: "Head of Law", dept: "Law", qualification: "LLM Constitutional Law, TU", experience: "16 years", subjects: "Constitutional Law, Legal Studies", email: "s.rana@kmclalitpur.edu.np" },
  { name: "Adv. Bikash Giri", title: "Lecturer", dept: "Law", qualification: "LLB, Kathmandu Law Campus", experience: "8 years", subjects: "Criminal Law, Jurisprudence", email: "b.giri@kmclalitpur.edu.np" },
  { name: "Ms. Kamala Dhakal", title: "Lecturer", dept: "Law", qualification: "LLB, TU", experience: "6 years", subjects: "Civil Law, Human Rights", email: "k.dhakal@kmclalitpur.edu.np" },

  // Administration
  { name: "Mr. Narayan Shrestha", title: "Principal", dept: "Administration", qualification: "M.Ed, TU", experience: "22 years", subjects: "School Administration", email: "principal@kmclalitpur.edu.np" },
  { name: "Ms. Laxmi Pradhan", title: "Vice Principal", dept: "Administration", qualification: "M.Ed, TU", experience: "18 years", subjects: "Academic Affairs", email: "vp@kmclalitpur.edu.np" },
  { name: "Mr. Raju Chitrakar", title: "Admissions Coordinator", dept: "Administration", qualification: "BBS, TU", experience: "10 years", subjects: "Admissions & Records", email: "admissions@kmclalitpur.edu.np" },
  { name: "Ms. Sarita Tuladhar", title: "Accounts Officer", dept: "Administration", qualification: "BBA Finance, PU", experience: "8 years", subjects: "Fee & Finance", email: "accounts@kmclalitpur.edu.np" },
];

const deptColors: Record<string, string> = {
  Science: "#1a4a7a",
  Management: "#2d6a4f",
  Law: "#c75000",
  Administration: "#374151",
};

const deptInitials: Record<string, string> = {
  Science: "Sc",
  Management: "Mg",
  Law: "Lw",
  Administration: "Ad",
};

export default function FacultyPage() {
  const [activeDept, setActiveDept] = useState("All");

  const filtered =
    activeDept === "All" ? faculty : faculty.filter((f) => f.dept === activeDept);

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <Link href="/campus" className="hover:text-amber-400 transition">Campus</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Faculty</span>
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">Our Team</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Faculty & Staff</h1>
            <p className="text-xl text-[#8ba7c7] leading-relaxed">
              Meet the dedicated educators who make KMC Lalitpur one of Nepal&apos;s finest institutions. Over 150 qualified professionals committed to your success.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: "Total Faculty", value: "150+" },
              { label: "PhD Holders", value: "12+" },
              { label: "Avg. Experience", value: "11 yrs" },
              { label: "Departments", value: "5" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-amber-400">{s.value}</div>
                <div className="text-[#8ba7c7] text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-white border-b border-[#eae6de] sticky top-[100px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  activeDept === dept
                    ? "bg-[#0B1F3A] text-white shadow"
                    : "bg-[#f7f5f0] text-[#374151] hover:bg-[#eae6de]"
                }`}
              >
                {dept}
                {dept !== "All" && (
                  <span className="ml-2 opacity-60">
                    ({faculty.filter((f) => f.dept === dept).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl overflow-hidden border border-[#eae6de] hover:shadow-lg hover:border-amber-300 transition group"
              >
                {/* Avatar */}
                <div
                  className="h-32 flex items-center justify-center text-white text-3xl font-bold"
                  style={{ background: `linear-gradient(135deg, ${deptColors[member.dept]}, ${deptColors[member.dept]}aa)` }}
                >
                  {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>

                <div className="p-5">
                  <span
                    className="inline-block text-xs font-bold px-2 py-1 rounded-full text-white mb-3"
                    style={{ background: deptColors[member.dept] }}
                  >
                    {member.dept}
                  </span>
                  <h3 className="font-bold text-[#0B1F3A] text-base leading-snug mb-1 group-hover:text-amber-600 transition">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#6b7280] mb-2">{member.title}</p>
                  <div className="space-y-1 text-xs text-[#374151]">
                    <div className="flex items-start gap-2">
                      <IconBook size={12} className="mt-0.5 shrink-0 text-amber-500" />
                      <span>{member.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconUsers size={12} className="shrink-0 text-amber-500" />
                      <span>{member.experience} experience</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#eae6de]">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-1.5 text-xs text-[#6b7280] hover:text-amber-600 transition truncate"
                    >
                      <IconMail size={12} />
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-[#8ba7c7] text-lg mb-10">
            We are always looking for passionate, qualified educators to join the KMC family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition"
            >
              <IconMail size={18} />
              Send Your CV
            </a>
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              <IconPhone size={18} />
              {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
