"use client";

import { useEffect, useState, useCallback } from "react";

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

// All form fields are strings (never null) — null only exists on the API type
interface FormState {
  title: string; slug: string; description: string; content: string;
  category: string; imageUrl: string; published: boolean; featured: boolean;
  metaTitle: string; metaDescription: string;
}

const blankForm: FormState = {
  title: "",
  slug: "",
  description: "",
  content: "",
  category: "",
  imageUrl: "",
  published: false,
  featured: false,
  metaTitle: "",
  metaDescription: "",
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(blankForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/news");
    if (res.ok) {
      const json = await res.json();
      setNews(json.data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openCreate() {
    setEditingId(null);
    setForm(blankForm);
    setError("");
    setShowForm(true);
  }

  async function openEdit(id: string) {
    setError("");
    const res = await fetch(`/api/admin/news/${id}`);
    if (res.ok) {
      const json = await res.json();
      const d: NewsDetail = json.data;
      setForm({
        title: d.title,
        slug: d.slug,
        description: d.description ?? "",
        content: d.content ?? "",
        category: d.category ?? "",
        imageUrl: d.imageUrl ?? "",
        published: d.published,
        featured: d.featured,
        metaTitle: d.metaTitle ?? "",
        metaDescription: d.metaDescription ?? "",
      });
      setEditingId(id);
      setShowForm(true);
    }
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(blankForm);
    setError("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const body = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      description: form.description || null,
      content: form.content || null,
      category: form.category || null,
      imageUrl: form.imageUrl || null,
      published: form.published,
      featured: form.featured,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
    };

    const res = editingId
      ? await fetch(`/api/admin/news/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      : await fetch("/api/admin/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

    setSaving(false);

    if (res.ok) {
      closeForm();
      load();
    } else {
      const json = await res.json();
      setError(json.message ?? "Failed to save.");
    }
  }

  async function handleDelete(id: string) {
    setDeleteId(null);
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    load();
  }

  async function togglePublished(item: NewsItem) {
    await fetch(`/api/admin/news/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !item.published }),
    });
    load();
  }

  const F = form;
  const set = (k: keyof FormState, v: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">News</h1>
          <p className="text-gray-400 text-sm mt-1">Manage news articles and announcements.</p>
        </div>
        {!showForm && (
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-semibold rounded-lg transition-colors"
          >
            + Add Article
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">
              {editingId ? "Edit Article" : "New Article"}
            </h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-white text-sm">
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {error && (
              <div className="bg-red-950 border border-red-800 text-red-300 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-1.5">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={F.title}
                  onChange={(e) => {
                    set("title", e.target.value);
                    if (!editingId) set("slug", slugify(e.target.value));
                  }}
                  required
                  placeholder="Article title"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={F.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  required
                  placeholder="url-friendly-slug"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm font-mono placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Category</label>
                <select
                  value={F.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="">— Select category —</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Image URL</label>
                <input
                  type="url"
                  value={F.imageUrl}
                  onChange={(e) => set("imageUrl", e.target.value)}
                  placeholder="https://…"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Description</label>
                <textarea
                  value={F.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={2}
                  placeholder="Short description / excerpt"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Content</label>
                <textarea
                  value={F.content}
                  onChange={(e) => set("content", e.target.value)}
                  rows={8}
                  placeholder="Full article content…"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors resize-y"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Meta Title</label>
                <input
                  type="text"
                  value={F.metaTitle}
                  onChange={(e) => set("metaTitle", e.target.value)}
                  placeholder="SEO title (defaults to title)"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Meta Description</label>
                <input
                  type="text"
                  value={F.metaDescription}
                  onChange={(e) => set("metaDescription", e.target.value)}
                  placeholder="SEO description"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={F.published}
                  onChange={(e) => set("published", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700"
                />
                <span className="text-gray-300 text-sm">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={F.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700"
                />
                <span className="text-gray-300 text-sm">Featured</span>
              </label>
              <button
                type="submit"
                disabled={saving}
                className="ml-auto px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-semibold rounded-lg transition-colors"
              >
                {saving ? "Saving…" : editingId ? "Update Article" : "Create Article"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-white font-semibold mb-2">Delete article?</h3>
            <p className="text-gray-400 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News list */}
      <div>
        <h2 className="text-gray-300 text-sm font-semibold uppercase tracking-wider mb-3">
          All Articles ({news.length})
        </h2>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading…</p>
        ) : news.length === 0 ? (
          <p className="text-gray-500 text-sm">No articles yet.</p>
        ) : (
          <div className="space-y-3">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-start gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-medium">{item.title}</p>
                    {item.featured && (
                      <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">Featured</span>
                    )}
                    {item.category && (
                      <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded">{item.category}</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs font-mono mt-1">/news/{item.slug}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <button
                    onClick={() => togglePublished(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      item.published
                        ? "bg-green-900/50 text-green-400 hover:bg-green-900"
                        : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                    }`}
                  >
                    {item.published ? "Published" : "Draft"}
                  </button>
                  <button
                    onClick={() => openEdit(item.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(item.id)}
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
