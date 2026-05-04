"use client";

import { useEffect, useState, useCallback, Fragment } from "react";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Application {
  id: string; referenceNo: string; fullName: string; phone: string;
  email: string | null; stream: string; gender: string; status: string;
  seeGpa: string; seeSchool: string; seeYear: string;
  createdAt: string; verifiedAt: string | null;
}
interface FullApplication extends Application {
  dateOfBirth: string; address: string;
  seeMaths: string | null; seeScience: string | null; seeEnglish: string | null;
  paymentScreenshotUrl: string; adminNote: string | null;
}
interface Pagination { page: number; pageSize: number; total: number; totalPages: number; }
interface Stats { total: number; pending: number; verified: number; rejected: number; }

// ── Helpers ───────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { dot: string; badge: string; label: string }> = {
  pending:  { dot: "bg-yellow-400", badge: "bg-yellow-400/15 text-yellow-400 border-yellow-400/25", label: "Pending"  },
  verified: { dot: "bg-green-400",  badge: "bg-green-400/15  text-green-400  border-green-400/25",  label: "Verified" },
  rejected: { dot: "bg-red-400",    badge: "bg-red-400/15    text-red-400    border-red-400/25",    label: "Rejected" },
};

const STREAM_CONFIG: Record<string, { badge: string }> = {
  Science:    { badge: "bg-blue-500/15   text-blue-400   border-blue-500/25"   },
  Management: { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  Law:        { badge: "bg-orange-500/15 text-orange-400 border-orange-500/25" },
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtTime(d: string) {
  return new Date(d).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

// ── Sub-components ────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-white/[0.04] animate-pulse">
      <td className="px-4 py-3.5"><div className="w-4 h-4 bg-gray-800 rounded" /></td>
      <td className="px-4 py-3.5"><div className="h-3 bg-gray-800 rounded w-28" /></td>
      <td className="px-4 py-3.5">
        <div className="h-3.5 bg-gray-800 rounded w-32 mb-1.5" />
        <div className="h-2.5 bg-gray-800 rounded w-20" />
      </td>
      <td className="px-4 py-3.5"><div className="h-5 bg-gray-800 rounded-full w-20" /></td>
      <td className="px-4 py-3.5"><div className="h-3 bg-gray-800 rounded w-24" /></td>
      <td className="px-4 py-3.5"><div className="h-3 bg-gray-800 rounded w-10" /></td>
      <td className="px-4 py-3.5"><div className="h-5 bg-gray-800 rounded-full w-16" /></td>
      <td className="px-4 py-3.5"><div className="h-3 bg-gray-800 rounded w-16" /></td>
    </tr>
  );
}

function Badge({ config, children }: { config: { badge: string }; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${config.badge}`}>
      {children}
    </span>
  );
}

// ── Detail Side Panel ─────────────────────────────────────────────────────────
function DetailPanel({
  detail, loading, onClose, onSave,
}: {
  detail: FullApplication | null;
  loading: boolean;
  onClose: () => void;
  onSave: (id: string, status: string, note: string) => Promise<void>;
}) {
  const [noteInput, setNoteInput]   = useState("");
  const [saving, setSaving]         = useState(false);
  const [activeTab, setActiveTab]   = useState<"details" | "payment">("details");

  useEffect(() => {
    if (detail) { setNoteInput(detail.adminNote ?? ""); setActiveTab("details"); }
  }, [detail]);

  async function handleAction(status: string) {
    if (!detail) return;
    setSaving(true);
    await onSave(detail.id, status, noteInput);
    setSaving(false);
  }

  const open = loading || !!detail;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40" onClick={onClose} />
      )}

      {/* Side panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[560px] bg-gray-950 border-l border-white/[0.07] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
              <p className="text-gray-500 text-sm">Loading application…</p>
            </div>
          </div>
        ) : detail ? (
          <>
            {/* Panel header */}
            <div className="px-6 py-4 border-b border-white/[0.07] shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-amber-400 text-xs bg-amber-400/10 px-2 py-0.5 rounded">
                      {detail.referenceNo}
                    </span>
                    {(() => {
                      const s = STATUS_CONFIG[detail.status];
                      return s ? (
                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${s.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                        </span>
                      ) : null;
                    })()}
                  </div>
                  <h2 className="text-white font-bold text-xl truncate">{detail.fullName}</h2>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Submitted {fmt(detail.createdAt)} at {fmtTime(detail.createdAt)}
                    {detail.verifiedAt && ` · Verified ${fmt(detail.verifiedAt)}`}
                  </p>
                </div>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-300 transition p-1 shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mt-4">
                {(["details", "payment"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition capitalize ${
                      activeTab === tab
                        ? "bg-amber-400 text-gray-900"
                        : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.05]"
                    }`}>
                    {tab === "payment" ? "Payment Proof" : "Details"}
                  </button>
                ))}
              </div>
            </div>

            {/* Panel body */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === "details" ? (
                <div className="p-6 space-y-6">

                  {/* Personal */}
                  <div>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">Personal Information</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        ["Phone",         detail.phone],
                        ["Gender",        detail.gender],
                        ["Date of Birth", detail.dateOfBirth],
                        ["Email",         detail.email ?? "—"],
                        ["Address",       detail.address],
                      ].map(([label, value]) => (
                        <div key={label} className={`bg-white/[0.03] border border-white/[0.05] rounded-lg px-3 py-2.5 ${label === "Address" ? "col-span-2" : ""}`}>
                          <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wide">{label}</p>
                          <p className="text-gray-200 text-sm mt-0.5 break-words">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic */}
                  <div>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">Academic Details</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="col-span-2 bg-white/[0.03] border border-white/[0.05] rounded-lg px-3 py-2.5 flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wide">Stream</p>
                          <p className="text-gray-200 text-sm mt-0.5 font-semibold">{detail.stream}</p>
                        </div>
                        {(() => { const c = STREAM_CONFIG[detail.stream]; return c ? <Badge config={c}>{detail.stream}</Badge> : null; })()}
                      </div>
                      {[
                        ["Previous School", detail.seeSchool],
                        ["SEE Year",        detail.seeYear],
                        ["Overall GPA",     detail.seeGpa],
                        ["Maths Grade",     detail.seeMaths   ?? "—"],
                        ["Science Grade",   detail.seeScience ?? "—"],
                        ["English Grade",   detail.seeEnglish ?? "—"],
                      ].map(([label, value]) => (
                        <div key={label} className={`bg-white/[0.03] border border-white/[0.05] rounded-lg px-3 py-2.5 ${label === "Previous School" ? "col-span-2" : ""}`}>
                          <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wide">{label}</p>
                          <p className="text-gray-200 text-sm mt-0.5">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Admin note */}
                  <div>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Internal Note</p>
                    <textarea
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      rows={3}
                      placeholder="Add a private note about this application…"
                      className="w-full bg-white/[0.03] border border-white/[0.07] text-gray-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400/40 resize-none placeholder-gray-700 transition"
                    />
                    <button
                      onClick={() => handleAction(detail.status)}
                      disabled={saving || noteInput === (detail.adminNote ?? "")}
                      className="mt-2 px-4 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 text-xs font-semibold rounded-lg transition disabled:opacity-30"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              ) : (
                /* Payment tab */
                <div className="p-6">
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">Payment Screenshot</p>
                  {detail.paymentScreenshotUrl.match(/\.(pdf)(\?|$)/i) ? (
                    <div className="border border-white/[0.07] rounded-xl p-8 text-center bg-white/[0.02]">
                      <svg className="mx-auto mb-3 text-gray-500" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                      </svg>
                      <p className="text-gray-400 text-sm mb-4">PDF payment proof uploaded</p>
                      <a href={detail.paymentScreenshotUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-gray-900 font-semibold text-sm rounded-lg hover:bg-amber-300 transition">
                        Open PDF ↗
                      </a>
                    </div>
                  ) : (
                    <div className="rounded-xl overflow-hidden border border-white/[0.07] bg-black/20">
                      <div className="relative" style={{ minHeight: 300 }}>
                        <Image src={detail.paymentScreenshotUrl} alt="Payment screenshot" fill className="object-contain" unoptimized />
                      </div>
                      <div className="border-t border-white/[0.07] px-4 py-2.5 flex items-center justify-between">
                        <p className="text-gray-600 text-xs">Payment proof uploaded by applicant</p>
                        <a href={detail.paymentScreenshotUrl} target="_blank" rel="noopener noreferrer"
                          className="text-amber-400 text-xs hover:underline flex items-center gap-1">
                          Open full size
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Panel footer — status actions */}
            <div className="px-6 py-4 border-t border-white/[0.07] shrink-0 bg-gray-950">
              <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest mb-3">Update Status</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  disabled={saving || detail.status === "verified"}
                  onClick={() => handleAction("verified")}
                  className="flex flex-col items-center gap-1.5 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 font-semibold text-xs rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {saving ? "Saving…" : "Mark Verified"}
                </button>
                <button
                  disabled={saving || detail.status === "rejected"}
                  onClick={() => handleAction("rejected")}
                  className="flex flex-col items-center gap-1.5 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold text-xs rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  {saving ? "Saving…" : "Mark Rejected"}
                </button>
                <button
                  disabled={saving || detail.status === "pending"}
                  onClick={() => handleAction("pending")}
                  className="flex flex-col items-center gap-1.5 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-gray-400 font-semibold text-xs rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
                  </svg>
                  {saving ? "Saving…" : "Reset Pending"}
                </button>
              </div>
              <p className="text-gray-700 text-[10px] mt-3 text-center">Applications are never deleted — all records are permanently preserved.</p>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ApplicationsPage() {
  const [apps, setApps]               = useState<Application[]>([]);
  const [pagination, setPagination]   = useState<Pagination | null>(null);
  const [stats, setStats]             = useState<Stats | null>(null);
  const [page, setPage]               = useState(1);
  const [streamFilter, setStreamFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch]           = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [dateFrom, setDateFrom]       = useState("");
  const [dateTo, setDateTo]           = useState("");
  const [loading, setLoading]         = useState(true);

  // Bulk
  const [selected, setSelected]       = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus]   = useState("verified");
  const [bulkLoading, setBulkLoading] = useState(false);

  // Digest email
  const [digestSending, setDigestSending] = useState(false);
  const [digestMsg, setDigestMsg]         = useState<string | null>(null);

  // Detail panel
  const [panelId, setPanelId]           = useState<string | null>(null);
  const [panelLoading, setPanelLoading] = useState(false);
  const [panelData, setPanelData]       = useState<FullApplication | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setSelected(new Set());
    const p = new URLSearchParams({ page: String(page) });
    if (streamFilter) p.set("stream", streamFilter);
    if (statusFilter) p.set("status", statusFilter);
    if (search)       p.set("search", search);
    if (dateFrom)     p.set("from",   dateFrom);
    if (dateTo)       p.set("to",     dateTo);
    const res = await fetch(`/api/admin/applications?${p}`);
    if (res.ok) {
      const json = await res.json();
      setApps(json.data.applications ?? []);
      setPagination(json.data.pagination ?? null);
      setStats(json.data.stats ?? null);
    }
    setLoading(false);
  }, [page, streamFilter, statusFilter, search, dateFrom, dateTo]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [streamFilter, statusFilter, search, dateFrom, dateTo]);

  // Bulk helpers
  const allSelected = apps.length > 0 && apps.every((a) => selected.has(a.id));
  const someSelected = selected.size > 0;
  function toggleAll() { someSelected ? setSelected(new Set()) : setSelected(new Set(apps.map((a) => a.id))); }
  function toggleOne(id: string) {
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  async function handleBulkUpdate() {
    if (!someSelected || !confirm(`Mark ${selected.size} application${selected.size > 1 ? "s" : ""} as "${bulkStatus}"?`)) return;
    setBulkLoading(true);
    await fetch("/api/admin/applications/bulk", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: Array.from(selected), status: bulkStatus }),
    });
    setBulkLoading(false);
    setSelected(new Set());
    load();
  }

  async function sendDigest() {
    setDigestSending(true); setDigestMsg(null);
    const res = await fetch("/api/admin/applications/send-digest", { method: "POST" });
    const json = await res.json();
    setDigestMsg(res.ok
      ? `✅ Sent — ${json.data?.newToday ?? 0} new today, ${json.data?.pending ?? 0} pending`
      : `❌ ${json.message ?? "Failed"}`);
    setDigestSending(false);
  }

  async function openPanel(id: string) {
    if (panelId === id) { setPanelId(null); setPanelData(null); return; }
    setPanelId(id); setPanelLoading(true); setPanelData(null);
    const res = await fetch(`/api/admin/applications/${id}`);
    if (res.ok) { const j = await res.json(); setPanelData(j.data as FullApplication); }
    setPanelLoading(false);
  }

  function closePanel() { setPanelId(null); setPanelData(null); setPanelLoading(false); }

  async function handleSave(id: string, status: string, note: string) {
    await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNote: note || null }),
    });
    closePanel();
    load();
  }

  function exportCSV() {
    const p = new URLSearchParams();
    if (streamFilter) p.set("stream", streamFilter);
    if (statusFilter) p.set("status", statusFilter);
    if (dateFrom)     p.set("from",   dateFrom);
    if (dateTo)       p.set("to",     dateTo);
    window.open(`/api/admin/applications/export?${p}`, "_blank");
  }

  const verifyRate = stats && stats.total > 0
    ? Math.round((stats.verified / stats.total) * 100) : 0;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="p-6 max-w-7xl mx-auto pb-24">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="text-white text-xl font-bold">Entrance Applications</h1>
            <p className="text-gray-600 text-sm mt-0.5">
              {stats ? `${stats.total.toLocaleString()} total submissions` : "Loading…"}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex flex-col items-end gap-1">
              <button onClick={sendDigest} disabled={digestSending}
                className="flex items-center gap-2 px-3.5 py-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-xs font-semibold rounded-lg transition disabled:opacity-40">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                {digestSending ? "Sending…" : "Send Digest"}
              </button>
              {digestMsg && <p className="text-[11px] text-gray-500">{digestMsg}</p>}
            </div>
            <button onClick={exportCSV}
              className="flex items-center gap-2 px-3.5 py-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-xs font-semibold rounded-lg transition">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* ── Stats cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total",    value: stats?.total    ?? "—", sub: `${verifyRate}% verified`,                   accent: "text-white",       border: "border-white/[0.06]",      icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
            { label: "Pending",  value: stats?.pending  ?? "—", sub: "awaiting review",                           accent: "text-yellow-400",   border: "border-yellow-400/20",     icon: "M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0" },
            { label: "Verified", value: stats?.verified ?? "—", sub: stats ? `${verifyRate}% of total` : "—",    accent: "text-green-400",    border: "border-green-400/20",      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
            { label: "Rejected", value: stats?.rejected ?? "—", sub: "invalid / declined",                       accent: "text-red-400",      border: "border-red-400/20",        icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0" },
          ].map((s) => (
            <div key={s.label} className={`bg-gray-900 border ${s.border} rounded-xl p-4 flex items-start justify-between gap-3`}>
              <div>
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mb-1">{s.label}</p>
                <p className={`text-3xl font-bold leading-none ${s.accent}`}>{typeof s.value === "number" ? s.value.toLocaleString() : s.value}</p>
                <p className="text-gray-600 text-[11px] mt-1.5">{s.sub}</p>
              </div>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.accent === "text-white" ? "bg-white/[0.06]" : s.accent.includes("yellow") ? "bg-yellow-400/10" : s.accent.includes("green") ? "bg-green-400/10" : "bg-red-400/10"}`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={s.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Verification progress bar */}
        {stats && stats.total > 0 && (
          <div className="bg-gray-900 border border-white/[0.06] rounded-xl px-4 py-3 mb-5 flex items-center gap-4">
            <p className="text-gray-500 text-xs font-semibold shrink-0">Verification Progress</p>
            <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${verifyRate}%` }} />
            </div>
            <p className="text-gray-400 text-xs font-bold shrink-0">{verifyRate}%</p>
          </div>
        )}

        {/* ── Filters ─────────────────────────────────────────────────────── */}
        <div className="space-y-3 mb-5">
          {/* Search + date */}
          <div className="flex flex-wrap gap-2">
            <form onSubmit={(e) => { e.preventDefault(); setSearch(searchInput.trim()); }} className="flex gap-2 flex-1 min-w-[260px]">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by name, phone or reference no…"
                  className="w-full bg-gray-900 border border-white/[0.08] text-gray-200 text-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-amber-400/40 placeholder-gray-700 transition"
                />
              </div>
              <button type="submit" className="px-3 py-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 rounded-lg text-xs font-semibold transition">Search</button>
              {search && <button type="button" onClick={() => { setSearch(""); setSearchInput(""); }} className="px-3 py-2 bg-white/[0.04] text-gray-500 hover:text-gray-300 rounded-lg text-xs transition">✕ Clear</button>}
            </form>

            <div className="flex items-center gap-2">
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                className="bg-gray-900 border border-white/[0.08] text-gray-400 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-amber-400/40" />
              <span className="text-gray-700 text-xs">→</span>
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                className="bg-gray-900 border border-white/[0.08] text-gray-400 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-amber-400/40" />
              {(dateFrom || dateTo) && (
                <button onClick={() => { setDateFrom(""); setDateTo(""); }} className="text-gray-600 hover:text-gray-300 text-xs transition">✕</button>
              )}
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-700 text-[10px] font-bold uppercase tracking-wider">Stream:</span>
              {["", "Science", "Management", "Law"].map((s) => (
                <button key={s || "all"} onClick={() => setStreamFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    streamFilter === s ? "bg-amber-400 text-gray-900" : "bg-white/[0.05] border border-white/[0.07] text-gray-500 hover:text-gray-300 hover:bg-white/[0.08]"
                  }`}>
                  {s || "All"}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-700 text-[10px] font-bold uppercase tracking-wider">Status:</span>
              {["", "pending", "verified", "rejected"].map((s) => (
                <button key={s || "all"} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition capitalize ${
                    statusFilter === s ? "bg-amber-400 text-gray-900" : "bg-white/[0.05] border border-white/[0.07] text-gray-500 hover:text-gray-300 hover:bg-white/[0.08]"
                  }`}>
                  {s || "All"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Table ───────────────────────────────────────────────────────── */}
        <div className="bg-gray-900 border border-white/[0.06] rounded-xl overflow-hidden">
          {loading ? (
            <table className="w-full text-sm">
              <tbody>{[...Array(8)].map((_, i) => <SkeletonRow key={i} />)}</tbody>
            </table>
          ) : apps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <p className="text-gray-500 text-sm font-medium">No applications found</p>
              <p className="text-gray-700 text-xs mt-1">Try adjusting your filters or search</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" checked={allSelected} onChange={toggleAll} className="accent-amber-400 w-3.5 h-3.5 cursor-pointer" />
                    </th>
                    {["Reference", "Applicant", "Stream", "Contact", "GPA", "Status", "Submitted", ""].map((h) => (
                      <th key={h} className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {apps.map((app) => {
                    const sc  = STATUS_CONFIG[app.status];
                    const stc = STREAM_CONFIG[app.stream];
                    const isOpen = panelId === app.id;
                    return (
                      <Fragment key={app.id}>
                        <tr onClick={() => openPanel(app.id)}
                          className={`cursor-pointer hover:bg-white/[0.02] transition-colors ${isOpen ? "bg-amber-400/[0.04] border-l-2 border-l-amber-400" : ""} ${selected.has(app.id) ? "bg-white/[0.03]" : ""}`}>
                          <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" checked={selected.has(app.id)} onChange={() => toggleOne(app.id)} className="accent-amber-400 w-3.5 h-3.5 cursor-pointer" />
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="font-mono text-amber-400/80 text-[11px]">{app.referenceNo}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <p className="text-gray-200 font-medium text-sm leading-none">{app.fullName}</p>
                            <p className="text-gray-600 text-[11px] mt-1">{app.seeSchool} · {app.seeYear}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            {stc
                              ? <Badge config={stc}>{app.stream}</Badge>
                              : <span className="text-gray-500 text-xs">{app.stream}</span>}
                          </td>
                          <td className="px-4 py-3.5">
                            <p className="text-gray-300 text-xs">{app.phone}</p>
                            {app.email && <p className="text-gray-600 text-[11px] mt-0.5 truncate max-w-[140px]">{app.email}</p>}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-gray-200 font-semibold text-sm">{app.seeGpa}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            {sc
                              ? <Badge config={sc}><span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{sc.label}</Badge>
                              : <span className="text-gray-500 text-xs capitalize">{app.status}</span>}
                          </td>
                          <td className="px-4 py-3.5">
                            <p className="text-gray-500 text-[11px] whitespace-nowrap">{fmt(app.createdAt)}</p>
                            <p className="text-gray-700 text-[10px] mt-0.5">{fmtTime(app.createdAt)}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isOpen ? "rotate-90" : ""}`}>
                              <polyline points="9 18 15 12 9 6"/>
                            </svg>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Pagination ───────────────────────────────────────────────────── */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-gray-600 text-xs">
              Showing {((pagination.page - 1) * pagination.pageSize) + 1}–{Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total.toLocaleString()}
            </p>
            <div className="flex items-center gap-1">
              <button disabled={page <= 1} onClick={() => setPage(1)}
                className="px-2 py-1.5 bg-gray-800 text-gray-400 rounded-lg text-xs disabled:opacity-30 hover:bg-gray-700 transition">«</button>
              <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-xs disabled:opacity-30 hover:bg-gray-700 transition">← Prev</button>
              <span className="px-3 py-1.5 text-gray-500 text-xs">{page} / {pagination.totalPages}</span>
              <button disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-xs disabled:opacity-30 hover:bg-gray-700 transition">Next →</button>
              <button disabled={page >= pagination.totalPages} onClick={() => setPage(pagination.totalPages)}
                className="px-2 py-1.5 bg-gray-800 text-gray-400 rounded-lg text-xs disabled:opacity-30 hover:bg-gray-700 transition">»</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Floating bulk action bar ─────────────────────────────────────── */}
      {someSelected && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-gray-900 border border-white/[0.1] rounded-2xl px-5 py-3 shadow-2xl shadow-black/40 backdrop-blur-sm">
          <span className="text-white font-semibold text-sm">{selected.size} selected</span>
          <div className="w-px h-5 bg-white/[0.1]" />
          <select value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value)}
            className="bg-gray-800 border border-white/[0.08] text-gray-200 text-xs px-3 py-1.5 rounded-lg focus:outline-none">
            <option value="verified">Verify</option>
            <option value="rejected">Reject</option>
            <option value="pending">Reset to Pending</option>
          </select>
          <button onClick={handleBulkUpdate} disabled={bulkLoading}
            className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-xs rounded-lg transition disabled:opacity-50">
            {bulkLoading ? "Updating…" : "Apply"}
          </button>
          <button onClick={() => setSelected(new Set())} className="text-gray-600 hover:text-gray-400 transition">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      {/* ── Detail side panel ────────────────────────────────────────────── */}
      <DetailPanel
        detail={panelData}
        loading={panelLoading}
        onClose={closePanel}
        onSave={handleSave}
      />
    </>
  );
}
