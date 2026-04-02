import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import {
  ChevronRight,
  BookOpen,
  Users,
  Zap,
  Award,
  BarChart3,
} from "lucide-react";

export default function Academics() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-slate-300">
            <Link href="/" className="hover:text-gold-500 transition">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="text-gold-500 font-semibold">Academics</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Academic Excellence
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            Our comprehensive NEB-aligned curriculum is designed to develop
            critical thinking, foster creativity, and prepare students for
            global success.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/teach.png"
                alt="Interactive Classroom Learning"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-blue-950 mb-6">
                Our Teaching Philosophy
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                At KMC Lalitpur, we believe that exceptional education goes
                beyond textbooks. Our pedagogical approach combines rigorous
                academic instruction with real-world application, critical
                thinking development, and character building.
              </p>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Every teacher is committed to student-centered learning,
                individual attention, and fostering an environment where
                students not only excel academically but also develop into
                responsible global citizens.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-blue-950" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950">NEB Aligned</h4>
                    <p className="text-sm text-slate-600">National standards</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-blue-950" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950">Interactive</h4>
                    <p className="text-sm text-slate-600">Student-centered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gold-500 text-blue-950 px-4 py-2 rounded-full font-semibold text-sm mb-4">
              Academic Streams
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
              Our Programs
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Three comprehensive programs tailored to help students pursue
              their passion and achieve excellence
            </p>
          </div>

          <div className="space-y-16">
            {/* Science */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src="/images/sceince.png"
                  alt="Science Laboratory"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-950 mb-4 flex items-center gap-3">
                  <span className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center">
                    <Zap size={28} className="text-blue-950" />
                  </span>
                  Science Stream
                </h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  A rigorous program designed for students passionate about
                  science and research, preparing them for careers in
                  engineering, medicine, and scientific innovation.
                </p>

                <div className="mb-8">
                  <h4 className="font-bold text-blue-950 mb-4">
                    Core Subjects:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Physics",
                      "Chemistry",
                      "Biology",
                      "Mathematics",
                      "English",
                      "Nepali",
                    ].map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center gap-2 text-slate-700"
                      >
                        <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold text-blue-950 mb-4">
                    Special Features:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <Zap
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        Advanced laboratory facilities with modern equipment
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Zap
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        Research projects and practical experiments
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Zap
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        University collaboration and mentorship programs
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Zap
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        Science fairs and competitive examinations
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                  <p className="text-blue-950 font-semibold">
                    <span className="text-gold-500">98% Pass Rate</span> with
                    students securing admission to top universities worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Management */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="relative h-96 rounded-xl overflow-hidden order-2 md:order-1">
                <Image
                  src="/images/management.png"
                  alt="Computer Laboratory"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold text-blue-950 mb-4 flex items-center gap-3">
                  <span className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center">
                    <BarChart3 size={28} className="text-blue-950" />
                  </span>
                  Management Stream
                </h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Prepare for careers in business, finance, and entrepreneurship
                  with our comprehensive management program focusing on
                  practical business acumen.
                </p>

                <div className="mb-8">
                  <h4 className="font-bold text-blue-950 mb-4">
                    Core Subjects:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Accountancy",
                      "Business Studies",
                      "Economics",
                      "Mathematics",
                      "English",
                      "Nepali",
                    ].map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center gap-2 text-slate-700"
                      >
                        <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold text-blue-950 mb-4">
                    Special Features:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <BarChart3
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        Business simulation and case study analysis
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <BarChart3
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        Internship opportunities with leading companies
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <BarChart3
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        Financial literacy and investment modules
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <BarChart3
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        Entrepreneurship incubation programs
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                  <p className="text-blue-950 font-semibold">
                    <span className="text-gold-500">97% Pass Rate</span> with
                    strong placement records in top businesses
                  </p>
                </div>
              </div>
            </div>

            {/* Law */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src="/images/law.png"
                  alt="Library"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-950 mb-4 flex items-center gap-3">
                  <span className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center">
                    <Award size={28} className="text-blue-950" />
                  </span>
                  Law & Politics Stream
                </h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Ideal for students interested in law, public service, and
                  social change. Develop expertise in Nepali and international
                  legal systems.
                </p>

                <div className="mb-8">
                  <h4 className="font-bold text-blue-950 mb-4">
                    Core Subjects:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Nepali",
                      "English",
                      "Political Science",
                      "History",
                      "Social Studies",
                      "Mathematics",
                    ].map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center gap-2 text-slate-700"
                      >
                        <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold text-blue-950 mb-4">
                    Special Features:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <Award
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        Constitutional law and legal studies focus
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Award
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        Moot court and debate competitions
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Award
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        Legal mentorship from practicing lawyers
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Award
                        size={18}
                        className="text-gold-500 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-slate-700">
                        Civil service exam preparation
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                  <p className="text-blue-950 font-semibold">
                    <span className="text-gold-500">95% Pass Rate</span> with
                    graduates succeeding in law schools and civil service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gold-500 text-blue-950 px-4 py-2 rounded-full font-semibold text-sm mb-4">
              Our Team
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
              Dedicated Faculty
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Our 150+ qualified educators bring expertise, passion, and
              dedication to every classroom
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Subject Matter Experts",
                description:
                  "Educators with advanced degrees and years of experience in their specialized fields",
              },
              {
                title: "Mentors & Guides",
                description:
                  "Beyond teaching, our faculty members guide students personally through their educational journey",
              },
              {
                title: "Continuous Learners",
                description:
                  "Regular professional development and training to stay updated with latest pedagogical methods",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200"
              >
                <div className="w-14 h-14 bg-gold-500 rounded-lg flex items-center justify-center mb-6">
                  <Users className="text-blue-950" size={28} />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes Section */}
      <section className="py-24 bg-gradient-to-br from-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Student Learning Outcomes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="text-amber-500" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Academic Excellence</h3>
                <p className="text-slate-300">
                  Mastery of subject content with deep understanding and
                  application skills
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="text-amber-500" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Critical Thinking</h3>
                <p className="text-slate-300">
                  Ability to analyze, evaluate, and solve complex problems
                  independently
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="text-amber-500" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Communication Skills</h3>
                <p className="text-slate-300">
                  Effective oral and written communication in multiple languages
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="text-amber-500" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Character Development
                </h3>
                <p className="text-slate-300">
                  Growth as responsible citizens with ethical values and social
                  awareness
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
