import type { Metadata } from "next";
import { prisma } from "@/app/lib/prisma";
import { GalleryClient, type GalleryImage } from "./_components/GalleryClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Explore campus life, events, facilities, and achievements at KMC Lalitpur through our comprehensive photo gallery.",
};

// Hardcoded fallback — shown until real gallery content is uploaded via admin (Step 15)
const FALLBACK_IMAGES: GalleryImage[] = [
  { id: "f1", src: "/images/hero-main.png", alt: "Campus Overview", category: "Campus" },
  { id: "f2", src: "/images/classroom.png", alt: "Interactive Learning", category: "Academics" },
  { id: "f3", src: "/images/science.png", alt: "Science Lab", category: "Facilities" },
  { id: "f4", src: "/images/computer-lab.png", alt: "Computer Lab", category: "Technology" },
  { id: "f5", src: "/images/library.png", alt: "Library", category: "Facilities" },
  { id: "f6", src: "/images/sports-facility.png", alt: "Sports Complex", category: "Activities" },
  { id: "f7", src: "/images/auditorium.png", alt: "Auditorium", category: "Events" },
  { id: "f8", src: "/images/cafeteria.png", alt: "Cafeteria", category: "Campus" },
  { id: "f9", src: "/images/student-event.png", alt: "Student Event", category: "Events" },
  { id: "f10", src: "/images/graduation.png", alt: "Graduation Ceremony", category: "Celebrations" },
  { id: "f11", src: "/images/awards-ceremony.png", alt: "Awards Ceremony", category: "Achievements" },
  { id: "f12", src: "/images/admissions-process.png", alt: "Admissions Day", category: "Admissions" },
];

async function getImages(): Promise<GalleryImage[]> {
  try {
    const rows = await prisma.gallery.findMany({
      orderBy: { displayOrder: "asc" },
      select: { id: true, src: true, alt: true, category: true, caption: true },
    });

    if (rows.length === 0) return FALLBACK_IMAGES;

    return rows.map((r) => ({
      id: r.id,
      src: r.src,
      alt: r.alt,
      category: r.category ?? "General",
      caption: r.caption,
    }));
  } catch (err) {
    console.error("[gallery page] DB fetch failed, using fallback:", err);
    return FALLBACK_IMAGES;
  }
}

export default async function GalleryPage() {
  const images = await getImages();
  return <GalleryClient images={images} />;
}
