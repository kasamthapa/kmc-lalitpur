"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = "kmc",
  label = "Cover Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Max 10 MB.");
      return;
    }
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      setError("Only JPEG, PNG, WebP, or GIF images are allowed.");
      return;
    }

    setError("");
    setUploading(true);
    setProgress(20);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", `/${folder}`);
      setProgress(50);

      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      setProgress(85);

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(
          (json as { error?: string })?.error ?? "Upload failed."
        );
      }

      const data = (await res.json()) as { url: string };
      setProgress(100);
      onChange(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed. Try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = ""; // reset so same file can be picked again
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <p className="text-gray-300 text-sm font-medium mb-2">{label}</p>

      {/* ── Uploading ──────────────────────────────────────────────────── */}
      {uploading && (
        <div className="bg-gray-750 border border-gray-600 rounded-xl p-4 mb-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-300 text-sm">Uploading…</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-amber-400 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Preview (image selected) ───────────────────────────────────── */}
      {value && !uploading && (
        <div className="rounded-xl overflow-hidden border border-gray-600 mb-2">
          <div className="relative w-full h-48 bg-gray-800">
            <Image src={value} alt="Preview" fill sizes="600px" className="object-cover" />
          </div>
          <div className="flex gap-2 p-2 bg-gray-800">
            {/* Replace — file input overlaid on the button */}
            <div className="relative flex-1">
              <button
                type="button"
                className="w-full py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-semibold rounded-lg transition-colors"
              >
                Replace image
              </button>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                onChange={onInputChange}
                disabled={uploading}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                title="Choose a replacement image"
              />
            </div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex-1 py-1.5 bg-red-900/60 hover:bg-red-800 text-red-300 text-xs font-semibold rounded-lg transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* ── Drop-zone / picker (no image yet) ─────────────────────────── */}
      {!value && !uploading && (
        <div
          className="relative flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-500 hover:border-amber-400 rounded-xl p-10 text-center transition-colors group cursor-pointer"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {/* Visible content */}
          <svg
            width="40" height="40" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            className="text-gray-400 group-hover:text-amber-400 transition-colors pointer-events-none"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div className="pointer-events-none">
            <p className="text-gray-200 text-sm font-semibold group-hover:text-amber-400 transition-colors">
              Click to browse files
            </p>
            <p className="text-gray-400 text-xs mt-1">or drag &amp; drop here</p>
            <p className="text-gray-500 text-xs mt-1">JPEG · PNG · WebP · max 10 MB</p>
          </div>

          {/* Transparent file input covering the entire zone */}
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={onInputChange}
            disabled={uploading}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            title="Click to choose an image file"
          />
        </div>
      )}

      {/* ── Error ─────────────────────────────────────────────────────── */}
      {error && (
        <div className="mt-2 bg-red-950 border border-red-700 rounded-lg px-3 py-2.5 text-red-300 text-sm">
          ⚠ {error}
        </div>
      )}
    </div>
  );
}
