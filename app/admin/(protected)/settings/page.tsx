"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
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
      setError(json.message ?? "Failed to update password.");
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your admin account.</p>
      </div>

      {/* Account info */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <h2 className="text-white font-semibold mb-4">Account</h2>
        <div className="space-y-3">
          <div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Name</p>
            <p className="text-white text-sm">{session?.user?.name ?? "—"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Email</p>
            <p className="text-white text-sm">{session?.user?.email ?? "—"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Role</p>
            <p className="text-white text-sm capitalize">{session?.user?.role ?? "—"}</p>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <h2 className="text-white font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-950 border border-red-800 text-red-300 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-950 border border-green-800 text-green-300 text-sm rounded-lg px-4 py-3">
              {success}
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Repeat new password"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-semibold rounded-lg transition-colors"
            >
              {loading ? "Updating…" : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Site config note */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
        <h2 className="text-gray-300 font-semibold mb-2">Site Configuration</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Global settings like the school phone number, email address, social links, and branding
          are defined in{" "}
          <code className="bg-gray-700 text-amber-300 px-1.5 py-0.5 rounded text-xs">
            app/config/site.ts
          </code>
          . Changing these requires editing the file and redeploying — they are not managed
          through this panel.
        </p>
      </div>
    </div>
  );
}
