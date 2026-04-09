"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { BreadcrumbSchema, WebPageSchema } from "../components/schema";
import { SITE_CONFIG } from "../config/site";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconArrow,
  IconCheck,
  IconFacebook,
  IconInstagram,
  IconYoutube,
  IconWhatsAppSVG,
} from "../components/icons";


// ─── WhatsApp quick actions ───────────────────────────────────────────────────
const waActions = [
  {
    label: "Admission Info",
    message: "I want to know about admissions at KMC Lalitpur",
    emoji: "🎓",
  },
  {
    label: "Brochure Request",
    message: "Please send me the KMC Lalitpur brochure",
    emoji: "📄",
  },
  {
    label: "Campus Visit",
    message: "I would like to schedule a campus visit at KMC Lalitpur",
    emoji: "🏫",
  },
  {
    label: "Scholarship Info",
    message: "I want to know about scholarships at KMC Lalitpur",
    emoji: "🏆",
  },
];

// ─── Department contacts ──────────────────────────────────────────────────────
const departments = [
  {
    name: "General Enquiries",
    phone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    hours: "Sun–Fri, 8AM–5PM",
  },
  {
    name: "Admissions Office",
    phone: SITE_CONFIG.phone,
    email: `admissions@${SITE_CONFIG.email.split("@")[1]}`,
    hours: "Sun–Fri, 9AM–4PM",
  },
  {
    name: "Principal's Office",
    phone: SITE_CONFIG.phone,
    email: `principal@${SITE_CONFIG.email.split("@")[1]}`,
    hours: "By appointment",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    stream: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    // Simulate submission — replace with your actual form API endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="bg-white pt-25">
      <Header />

      {/* Schema */}
      <BreadcrumbSchema items={[{ name: "Contact", href: "/contact" }]} />
      <WebPageSchema
        title="Contact Us | KMC Lalitpur"
        description="Contact Kathmandu Model Secondary School Lalitpur — phone +977-1-5918595, email info@kmclalitpur.edu.np, Balkumari Lalitpur. Office hours Sunday to Friday 8AM–5PM."
        path="/contact"
      />

      {/* Hero */}
      <section className="relative pt-20 pb-20 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute top-0 right-0 w-100 h-100 rounded-full bg-amber-400/8 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-10 text-sm text-[#8ba7c7]">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="text-[#8ba7c7]/50">/</span>
            <span className="text-amber-400 font-medium">Contact</span>
          </nav>
          <div className="max-w-2xl">
            <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              We&apos;re Here
              <br />
              <span className="text-amber-400">to Help</span>
            </h1>
            <p className="text-lg text-[#8ba7c7] leading-relaxed">
              Have a question about admissions, fees, scholarships, or campus
              life? Our team is ready to guide you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-16 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <IconPhone size={22} />,
                title: "Phone",
                lines: [
                  <a
                    key="p1"
                    href={SITE_CONFIG.phoneHref}
                    className="hover:text-amber-600 transition-colors"
                  >
                    {SITE_CONFIG.phone}
                  </a>,
                ],
              },
              {
                icon: <IconMail size={22} />,
                title: "Email",
                lines: [
                  <a
                    key="e1"
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:text-amber-600 transition-colors text-xs"
                  >
                    {SITE_CONFIG.email}
                  </a>,
                  <a
                    key="e2"
                    href={`mailto:admissions@${SITE_CONFIG.email.split("@")[1]}`}
                    className="hover:text-amber-600 transition-colors text-xs"
                  >
                    {`admissions@${SITE_CONFIG.email.split("@")[1]}`}
                  </a>,
                ],
              },
              {
                icon: <IconMapPin size={22} />,
                title: "Location",
                lines: [
                  <a
                    key="m1"
                    href={SITE_CONFIG.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-600 transition-colors"
                  >
                    {SITE_CONFIG.address.streetAddress}, {SITE_CONFIG.address.addressLocality}
                  </a>,
                  <span key="m2" className="text-slate-400 text-xs">
                    Kathmandu Valley, Nepal
                  </span>,
                ],
              },
              {
                icon: <IconClock size={22} />,
                title: "Office Hours",
                lines: [
                  <span key="h1">Sun – Fri: 8 AM – 5 PM</span>,
                  <span key="h2">Saturday: 10 AM – 3 PM</span>,
                ],
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-[#e8e8e8] hover:border-amber-300 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 bg-amber-400 rounded-xl flex items-center justify-center text-[#0B1F3A] mb-5">
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#0B1F3A] mb-3">{card.title}</h3>
                <div className="space-y-1 text-slate-600 text-sm">
                  {card.lines.map((line, j) => (
                    <div key={j}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department contacts */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
              Departments
            </span>
            <h2 className="text-3xl font-bold text-[#0B1F3A]">
              Contact by Department
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {departments.map((dept, i) => (
              <div
                key={i}
                className="bg-[#f7f5f0] rounded-2xl p-6 border border-[#e8e8e8] hover:border-amber-300 transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <h3 className="font-bold text-[#0B1F3A] text-sm">
                    {dept.name}
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <a
                    href={`tel:${dept.phone.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors"
                  >
                    <span className="text-amber-500">
                      <IconPhone size={22} />
                    </span>
                    {dept.phone}
                  </a>
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors"
                  >
                    <span className="text-amber-500">
                      <IconMail size={22} />
                    </span>
                    <span className="text-xs">{dept.email}</span>
                  </a>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <span className="text-amber-500">
                      <IconClock size={22} />
                    </span>
                    {dept.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form + map */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
                Send a Message
              </span>
              <h2 className="text-3xl font-bold text-[#0B1F3A] mb-8 leading-tight">
                How Can We
                <br />
                Help You?
              </h2>

              {submitted ? (
                <div className="bg-white rounded-2xl p-10 border border-[#e8e8e8] text-center">
                  <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-5 text-[#0B1F3A]">
                    <IconCheck />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Thank you for reaching out. Our team will get back to you
                    within 24 hours on working days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        stream: "",
                        message: "",
                      });
                    }}
                    className="text-amber-600 font-bold text-sm hover:text-amber-700 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-[#e8e8e8] space-y-5">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-2 uppercase tracking-wider">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-[#e8e8e8] rounded-xl text-sm text-[#0B1F3A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-[#f7f5f0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-2 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+977"
                        className="w-full px-4 py-3 border border-[#e8e8e8] rounded-xl text-sm text-[#0B1F3A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-[#f7f5f0]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] mb-2 uppercase tracking-wider">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-[#e8e8e8] rounded-xl text-sm text-[#0B1F3A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-[#f7f5f0]"
                    />
                  </div>

                  {/* Subject + Stream */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-2 uppercase tracking-wider">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 border border-[#e8e8e8] rounded-xl text-sm text-[#0B1F3A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-[#f7f5f0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-2 uppercase tracking-wider">
                        Interested Stream
                      </label>
                      <select
                        name="stream"
                        value={formData.stream}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#e8e8e8] rounded-xl text-sm text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-[#f7f5f0]"
                      >
                        <option value="">Select a stream</option>
                        <option value="science">Science</option>
                        <option value="management">Management</option>
                        <option value="law">Law</option>
                        <option value="general">General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] mb-2 uppercase tracking-wider">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className="w-full px-4 py-3 border border-[#e8e8e8] rounded-xl text-sm text-[#0B1F3A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none bg-[#f7f5f0]"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={
                      loading ||
                      !formData.name ||
                      !formData.email ||
                      !formData.message
                    }
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-400/20"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <IconArrow />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    We respond within 24 hours on working days. For urgent
                    enquiries call{" "}
                    <a
                      href="tel:+97715918595"
                      className="text-amber-600 font-semibold"
                    >
                      +977-1-5918595
                    </a>
                  </p>
                </div>
              )}
            </div>

            {/* Map + quick info */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="inline-block text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5 border border-amber-400/40 px-3 py-1.5 rounded bg-amber-50">
                  Find Us
                </span>
                <h2 className="text-3xl font-bold text-[#0B1F3A] mb-6 leading-tight">
                  Visit Our
                  <br />
                  Campus
                </h2>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-[#e8e8e8] h-72 shrink-0">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.975082866928!2d85.31516807538053!3d27.671441426735868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a3c32ab111%3A0x95c5e67b1a3e7e2b!2sBalkumari%2C%20Lalitpur%2044700!5e0!3m2!1sen!2snp!4v1700000000000"
                  title="KMC Lalitpur Location - Balkumari, Lalitpur"
                />
              </div>

              {/* Quick response info */}
              <div className="bg-white rounded-2xl p-6 border border-[#e8e8e8]">
                <h3 className="font-bold text-[#0B1F3A] mb-4">
                  Quick Response Promise
                </h3>
                <ul className="space-y-3">
                  {[
                    "Email replies within 24 hours on working days",
                    "Phone support during office hours — Sun to Fri, 8AM–5PM",
                    "WhatsApp responses typically within 1 hour",
                    "Walk-in visits welcome during office hours",
                    "Campus tours available by prior appointment",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-[#0B1F3A]">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Directions */}
              <a
                href="https://maps.google.com/?q=Balkumari,Lalitpur,Nepal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-[#0B1F3A]/20 text-[#0B1F3A] font-bold text-sm rounded-xl hover:bg-[#0B1F3A] hover:text-white hover:border-[#0B1F3A] transition-all"
              >
                <IconMapPin size={22} />
                Get Directions on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-[#0B1F3A] rounded-3xl p-10 md:p-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
              <div>
                <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-amber-400/30 px-3 py-1.5 rounded">
                  Instant Support
                </span>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Chat With Us on WhatsApp
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                  Get instant answers to your questions. Our admissions team
                  typically replies within an hour during working hours.
                </p>
              </div>
              <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center shrink-0 text-white">
                <IconWhatsAppSVG size={20} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {waActions.map((action) => (
                <a
                  key={action.label}
                  href={`https://wa.me/9779851138595?text=${encodeURIComponent(action.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-200 group"
                >
                  <span className="text-xl shrink-0">{action.emoji}</span>
                  <div>
                    <p className="font-bold text-white text-sm group-hover:text-white">
                      {action.label}
                    </p>
                    <p className="text-slate-400 text-xs group-hover:text-white/80 transition-colors">
                      Tap to chat
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-sm">
                Or send a custom message directly
              </p>
              <a
                href="https://wa.me/9779851138595"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-colors text-sm"
              >
                <IconWhatsAppSVG size={20} />
                Open WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social media */}
      <section className="py-16 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-2">
                Follow Us
              </h2>
              <p className="text-slate-500 text-sm">
                Stay updated with the latest news, events and achievements
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 bg-white border border-[#e8e8e8] rounded-xl text-[#0B1F3A] font-bold text-sm hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
              >
                <IconFacebook size={20} /> Facebook
              </a>
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 bg-white border border-[#e8e8e8] rounded-xl text-[#0B1F3A] font-bold text-sm hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all"
              >
                <IconInstagram size={20} /> Instagram
              </a>
              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 bg-white border border-[#e8e8e8] rounded-xl text-[#0B1F3A] font-bold text-sm hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition-all"
              >
                <IconYoutube size={20} /> YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
