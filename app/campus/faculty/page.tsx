import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/app/lib/prisma";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { IconChevronRight, IconUsers, IconBook, IconMail, IconPhone } from "../../components/icons";
import { SITE_CONFIG } from "../../config/site";
import { FacultyFilter } from "./_components/FacultyFilter";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Faculty & Staff",
  description:
    "Meet the dedicated educators at KMC Lalitpur — over 150 qualified professionals committed to your success.",
};

const deptColors: Record<string, string> = {
  Science: "#1a4a7a",
  Management: "#2d6a4f",
  Law: "#c75000",
  Administration: "#374151",
};

// Fallback hardcoded data used when DB has no faculty entries yet
const FALLBACK_FACULTY = [
  { id: "f1", name: "Dr. Rajendra Adhikari", slug: "", title: "Head of Science Department", dept: "Science", qualification: "PhD Physics, TU", experience: "18 years", subjects: "Physics, Mechanics", email: "r.adhikari@kmclalitpur.edu.np", imageUrl: null },
  { id: "f2", name: "Ms. Sita Karmacharya", slug: "", title: "Senior Lecturer", dept: "Science", qualification: "M.Sc Chemistry, TU", experience: "12 years", subjects: "Chemistry, Organic Chemistry", email: "s.karmacharya@kmclalitpur.edu.np", imageUrl: null },
  { id: "f3", name: "Mr. Binod Shrestha", slug: "", title: "Lecturer", dept: "Science", qualification: "M.Sc Biology, KU", experience: "9 years", subjects: "Biology, Botany", email: "b.shrestha@kmclalitpur.edu.np", imageUrl: null },
  { id: "f4", name: "Ms. Priya Manandhar", slug: "", title: "Lecturer", dept: "Science", qualification: "BE Computer Engineering, IOE", experience: "7 years", subjects: "Computer Science", email: "p.manandhar@kmclalitpur.edu.np", imageUrl: null },
  { id: "f5", name: "Mr. Ashok Tamrakar", slug: "", title: "Lab Instructor", dept: "Science", qualification: "B.Sc Physics, TU", experience: "10 years", subjects: "Physics Practical", email: "a.tamrakar@kmclalitpur.edu.np", imageUrl: null },
  { id: "f6", name: "Mr. Dipak Thapa", slug: "", title: "Head of Management", dept: "Management", qualification: "MBA Finance, PU", experience: "15 years", subjects: "Accountancy, Finance", email: "d.thapa@kmclalitpur.edu.np", imageUrl: null },
  { id: "f7", name: "Ms. Reena Shakya", slug: "", title: "Senior Lecturer", dept: "Management", qualification: "MBS Economics, TU", experience: "11 years", subjects: "Economics, Business Studies", email: "r.shakya@kmclalitpur.edu.np", imageUrl: null },
  { id: "f8", name: "Mr. Suresh Maharjan", slug: "", title: "Lecturer", dept: "Management", qualification: "MBS Marketing, TU", experience: "8 years", subjects: "Marketing", email: "s.maharjan@kmclalitpur.edu.np", imageUrl: null },
  { id: "f9", name: "Ms. Nirmala Basnet", slug: "", title: "Lecturer", dept: "Management", qualification: "BBA, KUSOM", experience: "6 years", subjects: "Business Maths", email: "n.basnet@kmclalitpur.edu.np", imageUrl: null },
  { id: "f10", name: "Adv. Sunita Rana", slug: "", title: "Head of Law", dept: "Law", qualification: "LLM Constitutional Law, TU", experience: "16 years", subjects: "Constitutional Law", email: "s.rana@kmclalitpur.edu.np", imageUrl: null },
  { id: "f11", name: "Adv. Bikash Giri", slug: "", title: "Lecturer", dept: "Law", qualification: "LLB, Kathmandu Law Campus", experience: "8 years", subjects: "Criminal Law", email: "b.giri@kmclalitpur.edu.np", imageUrl: null },
  { id: "f12", name: "Ms. Kamala Dhakal", slug: "", title: "Lecturer", dept: "Law", qualification: "LLB, TU", experience: "6 years", subjects: "Civil Law, Human Rights", email: "k.dhakal@kmclalitpur.edu.np", imageUrl: null },
  { id: "f13", name: "Mr. Narayan Shrestha", slug: "", title: "Principal", dept: "Administration", qualification: "M.Ed, TU", experience: "22 years", subjects: "School Administration", email: "principal@kmclalitpur.edu.np", imageUrl: null },
  { id: "f14", name: "Ms. Laxmi Pradhan", slug: "", title: "Vice Principal", dept: "Administration", qualification: "M.Ed, TU", experience: "18 years", subjects: "Academic Affairs", email: "vp@kmclalitpur.edu.np", imageUrl: null },
  { id: "f15", name: "Mr. Raju Chitrakar", slug: "", title: "Admissions Coordinator", dept: "Administration", qualification: "BBS, TU", experience: "10 years", subjects: "Admissions & Records", email: "admissions@kmclalitpur.edu.np", imageUrl: null },
  { id: "f16", name: "Ms. Sarita Tuladhar", slug: "", title: "Accounts Officer", dept: "Administration", qualification: "BBA Finance, PU", experience: "8 years", subjects: "Fee & Finance", email: "accounts@kmclalitpur.edu.np", imageUrl: null },
];

async function getFaculty() {
  try {
    const rows = await prisma.faculty.findMany({
      where: { active: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
      select: {
        id: true, name: true, slug: true, title: true, dept: true,
        qualification: true, experience: true, subjects: true,
        email: true, imageUrl: true,
      },
    });
    if (rows.length === 0) return FALLBACK_FACULTY;
    return rows;
  } catch {
    return FALLBACK_FACULTY;
  }
}

export default async function FacultyPage() {
  const faculty = await getFaculty();
  const hasSlug = faculty.some((f) => f.slug !== "");

  const departments = ["All", ...Array.from(new Set(faculty.map((f) => f.dept as string)))];

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#0B1F3A] text-white">
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
              Meet the dedicated educators who make KMC Lalitpur one of Nepal&apos;s finest institutions.
              Over 150 qualified professionals committed to your success.
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

      {/* Faculty grid — client component handles filter */}
      <FacultyFilter faculty={faculty} departments={departments} deptColors={deptColors} hasSlug={hasSlug} />

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
