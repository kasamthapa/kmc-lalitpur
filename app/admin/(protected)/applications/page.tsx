"use client";

import { useEffect, useState, useCallback, Fragment } from "react";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Application {
  id:          string;
  referenceNo: string;
  fullName:    string;
  phone:       string;
  email:       string | null;
  stream:      string;
  gender:      string;
  status:      string;
  seeGpa:      string;
  seeSchool:   string;
  seeYear:     string;
  createdAt:   string;
  verifiedAt:  string | null;
}

interface FullApplication extends Application {
  dateOfBirth:          string;
  address:              string;
  seeMaths:             string | null;
  seeScience:           string | null;
  seeEnglish:           string | null;
  paymentScreenshotUrl: string;
  adminNote:            string | null;
}

interface Pagination { page: number; pageSize: number; total: number; totalPages: number; }
interface Stats { total: number; pending: number; verified: number; rejected: number; }

// ── Helpers ───────────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  pending:  "bg-yellow-100 text-yellow-800 border-yellow-300",
  verified: "bg-green-100  text-green-800  border-green-300",
  rejected: "bg-red-100    text-red-800    border-red-300",
};

const STREAM_STYLES: Record<string, string> = {
  Science:    "bg-blue-100   text-blue-800",
  Management: "bg-green-100  text-green-800",
  Law:        "bg-orange-100 text-orange-800",
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ApplicationsPage() {
  const [apps, setApps]             = useState<Application[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [stats, setStats]           = useState<Stats | null>(null);
  const [page, setPage]             = useState(1);
  const [stream, setStream]         = useState("");
  const [status, setStatus]         = useState("");
  const [search, setSearch]         = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [dateFrom, setDateFrom]     = useState("");
  const [dateTo, setDateTo]         = useState("");
  const [loading, setLoading]       = useState(true);

  // Bulk selection
  const [selected, setSelected]     = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState("verified");
  const [bulkLoading, setBulkLoading] = useState(false);

  // Email digest
  const [digestSending, setDigestSending] = useState(false);
  const [digestMsg, setDigestMsg]         = useState<string | null>(null);

  // Detail modal
  const [detail, setDetail]             = useState<FullApplication | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [noteInput, setNoteInput]       = useState("");
  const [saving, setSaving]             = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setSelected(new Set());
    const params = new URLSearchParams({ page: String(page) });
    if (stream)   params.set("stream",  stream);
    if (status)   params.set("status",  status);
    if (search)   params.set("search",  search);
    if (dateFrom) params.set("from",    dateFrom);
    if (dateTo)   params.set("to",      dateTo);
    const res = await fetch(`/api/admin/applications?${params}`);
    if (res.ok) {
      const json = await res.json();
      setApps(json.data.applications ?? []);
      setPagination(json.data.pagination ?? null);
      setStats(json.data.stats ?? null);
    }
    setLoading(false);
  }, [page, stream, status, search, dateFrom, dateTo]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [stream, status, search, dateFrom, dateTo]);

  // ── Bulk selection helpers ──────────────────────────────────────────────────
  const allSelected = apps.length > 0 && apps.every((a) => selected.has(a.id));
  const someSelected = selected.size > 0;

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(apps.map((a) => a.id)));
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function handleBulkUpdate() {
    if (!someSelected) return;
    const confirmed = window.confirm(
      `Mark ${selected.size} application${selected.size > 1 ? "s" : ""} as "${bulkStatus}"?`
    );
    if (!confirmed) return;
    setBulkLoading(true);
    await fetch("/api/admin/applications/bulk", {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ ids: Array.from(selected), status: bulkStatus }),
    });
    setBulkLoading(false);
    setSelected(new Set());
    load();
  }

  // ── Email digest ────────────────────────────────────────────────────────────
  async function sendDigest() {
    setDigestSending(true);
    setDigestMsg(null);
    const res = await fetch("/api/admin/applications/send-digest", { method: "POST" });
    const json = await res.json();
    setDigestMsg(res.ok ? `✅ Digest sent — ${json.data?.newToday ?? 0} new today, ${json.data?.pending ?? 0} pending.` : `❌ ${json.message ?? "Failed to send."}`);
    setDigestSending(false);
  }

  // ── Detail modal ────────────────────────────────────────────────────────────
  async function openDetail(id: string) {
    setDetailLoading(true);
    setDetail(null);
    const res = await fetch(`/api/admin/applications/${id}`);
    if (res.ok) {
      const json = await res.json();
      const d = json.data as FullApplication;
      setDetail(d);
      setNoteInput(d.adminNote ?? "");
    }
    setDetailLoading(false);
  }

  async function updateStatus(id: string, newStatus: string) {
    setSaving(true);
    await fetch(`/api/admin/applications/${id}`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ status: newStatus, adminNote: noteInput || null }),
    });
    setSaving(false);
    setDetail(null);
    load();
  }

  async function saveNote(id: string) {
    setSaving(true);
    await fetch(`/api/admin/applications/${id}`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ adminNote: noteInput || null }),
    });
    setSaving(false);
    if (detail) setDetail({ ...detail, adminNote: noteInput || null });
  }

  function exportCSV() {
    const params = new URLSearchParams();
    if (stream)   params.set("stream", stream);
    if (status)   params.set("status", status);
    if (dateFrom) params.set("from",   dateFrom);
    if (dateTo)   params.set("to",     dateTo);
    window.open(`/api/admin/applications/export?${params}`, "_blank");
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Entrance Applications</h1>
          <p className="text-gray-500 text-sm mt-1">
            {stats
              ? `${stats.total} total — ${stats.pending} pending, ${stats.verified} verified, ${stats.rejected} rejected`
              : "Loading…"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Email digest */}
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={sendDigest}
              disabled={digestSending}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm rounded-lg transition disabled:opacity-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              {digestSending ? "Sending…" : "Send Digest Email"}
            </button>
            {digestMsg && <p className="text-xs text-gray-400">{digestMsg}</p>}
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold text-sm rounded-lg transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total",    value: stats.total,    color: "text-white",      bg: "bg-white/[0.05] border-white/[0.08]" },
            { label: "Pending",  value: stats.pending,  color: "text-yellow-400", bg: "bg-yellow-400/[0.08] border-yellow-400/20" },
            { label: "Verified", value: stats.verified, color: "text-green-400",  bg: "bg-green-400/[0.08]  border-green-400/20" },
            { label: "Rejected", value: stats.rejected, color: "text-red-400",    bg: "bg-red-400/[0.08]    border-red-400/20" },
          ].map((s) => (
            <div key={s.label} className={`border rounded-xl px-4 py-3 ${s.bg}`}>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Search */}
        <form onSubmit={(e) => { e.preventDefault(); setSearch(searchInput.trim()); }} className="flex gap-2">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search name, phone, reference…"
            className="bg-gray-900 border border-white/[0.08] text-gray-200 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-amber-400/50 w-56 placeholder-gray-600"
          />
          <button type="submit" className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition">Search</button>
          {search && (
            <button type="button" onClick={() => { setSearch(""); setSearchInput(""); }}
              className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg text-sm transition">Clear</button>
          )}
        </form>

        <select value={stream} onChange={(e) => setStream(e.target.value)}
          className="bg-gray-900 border border-white/[0.08] text-gray-300 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-amber-400/50">
          <option value="">All Streams</option>
          <option value="Science">Science</option>
          <option value="Management">Management</option>
          <option value="Law">Law</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="bg-gray-900 border border-white/[0.08] text-gray-300 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-amber-400/50">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Date range */}
        <div className="flex items-center gap-2">
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
            className="bg-gray-900 border border-white/[0.08] text-gray-300 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-amber-400/50"
          />
          <span className="text-gray-600 text-sm">to</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
            className="bg-gray-900 border border-white/[0.08] text-gray-300 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-amber-400/50"
          />
          {(dateFrom || dateTo) && (
            <button onClick={() => { setDateFrom(""); setDateTo(""); }}
              className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg text-sm transition">Clear</button>
          )}
        </div>
      </div>

      {/* Bulk action bar */}
      {someSelected && (
        <div className="flex items-center gap-3 mb-4 bg-amber-400/10 border border-amber-400/30 rounded-xl px-4 py-3">
          <span className="text-amber-400 font-semibold text-sm">{selected.size} selected</span>
          <select
            value={bulkStatus}
            onChange={(e) => setBulkStatus(e.target.value)}
            className="bg-gray-900 border border-white/[0.08] text-gray-300 text-sm px-3 py-1.5 rounded-lg focus:outline-none"
          >
            <option value="verified">Verify</option>
            <option value="rejected">Reject</option>
            <option value="pending">Reset to Pending</option>
          </select>
          <button
            onClick={handleBulkUpdate}
            disabled={bulkLoading}
            className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold text-sm rounded-lg transition disabled:opacity-50"
          >
            {bulkLoading ? "Updating…" : `Apply to ${selected.size}`}
          </button>
          <button onClick={() => setSelected(new Set())} className="text-gray-500 hover:text-gray-300 text-sm ml-auto">
            Deselect all
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-gray-900 border border-white/[0.06] rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-600 text-sm">Loading applications…</div>
        ) : apps.length === 0 ? (
          <div className="py-20 text-center text-gray-600 text-sm">No applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="accent-amber-400 w-4 h-4 cursor-pointer"
                    />
                  </th>
                  {["Reference No", "Name", "Stream", "Phone", "SEE GPA", "Status", "Submitted", "Action"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apps.map((app, i) => (
                  <Fragment key={app.id}>
                    <tr className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition ${i % 2 === 0 ? "" : "bg-white/[0.01]"} ${selected.has(app.id) ? "bg-amber-400/[0.05]" : ""}`}>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(app.id)}
                          onChange={() => toggleOne(app.id)}
                          className="accent-amber-400 w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 font-mono text-amber-400 text-xs whitespace-nowrap">{app.referenceNo}</td>
                      <td className="px-4 py-3 text-gray-200 font-medium whitespace-nowrap cursor-pointer hover:text-amber-300" onClick={() => openDetail(app.id)}>{app.fullName}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STREAM_STYLES[app.stream] ?? "bg-gray-700 text-gray-300"}`}>{app.stream}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{app.phone}</td>
                      <td className="px-4 py-3 text-gray-300">{app.seeGpa}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${STATUS_STYLES[app.status] ?? ""}`}>{app.status}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{fmt(app.createdAt)}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => openDetail(app.id)} className="text-amber-400 text-xs hover:underline">View →</button>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-600 text-sm">
            Page {pagination.page} of {pagination.totalPages} · {pagination.total} results
          </p>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-700 transition">← Prev</button>
            <button disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-700 transition">Next →</button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {(detailLoading || detail) && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) { setDetail(null); setDetailLoading(false); } }}
        >
          <div className="bg-gray-900 border border-white/[0.08] rounded-2xl w-full max-w-3xl my-8 overflow-hidden">
            {detailLoading ? (
              <div className="py-20 text-center text-gray-500">Loading…</div>
            ) : detail ? (
              <>
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
                  <div>
                    <p className="font-mono text-amber-400 text-xs">{detail.referenceNo}</p>
                    <h2 className="text-white font-bold text-lg">{detail.fullName}</h2>
                  </div>
                  <button onClick={() => { setDetail(null); setDetailLoading(false); }} className="text-gray-500 hover:text-gray-300 p-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Personal Details</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        ["Gender",        detail.gender],
                        ["Date of Birth", detail.dateOfBirth],
                        ["Phone",         detail.phone],
                        ["Email",         detail.email ?? "—"],
                        ["Address",       detail.address],
                        ["Submitted",     fmt(detail.createdAt)],
                      ].map(([label, value]) => (
                        <div key={label} className="bg-white/[0.03] rounded-lg px-3 py-2.5">
                          <p className="text-gray-600 text-[10px] uppercase tracking-wide font-semibold">{label}</p>
                          <p className="text-gray-200 text-sm mt-0.5 break-words">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Academic Details</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        ["Stream",      detail.stream],
                        ["School",      detail.seeSchool],
                        ["SEE Year",    detail.seeYear],
                        ["Overall GPA", detail.seeGpa],
                        ["Maths",       detail.seeMaths   ?? "—"],
                        ["Science",     detail.seeScience ?? "—"],
                        ["English",     detail.seeEnglish ?? "—"],
                      ].map(([label, value]) => (
                        <div key={label} className="bg-white/[0.03] rounded-lg px-3 py-2.5">
                          <p className="text-gray-600 text-[10px] uppercase tracking-wide font-semibold">{label}</p>
                          <p className="text-gray-200 text-sm mt-0.5">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Payment Screenshot</p>
                    <div className="relative rounded-xl overflow-hidden bg-black/30 border border-white/[0.06]">
                      {detail.paymentScreenshotUrl.match(/\.(pdf)(\?|$)/i) ? (
                        <div className="py-6 text-center">
                          <p className="text-gray-400 text-sm mb-3">PDF payment proof</p>
                          <a href={detail.paymentScreenshotUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-gray-900 font-semibold text-sm rounded-lg hover:bg-amber-300 transition">
                            Open PDF ↗
                          </a>
                        </div>
                      ) : (
                        <>
                          <div className="relative h-72">
                            <Image src={detail.paymentScreenshotUrl} alt="Payment screenshot" fill className="object-contain" unoptimized />
                          </div>
                          <a href={detail.paymentScreenshotUrl} target="_blank" rel="noopener noreferrer"
                            className="block text-center py-2 text-amber-400 text-xs hover:underline border-t border-white/[0.06]">
                            Open full size ↗
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Admin Note (internal)</p>
                    <textarea value={noteInput} onChange={(e) => setNoteInput(e.target.value)} rows={3}
                      placeholder="Add internal note about this application…"
                      className="w-full bg-white/[0.04] border border-white/[0.08] text-gray-200 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400/40 resize-none placeholder-gray-600"
                    />
                    <button onClick={() => saveNote(detail.id)} disabled={saving}
                      className="mt-2 px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition disabled:opacity-40">
                      Save Note
                    </button>
                  </div>
                  <div className="border-t border-white/[0.07] pt-5">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
                      Current Status:{" "}
                      <span className={`capitalize font-bold ${
                        detail.status === "verified" ? "text-green-400" :
                        detail.status === "rejected" ? "text-red-400" : "text-yellow-400"
                      }`}>{detail.status}</span>
                      {detail.verifiedAt && <span className="text-gray-600 font-normal ml-2">· Verified {fmt(detail.verifiedAt)}</span>}
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <button disabled={saving || detail.status === "verified"} onClick={() => updateStatus(detail.id, "verified")}
                        className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold text-sm rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Mark Verified
                      </button>
                      <button disabled={saving || detail.status === "rejected"} onClick={() => updateStatus(detail.id, "rejected")}
                        className="px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white font-semibold text-sm rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        Mark Rejected
                      </button>
                      <button disabled={saving || detail.status === "pending"} onClick={() => updateStatus(detail.id, "pending")}
                        className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold text-sm rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed">
                        Reset to Pending
                      </button>
                    </div>
                    <p className="text-gray-600 text-xs mt-3">⚠ Applications are never deleted — rejected submissions remain for auditing.</p>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
