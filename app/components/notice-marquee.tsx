"use client";

import { useEffect, useState } from "react";

const FALLBACK = [


  "🏆 KMC Lalitpur — Ministry of Education Excellence Award Winner",
  "📚 97% NEB Pass Rate — Consistently Every Year",
  "🌟 Merit & Need-Based Scholarships Available",
  "📞 Call +977-1-5201331 for Admission Enquiries",
];

export function NoticeMarquee() {
  const [items, setItems] = useState<string[]>(FALLBACK);

  useEffect(() => {
    fetch("/api/notices")
      .then((r) => r.ok ? r.json() : null)
      .then((json) => {
        const data: { text: string }[] = json?.data ?? [];
        if (data.length > 0) setItems(data.map((n) => n.text));
      })
      .catch(() => {/* keep fallback */});
  }, []);

  // Duplicate items so the marquee loops seamlessly
  const displayed = [...items, ...items];

  return (
    <div className="bg-amber-400 text-[#101F46] py-3 overflow-hidden group">
      <div className="flex gap-16 animate-marquee group-hover:animate-marquee-pause whitespace-nowrap">
        {displayed.map((text, i) => (
          <span key={i} className="text-sm font-semibold inline-block shrink-0 pl-4">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
