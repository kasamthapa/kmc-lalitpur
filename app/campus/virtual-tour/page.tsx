import Image from "next/image";
import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../../components/schema";
import { IconChevronRight, IconArrow, IconPhone } from "../../components/icons";
import { SITE_CONFIG } from "../../config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Campus Tour",
  description:
    "Take a virtual tour of KMC Lalitpur campus — explore classrooms, science labs, library, sports complex, auditorium, and more from wherever you are.",
};

const areas = [
  {
    name: "Main Campus Building",
    desc: "Our 5-storey main academic block housing all classrooms, faculty rooms, and administrative offices.",
    image: "/images/campus.png",
    highlight: "Built in 2005 · 50+ rooms",
  },
  {
    name: "Science Laboratories",
    desc: "Fully equipped Physics, Chemistry, and Biology labs meeting NEB practical examination standards.",
    image: "/images/science-v2.png",
    highlight: "3 Labs · Modern equipment",
  },
  {
    name: "Computer Lab",
    desc: "High-performance computers with broadband internet, used for both classwork and entrance prep.",
    image: "/images/facilities/computerLab.png",
    highlight: "60 workstations · 100 Mbps",
  },
  {
    name: "Library",
    desc: "A quiet reading sanctuary with over 15,000 books, journals, newspapers, and digital resources.",
    image: "/images/facilities/library.png",
    highlight: "15,000+ books · Study halls",
  },
  {
    name: "Auditorium",
    desc: "A 230-seat auditorium used for annual events, debates, cultural programs, and guest lectures.",
    image: "/images/facilities/auditorium.png",
    highlight: "230 seats · Full AV setup",
  },
  {
    name: "Sports ",
    desc: "Outdoor and indoor sports facilities including cricket ground, basketball court, and indoor games room.",
    image: "/images/facilities/sports.png",
    highlight: "Cricket · Basketball · TT",
  },
  {
    name: "Cafeteria",
    desc: "Clean, hygienic, and affordable cafeteria serving Nepali and continental meals throughout the day.",
    image: "/images/facilities/canteen.png",
    highlight: "300 seats · Hygienic kitchen",
  },
  {
    name: "Classroom",
    desc: "Bright, ventilated, and smartboard-equipped classrooms designed for effective interactive learning.",
    image: "/images/facilities/classroom.png",
    highlight: "Smart boards · 30 seats",
  },
];

export default function VirtualTourPage() {
  return (
    <main className="bg-white">
      <BreadcrumbSchema
        items={[
          { name: "Campus", href: "/campus" },
          { name: "Virtual Tour", href: "/campus/virtual-tour" },
        ]}
      />
      <WebPageSchema
        title="Virtual Campus Tour — KMC Lalitpur"
        description="Explore the KMC Lalitpur campus virtually — labs, library, auditorium, sports complex and more."
        path="/campus/virtual-tour"
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-[#1B3E72] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-10 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <IconChevronRight size={14} />
            <span className="hover:text-amber-400 transition">Campus</span>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Virtual Tour</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight leading-none">
                Virtual<br />Campus Tour
              </h1>
              <p className="text-lg text-[#8ba7c7] leading-relaxed max-w-lg">
                Can&apos;t visit in person? Explore every corner of our campus
                right from your screen — from world-class labs to our sprawling
                sports complex.
              </p>
            </div>
            <div className="text-sm text-[#8ba7c7] lg:text-right shrink-0">
              <p className="mb-1 font-semibold text-white">8 areas to explore</p>
              <p>Video tour + photo gallery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tour — prominently framed */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-3xl font-bold text-[#1B3E72]">
                See KMC in Action
              </h2>
              <div className="w-10 h-0.5 bg-amber-400 mt-3" />
            </div>
            <p className="text-[#6b7280] text-sm md:text-right max-w-xs leading-relaxed">
              Watch our campus walkthrough video to get a real feel of life at
              KMC Lalitpur.
            </p>
          </div>

          {/* Video — clean framed embed */}
          <div className="rounded-2xl overflow-hidden border border-[#eae6de] shadow-2xl">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/YGcczHq0Nmk"
                title="KMC Lalitpur Campus Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          <p className="text-sm text-[#9ca3af] mt-4">
            More campus videos on{" "}
            <a
              href={SITE_CONFIG.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              our YouTube channel
            </a>
          </p>
        </div>
      </section>

      {/* Photo Tour — asymmetric magazine grid */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="w-6 h-px bg-amber-500 mb-4" />
              <h2 className="text-3xl font-bold text-[#1B3E72]">Campus Areas</h2>
            </div>
            <p className="text-[#6b7280] text-sm max-w-xs md:text-right leading-relaxed">
              Every space is designed to support learning, collaboration, and
              student well-being.
            </p>
          </div>

          {/* First two areas — featured large */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {areas.slice(0, 2).map((area) => (
              <div
                key={area.name}
                className="group rounded-xl overflow-hidden bg-white border border-[#eae6de] hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              >
                <div className="relative h-64 bg-[#1B3E72] overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B3E72]/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="font-bold text-white text-lg mb-1">{area.name}</h3>
                    <span className="text-xs font-semibold text-amber-300">{area.highlight}</span>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-[#6b7280] leading-relaxed">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining areas — 3-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.slice(2).map((area) => (
              <div
                key={area.name}
                className="group rounded-xl overflow-hidden bg-white border border-[#eae6de] hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              >
                <div className="relative h-44 bg-[#1B3E72] overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B3E72]/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#1B3E72] mb-1 text-sm group-hover:text-amber-600 transition">
                    {area.name}
                  </h3>
                  <p className="text-xs text-[#6b7280] mb-3 leading-relaxed line-clamp-2">
                    {area.desc}
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                    {area.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical tour CTA — left-aligned editorial */}
      <section className="py-24 bg-[#1B3E72] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="w-6 h-px bg-amber-400 mb-4" />
              <h2 className="text-3xl font-bold mb-2">Experience It in Person</h2>
              <p className="text-[#8ba7c7] text-lg max-w-md leading-relaxed">
                Nothing beats a guided campus tour. Schedule your visit and meet our
                faculty and students in person.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-400 text-[#1B3E72] font-bold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                Schedule a Visit
                <IconArrow size={17} />
              </Link>
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:border-amber-400 transition-all duration-200"
              >
                <IconPhone size={17} />
                {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
