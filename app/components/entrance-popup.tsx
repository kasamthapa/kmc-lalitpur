"use client";

import { useEffect, useState } from "react";
import { IconX, IconArrow } from "./icons";

const PORTAL_URL = "https://app.kmclalitpur.edu.np/applicant/login";
const SESSION_KEY = "kmc_entrance_popup_dismissed";

export function EntrancePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={dismiss}
    >
      {/* Card */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <IconX size={14} />
        </button>

        <div className="px-8 py-8">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-5 uppercase tracking-wide">
            🎓 2083 Admissions Open
          </span>

          <h2 className="text-2xl font-bold text-[#0B1F3A] leading-tight mb-3">
            Entrance Examination<br />Applications Now Open
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed mb-7">
            Apply for Science, Management, or Law stream at KMC Lalitpur.
            Limited seats available — fill in your details on our secure
            admissions portal.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {[
              { label: "Science", color: "bg-blue-50 text-blue-700" },
              { label: "Management", color: "bg-emerald-50 text-emerald-700" },
              { label: "Law", color: "bg-amber-50 text-amber-700" },
            ].map((s) => (
              <div key={s.label} className={`${s.color} rounded-xl px-3 py-2 text-xs font-bold text-center`}>
                {s.label}
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#0B1F3A] hover:bg-[#162e57] text-white font-bold rounded-xl transition-colors"
          >
            Apply Now
            <IconArrow size={16} />
          </a>

          <button
            onClick={dismiss}
            className="mt-3 w-full text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
