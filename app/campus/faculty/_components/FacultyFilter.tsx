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
      <section className="py-5 bg-white border-b border-[#eae6de] sticky top-[64px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs uppercase tracking-widest text-[#9ca3af] font-semibold mr-2 hidden sm:block">Filter</span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-4 py-1.5 text-sm font-semibold transition-all duration-150 border ${
                  activeDept === dept
                    ? "bg-[#101F46] text-white border-[#101F46]"
                    : "bg-transparent text-[#374151] border-[#d1cdc5] hover:border-[#101F46] hover:text-[#101F46]"
                } rounded-lg`}
              >
                {dept}
                {dept !== "All" && (
                  <span className="ml-1.5 opacity-50 font-normal text-xs">
                    {faculty.filter((f) => f.dept === dept).length}
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
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <h3 className="text-xl font-bold text-[#101F46] mb-2">Faculty profiles coming soon</h3>
              <p className="text-[#6b7280]">We&apos;re updating our faculty directory. Check back soon.</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
                    <div className="relative h-52 overflow-hidden bg-[#e8e4dc]">
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
                      className="h-52 flex items-center justify-center"
                      style={{ background: `linear-gradient(150deg, ${color}dd, ${color}88)` }}
                    >
                      <span className="text-white text-5xl font-bold tracking-tight">{initials}</span>
                    </div>
                  )}

                  <div className="p-5">
                    {/* Department label */}
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                      style={{ color }}
                    >
                      {member.dept}
                    </p>
                    <h3 className="font-bold text-[#101F46] text-base leading-snug mb-0.5 group-hover:text-amber-600 transition">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[#6b7280] mb-4">{member.title}</p>

                    <div className="space-y-1.5 text-xs text-[#374151]">
                      <div className="flex items-start gap-2">
                        <IconBook size={11} className="mt-0.5 shrink-0 text-amber-500" />
                        <span className="leading-relaxed">{member.qualification}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconUsers size={11} className="shrink-0 text-amber-500" />
                        <span>{member.experience} experience</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#eae6de] flex items-center justify-between">
                      {member.email ? (
                        hasSlug && member.slug ? (
                          <span className="flex items-center gap-1.5 text-xs text-[#9ca3af] truncate">
                            <IconMail size={11} />
                            {member.email}
                          </span>
                        ) : (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-1.5 text-xs text-[#6b7280] hover:text-amber-600 transition truncate"
                          >
                            <IconMail size={11} />
                            {member.email}
                          </a>
                        )
                      ) : (
                        <span />
                      )}
                      {hasSlug && member.slug && (
                        <span className="text-[#9ca3af] group-hover:text-amber-500 transition shrink-0 ml-2">
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
                    className="bg-white rounded-xl overflow-hidden border border-[#eae6de] hover:-translate-y-1 hover:shadow-xl transition-all duration-200 group block"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={member.id}
                  className="bg-white rounded-xl overflow-hidden border border-[#eae6de] hover:-translate-y-1 hover:shadow-xl transition-all duration-200 group"
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
