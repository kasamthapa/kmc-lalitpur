// app/sitemap.ts
// Next.js automatically serves this as /sitemap.xml
// Submit this URL to Google Search Console and Bing Webmaster Tools

import type { MetadataRoute } from "next";
import { prisma } from "./lib/prisma";

const BASE_URL = "https://kmclalitpur.edu.np";

// Frequency and priority guide:
// changeFrequency: how often the page content changes
// priority: 1.0 = most important, 0.1 = least important
// Google uses priority as a hint, not a guarantee
// Note: hash fragments (#section) are NOT valid in sitemaps — removed.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // ── Dynamic blog post URLs ───────────────────────────────────────────────────
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    blogEntries = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt.toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB unavailable at build time — skip dynamic entries gracefully
  }

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
      url: `${BASE_URL}/careers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // ── Dynamic blog posts ───────────────────────────────────────────────────
    ...blogEntries,
  ];
}
