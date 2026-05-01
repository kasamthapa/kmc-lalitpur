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
  { name: "Event Management Club", logo: "/images/catalyst/clubs/EMC.png" },
  {
    name: "Art & Culture Club",
    logo: "/images/catalyst/clubs/art-culture.png",
  },
  { name: "Dance Club", logo: "/images/catalyst/clubs/dance.png" },
  { name: "Eco Club", logo: "/images/catalyst/clubs/eco.png" },
  { name: "Legal Club", logo: "/images/catalyst/clubs/legal.png" },
  { name: "Literature Club", logo: "/images/catalyst/clubs/literature.png" },
  { name: "Maths Club", logo: "/images/catalyst/clubs/maths.png" },
  { name: "Music Club", logo: "/images/catalyst/clubs/music.png" },
  { name: "Outreach Team", logo: "/images/catalyst/clubs/outreachTeam.png" },
  {
    name: "Science & Technology Club",
    logo: "/images/catalyst/clubs/science-and-technology.png",
  },
  { name: "Social Club", logo: "/images/catalyst/clubs/social.png" },
  { name: "Sports Club", logo: "/images/catalyst/clubs/sports.png" },
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
      <section className="pt-28 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
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
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center p-3">
                <Image
                  src="/images/catalyst/logo.png"
                  alt="KMC Student Catalyst Committee Logo"
                  width={120}
                  height={120}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
                Student Leadership
              </p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                KMC Students
                <br />
                Catalyst Committee
              </h1>
              <p className="text-xl text-[#8ba7c7] leading-relaxed max-w-2xl">
                The student-led body that powers campus life at KMC — organizing
                events, leading clubs, and building community across all three
                streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
              Leadership
            </p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">
              Executives & Club Heads
            </h2>
            <p className="text-[#6b7280] mt-3 max-w-xl mx-auto">
              Meet the committee executives and club heads driving student life
              at KMC Lalitpur.
            </p>
          </div>
          <div className="bg-[#f7f5f0] rounded-3xl border border-[#eae6de] overflow-hidden">
            <Image
              src="/images/catalyst/members/members.png"
              alt="KMC Student Catalyst Committee — executives and club heads"
              width={1400}
              height={900}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Clubs */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
              Our Clubs
            </p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">
              12 Active Clubs
            </h2>
            <p className="text-[#6b7280] mt-3 max-w-xl mx-auto">
              Every student finds their passion — from science and law to music,
              dance, and community service.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {clubs.map((club) => (
              <div
                key={club.name}
                className="flex flex-col items-center gap-3 bg-white rounded-2xl p-5 border border-[#eae6de] hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <Image
                    src={club.logo}
                    alt={`${club.name} logo`}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-xs font-semibold text-[#0B1F3A] text-center leading-snug">
                  {club.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
