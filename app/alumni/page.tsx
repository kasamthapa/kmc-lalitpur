"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import {
  IconChevronRight,
  IconUsers,
  IconGlobe,
  IconAward,
  IconMail,
  IconMapPin,
} from "../components/icons";
import { SITE_CONFIG } from "../config/site";

const PROGRAMS = ["Science", "Management", "Law"];
const GRAD_YEARS = Array.from({ length: 20 }, (_, i) => `${2081 - i} B.S.`);

const programColors: Record<string, string> = {
  Science: "#1a4a7a",
  Management: "#2d6a4f",
  Law: "#c75000",
};

const stats = [
  { label: "Graduates", value: "2,000+", icon: IconUsers },
  { label: "Years of Excellence", value: "25+", icon: IconAward },
  { label: "Countries Represented", value: "20+", icon: IconGlobe },
];

interface AlumniItem {
  id: string;
  name: string;
  gradYear: string;
  program: string;
  currentRole: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  imageUrl: string | null;
  linkedIn: string | null;
  featured: boolean;
}

async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !preset) throw new Error("Cloudinary env vars missing.");
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);
  fd.append("folder", "kmc-alumni");
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: fd });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error((j as { error?: { message?: string } })?.error?.message ?? "Upload failed");
  }
  return ((await res.json()) as { secure_url: string }).secure_url;
}

const blankForm = {
  name: "", gradYear: GRAD_YEARS[0], program: "Science",
  currentRole: "", company: "", location: "",
  email: "", phone: "", bio: "", linkedIn: "", imageUrl: "",
};

export default function AlumniPage() {
  const [alumni, setAlumni] = useState<AlumniItem[]>([]);
  const [loadingAlumni, setLoadingAlumni] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [activeProgram, setActiveProgram] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...blankForm });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/alumni")
      .then((r) => r.json())
      .then((j) => setAlumni(j.data ?? []))
      .catch(() => setFetchError("Could not load alumni. Please refresh."))
      .finally(() => setLoadingAlumni(false));
  }, []);

  const filtered = activeProgram === "All" ? alumni : alumni.filter((a) => a.program === activeProgram);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm((f) => ({ ...f, imageUrl: url }));
      setImagePreview(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
      setImagePreview(null);
      setForm((f) => ({ ...f, imageUrl: "" }));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          gradYear: form.gradYear,
          program: form.program,
          currentRole: form.currentRole || null,
          company: form.company || null,
          location: form.location || null,
          email: form.email || null,
          phone: form.phone || null,
          bio: form.bio || null,
          imageUrl: form.imageUrl || null,
          linkedIn: form.linkedIn || null,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setShowForm(false);
        setForm({ ...blankForm });
        setImagePreview(null);
      } else {
        const j = await res.json().catch(() => ({}));
        setFormError((j as { message?: string }).message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls = "w-full border border-[#d1d5db] rounded-lg px-3 py-2.5 text-[#111827] text-sm placeholder-[#9ca3af] focus:outline-none focus:border-amber-400 transition";
  const labelCls = "block text-[#374151] text-sm font-semibold mb-1.5";

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Alumni</span>
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
              Our Community
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Alumni Network
            </h1>
            <p className="text-xl text-[#8ba7c7] leading-relaxed">
              Thousands of KMC graduates are making their mark across Nepal and the world. Meet our distinguished alumni and reconnect with your community.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { setShowForm(true); setSubmitted(false); }}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-[#0B1F3A] font-bold rounded-xl transition"
              >
                Register as Alumni
              </button>
              <a href="#alumni-list" className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 font-semibold rounded-xl transition">
                View Alumni
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center p-8 rounded-2xl border border-[#eae6de] hover:border-amber-400 transition group">
                <div className="w-14 h-14 rounded-full bg-amber-400/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/20 transition">
                  <Icon size={26} className="text-amber-500" />
                </div>
                <div className="text-4xl font-bold text-[#0B1F3A] mb-2">{value}</div>
                <div className="text-[#6b7280] font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Banner */}
      {submitted && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-green-800 font-semibold text-sm">Registration submitted successfully!</p>
              <p className="text-green-600 text-xs">Your profile will appear here once reviewed by the admin team.</p>
            </div>
            <button onClick={() => setSubmitted(false)} className="ml-auto text-green-400 hover:text-green-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Alumni List */}
      <section id="alumni-list" className="py-12 px-4 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
              Distinguished Alumni
            </p>
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">Success Stories</h2>
            <p className="text-[#6b7280] max-w-2xl mx-auto">
              Our graduates are doctors, engineers, entrepreneurs, artists, and leaders — shaping the future of Nepal and beyond.
            </p>
          </div>

          {/* Program Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-[#6b7280] text-sm">
                {loadingAlumni ? "Loading profiles…" : `${alumni.length} registered alumni`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", ...PROGRAMS].map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveProgram(p)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                    activeProgram === p
                      ? "bg-[#0B1F3A] text-white shadow"
                      : "bg-white border border-[#eae6de] text-[#374151] hover:border-amber-300"
                  }`}
                >
                  {p}
                  {p !== "All" && (
                    <span className="ml-1.5 opacity-60">({alumni.filter((a) => a.program === p).length})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Fetch error */}
          {fetchError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6 text-red-700 text-sm">{fetchError}</div>
          )}

          {/* Loading skeletons */}
          {loadingAlumni && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#eae6de] animate-pulse">
                  <div className="h-48 bg-[#eae6de]" />
                  <div className="p-5 space-y-2">
                    <div className="h-4 bg-[#eae6de] rounded w-3/4" />
                    <div className="h-3 bg-[#eae6de] rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loadingAlumni && !fetchError && filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#eae6de] flex items-center justify-center mx-auto mb-4">
                <IconUsers size={28} className="text-[#9ca3af]" />
              </div>
              <p className="font-semibold text-[#374151]">
                {activeProgram === "All" ? "No alumni profiles yet" : `No ${activeProgram} alumni yet`}
              </p>
              <p className="text-sm text-[#6b7280] mt-1">Be the first to register!</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 text-amber-600 hover:text-amber-700 font-semibold text-sm hover:underline"
              >
                Register now →
              </button>
            </div>
          )}

          {/* Cards */}
          {!loadingAlumni && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((m) => {
                const color = programColors[m.program] ?? "#374151";
                const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <div key={m.id} className="bg-white rounded-2xl overflow-hidden border border-[#eae6de] hover:shadow-xl hover:border-amber-300 transition group">
                    {m.imageUrl ? (
                      <div className="relative h-48 overflow-hidden">
                        <Image src={m.imageUrl} alt={m.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
                        {m.featured && <span className="absolute top-3 right-3 bg-amber-400 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">Featured</span>}
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
                        <span className="text-white text-5xl font-bold">{initials}</span>
                        {m.featured && <span className="absolute top-3 right-3 bg-amber-400 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">Featured</span>}
                      </div>
                    )}
                    <div className="p-5">
                      <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full text-white mb-3" style={{ background: color }}>
                        {m.program}
                      </span>
                      <h3 className="font-bold text-[#0B1F3A] text-base leading-snug mb-0.5">{m.name}</h3>
                      <p className="text-xs text-[#6b7280] mb-3">Batch {m.gradYear}</p>

                      {(m.currentRole || m.company) && (
                        <div className="flex items-start gap-1.5 text-xs text-[#374151] mb-1">
                          <IconAward size={12} className="mt-0.5 shrink-0 text-amber-500" />
                          <span>{[m.currentRole, m.company].filter(Boolean).join(" · ")}</span>
                        </div>
                      )}
                      {m.location && (
                        <div className="flex items-center gap-1.5 text-xs text-[#374151] mb-1">
                          <IconMapPin size={12} className="shrink-0 text-amber-500" />
                          <span>{m.location}</span>
                        </div>
                      )}
                      {m.bio && <p className="text-xs text-[#6b7280] mt-2 line-clamp-2">{m.bio}</p>}

                      {(m.email || m.linkedIn) && (
                        <div className="mt-4 pt-4 border-t border-[#eae6de] flex items-center gap-3">
                          {m.email && (
                            <a href={`mailto:${m.email}`} className="flex items-center gap-1 text-xs text-[#6b7280] hover:text-amber-600 transition truncate">
                              <IconMail size={12} /><span className="truncate">{m.email}</span>
                            </a>
                          )}
                          {m.linkedIn && (
                            <a href={m.linkedIn} target="_blank" rel="noopener noreferrer" className="ml-auto shrink-0 text-[#0077b5] hover:opacity-75 transition">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA — only show when there are alumni */}
      {!loadingAlumni && alumni.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">Join the Network</p>
            <h3 className="text-[#0B1F3A] text-2xl font-bold mb-2">Are you a KMC graduate?</h3>
            <p className="text-[#6b7280] text-sm mb-6">Register to be featured in our alumni network.</p>
            <button
              onClick={() => { setShowForm(true); setSubmitted(false); }}
              className="px-6 py-3 bg-[#0B1F3A] hover:bg-[#162d54] text-white font-bold rounded-xl transition"
            >
              Register as Alumni
            </button>
          </div>
        </section>
      )}

      {/* Stay Connected CTA */}
      <section className="py-16 bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-[#8ba7c7] mb-8">Follow us on social media and be part of every milestone.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SITE_CONFIG.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition flex items-center gap-2"
            >
              <IconMail size={18} />
              Facebook Community
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition flex items-center gap-2"
            >
              Contact School
              <IconChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Registration Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#eae6de]">
              <div>
                <h2 className="text-[#0B1F3A] font-bold text-lg">Alumni Registration</h2>
                <p className="text-[#6b7280] text-sm mt-0.5">Your profile will be reviewed before publishing.</p>
              </div>
              <button onClick={() => setShowForm(false)} className="text-[#9ca3af] hover:text-[#374151] transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{formError}</div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Ram Bahadur Thapa" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Graduation Year <span className="text-red-500">*</span></label>
                  <select value={form.gradYear} onChange={(e) => setForm({ ...form, gradYear: e.target.value })} className={inputCls}>
                    {GRAD_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>Program <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {PROGRAMS.map((p) => (
                    <button key={p} type="button" onClick={() => setForm({ ...form, program: p })}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${form.program === p ? "border-transparent text-white" : "border-[#d1d5db] text-[#374151] hover:border-amber-400"}`}
                      style={form.program === p ? { background: programColors[p] } : {}}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Current Role</label>
                  <input value={form.currentRole} onChange={(e) => setForm({ ...form, currentRole: e.target.value })} placeholder="Software Engineer" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Company / Institution</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Ncell, TU, etc." className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Location</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Kathmandu, Nepal" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="98XXXXXXXX" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>LinkedIn URL</label>
                  <input value={form.linkedIn} onChange={(e) => setForm({ ...form, linkedIn: e.target.value })} placeholder="https://linkedin.com/in/yourname" className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Short Bio <span className="text-[#9ca3af] font-normal">(optional)</span></label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3}
                  placeholder="A few sentences about yourself and your journey after KMC…"
                  className="w-full border border-[#d1d5db] rounded-lg px-3 py-2.5 text-[#111827] text-sm placeholder-[#9ca3af] focus:outline-none focus:border-amber-400 transition resize-none" />
              </div>

              {/* Photo upload */}
              <div>
                <label className={labelCls}>Profile Photo <span className="text-[#9ca3af] font-normal">(optional)</span></label>
                <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-4 transition cursor-pointer ${uploading ? "border-amber-300 bg-amber-50 cursor-wait" : "border-[#d1d5db] hover:border-amber-400 hover:bg-amber-50/50"}`}>
                  {imagePreview ? (
                    <div className="w-full text-center">
                      <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-amber-200">
                        <Image src={imagePreview} alt="Preview" fill sizes="80px" className="object-cover object-top" unoptimized={imagePreview.startsWith("blob:")} />
                      </div>
                      <p className={`text-xs mt-2 ${uploading ? "text-amber-500 animate-pulse" : "text-[#6b7280]"}`}>
                        {uploading ? "Uploading…" : "Click to replace"}
                      </p>
                    </div>
                  ) : (
                    <>
                      <svg className="w-8 h-8 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      <p className="text-[#6b7280] text-xs">Click to upload · JPG, PNG, WebP</p>
                    </>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} disabled={uploading} className="sr-only" />
                </label>
                {uploadError && <p className="text-red-500 text-xs mt-1.5">{uploadError}</p>}
                {imagePreview && !uploading && (
                  <button type="button" onClick={() => { setImagePreview(null); setForm((f) => ({ ...f, imageUrl: "" })); }} className="mt-1.5 text-xs text-[#9ca3af] hover:text-red-500 transition">
                    Remove photo
                  </button>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} disabled={submitting}
                  className="flex-1 py-3 border border-[#d1d5db] hover:border-[#9ca3af] disabled:opacity-50 text-[#374151] text-sm font-semibold rounded-xl transition">
                  Cancel
                </button>
                <button type="submit" disabled={submitting || uploading}
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-bold rounded-xl transition">
                  {uploading ? "Uploading photo…" : submitting ? "Submitting…" : "Submit Registration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
