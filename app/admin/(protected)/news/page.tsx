"use client";

import { useEffect, useState, useCallback } from "react";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  published: boolean;
  featured: boolean;
  imageUrl: string | null;
  createdAt: string;
}

interface NewsDetail extends NewsItem {
  description: string | null;
  content: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
}

const CATEGORIES = ["Academics", "Events", "Achievements", "Admissions", "Campus Life", "Announcements"];

interface FormState {
  title: string; slug: string; description: string; content: string;
  category: string; imageUrl: string; published: boolean; featured: boolean;
  metaTitle: string; metaDescription: string;
}

const blankForm: FormState = {
  title: "", slug: "", description: "", content: "",
  category: "", imageUrl: "", published: false, featured: false,
  metaTitle: "", metaDescription: "",
};

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

const inputCls = "w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400/70 transition-colors";
const labelCls = "block text-gray-400 text-xs font-semibold mb-1.5 uppercase tracking-wider";

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormState>(blankForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/news");
    if (res.ok) setNews((await res.json()).data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  function openCreate() {
    setEditingId(null);
    setForm(blankForm);
    setError("");
    setShowModal(true);
  }

  async function openEdit(id: string) {
    setError("");
    const res = await fetch(`/api/admin/news/${id}`);
    if (!res.ok) return;
    const d: NewsDetail = (await res.json()).data;
    setForm({
      title: d.title, slug: d.slug, description: d.description ?? "",
      content: d.content ?? "", category: d.category ?? "", imageUrl: d.imageUrl ?? "",
      published: d.published, featured: d.featured,
      metaTitle: d.metaTitle ?? "", metaDescription: d.metaDescription ?? "",
    });
    setEditingId(id);
    setShowModal(true);
  }

  function closeModal() { setShowModal(false); setEditingId(null); setForm(blankForm); setError(""); }

  const set = (k: keyof FormState, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const body = {
      title: form.title, slug: form.slug || slugify(form.title),
      description: form.description || null, content: form.content || null,
      category: form.category || null, imageUrl: form.imageUrl || null,
      published: form.published, featured: form.featured,
      metaTitle: form.metaTitle || null, metaDescription: form.metaDescription || null,
    };
    const res = editingId
      ? await fetch(`/api/admin/news/${editingId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      : await fetch("/api/admin/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    if (res.ok) { closeModal(); load(); showToast(editingId ? "Article updated." : "Article created."); }
    else setError(((await res.json()) as { message?: string }).message ?? "Failed to save.");
  }

  async function handleDelete(id: string) {
    setDeleteId(null);
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    load();
    showToast("Article deleted.");
  }

  async function togglePublished(item: NewsItem) {
    await fetch(`/api/admin/news/${item.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !item.published }),
    });
    load();
  }

  const F = form;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[60] bg-green-900 border border-green-700 text-green-300 text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {toast}
        </div>
      )}

      <div className="flex items-start justify-between mb-7 gap-4">
        <div>
          <h1 className="text-white text-xl font-bold">News</h1>
          <p className="text-gray-600 text-sm mt-0.5">Manage news articles and announcements.</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold rounded-lg transition-colors shrink-0"
        >
          + Add Article
        </button>
      </div>

      {/* News list */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
            All Articles
          </h2>
          {!loading && <span className="text-gray-700 text-[10px]">({news.length})</span>}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-900 border border-white/[0.06] rounded-xl p-4 flex items-center gap-4 animate-pulse">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-2/3" />
                  <div className="h-3 bg-gray-800 rounded w-1/3" />
                </div>
                <div className="flex gap-2">
                  <div className="h-7 w-20 bg-gray-800 rounded-lg" />
                  <div className="h-7 w-12 bg-gray-800 rounded-lg" />
                  <div className="h-7 w-14 bg-gray-800 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-16 bg-gray-900 border border-white/[0.06] rounded-xl">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <p className="text-gray-500 text-sm font-medium">No articles yet</p>
            <button onClick={openCreate} className="mt-3 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">
              Create your first article →
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {news.map((item) => (
              <div key={item.id} className="bg-gray-900 border border-white/[0.06] hover:border-white/[0.1] rounded-xl p-4 flex items-center gap-4 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    {item.featured && (
                      <span className="text-[10px] bg-amber-400/15 text-amber-400 border border-amber-400/20 px-1.5 py-0.5 rounded-full font-semibold">Featured</span>
                    )}
                    {item.category && (
                      <span className="text-[10px] bg-white/[0.06] text-gray-400 px-1.5 py-0.5 rounded-full">{item.category}</span>
                    )}
                  </div>
                  <p className="text-gray-700 text-xs font-mono mt-0.5">/news/{item.slug}</p>
                  <p className="text-gray-700 text-xs mt-0.5">
                    {new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePublished(item)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      item.published
                        ? "bg-green-500/15 text-green-400 border border-green-500/20 hover:bg-green-500/25"
                        : "bg-white/[0.06] text-gray-500 hover:bg-white/[0.1] hover:text-gray-300"
                    }`}
                  >
                    {item.published ? "Published" : "Draft"}
                  </button>
                  <button
                    onClick={() => openEdit(item.id)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.06] text-gray-400 hover:bg-white/[0.1] hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setDeleteId(item.id); setDeleteTitle(item.title); }}
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

      {/* Edit/Create Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div>
                <h2 className="text-white font-bold text-base">{editingId ? "Edit Article" : "New Article"}</h2>
                <p className="text-gray-600 text-xs mt-0.5">Fill in the details below</p>
              </div>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-300 transition-colors p-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Title <span className="text-red-400 normal-case">*</span></label>
                  <input
                    type="text" value={F.title} required placeholder="Article title"
                    onChange={(e) => { set("title", e.target.value); if (!editingId) set("slug", slugify(e.target.value)); }}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Slug <span className="text-red-400 normal-case">*</span></label>
                  <input type="text" value={F.slug} onChange={(e) => set("slug", e.target.value)} required placeholder="url-friendly-slug" className={`${inputCls} font-mono`} />
                </div>

                <div>
                  <label className={labelCls}>Category</label>
                  <select value={F.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
                    <option value="">— Select —</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <ImageUpload value={F.imageUrl} onChange={(url) => set("imageUrl", url)} folder="kmc/news" label="Cover Image" />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls}>Description</label>
                  <textarea value={F.description} onChange={(e) => set("description", e.target.value)} rows={2} placeholder="Short excerpt…" className={`${inputCls} resize-none`} />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls}>Content</label>
                  <textarea value={F.content} onChange={(e) => set("content", e.target.value)} rows={8} placeholder="Full article content…" className={`${inputCls} resize-y`} />
                </div>

                <div>
                  <label className={labelCls}>Meta Title</label>
                  <input type="text" value={F.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} placeholder="SEO title" className={inputCls} />
                </div>

                <div>
                  <label className={labelCls}>Meta Description</label>
                  <input type="text" value={F.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} placeholder="SEO description" className={inputCls} />
                </div>
              </div>

              <div className="flex items-center gap-5 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={F.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-amber-400" />
                  <span className="text-gray-400 text-sm">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={F.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-amber-400" />
                  <span className="text-gray-400 text-sm">Featured</span>
                </label>
                <div className="flex gap-2 ml-auto">
                  <button type="button" onClick={closeModal} disabled={saving} className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-50 text-gray-300 text-sm font-semibold rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="px-5 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-bold rounded-lg transition-colors">
                    {saving ? "Saving…" : editingId ? "Save Changes" : "Create Article"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setDeleteId(null); }}>
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Delete article?</h3>
                <p className="text-gray-600 text-xs mt-0.5">This cannot be undone.</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg px-3 py-2.5 mb-5">
              <p className="text-gray-300 text-sm font-medium line-clamp-2">{deleteTitle}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 text-sm font-semibold rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-lg transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
