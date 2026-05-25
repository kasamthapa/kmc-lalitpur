"use client";

import { useState } from "react";

interface ResumeUploadProps {
  value: string; // Cloudinary secure URL once uploaded, empty string if not yet
  onChange: (url: string) => void;
}

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_EXTS = ".pdf, .doc, .docx";
const MAX_SIZE_MB = 5;

export function ResumeUpload({ value, onChange }: ResumeUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  async function handleFile(file: File) {
    if (!cloudName || !uploadPreset) {
      setError("File upload not configured. Please email your CV instead.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${MAX_SIZE_MB} MB.`);
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only PDF, DOC, or DOCX files are accepted.");
      return;
    }

    setError("");
    setUploading(true);
    setProgress(20);
    setFileName(file.name);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", uploadPreset);
      fd.append("folder", "kmc/resumes");
      fd.append("access_mode", "public");
      setProgress(50);

      // Use /raw/upload for non-image files (PDF, DOC, DOCX)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        { method: "POST", body: fd }
      );
      setProgress(85);

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(
          (json as { error?: { message?: string } })?.error?.message ??
            "Upload failed. Please try again."
        );
      }

      const data = (await res.json()) as { secure_url: string };
      setProgress(100);
      onChange(data.secure_url);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Upload failed. Please try again."
      );
      setFileName("");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function remove() {
    onChange("");
    setFileName("");
    setError("");
  }

  // ── Uploaded state ──────────────────────────────────────────────────────────
  if (value) {
    return (
      <div className="flex items-center gap-3 p-4 border-2 border-amber-400 bg-amber-50">
        <div className="w-10 h-10 bg-amber-400 flex items-center justify-center shrink-0 text-[#0B1F3A]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <polyline points="9 15 12 18 15 15"/>
            <line x1="12" y1="18" x2="12" y2="12"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#0B1F3A] truncate">
            {fileName || "CV / Resume uploaded"}
          </p>
          <p className="text-xs text-[#6b7280]">Uploaded successfully</p>
        </div>
        <button
          type="button"
          onClick={remove}
          className="text-xs font-semibold text-[#6b7280] hover:text-red-600 transition-colors shrink-0"
        >
          Remove
        </button>
      </div>
    );
  }

  // ── Uploading state ─────────────────────────────────────────────────────────
  if (uploading) {
    return (
      <div className="p-4 border-2 border-[#d1d5db]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin shrink-0" />
          <p className="text-sm text-[#374151]">
            Uploading <span className="font-semibold">{fileName}</span>…
          </p>
        </div>
        <div className="w-full bg-[#eae6de] h-1.5">
          <div
            className="h-1.5 bg-amber-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  // ── Default drop-zone ───────────────────────────────────────────────────────
  return (
    <div>
      <label
        className="relative flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#d1d5db] hover:border-amber-400 bg-white hover:bg-amber-50 p-8 text-center transition-all duration-200 group cursor-pointer"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#9ca3af] group-hover:text-amber-500 transition-colors"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-[#374151] group-hover:text-amber-600 transition-colors">
            Upload CV / Resume
          </p>
          <p className="text-xs text-[#9ca3af] mt-0.5">
            PDF, DOC, or DOCX — max {MAX_SIZE_MB} MB
          </p>
        </div>
        <input
          type="file"
          accept={ALLOWED_EXTS}
          onChange={onInputChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          aria-label="Upload CV or resume"
        />
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">⚠ {error}</p>
      )}
    </div>
  );
}
