"use client";

import { useState, useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { ResumeUpload } from "./_components/ResumeUpload";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Vacancy {
  id: string;
  title: string;
  category: string;
  posts: number;
  description: string | null;
}

const experienceOptions = [
  "Fresher",
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "5+ years",
];

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  qualification: string;
  experience: string;
  coverLetter: string;
  resumeUrl: string;
}

const EMPTY_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  qualification: "",
  experience: "",
  coverLetter: "",
  resumeUrl: "",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [vacanciesLoading, setVacanciesLoading] = useState(true);

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/vacancies")
      .then((r) => r.json())
      .then((json) => setVacancies(json.data ?? []))
      .catch(() => setVacancies([]))
      .finally(() => setVacanciesLoading(false));
  }, []);

  // Derive category from selected position
  function getCategoryFromPosition(pos: string): string {
    const match = vacancies.find((v) => v.title === pos);
    return match?.category ?? "Teaching";
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");
    setFieldErrors({});

    if (!form.resumeUrl) {
      setState("error");
      setErrorMsg("Please upload your CV or resume before submitting.");
      return;
    }

    try {
      const category = getCategoryFromPosition(form.position);
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setState("success");
        setForm(EMPTY_FORM);
      } else {
        setState("error");
        setErrorMsg(json.message ?? "Something went wrong. Please try again.");
        if (json.errors) setFieldErrors(json.errors);
      }
    } catch {
      setState("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  // Group vacancies by category
  const grouped: Record<string, Vacancy[]> = {};
  for (const v of vacancies) {
    if (!grouped[v.category]) grouped[v.category] = [];
    grouped[v.category].push(v);
  }

  const inputCls =
    "w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#1B3E72] bg-white text-gray-900 placeholder-gray-400";

  const labelCls =
    "block text-xs font-bold uppercase tracking-wider mb-2";

  return (
    <>
      <Header />
      <main className="pt-[73px]">
        {/* ── Current Openings ─────────────────────────────────────────────── */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section header */}
            <div className="mb-14">
              <p className="text-amber-500 text-[11px] font-bold uppercase tracking-[0.25em] mb-3">
                Open Positions
              </p>
              <h2 className="text-4xl font-extrabold mb-4 tracking-tight" style={{ color: "#1B3E72" }}>
                Current Openings
              </h2>
              <div className="w-16 h-0.5 bg-amber-400" aria-hidden="true" />
            </div>

            {vacanciesLoading ? (
              /* Skeleton */
              <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                {[0, 1].map((col) => (
                  <div key={col} className="space-y-3">
                    <div className="h-5 bg-gray-100 w-40 animate-pulse" />
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex justify-between py-4 border-b border-gray-100 animate-pulse">
                        <div className="h-4 bg-gray-100 rounded w-48" />
                        <div className="h-3 bg-gray-100 rounded w-16" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : vacancies.length === 0 ? (
              <div className="border-l-4 border-amber-400 pl-5 py-4 bg-amber-50">
                <p className="text-gray-700 text-sm font-medium">
                  No vacancies are currently listed. Please check back soon or email us at{" "}
                  <a
                    href="mailto:info@kmclalitpur.edu.np"
                    className="font-semibold text-[#1B3E72] hover:text-amber-600 transition-colors"
                  >
                    info@kmclalitpur.edu.np
                  </a>
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    {/* Category header */}
                    <div className="mb-6">
                      <h3
                        className="text-[11px] font-bold uppercase tracking-[0.18em] pb-3"
                        style={{ color: "#1B3E72" }}
                      >
                        {category === "Teaching" ? "Teaching Faculty" : "Non-Teaching Staff"}
                      </h3>
                      <div className="w-10 h-0.5 bg-amber-400" aria-hidden="true" />
                    </div>

                    {/* Vacancy rows */}
                    <ul className="space-y-0">
                      {items.map((v) => (
                        <li
                          key={v.id}
                          className="border-l-2 border-amber-400 pl-4 py-3.5 border-b border-b-gray-100 last:border-b-0"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p
                                className="font-bold text-sm leading-snug"
                                style={{ color: "#1B3E72" }}
                              >
                                {v.title}
                              </p>
                              {v.description && (
                                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                                  {v.description}
                                </p>
                              )}
                            </div>
                            <span
                              className="text-[11px] font-semibold whitespace-nowrap mt-0.5"
                              style={{ color: "#f59e0b" }}
                            >
                              {v.posts} {v.posts === 1 ? "opening" : "openings"}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Contact note */}
            {!vacanciesLoading && vacancies.length > 0 && (
              <div className="mt-12 border-l-4 border-amber-400 pl-5 py-3 bg-amber-50">
                <p className="text-sm text-gray-700">
                  To apply, fill the form below or email your CV to{" "}
                  <a
                    href="mailto:info@kmclalitpur.edu.np"
                    className="font-semibold text-[#1B3E72] hover:text-amber-600 transition-colors"
                  >
                    info@kmclalitpur.edu.np
                  </a>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Application Form ─────────────────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ backgroundColor: "#f7f5f0" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section header */}
            <div className="mb-14">
              <p className="text-amber-500 text-[11px] font-bold uppercase tracking-[0.25em] mb-3">
                Apply
              </p>
              <h2 className="text-4xl font-extrabold mb-4 tracking-tight" style={{ color: "#1B3E72" }}>
                Submit Your Application
              </h2>
              <div className="w-16 h-0.5 bg-amber-400" aria-hidden="true" />
            </div>

            <div className="max-w-3xl">
              {state === "success" ? (
                <div className="border-l-4 border-green-500 pl-5 py-4 bg-green-50">
                  <p className="font-bold text-green-800 text-sm mb-1">
                    Application submitted successfully!
                  </p>
                  <p className="text-green-700 text-sm">
                    Thank you for your interest. We&apos;ll be in touch within 5 working days.
                  </p>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-4 text-xs font-bold text-green-700 underline underline-offset-2 hover:text-green-900 transition-colors uppercase tracking-wider"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-0">
                  {/* Error banner */}
                  {state === "error" && errorMsg && (
                    <div className="border-l-4 border-red-500 pl-5 py-3 bg-red-50 mb-8">
                      <p className="text-red-700 text-sm font-medium">{errorMsg}</p>
                    </div>
                  )}

                  {/* Section: Personal Information */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <p
                        className="text-[11px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: "#1B3E72" }}
                      >
                        Personal Information
                      </p>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="fullName" className={labelCls} style={{ color: "#1B3E72" }}>
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={form.fullName}
                          onChange={handleChange}
                          required
                          className={inputCls}
                          placeholder="Your full name"
                        />
                        {fieldErrors.fullName && (
                          <p className="mt-1.5 text-xs text-red-600">{fieldErrors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className={labelCls} style={{ color: "#1B3E72" }}>
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className={inputCls}
                          placeholder="your@email.com"
                        />
                        {fieldErrors.email && (
                          <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="max-w-xs">
                      <label htmlFor="phone" className={labelCls} style={{ color: "#1B3E72" }}>
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className={inputCls}
                        placeholder="98XXXXXXXX"
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1.5 text-xs text-red-600">{fieldErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Section: Application Details */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <p
                        className="text-[11px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: "#1B3E72" }}
                      >
                        Application Details
                      </p>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Position */}
                    <div className="mb-6">
                      <label htmlFor="position" className={labelCls} style={{ color: "#1B3E72" }}>
                        Position Applied For <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="position"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        required
                        className={inputCls}
                        disabled={vacanciesLoading}
                      >
                        <option value="">
                          {vacanciesLoading ? "Loading positions…" : "— Select a position —"}
                        </option>
                        {Object.entries(grouped).map(([category, items]) => (
                          <optgroup
                            key={category}
                            label={category === "Teaching" ? "Teaching Faculty" : "Non-Teaching Staff"}
                          >
                            {items.map((v) => (
                              <option key={v.id} value={v.title}>
                                {v.title} ({v.posts} {v.posts === 1 ? "post" : "posts"})
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      {fieldErrors.position && (
                        <p className="mt-1.5 text-xs text-red-600">{fieldErrors.position}</p>
                      )}
                    </div>

                    {/* Qualification + Experience */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="qualification" className={labelCls} style={{ color: "#1B3E72" }}>
                          Highest Qualification <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="qualification"
                          name="qualification"
                          type="text"
                          value={form.qualification}
                          onChange={handleChange}
                          required
                          className={inputCls}
                          placeholder="e.g. M.Sc. Physics, B.Ed."
                        />
                        {fieldErrors.qualification && (
                          <p className="mt-1.5 text-xs text-red-600">{fieldErrors.qualification}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="experience" className={labelCls} style={{ color: "#1B3E72" }}>
                          Years of Experience <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={form.experience}
                          onChange={handleChange}
                          required
                          className={inputCls}
                        >
                          <option value="">— Select —</option>
                          {experienceOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.experience && (
                          <p className="mt-1.5 text-xs text-red-600">{fieldErrors.experience}</p>
                        )}
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="mb-6">
                      <label htmlFor="coverLetter" className={labelCls} style={{ color: "#1B3E72" }}>
                        Cover Letter / Message{" "}
                        <span className="text-gray-400 normal-case font-normal">(optional)</span>
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows={5}
                        value={form.coverLetter}
                        onChange={handleChange}
                        className={`${inputCls} resize-none`}
                        placeholder="Tell us briefly why you'd like to join KMC Lalitpur and what makes you a strong candidate."
                      />
                      {fieldErrors.coverLetter && (
                        <p className="mt-1.5 text-xs text-red-600">{fieldErrors.coverLetter}</p>
                      )}
                    </div>

                    {/* CV / Resume Upload */}
                    <div className="mb-8">
                      <label className={labelCls} style={{ color: "#1B3E72" }}>
                        CV / Resume{" "}
                        <span className="text-red-500">*</span>{" "}
                        <span className="text-gray-400 normal-case font-normal">
                          (PDF, DOC, DOCX · max 5 MB)
                        </span>
                      </label>
                      <ResumeUpload
                        value={form.resumeUrl}
                        onChange={(url) => setForm((prev) => ({ ...prev, resumeUrl: url }))}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={state === "submitting"}
                      className="px-10 py-3.5 text-sm font-bold uppercase tracking-wider transition-opacity disabled:opacity-60"
                      style={{ backgroundColor: "#f59e0b", color: "#1B3E72" }}
                    >
                      {state === "submitting" ? "Submitting…" : "Submit Application"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
