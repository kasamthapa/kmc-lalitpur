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
import type { Metadata } from "next";

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
// TODO: replace placeholder data with real member data provided by admin
const ASSOCIATION_MEMBERS: {
  name: string;
  role: string;
  imageUrl: string | null;
}[] = [
  // e.g. { name: "Ram Bahadur Thapa", role: "President", imageUrl: null },
];

export default function AlumniPage() {
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
                      {m.imageUrl ? (
                        <Image
                          src={m.imageUrl}
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

      {/* Success Stories — coming soon */}
      {/* Hidden for now — will be enabled once alumni success story data is ready */}

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
