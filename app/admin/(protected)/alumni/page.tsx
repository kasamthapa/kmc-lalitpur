"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

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

interface AlumniMember {
  id: string;
  name: string;
  gradYear: string;
  program: string;
  currentRole: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
  imageUrl: string | null;
  linkedIn: string | null;
  approved: boolean;
  featured: boolean;
  displayOrder: number;
}

const PROGRAMS = ["Science", "Management", "Law"];
const GRAD_YEARS = Array.from({ length: 20 }, (_, i) => `${2081 - i} B.S.`);
const programColors: Record<string, string> = {
  Science: "#1a4a7a",
  Management: "#2d6a4f",
  Law: "#c75000",
};

const blank: Omit<AlumniMember, "id"> = {
  name: "", gradYear: GRAD_YEARS[0], program: "Science",
  currentRole: "", company: "", location: "", email: "", phone: "",
  bio: "", imageUrl: "", linkedIn: "",
  approved: true, featured: false, displayOrder: 0,
};

type FilterStatus = "all" | "pending" | "approved";

export default function AlumniAdminPage() {
  const [members, setMembers] = useState<AlumniMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterProgram, setFilterProgram] = useState("All");

  const [modal, setModal] = useState<{ open: boolean; member?: AlumniMember }>({ open: false });
  const [form, setForm] = useState<Omit<AlumniMember, "id">>({ ...blank });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deleteTarget, setDeleteTarget] = useState<AlumniMember | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/alumni");
      if (res.ok) {
        const json = await res.json();
        setMembers(json.data ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() {
    setForm({ ...blank });
    setFormError("");
    setImagePreview(null);
    setUploadError("");
    setModal({ open: true });
  }

  function openEdit(member: AlumniMember) {
    setForm({
      name: member.name, gradYear: member.gradYear, program: member.program,
      currentRole: member.currentRole ?? "", company: member.company ?? "",
      location: member.location ?? "", email: member.email ?? "",
      phone: member.phone ?? "", bio: member.bio ?? "",
      imageUrl: member.imageUrl ?? "", linkedIn: member.linkedIn ?? "",
      approved: member.approved, featured: member.featured, displayOrder: member.displayOrder,
    });
    setFormError("");
    setImagePreview(member.imageUrl ?? null);
    setUploadError("");
    setModal({ open: true, member });
  }

  function closeModal() { setModal({ open: false }); }

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

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    const isEdit = !!modal.member;
    const url = isEdit ? `/api/admin/alumni/${modal.member!.id}` : "/api/admin/alumni";
    try {
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
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
      if (res.ok) { closeModal(); load(); showToast(isEdit ? "Alumni updated." : "Alumni added."); }
      else {
        const j = await res.json().catch(() => ({}));
        setFormError((j as { message?: string }).message ?? "Failed to save.");
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleApprove(member: AlumniMember) {
    await fetch(`/api/admin/alumni/${member.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: !member.approved }),
    });
    load();
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/admin/alumni/${deleteTarget.id}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteTarget(null);
    load();
    showToast("Alumni deleted.");
  }

  const filtered = members.filter((m) => {
    const byStatus = filterStatus === "all" ? true : filterStatus === "pending" ? !m.approved : m.approved;
    const byProgram = filterProgram === "All" ? true : m.program === filterProgram;
    return byStatus && byProgram;
  });

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  const pendingCount = members.filter((m) => !m.approved).length;

  const inputCls = "w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors";
  const labelCls = "block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5";

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
          <h1 className="text-white text-xl font-bold">Alumni</h1>
          <p className="text-gray-600 text-sm mt-0.5">Manage alumni registrations and profiles.</p>
        </div>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <span className="px-2.5 py-1 bg-amber-400/15 text-amber-400 border border-amber-400/20 text-xs font-bold rounded-full">
              {pendingCount} pending
            </span>
          )}
          <button onClick={openAdd} className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold rounded-lg transition-colors">
            + Add Alumni
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex bg-gray-900 border border-white/[0.06] rounded-lg p-1 gap-1">
          {(["all", "pending", "approved"] as FilterStatus[]).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${filterStatus === s ? "bg-amber-400 text-gray-900" : "text-gray-500 hover:text-gray-300"}`}>
              {s}
              {s === "pending" && pendingCount > 0 && (
                <span className="ml-1.5 bg-red-500 text-white rounded-full px-1.5 text-[10px]">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>
        {["All", ...PROGRAMS].map((p) => (
          <button key={p} onClick={() => setFilterProgram(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filterProgram === p ? "bg-amber-400 text-gray-900" : "bg-white/[0.06] border border-white/[0.06] text-gray-400 hover:bg-white/[0.1] hover:text-gray-200"}`}>
            {p}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-900 border border-white/[0.06] rounded-xl overflow-hidden animate-pulse">
              <div className="h-1.5 bg-gray-800" />
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gray-800 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 bg-gray-800 rounded w-2/3" />
                    <div className="h-3 bg-gray-800 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-1/2" />
                </div>
                <div className="pt-3 border-t border-white/[0.04] flex gap-2">
                  <div className="flex-1 h-7 bg-gray-800 rounded-lg" />
                  <div className="flex-1 h-7 bg-gray-800 rounded-lg" />
                  <div className="flex-1 h-7 bg-gray-800 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-gray-900 border border-white/[0.06] rounded-xl">
          <p className="text-gray-500 text-sm">No alumni found.</p>
          <button onClick={openAdd} className="mt-3 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">Add the first one →</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => {
            const color = programColors[m.program] ?? "#374151";
            const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
            return (
              <div key={m.id} className={`bg-gray-900 border rounded-xl overflow-hidden transition-all ${m.approved ? "border-white/[0.06] hover:border-white/[0.1]" : "border-amber-500/30"}`}>
                {m.imageUrl ? (
                  <div className="relative h-24 overflow-hidden">
                    <Image src={m.imageUrl} alt={m.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/70" />
                    {!m.approved && <span className="absolute top-2 left-2 bg-amber-400 text-gray-900 text-[9px] font-bold px-2 py-0.5 rounded-full">Pending</span>}
                    {m.featured && <span className="absolute top-2 right-2 bg-purple-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Featured</span>}
                  </div>
                ) : (
                  <div className="h-1.5" style={{ background: color }} />
                )}

                <div className="p-4">
                  {!m.imageUrl && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: color }}>
                        {initials}
                      </div>
                      {!m.approved && <span className="bg-amber-400/15 text-amber-400 border border-amber-400/20 text-[9px] font-bold px-2 py-0.5 rounded-full">Pending</span>}
                      {m.featured && <span className="bg-purple-500/15 text-purple-400 border border-purple-500/20 text-[9px] font-bold px-2 py-0.5 rounded-full">Featured</span>}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{m.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5 truncate">{m.currentRole ?? "—"}{m.company ? ` · ${m.company}` : ""}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shrink-0" style={{ background: color }}>{m.program}</span>
                  </div>

                  <div className="text-xs text-gray-600 space-y-0.5 mb-3">
                    <p>Batch: {m.gradYear}</p>
                    {m.location && <p>{m.location}</p>}
                    {m.email && <p className="truncate">{m.email}</p>}
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-white/[0.04]">
                    <button onClick={() => toggleApprove(m)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${m.approved ? "bg-white/[0.06] hover:bg-white/[0.1] text-gray-400 hover:text-gray-200" : "bg-green-500/15 hover:bg-green-500/25 text-green-400 border border-green-500/20"}`}>
                      {m.approved ? "Unapprove" : "✓ Approve"}
                    </button>
                    <button onClick={() => openEdit(m)} className="flex-1 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 hover:text-white text-xs font-semibold rounded-lg transition-colors">
                      Edit
                    </button>
                    <button onClick={() => setDeleteTarget(m)} className="flex-1 py-1.5 bg-red-900/40 hover:bg-red-900/70 text-red-400 text-xs font-semibold rounded-lg transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h2 className="text-white font-bold text-sm">{modal.member ? "Edit Alumni" : "Add Alumni"}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/[0.06]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {formError && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">{formError}</div>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Ram Bahadur Thapa" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Graduation Year <span className="text-red-400">*</span></label>
                  <select value={form.gradYear} onChange={(e) => setForm({ ...form, gradYear: e.target.value })} className={inputCls}>
                    {GRAD_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>Program <span className="text-red-400">*</span></label>
                <div className="flex gap-2 flex-wrap">
                  {PROGRAMS.map((p) => (
                    <button key={p} type="button" onClick={() => setForm({ ...form, program: p })}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-colors ${form.program === p ? "border-transparent text-white" : "border-gray-600 text-gray-400 hover:border-amber-400"}`}
                      style={form.program === p ? { background: programColors[p] } : {}}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Current Role</label>
                  <input value={form.currentRole ?? ""} onChange={(e) => setForm({ ...form, currentRole: e.target.value })} placeholder="Software Engineer" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Company / Institution</label>
                  <input value={form.company ?? ""} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Ncell, TU, etc." className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Location</label>
                  <input value={form.location ?? ""} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Kathmandu, Nepal" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" value={form.email ?? ""} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Phone</label>
                  <input value={form.phone ?? ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="98XXXXXXXX" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>LinkedIn URL</label>
                  <input value={form.linkedIn ?? ""} onChange={(e) => setForm({ ...form, linkedIn: e.target.value })} placeholder="https://linkedin.com/in/…" className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Bio</label>
                <textarea value={form.bio ?? ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3}
                  placeholder="Short bio…"
                  className={`${inputCls} resize-none`} />
              </div>

              {/* Photo + display order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Photo</label>
                  <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-4 transition-colors ${uploading ? "border-amber-400/50 bg-amber-400/5 cursor-wait" : "border-white/[0.08] hover:border-amber-400/50 hover:bg-white/[0.02] cursor-pointer"}`}>
                    {imagePreview ? (
                      <div className="w-full text-center">
                        <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden">
                          <Image src={imagePreview} alt="Preview" fill sizes="80px" className="object-cover object-top" unoptimized={imagePreview.startsWith("blob:")} />
                        </div>
                        <p className={`text-xs mt-2 ${uploading ? "text-amber-400 animate-pulse" : "text-gray-400"}`}>
                          {uploading ? "Uploading…" : "Click to replace"}
                        </p>
                      </div>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <p className="text-gray-400 text-xs">Click to upload · JPG, PNG, WebP</p>
                      </>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} disabled={uploading} className="sr-only" />
                  </label>
                  {uploadError && <p className="text-red-400 text-xs mt-1.5">{uploadError}</p>}
                  {imagePreview && !uploading && (
                    <button type="button" onClick={() => { setImagePreview(null); setForm((f) => ({ ...f, imageUrl: "" })); }} className="mt-2 text-xs text-gray-500 hover:text-red-400 transition-colors">
                      Remove photo
                    </button>
                  )}
                </div>
                <div>
                  <label className={labelCls}>Display Order</label>
                  <input type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })} className={inputCls} />
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.approved} onChange={(e) => setForm({ ...form, approved: e.target.checked })}
                    className="w-4 h-4 rounded accent-amber-400" />
                  <span className="text-gray-400 text-sm">Approved (visible on site)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 rounded accent-amber-400" />
                  <span className="text-gray-400 text-sm">Featured</span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} disabled={saving} className="flex-1 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-50 text-gray-300 text-sm font-semibold rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving || uploading} className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-bold rounded-lg transition-colors">
                  {uploading ? "Uploading photo…" : saving ? "Saving…" : modal.member ? "Save Changes" : "Add Alumni"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}>
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Delete alumni?</h3>
                <p className="text-gray-600 text-xs">This cannot be undone.</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg px-3 py-2.5 mb-5">
              <p className="text-gray-300 text-sm font-semibold">{deleteTarget.name}</p>
              <p className="text-gray-600 text-xs mt-0.5">{deleteTarget.program} · Batch {deleteTarget.gradYear}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setDeleteTarget(null)} disabled={deleting} className="flex-1 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-50 text-gray-300 text-sm font-semibold rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={deleting} className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors">
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
