"use client";

import { useEffect, useState, useCallback } from "react";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  author: string | null;
  published: boolean;
  featured: boolean;
  imageUrl: string | null;
  createdAt: string;
}

interface BlogDetail extends BlogItem {
  excerpt: string | null;
  content: string | null;
  readTime: string | null;
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  author: string;
  readTime: string;
  published: boolean;
  featured: boolean;
}

const blankForm: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  imageUrl: "",
  author: "",
  readTime: "",
  published: false,
  featured: false,
};

const CATEGORIES = ["Education", "Science", "College Life", "Career", "Events", "Achievements", "Tips & Guides"];

const inputCls = "w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors";
const labelCls = "block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(blankForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<BlogItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blog");
    if (res.ok) {
      const json = await res.json();
      setPosts(json.data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const set = (k: keyof FormState, v: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  function openCreate() {
    setEditingId(null);
    setForm(blankForm);
    setError("");
    setShowForm(true);
  }

  async function openEdit(id: string) {
    setError("");
    const res = await fetch(`/api/admin/blog/${id}`);
    if (res.ok) {
      const json = await res.json();
      const d: BlogDetail = json.data;
      setForm({
        title: d.title,
        slug: d.slug,
        excerpt: d.excerpt ?? "",
        content: d.content ?? "",
        category: d.category ?? "",
        imageUrl: d.imageUrl ?? "",
        author: d.author ?? "",
        readTime: d.readTime ?? "",
        published: d.published,
        featured: d.featured,
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
      excerpt: form.excerpt || null,
      content: form.content || null,
      category: form.category || null,
      imageUrl: form.imageUrl || null,
      author: form.author || null,
      readTime: form.readTime || null,
      published: form.published,
      featured: form.featured,
    };

    const res = editingId
      ? await fetch(`/api/admin/blog/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      : await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

    setSaving(false);

    if (res.ok) {
      closeForm();
      load();
      showToast(editingId ? "Post updated." : "Post created.");
    } else {
      const json = await res.json();
      setError(json.message ?? "Failed to save.");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/admin/blog/${deleteTarget.id}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteTarget(null);
    load();
    showToast("Post deleted.");
  }

  async function togglePublished(post: BlogItem) {
    await fetch(`/api/admin/blog/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    });
    load();
  }

  const F = form;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[60] bg-white border border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {toast}
        </div>
      )}

      <div className="flex items-start justify-between mb-7 gap-4">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">Blog</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {loading ? "Write and manage blog posts." : `${posts.length} post${posts.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold rounded-lg transition-colors"
        >
          + New Post
        </button>
      </div>

      {/* Post list */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">All Posts</h2>
        </div>

        {loading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 animate-pulse">
                <div className="w-14 h-14 rounded-lg bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/4" />
                </div>
                <div className="flex gap-2 shrink-0">
                  <div className="h-7 w-20 bg-gray-100 rounded-lg" />
                  <div className="h-7 w-12 bg-gray-100 rounded-lg" />
                  <div className="h-7 w-14 bg-gray-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm font-medium">No blog posts yet.</p>
            <button onClick={openCreate} className="mt-3 text-amber-600 hover:text-amber-700 text-sm font-semibold transition-colors">
              Write the first post →
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-4 hover:border-gray-300 transition-colors"
              >
                {post.imageUrl ? (
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-gray-900 font-semibold text-sm">{post.title}</p>
                    {post.featured && (
                      <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 font-bold px-2 py-0.5 rounded-full">Featured</span>
                    )}
                    {post.category && (
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{post.category}</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs font-mono mt-1">/blog/{post.slug}</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {post.author && <span>{post.author} · </span>}
                    {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                  <button
                    onClick={() => togglePublished(post)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      post.published
                        ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </button>
                  <button
                    onClick={() => openEdit(post.id)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(post)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-gray-900/40"
          onClick={(e) => { if (e.target === e.currentTarget) closeForm(); }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-gray-900 font-bold text-sm">{editingId ? "Edit Post" : "New Blog Post"}</h2>
              <button onClick={closeForm} className="text-gray-500 hover:text-gray-900 transition-colors p-1 rounded-lg hover:bg-gray-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">{error}</div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Title <span className="text-red-500 normal-case">*</span></label>
                  <input
                    type="text"
                    value={F.title}
                    onChange={(e) => {
                      set("title", e.target.value);
                      if (!editingId) set("slug", slugify(e.target.value));
                    }}
                    required
                    placeholder="Post title"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Slug <span className="text-red-500 normal-case">*</span></label>
                  <input
                    type="text"
                    value={F.slug}
                    onChange={(e) => set("slug", e.target.value)}
                    required
                    placeholder="url-friendly-slug"
                    className={`${inputCls} font-mono`}
                  />
                </div>

                <div>
                  <label className={labelCls}>Category</label>
                  <select
                    value={F.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={inputCls}
                  >
                    <option value="">— Select category —</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Author</label>
                  <input
                    type="text"
                    value={F.author}
                    onChange={(e) => set("author", e.target.value)}
                    placeholder="e.g. KMC Staff"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Read Time</label>
                  <input
                    type="text"
                    value={F.readTime}
                    onChange={(e) => set("readTime", e.target.value)}
                    placeholder="e.g. 5 min read"
                    className={inputCls}
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageUpload
                    value={F.imageUrl}
                    onChange={(url) => set("imageUrl", url)}
                    folder="kmc/blog"
                    label="Cover Image"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls}>Excerpt</label>
                  <textarea
                    value={F.excerpt}
                    onChange={(e) => set("excerpt", e.target.value)}
                    rows={2}
                    placeholder="Short summary shown on the blog list page"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls}>Content</label>
                  <textarea
                    value={F.content}
                    onChange={(e) => set("content", e.target.value)}
                    rows={12}
                    placeholder="Full blog post content. Use ## for headings, **bold** for emphasis."
                    className={`${inputCls} resize-y font-mono`}
                  />
                  <p className="text-gray-400 text-xs mt-1">
                    Supports: ## Heading, **bold**, — em dash. Each paragraph on its own line.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={F.published}
                    onChange={(e) => set("published", e.target.checked)}
                    className="w-4 h-4 rounded accent-amber-500"
                  />
                  <span className="text-gray-500 text-sm">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={F.featured}
                    onChange={(e) => set("featured", e.target.checked)}
                    className="w-4 h-4 rounded accent-amber-500"
                  />
                  <span className="text-gray-500 text-sm">Featured</span>
                </label>
                <button
                  type="submit"
                  disabled={saving}
                  className="ml-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-gray-900 text-sm font-bold rounded-lg transition-colors"
                >
                  {saving ? "Saving…" : editingId ? "Update Post" : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-sm">Delete post?</h3>
                <p className="text-gray-400 text-xs">This cannot be undone.</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2.5 mb-5">
              <p className="text-gray-700 text-sm font-medium line-clamp-2">{deleteTarget.title}</p>
              {deleteTarget.author && <p className="text-gray-400 text-xs mt-0.5">{deleteTarget.author}</p>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
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
