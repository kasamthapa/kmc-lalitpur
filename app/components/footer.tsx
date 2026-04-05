"use client";

import Link from "next/link";
import Image from "next/image";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconPhone = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.42 2 2 0 0 1 3.58 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconMapPin = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const IconInstagram = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const IconYoutube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const IconArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1F3A] text-slate-300">
      {/* ── Main footer content ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column — spans 2 on lg */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block mb-5 hover:opacity-80 transition-opacity"
            >
              <div className="relative h-14 w-48">
                <Image
                  src="/logo.png"
                  alt="KMC Lalitpur"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-xs">
              Kathmandu Model Secondary School, Balkumari, Lalitpur — delivering
              academic excellence through Science, Management, Humanities, and
              Law programs since 2000.
            </p>

            {/* Contact info */}
            <ul className="space-y-3 text-sm mb-6">
              <li>
                <a
                  href="tel:+97715918595"
                  className="flex items-center gap-3 hover:text-amber-400 transition-colors group"
                >
                  <span className="text-amber-400 flex-shrink-0">
                    <IconPhone />
                  </span>
                  +977-1-5918595
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@kmclalitpur.edu.np"
                  className="flex items-center gap-3 hover:text-amber-400 transition-colors"
                >
                  <span className="text-amber-400 flex-shrink-0">
                    <IconMail />
                  </span>
                  info@kmclalitpur.edu.np
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Balkumari,Lalitpur,Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-amber-400 transition-colors"
                >
                  <span className="text-amber-400 flex-shrink-0 mt-0.5">
                    <IconMapPin />
                  </span>
                  Balkumari, Lalitpur, Kathmandu Valley, Nepal
                </a>
              </li>
            </ul>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/kmcbagbazar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-400 hover:text-[#0B1F3A] text-slate-300 transition-all duration-200"
              >
                <IconFacebook />
              </a>
              <a
                href="https://www.instagram.com/kmclalitpur"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-400 hover:text-[#0B1F3A] text-slate-300 transition-all duration-200"
              >
                <IconInstagram />
              </a>
              <a
                href="https://www.youtube.com/@kmclalitpur"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-400 hover:text-[#0B1F3A] text-slate-300 transition-all duration-200"
              >
                <IconYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Admissions", href: "/admissions" },
                { label: "News & Events", href: "/news" },
                { label: "Photo Gallery", href: "/gallery" },
                { label: "FAQ", href: "/faq" },
                { label: "Alumni", href: "/alumni" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 hover:text-amber-400 transition-colors group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400">
                      <IconArrow />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wider uppercase">
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Science Stream", href: "/academics#science" },
                { label: "Management Stream", href: "/academics#management" },
                { label: "Humanities Stream", href: "/academics#humanities" },
                { label: "Law Stream", href: "/academics#law" },
                { label: "Scholarship Info", href: "/admissions#scholarships" },
                { label: "Entrance Exam Guide", href: "/admissions#guide" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 hover:text-amber-400 transition-colors group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400">
                      <IconArrow />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-bold text-white mt-8 mb-5 text-sm tracking-wider uppercase">
              Campus
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Facilities", href: "/facilities" },
                { label: "Faculty", href: "/campus/faculty" },
                { label: "Hostel", href: "/campus/hostel" },
                { label: "Transport", href: "/campus/transport" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 hover:text-amber-400 transition-colors group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400">
                      <IconArrow />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office hours + CTA */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wider uppercase">
              Office Hours
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 mb-8">
              <li className="flex justify-between gap-4">
                <span>Sunday – Friday</span>
                <span className="text-white font-medium">8 AM – 5 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Saturday</span>
                <span className="text-white font-medium">10 AM – 3 PM</span>
              </li>
            </ul>

            {/* Admission CTA */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-white font-bold text-sm mb-2">
                Admissions Open
              </p>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Apply now for the 2082/83 academic year. Limited seats
                available.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-400 text-[#0B1F3A] font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors w-full justify-center"
              >
                Apply Now
                <IconArrow />
              </Link>
            </div>

            {/* EMIS */}
            <a
              href="https://emis.gov.np"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 border border-white/20 text-xs font-semibold text-slate-400 rounded-lg hover:text-white hover:border-white/40 transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              EMIS Student Login
            </a>
          </div>
        </div>

        {/* ── Divider + bottom bar ─────────────────────────────────────── */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {currentYear} Kathmandu Model Secondary School, Balkumari,
              Lalitpur. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/faq"
                className="hover:text-amber-400 transition-colors"
              >
                FAQ
              </Link>
              <span>·</span>
              <Link
                href="/contact"
                className="hover:text-amber-400 transition-colors"
              >
                Contact
              </Link>
              <span>·</span>
              <Link
                href="/admissions"
                className="hover:text-amber-400 transition-colors"
              >
                Admissions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
