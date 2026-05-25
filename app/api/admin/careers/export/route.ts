import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/app/lib/prisma";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function GET(req: Request) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "";
  const category = searchParams.get("category") || "";

  const applications = await prisma.jobApplication.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(category ? { category } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const rows = applications.map((app, i) => ({
    "#": i + 1,
    "Full Name": app.fullName,
    Email: app.email,
    Phone: app.phone,
    Position: app.position,
    Category: app.category,
    Qualification: app.qualification,
    Experience: app.experience,
    "Cover Letter": app.coverLetter ?? "",
    "Resume URL": app.resumeUrl ?? "",
    Status: app.status.charAt(0).toUpperCase() + app.status.slice(1),
    "Applied On": new Date(app.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

  const ws = XLSX.utils.json_to_sheet(rows);

  // Column widths
  ws["!cols"] = [
    { wch: 4 },   // #
    { wch: 22 },  // Full Name
    { wch: 28 },  // Email
    { wch: 14 },  // Phone
    { wch: 24 },  // Position
    { wch: 14 },  // Category
    { wch: 20 },  // Qualification
    { wch: 14 },  // Experience
    { wch: 50 },  // Cover Letter
    { wch: 50 },  // Resume URL
    { wch: 12 },  // Status
    { wch: 14 },  // Applied On
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Job Applications");

  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  const label = [status, category].filter(Boolean).join("_") || "all";
  const filename = `job-applications-${label}-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
