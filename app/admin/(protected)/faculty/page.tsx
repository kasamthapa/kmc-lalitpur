"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { CropModal } from "@/app/admin/_components/CropModal";

async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !preset) throw new Error("Cloudinary env vars missing.");

  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);
  fd.append("folder", "kmc-faculty");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: fd },
  );
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(
      (j as { error?: { message?: string } })?.error?.message ?? "Upload failed",
    );
  }
  return ((await res.json()) as { secure_url: string }).secure_url;
}

interface FacultyMember {
  id: string;
  name: string;
  slug: string;
  title: string;
  dept: string;
  qualification: string;
  experience: string;
  subjects: string | null;
  email: string | null;
  bio: string | null;
  achievements: string | null;
  imageUrl: string | null;
  active: boolean;
  displayOrder: number;
}

const DEPTS = ["Science", "Management", "Law", "Administration"];

const blank: Omit<FacultyMember, "id" | "slug"> = {
  name: "", title: "", dept: "Science", qualification: "", experience: "",
  subjects: "", email: "", bio: "", achievements: "", imageUrl: "",
  active: true, displayOrder: 0,
};

const deptColors: Record<string, string> = {
  Science: "#1a4a7a",
  Management: "#2d6a4f",
  Law: "#c75000",
  Administration: "#374151",
};

export default function FacultyAdminPage() {
  const [members, setMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDept, setFilterDept] = useState("All");

  // Modal state
  const [modal, setModal] = useState<{ open: boolean; member?: FacultyMember }>({ open: false });
  const [form, setForm] = useState<Omit<FacultyMember, "id" | "slug">>(blank);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Image upload state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Crop state
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<FacultyMember | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/faculty");
    if (res.ok) {
      const json = await res.json();
      setMembers(json.data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() {
    setForm(blank);
    setFormError("");
    setImagePreview(null);
    setUploadError("");
    setModal({ open: true });
  }

  function openEdit(member: FacultyMember) {
    setForm({
      name: member.name, title: member.title, dept: member.dept,
      qualification: member.qualification, experience: member.experience,
      subjects: member.subjects ?? "", email: member.email ?? "",
      bio: member.bio ?? "", achievements: member.achievements ?? "",
      imageUrl: member.imageUrl ?? "", active: member.active,
      displayOrder: member.displayOrder,
    });
    setFormError("");
    setImagePreview(member.imageUrl ?? null);
    setUploadError("");
    setModal({ open: true, member });
  }

  function closeModal() { setModal({ open: false }); }

  async function uploadBlob(blob: Blob) {
    setUploadError("");
    setUploading(true);
    try {
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setCropSrc(URL.createObjectURL(file));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleCropDone(blob: Blob) {
    setCropSrc(null);
    setPendingFile(null);
    setImagePreview(URL.createObjectURL(blob));
    await uploadBlob(blob);
  }

  async function handleCropSkip() {
    if (!pendingFile) return;
    const blob = pendingFile;
    setCropSrc(null);
    setPendingFile(null);
    setImagePreview(URL.createObjectURL(blob));
    await uploadBlob(blob);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSaving(true);

    const body = {
      ...form,
      subjects: form.subjects || null,
      email: form.email || null,
      bio: form.bio || null,
      achievements: form.achievements || null,
      imageUrl: form.imageUrl || null,
    };

    const isEdit = !!modal.member;
    const url = isEdit ? `/api/admin/faculty/${modal.member!.id}` : "/api/admin/faculty";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);
    if (res.ok) {
      closeModal();
      load();
      showToast(modal.member ? "Faculty member updated." : "Faculty member added.");
    } else {
      try {
        const json = await res.json();
        setFormError(json.message ?? "Failed to save.");
      } catch {
        setFormError("Failed to save. Please try again.");
      }
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/admin/faculty/${deleteTarget.id}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteTarget(null);
    load();
    showToast("Faculty member deleted.");
  }

  const filtered = filterDept === "All" ? members : members.filter((m) => m.dept === filterDept);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[60] bg-green-900 border border-green-700 text-green-300 text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {toast}
        </div>
      )}
      {/* Header */}
      <div className="flex items-start justify-between mb-7 gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-xl font-bold">Faculty & Staff</h1>
          <p className="text-gray-600 text-sm mt-0.5">Manage faculty profiles shown on the campus page.</p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold rounded-lg transition-colors"
        >
          + Add Member
        </button>
      </div>

      {/* Department filter */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {["All", ...DEPTS].map((d) => (
          <button
            key={d}
            onClick={() => setFilterDept(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterDept === d
                ? "bg-amber-400 text-gray-900"
                : "bg-white/[0.06] border border-white/[0.06] text-gray-400 hover:bg-white/[0.1] hover:text-gray-200"
            }`}
          >
            {d}
            {d !== "All" && (
              <span className="ml-1 opacity-60">({members.filter((m) => m.dept === d).length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-900 border border-white/[0.06] rounded-xl overflow-hidden animate-pulse">
              <div className="h-2 bg-gray-800" />
              <div className="p-4 space-y-3">
                <div className="flex justify-between gap-2">
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 bg-gray-800 rounded w-2/3" />
                    <div className="h-3 bg-gray-800 rounded w-1/2" />
                  </div>
                  <div className="h-5 w-16 bg-gray-800 rounded-full" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-1/2" />
                </div>
                <div className="pt-3 border-t border-white/[0.04] flex gap-2">
                  <div className="flex-1 h-7 bg-gray-800 rounded-lg" />
                  <div className="flex-1 h-7 bg-gray-800 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-gray-900 border border-white/[0.06] rounded-xl">
          <p className="text-gray-500 text-sm">No faculty members yet.</p>
          <button onClick={openAdd} className="mt-3 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">
            Add the first one →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <div
              key={m.id}
              className={`bg-gray-900 border rounded-xl overflow-hidden transition-opacity ${
                m.active ? "border-white/[0.06] hover:border-white/[0.1]" : "border-white/[0.03] opacity-50"
              }`}
            >
              {m.imageUrl ? (
                <div className="relative h-24 overflow-hidden">
                  <Image src={m.imageUrl} alt={m.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-top" />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-900/70" />
                </div>
              ) : (
                <div className="h-1.5" style={{ background: deptColors[m.dept] ?? "#374151" }} />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-white font-semibold text-sm leading-snug">{m.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{m.title}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shrink-0" style={{ background: deptColors[m.dept] ?? "#374151" }}>
                    {m.dept}
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-0.5 mb-3">
                  <p>{m.qualification}</p>
                  <p>{m.experience} experience</p>
                  {m.email && <p className="text-gray-600">{m.email}</p>}
                </div>
                <div className="flex gap-2 pt-3 border-t border-white/[0.04]">
                  <button onClick={() => openEdit(m)} className="flex-1 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 hover:text-white text-xs font-semibold rounded-lg transition-colors">
                    Edit
                  </button>
                  <button onClick={() => setDeleteTarget(m)} className="flex-1 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/80"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h2 className="text-white font-bold text-sm">
                {modal.member ? "Edit Faculty Member" : "Add Faculty Member"}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/[0.06]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {formError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">
                  {formError}
                </div>
              )}

              {/* Row 1: Name + Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Dr. Rajendra Adhikari"
                    className="w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    Title / Role <span className="text-red-400">*</span>
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="Head of Science Department"
                    className="w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Dept + Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    Department <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.dept}
                    onChange={(e) => setForm({ ...form, dept: e.target.value })}
                    className="w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400/70 transition-colors"
                  >
                    {DEPTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    Experience <span className="text-red-400">*</span>
                  </label>
                  <input
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    required
                    placeholder="12 years"
                    className="w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors"
                  />
                </div>
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  Qualification <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.qualification}
                  onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                  required
                  placeholder="PhD Physics, Tribhuvan University"
                  className="w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors"
                />
              </div>

              {/* Row 3: Subjects + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">Subjects</label>
                  <input
                    value={form.subjects ?? ""}
                    onChange={(e) => setForm({ ...form, subjects: e.target.value })}
                    placeholder="Physics, Mechanics"
                    className="w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email ?? ""}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@kmclalitpur.edu.np"
                    className="w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  Bio <span className="text-gray-500 font-normal">(shown on detail page)</span>
                </label>
                <textarea
                  value={form.bio ?? ""}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  placeholder="A short paragraph about the faculty member's background and teaching philosophy…"
                  className="w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors resize-none"
                />
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  Achievements / Highlights{" "}
                  <span className="text-gray-500 font-normal">(one per line)</span>
                </label>
                <textarea
                  value={form.achievements ?? ""}
                  onChange={(e) => setForm({ ...form, achievements: e.target.value })}
                  rows={4}
                  placeholder={"Best Teacher Award 2079\nPublished 3 research papers in TU Journal\nFormer NEB examiner"}
                  className="w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors resize-none"
                />
              </div>

              {/* Photo upload + Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">Photo</label>

                  {/* Upload zone */}
                  <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-4 transition-colors ${
                    uploading
                      ? "border-amber-400/50 bg-amber-400/5 cursor-wait"
                      : "border-white/[0.08] hover:border-amber-400/50 hover:bg-white/[0.02] cursor-pointer"
                  }`}>
                    {imagePreview ? (
                      <div className="relative w-full">
                        <div className="relative w-24 h-24 mx-auto rounded-xl overflow-hidden">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            sizes="96px"
                            className="object-cover"
                            unoptimized={imagePreview.startsWith("blob:")}
                          />
                        </div>
                        {!uploading && (
                          <p className="text-center text-xs text-gray-400 mt-2">
                            Click to replace photo
                          </p>
                        )}
                        {uploading && (
                          <p className="text-center text-xs text-amber-400 mt-2 animate-pulse">
                            Uploading…
                          </p>
                        )}
                      </div>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <p className="text-gray-400 text-xs text-center">
                          {uploading ? "Uploading…" : "Click to upload photo"}
                        </p>
                        <p className="text-gray-600 text-xs">JPG, PNG, WebP · max 5MB</p>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="sr-only"
                    />
                  </label>

                  {uploadError && (
                    <p className="text-red-400 text-xs mt-1.5">{uploadError}</p>
                  )}

                  {/* Remove photo button */}
                  {imagePreview && !uploading && (
                    <button
                      type="button"
                      onClick={() => { setImagePreview(null); setForm((f) => ({ ...f, imageUrl: "" })); }}
                      className="mt-2 text-xs text-gray-500 hover:text-red-400 transition-colors"
                    >
                      Remove photo
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">Display Order</label>
                  <input
                    type="number"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                    className="w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400/70 transition-colors"
                  />
                </div>
              </div>

              {/* Where this appears */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-3">Where this appears on the website</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${form.active ? "bg-green-400" : "bg-gray-600"}`} />
                    <span className="text-gray-300 text-xs font-medium">Campus → Faculty & Staff page</span>
                    <span className="ml-auto text-[10px] text-gray-600">{form.active ? "Visible" : "Hidden"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-gray-600" />
                    <span className="text-gray-500 text-xs">Homepage (not applicable for faculty)</span>
                  </div>
                </div>
                <p className="text-gray-600 text-[10px] mt-3">Toggle &ldquo;Active&rdquo; below to show or hide from the faculty page.</p>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 rounded accent-amber-400"
                />
                <span className="text-gray-400 text-sm">Active (visible on site)</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-50 text-gray-300 text-sm font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-bold rounded-lg transition-colors"
                >
                  {uploading ? "Uploading photo…" : saving ? "Saving…" : modal.member ? "Save Changes" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Crop Modal */}
      {cropSrc && (
        <CropModal
          imageSrc={cropSrc}
          onDone={handleCropDone}
          onSkip={handleCropSkip}
          onCancel={() => { setCropSrc(null); setPendingFile(null); }}
        />
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}
        >
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Delete faculty member?</h3>
                <p className="text-gray-600 text-xs">This cannot be undone.</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg px-3 py-2.5 mb-5">
              <p className="text-gray-300 text-sm font-semibold">{deleteTarget.name}</p>
              <p className="text-gray-600 text-xs mt-0.5">{deleteTarget.title} · {deleteTarget.dept}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-50 text-gray-300 text-sm font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
