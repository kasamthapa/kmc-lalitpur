"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import {
  IconChevronRight,
  IconUsers,
  IconGlobe,
  IconAward,
  IconArrow,
  IconMail,
} from "../components/icons";
import { SITE_CONFIG } from "../config/site";

const stats = [
  { label: "Graduates", value: "2,000+", icon: IconUsers },
  { label: "Years of Excellence", value: "25+", icon: IconAward },
  { label: "Countries Represented", value: "20+", icon: IconGlobe },
];

const streams = ["All", "Science", "Management", "Law"];

const alumni = [
  {
    name: "Dr. Anita Shrestha",
    batch: "2005",
    stream: "Science",
    role: "Cardiologist",
    org: "TUTH, Kathmandu",
    country: "Nepal",
    quote: "KMC's science labs and dedicated teachers gave me the foundation I needed to pursue medicine.",
    initial: "AS",
    color: "#1a4a7a",
  },
  {
    name: "Bikram Pradhan",
    batch: "2008",
    stream: "Management",
    role: "Co-Founder & CEO",
    org: "FinTech Nepal Pvt. Ltd.",
    country: "Nepal",
    quote: "The management curriculum and entrepreneurship events at KMC sparked my business mindset.",
    initial: "BP",
    color: "#2d6a4f",
  },
  {
    name: "Sarina Maharjan",
    batch: "2010",
    stream: "Science",
    role: "Software Engineer",
    org: "Google Inc.",
    country: "USA",
    quote: "KMC's computer labs and project-based learning gave me my first real taste of programming.",
    initial: "SM",
    color: "#7b2d8b",
  },
  {
    name: "Roshan Thapa",
    batch: "2012",
    stream: "Law",
    role: "Advocate",
    org: "Supreme Court of Nepal",
    country: "Nepal",
    quote: "The structured thinking and debate culture at KMC made me a sharper legal mind.",
    initial: "RT",
    color: "#c75000",
  },
  {
    name: "Priya Tamrakar",
    batch: "2015",
    stream: "Management",
    role: "Journalist & Author",
    org: "Kantipur Publications",
    country: "Nepal",
    quote: "Literature classes and the debate club at KMC built my love for storytelling and writing.",
    initial: "PT",
    color: "#1a2e5a",
  },
  {
    name: "Arun Bajracharya",
    batch: "2018",
    stream: "Management",
    role: "Investment Analyst",
    org: "Deutsche Bank",
    country: "Germany",
    quote: "The rigorous academics and analytical training at KMC were perfect preparation for finance.",
    initial: "AB",
    color: "#4a5568",
  },
];

const [formData, setFormData] = [
  { name: "", email: "", batch: "", stream: "", occupation: "", message: "" },
  () => {},
];

export default function AlumniPage() {
  const [activeStream, setActiveStream] = useState("All");
  const [form, setForm] = useState({
    name: "",
    email: "",
    batch: "",
    stream: "",
    occupation: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const filtered =
    activeStream === "All"
      ? alumni
      : alumni.filter((a) => a.stream === activeStream);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-[#0B1F3A] text-white">
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
              Thousands of KMC graduates are making their mark across Nepal and the world. Meet our distinguished alumni and reconnect with your community.
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

      {/* Notable Alumni */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
              Distinguished Alumni
            </p>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">Success Stories</h2>
            <p className="text-[#6b7280] max-w-2xl mx-auto">
              Our graduates are doctors, engineers, entrepreneurs, artists, and leaders — shaping the future of Nepal and beyond.
            </p>
          </div>

          {/* Stream Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {streams.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStream(s)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
                  activeStream === s
                    ? "bg-[#0B1F3A] text-white shadow-lg"
                    : "bg-white text-[#374151] border border-[#eae6de] hover:border-[#0B1F3A]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((person) => (
              <div
                key={person.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#eae6de] transition group"
              >
                {/* Avatar */}
                <div
                  className="h-40 flex items-center justify-center text-white text-5xl font-bold"
                  style={{ background: `linear-gradient(135deg, ${person.color}, ${person.color}99)` }}
                >
                  {person.initial}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#0B1F3A]">{person.name}</h3>
                      <p className="text-sm text-[#6b7280]">Batch of {person.batch}</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                      {person.stream}
                    </span>
                  </div>
                  <p className="font-semibold text-[#374151] text-sm">{person.role}</p>
                  <p className="text-[#6b7280] text-sm mb-4">{person.org} · {person.country}</p>
                  <blockquote className="text-sm text-[#374151] italic border-l-2 border-amber-400 pl-3 leading-relaxed">
                    "{person.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect / Registration Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
              Join the Network
            </p>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">Register as Alumni</h2>
            <p className="text-[#6b7280]">
              Help us build a stronger alumni community. Share your journey and stay connected with KMC.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-16 bg-[#f7f5f0] rounded-2xl border border-[#eae6de]">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-[#0B1F3A] mb-3">Thank you for registering!</h3>
              <p className="text-[#6b7280]">We&apos;ll be in touch soon. Welcome back to the KMC family.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-[#f7f5f0] p-8 rounded-2xl border border-[#eae6de]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-[#eae6de] bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#eae6de] bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Batch Year *</label>
                  <input
                    type="text"
                    required
                    value={form.batch}
                    onChange={(e) => setForm({ ...form, batch: e.target.value })}
                    placeholder="e.g. 2015"
                    className="w-full px-4 py-3 rounded-xl border border-[#eae6de] bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Stream *</label>
                  <select
                    required
                    value={form.stream}
                    onChange={(e) => setForm({ ...form, stream: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#eae6de] bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="">Select stream</option>
                    <option>Science</option>
                    <option>Management</option>
                    <option>Law</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Current Occupation</label>
                <input
                  type="text"
                  value={form.occupation}
                  onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                  placeholder="e.g. Software Engineer at Google"
                  className="w-full px-4 py-3 rounded-xl border border-[#eae6de] bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Message (optional)</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share a memory or message for current students..."
                  className="w-full px-4 py-3 rounded-xl border border-[#eae6de] bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#0B1F3A] text-white font-bold rounded-xl hover:bg-[#162d54] transition flex items-center justify-center gap-2"
              >
                Register as Alumni
                <IconArrow size={18} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
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
