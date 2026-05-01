import type { Metadata } from "next";
import { prisma } from "@/app/lib/prisma";

// Re-render at most every 60 s — reduces Neon cold-start hits
export const revalidate = 60;
import { NewsClient, type NewsArticle, type NoticeCard } from "./_components/NewsClient";
import { EventSchema } from "@/app/components/schema";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Latest news, events, achievements, and official notices from KMC Lalitpur — Kathmandu Model Secondary School.",
};

// Hardcoded fallback — shown when no published news exists in the DB yet
const FALLBACK_NEWS: NewsArticle[] = [
  {
    id: "1",
    slug: "kmc-talent-innovation-expo-2082",
    title: "KMC Talent and Innovation Expo 2082",
    description:
      "Successfully completed the KMC Talent and Innovation Expo 2082 at KMC Lalitpur on 12th Mangshir. Students showcased projects spanning science, technology, arts, and entrepreneurship.",
    date: "February 2, 2026",
    category: "Events",
    image: "/images/news4.png",
    featured: true,
  },
  {
    id: "2",
    slug: "kmc-olympiad-2082",
    title: "Celebrating Mathematical Talent: KMC Lalitpur Olympiad 2082",
    description:
      "KMC Lalitpur proudly organized the Olympiad 2082 to celebrate and nurture mathematical excellence among students.",
    date: "January 30, 2026",
    category: "Academic",
    image: "/images/news1.png",
    featured: false,
  },
  {
    id: "3",
    slug: "theme-drama-competition-2082",
    title: "Theme Drama Competition 2082 — A Showcase of Student Creativity",
    description:
      "The Theme Drama Competition 2082 was successfully conducted on 26th Mangshir at the KMC Seminar Hall.",
    date: "February 2, 2026",
    category: "Cultural Events",
    image: "/images/news3.png",
    featured: false,
  },
  {
    id: "4",
    slug: "world-ngo-day-celebration",
    title: "World NGO Day Celebration — Building Partnerships for Change",
    description:
      "Students engaged in community service and social responsibility initiatives.",
    date: "February 1, 2026",
    category: "Community",
    image: "/images/news5.png",
    featured: false,
  },
  {
    id: "5",
    slug: "kmc-student-catalyst-committee-debate",
    title: "KMC Student Catalyst Committee Celebrates Young Orators",
    description:
      "The KMC Student Catalyst Committee successfully organized a Debate & Speech Event.",
    date: "January 28, 2026",
    category: "Academic",
    image: "/images/news3.png",
    featured: false,
  },
];

// Hardcoded fallback notices (notice board on /news — different from homepage marquee)
const FALLBACK_NOTICES: NoticeCard[] = [
  { id: 1, title: "Admission Open for 2082/83 Academic Year", date: "April 1, 2026", type: "Admissions", urgent: true },
  { id: 2, title: "Scholarship Examination Date: Baisakh 20, 2082", date: "March 28, 2026", type: "Examination", urgent: true },
  { id: 3, title: "Fee Payment Deadline — Chaitra 30", date: "March 20, 2026", type: "Finance", urgent: false },
  { id: 4, title: "Annual Sports Day — Baisakh 12, 2082", date: "March 15, 2026", type: "Events", urgent: false },
  { id: 5, title: "NEB Practical Examination Schedule Released", date: "March 10, 2026", type: "Examination", urgent: false },
  { id: 6, title: "Hostel Application Deadline — Chaitra 25", date: "March 5, 2026", type: "Hostel", urgent: false },
];

async function getNews(): Promise<NewsArticle[]> {
  try {
    const rows = await prisma.news.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      select: {
        id: true, title: true, slug: true, description: true,
        category: true, imageUrl: true, featured: true, createdAt: true,
      },
    });

    if (rows.length === 0) return FALLBACK_NEWS;

    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      description: r.description,
      date: r.createdAt.toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      }),
      category: r.category,
      image: r.imageUrl,
      featured: r.featured,
    }));
  } catch (err) {
    console.error("[news page] DB fetch failed, using fallback:", err);
    return FALLBACK_NEWS;
  }
}

async function getNotices(): Promise<NoticeCard[]> {
  try {
    const rows = await prisma.notice.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
      take: 6,
    });

    if (rows.length === 0) return FALLBACK_NOTICES;

    return rows.map((n, i) => ({
      id: n.id,
      title: n.text,
      date: n.startDate
        ? n.startDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : n.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      type: "Notice",
      urgent: i < 2, // first two notices are treated as urgent
    }));
  } catch {
    return FALLBACK_NOTICES;
  }
}

export default async function NewsPage() {
  const [news, notices] = await Promise.all([getNews(), getNotices()]);

  // Build structured event data for Google rich results
  const schemaEvents = notices.slice(0, 6).map((n) => ({
    name: n.title,
    description: n.title,
    startDate: n.date,
    location: "KMC Lalitpur, Balkumari, Lalitpur",
  }));

  return (
    <>
      <EventSchema events={schemaEvents} />
      <NewsClient initialNews={news} notices={notices} />
    </>
  );
}
