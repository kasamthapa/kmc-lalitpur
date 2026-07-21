"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const inputCls =
  "w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-500 transition-all";
const labelCls = "block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1.5";

export default function SettingsPage() {
  const { data: session } = useSession();

  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (next !== confirm) {
      setError("New passwords do not match.");
      return;
    }
    if (next.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: current, newPassword: next }),
    });
    setLoading(false);

    if (res.ok) {
      setSuccess("Password updated successfully.");
      setCurrent("");
      setNext("");
      setConfirm("");
    } else {
      const json = await res.json();
      setError((json as { message?: string }).message ?? "Failed to update password.");
    }
  }

  const name = session?.user?.name ?? "—";
  const email = session?.user?.email ?? "—";
  const role = (session?.user as { role?: string })?.role ?? "admin";

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-gray-900 text-xl font-bold">Settings</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage your account and admin preferences.</p>
      </div>

      {/* Account info */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-gray-700 text-sm font-bold">Account Information</h2>
          <p className="text-gray-400 text-xs mt-0.5">Your admin identity — read-only.</p>
        </div>
        <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { label: "Display name", value: name },
            { label: "Email address", value: email },
            { label: "Role", value: role.charAt(0).toUpperCase() + role.slice(1) },
          ].map((row) => (
            <div key={row.label}>
              <p className={labelCls}>{row.label}</p>
              <p className="text-gray-900 text-sm font-medium">{row.value}</p>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <p className="text-gray-400 text-xs">Active session — JWT authenticated</p>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-gray-700 text-sm font-bold">Change Password</h2>
          <p className="text-gray-400 text-xs mt-0.5">Use a strong password with at least 8 characters.</p>
        </div>
        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              <svg className="shrink-0 w-4 h-4 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
              <svg className="shrink-0 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {success}
            </div>
          )}

          {(
            [
              { id: "current", label: "Current password", value: current, set: setCurrent, show: showCurrent, toggle: () => setShowCurrent((v) => !v), autocomplete: "current-password" },
              { id: "next", label: "New password", value: next, set: setNext, show: showNext, toggle: () => setShowNext((v) => !v), autocomplete: "new-password" },
              { id: "confirm", label: "Confirm new password", value: confirm, set: setConfirm, show: showConfirm, toggle: () => setShowConfirm((v) => !v), autocomplete: "new-password" },
            ] as const
          ).map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className={labelCls}>{field.label}</label>
              <div className="relative">
                <input
                  id={field.id}
                  type={field.show ? "text" : "password"}
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  required
                  autoComplete={field.autocomplete}
                  placeholder="••••••••"
                  className={`${inputCls} pr-11`}
                />
                <button
                  type="button"
                  onClick={field.toggle}
                  tabIndex={-1}
                  aria-label={field.show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-0.5"
                >
                  <EyeIcon open={field.show} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={loading || !current || !next || !confirm}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-900 text-sm font-bold rounded-xl transition-all flex items-center gap-2"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? "Updating…" : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Site config note */}
      <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <h3 className="text-gray-700 text-sm font-bold mb-1">Site Configuration</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Global settings like phone number, email, social links, and branding are defined in{" "}
              <code className="bg-gray-100 text-amber-700 px-1.5 py-0.5 rounded text-[11px]">
                app/config/site.ts
              </code>
              . Changes require a code edit and redeploy — they are not managed through this panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
