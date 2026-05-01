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

  const achievements = member.achievements
    ? member.achievements.split("\n").map((a) => a.trim()).filter(Boolean)
    : [];

  const subjects = member.subjects
    ? member.subjects.split(",").map((s) => s.trim()).filter(Boolean)
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
      <section className="pt-24 pb-12 bg-[#0B1F3A] text-white">
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
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-white/20">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-28 h-28 rounded-2xl flex items-center justify-center text-white text-4xl font-bold border-2 border-white/20"
                  style={{ background: `linear-gradient(135deg, ${deptColor}, ${deptColor}aa)` }}
                >
                  {initials}
                </div>
              )}
            </div>

            <div>
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-3"
                style={{ background: deptColor }}
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
      <section className="py-14 bg-[#f7f5f0]">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Bio + Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            {member.bio && (
              <div className="bg-white rounded-2xl p-7 border border-[#eae6de]">
                <h2 className="text-[#0B1F3A] font-bold text-xl mb-4">About</h2>
                <p className="text-[#374151] leading-relaxed whitespace-pre-wrap">{member.bio}</p>
              </div>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <div className="bg-white rounded-2xl p-7 border border-[#eae6de]">
                <h2 className="text-[#0B1F3A] font-bold text-xl mb-5">
                  Achievements & Highlights
                </h2>
                <ul className="space-y-3">
                  {achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
                        style={{ background: deptColor }}
                      >
                        ✓
                      </span>
                      <span className="text-[#374151] text-sm leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Empty state if no bio or achievements */}
            {!member.bio && achievements.length === 0 && (
              <div className="bg-white rounded-2xl p-7 border border-[#eae6de] text-center text-[#6b7280]">
                <p>Profile details coming soon.</p>
              </div>
            )}
          </div>

          {/* Right: Quick info card */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 border border-[#eae6de]">
              <h3 className="text-[#0B1F3A] font-bold text-sm uppercase tracking-wider mb-4">
                Profile
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ColorIcon color={deptColor}>
                    <IconBook size={15} />
                  </ColorIcon>
                  <div>
                    <p className="text-xs text-[#6b7280] font-medium">Qualification</p>
                    <p className="text-sm text-[#0B1F3A] font-semibold mt-0.5">{member.qualification}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ColorIcon color={deptColor}>
                    <IconUsers size={15} />
                  </ColorIcon>
                  <div>
                    <p className="text-xs text-[#6b7280] font-medium">Experience</p>
                    <p className="text-sm text-[#0B1F3A] font-semibold mt-0.5">{member.experience}</p>
                  </div>
                </div>

                {subjects.length > 0 && (
                  <div>
                    <p className="text-xs text-[#6b7280] font-medium mb-2">Subjects</p>
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

            <Link
              href="/campus/faculty"
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#0B1F3A]/20 text-[#0B1F3A] font-bold text-sm rounded-xl hover:bg-[#0B1F3A] hover:text-white hover:border-[#0B1F3A] transition-all"
            >
              ← Back to All Faculty
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
