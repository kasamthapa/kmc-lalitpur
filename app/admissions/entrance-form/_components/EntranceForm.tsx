"use client";

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";

// ── Image compression before upload ──────────────────────────────────────────
async function compressIfImage(file: File): Promise<File> {
  // Skip compression for PDFs
  if (file.type === "application/pdf") return file;
  try {
    return await imageCompression(file, {
      maxSizeMB: 0.5,        // target max 500 KB
      maxWidthOrHeight: 1200, // enough resolution to read payment details
      useWebWorker: true,
      fileType: "image/webp", // convert everything to webp
    });
  } catch {
    // If compression fails for any reason, upload original
    return file;
  }
}

// ── Cloudinary upload ─────────────────────────────────────────────────────────
async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset    = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !preset) throw new Error("Upload configuration missing.");

  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);
  fd.append("folder", "kmc/entrance-payments");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error((j as { error?: { message?: string } })?.error?.message ?? "Upload failed.");
  }

  const data = await res.json() as { secure_url: string };
  return data.secure_url;
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormData {
  fullName:    string;
  dateOfBirth: string;
  gender:      string;
  phone:       string;
  email:       string;
  address:     string;
  stream:      string;
  seeSchool:   string;
  seeYear:     string;
  seeGpa:      string;
  seeMaths:    string;
  seeScience:  string;
  seeEnglish:  string;
}

const DRAFT_KEY = "kmc_entrance_form_draft";

const INITIAL: FormData = {
  fullName: "", dateOfBirth: "", gender: "", phone: "", email: "",
  address: "", stream: "", seeSchool: "", seeYear: "", seeGpa: "",
  seeMaths: "", seeScience: "", seeEnglish: "",
};

function loadDraft(): FormData {
  try {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) return { ...INITIAL, ...JSON.parse(saved) };
  } catch { /* ignore */ }
  return INITIAL;
}

function saveDraft(data: FormData) {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
}

const SEE_YEARS = ["2081", "2080", "2079", "2078", "2077", "2076", "2075"];
const GRADE_OPTIONS = ["A+", "A", "B+", "B", "C+", "C", "D+", "D", "E", "NG"];

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-[#1a2e4a] mb-1.5">
      {children}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2.5 rounded-lg border bg-white text-[#1a2e4a] text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]/30 focus:border-[#0B1F3A] transition ${
        props.className ?? "border-gray-200"
      }`}
    />
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full px-4 py-2.5 rounded-lg border bg-white text-[#1a2e4a] text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]/30 focus:border-[#0B1F3A] transition ${
        props.className ?? "border-gray-200"
      }`}
    >
      {children}
    </select>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function EntranceForm() {
  const [form, setForm]           = useState<FormData>(INITIAL);
  const [draftRestored, setDraftRestored] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [referenceNo, setReferenceNo] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Restore draft on mount
  useEffect(() => {
    const draft = loadDraft();
    const hasData = Object.values(draft).some((v) => v !== "");
    if (hasData) { setForm(draft); setDraftRestored(true); }
  }, []);

  // Auto-save draft on every change
  useEffect(() => { saveDraft(form); }, [form]);

  function set(field: keyof FormData) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Accept images and PDFs (screenshots can be PNG, JPG, HEIC, WEBP, PDF)
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/heic", "image/heif", "application/pdf"];
    if (!allowed.includes(file.type) && !file.name.toLowerCase().match(/\.(png|jpg|jpeg|webp|heic|heif|pdf)$/)) {
      setError("Please upload an image (PNG, JPG, WEBP, HEIC) or PDF of your payment receipt.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be under 10 MB.");
      return;
    }

    setError(null);
    setScreenshotFile(file);

    // Preview for images only
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setScreenshotPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setScreenshotPreview(null); // PDF — no preview
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!form.fullName.trim())    return setError("Full name is required.");
    if (!form.dateOfBirth)        return setError("Date of birth is required.");
    if (!form.gender)             return setError("Please select your gender.");
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, "")))
      return setError("Phone number must be exactly 10 digits.");
    if (!form.address.trim())     return setError("Address is required.");
    if (!form.stream)             return setError("Please select a stream.");
    if (!form.seeSchool.trim())   return setError("Previous school name is required.");
    if (!form.seeYear)            return setError("Please select your SEE year.");
    if (!form.seeGpa.trim())      return setError("SEE GPA/grade is required.");
    if (!screenshotFile)          return setError("Please upload your payment screenshot.");

    try {
      setUploading(true);
      const compressed = await compressIfImage(screenshotFile);
      const paymentScreenshotUrl = await uploadToCloudinary(compressed);
      setUploading(false);

      setSubmitting(true);
      const res = await fetch("/api/entrance-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: form.phone.replace(/\s/g, ""),
          paymentScreenshotUrl,
        }),
      });

      const json = await res.json() as { success: boolean; data?: { referenceNo: string }; message?: string };

      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Submission failed. Please try again.");
      }

      clearDraft();
      setReferenceNo(json.data!.referenceNo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (referenceNo) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-green-200 p-10 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#0B1F3A] mb-3">Application Submitted!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Your entrance exam application has been received. Please save your reference number —
            you will need it for all communications with the college.
          </p>
          <div className="bg-[#0B1F3A] text-white rounded-xl px-8 py-5 mb-6 inline-block">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Your Reference Number</p>
            <p className="text-3xl font-bold tracking-wider">{referenceNo}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-8">
            <p className="text-amber-800 text-sm font-semibold mb-1">Important — What happens next</p>
            <ul className="text-amber-700 text-sm space-y-1 list-disc list-inside">
              <li>The college will verify your payment proof within 2–3 working days.</li>
              <li>You will be contacted on <strong>{form.phone}</strong> with your admit card details.</li>
              <li>Keep your reference number <strong>{referenceNo}</strong> for all inquiries.</li>
            </ul>
          </div>
          <p className="text-gray-400 text-sm">
            Questions? Call us at{" "}
            <a href="tel:+977-1-5183408" className="text-amber-600 font-semibold hover:underline">
              01-5183408
            </a>
          </p>
        </div>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">

      {/* Draft restored banner */}
      {draftRestored && (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-5 py-3">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            <p className="text-blue-800 text-sm font-medium">Your previous progress has been restored.</p>
          </div>
          <button type="button" onClick={() => { clearDraft(); setForm(INITIAL); setDraftRestored(false); }}
            className="text-blue-600 text-xs hover:underline shrink-0 ml-4">
            Start fresh
          </button>
        </div>
      )}

      {/* ── Section 1: Personal Details ────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-[#0B1F3A] px-6 py-4">
          <h2 className="text-white font-bold text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-[#0B1F3A] text-xs font-black flex items-center justify-center">1</span>
            Personal Information
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Label required>Full Name (as per citizenship / birth certificate)</Label>
            <Input
              type="text"
              value={form.fullName}
              onChange={set("fullName")}
              placeholder="e.g. Ram Bahadur Shrestha"
              required
            />
          </div>
          <div>
            <Label required>Date of Birth</Label>
            <Input type="date" value={form.dateOfBirth} onChange={set("dateOfBirth")} required />
          </div>
          <div>
            <Label required>Gender</Label>
            <Select value={form.gender} onChange={set("gender")} required>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <div>
            <Label required>Phone Number</Label>
            <Input
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              placeholder="98XXXXXXXX"
              maxLength={10}
              required
            />
          </div>
          <div>
            <Label>Email Address (optional)</Label>
            <Input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="yourname@email.com"
            />
          </div>
          <div className="md:col-span-2">
            <Label required>Current Address</Label>
            <Input
              type="text"
              value={form.address}
              onChange={set("address")}
              placeholder="e.g. Balkumari, Lalitpur"
              required
            />
          </div>
        </div>
      </div>

      {/* ── Section 2: Stream Selection ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-[#0B1F3A] px-6 py-4">
          <h2 className="text-white font-bold text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-[#0B1F3A] text-xs font-black flex items-center justify-center">2</span>
            Stream & Academic Details
          </h2>
        </div>
        <div className="p-6 space-y-5">
          {/* Stream Selection */}
          <div>
            <Label required>Select Stream</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
              {[
                { value: "Science",    desc: "Physics, Chemistry, Biology / Computer Science", color: "border-blue-500 bg-blue-50 text-blue-800" },
                { value: "Management", desc: "Accountancy, Economics, Business Studies",       color: "border-green-500 bg-green-50 text-green-800" },
                { value: "Law",        desc: "Political Science, History, Social Studies",     color: "border-orange-500 bg-orange-50 text-orange-800" },
              ].map((s) => (
                <label
                  key={s.value}
                  className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                    form.stream === s.value
                      ? s.color + " border-opacity-100"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="stream"
                    value={s.value}
                    checked={form.stream === s.value}
                    onChange={set("stream")}
                    className="sr-only"
                  />
                  <p className="font-bold text-[#0B1F3A] mb-1">{s.value}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <Label required>Previous School / SLC Centre</Label>
              <Input
                type="text"
                value={form.seeSchool}
                onChange={set("seeSchool")}
                placeholder="e.g. Bal Bikas Secondary School, Lalitpur"
                required
              />
            </div>
            <div>
              <Label required>SEE Year (B.S.)</Label>
              <Select value={form.seeYear} onChange={set("seeYear")} required>
                <option value="">Select year</option>
                {SEE_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </Select>
            </div>
            <div>
              <Label required>Overall SEE GPA</Label>
              <Input
                type="text"
                value={form.seeGpa}
                onChange={set("seeGpa")}
                placeholder="e.g. 3.85"
                required
              />
            </div>
          </div>

          {/* Individual subject grades */}
          <div>
            <p className="text-sm font-semibold text-[#1a2e4a] mb-2">Individual Subject Grades <span className="font-normal text-gray-400">(optional but recommended)</span></p>
            <div className="grid grid-cols-3 gap-4">
              {([
                ["seeMaths",   "Mathematics"],
                ["seeScience", "Science"],
                ["seeEnglish", "English"],
              ] as [keyof FormData, string][]).map(([field, label]) => (
                <div key={field}>
                  <Label>{label}</Label>
                  <Select value={form[field]} onChange={set(field)}>
                    <option value="">Grade</option>
                    {GRADE_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Payment ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-[#0B1F3A] px-6 py-4">
          <h2 className="text-white font-bold text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-[#0B1F3A] text-xs font-black flex items-center justify-center">3</span>
            Application Fee Payment
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment details */}
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-amber-800 font-bold text-sm mb-3 uppercase tracking-wide">Payment Details</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Name:</span>
                    <span className="font-semibold text-[#0B1F3A]">XYZ Bank (to be confirmed)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-semibold text-[#0B1F3A]">KMC Lalitpur</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account No:</span>
                    <span className="font-semibold text-[#0B1F3A] font-mono">XXXX-XXX-XXXXXX</span>
                  </div>
                  <div className="flex justify-between border-t border-amber-200 pt-2 mt-2">
                    <span className="text-gray-600 font-semibold">Amount:</span>
                    <span className="font-bold text-amber-700 text-base">Rs. 500</span>
                  </div>
                </div>
              </div>

              {/* QR Code placeholder */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
                <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <p className="text-gray-400 text-xs text-center leading-tight">QR Code<br/>Coming Soon</p>
                </div>
                <p className="text-xs text-gray-500">Scan with your banking app to pay</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 text-xs leading-relaxed">
                  <strong>Note:</strong> You can pay via eSewa, Khalti, IME Pay, or direct bank transfer.
                  After payment, take a screenshot of the success screen and upload it below.
                </p>
              </div>
            </div>

            {/* Screenshot upload */}
            <div>
              <Label required>Upload Payment Screenshot</Label>
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 mb-3">
                <p className="text-blue-800 text-xs font-semibold mb-0.5">📱 Important — Take a screenshot, not a photo</p>
                <p className="text-blue-700 text-xs leading-relaxed">
                  After paying via eSewa / Khalti / bank, take a <strong>screenshot</strong> of the success screen (press Home + Power on iPhone, or Volume Down + Power on Android). Do <strong>not</strong> upload a camera photo — screenshots are small and upload faster.
                </p>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Accepts PNG, JPG, WEBP, HEIC (iPhone), and PDF. Max 10 MB.
              </p>

              <div
                className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#0B1F3A] hover:bg-gray-50 transition"
                onClick={() => fileRef.current?.click()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  className="sr-only"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,application/pdf,.heic,.heif"
                  onChange={handleFileChange}
                />

                {screenshotPreview ? (
                  <div className="space-y-3">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image src={screenshotPreview} alt="Payment screenshot preview" fill className="object-contain" />
                    </div>
                    <p className="text-xs text-gray-500">{screenshotFile?.name}</p>
                    <button
                      type="button"
                      className="text-xs text-red-500 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setScreenshotFile(null);
                        setScreenshotPreview(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                    >
                      Remove and choose different file
                    </button>
                  </div>
                ) : screenshotFile ? (
                  // PDF uploaded
                  <div className="space-y-2">
                    <svg className="mx-auto" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <p className="text-sm font-semibold text-green-700">{screenshotFile.name}</p>
                    <button
                      type="button"
                      className="text-xs text-red-500 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setScreenshotFile(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="mx-auto text-gray-400" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <p className="text-sm text-gray-600 font-medium">Click to upload payment screenshot</p>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP, HEIC, PDF — max 10 MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Declaration + Submit */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600 leading-relaxed">
          <strong className="text-[#0B1F3A]">Declaration:</strong> I hereby declare that all information provided in this form is true and correct to the best of my knowledge. I understand that providing false information may result in the cancellation of my application.
        </div>

        <button
          type="submit"
          disabled={uploading || submitting}
          className="w-full py-4 bg-[#0B1F3A] text-white font-bold rounded-xl hover:bg-[#142d52] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
        >
          {uploading ? (
            <>
              <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0"/>
              </svg>
              Compressing & uploading payment proof…
            </>
          ) : submitting ? (
            <>
              <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0"/>
              </svg>
              Submitting application…
            </>
          ) : (
            <>
              Submit Application
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
