"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

/* ─── types ─────────────────────────────────────────────────────────────── */
interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string | null;
  caption: string | null;
  displayOrder: number;
}

const CATEGORIES = [
  "Events",
  "Campus",
  "Sports",
  "Science",
  "Management",
  "Law",
  "Arts",
  "Achievements",
  "Admissions",
  "Other",
];

const BLANK = {
  src: "",
  alt: "",
  category: "",
  caption: "",
  displayOrder: "0",
};

/* ─── cloudinary upload helper ───────────────────────────────────────────── */
async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !preset) throw new Error("Cloudinary env vars missing.");

  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);
  fd.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: fd,
    },
  );
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(
      (j as { error?: { message?: string } })?.error?.message ??
        "Upload failed",
    );
  }
  const data = (await res.json()) as { secure_url: string };
  return data.secure_url;
}

/* ─── modal form ─────────────────────────────────────────────────────────── */
function PhotoModal({
  initial,
  editingId,
  onSave,
  onClose,
}: {
  initial: typeof BLANK;
  editingId: string | null;
  onSave: () => void;
  onClose: () => void;
}) {
  const [src, setSrc] = useState(initial.src);
  const [alt, setAlt] = useState(initial.alt);
  const [category, setCategory] = useState(initial.category);
  const [caption, setCaption] = useState(initial.caption);
  const [order, setOrder] = useState(initial.displayOrder);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, "kmc/gallery");
      setSrc(url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!src) {
      setError("Please upload an image first.");
      return;
    }
    if (!alt.trim()) {
      setError("Alt text is required.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const body = {
        src,
        alt: alt.trim(),
        category: category || null,
        caption: caption.trim() || null,
        displayOrder: parseInt(order, 10) || 0,
      };
      const url = editingId
        ? `/api/admin/gallery/${editingId}`
        : "/api/admin/gallery";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error((j as { message?: string })?.message ?? "Save failed");
      }
      onSave();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* panel */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-800">
          <h2 className="text-white font-bold text-lg">
            {editingId ? "Edit Photo" : "Add New Photo"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* error */}
          {error && (
            <div className="bg-red-950 border border-red-700 rounded-lg px-4 py-3 text-red-300 text-sm">
              ⚠ {error}
            </div>
          )}

          {/* ── image upload ──────────────────────────────────────────── */}
          <div>
            <p className="text-gray-300 text-sm font-medium mb-2">Photo</p>

            {uploading && (
              <div className="border border-gray-700 rounded-xl p-5 flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin shrink-0" />
                <span className="text-gray-300 text-sm">
                  Uploading to Cloudinary…
                </span>
              </div>
            )}

            {!uploading && src && (
              <div className="relative">
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-gray-800">
                  <Image
                    src={src}
                    alt="preview"
                    fill
                    sizes="480px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  {/* Replace */}
                  <label className="relative flex-1 cursor-pointer">
                    <span className="block text-center py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-lg transition-colors">
                      Replace image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                      className="sr-only"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setSrc("")}
                    className="flex-1 py-2 bg-red-900/40 hover:bg-red-900 text-red-400 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {!uploading && !src && (
              <label
                className="flex flex-col items-center gap-3 border-2 border-dashed border-gray-600 hover:border-amber-400 rounded-xl p-8 cursor-pointer transition-colors group"
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-gray-500 group-hover:text-amber-400 transition-colors"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <div className="text-center">
                  <p className="text-gray-200 text-sm font-semibold group-hover:text-amber-400 transition-colors">
                    Click to browse files
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    or drag &amp; drop · JPEG, PNG, WebP · max 10 MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="sr-only"
                />
              </label>
            )}
          </div>

          {/* alt text */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">
              Alt Text <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Describe the photo"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* category + order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="">— Select —</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                min="0"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* caption */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">
              Caption{" "}
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Caption shown below the photo"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* footer */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading || !src}
              className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 text-sm font-bold rounded-lg transition-colors"
            >
              {saving ? "Saving…" : editingId ? "Update Photo" : "Save Photo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── main page ──────────────────────────────────────────────────────────── */
export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; item?: GalleryItem }>({
    open: false,
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState("All");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      if (res.ok) {
        const j = await res.json();
        setItems(j.data ?? []);
      }
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string) {
    setDeleteId(null);
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    load();
  }

  const filtered =
    filterCat === "All" ? items : items.filter((i) => i.category === filterCat);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* ── modal ─────────────────────────────────────────────────────── */}
      {modal.open && (
        <PhotoModal
          initial={
            modal.item
              ? {
                  src: modal.item.src,
                  alt: modal.item.alt,
                  category: modal.item.category ?? "",
                  caption: modal.item.caption ?? "",
                  displayOrder: String(modal.item.displayOrder),
                }
              : BLANK
          }
          editingId={modal.item?.id ?? null}
          onSave={() => {
            setModal({ open: false });
            load();
          }}
          onClose={() => setModal({ open: false })}
        />
      )}

      {/* ── delete confirm ─────────────────────────────────────────────── */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold mb-2">Remove photo?</h3>
            <p className="text-gray-400 text-sm mb-5">
              The image on Cloudinary won&apos;t be deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── header ────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Gallery</h1>
          <p className="text-gray-400 text-sm mt-1">
            Upload and manage school photos.
          </p>
        </div>
        <button
          onClick={() => setModal({ open: true })}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold rounded-lg transition-colors shrink-0"
        >
          + Add Photo
        </button>
      </div>

      {/* ── category filter ───────────────────────────────────────────── */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterCat === cat
                  ? "bg-amber-400 text-gray-900"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {cat} (
              {cat === "All"
                ? items.length
                : items.filter((i) => i.category === cat).length}
              )
            </button>
          ))}
        </div>
      )}

      {/* ── grid ──────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="mx-auto mb-4 opacity-30"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="text-sm">
            {items.length === 0
              ? 'No photos yet — click "+ Add Photo" to upload the first one.'
              : "No photos in this category."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-gray-800 rounded-xl overflow-hidden"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => setModal({ open: true, item })}
                  className="px-4 py-1.5 bg-white text-gray-900 text-xs font-bold rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(item.id)}
                  className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg"
                >
                  Remove
                </button>
              </div>
              {item.category && (
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.category}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
