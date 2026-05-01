"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconBook, IconUsers, IconMail, IconChevronRight } from "@/app/components/icons";

interface FacultyItem {
  id: string;
  name: string;
  slug: string;
  title: string;
  dept: string;
  qualification: string;
  experience: string;
  subjects: string | null;
  email: string | null;
  imageUrl: string | null;
}

interface Props {
  faculty: FacultyItem[];
  departments: string[];
  deptColors: Record<string, string>;
  hasSlug: boolean;
}

export function FacultyFilter({ faculty, departments, deptColors, hasSlug }: Props) {
  const [activeDept, setActiveDept] = useState("All");

  const filtered =
    activeDept === "All" ? faculty : faculty.filter((f) => f.dept === activeDept);

  return (
    <>
      {/* Filter bar */}
      <section className="py-6 bg-white border-b border-[#eae6de] sticky top-[64px] z-10">
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
            {filtered.map((member) => {
              const color = deptColors[member.dept] ?? "#374151";
              const initials = member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              const cardContent = (
                <>
                  {/* Avatar */}
                  {member.imageUrl ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-48 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)` }}
                    >
                      <span className="text-white text-5xl font-bold">{initials}</span>
                    </div>
                  )}

                  <div className="p-5">
                    <span
                      className="inline-block text-xs font-bold px-2 py-1 rounded-full text-white mb-3"
                      style={{ background: color }}
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
                    <div className="mt-4 pt-4 border-t border-[#eae6de] flex items-center justify-between">
                      {member.email ? (
                        /* Avoid nesting <a> inside <a> — show email as plain text when card is a link */
                        hasSlug && member.slug ? (
                          <span className="flex items-center gap-1.5 text-xs text-[#6b7280] truncate">
                            <IconMail size={12} />
                            {member.email}
                          </span>
                        ) : (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-1.5 text-xs text-[#6b7280] hover:text-amber-600 transition truncate"
                          >
                            <IconMail size={12} />
                            {member.email}
                          </a>
                        )
                      ) : (
                        <span />
                      )}
                      {hasSlug && member.slug && (
                        <span className="text-amber-500 group-hover:text-amber-600 transition shrink-0 ml-2">
                          <IconChevronRight size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                </>
              );

              if (hasSlug && member.slug) {
                return (
                  <Link
                    key={member.id}
                    href={`/campus/faculty/${member.slug}`}
                    className="bg-white rounded-2xl overflow-hidden border border-[#eae6de] hover:shadow-lg hover:border-amber-300 transition group block"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#eae6de] hover:shadow-lg hover:border-amber-300 transition group"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
