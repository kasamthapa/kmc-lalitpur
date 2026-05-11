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
    image: "/images/science.png",
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
    desc: "A 500-seat auditorium used for annual events, debates, cultural programs, and guest lectures.",
    image: "/images/facilities/auditorium.png",
    highlight: "500 seats · Full AV setup",
  },
  {
    name: "Sports Complex",
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
    highlight: "Smart boards · 40 seats",
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
      <section className="pt-28 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <IconChevronRight size={14} />
            <span className="hover:text-amber-400 transition">Campus</span>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Virtual Tour</span>
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
              Explore KMC
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Virtual Campus Tour
            </h1>
            <p className="text-xl text-[#8ba7c7] leading-relaxed">
              Can&apos;t visit in person? Explore every corner of our campus
              right from your screen — from world-class labs to our sprawling
              sports complex.
            </p>
          </div>
        </div>
      </section>

      {/* Video Tour */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
              Video Tour
            </p>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">
              See KMC in Action
            </h2>
            <p className="text-[#6b7280]">
              Watch our campus walkthrough video to get a real feel of life at
              KMC Lalitpur.
            </p>
          </div>

          {/* Video Embed */}
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[#eae6de]"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              src="https://www.youtube.com/embed/YGcczHq0Nmk"
              title="KMC Lalitpur Campus Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <p className="text-center text-sm text-[#6b7280] mt-4">
            Watch on{" "}
            <a
              href={SITE_CONFIG.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              YouTube
            </a>{" "}
            for more campus videos
          </p>
        </div>
      </section>

      {/* Photo Tour */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
              Photo Gallery
            </p>
            <h2 className="text-4xl font-bold text-[#0B1F3A]">Campus Areas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {areas.map((area, idx) => (
              <div
                key={area.name}
                className="group rounded-2xl overflow-hidden bg-white border border-[#eae6de] hover:shadow-xl hover:border-amber-300 transition cursor-pointer"
              >
                <div className="relative h-48 bg-[#0B1F3A] overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0B1F3A] mb-2 group-hover:text-amber-600 transition">
                    {area.name}
                  </h3>
                  <p className="text-sm text-[#6b7280] mb-3 leading-relaxed line-clamp-2">
                    {area.desc}
                  </p>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    {area.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical tour CTA */}
      <section className="py-20 bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience It in Person</h2>
          <p className="text-[#8ba7c7] text-lg mb-10">
            Nothing beats a guided campus tour. Schedule your visit and meet our
            faculty and students in person.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition"
            >
              Schedule a Visit
              <IconArrow size={18} />
            </Link>
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              <IconPhone size={18} />
              {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
