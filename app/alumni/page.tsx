import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import {
  IconChevronRight,
  IconUsers,
  IconGlobe,
  IconAward,
  IconMail,
} from "../components/icons";
import { SITE_CONFIG } from "../config/site";
import { prisma } from "../lib/prisma";
import type { Metadata } from "next";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Alumni Network",
  description:
    "Meet the KMC Lalitpur Alumni Association and our growing network of graduates making their mark across Nepal and the world.",
};

const stats = [
  { label: "Graduates", value: "2,000+", icon: IconUsers },
  { label: "Years of Excellence", value: "25+", icon: IconAward },
  { label: "Countries Represented", value: "20+", icon: IconGlobe },
];

// ── KMC Alumni Association members ────────────────────────────────────────────
const ASSOCIATION_MEMBERS = [
  { name: "Aadip Raut",           role: "President",       college: "Himalayan College of Engineering",                    image: "/images/alumni-association/aadip-raut.png" },
  { name: "Himal Bista",          role: "Vice President",  college: "Kathmandu School of Law",                            image: "/images/alumni-association/himal-bista.png" },
  { name: "Meriyan Karki",        role: "Vice President",  college: "Himalayan College of Engineering",                    image: "/images/alumni-association/meriyan-karki.png" },
  { name: "Sunita Khadka",        role: "Secretary",       college: "Khwopa College of Law",                              image: "/images/alumni-association/sunita-khadka.png" },
  { name: "Minendra Yadav",       role: "Joint Secretary", college: "Kathmandu School of Law",                            image: "/images/alumni-association/minendra-yadav.png" },
  { name: "Saurav Shah",          role: "Treasurer",       college: "Model Institute of Technology (MIT)",                 image: "/images/alumni-association/saurav-shah.png" },
  { name: "Suchana K.C.",         role: "Board Member",    college: "Techspire College",                                  image: "/images/alumni-association/suchana-kc.png" },
  { name: "Sujata Bhattarai",     role: "Board Member",    college: "Kathmandu Model College",                            image: "/images/alumni-association/sujata-bhattarai.png" },
  { name: "Reeju Koirala",        role: "Board Member",    college: "Nepal Academy of Tourism, Hotel & Mountaineering",   image: "/images/alumni-association/reeju-koirala.png" },
  { name: "Dayal Sharan Satsangi",role: "Board Member",    college: "Kathmandu Medical College & Teaching Hospital",      image: "/images/alumni-association/dayal-satsangi.png" },
  { name: "Sweekriti Sharma",     role: "Board Member",    college: "Kathmandu University School of Law",                 image: "/images/alumni-association/sweekriti-sharma.png" },
];

const programColors: Record<string, string> = {
  Science: "#1a4a7a",
  Management: "#2d6a4f",
  Law: "#c75000",
};

async function getApprovedAlumni() {
  try {
    return await prisma.alumni.findMany({
      where: { approved: true },
      orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function AlumniPage() {
  const successAlumni = await getApprovedAlumni();

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Alumni</span>
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
              Our Community
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Alumni Network
            </h1>
            <p className="text-xl text-[#8ba7c7] leading-relaxed">
              Thousands of KMC graduates are making their mark across Nepal and the world. Meet the KMC Alumni Association of Lalitpur — the official body connecting our community of graduates.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center p-8 rounded-2xl border border-[#eae6de] hover:border-amber-400 transition group">
                <div className="w-14 h-14 rounded-full bg-amber-400/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/20 transition">
                  <Icon size={26} className="text-amber-500" />
                </div>
                <div className="text-4xl font-bold text-[#0B1F3A] mb-2">{value}</div>
                <div className="text-[#6b7280] font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KMC Alumni Association of Lalitpur ─────────────────────────────── */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
              Official Body
            </p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">
              KMC Alumni Association of Lalitpur
            </h2>
            <p className="text-[#6b7280] mt-4 max-w-2xl mx-auto">
              The official alumni association of Kathmandu Model Secondary School, Lalitpur — connecting graduates, supporting current students, and upholding the KMC legacy.
            </p>
          </div>

          {/* Group Photo */}
          <div className="rounded-3xl overflow-hidden border border-[#eae6de] shadow-lg mb-14">
            <Image
              src="/images/alumni-association/group.png"
              alt="KMC Alumni Association of Lalitpur — Group Photo"
              width={1400}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Members grid */}
          {ASSOCIATION_MEMBERS.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {ASSOCIATION_MEMBERS.map((m, i) => {
                const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <div key={i} className="text-center group">
                    <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-[#eae6de] group-hover:border-amber-400 transition mb-3">
                      {m.image ? (
                        <Image
                          src={m.image}
                          alt={m.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#0B1F3A] flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">{initials}</span>
                        </div>
                      )}
                    </div>
                    <p className="font-bold text-[#0B1F3A] text-sm leading-snug">{m.name}</p>
                    <p className="text-xs text-amber-600 font-semibold mt-0.5">{m.role}</p>
                    <p className="text-xs text-[#6b7280] mt-1 leading-tight">{m.college}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-[#6b7280]">
              <p className="text-sm">Member profiles coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Success Stories — dynamic from DB, only shown when alumni exist */}
      {successAlumni.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
                Inspiring Stories
              </p>
              <h2 className="text-4xl font-bold text-[#0B1F3A]">Alumni Success Stories</h2>
              <p className="text-[#6b7280] mt-4 max-w-2xl mx-auto">
                Our graduates are making their mark across Nepal and beyond — in technology, medicine, law, business, and more.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {successAlumni.map((alumni) => {
                const color = programColors[alumni.program] ?? "#374151";
                const initials = alumni.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <div key={alumni.id} className="bg-white rounded-2xl border border-[#eae6de] overflow-hidden hover:border-amber-400 hover:shadow-lg transition-all group">
                    {/* Photo or color bar */}
                    {alumni.imageUrl ? (
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={alumni.imageUrl}
                          alt={alumni.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span
                          className="absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                          style={{ background: color }}
                        >
                          {alumni.program}
                        </span>
                        {alumni.featured && (
                          <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400 text-[#0B1F3A]">
                            Featured
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="h-2 w-full" style={{ background: color }} />
                    )}

                    <div className="p-5">
                      {!alumni.imageUrl && (
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                            style={{ background: color }}
                          >
                            {initials}
                          </div>
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                            style={{ background: color }}
                          >
                            {alumni.program}
                          </span>
                          {alumni.featured && (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400 text-[#0B1F3A]">
                              Featured
                            </span>
                          )}
                        </div>
                      )}

                      <h3 className="font-bold text-[#0B1F3A] text-lg leading-snug">{alumni.name}</h3>

                      {(alumni.currentRole || alumni.company) && (
                        <p className="text-sm text-amber-600 font-semibold mt-1">
                          {[alumni.currentRole, alumni.company].filter(Boolean).join(" · ")}
                        </p>
                      )}

                      {alumni.location && (
                        <p className="text-xs text-[#6b7280] mt-0.5">{alumni.location}</p>
                      )}

                      <p className="text-xs text-[#9ca3af] mt-1">Batch: {alumni.gradYear}</p>

                      {alumni.bio && (
                        <p className="text-sm text-[#374151] mt-3 leading-relaxed line-clamp-3">
                          {alumni.bio}
                        </p>
                      )}

                      {alumni.linkedIn && (
                        <a
                          href={alumni.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-[#0B1F3A] hover:text-amber-600 transition"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Stay Connected CTA */}
      <section className="py-16 bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-[#8ba7c7] mb-8">Follow us on social media and be part of every milestone.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SITE_CONFIG.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition flex items-center gap-2"
            >
              <IconMail size={18} />
              Facebook Community
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition flex items-center gap-2"
            >
              Contact School
              <IconChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
