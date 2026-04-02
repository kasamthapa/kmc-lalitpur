import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

// ─── Inline SVG Icons (sharp, geometric — not emoji-style) ───────────────────

const IconLightbulb = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V18H9v-3.8C7.21 13.16 6 11.22 6 9a6 6 0 0 1 6-6Z" />
    <line x1="9" y1="21" x2="15" y2="21" />
  </svg>
);

const IconGlobe = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
  </svg>
);

const IconHeart = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
);

const IconBook = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    <line x1="12" y1="6" x2="16" y2="6" />
    <line x1="12" y1="10" x2="16" y2="10" />
  </svg>
);

const IconUsers = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconStar = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconArrowRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconCheck = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconDiamond = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M2 8.5L12 13l10-4.5" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────────────

const pillars = [
  {
    Icon: IconBook,
    title: "Academic Excellence",
    desc: "Rigorous curriculum aligned with NEB standards and advanced teaching methodologies proven over 30 years.",
  },
  {
    Icon: IconUsers,
    title: "Student-Centric",
    desc: "Personalised mentorship and support tailored to each student's unique strengths and learning pace.",
  },
  {
    Icon: IconLightbulb,
    title: "Innovation",
    desc: "21st-century skill development—critical thinking, digital fluency, and creative problem-solving.",
  },
  {
    Icon: IconDiamond,
    title: "Holistic Growth",
    desc: "Character building, sports, arts, and academics combined for complete personal development.",
  },
];

const whyKMC = [
  {
    title: "NEB Affiliated",
    desc: "Recognized by Nepal Education Board with curriculum aligned to national standards and best practices.",
  },
  {
    title: "Experienced Faculty",
    desc: "150+ qualified educators with advanced degrees and years of proven teaching excellence.",
  },
  {
    title: "State-of-the-Art Facilities",
    desc: "Modern labs, library, sports complex, auditorium, and cutting-edge digital infrastructure.",
  },
  {
    title: "Strong Track Record",
    desc: "Consistent 98% pass rate with students securing top positions in national examinations.",
  },
  {
    title: "Holistic Development",
    desc: "Balanced focus on academics, sports, arts, and character development for complete growth.",
  },
  {
    title: "Global Perspective",
    desc: "International exchange programmes and collaborations for enhanced global exposure.",
  },
];

export default function About() {
  return (
    <main className="bg-white pt-16 md:pt-20">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-[#0B1F3A] overflow-hidden">
        {/* Subtle geometric accent */}
        <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full bg-[#C9A84C]/10 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#1a3a5c]/60 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-10 text-sm text-[#8ba7c7]">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              Home
            </Link>
            <span className="text-[#8ba7c7]/50">/</span>
            <span className="text-[#C9A84C] font-medium">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-[#C9A84C]/40 px-3 py-1.5 rounded">
              Est. 1990
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              About
              <br />
              <span className="text-[#C9A84C]">KMC Lalitpur</span>
            </h1>
            <p className="text-lg text-[#8ba7c7] leading-relaxed max-w-xl">
              Three decades of academic excellence, character-building, and
              transformative education in the Kathmandu Valley.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image + floating card */}
            <div className="relative pb-10 pr-10">
              <div className="relative h-[440px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/campus.png"
                  alt="KMC Campus"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating stat card — anchored inside the padded container */}
              <div className="absolute bottom-0 right-0 bg-[#0B1F3A] text-white rounded-2xl px-8 py-6 shadow-xl">
                <p className="text-[#C9A84C] text-4xl font-bold leading-none">
                  30+
                </p>
                <p className="text-[#8ba7c7] text-sm mt-1">
                  Years of Excellence
                </p>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="inline-block text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-[#C9A84C]/40 px-3 py-1.5 rounded">
                Our Story
              </span>
              <h2 className="text-4xl font-bold text-[#0B1F3A] mb-6 leading-tight">
                Building Excellence
                <br />
                Since 1990
              </h2>
              <p className="text-[#4a5568] leading-relaxed mb-5">
                Kathmandu Model Secondary School was established with a vision
                to provide world-class education in the Kathmandu Valley. Over
                three decades, we have grown from a small institution into one
                of the region's most respected educational establishments.
              </p>
              <p className="text-[#4a5568] leading-relaxed mb-8">
                Our commitment to academic excellence, character development,
                and holistic growth has shaped thousands of successful
                individuals who now lead in various fields nationally and
                internationally.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[#e8e8e8]">
                <div>
                  <p className="text-4xl font-bold text-[#C9A84C] leading-none">
                    2,500+
                  </p>
                  <p className="text-[#6b7280] text-sm mt-1.5 font-medium">
                    Active Students
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#C9A84C] leading-none">
                    98%
                  </p>
                  <p className="text-[#6b7280] text-sm mt-1.5 font-medium">
                    Pass Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission, Vision & Values ──────────────────────────────────────── */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <span className="inline-block text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-[#C9A84C]/40 px-3 py-1.5 rounded">
              Our Foundation
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] leading-tight">
              Mission, Vision &amp; Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mission */}
            <div className="bg-[#0B1F3A] rounded-2xl p-8 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] mb-6">
                <IconLightbulb />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-[#8ba7c7] leading-relaxed text-sm flex-1">
                To provide comprehensive, high-quality education that develops
                intellectually capable, emotionally mature, and socially
                responsible individuals equipped to thrive in a rapidly changing
                global landscape.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#C9A84C] rounded-2xl p-8 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#0B1F3A]/20 flex items-center justify-center text-[#0B1F3A] mb-6">
                <IconGlobe />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-4">
                Our Vision
              </h3>
              <p className="text-[#3d2e0a] leading-relaxed text-sm flex-1">
                To be recognised as a premier institution of learning excellence
                that nurtures leaders, innovators, and global citizens committed
                to creating a better world through education, integrity, and
                service.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white border border-[#e8e8e8] rounded-2xl p-8 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#f7f5f0] border border-[#e8e8e8] flex items-center justify-center text-[#0B1F3A] mb-6">
                <IconHeart />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-5">
                Our Values
              </h3>
              <ul className="space-y-3 flex-1">
                {[
                  "Excellence",
                  "Integrity",
                  "Inclusivity",
                  "Innovation",
                  "Compassion",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/40 flex items-center justify-center flex-shrink-0 text-[#C9A84C]">
                      <IconCheck />
                    </span>
                    <span className="text-[#374151] font-medium text-sm">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Four Pillars ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="inline-block text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-[#C9A84C]/40 px-3 py-1.5 rounded">
                Our Pillars
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] leading-tight">
                What We
                <br />
                Stand For
              </h2>
            </div>
            <p className="text-[#6b7280] max-w-xs leading-relaxed md:text-right">
              Four essential pillars defining KMC's commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="group relative bg-[#f7f5f0] hover:bg-[#0B1F3A] rounded-2xl p-7 transition-colors duration-300 overflow-hidden"
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-5 text-6xl font-bold text-black/5 group-hover:text-white/5 leading-none select-none transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-[#C9A84C]/15 group-hover:bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] mb-6 transition-colors duration-300">
                    <Icon />
                  </div>
                  <h3 className="text-base font-bold text-[#0B1F3A] group-hover:text-white mb-3 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-[#6b7280] group-hover:text-[#8ba7c7] text-sm leading-relaxed transition-colors duration-300">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principal's Message ───────────────────────────────────────────── */}
      <section id="principal" className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image + name block */}
            <div>
              <div className="relative w-full max-w-sm">
                <div className="relative h-[480px] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/principal.png"
                    alt="Mukunda Kumar Giri – Principal"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-bold text-lg leading-tight">
                    Mukunda Kumar Giri
                  </p>
                  <p className="text-[#C9A84C] text-sm font-medium mt-1">
                    Principal, KMC Lalitpur
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="pt-4">
              <span className="inline-block text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-[#C9A84C]/40 px-3 py-1.5 rounded">
                Leadership
              </span>
              <h2 className="text-4xl font-bold text-[#0B1F3A] mb-8 leading-tight">
                Principal's
                <br />
                Message
              </h2>

              {/* Pull quote */}
              <blockquote className="border-l-4 border-[#C9A84C] pl-6 mb-8">
                <p className="text-[#0B1F3A] text-lg font-medium italic leading-relaxed">
                  "Education is the foundation of a better future — and at KMC,
                  that foundation is built on excellence, empathy, and
                  unwavering purpose."
                </p>
              </blockquote>

              <div className="space-y-4 text-[#4a5568] text-sm leading-relaxed">
                <p>
                  Welcome to Kathmandu Model Secondary School, where we believe
                  education is the foundation of a better future. For more than
                  three decades, KMC has been committed to providing not just
                  academic excellence, but a transformative learning experience
                  that shapes character and develops critical thinkers.
                </p>
                <p>
                  Our approach is rooted in the belief that every student is
                  unique with distinct talents and potential. We create an
                  inclusive, nurturing environment where diversity is
                  celebrated, and individual strengths are recognised and
                  developed.
                </p>
                <p>
                  In today's rapidly evolving world, we equip our students with
                  21st-century skills—critical thinking, creativity,
                  collaboration, and communication—alongside traditional
                  academic rigour. Our state-of-the-art facilities and diverse
                  co-curricular programmes ensure holistic development.
                </p>
                <p>
                  I invite you to join our community. Together, let's build a
                  brighter future where learning knows no bounds and every
                  student realises their fullest potential.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#e2ddd4]">
                <p className="font-bold text-[#0B1F3A]">Mukunda Kumar Giri</p>
                <p className="text-[#6b7280] text-sm">
                  Principal, KMC Lalitpur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose KMC ────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="inline-block text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-[#C9A84C]/40 px-3 py-1.5 rounded">
              Why KMC
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] leading-tight">
              Why Choose
              <br />
              KMC Lalitpur?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyKMC.map((item, i) => (
              <div
                key={i}
                className="group bg-[#f7f5f0] hover:bg-[#0B1F3A] rounded-2xl p-7 transition-colors duration-300"
              >
                {/* Index */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold text-[#C9A84C] tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 h-px bg-[#C9A84C]/30" />
                </div>
                <h3 className="text-base font-bold text-[#0B1F3A] group-hover:text-white mb-3 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#6b7280] group-hover:text-[#8ba7c7] text-sm leading-relaxed transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#C9A84C]/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#C9A84C]/8" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-6 border border-[#C9A84C]/40 px-3 py-1.5 rounded">
            Join Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Join Our Growing
            <br />
            Community
          </h2>
          <p className="text-[#8ba7c7] text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Be part of an institution committed to excellence, innovation, and
            your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0B1F3A] font-bold rounded-xl hover:bg-[#d4b560] transition-colors"
            >
              Apply Now
              <IconArrowRight />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#C9A84C]/50 text-[#C9A84C] font-bold rounded-xl hover:bg-[#C9A84C]/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
