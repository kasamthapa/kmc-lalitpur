import Image from "next/image";
import Link from "next/link";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { AwardsCarousel } from "./components/awards-carousel";
import {
  ChevronRight,
  Award,
  Users,
  BookOpen,
  Zap,
  Globe,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden mt-16">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/YGcczHq0Nmk?autoplay=1&mute=1&loop=1&playlist=YGcczHq0Nmk&controls=0&modestbranding=1"
          title="School Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ zIndex: 0, border: "none" }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(15, 23, 42, 0.65) 0%, rgba(30, 41, 59, 0.70) 100%)",
            zIndex: 1,
          }}
        />

        <div
          className="relative max-w-7xl mx-auto w-full px-4 py-20"
          style={{ zIndex: 2 }}
        >
          <div className="max-w-3xl">
            <div className="inline-block bg-amber-400 text-slate-900 px-6 py-2 rounded-full font-semibold text-sm mb-8 shadow-lg">
              Welcome to Excellence
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-xl">
              Shape Your Future at KMC Lalitpur
            </h1>
            <p className="text-lg md:text-xl text-white mb-10 leading-relaxed max-w-2xl drop-shadow-lg font-light">
              Kathmandu Model Secondary School delivers world-class education
              across Science, Management, and Law programs with a commitment to
              academic excellence, character development, and holistic growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center px-8 py-4 bg-amber-400 text-slate-900 font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-400/40 transition-all duration-300 hover:scale-105 group"
              >
                Apply for Admission
                <ChevronRight
                  className="ml-2 group-hover:translate-x-1 transition"
                  size={20}
                />
              </Link>
              <a
                href="https://wa.me/9779851138595?text=I+would+like+to+schedule+a+campus+visit"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Book a Campus Visit
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 group-hover:scale-110 transition duration-300">
                22+
              </div>
              <p className="text-slate-300 mt-3 font-medium">
                Years of Excellence
              </p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 group-hover:scale-110 transition duration-300">
                100%
              </div>
              <p className="text-slate-300 mt-3 font-medium">NEB Results</p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 group-hover:scale-110 transition duration-300">
                6
              </div>
              <p className="text-slate-300 mt-3 font-medium">National Awards</p>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 group-hover:scale-110 transition duration-300">
                3
              </div>
              <p className="text-slate-300 mt-3 font-medium">
                Academic Streams
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Carousel */}
      <AwardsCarousel />

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 md:h-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/campus.png"
                alt="About KMC"
                sizes="lg"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
            </div>
            <div>
              <div className="inline-block bg-amber-400 text-slate-900 px-6 py-2 rounded-full font-semibold text-sm mb-6">
                About Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Leading Institution of Learning Excellence
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Kathmandu Model Secondary School stands as a beacon of
                educational excellence in the Kathmandu Valley. Our commitment
                to academic rigor, character development, and innovation has
                shaped generations of successful individuals.
              </p>
              <p className="text-lg text-slate-700 mb-10 leading-relaxed">
                With state-of-the-art facilities, a team of dedicated educators,
                and a comprehensive curriculum aligned with NEB standards, we
                provide an environment where every student can flourish.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Award className="text-slate-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">
                      Award Winning
                    </h4>
                    <p className="text-sm text-slate-600">
                      Recognized nationally
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Users className="text-slate-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">
                      Expert Faculty
                    </h4>
                    <p className="text-sm text-slate-600">
                      Highly qualified team
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <BookOpen className="text-slate-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">
                      Modern Curriculum
                    </h4>
                    <p className="text-sm text-slate-600">
                      NEB aligned programs
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Zap className="text-slate-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">
                      Innovation Focused
                    </h4>
                    <p className="text-sm text-slate-600">
                      21st century skills
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/academics"
                className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-amber-500 transition-all duration-300 group text-lg"
              >
                Explore Our Programs
                <ArrowRight
                  className="group-hover:translate-x-2 transition"
                  size={20}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block bg-amber-400 text-slate-900 px-6 py-2 rounded-full font-semibold text-sm mb-6">
              Academic Streams
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our Programs
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Choose from our comprehensive NEB-aligned programs designed to
              nurture excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Science */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-amber-300">
              <div className="h-64 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-900">
                <Image
                  src="/images/sceince.png"
                  alt="Science Program"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center shadow-md">
                    <Zap size={24} className="text-slate-900" />
                  </span>
                  Science
                </h3>
                <p className="text-slate-700 mb-8 leading-relaxed">
                  Comprehensive Science curriculum with practical lab
                  experience, covering Physics, Chemistry, and Biology with
                  real-world applications.
                </p>
                <Link
                  href="/academics"
                  className="text-slate-900 font-bold hover:text-amber-500 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  Learn More
                  <ChevronRight
                    className="group-hover:translate-x-1 transition"
                    size={18}
                  />
                </Link>
              </div>
            </div>

            {/* Management */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-amber-300">
              <div className="h-64 relative overflow-hidden bg-gradient-to-br from-teal-600 to-teal-900">
                <Image
                  src="/images/management.png"
                  alt="Management Program"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center shadow-md">
                    <Globe size={24} className="text-slate-900" />
                  </span>
                  Management
                </h3>
                <p className="text-slate-700 mb-8 leading-relaxed">
                  Develop business acumen through Accounting, Economics, and
                  Business Studies, preparing you for global career
                  opportunities.
                </p>
                <Link
                  href="/academics"
                  className="text-slate-900 font-bold hover:text-amber-500 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  Learn More
                  <ChevronRight
                    className="group-hover:translate-x-1 transition"
                    size={18}
                  />
                </Link>
              </div>
            </div>

            {/* Law */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-amber-300">
              <div className="h-64 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-900">
                <Image
                  src="/images/law.png"
                  alt="Law Program"
                  sizes="sm"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center shadow-md">
                    <Heart size={24} className="text-slate-900" />
                  </span>
                  Law
                </h3>
                <p className="text-slate-700 mb-8 leading-relaxed">
                  Study Law & Politics with focus on Nepali and international
                  legal systems, preparing future legal professionals.
                </p>
                <Link
                  href="/academics"
                  className="text-slate-900 font-bold hover:text-amber-500 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  Learn More
                  <ChevronRight
                    className="group-hover:translate-x-1 transition"
                    size={18}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              News & Updates
            </h2>
            <Link
              href="/news"
              className="inline-flex items-center text-amber-500 font-bold text-lg hover:text-amber-600 transition-all duration-300"
            >
              Read All News
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured News */}
            <div className="lg:col-span-2">
              <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-amber-300">
                <div className="relative h-96 overflow-hidden bg-gradient-to-br from-slate-600 to-slate-900">
                  <Image
                    src="/images/news1.png"
                    alt="Featured News"
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-8">
                  <p className="text-amber-500 font-bold text-sm tracking-wider mb-3">
                    FEBRUARY 2, 2026
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                    An Inspiring Panel Discussion Program featuring
                    distinguished MBBS achievers from KMC
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    Our institution hosted a transformative panel discussion
                    bringing together successful MBBS graduates who shared their
                    journey, challenges, and insights about pursuing medical
                    education and building a career in healthcare.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar News */}
            <div className="lg:col-span-1 space-y-6">
              {/* News Item 1 */}
              <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-amber-300 cursor-pointer">
                <div className="flex gap-4 p-4">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg overflow-hidden">
                    <Image
                      src="/images/news2.png"
                      alt="News"
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 text-xs font-bold tracking-wider mb-1">
                      FEBRUARY 2, 2026
                    </p>
                    <h4 className="text-slate-900 font-bold text-sm leading-tight">
                      Voices of Experience – Episode 01
                    </h4>
                  </div>
                </div>
              </div>

              {/* News Item 2 */}
              <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-amber-300 cursor-pointer">
                <div className="flex gap-4 p-4">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg overflow-hidden">
                    <Image
                      src="/images/news3.png"
                      alt="News"
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 text-xs font-bold tracking-wider mb-1">
                      FEBRUARY 2, 2026
                    </p>
                    <h4 className="text-slate-900 font-bold text-sm leading-tight">
                      Seeking the blessings of Goddess Saraswati on the
                      auspicious occasion of Saraswati Puja
                    </h4>
                  </div>
                </div>
              </div>

              {/* News Item 3 */}
              <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-amber-300 cursor-pointer">
                <div className="flex gap-4 p-4">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg overflow-hidden">
                    <Image
                      src="/images/news4.png"
                      alt="News"
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 text-xs font-bold tracking-wider mb-1">
                      FEBRUARY 2, 2026
                    </p>
                    <h4 className="text-slate-900 font-bold text-sm leading-tight">
                      World NGO Day Celebration - Building Partnerships for
                      Change
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block bg-amber-400 text-slate-900 px-6 py-2 rounded-full font-semibold text-sm mb-6">
              Why Choose KMC
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Students Thrive Here
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-6 group">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-300 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:shadow-xl transition-all duration-300 shadow-lg">
                <Award className="text-slate-900" size={44} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Academic Excellence
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Consistently achieving 98% pass rate with students securing
                  top positions in national exams and competitive entrance
                  tests.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-300 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:shadow-xl transition-all duration-300 shadow-lg">
                <Users className="text-slate-900" size={44} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Experienced Faculty
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  150+ qualified educators with advanced degrees and years of
                  experience in their respective fields.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-300 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:shadow-xl transition-all duration-300 shadow-lg">
                <BookOpen className="text-slate-900" size={44} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Modern Facilities
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  State-of-the-art science labs, computer labs, library, sports
                  facilities, and digital infrastructure supporting 21st-century
                  learning.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-300 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:shadow-xl transition-all duration-300 shadow-lg">
                <Zap className="text-slate-900" size={44} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Holistic Development
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Beyond academics, we nurture character, leadership,
                  creativity, and social responsibility through diverse
                  activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block bg-amber-400 text-slate-900 px-6 py-2 rounded-full font-semibold text-sm mb-6">
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Hear from our students and parents about their transformative
              experiences at KMC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-amber-400 transition-all duration-300 hover:shadow-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "KMC transformed my academic journey. The dedicated faculty and
                supportive environment helped me secure top marks in NEB. Highly
                recommend!"
              </p>
              <div className="border-t border-slate-700 pt-4">
                <p className="font-bold text-white">Ananya Sharma</p>
                <p className="text-sm text-slate-400">Science Stream - 2080</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-amber-400 transition-all duration-300 hover:shadow-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "The holistic education at KMC goes beyond textbooks. My son
                developed leadership skills and confidence that opened doors to
                international scholarships."
              </p>
              <div className="border-t border-slate-700 pt-4">
                <p className="font-bold text-white">Rajesh Patel</p>
                <p className="text-sm text-slate-400">
                  Parent - Management Stream
                </p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-amber-400 transition-all duration-300 hover:shadow-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "The modern facilities and innovative teaching methods made
                learning engaging. I'm now studying law at a top university
                abroad. Thank you, KMC!"
              </p>
              <div className="border-t border-slate-700 pt-4">
                <p className="font-bold text-white">Priya Desai</p>
                <p className="text-sm text-slate-400">Law Stream - 2079</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-lg text-slate-700 mb-12 leading-relaxed">
            Join KMC Lalitpur and be part of a legacy of excellence. Connect
            with us today to learn more about our programs and admission
            process.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:bg-amber-500 group"
            >
              Start Your Journey
              <ChevronRight
                className="ml-2 group-hover:translate-x-1 transition"
                size={20}
              />
            </Link>
            <a
              href="https://wa.me/9779851138595?text=I+want+to+know+more+about+KMC"
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
