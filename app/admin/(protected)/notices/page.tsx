"use client";

import { useEffect, useState } from "react";

interface Notice {
  id: string;
  text: string;
  active: boolean;
  displayOrder: number;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
}

const blank = { text: "", active: true, displayOrder: 0, startDate: "", endDate: "" };

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/notices");
    if (res.ok) {
      const json = await res.json();
      setNotices(json.data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const res = await fetch("/api/admin/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: form.text,
        active: form.active,
        displayOrder: Number(form.displayOrder),
        startDate: form.startDate || null,
        endDate: form.endDate || null,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setForm(blank);
      load();
    } else {
      const json = await res.json();
      setError(json.message ?? "Failed to create notice.");
    }
  }

  async function toggleActive(notice: Notice) {
    await fetch(`/api/admin/notices/${notice.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !notice.active }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this notice? This cannot be undone.")) return;
    await fetch(`/api/admin/notices/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">Notices</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage the scrolling notice board on the homepage.
        </p>
      </div>

      {/* Add notice form */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-8">
        <h2 className="text-white font-semibold mb-4">Add New Notice</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          {error && (
            <div className="bg-red-950 border border-red-800 text-red-300 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">
              Notice Text <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              required
              rows={2}
              placeholder="Enter notice text…"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">
                Start Date (optional)
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">
                End Date (optional)
              </label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
              />
              <span className="text-gray-300 text-sm">Active (visible on site)</span>
            </label>
            <button
              type="submit"
              disabled={saving}
              className="ml-auto px-5 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-semibold rounded-lg transition-colors"
            >
              {saving ? "Saving…" : "Add Notice"}
            </button>
          </div>
        </form>
      </div>

      {/* Notices list */}
      <div>
        <h2 className="text-gray-300 text-sm font-semibold uppercase tracking-wider mb-3">
          All Notices ({notices.length})
        </h2>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading…</p>
        ) : notices.length === 0 ? (
          <p className="text-gray-500 text-sm">No notices yet.</p>
        ) : (
          <div className="space-y-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`bg-gray-800 border rounded-xl p-4 flex items-start gap-4 ${
                  notice.active ? "border-gray-700" : "border-gray-700/40 opacity-60"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{notice.text}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                    <span>Order: {notice.displayOrder}</span>
                    {notice.startDate && (
                      <span>From: {new Date(notice.startDate).toLocaleDateString("en-GB")}</span>
                    )}
                    {notice.endDate && (
                      <span>Until: {new Date(notice.endDate).toLocaleDateString("en-GB")}</span>
                    )}
                    <span>Added: {new Date(notice.createdAt).toLocaleDateString("en-GB")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(notice)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      notice.active
                        ? "bg-green-900/50 text-green-400 hover:bg-green-900"
                        : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                    }`}
                  >
                    {notice.active ? "Active" : "Inactive"}
                  </button>
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-900/40 text-red-400 hover:bg-red-900/70 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
