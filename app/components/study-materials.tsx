"use client";

import { useState } from "react";

const IconBook = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 7h8M8 11h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export function StudyMaterialsFloat() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex items-center justify-end">
      {/* Tooltip — slides in from right on hover */}
      <div
        className={`absolute right-[68px] transition-all duration-200 pointer-events-none ${
          hovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2"
        }`}
      >
        <div className="bg-[#0B1F3A] text-white text-xs font-semibold px-3 py-1.5 whitespace-nowrap shadow-lg">
          Study Materials
          {/* Arrow pointing right */}
          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#0B1F3A]" />
        </div>
      </div>

      {/* Button */}
      <a
        href="https://bit.ly/welcomeToKMC"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Study Materials"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-14 h-14 rounded-[18px] bg-amber-400 text-[#0B1F3A] shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 hover:bg-amber-300"
      >
        {/* Subtle pulse ring */}
        <span className="absolute inset-0 rounded-[18px] bg-amber-400 animate-ping opacity-30" />
        <IconBook />
      </a>
    </div>
  );
}
