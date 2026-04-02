"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import {
  ChevronRight,
  FileText,
  CheckCircle,
  Calendar,
  DollarSign,
  BookOpen,
  Award,
} from "lucide-react";
import { useState } from "react";

export default function Admissions() {
  const [activeStream, setActiveStream] = useState("science");

  const admissionGuides = {
    science: {
      title: "Science Stream",
      steps: [
        {
          num: 1,
          title: "Entrance Form Fill Up",
          details:
            "Student should fill up online admission form which will be available on the college's website after the announcement of the grade 10 (SEE) results.",
          requirements: [
            "Minimum CGPA 2.85",
            "B plus grade in Science",
            "B plus grade in Mathematics",
            "B plus grade in Optional Mathematics",
            "B plus grade in English",
            "Must have passed Optional Mathematics",
            "Recently taken photograph with white background",
          ],
          info: "Prospectus, fee structure, model questions, entrance center, entrance symbol number, entrance date, and time will be sent to your registered email ID.",
        },
        {
          num: 2,
          title: "Entrance Exam",
          details:
            "KMC will conduct a paper-based entrance examination. Model questions will be provided through email before the exam.",
          requirements: [
            "English: 20 marks",
            "Science: 40 marks",
            "Mathematics: 40 marks",
            "Total: 100 marks",
            "Answer sheets checked by computer",
            "Follow all instructions given by invigilators",
          ],
          info: "Results will be published after 2nd day of examination or informed during examination. Students listed in merit list will be informed about direct admission or interview.",
        },
        {
          num: 3,
          title: "Admission",
          details:
            "Students enlisted in direct admission from entrance result should not appear for interview. Direct admission students can get admitted within deadline.",
          requirements: [
            "Direct admission students skip interview",
            "Interview students must pass to get admission",
            "Merit list published with higher numbers than intake",
            "Scholarships available on first-come, first-served basis",
            "Admission before seats fill up recommended",
            "Review fee structure and payment process",
          ],
          info: "KMC provides scholarships to deserving students. Ensure you have accurate knowledge about fee structure, scholarships, and payment process before admission.",
        },
      ],
    },
    humanities: {
      title: "Management, Law & Humanities",
      steps: [
        {
          num: 1,
          title: "Entrance Form Fill Up",
          details:
            "Student should fill up an online admission form which will be available on college's website after the announcement of the result of grade 10 (SEE).",
          requirements: [
            "Minimum CGPA 2.05",
            "C grade in Mathematics",
            "C grade in English",
            "Recently taken photograph with white background",
          ],
          info: "Prospectus, fee structure, model questions, entrance center, entrance symbol number, entrance date and time will be sent to your registered email ID.",
        },
        {
          num: 2,
          title: "Entrance Exam",
          details:
            "KMC will conduct entrance exam with physical and computer-based multiple choice questions. Model questions will be provided through email.",
          requirements: [
            "English: 45 marks",
            "General Knowledge: 15 marks",
            "Mathematics: 15 marks",
            "Total: 75 marks",
            "Computer-checked answers",
            "Follow instructions given by invigilators",
          ],
          info: "Result of entrance will be published on same day of examination or will be informed during examination.",
        },
        {
          num: 3,
          title: "Admission",
          details:
            "Students who are listed in merit list are informed to admit directly. Deadline of admission will be given along with result.",
          requirements: [
            "Direct admission for merit list students",
            "Deadline provided with results",
            "Merit list published with higher numbers than intake",
            "Wide range of scholarships for deserving students",
            "First-come, first-served scholarship basis",
            "Get admission before scholarship quota fills",
          ],
          info: "KMC will publish higher number of students in merit list than its intake capacity so students are informed to get admission before seats are fulfilled.",
        },
      ],
    },
  };

  const currentGuide =
    admissionGuides[activeStream as keyof typeof admissionGuides];

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-slate-300">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="text-amber-400 font-semibold">Admissions</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Join Our Community
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Begin your journey of academic excellence at Kathmandu Model
            Secondary School
          </p>
        </div>
      </section>

      {/* Quick Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-400 text-slate-900 px-4 py-2 rounded-full font-semibold text-sm mb-4">
              Admission Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              How to Apply
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Follow these simple steps to apply for admission at KMC Lalitpur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              {
                step: "01",
                title: "Fill Application",
                desc: "Complete the admission form with all required information",
              },
              {
                step: "02",
                title: "Entrance Exam",
                desc: "Appear for our entrance examination in your chosen stream",
              },
              {
                step: "03",
                title: "Merit List",
                desc: "Participate in interview if needed or direct admission",
              },
              {
                step: "04",
                title: "Admission Letter",
                desc: "Secure your admission and join the KMC family",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 text-center h-full flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-slate-900">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 text-sm">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="text-amber-400" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stream Selection and Detailed Guide */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Detailed Admission Guide
          </h2>

          {/* Stream Tabs */}
          <div className="flex gap-4 mb-16 justify-center flex-wrap">
            <button
              onClick={() => setActiveStream("science")}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                activeStream === "science"
                  ? "bg-amber-400 text-slate-900 shadow-lg"
                  : "bg-white text-slate-900 border-2 border-slate-200 hover:border-amber-400"
              }`}
            >
              Science Stream
            </button>
            <button
              onClick={() => setActiveStream("humanities")}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                activeStream === "humanities"
                  ? "bg-amber-400 text-slate-900 shadow-lg"
                  : "bg-white text-slate-900 border-2 border-slate-200 hover:border-amber-400"
              }`}
            >
              Management, Law & Humanities
            </button>
          </div>

          {/* Detailed Steps */}
          <div className="space-y-8">
            {currentGuide.steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-6 p-8">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-slate-900">
                        {step.num}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                      {step.details}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <CheckCircle size={20} className="text-amber-400" />
                        Key Requirements & Details
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-slate-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {step.info && (
                      <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-400 p-4 rounded">
                        <p className="text-slate-800 text-sm font-medium">
                          <span className="font-bold text-amber-600">
                            ℹ️ Note:{" "}
                          </span>
                          {step.info}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">
            Admission Timeline
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { date: "March - April", event: "Application submission opens" },
              { date: "May", event: "Entrance exams held" },
              { date: "June", event: "Interview rounds conducted" },
              { date: "July", event: "Admission results announced" },
              { date: "August", event: "Fee submission and registration" },
              { date: "September", event: "Classes commence" },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold">
                    {i + 1}
                  </div>
                  {i < 5 && <div className="w-1 h-12 bg-amber-400 mt-2"></div>}
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 flex-1 border-2 border-slate-200 hover:shadow-lg transition-shadow">
                  <p className="text-amber-600 font-semibold text-sm mb-2">
                    {item.date}
                  </p>
                  <p className="text-slate-900 font-bold text-lg">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">
            Eligibility & Requirements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-slate-200 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="text-amber-400" size={28} />
                Required Documents
              </h3>
              <ul className="space-y-4">
                {[
                  "Completed admission form",
                  "Birth certificate",
                  "Previous academic records",
                  "Character reference letter",
                  "Passport-size photographs (4)",
                  "Parent/Guardian ID documents",
                  "Medical fitness certificate",
                  "Residence proof",
                ].map((doc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-amber-400 flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <span className="text-slate-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-slate-200 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Award className="text-amber-400" size={28} />
                General Eligibility
              </h3>
              <ul className="space-y-4">
                {[
                  "Passed Grade 10 or equivalent",
                  "Stream-specific minimum CGPA requirements",
                  "Required subject grades as per stream",
                  "Fluency in English and Nepali",
                  "Good conduct and discipline",
                  "No age restriction",
                  "Admission based on merit",
                  "Interview assessment where required",
                ].map((criteria, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-amber-400 flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <span className="text-slate-700">{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all">
              <Calendar className="text-amber-400 mx-auto mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Campus Tours</h3>
              <p className="text-slate-300 mb-6">
                Schedule your personalized campus tour to explore our facilities
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-amber-400 font-bold hover:text-amber-300 transition"
              >
                Schedule Tour
                <ChevronRight size={20} />
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all">
              <FileText className="text-amber-400 mx-auto mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Application Support</h3>
              <p className="text-slate-300 mb-6">
                Get personalized help with your application forms and
                requirements
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-amber-400 font-bold hover:text-amber-300 transition"
              >
                Get Support
                <ChevronRight size={20} />
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all">
              <BookOpen className="text-amber-400 mx-auto mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Scholarships</h3>
              <p className="text-slate-300 mb-6">
                Learn about our merit-based scholarships and financial aid
                options
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-amber-400 font-bold hover:text-amber-300 transition"
              >
                Learn More
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Contact our admissions team for more information or to submit your
              application
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl"
            >
              Contact Admissions Office
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
