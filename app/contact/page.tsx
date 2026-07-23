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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear field error on change
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => { const next = { ...prev }; delete next[e.target.name]; return next; });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();

      if (!res.ok) {
        if (json.errors && Object.keys(json.errors).length > 0) {
          setFieldErrors(json.errors);
        } else {
          setServerError(json.message ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
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
      <section className="relative pt-28 pb-20 bg-[#1B3E72] overflow-hidden">
        <div className="absolute top-0 right-0 w-100 h-100 rounded-full bg-amber-400/8 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-10 text-sm text-[#8ba7c7]">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="text-[#8ba7c7]/50">/</span>
            <span className="text-amber-400 font-medium">Contact</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
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
            {/* Quick contact strip on desktop */}
            <div className="space-y-4">
              <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-amber-400 shrink-0 group-hover:border-amber-400 transition-colors">
                  <IconPhone size={16} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="text-white font-semibold text-sm group-hover:text-amber-400 transition-colors">{SITE_CONFIG.phone}</p>
                </div>
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-amber-400 shrink-0 group-hover:border-amber-400 transition-colors">
                  <IconMail size={16} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-white font-semibold text-sm group-hover:text-amber-400 transition-colors">{SITE_CONFIG.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                  <IconClock size={16} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Office Hours</p>
                  <p className="text-white font-semibold text-sm">Sun – Fri: 8 AM – 5 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form + map — split layout */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form — wider column */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#1B3E72] leading-tight mb-2">
                  Send Us a Message
                </h2>
                <div className="w-10 h-0.5 bg-amber-400 mt-3" />
              </div>

              {submitted ? (
                <div className="bg-white p-10 border border-[#e8e8e8] text-center">
                  <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-5 text-[#1B3E72]">
                    <IconCheck />
                  </div>
                  <h3 className="text-xl font-bold text-[#1B3E72] mb-3">
                    Message Sent
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Thank you for reaching out. Our team will get back to you
                    within 24 hours on working days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFieldErrors({});
                      setServerError("");
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
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#1B3E72] mb-2 uppercase tracking-wider">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full px-4 py-3 border-b-2 bg-white text-sm text-[#1B3E72] placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors ${fieldErrors.name ? "border-red-400" : "border-[#e0dcd4]"}`}
                      />
                      {fieldErrors.name && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1B3E72] mb-2 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+977"
                        className="w-full px-4 py-3 border-b-2 border-[#e0dcd4] bg-white text-sm text-[#1B3E72] placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1B3E72] mb-2 uppercase tracking-wider">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 border-b-2 bg-white text-sm text-[#1B3E72] placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors ${fieldErrors.email ? "border-red-400" : "border-[#e0dcd4]"}`}
                    />
                    {fieldErrors.email && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.email}</p>}
                  </div>

                  {/* Subject + Stream */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#1B3E72] mb-2 uppercase tracking-wider">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className={`w-full px-4 py-3 border-b-2 bg-white text-sm text-[#1B3E72] placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors ${fieldErrors.subject ? "border-red-400" : "border-[#e0dcd4]"}`}
                      />
                      {fieldErrors.subject && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.subject}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1B3E72] mb-2 uppercase tracking-wider">
                        Interested Stream
                      </label>
                      <select
                        name="stream"
                        value={formData.stream}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-b-2 border-[#e0dcd4] bg-white text-sm text-[#1B3E72] focus:outline-none focus:border-amber-400 transition-colors"
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
                    <label className="block text-xs font-semibold text-[#1B3E72] mb-2 uppercase tracking-wider">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className={`w-full px-4 py-3 border-b-2 bg-white text-sm text-[#1B3E72] placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors resize-none ${fieldErrors.message ? "border-red-400" : "border-[#e0dcd4]"}`}
                    />
                    {fieldErrors.message && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.message}</p>}
                  </div>

                  {serverError && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-200 px-4 py-3">
                      {serverError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-[#1B3E72] font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-400/20"
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

                  <p className="text-xs text-slate-400">
                    We respond within 24 hours on working days. For urgent
                    enquiries call{" "}
                    <a
                      href={SITE_CONFIG.phoneHref}
                      className="text-amber-600 font-semibold"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </p>
                </form>
              )}
            </div>

            {/* Info column — narrower */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Map */}
              <div>
                <h3 className="font-bold text-[#1B3E72] mb-4 text-lg">Visit Our Campus</h3>
                <div className="overflow-hidden border border-[#e8e8e8] h-56">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?q=Kathmandu+Model+Secondary+School,+Balkumari,+Lalitpur,+Nepal&output=embed&z=17"
                    title="KMC Lalitpur Location - Kathmandu Model Secondary School"
                  />
                </div>
                <a
                  href="https://maps.google.com/?q=Balkumari,Lalitpur,Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#1B3E72] hover:text-amber-600 transition-colors"
                >
                  <IconMapPin size={16} />
                  Get Directions on Google Maps
                </a>
              </div>

              {/* Contact info — clean list, no card borders */}
              <div>
                <h3 className="font-bold text-[#1B3E72] mb-5 text-lg">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="text-amber-500 mt-0.5 shrink-0"><IconPhone size={18} /></span>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
                      <a href={SITE_CONFIG.phoneHref} className="text-sm text-[#1B3E72] font-semibold hover:text-amber-600 transition-colors">{SITE_CONFIG.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-amber-500 mt-0.5 shrink-0"><IconMail size={18} /></span>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm text-[#1B3E72] font-semibold hover:text-amber-600 transition-colors block">{SITE_CONFIG.email}</a>
                      <a href={`mailto:admissions@${SITE_CONFIG.email.split("@")[1]}`} className="text-sm text-slate-500 hover:text-amber-600 transition-colors block mt-0.5">{`admissions@${SITE_CONFIG.email.split("@")[1]}`}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-amber-500 mt-0.5 shrink-0"><IconMapPin size={18} /></span>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Address</p>
                      <a href={SITE_CONFIG.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1B3E72] font-semibold hover:text-amber-600 transition-colors">
                        {SITE_CONFIG.address.streetAddress}, {SITE_CONFIG.address.addressLocality}
                      </a>
                      <p className="text-xs text-slate-400 mt-0.5">Kathmandu Valley, Nepal</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-amber-500 mt-0.5 shrink-0"><IconClock size={18} /></span>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Office Hours</p>
                      <p className="text-sm text-[#1B3E72] font-semibold">Sun – Fri: 8 AM – 5 PM</p>
                      <p className="text-sm text-slate-500 mt-0.5">Saturday: 10 AM – 3 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department contacts — minimal */}
              <div>
                <h3 className="font-bold text-[#1B3E72] mb-4 text-lg">By Department</h3>
                <div className="space-y-3">
                  {departments.map((dept, i) => (
                    <div key={i} className="pb-3 border-b border-[#eae6de] last:border-0">
                      <p className="font-semibold text-[#1B3E72] text-sm mb-1">{dept.name}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <a href={`tel:${dept.phone.replace(/[^+\d]/g, "")}`} className="text-xs text-slate-500 hover:text-amber-600 transition-colors">{dept.phone}</a>
                        <a href={`mailto:${dept.email}`} className="text-xs text-slate-500 hover:text-amber-600 transition-colors">{dept.email}</a>
                        <span className="text-xs text-slate-400">{dept.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-[#1B3E72] p-10 md:p-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Chat With Us on WhatsApp
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                  Get instant answers to your questions. Our admissions team
                  typically replies within an hour during working hours.
                </p>
              </div>
              <div className="w-14 h-14 bg-[#25D366] flex items-center justify-center shrink-0 text-white">
                <IconWhatsAppSVG size={20} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {waActions.map((action) => (
                <a
                  key={action.label}
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(action.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-white/10 p-4 hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-200 group"
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
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
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
      <section className="py-14 bg-[#f7f5f0] border-t border-[#eae6de]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-xl font-bold text-[#1B3E72] mb-1">
                Follow Us
              </h2>
              <p className="text-slate-500 text-sm">
                Stay updated with the latest news, events and achievements
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 bg-white border border-[#e8e8e8] text-[#1B3E72] font-bold text-sm hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
              >
                <IconFacebook size={20} /> Facebook
              </a>
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 bg-white border border-[#e8e8e8] text-[#1B3E72] font-bold text-sm hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all"
              >
                <IconInstagram size={20} /> Instagram
              </a>
              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 bg-white border border-[#e8e8e8] text-[#1B3E72] font-bold text-sm hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition-all"
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
