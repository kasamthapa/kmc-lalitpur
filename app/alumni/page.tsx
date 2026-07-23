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
      <section className="pt-28 pb-20 bg-[#1B3E72] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-12 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span className="text-[#8ba7c7]/40 mx-1">/</span>
            <span className="text-white/60">Alumni</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
                Alumni<br />
                <span className="text-amber-400">Network</span>
              </h1>
              <p className="text-lg text-[#8ba7c7] leading-relaxed">
                Thousands of KMC graduates are making their mark across Nepal and the world.
              </p>
            </div>

            {/* Editorial stats — big numbers, not boxed */}
            <div className="grid grid-cols-3 gap-8 lg:justify-end">
              {stats.map(({ label, value }) => (
                <div key={label} className="text-center lg:text-right">
                  <div className="text-4xl md:text-5xl font-bold text-amber-400 leading-none mb-1">{value}</div>
                  <div className="text-xs text-[#8ba7c7] uppercase tracking-wider mt-2">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KMC Alumni Association of Lalitpur ─────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Editorial header — title left, description right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
            <div>
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-4xl font-bold text-[#1B3E72] leading-tight">
                KMC Alumni Association<br />of Lalitpur
              </h2>
            </div>
            <p className="text-[#6b7280] text-sm leading-relaxed lg:pb-1">
              The official alumni body of Kathmandu Model Secondary School, Lalitpur — connecting graduates, supporting current students, and upholding the KMC legacy.
            </p>
          </div>

          {/* Group Photo — full-width, minimal chrome */}
          <div className="overflow-hidden border border-[#eae6de] mb-16">
            <Image
              src="/images/alumni-association/group.png"
              alt="KMC Alumni Association of Lalitpur — Group Photo"
              width={1400}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Members — editorial list, not uniform grid boxes */}
          {ASSOCIATION_MEMBERS.length > 0 ? (
            <>
              {/* President & Vice Presidents — larger */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
                {ASSOCIATION_MEMBERS.filter(m => ["President", "Vice President"].includes(m.role)).map((m, i) => {
                  const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                  return (
                    <div key={i} className="flex flex-col items-center text-center group">
                      <div className="w-28 h-28 mb-4 overflow-hidden border border-[#eae6de] group-hover:border-amber-400 transition-colors">
                        {m.image ? (
                          <Image
                            src={m.image}
                            alt={m.name}
                            width={112}
                            height={112}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#1B3E72] flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">{initials}</span>
                          </div>
                        )}
                      </div>
                      <p className="font-bold text-[#1B3E72] text-base">{m.name}</p>
                      <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mt-1">{m.role}</p>
                      <p className="text-xs text-[#9ca3af] mt-1.5 leading-tight max-w-[160px]">{m.college}</p>
                    </div>
                  );
                })}
              </div>

              {/* Other members — compact horizontal list */}
              <div className="border-t border-[#f0ede7] pt-10">
                <h3 className="text-xs font-bold text-[#1B3E72] uppercase tracking-[0.15em] mb-7">Board Members &amp; Officers</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-7">
                  {ASSOCIATION_MEMBERS.filter(m => !["President", "Vice President"].includes(m.role)).map((m, i) => {
                    const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                    return (
                      <div key={i} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 shrink-0 overflow-hidden border border-[#eae6de] group-hover:border-amber-400 transition-colors">
                          {m.image ? (
                            <Image
                              src={m.image}
                              alt={m.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#1B3E72] flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{initials}</span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1B3E72] text-sm leading-snug truncate">{m.name}</p>
                          <p className="text-xs text-amber-600 font-medium">{m.role}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-[#9ca3af] text-sm">Member profiles coming soon.</div>
          )}
        </div>
      </section>

      {/* Success Stories — dynamic from DB, only shown when alumni exist */}
      {successAlumni.length > 0 && (
        <section className="py-20 bg-[#f7f5f0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
              <div>
                <div className="w-6 h-px bg-amber-500 mb-4" />
                <h2 className="text-4xl font-bold text-[#1B3E72]">Alumni Stories</h2>
              </div>
              <p className="text-[#6b7280] text-sm leading-relaxed">
                KMC graduates making their mark in technology, medicine, law, business, and beyond.
              </p>
            </div>

            {/* Featured alumni — first card larger if featured */}
            {(() => {
              const featured = successAlumni.filter((a) => a.featured);
              const rest = successAlumni.filter((a) => !a.featured);

              return (
                <div className="space-y-5">
                  {/* Featured — horizontal strip */}
                  {featured.map((alumni) => {
                    const color = programColors[alumni.program] ?? "#374151";
                    const initials = alumni.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                    return (
                      <div key={alumni.id} className="bg-white border border-[#e8e8e8] overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-5">
                          {alumni.imageUrl ? (
                            <div className="md:col-span-2 relative min-h-[260px] overflow-hidden">
                              <Image
                                src={alumni.imageUrl}
                                alt={alumni.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-cover object-top"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                            </div>
                          ) : (
                            <div className="md:col-span-2 min-h-[100px] flex items-center justify-center" style={{ background: color }}>
                              <span className="text-white text-5xl font-bold opacity-30">{initials}</span>
                            </div>
                          )}
                          <div className="md:col-span-3 p-8 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                              <span
                                className="text-xs font-bold px-2.5 py-1 text-white uppercase tracking-wider"
                                style={{ background: color }}
                              >
                                {alumni.program}
                              </span>
                              <span className="text-xs text-[#9ca3af]">Batch {alumni.gradYear}</span>
                            </div>
                            <h3 className="font-bold text-[#1B3E72] text-xl mb-1">{alumni.name}</h3>
                            {(alumni.currentRole || alumni.company) && (
                              <p className="text-sm text-amber-600 font-semibold mb-1">
                                {[alumni.currentRole, alumni.company].filter(Boolean).join(" · ")}
                              </p>
                            )}
                            {alumni.location && (
                              <p className="text-xs text-[#9ca3af]">{alumni.location}</p>
                            )}
                            {alumni.bio && (
                              <p className="text-sm text-[#4b5563] mt-4 leading-relaxed line-clamp-4 italic">
                                &ldquo;{alumni.bio}&rdquo;
                              </p>
                            )}
                            {alumni.linkedIn && (
                              <a
                                href={alumni.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold text-[#1B3E72] hover:text-amber-600 transition-colors"
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                View LinkedIn
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Rest — 3-col magazine grid */}
                  {rest.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {rest.map((alumni) => {
                        const color = programColors[alumni.program] ?? "#374151";
                        const initials = alumni.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                        return (
                          <div key={alumni.id} className="bg-white border border-[#e8e8e8] overflow-hidden group hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                            {alumni.imageUrl ? (
                              <div className="relative h-48 overflow-hidden">
                                <Image
                                  src={alumni.imageUrl}
                                  alt={alumni.name}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  className="object-cover object-top group-hover:scale-[1.04] transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                <span
                                  className="absolute bottom-3 left-3 text-xs font-bold px-2 py-0.5 text-white uppercase tracking-wider"
                                  style={{ background: color }}
                                >
                                  {alumni.program}
                                </span>
                              </div>
                            ) : (
                              <div className="h-2 w-full" style={{ background: color }} />
                            )}

                            <div className="p-5">
                              {!alumni.imageUrl && (
                                <span
                                  className="inline-block text-xs font-bold px-2 py-0.5 text-white uppercase tracking-wider mb-3"
                                  style={{ background: color }}
                                >
                                  {alumni.program}
                                </span>
                              )}
                              <h3 className="font-bold text-[#1B3E72] text-base leading-snug">{alumni.name}</h3>
                              {(alumni.currentRole || alumni.company) && (
                                <p className="text-xs text-amber-600 font-semibold mt-1">
                                  {[alumni.currentRole, alumni.company].filter(Boolean).join(" · ")}
                                </p>
                              )}
                              <p className="text-xs text-[#9ca3af] mt-0.5">Batch {alumni.gradYear}{alumni.location ? ` · ${alumni.location}` : ""}</p>
                              {alumni.bio && (
                                <p className="text-xs text-[#4b5563] mt-3 leading-relaxed line-clamp-3 italic">
                                  &ldquo;{alumni.bio}&rdquo;
                                </p>
                              )}
                              {alumni.linkedIn && (
                                <a
                                  href={alumni.linkedIn}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-[#1B3E72] hover:text-amber-600 transition-colors"
                                >
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                  </svg>
                                  LinkedIn
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* Stay Connected — editorial split layout */}
      <section className="py-20 bg-[#1B3E72] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h2 className="text-3xl font-bold mb-3">Stay Connected</h2>
              <p className="text-[#8ba7c7] text-sm leading-relaxed">
                Follow us on social media and be part of every milestone in the KMC community.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-amber-400 text-[#1B3E72] font-bold text-sm hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
              >
                <IconMail size={16} />
                Facebook Community
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 border border-white/20 text-white font-bold text-sm hover:bg-white/8 transition-colors flex items-center justify-center gap-2"
              >
                Contact School
                <IconChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
