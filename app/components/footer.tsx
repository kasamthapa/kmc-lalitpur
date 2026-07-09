"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "../config/site";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconFacebook,
  IconInstagram,
  IconYoutube,
  IconArrow,
  IconLock,
} from "./icons";

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
              <div className="relative h-12 w-52">
                <Image
                  src="/logo.png"
                  alt="KMC Lalitpur"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-xs">
              Kathmandu Model Secondary School serves +2 students through the
              same KMC academic family in Lalitpur and Kathmandu, delivering
              Science, Management, and Law programs since{" "}
              {SITE_CONFIG.foundingYear}.
            </p>

            {/* Campus contacts */}
            <div className="space-y-5 text-sm mb-6">
              {SITE_CONFIG.campuses.map((campus) => (
                <div key={campus.name}>
                  <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                    {campus.footerHeading}
                  </h5>
                  <ul className="space-y-2.5">
                    <li>
                      <a
                        href={campus.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 hover:text-amber-400 transition-colors"
                      >
                        <span className="text-amber-400 shrink-0 mt-0.5">
                          <IconMapPin size={16} />
                        </span>
                        {campus.location}
                      </a>
                    </li>
                    <li>
                      <a
                        href={campus.phoneHref}
                        className="flex items-center gap-3 hover:text-amber-400 transition-colors"
                      >
                        <span className="text-amber-400 shrink-0">
                          <IconPhone size={16} />
                        </span>
                        {campus.phone}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${campus.email}`}
                        className="flex items-center gap-3 hover:text-amber-400 transition-colors"
                      >
                        <span className="text-amber-400 shrink-0">
                          <IconMail size={16} />
                        </span>
                        {campus.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={campus.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        {campus.website.replace("https://", "")}
                        <IconArrow size={12} />
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-400 hover:text-[#0B1F3A] text-slate-300 transition-all duration-200"
              >
                <IconFacebook size={18} />
              </a>
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-400 hover:text-[#0B1F3A] text-slate-300 transition-all duration-200"
              >
                <IconInstagram size={18} />
              </a>
              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-400 hover:text-[#0B1F3A] text-slate-300 transition-all duration-200"
              >
                <IconYoutube size={18} />
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
                      <IconArrow size={14} />
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
                      <IconArrow size={14} />
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
                      <IconArrow size={14} />
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
              {SITE_CONFIG.hours.display.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="text-white font-medium">{h.time}</span>
                </li>
              ))}
            </ul>

            {/* Admission CTA */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-white font-bold text-sm mb-2">
                Admissions Open
              </p>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Apply now for the 2083 academic year. Limited seats
                available.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-400 text-[#0B1F3A] font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors w-full justify-center"
              >
                Apply Now
                <IconArrow size={14} />
              </Link>
            </div>

            {/* EMIS */}
            <a
              href={SITE_CONFIG.emisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 border border-white/20 text-xs font-semibold text-slate-400 rounded-lg hover:text-white hover:border-white/40 transition-colors"
            >
              <IconLock size={12} />
              EMIS Student Login
            </a>
          </div>
        </div>

        {/* ── Divider + bottom bar ─────────────────────────────────────── */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {currentYear} Kathmandu Model Secondary School. KMC Lalitpur
              and KMC Bagbazar. All rights reserved.
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
