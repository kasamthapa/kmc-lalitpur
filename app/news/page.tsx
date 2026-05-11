import type { Metadata } from "next";
import { prisma } from "@/app/lib/prisma";

// Revalidated immediately by admin write routes via revalidatePath()
// Fallback: re-render every 10 s in case of missed revalidation
export const revalidate = 10;
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
    slug: "kmc-talent-innovation-expo",
    title: "KMC Talent and Innovation Expo — Students Shine Bright",
    description:
      "KMC Lalitpur successfully hosted its annual Talent and Innovation Expo at the KMC Seminar Hall. Students showcased remarkable projects spanning science, technology, arts, and entrepreneurship, drawing appreciation from faculty and guests alike.",
    date: "Recent",
    category: "Events",
    image: "/images/news4.png",
    featured: true,
  },
  {
    id: "2",
    slug: "kmc-mbbs-achievers-panel",
    title: "Voices of Experience — MBBS Achievers Panel Discussion",
    description:
      "KMC Lalitpur hosted an inspiring panel discussion featuring alumni who cleared MBBS entrance examinations. Current Science stream students gained invaluable insights into preparation strategies and college life.",
    date: "Recent",
    category: "Academic",
    image: "/images/news1.png",
    featured: false,
  },
  {
    id: "3",
    slug: "theme-drama-competition",
    title: "Theme Drama Competition — A Showcase of Student Creativity",
    description:
      "The annual Theme Drama Competition was successfully conducted at the KMC Seminar Hall. Students from all streams delivered powerful performances, demonstrating exceptional creativity, teamwork, and stage presence.",
    date: "Recent",
    category: "Cultural Events",
    image: "/images/news3.png",
    featured: false,
  },
  {
    id: "4",
    slug: "kmc-community-outreach",
    title: "KMC Community Outreach — Building Partnerships for Change",
    description:
      "KMC Lalitpur students participated in community service and social responsibility initiatives. The programme reinforced the institution's commitment to nurturing socially aware and responsible citizens.",
    date: "Recent",
    category: "Community",
    image: "/images/news5.png",
    featured: false,
  },
  {
    id: "5",
    slug: "kmc-debate-speech-event",
    title: "KMC Student Catalyst Committee Celebrates Young Orators",
    description:
      "The KMC Student Catalyst Committee organised a Debate & Speech Event that brought out the best in student communication and critical thinking. Participants from all streams competed with confidence and eloquence.",
    date: "Recent",
    category: "Academic",
    image: "/images/news2.png",
    featured: false,
  },
];

// Hardcoded fallback notices (notice board on /news — different from homepage marquee)
const FALLBACK_NOTICES: NoticeCard[] = [
  { id: 1, title: "Merit & Need-Based Scholarships Available for Deserving Students", date: "Recent", type: "General", urgent: false },
  { id: 2, title: "Hostel & Transport Facilities Available — Contact Admin Office", date: "Recent", type: "General", urgent: false },
  { id: 3, title: "Library Timing: Sunday–Friday 8 AM – 5 PM", date: "Recent", type: "General", urgent: false },
  { id: 4, title: "Extra Classes Available for Science, Management & Law Streams", date: "Recent", type: "Academic", urgent: false },
  { id: 5, title: "Contact Admin Office for Fee & Other Enquiries", date: "Recent", type: "Finance", urgent: false },
  { id: 6, title: "Campus Open for Visits: Sunday–Friday 9 AM – 4 PM", date: "Recent", type: "General", urgent: false },
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
    const now = new Date();
    const rows = await prisma.notice.findMany({
      where: {
        active: true,
        OR: [{ startDate: null }, { startDate: { lte: now } }],
        AND: [
          {
            OR: [{ endDate: null }, { endDate: { gte: now } }],
          },
        ],
      },
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
