"use client";

import { useEffect, useState, useCallback } from "react";

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
      e.name,
      e.email,
      e.phone ?? "",
      e.stream ?? "",
      e.subject ?? "",
      new Date(e.createdAt).toLocaleDateString("en-GB"),
      e.read ? "Yes" : "No",
      e.responded ? "Yes" : "No",
      `"${e.message.replace(/"/g, '""')}"`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries-page${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-2xl font-bold">Enquiries</h1>
          <p className="text-gray-400 text-sm mt-1">
            Messages submitted via the contact form.
            {pagination && ` Total: ${pagination.total}`}
          </p>
        </div>
        <button
          onClick={exportCSV}
          disabled={enquiries.length === 0}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <label className="text-gray-400 text-sm">Filter by stream:</label>
        <div className="flex gap-2 flex-wrap">
          {STREAMS.map((s) => (
            <button
              key={s || "all"}
              onClick={() => { setStream(s); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                stream === s
                  ? "bg-amber-400 text-gray-900"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden mb-6">
        {loading ? (
          <p className="text-gray-500 text-sm p-6">Loading…</p>
        ) : enquiries.length === 0 ? (
          <p className="text-gray-500 text-sm p-6">No enquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Name</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Email</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Phone</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Stream</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Subject</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Date</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <>
                    <tr
                      key={enq.id}
                      className={`border-b border-gray-700/50 cursor-pointer hover:bg-gray-700/30 transition-colors ${
                        !enq.read ? "bg-amber-400/5" : ""
                      }`}
                      onClick={() => setExpanded(expanded === enq.id ? null : enq.id)}
                    >
                      <td className="px-4 py-3">
                        <span className="text-white">{enq.name}</span>
                        {!enq.read && (
                          <span className="ml-2 text-xs bg-amber-400 text-gray-900 font-bold px-1.5 py-0.5 rounded">
                            NEW
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-300">{enq.email}</td>
                      <td className="px-4 py-3 text-gray-400">{enq.phone ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-400">{enq.stream ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-400 max-w-[160px] truncate">{enq.subject ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                        {new Date(enq.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2">
                          <button
                            onClick={() => patch(enq.id, { read: !enq.read })}
                            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                              enq.read
                                ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
                                : "bg-green-900/50 text-green-400 hover:bg-green-900"
                            }`}
                          >
                            {enq.read ? "Unread" : "Mark Read"}
                          </button>
                          <button
                            onClick={() => patch(enq.id, { responded: !enq.responded })}
                            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                              enq.responded
                                ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
                                : "bg-blue-900/50 text-blue-400 hover:bg-blue-900"
                            }`}
                          >
                            {enq.responded ? "Unrespond" : "Responded"}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expanded === enq.id && (
                      <tr key={`${enq.id}-expanded`} className="border-b border-gray-700/50 bg-gray-700/20">
                        <td colSpan={7} className="px-4 py-4">
                          <p className="text-gray-300 text-sm whitespace-pre-wrap">{enq.message}</p>
                          <div className="flex gap-4 mt-3 text-xs text-gray-500">
                            <span>Status: {enq.read ? "Read" : "Unread"} · {enq.responded ? "Responded" : "Not responded"}</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
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
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white text-sm rounded-lg transition-colors"
          >
            ← Prev
          </button>
          <span className="text-gray-400 text-sm">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page === pagination.totalPages}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white text-sm rounded-lg transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
