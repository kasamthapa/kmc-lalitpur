"use client";

import { useEffect, useState, useCallback, Fragment } from "react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  stream: string | null;
  message: string;
  read: boolean;
  responded: boolean;
  createdAt: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const STREAMS = ["", "Science", "Management", "Law"];

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [stream, setStream] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (stream) params.set("stream", stream);
    const res = await fetch(`/api/admin/enquiries?${params}`);
    if (res.ok) {
      const json = await res.json();
      setEnquiries(json.data.enquiries ?? []);
      setPagination(json.data.pagination ?? null);
    }
    setLoading(false);
  }, [page, stream]);

  useEffect(() => { load(); }, [load]);

  async function patch(id: string, body: Partial<Pick<Enquiry, "read" | "responded">>) {
    await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    load();
  }

  function exportCSV() {
    const headers = ["Name", "Email", "Phone", "Stream", "Subject", "Date", "Read", "Responded", "Message"];
    const rows = enquiries.map((e) => [
      e.name, e.email, e.phone ?? "", e.stream ?? "", e.subject ?? "",
      new Date(e.createdAt).toLocaleDateString("en-GB"),
      e.read ? "Yes" : "No", e.responded ? "Yes" : "No",
      `"${e.message.replace(/"/g, '""')}"`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-7 gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-xl font-bold">Enquiries</h1>
          <p className="text-gray-600 text-sm mt-0.5">
            {pagination ? `${pagination.total} total message${pagination.total !== 1 ? "s" : ""}` : "Contact form submissions"}
          </p>
        </div>
        <button
          onClick={exportCSV}
          disabled={enquiries.length === 0}
          className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] disabled:opacity-30 text-gray-300 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Stream:</span>
        <div className="flex gap-1.5 flex-wrap">
          {STREAMS.map((s) => (
            <button
              key={s || "all"}
              onClick={() => { setStream(s); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                stream === s
                  ? "bg-amber-400 text-gray-900"
                  : "bg-white/[0.06] border border-white/[0.06] text-gray-400 hover:bg-white/[0.1] hover:text-gray-200"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-white/[0.06] rounded-xl overflow-hidden mb-5">
        {loading ? (
          <div className="divide-y divide-white/[0.04]">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3.5 animate-pulse">
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-gray-800 rounded w-1/4" />
                  <div className="h-3 bg-gray-800 rounded w-1/3" />
                </div>
                <div className="h-3 bg-gray-800 rounded w-16" />
                <div className="flex gap-2">
                  <div className="h-7 w-20 bg-gray-800 rounded-lg" />
                  <div className="h-7 w-24 bg-gray-800 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : enquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <p className="text-gray-500 text-sm font-medium">No enquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">Name</th>
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">Email</th>
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">Stream</th>
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">Subject</th>
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">Date</th>
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {enquiries.map((enq) => (
                  <Fragment key={enq.id}>
                    <tr
                      className={`cursor-pointer hover:bg-white/[0.02] transition-colors ${!enq.read ? "bg-amber-400/[0.03]" : ""}`}
                      onClick={() => setExpanded(expanded === enq.id ? null : enq.id)}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{enq.name}</span>
                          {!enq.read && (
                            <span className="text-[9px] bg-amber-400 text-gray-900 font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
                          )}
                          {enq.responded && (
                            <span className="text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/20 font-semibold px-1.5 py-0.5 rounded-full leading-none">Done</span>
                          )}
                        </div>
                        {enq.phone && <p className="text-gray-600 text-xs mt-0.5">{enq.phone}</p>}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400 text-sm">{enq.email}</td>
                      <td className="px-4 py-3.5">
                        {enq.stream ? (
                          <span className="text-xs bg-white/[0.06] text-gray-400 px-2 py-0.5 rounded-full">{enq.stream}</span>
                        ) : <span className="text-gray-700">—</span>}
                      </td>
                      <td className="px-4 py-3.5 text-gray-500 text-sm max-w-[180px] truncate">{enq.subject ?? "—"}</td>
                      <td className="px-4 py-3.5 text-gray-600 text-xs whitespace-nowrap">
                        {new Date(enq.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => patch(enq.id, { read: !enq.read })}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                              enq.read
                                ? "bg-white/[0.06] text-gray-500 hover:bg-white/[0.1] hover:text-gray-300"
                                : "bg-green-500/15 text-green-400 border border-green-500/20 hover:bg-green-500/25"
                            }`}
                          >
                            {enq.read ? "Mark Unread" : "Mark Read"}
                          </button>
                          <button
                            onClick={() => patch(enq.id, { responded: !enq.responded })}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                              enq.responded
                                ? "bg-white/[0.06] text-gray-500 hover:bg-white/[0.1] hover:text-gray-300"
                                : "bg-blue-500/15 text-blue-400 border border-blue-500/20 hover:bg-blue-500/25"
                            }`}
                          >
                            {enq.responded ? "Undo" : "Responded"}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expanded === enq.id && (
                      <tr>
                        <td colSpan={6} className="px-4 py-4 bg-white/[0.02] border-b border-white/[0.04]">
                          <div className="max-w-3xl">
                            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-2">Message</p>
                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words">{enq.message}</p>
                            <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-white/[0.06]">
                              <span className="text-gray-600 text-xs">
                                Status: <span className={enq.read ? "text-green-500" : "text-amber-400"}>{enq.read ? "Read" : "Unread"}</span>
                              </span>
                              <span className="text-gray-600 text-xs">
                                Response: <span className={enq.responded ? "text-blue-400" : "text-gray-500"}>{enq.responded ? "Responded" : "Pending"}</span>
                              </span>
                              <span className="text-gray-600 text-xs">
                                Received: {new Date(enq.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                              </span>
                              <a href={`mailto:${enq.email}`} className="text-amber-400 hover:text-amber-300 text-xs font-medium transition-colors" onClick={(e) => e.stopPropagation()}>
                                Reply via email →
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-30 border border-white/[0.06] text-gray-300 text-sm font-medium rounded-lg transition-colors"
          >
            ← Prev
          </button>
          <span className="text-gray-500 text-sm">
            Page <span className="text-white font-semibold">{pagination.page}</span> of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page === pagination.totalPages}
            className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-30 border border-white/[0.06] text-gray-300 text-sm font-medium rounded-lg transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
