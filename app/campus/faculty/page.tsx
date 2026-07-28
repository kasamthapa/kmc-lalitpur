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

  const departments = ["All", ...Array.from(new Set(faculty.map((f) => f.dept).filter((d): d is string => Boolean(d))))];

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-[#101F46] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-10 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <Link href="/campus" className="hover:text-amber-400 transition">Campus</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Faculty</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-2xl">
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none mb-5">
                Faculty &amp; Staff
              </h1>
              <p className="text-lg text-[#8ba7c7] leading-relaxed">
                Meet the dedicated educators who make KMC Lalitpur one of Nepal&apos;s finest institutions.
                Over 150 qualified professionals committed to your success.
              </p>
            </div>

            <div className="flex gap-10 lg:gap-12 shrink-0">
              {[
                { label: "Total Faculty", value: "150+" },
                { label: "PhD Holders", value: "12+" },
                { label: "Avg. Experience", value: "11 yrs" },
                { label: "Departments", value: "5" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-amber-400 tabular-nums">{s.value}</div>
                  <div className="text-[#8ba7c7] text-xs mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Faculty grid — client component handles filter */}
      <FacultyFilter faculty={faculty} departments={departments} deptColors={deptColors} hasSlug={hasSlug} />

      {/* Join Team CTA */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 border-t border-[#eae6de] pt-16">
            <div className="max-w-xl">
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#101F46] mb-3">Join Our Team</h2>
              <p className="text-[#6b7280] text-lg leading-relaxed">
                We are always looking for passionate, qualified educators to join the KMC family.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#101F46] text-white font-semibold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                <IconMail size={17} />
                Send Your CV
              </a>
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#d1cdc5] text-[#101F46] font-semibold rounded-xl hover:border-amber-400 transition-all duration-200"
              >
                <IconPhone size={17} />
                {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
