import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/app/lib/prisma";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { IconChevronRight, IconBook, IconUsers, IconMail } from "@/app/components/icons";

function ColorIcon({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: `${color}22`, color }}
    >
      {children}
    </div>
  );
}

export const dynamicParams = true;
export const revalidate = 60;

const deptColors: Record<string, string> = {
  Science: "#1a4a7a",
  Management: "#2d6a4f",
  Law: "#c75000",
  Administration: "#374151",
};

export async function generateStaticParams() {
  const faculty = await prisma.faculty.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return faculty.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = await prisma.faculty.findUnique({ where: { slug } });
  if (!member) return { title: "Faculty Member Not Found" };

  return {
    title: `${member.name} — ${member.title}`,
    description:
      member.bio ??
      `${member.name} is a ${member.title} in the ${member.dept} department at KMC Lalitpur with ${member.experience} of experience.`,
  };
}

export default async function FacultyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await prisma.faculty.findUnique({ where: { slug } });

  if (!member || !member.active) notFound();

  // Smart parsing — handles newline, bullet, dash, or comma-separated entries
  const achievements = member.achievements
    ? (() => {
        const raw = member.achievements;
        // Try newlines first
        const byLine = raw.split(/\r?\n/).map((a) => a.replace(/^[\s•\-\*]+/, "").trim()).filter(Boolean);
        if (byLine.length > 1) return byLine;
        // Fall back to comma/semicolon separation
        return raw.split(/[,;]/).map((a) => a.replace(/^[\s•\-\*]+/, "").trim()).filter(Boolean);
      })()
    : [];

  // Smart bio formatting — normalize whitespace, preserve paragraphs
  const bioParas = member.bio
    ? member.bio.split(/\n{2,}/).map((p) => p.replace(/\n/g, " ").trim()).filter(Boolean)
    : [];

  const subjects = member.subjects
    ? member.subjects.split(/[,،]/).map((s) => s.trim()).filter(Boolean)
    : [];

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const deptColor = deptColors[member.dept] ?? "#374151";

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#101F46] text-white">
        <div className="max-w-5xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm flex-wrap">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <Link href="/campus" className="hover:text-amber-400 transition">Campus</Link>
            <IconChevronRight size={14} />
            <Link href="/campus/faculty" className="hover:text-amber-400 transition">Faculty</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">{member.name}</span>
          </div>

          {/* Profile header */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar / Photo */}
            <div className="shrink-0">
              {member.imageUrl ? (
                <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-white/20">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-36 h-36 rounded-2xl flex items-center justify-center text-white text-4xl font-bold border-2 border-white/20"
                  style={{ background: `linear-gradient(135deg, ${deptColor}, ${deptColor}aa)` }}
                >
                  {initials}
                </div>
              )}
            </div>

            <div>
              <span
                className="text-xs font-bold tracking-[0.15em] uppercase mb-4 inline-block"
                style={{ color: deptColor }}
              >
                {member.dept}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-1">{member.name}</h1>
              <p className="text-[#8ba7c7] text-lg">{member.title}</p>

              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 mt-3 text-sm text-amber-400 hover:text-amber-300 transition"
                >
                  <IconMail size={14} />
                  {member.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Bio + Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            {bioParas.length > 0 && (
              <div className="pb-8 border-b border-[#e8e4dc]">
                <h2
                  className="text-[#101F46] font-bold text-xs tracking-[0.15em] uppercase mb-5 border-b-2 pb-2"
                  style={{ borderColor: deptColor }}
                >
                  About
                </h2>
                <div className="space-y-3">
                  {bioParas.map((para, i) => (
                    <p key={i} className="text-[#374151] leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <div className="pb-8 border-b border-[#e8e4dc]">
                <h2
                  className="text-[#101F46] font-bold text-xs tracking-[0.15em] uppercase mb-5 border-b-2 pb-2"
                  style={{ borderColor: deptColor }}
                >
                  Achievements &amp; Highlights
                </h2>
                <ul className="space-y-3">
                  {achievements.map((a, i) => (
                    <li
                      key={i}
                      className="border-l-2 pl-4 py-1"
                      style={{ borderColor: deptColor }}
                    >
                      <span className="text-[#374151] text-sm leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Empty state if no bio or achievements */}
            {bioParas.length === 0 && achievements.length === 0 && (
              <div className="pb-8 border-b border-[#e8e4dc] text-center text-[#6b7280] py-10">
                <p>Profile details coming soon.</p>
              </div>
            )}

            <Link href="/campus/faculty" className="inline-flex items-center gap-2 text-sm font-bold text-[#101F46] hover:text-amber-600 transition-colors mt-4">
              ← All Faculty
            </Link>
          </div>

          {/* Right: Quick info */}
          <div>
            <div className="divide-y divide-[#e8e4dc]">
              <div className="py-4 flex flex-col gap-1">
                <p className="text-xs text-[#6b7280] font-medium uppercase tracking-[0.1em]">Qualification</p>
                <div className="flex items-start gap-3 mt-1">
                  <ColorIcon color={deptColor}>
                    <IconBook size={15} />
                  </ColorIcon>
                  <p className="text-sm text-[#101F46] font-semibold self-center">{member.qualification}</p>
                </div>
              </div>

              <div className="py-4 flex flex-col gap-1">
                <p className="text-xs text-[#6b7280] font-medium uppercase tracking-[0.1em]">Experience</p>
                <div className="flex items-start gap-3 mt-1">
                  <ColorIcon color={deptColor}>
                    <IconUsers size={15} />
                  </ColorIcon>
                  <p className="text-sm text-[#101F46] font-semibold self-center">{member.experience}</p>
                </div>
              </div>

              {subjects.length > 0 && (
                <div className="py-4 flex flex-col gap-1">
                  <p className="text-xs text-[#6b7280] font-medium uppercase tracking-[0.1em] mb-2">Subjects</p>
                  <div className="flex flex-wrap gap-1.5">
                    {subjects.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full text-white font-medium"
                        style={{ background: deptColor }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
