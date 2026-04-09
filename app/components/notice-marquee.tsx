"use client";

import { useEffect, useState } from "react";

const FALLBACK = [
  "🎓 Admissions Open for 2082/83 Academic Year",
  "📢 Entrance Exam Registration Available Online",
  "🏆 KMC Lalitpur — Ministry of Education Excellence Award Winner",
  "📚 100% NEB Pass Rate — Consistently Every Year",
  "🌟 Scholarships Available — Merit & Need Based",
  "📞 Call +977-1-5918595 for Admission Enquiries",
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
    <div className="bg-amber-400 text-[#0B1F3A] py-3 overflow-hidden">
      <div className="flex gap-16 animate-marquee whitespace-nowrap px-4">
        {displayed.map((text, i) => (
          <span key={i} className="text-sm font-semibold inline-block">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
