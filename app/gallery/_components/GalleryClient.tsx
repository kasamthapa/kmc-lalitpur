"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { IconChevronRight, IconX } from "../../components/icons";

const gradients = [
  "linear-gradient(135deg, #1a2e5a, #4a90d9)",
  "linear-gradient(135deg, #2d6a4f, #74c69d)",
  "linear-gradient(135deg, #7b2d8b, #c77dff)",
  "linear-gradient(135deg, #c75000, #f5a623)",
  "linear-gradient(135deg, #1a2e5a, #f5a623)",
  "linear-gradient(135deg, #2d6a4f, #1a2e5a)",
];

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

function Lightbox({
  image,
  onClose,
}: {
  image: GalleryImage | null;
  onClose: () => void;
}) {
  if (!image) return null;
  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-amber-400 transition"
          aria-label="Close lightbox"
        >
          <IconX size={32} />
        </button>
        <div className="relative w-full h-96 md:h-[600px]">
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-contain" />
        </div>
        <div className="mt-4 text-center">
          <p className="text-amber-400 font-semibold text-sm">{image.category}</p>
          <h3 className="text-white text-xl font-bold">{image.alt}</h3>
        </div>
      </div>
    </div>
  );
}

export function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(images.map((i) => i.category))).sort(),
  ];

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Gallery</span>
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
            Campus Life
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Photo Gallery</h1>
          <p className="text-xl text-[#8ba7c7] max-w-2xl">
            Explore campus life, events, facilities, and achievements through our comprehensive photo collection.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-[#eae6de] sticky top-[100px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  activeCategory === cat
                    ? "bg-[#0B1F3A] text-white shadow"
                    : "bg-[#f7f5f0] text-[#374151] hover:bg-[#eae6de]"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 opacity-60 text-xs">
                    ({images.filter((i) => i.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🖼️</p>
              <h3 className="text-xl font-bold text-[#0B1F3A]">No photos in this category</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((image, i) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer h-80"
                  style={{ background: gradients[i % gradients.length] }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="text-amber-400 text-xs font-semibold mb-2 uppercase tracking-wider">
                        {image.category}
                      </div>
                      <h3 className="text-white text-lg font-bold">{image.alt}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-center text-sm text-[#6b7280] mt-10">
            Showing {filtered.length} of {images.length} photos
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#0B1F3A] mb-6">Schedule a Campus Tour</h2>
          <p className="text-[#374151] text-lg mb-10">
            Experience the excellence of KMC Lalitpur firsthand with a guided campus tour.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0B1F3A] text-white font-bold rounded-xl hover:bg-[#162d54] hover:shadow-xl transition"
          >
            Contact Us
            <IconChevronRight size={20} />
          </Link>
        </div>
      </section>

      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
      <Footer />
    </main>
  );
}
