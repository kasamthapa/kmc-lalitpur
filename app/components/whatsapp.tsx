"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// ─── WhatsApp PNG Icon ────────────────────────────────────────────────────────
// Place the uploaded PNG at: public/whatsapp.png
const IconWhatsApp = ({ size = 28 }: { size?: number }) => (
  <Image
    src="/images/whatsapp.png"
    alt="WhatsApp"
    width={size}
    height={size}
    className="rounded-lg"
    style={{ width: size, height: size }}
  />
);

const IconX = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconArrow = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ─── Quick actions ────────────────────────────────────────────────────────────

const actions = [
  {
    label: "Admission Info",
    desc: "Learn about how to apply",
    message: "I want to know about admissions",
    emoji: "🎓",
  },
  {
    label: "Brochure Request",
    desc: "Get our school brochure",
    message: "Please send me the KMC brochure",
    emoji: "📄",
  },
  {
    label: "Campus Visit",
    desc: "Schedule a tour",
    message: "I would like to schedule a campus visit",
    emoji: "🏫",
  },
  {
    label: "Scholarship Info",
    desc: "Explore financial aid",
    message: "I want to know about scholarships at KMC",
    emoji: "🏆",
  },
];

const WA_NUMBER = "9779851138595";

function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // Stop pulse after first open
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setPulse(false);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* ── Expanded panel ─────────────────────────────────────────────── */}
      <div
        className={`transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-[#e8e8e8] w-72 overflow-hidden">
          {/* Panel header */}
          <div className="bg-[#128C7E] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <IconWhatsApp size={32} />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">
                  KMC Lalitpur
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block" />
                  <p className="text-white/80 text-xs">
                    Typically replies instantly
                  </p>
                </div>
              </div>
            </div>
            <p className="text-white/70 text-xs mt-3 leading-relaxed">
              Hi there 👋 How can we help you today? Choose a topic below or
              send us a custom message.
            </p>
          </div>

          {/* Action list */}
          <ul className="divide-y divide-[#f0ece4]">
            {actions.map((action) => (
              <li key={action.label}>
                <a
                  href={waLink(action.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#f7f5f0] transition-colors group"
                >
                  <span
                    className="text-xl w-8 text-center flex-shrink-0"
                    aria-hidden
                  >
                    {action.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0B1F3A] group-hover:text-[#128C7E] transition-colors leading-tight">
                      {action.label}
                    </p>
                    <p className="text-xs text-[#6b7280] mt-0.5">
                      {action.desc}
                    </p>
                  </div>
                  <span className="text-[#128C7E] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <IconArrow />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Custom message footer */}
          <div className="px-5 py-4 bg-[#f7f5f0] border-t border-[#e8e8e8]">
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white text-sm font-bold rounded-xl hover:bg-[#128C7E] transition-colors"
            >
              <IconWhatsApp size={18} />
              Send a Custom Message
            </a>
          </div>
        </div>
      </div>

      {/* ── Floating button ─────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close WhatsApp menu" : "Open WhatsApp chat"}
        className={`relative w-14 h-14 rounded-[18px] bg-transparent shadow-lg transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95 ${
          open ? "rotate-0" : ""
        }`}
      >
        {/* Pulse ring — shows until first interaction */}
        {pulse && !open && (
          <>
            <span className="absolute inset-0 rounded-[18px] bg-[#25D366] animate-ping opacity-40" />
            <span className="absolute inset-0 rounded-[18px] bg-[#25D366] animate-ping opacity-20 animation-delay-300" />
          </>
        )}

        <span
          className={`transition-all duration-200 ${open ? "scale-0 opacity-0 absolute" : "scale-100 opacity-100"}`}
        >
          <IconWhatsApp size={56} />
        </span>
        <span
          className={`transition-all duration-200 w-14 h-14 rounded-[18px] bg-[#128C7E] text-white flex items-center justify-center ${open ? "scale-100 opacity-100" : "scale-0 opacity-0 absolute"}`}
        >
          <IconX />
        </span>
      </button>
    </div>
  );
}
