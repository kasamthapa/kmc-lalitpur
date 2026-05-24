"use client";

import { useEffect, useState, useCallback } from "react";

interface JobApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  category: string;
  qualification: string;
  experience: string;
  coverLetter: string | null;
  resumeUrl: string | null;
  status: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const STATUS_TABS = ["", "new", "reviewed", "shortlisted", "rejected"];
const CATEGORY_TABS = ["", "Teaching", "Non-Teaching"];

function statusLabel(s: string): string {
  const map: Record<string, string> = {
    new: "New",
    reviewed: "Reviewed",
    shortlisted: "Shortlisted",
    rejected: "Rejected",
  };
  return map[s] ?? s;
}

function statusColor(s: string): string {
  switch (s) {
    case "new":
      return "text-amber-600 bg-amber-50 border border-amber-200";
    case "reviewed":
      return "text-blue-600 bg-blue-50 border border-blue-200";
    case "shortlisted":
      return "text-green-600 bg-green-50 border border-green-200";
    case "rejected":
      return "text-gray-500 bg-gray-100 border border-gray-200";
    default:
      return "text-gray-400 bg-gray-100";
  }
}

export default function AdminCareersPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (statusFilter) params.set("status", statusFilter);
    if (categoryFilter) params.set("category", categoryFilter);
    const res = await fetch(`/api/admin/careers?${params}`);
    if (res.ok) {
      const json = await res.json();
      setApplications(json.data.applications ?? []);
      setPagination(json.data.pagination ?? null);
    }
    setLoading(false);
  }, [page, statusFilter, categoryFilter]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await fetch(`/api/admin/careers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdating(null);
    load();
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-7 gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-xl font-bold">Job Applications</h1>
          <p className="text-gray-600 text-sm mt-0.5">
            {pagination
              ? `${pagination.total} total application${pagination.total !== 1 ? "s" : ""}`
              : "Career form submissions"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-5">
        {/* Status filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-600 text-xs font-semibold uppercase tracking-wider">
            Status:
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {STATUS_TABS.map((s) => (
              <button
                key={s || "all-status"}
                onClick={() => {
                  setStatusFilter(s);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === s
                    ? "bg-amber-400 text-gray-900"
                    : "bg-white/[0.06] border border-white/[0.06] text-gray-400 hover:bg-white/[0.1] hover:text-gray-200"
                }`}
              >
                {s ? statusLabel(s) : "All"}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-600 text-xs font-semibold uppercase tracking-wider">
            Category:
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORY_TABS.map((c) => (
              <button
                key={c || "all-cat"}
                onClick={() => {
                  setCategoryFilter(c);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  categoryFilter === c
                    ? "bg-amber-400 text-gray-900"
                    : "bg-white/[0.06] border border-white/[0.06] text-gray-400 hover:bg-white/[0.1] hover:text-gray-200"
                }`}
              >
                {c || "All"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-white/[0.06] rounded-xl overflow-hidden mb-5">
        {loading ? (
          <div className="divide-y divide-white/[0.04]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-4 py-3.5 animate-pulse"
              >
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-gray-800 rounded w-1/4" />
                  <div className="h-3 bg-gray-800 rounded w-1/3" />
                </div>
                <div className="h-3 bg-gray-800 rounded w-16" />
                <div className="h-7 w-24 bg-gray-800 rounded-lg" />
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm font-medium">
              No applications found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">
                    Name
                  </th>
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">
                    Position
                  </th>
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">
                    Category
                  </th>
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">
                    Experience
                  </th>
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">
                    Date
                  </th>
                  <th className="text-left text-gray-600 text-[10px] font-bold uppercase tracking-wider px-4 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {applications.map((app) => (
                  <>
                    <tr
                      key={app.id}
                      className="cursor-pointer hover:bg-white/[0.02] transition-colors"
                      onClick={() =>
                        setExpanded(expanded === app.id ? null : app.id)
                      }
                    >
                      <td className="px-4 py-3.5">
                        <p className="text-white font-medium">{app.fullName}</p>
                        <p className="text-gray-600 text-xs mt-0.5">
                          {app.email}
                        </p>
                      </td>
                      <td className="px-4 py-3.5 text-gray-300 text-sm">
                        {app.position}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400 text-sm">
                        {app.category}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400 text-sm">
                        {app.experience}
                      </td>
                      <td className="px-4 py-3.5 text-gray-600 text-xs whitespace-nowrap">
                        {new Date(app.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td
                        className="px-4 py-3.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={app.status}
                          disabled={updating === app.id}
                          onChange={(e) => updateStatus(app.id, e.target.value)}
                          className={`text-xs font-semibold px-2 py-1 border appearance-none cursor-pointer bg-transparent focus:outline-none disabled:opacity-50 ${statusColor(app.status)}`}
                        >
                          {["new", "reviewed", "shortlisted", "rejected"].map(
                            (s) => (
                              <option
                                key={s}
                                value={s}
                                className="bg-gray-900 text-gray-200"
                              >
                                {statusLabel(s)}
                              </option>
                            )
                          )}
                        </select>
                      </td>
                    </tr>
                    {expanded === app.id && (
                      <tr key={`${app.id}-expanded`}>
                        <td
                          colSpan={6}
                          className="px-4 py-4 bg-white/[0.02] border-b border-white/[0.04]"
                        >
                          <div className="max-w-3xl space-y-3">
                            <div className="flex flex-wrap gap-6">
                              <div>
                                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1">
                                  Phone
                                </p>
                                <p className="text-gray-300 text-sm">
                                  {app.phone}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1">
                                  Qualification
                                </p>
                                <p className="text-gray-300 text-sm">
                                  {app.qualification}
                                </p>
                              </div>
                            </div>
                            {app.coverLetter && (
                              <div>
                                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-2">
                                  Cover Letter
                                </p>
                                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
                                  {app.coverLetter}
                                </p>
                              </div>
                            )}
                            <div className="pt-2 border-t border-white/[0.06] flex flex-wrap gap-4">
                              <a
                                href={`mailto:${app.email}`}
                                className="text-amber-400 hover:text-amber-300 text-xs font-medium transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Email applicant →
                              </a>
                              {app.resumeUrl && (
                                <a
                                  href={app.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Download CV / Resume →
                                </a>
                              )}
                            </div>
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
            className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-30 border border-white/[0.06] text-gray-300 text-sm font-medium rounded-lg transition-colors"
          >
            ← Prev
          </button>
          <span className="text-gray-500 text-sm">
            Page{" "}
            <span className="text-white font-semibold">{pagination.page}</span>{" "}
            of {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setPage((p) => Math.min(pagination.totalPages, p + 1))
            }
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
