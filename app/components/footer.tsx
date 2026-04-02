"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import Image from "next/image";
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/"
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <div className="relative h-16 w-auto">
                  <Image
                    src="/logo.png"
                    alt="Kathmandu Model Secondary School"
                    height={64}
                    width={240}
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>
            <p className="text-sm leading-relaxed">
              Kathmandu Model Secondary School - delivering world-class
              education with excellence, innovation, and character development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:text-amber-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/academics"
                  className="hover:text-amber-400 transition-colors"
                >
                  Academic Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions"
                  className="hover:text-amber-400 transition-colors"
                >
                  Admissions
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-amber-400 transition-colors"
                >
                  News & Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-white mb-6">Programs</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/academics"
                  className="hover:text-amber-400 transition-colors"
                >
                  Science Stream
                </Link>
              </li>
              <li>
                <Link
                  href="/academics"
                  className="hover:text-amber-400 transition-colors"
                >
                  Management Stream
                </Link>
              </li>
              <li>
                <Link
                  href="/academics"
                  className="hover:text-amber-400 transition-colors"
                >
                  Law Stream
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions"
                  className="hover:text-amber-400 transition-colors"
                >
                  Scholarship Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone size={18} className="flex-shrink-0 text-amber-400" />
                <span>+977-1-5918595</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="flex-shrink-0 text-amber-400" />
                <a
                  href="mailto:info@kmclalitpur.edu.np"
                  className="hover:text-amber-400 transition-colors"
                >
                  info@kmclalitpur.edu.np
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="flex-shrink-0 text-amber-400" />
                <span>Lalitpur, Kathmandu Valley</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-all duration-300"
              >
                <SiFacebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-all duration-300"
              >
                <SiInstagram size={18} />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm">
              <p>
                © {currentYear} Kathmandu Model Secondary School. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
