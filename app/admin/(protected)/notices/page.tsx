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

const inputCls = "w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors";

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Notice | null>(null);
  const [deleting, setDeleting] = useState(false);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/notices");
    if (res.ok) setNotices((await res.json()).data ?? []);
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
        text: form.text, active: form.active,
        displayOrder: Number(form.displayOrder),
        startDate: form.startDate || null, endDate: form.endDate || null,
      }),
    });
    setSaving(false);
    if (res.ok) { setForm(blank); load(); showToast("Notice added."); }
    else setError(((await res.json()) as { message?: string }).message ?? "Failed to create notice.");
  }

  async function toggleActive(notice: Notice) {
    await fetch(`/api/admin/notices/${notice.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !notice.active }),
    });
    load();
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/admin/notices/${deleteTarget.id}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteTarget(null);
    load();
    showToast("Notice deleted.");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[60] bg-green-900 border border-green-700 text-green-300 text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {toast}
        </div>
      )}

      <div className="mb-7">
        <h1 className="text-white text-xl font-bold">Notices</h1>
        <p className="text-gray-600 text-sm mt-0.5">Manage the scrolling notice board on the homepage.</p>
      </div>

      {/* Add form */}
      <div className="bg-gray-900 border border-white/[0.06] rounded-xl p-5 mb-7">
        <h2 className="text-gray-300 text-sm font-bold mb-4">Add New Notice</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>
          )}
          <div>
            <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
              Notice Text <span className="text-red-400 normal-case">*</span>
            </label>
            <textarea
              value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
              required rows={2} placeholder="Enter notice text…"
              className={`${inputCls} resize-none`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">Display Order</label>
              <input type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })} className={inputCls} />
            </div>
            <div>
              <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">Start Date</label>
              <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">End Date</label>
              <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="w-4 h-4 rounded accent-amber-400" />
              <span className="text-gray-400 text-sm">Active (visible on site)</span>
            </label>
            <button type="submit" disabled={saving} className="ml-auto px-5 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-bold rounded-lg transition-colors">
              {saving ? "Adding…" : "Add Notice"}
            </button>
          </div>
        </form>
      </div>

      {/* Notices list */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">All Notices</h2>
          {!loading && <span className="text-gray-700 text-[10px]">({notices.length})</span>}
        </div>

        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-900 border border-white/[0.06] rounded-xl p-4 flex items-center gap-4 animate-pulse">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-1/3" />
                </div>
                <div className="flex gap-2">
                  <div className="h-7 w-16 bg-gray-800 rounded-lg" />
                  <div className="h-7 w-16 bg-gray-800 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 border border-white/[0.06] rounded-xl">
            <p className="text-gray-600 text-sm">No notices yet. Add one above.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`bg-gray-900 border rounded-xl p-4 flex items-start gap-4 transition-opacity ${
                  notice.active ? "border-white/[0.06]" : "border-white/[0.03] opacity-50"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-gray-200 text-sm leading-snug">{notice.text}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-gray-600">
                    <span>Order: {notice.displayOrder}</span>
                    {notice.startDate && <span>From: {new Date(notice.startDate).toLocaleDateString("en-GB")}</span>}
                    {notice.endDate && <span>Until: {new Date(notice.endDate).toLocaleDateString("en-GB")}</span>}
                    <span>Added: {new Date(notice.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(notice)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      notice.active
                        ? "bg-green-500/15 text-green-400 border border-green-500/20 hover:bg-green-500/25"
                        : "bg-white/[0.06] text-gray-500 hover:bg-white/[0.1] hover:text-gray-300"
                    }`}
                  >
                    {notice.active ? "Active" : "Inactive"}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(notice)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}>
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Delete notice?</h3>
                <p className="text-gray-600 text-xs">This cannot be undone.</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg px-3 py-2.5 mb-5">
              <p className="text-gray-300 text-sm line-clamp-3">{deleteTarget.text}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setDeleteTarget(null)} disabled={deleting} className="flex-1 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 text-sm font-semibold rounded-lg transition-colors">Cancel</button>
              <button onClick={confirmDelete} disabled={deleting} className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors">
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
