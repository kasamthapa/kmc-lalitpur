// app/sitemap.ts
// Next.js automatically serves this as /sitemap.xml
// Submit this URL to Google Search Console and Bing Webmaster Tools

import type { MetadataRoute } from "next";

const BASE_URL = "https://kmclalitpur.edu.np";

// Frequency and priority guide:
// changeFrequency: how often the page content changes
// priority: 1.0 = most important, 0.1 = least important
// Google uses priority as a hint, not a guarantee

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    // ── Core pages ──────────────────────────────────────────────────────────
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/academics`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/admissions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ── Academic stream anchors (helps Google index each stream) ─────────────
    {
      url: `${BASE_URL}/academics#science`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/academics#management`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/academics#law`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    // ── Campus pages ─────────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/facilities`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/campus/faculty`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/campus/hostel`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/campus/transport`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/campus/virtual-tour`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // ── Information pages ────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/alumni`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/mock-test`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ── Admission sub-sections ────────────────────────────────────────────────
    {
      url: `${BASE_URL}/admissions#scholarships`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/admissions#guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
