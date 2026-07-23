import Link from "next/link";
import Image from "next/image";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../../components/schema";
import { IconChevronRight } from "../../components/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KMC Students Catalyst Committee",
  description:
    "Meet the KMC Lalitpur Students Catalyst Committee — the student-led body driving clubs, events, and campus life across Science, Management, and Law streams.",
};

const clubs = [
  { name: "Event Management Club", folder: "EMC" },
  { name: "Art & Culture Club", folder: "ArtCulture" },
  { name: "Dance Club", folder: "dance" },
  { name: "Eco Club", folder: "eco" },
  { name: "Legal Club", folder: "Legal" },
  { name: "Literature Club", folder: "literature" },
  { name: "Maths Club", folder: "maths" },
  { name: "Music Club", folder: "music" },
  { name: "Outreach Team", folder: "outreachTeam" },
  { name: "Science & Technology Club", folder: "scienceAndTechnology" },
  { name: "Social Club", folder: "Social" },
  { name: "Sports Club", folder: "Sports" },
];

export default function CatalystPage() {
  return (
    <main className="bg-white">
      <BreadcrumbSchema
        items={[
          { name: "Campus", href: "/campus" },
          { name: "Student Committee", href: "/campus/student-committee" },
        ]}
      />
      <WebPageSchema
        title="KMC Students Catalyst Committee — KMC Lalitpur"
        description="The student-led Catalyst Committee and its clubs at KMC Lalitpur."
        path="/campus/student-committee"
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-[#101F46] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-10 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <IconChevronRight size={14} />
            <span className="hover:text-amber-400 transition">Campus</span>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">
              Student Committee
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10">
            {/* Logo — editorial treatment */}
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/15 flex items-center justify-center p-2.5">
                <Image
                  src="/images/catalyst/logo.png"
                  alt="KMC Student Catalyst Committee Logo"
                  width={120}
                  height={120}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            <div className="max-w-2xl">
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight leading-none">
                KMC Students<br />
                Catalyst Committee
              </h1>
              <p className="text-lg text-[#8ba7c7] leading-relaxed">
                The student-led body that powers campus life at KMC — organizing
                events, leading clubs, and building community across all three
                streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Members — full-width editorial */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-3xl font-bold text-[#101F46]">
                Executives &amp; Club Heads
              </h2>
            </div>
            <p className="text-[#6b7280] text-sm max-w-sm leading-relaxed md:text-right">
              Meet the committee executives and club heads driving student life
              at KMC Lalitpur.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#eae6de]">
            <Image
              src="/images/catalyst/members/Executives&Heads.png"
              alt="KMC Student Catalyst Committee — executives and club heads"
              width={1400}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Clubs */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section header — editorial split */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-3xl font-bold text-[#101F46]">
                12 Active Clubs
              </h2>
              <div className="w-10 h-0.5 bg-amber-400 mt-3" />
            </div>
            <p className="text-[#6b7280] text-sm max-w-sm leading-relaxed md:text-right">
              Every student finds their passion — from science and law to music,
              dance, and community service.
            </p>
          </div>

          {/* Club grid — varied layout: first two clubs span taller */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, idx) => (
              <div
                key={club.name}
                className="group bg-white rounded-xl border border-[#eae6de] overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              >
                {/* Members photo */}
                <div className={`relative w-full bg-[#101F46] overflow-hidden ${idx < 2 ? "aspect-[4/3]" : "aspect-video"}`}>
                  <Image
                    src={`/images/catalyst/clubs/${club.folder}/members.png`}
                    alt={`${club.name} members`}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101F46]/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>

                {/* Logo + name */}
                <div className="flex items-center gap-4 px-5 py-4 border-t border-[#eae6de]">
                  <div className="w-10 h-10 shrink-0 bg-[#f7f5f0] rounded-lg p-1.5 border border-[#eae6de] flex items-center justify-center">
                    <Image
                      src={`/images/catalyst/clubs/${club.folder}/logo.png`}
                      alt={`${club.name} logo`}
                      width={36}
                      height={36}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <span className="font-bold text-[#101F46] text-sm leading-snug group-hover:text-amber-600 transition">
                    {club.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
