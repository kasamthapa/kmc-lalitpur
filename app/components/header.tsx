"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { SITE_CONFIG } from "../config/site";
import {
  IconMenu,
  IconX,
  IconChevron,
  IconArrow,
  IconLock,
  IconPhone,
} from "./icons";

// ─── Nav structure ────────────────────────────────────────────────────────────
const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    dropdown: [
      { label: "Our Story", href: "/about" },
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Principal's Message", href: "/about#principal" },
      { label: "Alumni", href: "/alumni" },
    ],
  },
  {
    label: "Campus",
    dropdown: [
      { label: "Facilities", href: "/facilities" },
      { label: "Faculty", href: "/campus/faculty" },
      { label: "Student Committee", href: "/campus/student-committee" },
      { label: "Virtual Tour", href: "/campus/virtual-tour" },
      { label: "Hostel", href: "/campus/hostel" },
      { label: "Transport", href: "/campus/transport" },
    ],
  },
  {
    label: "Academics",
    dropdown: [
      { label: "Science Stream", href: "/academics#science" },
      { label: "Management Stream", href: "/academics#management" },
      { label: "Law Stream", href: "/academics#law" },
    ],
  },
  { label: "Admissions", href: "/admissions" },
  { label: "Careers", href: "/careers" },
  {
    label: "Media",
    dropdown: [
      { label: "News & Events", href: "/news" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "FAQ", href: "/faq" },
];

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function DropdownMenu({
  items,
  visible,
}: {
  items: { label: string; href: string }[];
  visible: boolean;
}) {
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-xl border border-[#e8e8e8] overflow-hidden transition-all duration-200 origin-top ${
        visible
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
      style={{ zIndex: 100 }}
    >
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-[#e8e8e8] rotate-45" />
      <ul className="py-2 relative">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f7f5f0] hover:text-[#0B1F3A] font-medium transition-colors group"
            >
              {item.label}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C9A84C]">
                <IconArrow size={13} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Mobile accordion ─────────────────────────────────────────────────────────
function MobileAccordion({
  label,
  items,
  onClose,
}: {
  label: string;
  items: { label: string; href: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#f0ece4]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3.5 text-[#0B1F3A] font-semibold text-sm"
      >
        {label}
        <IconChevron open={open} />
      </button>
      {open && (
        <ul className="pb-2 pl-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-2.5 text-sm text-[#6b7280] hover:text-[#C9A84C] transition-colors font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeDropdownRef = useRef<string | null>(null);
  activeDropdownRef.current = activeDropdown;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (activeDropdownRef.current !== null) setActiveDropdown(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const openDropdown = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#eae6de] transition-shadow duration-200 ${scrolled ? "shadow-md" : ""}`}
    >
      {/* Top bar */}
      <div className="bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-9">
          <a
            href={SITE_CONFIG.phoneHref}
            className="flex items-center gap-1.5 text-xs text-[#8ba7c7] hover:text-white transition-colors font-medium"
          >
            <IconPhone size={13} />
            {SITE_CONFIG.phone}
          </a>
          <div className="flex items-center gap-5">
            <a
              href={SITE_CONFIG.emisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#C9A84C] hover:text-white transition-colors tracking-wide"
            >
              <IconLock size={13} />
              EMIS Login
            </a>
            <span className="h-3.5 w-px bg-white/20" />
            <Link
              href="/faq"
              className="text-xs text-[#8ba7c7] hover:text-white transition-colors font-medium"
            >
              FAQ
            </Link>
            <span className="h-3.5 w-px bg-white/20" />
            <Link
              href="/alumni"
              className="text-xs text-[#8ba7c7] hover:text-white transition-colors font-medium"
            >
              Alumni
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center hover:opacity-85 transition-opacity shrink-0"
        >
          <div className="relative h-11 w-48">
            <Image
              src="/logo.png"
              alt="Kathmandu Model Secondary School - KMC Lalitpur"
              fill
              sizes="192px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openDropdown(item.label)}
                onMouseLeave={closeDropdown}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    activeDropdown === item.label
                      ? "text-[#0B1F3A] bg-[#f7f5f0]"
                      : "text-[#374151] hover:text-[#0B1F3A] hover:bg-[#f7f5f0]"
                  }`}
                >
                  {item.label}
                  <IconChevron open={activeDropdown === item.label} />
                </button>
                <DropdownMenu
                  items={item.dropdown}
                  visible={activeDropdown === item.label}
                />
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="px-3 py-2 text-sm font-semibold text-[#374151] hover:text-[#0B1F3A] hover:bg-[#f7f5f0] rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/admissions"
            className="px-4 py-2 text-sm font-bold text-[#0B1F3A] border border-[#0B1F3A]/20 rounded-lg hover:bg-[#f7f5f0] transition-colors"
          >
            Apply Now
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2 bg-[#C9A84C] text-[#0B1F3A] font-bold text-sm rounded-lg hover:bg-[#d4b560] transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[#0B1F3A] hover:bg-[#f7f5f0] rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <IconX size={22} /> : <IconMenu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-white border-t border-[#eae6de] overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-175 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-5 pb-6 pt-2 overflow-y-auto max-h-[80vh]">
          {navItems.map((item) =>
            item.dropdown ? (
              <MobileAccordion
                key={item.label}
                label={item.label}
                items={item.dropdown}
                onClose={closeMobile}
              />
            ) : (
              <div key={item.label} className="border-b border-[#f0ece4]">
                <Link
                  href={item.href!}
                  onClick={closeMobile}
                  className="block py-3.5 text-sm font-semibold text-[#0B1F3A] hover:text-[#C9A84C] transition-colors"
                >
                  {item.label}
                </Link>
              </div>
            ),
          )}

          <div className="pt-5 flex flex-col gap-3">
            <a
              href={SITE_CONFIG.emisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 border border-[#0B1F3A]/20 text-[#0B1F3A] font-semibold text-sm rounded-xl hover:bg-[#f7f5f0] transition-colors"
            >
              <IconLock size={13} />
              EMIS Login
            </a>
            <Link
              href="/admissions"
              onClick={closeMobile}
              className="w-full py-3 border border-[#C9A84C] text-[#C9A84C] font-bold text-sm rounded-xl text-center hover:bg-[#C9A84C]/10 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              onClick={closeMobile}
              className="w-full py-3 bg-[#C9A84C] text-[#0B1F3A] font-bold text-sm rounded-xl text-center hover:bg-[#d4b560] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
