import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export const dynamic = "force-dynamic";

// Increase max duration to 60s on Pro, falls back gracefully on Hobby
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  const { searchParams } = req.nextUrl;
  const stream = searchParams.get("stream") ?? "";
  const status = searchParams.get("status") ?? "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};
  if (stream) where.stream = stream;
  if (status) where.status = status;

  function esc(val: string | null | undefined): string {
    if (!val) return "";
    return `"${val.replace(/"/g, '""')}"`;
  }

  const csvHeaders = [
    "Reference No", "Full Name", "Date of Birth", "Gender", "Phone", "Email",
    "Address", "Stream", "Previous School", "SEE Year", "SEE GPA",
    "Maths Grade", "Science Grade", "English Grade",
    "Status", "Admin Note", "Payment Screenshot URL",
    "Submitted At", "Verified At",
  ].map(h => `"${h}"`).join(",");

  // Stream response using ReadableStream — avoids building entire CSV in memory
  // and starts sending bytes immediately, well within timeout limits
  const encoder = new TextEncoder();
  const PAGE    = 500; // fetch 500 rows at a time
  let   skip    = 0;
  let   first   = true;

  const readable = new ReadableStream({
    async pull(controller) {
      // Send header row on first pull
      if (first) {
        controller.enqueue(encoder.encode(csvHeaders + "\n"));
        first = false;
      }

      const rows = await prisma.entranceApplication.findMany({
        where,
        orderBy: { createdAt: "asc" },
        skip,
        take: PAGE,
        select: {
          referenceNo: true, fullName: true, dateOfBirth: true, gender: true,
          phone: true, email: true, address: true, stream: true,
          seeSchool: true, seeYear: true, seeGpa: true,
          seeMaths: true, seeScience: true, seeEnglish: true,
          status: true, adminNote: true, paymentScreenshotUrl: true,
          createdAt: true, verifiedAt: true,
        },
      });

      if (rows.length === 0) {
        controller.close();
        return;
      }

      const chunk = rows.map((r) => [
        esc(r.referenceNo), esc(r.fullName), esc(r.dateOfBirth), esc(r.gender),
        esc(r.phone), esc(r.email), esc(r.address), esc(r.stream),
        esc(r.seeSchool), esc(r.seeYear), esc(r.seeGpa),
        esc(r.seeMaths), esc(r.seeScience), esc(r.seeEnglish),
        esc(r.status), esc(r.adminNote), esc(r.paymentScreenshotUrl),
        esc(r.createdAt.toISOString()), esc(r.verifiedAt?.toISOString() ?? null),
      ].join(",")).join("\n") + "\n";

      controller.enqueue(encoder.encode(chunk));
      skip += PAGE;

      // If fewer rows returned than PAGE, we're done
      if (rows.length < PAGE) controller.close();
    },
  });

  const filename = `kmc-applications-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(readable, {
    status: 200,
    headers: {
      "Content-Type":        "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
