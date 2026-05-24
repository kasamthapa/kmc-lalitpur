"use client";

import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { ResumeUpload } from "./_components/ResumeUpload";

// ─── Vacancy data ─────────────────────────────────────────────────────────────

const teachingVacancies = [
  { position: "English Teacher", posts: 2 },
  { position: "Mathematics Teacher", posts: 3 },
  { position: "Physics Teacher", posts: 2 },
  { position: "Chemistry Teacher", posts: 1 },
  { position: "Biology Teacher", posts: 2 },
  { position: "Accountancy Teacher", posts: 1 },
  { position: "Social Studies Teacher", posts: 1 },
  { position: "Law Teacher", posts: 1 },
];

const nonTeachingVacancies = [
  { position: "Nurse", posts: 1 },
  { position: "Lab Assistant (Biology/Chemistry)", posts: 1 },
  { position: "Hostel Warden (Female)", posts: 2 },
  { position: "Counselor (Female)", posts: 1 },
];

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
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  // Derive category from selected position
  function getCategoryFromPosition(pos: string): string {
    const isTeaching = teachingVacancies.some((v) => v.position === pos);
    return isTeaching ? "Teaching" : "Non-Teaching";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");
    setFieldErrors({});

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

  return (
    <>
      <Header />
      <main className="pt-[73px]">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative py-20 md:py-28 overflow-hidden"
          style={{ backgroundColor: "#0B1F3A" }}
        >
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 39px,#ffffff 39px,#ffffff 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#ffffff 39px,#ffffff 40px)",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-5">
                Join Our Team
              </p>
              <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-5">
                Shape minds.
                <br />
                Build futures.
              </h1>
              <p className="text-[#8ba7c7] text-lg leading-relaxed mb-10 max-w-xl">
                We&apos;re looking for passionate educators and staff to join
                the KMC Lalitpur family.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-10">
                <div>
                  <p className="text-white text-3xl font-extrabold">150+</p>
                  <p className="text-[#8ba7c7] text-sm mt-1">Faculty</p>
                </div>
                <div
                  className="w-px bg-white/10 self-stretch"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-white text-3xl font-extrabold">22+</p>
                  <p className="text-[#8ba7c7] text-sm mt-1">
                    Years of Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Current Openings ─────────────────────────────────────────────── */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section header */}
            <div className="mb-12">
              <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Vacancies
              </p>
              <h2
                className="text-3xl font-extrabold mb-3"
                style={{ color: "#0B1F3A" }}
              >
                Current Openings
              </h2>
              <div
                className="w-12 h-0.5 bg-amber-400"
                aria-hidden="true"
              />
            </div>

            {/* Two-column vacancy list */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {/* Teaching Faculty */}
              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-[0.15em] mb-6 pb-3 border-b-2"
                  style={{ color: "#0B1F3A", borderColor: "#0B1F3A" }}
                >
                  Teaching Faculty
                </h3>
                <ul className="space-y-0">
                  {teachingVacancies.map((v) => (
                    <li
                      key={v.position}
                      className="flex items-center justify-between py-3.5 border-b border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-1.5 h-1.5 shrink-0"
                          style={{ backgroundColor: "#f59e0b" }}
                          aria-hidden="true"
                        />
                        <span
                          className="font-semibold text-sm"
                          style={{ color: "#0B1F3A" }}
                        >
                          {v.position}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                        {v.posts} {v.posts === 1 ? "post" : "posts"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Non-Teaching Staff */}
              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-[0.15em] mb-6 pb-3 border-b-2"
                  style={{ color: "#0B1F3A", borderColor: "#0B1F3A" }}
                >
                  Non-Teaching Staff
                </h3>
                <ul className="space-y-0">
                  {nonTeachingVacancies.map((v) => (
                    <li
                      key={v.position}
                      className="flex items-center justify-between py-3.5 border-b border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-1.5 h-1.5 shrink-0"
                          style={{ backgroundColor: "#f59e0b" }}
                          aria-hidden="true"
                        />
                        <span
                          className="font-semibold text-sm"
                          style={{ color: "#0B1F3A" }}
                        >
                          {v.position}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                        {v.posts} {v.posts === 1 ? "post" : "posts"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact note */}
            <div className="mt-10 border-l-4 border-amber-400 pl-4 py-1">
              <p className="text-sm text-gray-600">
                To apply, fill the form below or email your CV to{" "}
                <a
                  href="mailto:careers@kmclalitpur.edu.np"
                  className="font-semibold text-[#0B1F3A] hover:text-amber-600 transition-colors"
                >
                  careers@kmclalitpur.edu.np
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── Application Form ─────────────────────────────────────────────── */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#f7f5f0" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section header */}
            <div className="mb-12">
              <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Application
              </p>
              <h2
                className="text-3xl font-extrabold mb-3"
                style={{ color: "#0B1F3A" }}
              >
                Apply Now
              </h2>
              <div className="w-12 h-0.5 bg-amber-400" aria-hidden="true" />
            </div>

            <div className="max-w-2xl">
              {/* Success state */}
              {state === "success" ? (
                <div className="border-l-4 border-green-500 pl-5 py-4 bg-green-50">
                  <p className="font-bold text-green-800 text-sm mb-1">
                    Application submitted!
                  </p>
                  <p className="text-green-700 text-sm">
                    We&apos;ll be in touch within 5 working days.
                  </p>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-4 text-xs font-semibold text-green-700 underline underline-offset-2 hover:text-green-900 transition-colors"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Error banner */}
                  {state === "error" && errorMsg && (
                    <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-50">
                      <p className="text-red-700 text-sm font-medium">
                        {errorMsg}
                      </p>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: "#0B1F3A" }}
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-white text-gray-900 placeholder-gray-400"
                      placeholder="Your full name"
                    />
                    {fieldErrors.fullName && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email + Phone row */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: "#0B1F3A" }}
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-white text-gray-900 placeholder-gray-400"
                        placeholder="your@email.com"
                      />
                      {fieldErrors.email && (
                        <p className="mt-1.5 text-xs text-red-600">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: "#0B1F3A" }}
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-white text-gray-900 placeholder-gray-400"
                        placeholder="98XXXXXXXX"
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1.5 text-xs text-red-600">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Position */}
                  <div>
                    <label
                      htmlFor="position"
                      className="block text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: "#0B1F3A" }}
                    >
                      Position Applied For <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-white text-gray-900 appearance-none"
                    >
                      <option value="">— Select a position —</option>
                      <optgroup label="Teaching Faculty">
                        {teachingVacancies.map((v) => (
                          <option key={v.position} value={v.position}>
                            {v.position} ({v.posts} {v.posts === 1 ? "post" : "posts"})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Non-Teaching Staff">
                        {nonTeachingVacancies.map((v) => (
                          <option key={v.position} value={v.position}>
                            {v.position} ({v.posts} {v.posts === 1 ? "post" : "posts"})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {fieldErrors.position && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {fieldErrors.position}
                      </p>
                    )}
                  </div>

                  {/* Qualification + Experience row */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="qualification"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: "#0B1F3A" }}
                      >
                        Highest Qualification <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="qualification"
                        name="qualification"
                        type="text"
                        value={form.qualification}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-white text-gray-900 placeholder-gray-400"
                        placeholder="e.g. M.Sc. Physics, B.Ed."
                      />
                      {fieldErrors.qualification && (
                        <p className="mt-1.5 text-xs text-red-600">
                          {fieldErrors.qualification}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="experience"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: "#0B1F3A" }}
                      >
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-white text-gray-900 appearance-none"
                      >
                        <option value="">— Select —</option>
                        {experienceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.experience && (
                        <p className="mt-1.5 text-xs text-red-600">
                          {fieldErrors.experience}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label
                      htmlFor="coverLetter"
                      className="block text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: "#0B1F3A" }}
                    >
                      Cover Letter / Message{" "}
                      <span className="text-gray-400 normal-case font-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={5}
                      value={form.coverLetter}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0B1F3A] bg-white text-gray-900 placeholder-gray-400 resize-none"
                      placeholder="Tell us briefly why you'd like to join KMC Lalitpur and what makes you a strong candidate."
                    />
                    {fieldErrors.coverLetter && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {fieldErrors.coverLetter}
                      </p>
                    )}
                  </div>

                  {/* CV / Resume Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#0B1F3A" }}>
                      CV / Resume{" "}
                      <span className="text-gray-400 normal-case font-normal">(optional — PDF, DOC, DOCX · max 5 MB)</span>
                    </label>
                    <ResumeUpload
                      value={form.resumeUrl}
                      onChange={(url) => setForm((prev) => ({ ...prev, resumeUrl: url }))}
                    />
                  </div>

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      disabled={state === "submitting"}
                      className="px-8 py-3 text-sm font-bold uppercase tracking-wider transition-opacity disabled:opacity-60"
                      style={{ backgroundColor: "#f59e0b", color: "#0B1F3A" }}
                    >
                      {state === "submitting"
                        ? "Submitting…"
                        : "Submit Application"}
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
