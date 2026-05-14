"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { CropModal } from "@/app/admin/_components/CropModal";

// ── Types ──────────────────────────────────────────────────────────────────────

interface PopupButton {
  label: string;
  url: string;
  style: "primary" | "secondary" | "outline";
}

interface PopupItem {
  id: string;
  title: string | null;
  body: string | null;
  imageUrl: string | null;
  buttons: string | null; // JSON string
  active: boolean;
  showOnce: boolean;
  delaySeconds: number;
  createdAt: string;
}

// ── Cloudinary upload ──────────────────────────────────────────────────────────

async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !preset) throw new Error("Cloudinary env vars missing.");
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);
  fd.append("folder", "kmc-popups");
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: fd });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error((j as { error?: { message?: string } })?.error?.message ?? "Upload failed");
  }
  return ((await res.json()) as { secure_url: string }).secure_url;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const BUTTON_STYLE_LABELS: Record<PopupButton["style"], string> = {
  primary: "Primary (filled amber)",
  secondary: "Secondary (filled dark)",
  outline: "Outline",
};

function parseButtons(raw: string | null): PopupButton[] {
  if (!raw) return [];
  try { return JSON.parse(raw) as PopupButton[]; } catch { return []; }
}

const blankForm = {
  title: "",
  body: "",
  imageUrl: "",
  buttons: [] as PopupButton[],
  active: false,
  showOnce: true,
  delaySeconds: 2,
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function PopupsAdminPage() {
  const [popups, setPopups] = useState<PopupItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; popup?: PopupItem }>({ open: false });
  const [form, setForm] = useState({ ...blankForm });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<PopupItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Image upload
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  // Button builder temp state
  const [newBtn, setNewBtn] = useState<PopupButton>({ label: "", url: "", style: "primary" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/popups");
      if (res.ok) { const j = await res.json(); setPopups(j.data ?? []); }
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  function openAdd() {
    setForm({ ...blankForm });
    setImagePreview(null);
    setUploadError("");
    setFormError("");
    setNewBtn({ label: "", url: "", style: "primary" });
    setModal({ open: true });
  }

  function openEdit(p: PopupItem) {
    setForm({
      title: p.title ?? "",
      body: p.body ?? "",
      imageUrl: p.imageUrl ?? "",
      buttons: parseButtons(p.buttons),
      active: p.active,
      showOnce: p.showOnce,
      delaySeconds: p.delaySeconds,
    });
    setImagePreview(p.imageUrl ?? null);
    setUploadError("");
    setFormError("");
    setNewBtn({ label: "", url: "", style: "primary" });
    setModal({ open: true, popup: p });
  }

  // ── Image handling ───────────────────────────────────────────────────────────

  async function uploadBlob(blob: Blob) {
    setUploadError("");
    setUploading(true);
    try {
      const file = new File([blob], "popup-image.jpg", { type: "image/jpeg" });
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
    setCropSrc(null); setPendingFile(null);
    setImagePreview(URL.createObjectURL(blob));
    await uploadBlob(blob);
  }

  async function handleCropSkip() {
    if (!pendingFile) return;
    const blob = pendingFile;
    setCropSrc(null); setPendingFile(null);
    setImagePreview(URL.createObjectURL(blob));
    await uploadBlob(blob);
  }

  // ── Button builder ───────────────────────────────────────────────────────────

  function addButton() {
    if (!newBtn.label.trim() || !newBtn.url.trim()) return;
    setForm((f) => ({ ...f, buttons: [...f.buttons, { ...newBtn }] }));
    setNewBtn({ label: "", url: "", style: "primary" });
  }

  function removeButton(idx: number) {
    setForm((f) => ({ ...f, buttons: f.buttons.filter((_, i) => i !== idx) }));
  }

  // ── Save ─────────────────────────────────────────────────────────────────────

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    const isEdit = !!modal.popup;
    const url = isEdit ? `/api/admin/popups/${modal.popup!.id}` : "/api/admin/popups";
    try {
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title || null,
          body: form.body || null,
          imageUrl: form.imageUrl || null,
          buttons: form.buttons.length > 0 ? JSON.stringify(form.buttons) : null,
          active: form.active,
          showOnce: form.showOnce,
          delaySeconds: form.delaySeconds,
        }),
      });
      if (res.ok) {
        setModal({ open: false });
        load();
        showToast(isEdit ? "Popup updated." : "Popup created.");
      } else {
        const j = await res.json().catch(() => ({}));
        setFormError((j as { message?: string }).message ?? "Failed to save.");
      }
    } catch { setFormError("Network error. Please try again."); }
    finally { setSaving(false); }
  }

  async function toggleActive(p: PopupItem) {
    await fetch(`/api/admin/popups/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !p.active }),
    });
    load();
    showToast(!p.active ? "Popup activated." : "Popup deactivated.");
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/admin/popups/${deleteTarget.id}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteTarget(null);
    load();
    showToast("Popup deleted.");
  }

  // ── Styles ───────────────────────────────────────────────────────────────────

  const inputCls = "w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors";
  const labelCls = "block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5";

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="p-6 max-w-5xl mx-auto">
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
          <h1 className="text-white text-xl font-bold">Popups</h1>
          <p className="text-gray-600 text-sm mt-0.5">Create website popups with images, text, and action buttons.</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold rounded-lg transition-colors">
          + New Popup
        </button>
      </div>

      {/* Note */}
      <div className="mb-6 bg-amber-400/8 border border-amber-400/20 rounded-xl px-4 py-3 flex items-start gap-3">
        <svg className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
        </svg>
        <p className="text-amber-300 text-xs leading-relaxed">
          Only <strong>one popup</strong> can be active at a time. Activating a popup automatically deactivates all others.
        </p>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-900 border border-white/[0.06] rounded-xl p-5 animate-pulse flex gap-4">
              <div className="w-24 h-16 bg-gray-800 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-800 rounded w-1/3" />
                <div className="h-3 bg-gray-800 rounded w-2/3" />
                <div className="h-3 bg-gray-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : popups.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 border border-white/[0.06] rounded-xl">
          <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3"/>
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No popups yet.</p>
          <button onClick={openAdd} className="mt-3 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">
            Create your first popup →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {popups.map((p) => {
            const buttons = parseButtons(p.buttons);
            return (
              <div key={p.id} className={`bg-gray-900 border rounded-xl overflow-hidden transition-all ${p.active ? "border-amber-400/40" : "border-white/[0.06] hover:border-white/[0.1]"}`}>
                <div className="flex items-start gap-4 p-5">
                  {/* Image thumb */}
                  {p.imageUrl ? (
                    <div className="relative w-28 h-18 rounded-lg overflow-hidden shrink-0 border border-white/[0.06]" style={{ height: "4.5rem" }}>
                      <Image src={p.imageUrl} alt={p.title ?? "popup"} fill sizes="112px" className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-28 shrink-0 flex items-center justify-center h-[4.5rem] rounded-lg bg-gray-800 border border-white/[0.06]">
                      <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z"/>
                      </svg>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {p.active && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">● LIVE</span>}
                      {!p.active && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gray-700 text-gray-500">Inactive</span>}
                      {p.showOnce && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Show once</span>}
                      <span className="text-[9px] text-gray-600">{p.delaySeconds}s delay</span>
                    </div>
                    {p.title && <p className="text-white font-semibold text-sm truncate">{p.title}</p>}
                    {p.body && <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{p.body}</p>}
                    {buttons.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {buttons.map((btn, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-white/[0.05]">
                            {btn.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => toggleActive(p)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${p.active ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-green-500/15 hover:bg-green-500/25 text-green-400 border border-green-500/20"}`}
                    >
                      {p.active ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => openEdit(p)} className="px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 hover:text-white text-xs font-semibold rounded-lg transition-colors">
                      Edit
                    </button>
                    <button onClick={() => setDeleteTarget(p)} className="px-3 py-1.5 bg-red-900/30 hover:bg-red-900/60 text-red-400 text-xs font-semibold rounded-lg transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modal ─────────────────────────────────────────────────────────────── */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setModal({ open: false }); }}
        >
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h2 className="text-white font-bold text-sm">{modal.popup ? "Edit Popup" : "New Popup"}</h2>
              <button onClick={() => setModal({ open: false })} className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/[0.06]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {formError && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">{formError}</div>}

              {/* Title */}
              <div>
                <label className={labelCls}>Title <span className="text-gray-600 font-normal normal-case tracking-normal">(optional headline)</span></label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Admissions Open 2081!"
                  className={inputCls}
                />
              </div>

              {/* Body */}
              <div>
                <label className={labelCls}>Body Text <span className="text-gray-600 font-normal normal-case tracking-normal">(optional)</span></label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  rows={3}
                  placeholder="Short description or announcement…"
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Image */}
              <div>
                <label className={labelCls}>Banner Image <span className="text-gray-600 font-normal normal-case tracking-normal">(optional)</span></label>
                <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-4 transition-colors cursor-pointer ${uploading ? "border-amber-400/50 bg-amber-400/5 cursor-wait" : "border-white/[0.08] hover:border-amber-400/50 hover:bg-white/[0.02]"}`}>
                  {imagePreview ? (
                    <div className="w-full">
                      <div className="relative w-full h-36 rounded-lg overflow-hidden">
                        <Image src={imagePreview} alt="Preview" fill sizes="600px" className="object-cover" unoptimized={imagePreview.startsWith("blob:")} />
                      </div>
                      <p className={`text-xs text-center mt-2 ${uploading ? "text-amber-400 animate-pulse" : "text-gray-500"}`}>
                        {uploading ? "Uploading…" : "Click to replace"}
                      </p>
                    </div>
                  ) : (
                    <>
                      <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                      </svg>
                      <p className="text-gray-400 text-xs">Click to upload · JPG, PNG, WebP</p>
                    </>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} disabled={uploading} className="sr-only" />
                </label>
                {uploadError && <p className="text-red-400 text-xs mt-1.5">{uploadError}</p>}
                {imagePreview && !uploading && (
                  <button type="button" onClick={() => { setImagePreview(null); setForm((f) => ({ ...f, imageUrl: "" })); }}
                    className="mt-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors">
                    Remove image
                  </button>
                )}
              </div>

              {/* Buttons builder */}
              <div>
                <label className={labelCls}>Action Buttons <span className="text-gray-600 font-normal normal-case tracking-normal">(optional, add up to 3)</span></label>

                {/* Existing buttons */}
                {form.buttons.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {form.buttons.map((btn, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-800 border border-white/[0.06] rounded-lg px-3 py-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${btn.style === "primary" ? "bg-amber-400 text-gray-900" : btn.style === "secondary" ? "bg-gray-700 text-gray-300" : "border border-gray-500 text-gray-400"}`}>
                          {btn.style}
                        </span>
                        <span className="text-white text-xs font-semibold truncate">{btn.label}</span>
                        <span className="text-gray-600 text-xs truncate flex-1">→ {btn.url}</span>
                        <button type="button" onClick={() => removeButton(i)} className="text-gray-600 hover:text-red-400 transition-colors shrink-0">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new button */}
                {form.buttons.length < 3 && (
                  <div className="bg-gray-800/60 border border-white/[0.06] rounded-xl p-4 space-y-3">
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Add Button</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Label</label>
                        <input
                          value={newBtn.label}
                          onChange={(e) => setNewBtn({ ...newBtn, label: e.target.value })}
                          placeholder="Apply Now"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>URL</label>
                        <input
                          value={newBtn.url}
                          onChange={(e) => setNewBtn({ ...newBtn, url: e.target.value })}
                          placeholder="/admissions or https://…"
                          className={inputCls}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Style</label>
                      <div className="flex gap-2">
                        {(["primary", "secondary", "outline"] as PopupButton["style"][]).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setNewBtn({ ...newBtn, style: s })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${newBtn.style === s ? (s === "primary" ? "bg-amber-400 text-gray-900 border-amber-400" : s === "secondary" ? "bg-gray-600 text-white border-gray-600" : "border-white text-white") : "border-gray-700 text-gray-500 hover:border-gray-500"}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addButton}
                      disabled={!newBtn.label.trim() || !newBtn.url.trim()}
                      className="w-full py-2 bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-40 text-gray-300 text-xs font-bold rounded-lg transition-colors"
                    >
                      + Add Button
                    </button>
                  </div>
                )}
              </div>

              {/* Settings row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Delay (seconds)</label>
                  <input
                    type="number" min={0} max={30}
                    value={form.delaySeconds}
                    onChange={(e) => setForm({ ...form, delaySeconds: Number(e.target.value) })}
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col justify-end gap-3 pb-0.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.showOnce} onChange={(e) => setForm({ ...form, showOnce: e.target.checked })}
                      className="w-4 h-4 rounded accent-amber-400" />
                    <span className="text-gray-400 text-sm">Show once per visitor</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })}
                      className="w-4 h-4 rounded accent-amber-400" />
                    <span className="text-gray-400 text-sm">Active (live on site)</span>
                  </label>
                </div>
              </div>

              {form.active && (
                <div className="bg-amber-400/8 border border-amber-400/20 rounded-lg px-4 py-2.5 text-amber-300 text-xs">
                  ⚠️ Activating this popup will automatically deactivate any currently active popup.
                </div>
              )}

              {/* Footer */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal({ open: false })} disabled={saving}
                  className="flex-1 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-50 text-gray-300 text-sm font-semibold rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving || uploading}
                  className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-bold rounded-lg transition-colors">
                  {uploading ? "Uploading image…" : saving ? "Saving…" : modal.popup ? "Save Changes" : "Create Popup"}
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

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}>
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-white font-bold text-sm mb-1">Delete popup?</h3>
            <p className="text-gray-600 text-xs mb-5">This cannot be undone.</p>
            <div className="bg-gray-800 rounded-lg px-3 py-2.5 mb-5">
              <p className="text-gray-300 text-sm font-semibold">{deleteTarget.title ?? "(no title)"}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setDeleteTarget(null)} disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-50 text-gray-300 text-sm font-semibold rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors">
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
