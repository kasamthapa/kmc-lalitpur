import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/app/lib/prisma";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { IconChevronRight, IconUsers, IconBook, IconMail, IconPhone } from "../../components/icons";
import { SITE_CONFIG } from "../../config/site";
import { FacultyFilter } from "./_components/FacultyFilter";

export const revalidate = 10;

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
    return rows;
  } catch {
    return [];
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
