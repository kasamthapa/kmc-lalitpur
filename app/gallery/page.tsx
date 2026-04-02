"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { ChevronRight, X } from "lucide-react";

const gradients = [
  "linear-gradient(135deg, #1a2e5a, #4a90d9)",
  "linear-gradient(135deg, #2d6a4f, #74c69d)",
  "linear-gradient(135deg, #7b2d8b, #c77dff)",
  "linear-gradient(135deg, #c75000, #f5a623)",
  "linear-gradient(135deg, #1a2e5a, #f5a623)",
  "linear-gradient(135deg, #2d6a4f, #1a2e5a)",
];

function Lightbox({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gold-500 transition"
          aria-label="Close lightbox"
        >
          <X size={32} />
        </button>
        <div className="relative w-full h-96 md:h-[600px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-gold-500 font-semibold">{image.category}</p>
          <h3 className="text-white text-xl font-bold">{image.alt}</h3>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    {
      src: "/images/hero-main.png",
      alt: "Campus Overview",
      category: "Campus",
    },
    {
      src: "/images/classroom.png",
      alt: "Interactive Learning",
      category: "Academics",
    },
    {
      src: "/images/science-lab.png",
      alt: "Science Lab",
      category: "Facilities",
    },
    {
      src: "/images/computer-lab.png",
      alt: "Computer Lab",
      category: "Technology",
    },
    { src: "/images/library.png", alt: "Library", category: "Facilities" },
    {
      src: "/images/sports-facility.png",
      alt: "Sports",
      category: "Activities",
    },
    { src: "/images/auditorium.png", alt: "Auditorium", category: "Events" },
    { src: "/images/cafeteria.png", alt: "Cafeteria", category: "Campus" },
    {
      src: "/images/student-event.png",
      alt: "Student Event",
      category: "Events",
    },
    {
      src: "/images/graduation.png",
      alt: "Graduation",
      category: "Celebrations",
    },
    {
      src: "/images/awards-ceremony.png",
      alt: "Awards",
      category: "Achievements",
    },
    {
      src: "/images/admissions-process.png",
      alt: "Admissions",
      category: "Admissions",
    },
  ];

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-slate-300">
            <Link href="/" className="hover:text-gold-500 transition">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="text-gold-500 font-semibold">Gallery</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Photo Gallery</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Explore campus life, events, and achievements through our
            comprehensive collection
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(image)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer h-80"
                style={{ background: gradients[i % gradients.length] }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <div className="text-gold-500 text-sm font-semibold mb-2">
                      {image.category}
                    </div>
                    <h3 className="text-white text-lg font-bold">
                      {image.alt}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-950 mb-6">
            Schedule a Campus Tour
          </h2>
          <p className="text-lg text-slate-700 mb-10">
            Experience the excellence of KMC Lalitpur firsthand with a guided
            campus tour
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-950 text-white font-bold rounded-lg hover:shadow-2xl transition"
          >
            Contact Us
            <ChevronRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
      <Footer />
    </main>
  );
}
