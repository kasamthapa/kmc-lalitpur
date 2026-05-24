"use client";

import { useEffect, useState } from "react";

interface Vacancy {
  id: string;
  title: string;
  category: string;
  posts: number;
  description: string | null;
  active: boolean;
  displayOrder: number;
  createdAt: string;
}

const blank = {
  title: "",
  category: "Teaching",
  posts: 1,
  description: "",
  active: true,
  displayOrder: 0,
};

const inputCls =
  "w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors";

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Vacancy | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editTarget, setEditTarget] = useState<Vacancy | null>(null);
  const [editForm, setEditForm] = useState<Partial<Vacancy>>({});
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/vacancies");
    if (res.ok) setVacancies((await res.json()).data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const res = await fetch("/api/admin/vacancies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        category: form.category,
        posts: Number(form.posts),
        description: form.description || null,
        active: form.active,
        displayOrder: Number(form.displayOrder),
      }),
    });
    setSaving(false);
    if (res.ok) {
      setForm(blank);
      load();
      showToast("Vacancy added.");
    } else {
      setError(((await res.json()) as { message?: string }).message ?? "Failed to create vacancy.");
    }
  }

  async function toggleActive(vacancy: Vacancy) {
    await fetch(`/api/admin/vacancies/${vacancy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !vacancy.active }),
    });
    load();
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/admin/vacancies/${deleteTarget.id}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteTarget(null);
    load();
    showToast("Vacancy deleted.");
  }

  function startEdit(vacancy: Vacancy) {
    setEditTarget(vacancy);
    setEditForm({
      title: vacancy.title,
      category: vacancy.category,
      posts: vacancy.posts,
      description: vacancy.description ?? "",
      active: vacancy.active,
      displayOrder: vacancy.displayOrder,
    });
    setEditError("");
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editTarget) return;
    setEditError("");
    setEditSaving(true);
    const res = await fetch(`/api/admin/vacancies/${editTarget.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editForm.title,
        category: editForm.category,
        posts: Number(editForm.posts),
        description: editForm.description || null,
        active: editForm.active,
        displayOrder: Number(editForm.displayOrder),
      }),
    });
    setEditSaving(false);
    if (res.ok) {
      setEditTarget(null);
      load();
      showToast("Vacancy updated.");
    } else {
      setEditError(((await res.json()) as { message?: string }).message ?? "Failed to update vacancy.");
    }
  }

  // Group vacancies by category for display
  const grouped: Record<string, Vacancy[]> = {};
  for (const v of vacancies) {
    if (!grouped[v.category]) grouped[v.category] = [];
    grouped[v.category].push(v);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[60] bg-green-900 border border-green-700 text-green-300 text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {toast}
        </div>
      )}

      <div className="mb-7">
        <h1 className="text-white text-xl font-bold">Vacancies</h1>
        <p className="text-gray-600 text-sm mt-0.5">
          Manage open positions displayed on the Careers page.
        </p>
      </div>

      {/* Add form */}
      <div className="bg-gray-900 border border-white/[0.06] rounded-xl p-5 mb-7">
        <h2 className="text-gray-300 text-sm font-bold mb-4">Add New Vacancy</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                Title <span className="text-red-400 normal-case">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="e.g. Physics Teacher"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                Category <span className="text-red-400 normal-case">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputCls}
              >
                <option value="Teaching">Teaching</option>
                <option value="Non-Teaching">Non-Teaching</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                Posts <span className="text-red-400 normal-case">*</span>
              </label>
              <input
                type="number"
                min={1}
                value={form.posts}
                onChange={(e) => setForm({ ...form, posts: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
            <div className="flex items-end pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 rounded accent-amber-400"
                />
                <span className="text-gray-400 text-sm">Active</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
              Description (optional)
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              placeholder="Brief description of requirements…"
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-bold rounded-lg transition-colors"
            >
              {saving ? "Adding…" : "Add Vacancy"}
            </button>
          </div>
        </form>
      </div>

      {/* Vacancies list */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
            All Vacancies
          </h2>
          {!loading && <span className="text-gray-700 text-[10px]">({vacancies.length})</span>}
        </div>

        {loading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-white/[0.06] rounded-xl p-4 flex items-center gap-4 animate-pulse"
              >
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-1/2" />
                  <div className="h-3 bg-gray-800 rounded w-1/4" />
                </div>
                <div className="flex gap-2">
                  <div className="h-7 w-16 bg-gray-800 rounded-lg" />
                  <div className="h-7 w-14 bg-gray-800 rounded-lg" />
                  <div className="h-7 w-16 bg-gray-800 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : vacancies.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 border border-white/[0.06] rounded-xl">
            <p className="text-gray-600 text-sm">No vacancies yet. Add one above.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <p className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.14em] mb-2 px-1">
                  {category}
                </p>
                <div className="space-y-2">
                  {items.map((vacancy) => (
                    <div
                      key={vacancy.id}
                      className={`bg-gray-900 border rounded-xl p-4 flex items-start gap-4 transition-opacity ${
                        vacancy.active ? "border-white/[0.06]" : "border-white/[0.03] opacity-50"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-gray-200 text-sm font-semibold">{vacancy.title}</p>
                          <span className="text-[10px] text-amber-400">
                            {vacancy.posts} {vacancy.posts === 1 ? "post" : "posts"}
                          </span>
                        </div>
                        {vacancy.description && (
                          <p className="text-gray-600 text-xs mt-0.5 line-clamp-1">
                            {vacancy.description}
                          </p>
                        )}
                        <p className="text-gray-700 text-[10px] mt-1">
                          Order: {vacancy.displayOrder} ·{" "}
                          {new Date(vacancy.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleActive(vacancy)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            vacancy.active
                              ? "bg-green-500/15 text-green-400 border border-green-500/20 hover:bg-green-500/25"
                              : "bg-white/[0.06] text-gray-500 hover:bg-white/[0.1] hover:text-gray-300"
                          }`}
                        >
                          {vacancy.active ? "Active" : "Inactive"}
                        </button>
                        <button
                          onClick={() => startEdit(vacancy)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.06] text-gray-400 hover:bg-white/[0.1] hover:text-white transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(vacancy)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit modal */}
      {editTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditTarget(null);
          }}
        >
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-white font-bold text-sm mb-4">Edit Vacancy</h3>
            {editError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
                {editError}
              </div>
            )}
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={editForm.title ?? ""}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={editForm.category ?? "Teaching"}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className={inputCls}
                  >
                    <option value="Teaching">Teaching</option>
                    <option value="Non-Teaching">Non-Teaching</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    Posts *
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editForm.posts ?? 1}
                    onChange={(e) => setEditForm({ ...editForm, posts: Number(e.target.value) })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    Order
                  </label>
                  <input
                    type="number"
                    value={editForm.displayOrder ?? 0}
                    onChange={(e) => setEditForm({ ...editForm, displayOrder: Number(e.target.value) })}
                    className={inputCls}
                  />
                </div>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.active ?? true}
                      onChange={(e) => setEditForm({ ...editForm, active: e.target.checked })}
                      className="w-4 h-4 rounded accent-amber-400"
                    />
                    <span className="text-gray-400 text-sm">Active</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  value={editForm.description ?? ""}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={2}
                  className={`${inputCls} resize-none`}
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setEditTarget(null)}
                  disabled={editSaving}
                  className="flex-1 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 text-sm font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSaving}
                  className="flex-1 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-gray-900 text-sm font-bold rounded-lg transition-colors"
                >
                  {editSaving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeleteTarget(null);
          }}
        >
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Delete vacancy?</h3>
                <p className="text-gray-600 text-xs">This cannot be undone.</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg px-3 py-2.5 mb-5">
              <p className="text-gray-300 text-sm font-semibold">{deleteTarget.title}</p>
              <p className="text-gray-500 text-xs mt-0.5">
                {deleteTarget.category} · {deleteTarget.posts} {deleteTarget.posts === 1 ? "post" : "posts"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 text-sm font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
