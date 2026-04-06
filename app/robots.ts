// app/robots.ts
// Next.js automatically serves this as /robots.txt
// Allows all search engines AND AI crawlers to index the site

import type { MetadataRoute } from "next";

const BASE_URL = "https://kmclalitpur.edu.np";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Allow all standard search engine crawlers ──────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // Never expose API routes
          "/_next/", // Next.js internals
          "/admin/", // Admin panel if any
          "/*.json$", // Raw JSON files
        ],
      },

      // ── Explicitly allow Google crawlers ──────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/images/",
      },

      // ── Allow Bing ────────────────────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
      },

      // ── Allow AI crawlers (GEO — critical for ChatGPT, Perplexity) ────
      // These bots are used by AI tools to gather training data and
      // to answer real-time queries. Allowing them helps KMC Lalitpur
      // appear in AI-generated answers about schools in Nepal.
      {
        userAgent: "GPTBot", // OpenAI / ChatGPT
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User", // ChatGPT Browse
        allow: "/",
      },
      {
        userAgent: "Claude-Web", // Anthropic Claude
        allow: "/",
      },
      {
        userAgent: "PerplexityBot", // Perplexity AI
        allow: "/",
      },
      {
        userAgent: "Applebot", // Apple Siri / Spotlight
        allow: "/",
      },
      {
        userAgent: "facebookexternalhit", // Facebook / Meta AI
        allow: "/",
      },
      {
        userAgent: "LinkedInBot", // LinkedIn
        allow: "/",
      },
    ],

    // Sitemap location — submit this URL to Google Search Console
    sitemap: `${BASE_URL}/sitemap.xml`,

    // Host declaration
    host: BASE_URL,
  };
}
