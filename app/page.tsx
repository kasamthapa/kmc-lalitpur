import Image from "next/image";
import Link from "next/link";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { AwardsCarousel } from "./components/awards-carousel";
import { CourseSchema, WebPageSchema } from "./components/schema";
import {
  IconArrow,
  IconCheck,
  IconStar,
  IconAward,
  IconUsers,
  IconBook,
  IconZap,
  IconGlobe,
  IconScale,
  IconMic,
  IconChevronRight,
} from "./components/icons";
import { NoticeMarquee } from "./components/notice-marquee";
import { SITE_CONFIG } from "./config/site";
import { prisma } from "./lib/prisma";

export const revalidate = 60;
// ── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  { value: "22+", label: "Years of Excellence" },
  { value: "97%", label: "NEB Pass Rate" },
  { value: "10,000+", label: "Students Annually" },
  { value: "6", label: "National Awards" },
];

const programs = [
  {
    id: "science",
    title: "Science",
    color: "from-blue-900 to-blue-700",
    icon: <IconZap size={28} />,
    image: "/images/science-v2.png",
    tagline: "Medicine · Engineering · Research",
    subjects: [
      "Physics",
      "Chemistry",
      "Biology / Computer",
      "Mathematics",
      "English",
    ],
    eligibility: "GPA 2.0+ | B+ in Science, Maths & English",
    careers: ["MBBS", "Engineering", "Pharmacy", "BSc"],
    href: "/academics#science",
  },
  {
    id: "management",
    title: "Management",
    color: "from-emerald-900 to-emerald-700",
    icon: <IconGlobe size={28} />,
    image: "/images/management.png",
    tagline: "Business · Finance · Entrepreneurship",
    subjects: [
      "Accountancy",
      "Business Studies",
      "Economics",
      "Mathematics",
      "English",
    ],
    eligibility: "GPA 2.0+ | C in Maths & English",
    careers: ["BBA", "CA", "BBS", "Finance"],
    href: "/academics#management",
  },
  {
    id: "law",
    title: "Law",
    color: "from-amber-900 to-amber-700",
    icon: <IconScale size={28} />,
    image: "/images/law.png",
    tagline: "Legal Studies · Politics · Civil Service",
    subjects: [
      "Political Science",
      "History",
      "Social Studies",
      "English",
      "Nepali",
    ],
    eligibility: "GPA 2.0+ | C in Maths & English",
    careers: ["BA.LLB", "Civil Service", "Advocacy", "Public Policy"],
    href: "/academics#law",
  },
];

const whyKMC = [
  {
    icon: <IconAward size={28} />,
    title: "Award Winning",
    desc: "6 national awards including Ministry of Education Excellence Award among 4000+ schools.",
  },
  {
    icon: <IconUsers size={28} />,
    title: "Expert Faculty",
    desc: "150+ highly qualified educators with advanced degrees and years of field experience.",
  },
  {
    icon: <IconBook size={28} />,
    title: "Modern Facilities",
    desc: "State-of-the-art labs, library, auditorium, sports complex, and digital infrastructure.",
  },
  {
    icon: <IconZap size={28} />,
    title: "97% NEB Results",
    desc: "Consistent 97% pass rate every year with students topping national examinations.",
  },
  {
    icon: <IconGlobe size={28} />,
    title: "Global Perspective",
    desc: "International partnerships, exchange programmes, and global college admissions support.",
  },
  {
    icon: <IconMic size={28} />,
    title: "Holistic Growth",
    desc: "Debate, Olympiads, drama, sports, SQC, and student leadership programmes.",
  },
];

const testimonials = [
  {
    quote:
      "KMC's Science faculty and lab facilities gave me the foundation I needed. I cleared the MBBS entrance and I owe a lot of that to the preparation classes and teachers here.",
    name: "Sushma Karki",
    role: "Science Stream Graduate — Now studying MBBS",
    stars: 5,
  },
  {
    quote:
      "My daughter joined KMC for the Law stream and the results speak for themselves — 97% pass rate, dedicated teachers, and a disciplined environment. Best decision we made.",
    name: "Binod Adhikari",
    role: "Parent — Law Stream student",
    stars: 5,
  },
  {
    quote:
      "The Management faculty at KMC pushed us beyond the syllabus. The entrance prep classes helped me crack the BBA entrance. The campus culture is unlike any other school in Lalitpur.",
    name: "Roshan Thapa Magar",
    role: "Management Stream Graduate — BBA, Kathmandu University",
    stars: 5,
  },
];

const FALLBACK_NEWS = [
  { title: "KMC Talent and Innovation Expo 2082", date: "Recent", category: "Events", image: "/images/news4.png", slug: "" },
  { title: "Voices of Experience – MBBS Achievers Panel Discussion", date: "Recent", category: "Academic", image: "/images/news1.png", slug: "" },
  { title: "Theme Drama Competition 2082 at KMC Seminar Hall", date: "Recent", category: "Cultural", image: "/images/news3.png", slug: "" },
  { title: "World NGO Day — Building Partnerships for Change", date: "Recent", category: "Community", image: "/images/news5.png", slug: "" },
];

async function getLatestNews() {
  try {
    const rows = await prisma.news.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 4,
      select: { id: true, title: true, slug: true, category: true, imageUrl: true, createdAt: true, featured: true },
    });
    if (rows.length === 0) return FALLBACK_NEWS;
    const dbNews = rows.map((r) => ({
      title: r.title,
      slug: r.slug,
      date: r.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      category: r.category ?? "News",
      image: r.imageUrl ?? "/images/news4.png",
    }));
    // Pad with fallback items if DB has fewer than 4 articles
    if (dbNews.length < 4) {
      const needed = 4 - dbNews.length;
      dbNews.push(...FALLBACK_NEWS.slice(0, needed));
    }
    return dbNews;
  } catch {
    return FALLBACK_NEWS;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function Home() {
  const latestNews = await getLatestNews();
  return (
    <main className="bg-white">
      <Header />
      <WebPageSchema
        title="KMC Lalitpur | Kathmandu Model Secondary School"
        description="NEB affiliated +2 programs in Science, Management & Law. 97% NEB pass rate, 150+ faculty, Balkumari Lalitpur."
        path="/"
      />
      <CourseSchema
        courses={[
          {
            name: "Science Stream (+2)",
            description:
              "NEB-affiliated +2 Science program covering Physics, Chemistry, Biology/Computer and Mathematics. Prepares students for MBBS, Engineering and BSc.",
            provider: "KMC Lalitpur",
            url: "/academics#science",
          },
          {
            name: "Management Stream (+2)",
            description:
              "NEB-affiliated +2 Management program covering Accountancy, Business Studies, Economics and Mathematics. Prepares students for BBA, CA and BBS.",
            provider: "KMC Lalitpur",
            url: "/academics#management",
          },
          {
            name: "Law Stream (+2)",
            description:
              "NEB-affiliated +2 Law program covering Political Science, History, Social Studies and English. Prepares students for BA.LLB and Civil Service.",
            provider: "KMC Lalitpur",
            url: "/academics#law",
          },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background video — all screen sizes */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ zIndex: 0 }}
        >
          <source src="https://res.cloudinary.com/dzxun4tvo/video/upload/v1779025362/KMC-hero-final_pjewco.mp4" type="video/mp4" />
        </video>

        {/* Overlay — blocks interaction, darkens for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(to right, rgba(11,31,58,0.85) 0%, rgba(11,31,58,0.65) 50%, rgba(11,31,58,0.40) 100%)",
          }}
        />

        {/* Content */}
        <div
          className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 pt-20 md:pt-0"
          style={{ zIndex: 2 }}
        >
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 md:mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              NEB Affiliated · Est. 2000 · Balkumari, Lalitpur
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.05] tracking-tight drop-shadow-lg">
              Shape Your
              <br />
              <span className="text-amber-300 md:text-amber-400">Future</span> at
              <br />
              KMC Lalitpur
            </h1>
            <p className="text-sm md:text-lg text-white/75 mb-6 md:mb-10 leading-relaxed max-w-xl drop-shadow">
              Kathmandu Model Secondary School delivers world-class education
              across Science, Management, and Law — with 97% NEB pass rate and a
              legacy of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-400/30"
              >
                Apply for Admission
                <IconArrow />
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=I+would+like+to+schedule+a+campus+visit`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/60 text-white font-bold rounded-xl hover:bg-white hover:text-[#0B1F3A] transition-all duration-200 backdrop-blur-sm"
              >
                Book a Campus Visit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Notice / Announcement strip ──────────────────────────────────── */}
      <NoticeMarquee />

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="px-6 first:pl-0 last:pr-0 py-4 md:py-0">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="text-[#8ba7c7] text-sm mt-3 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards Carousel ───────────────────────────────────────────────── */}
      <AwardsCarousel />

      {/* ── About snapshot ───────────────────────────────────────────────── */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative pb-8 md:pb-0">
              <div className="relative h-64 sm:h-80 lg:h-120 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/campus.png"
                  alt="KMC Lalitpur Campus"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/30 to-transparent pointer-events-none" />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 max-w-40 md:max-w-none bg-[#0B1F3A] text-white rounded-xl px-8 py-6 shadow-2xl">
                <p className="text-amber-400 text-4xl font-bold leading-none">
                  22+
                </p>
                <p className="text-slate-300 text-sm mt-1">
                  Years of Excellence
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="lg:pl-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-amber-500" />
                <span className="text-amber-600 text-xs font-semibold tracking-[0.25em] uppercase">About KMC</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1F3A] mb-6 leading-tight">
                Leading Institution of
                <br />
                Learning Excellence
              </h2>
              <p className="text-slate-600 mb-5 leading-relaxed">
                Kathmandu Model Secondary School stands as a beacon of
                educational excellence in the Kathmandu Valley. Established in
                2000, our commitment to academic rigour, character development,
                and innovation has shaped thousands of successful individuals.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                With state-of-the-art facilities, a team of 150+ dedicated
                educators, and a comprehensive NEB-aligned curriculum, we
                provide an environment where every student can flourish —
                academically, socially, and personally.
              </p>

              {/* Mini feature grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Award Winning", sub: "6 national recognitions" },
                  { label: "Expert Faculty", sub: "150+ qualified educators" },
                  { label: "Modern Curriculum", sub: "NEB aligned programs" },
                  { label: "Innovation Focused", sub: "21st-century skills" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <IconCheck size={15} />
                    </span>
                    <div>
                      <p className="font-bold text-[#0B1F3A] text-sm">
                        {f.label}
                      </p>
                      <p className="text-xs text-slate-500">{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#0B1F3A] font-bold hover:text-amber-600 transition-colors group"
              >
                Learn More About Us
                <span className="group-hover:translate-x-1 transition-transform">
                  <IconArrow />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Programs ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-600 mb-3 block">Academic Streams</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] leading-tight">Our Programs</h2>
            </div>
            <p className="text-slate-500 max-w-sm mt-4 md:mt-0 text-sm leading-relaxed">
              NEB-aligned +2 programs in Science, Management and Law — preparing students for Nepal&apos;s most competitive entrances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((p, idx) => (
              <Link
                key={p.id}
                href={p.href}
                className={`group relative bg-white rounded-xl overflow-hidden border border-[#e8e8e8] hover:border-transparent hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className={`relative h-52 bg-gradient-to-br ${p.color} overflow-hidden`}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <h3 className="text-2xl font-bold text-white mb-1">{p.title}</h3>
                    <p className="text-white/60 text-xs">{p.tagline}</p>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.subjects.map(s => (
                      <span key={s} className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.careers.map(c => (
                      <span key={c} className="text-xs font-semibold text-[#0B1F3A] bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center gap-1.5 text-sm font-bold text-[#0B1F3A] group-hover:text-amber-600 transition-colors">
                    Explore Program <IconChevronRight size={15} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/academics"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B1F3A] text-white font-bold rounded-xl hover:bg-[#162d4a] transition-colors"
            >
              View All Programs
              <IconArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Admissions quick-look ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-2 leading-tight">
                Simple 3-Step<br/>Admission Process
              </h2>
              <div className="w-12 h-1 bg-amber-400 mt-4 mb-6" />
              <p className="text-slate-600 mb-10 leading-relaxed">
                Joining KMC Lalitpur is straightforward. Fill out your form
                online after SEE results, appear for our entrance exam, and
                secure your spot in Nepal&lsquo;s top +2 institution.
              </p>

              <div className="space-y-0 mb-10">
                {[
                  {
                    step: "01",
                    title: "Fill Online Form",
                    desc: "Available on our website after SEE results are announced. Submit with your photo.",
                  },
                  {
                    step: "02",
                    title: "Appear for Entrance Exam",
                    desc: "MCQ-based exam. Science: 100 marks. Management/Law: 75 marks.",
                  },
                  {
                    step: "03",
                    title: "Secure Your Admission",
                    desc: "Merit list published same or next day. Get admitted before seats fill up.",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-6 group border-t border-[#f0ede6] pt-5 pb-5">
                    <span className="text-3xl font-bold text-[#0B1F3A]/15 leading-none shrink-0">{s.step}</span>
                    <div>
                      <h4 className="font-bold text-[#0B1F3A] mb-1">{s.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors"
              >
                Full Admission Guide
                <IconArrow />
              </Link>
            </div>

            {/* Scholarship highlight */}
            <div className="bg-[#0B1F3A] rounded-2xl p-6 md:p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-amber-400" />
                <span className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase">Scholarships</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Scholarships & Financial Aid
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                KMC Lalitpur offers merit-based and need-based scholarships to
                deserving students. Scholarships are awarded on a first-come,
                first-served basis.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "Merit Scholarship",
                    desc: "Based on SEE (25%) + KMC Entrance (75%) cumulative marks",
                  },
                  {
                    title: "Sushil Memorial Scholarship",
                    desc: "Top 2 students from first entrance exam + 1 Madhesi community student",
                  },
                  {
                    title: "Government School Scholarship",
                    desc: "Separate entrance test for students from government schools",
                  },
                  {
                    title: "Need-based Aid",
                    desc: "Available for students from economically disadvantaged backgrounds",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-amber-400/30 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-[#0B1F3A] font-bold text-xs shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-white text-sm">{s.title}</p>
                      <p className="text-slate-400 text-xs mt-1">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/admissions#scholarships"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm w-full justify-center"
              >
                View All Scholarships
                <IconArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why KMC ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:gap-24 lg:items-start">
            <div className="lg:w-80 shrink-0 mb-12 lg:mb-0 lg:sticky lg:top-28">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] leading-tight">
                Why Students<br/>Thrive Here
              </h2>
              <p className="text-slate-500 mt-4 text-sm leading-relaxed">
                Six reasons KMC is the preferred choice for quality +2 education in the Kathmandu Valley.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-[#0B1F3A] hover:text-amber-600 transition-colors group">
                About KMC <span className="group-hover:translate-x-1 transition-transform"><IconArrow /></span>
              </Link>
            </div>
            <div className="flex-1 divide-y divide-[#e0dcd4]">
              {whyKMC.map((item, i) => (
                <div key={i} className="py-7 flex gap-6 group cursor-default">
                  <span className="text-4xl font-bold text-[#0B1F3A]/10 leading-none shrink-0 w-12 text-right group-hover:text-amber-400/50 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-bold text-[#0B1F3A] mb-1.5 group-hover:text-amber-700 transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── News & Updates ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] leading-tight">
              News &<br className="md:hidden"/> Updates
            </h2>
            <Link
              href="/news"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[#0B1F3A] hover:text-amber-600 transition-colors group border-b border-[#0B1F3A]/20 pb-0.5 hover:border-amber-600"
            >
              All news <span className="group-hover:translate-x-1 transition-transform"><IconArrow /></span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured */}
            <Link
              href={latestNews[0]?.slug ? `/news/${latestNews[0].slug}` : "/news"}
              className="lg:col-span-2 group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#e8e8e8] hover:-translate-y-0.5"
            >
              <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
                <Image
                  src={latestNews[0].image}
                  alt={latestNews[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-amber-400 text-[#0B1F3A] text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {latestNews[0].category}
                  </span>
                  <h3 className="text-white font-bold text-xl leading-tight">
                    {latestNews[0].title}
                  </h3>
                  <p className="text-white/60 text-xs mt-1">
                    {latestNews[0].date}
                  </p>
                </div>
              </div>
            </Link>

            {/* Sidebar */}
            <div className="space-y-4">
              {latestNews.slice(1).map((news, i) => (
                <Link
                  key={i}
                  href={news.slug ? `/news/${news.slug}` : "/news"}
                  className="group flex gap-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#e8e8e8] hover:border-amber-300 p-4"
                >
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-xs font-bold text-amber-600 mb-1">
                      {news.category}
                    </span>
                    <h4 className="text-sm font-bold text-[#0B1F3A] leading-tight line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {news.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">{news.date}</p>
                  </div>
                </Link>
              ))}

              <Link
                href="/news"
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#0B1F3A]/20 text-[#0B1F3A] font-bold text-sm rounded-xl hover:bg-[#0B1F3A] hover:text-white hover:border-[#0B1F3A] transition-all"
              >
                All News & Events
                <IconArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#0B1F3A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              What Our<br/>Community Says
            </h2>
            <div className="hidden md:block text-right">
              <p className="text-[#8ba7c7] text-sm">Students · Parents · Alumni</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Featured large quote */}
            <div className="lg:col-span-2 relative">
              <div className="text-[8rem] leading-none font-serif text-amber-400/15 absolute -top-10 -left-4 select-none">&ldquo;</div>
              <blockquote className="relative text-xl md:text-2xl text-white/90 leading-relaxed font-light pt-8">
                {testimonials[0].quote}
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-px bg-amber-400" />
                <div>
                  <p className="font-bold text-white text-sm">{testimonials[0].name}</p>
                  <p className="text-xs text-[#8ba7c7] mt-0.5">{testimonials[0].role}</p>
                </div>
              </div>
            </div>
            {/* Two smaller quotes */}
            <div className="flex flex-col divide-y divide-white/10">
              {testimonials.slice(1).map((t, i) => (
                <div key={i} className="py-8 first:pt-0 last:pb-0">
                  <p className="text-[#8ba7c7] text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-px bg-amber-400/50" />
                    <div>
                      <p className="text-white font-semibold text-xs">{t.name}</p>
                      <p className="text-[#8ba7c7]/70 text-[10px] mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Student Achievers ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-4 leading-tight">
              Our Students,<br/>Their Dreams
            </h2>
            <div className="w-10 h-0.5 bg-amber-400 mb-5" />
            <p className="text-[#6b7280] max-w-2xl text-sm leading-relaxed">
              KMC graduates go on to become doctors, legal professionals,
              engineers, and business leaders — many on full scholarships.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl border border-[#eae6de] shadow-sm overflow-hidden">
              <Image
                src="/images/student-achievers.png"
                alt="Future Doctors and Legal Professionals from KMC Lalitpur — student achievers under full scholarship"
                width={1400}
                height={800}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-white rounded-3xl border border-[#eae6de] shadow-sm overflow-hidden">
              <Image
                src="/images/student-achievers-2.png"
                alt="Future Engineers and Chartered Accountants from KMC Lalitpur — student achievers under full scholarship"
                width={1400}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Co-curricular / Student Life ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-4 leading-tight">
                Beyond the<br/>Classroom
              </h2>
              <div className="w-10 h-0.5 bg-amber-400 mb-6" />
              <p className="text-slate-600 mb-8 leading-relaxed">
                At KMC, education extends far beyond textbooks. We nurture every
                student&apos;s unique talents through a rich ecosystem of
                co-curricular and extra-curricular activities.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Debate & Speech Events",
                  "Maths Olympiad",
                  "Theme Drama Competition",
                  "Talent & Innovation Expo",
                  "Student Catalyst Committee",
                  "Sports Championships",
                  "Cultural Celebrations",
                  "Community Service",
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-slate-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                      <IconCheck size={15} />
                    </span>
                    {activity}
                  </div>
                ))}
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-[#0B1F3A] font-bold hover:text-amber-600 transition-colors group"
              >
                See Latest Events
                <span className="group-hover:translate-x-1 transition-transform">
                  <IconArrow />
                </span>
              </Link>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/news1.png", alt: "Panel Discussion" },
                { src: "/images/news3.png", alt: "Drama Competition" },
                { src: "/images/news4.png", alt: "Innovation Expo" },
                { src: "/images/news5.png", alt: "NGO Day" },
              ].map((img, i) => (
                <div
                  key={i}
                  className="relative h-36 sm:h-44 rounded-xl overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0B1F3A]/20 group-hover:bg-[#0B1F3A]/10 transition-colors pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full border border-amber-400/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full border border-amber-400/10" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-6 border border-amber-400/30 px-3 py-1.5 rounded">
            Join KMC Lalitpur
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform
            <br />
            Your Future?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Join KMC Lalitpur and be part of a legacy of excellence. Admissions
            are open — seats are limited.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              Start Your Journey
              <IconArrow />
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=I+want+to+know+more+about+KMC+Lalitpur`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
