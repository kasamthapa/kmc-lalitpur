import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import {
  ChevronRight,
  Microscope,
  Cpu,
  Users,
  Utensils,
  Trophy,
  BookOpen,
} from "lucide-react";

export default function Facilities() {
  return (
    <main id="facilities" className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-slate-300">
            <Link href="/" className="hover:text-gold-500 transition">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="text-gold-500 font-semibold">Facilities</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            World-Class Facilities
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            State-of-the-art infrastructure designed to support contemporary
            education
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-950 mb-6">
              Our Infrastructure
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Every facility at KMC Lalitpur is carefully designed and
              maintained to create an optimal learning environment that supports
              academic excellence and holistic development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Science Labs */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group border border-blue-100">
              <div className="h-64 relative bg-blue-600 overflow-hidden">
                <Image
                  src="/images/science-lab.png"
                  alt="Science Laboratory"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-3 flex items-center gap-3">
                  <Microscope className="text-gold-500" size={28} />
                  Science Laboratories
                </h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Advanced physics, chemistry, and biology labs equipped with
                  modern apparatus, microscopes, and spectroscopy equipment for
                  hands-on experimentation.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>✓ Advanced lab equipment</li>
                  <li>✓ Safe experimentation protocols</li>
                  <li>✓ Research-grade instruments</li>
                  <li>✓ Qualified lab technicians</li>
                </ul>
              </div>
            </div>

            {/* Computer Lab */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group border border-blue-100">
              <div className="h-64 relative bg-blue-600 overflow-hidden">
                <Image
                  src="/images/computer-lab.png"
                  alt="Computer Laboratory"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-3 flex items-center gap-3">
                  <Cpu className="text-gold-500" size={28} />
                  Computer Laboratory
                </h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Fully equipped with high-end workstations, networking
                  infrastructure, and software for programming, data science,
                  and digital literacy training.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>✓ Latest computer workstations</li>
                  <li>✓ High-speed internet</li>
                  <li>✓ Professional software suites</li>
                  <li>✓ Tech support team</li>
                </ul>
              </div>
            </div>

            {/* Library */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group border border-blue-100">
              <div className="h-64 relative bg-blue-600 overflow-hidden">
                <Image
                  src="/images/library.png"
                  alt="Central Library"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-3 flex items-center gap-3">
                  <BookOpen className="text-gold-500" size={28} />
                  Central Library
                </h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Spacious reading area with 10,000+ books, digital resources,
                  journals, newspapers, and a dedicated quiet study section for
                  research.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>✓ 10,000+ books</li>
                  <li>✓ Digital databases</li>
                  <li>✓ Quiet study areas</li>
                  <li>✓ Research support</li>
                </ul>
              </div>
            </div>

            {/* Sports Complex */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group border border-blue-100">
              <div className="h-64 relative bg-blue-600 overflow-hidden">
                <Image
                  src="/images/sports-facility.png"
                  alt="Sports Complex"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-3 flex items-center gap-3">
                  <Trophy className="text-gold-500" size={28} />
                  Sports Complex
                </h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Comprehensive facilities including basketball court,
                  volleyball court, badminton court, running track, and fitness
                  area with modern equipment.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>✓ Multiple sports courts</li>
                  <li>✓ Running track</li>
                  <li>✓ Fitness center</li>
                  <li>✓ Certified coaches</li>
                </ul>
              </div>
            </div>

            {/* Cafeteria */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group border border-blue-100">
              <div className="h-64 relative bg-blue-600 overflow-hidden">
                <Image
                  src="/images/cafeteria.png"
                  alt="Modern Cafeteria"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-3 flex items-center gap-3">
                  <Utensils className="text-gold-500" size={28} />
                  Modern Cafeteria
                </h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Spacious dining area serving nutritious, hygienic meals
                  prepared by professional chefs following food safety standards
                  and dietary requirements.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>✓ Nutritious meals</li>
                  <li>✓ Food safety certified</li>
                  <li>✓ Diverse menu options</li>
                  <li>✓ Clean environment</li>
                </ul>
              </div>
            </div>

            {/* Auditorium */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group border border-blue-100">
              <div className="h-64 relative bg-blue-600 overflow-hidden">
                <Image
                  src="/images/auditorium.png"
                  alt="Grand Auditorium"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-3 flex items-center gap-3">
                  <Users className="text-gold-500" size={28} />
                  Grand Auditorium
                </h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  State-of-the-art auditorium with professional lighting, sound
                  system, and 500+ seating capacity for cultural events and
                  assemblies.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>✓ 500+ seating</li>
                  <li>✓ Professional sound</li>
                  <li>✓ Stage setup</li>
                  <li>✓ AV equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-950 mb-16 text-center">
            Additional Facilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Security & Safety",
                features: [
                  "CCTV surveillance",
                  "Security personnel",
                  "First aid facilities",
                  "Emergency protocols",
                ],
              },
              {
                title: "Transportation",
                features: [
                  "School buses",
                  "Multiple routes",
                  "GPS tracking",
                  "Trained drivers",
                ],
              },
              {
                title: "Student Spaces",
                features: [
                  "Classrooms",
                  "Laboratories",
                  "Counseling center",
                  "Recreation area",
                ],
              },
              {
                title: "Technology",
                features: [
                  "WiFi campus",
                  "Smart boards",
                  "Digital resources",
                  "Learning management system",
                ],
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 shadow-lg border border-blue-200"
              >
                <h3 className="text-xl font-bold text-blue-950 mb-4">
                  {item.title}
                </h3>
                <ul className="space-y-3">
                  {item.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 text-slate-700"
                    >
                      <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
