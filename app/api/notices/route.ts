// Public endpoint — returns active notices for the homepage marquee.
// No auth required. Only returns active:true notices ordered by displayOrder.
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiServerError } from "@/app/lib/api-response";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // always fresh — revalidated by admin write routes

export async function GET() {
  try {
    const now = new Date();
    const notices = await prisma.notice.findMany({
      where: {
        active: true,
        OR: [{ startDate: null }, { startDate: { lte: now } }],
        AND: [
          {
            OR: [{ endDate: null }, { endDate: { gte: now } }],
          },
        ],
      },
      orderBy: { displayOrder: "asc" },
      select: { id: true, text: true },
    });
    return apiSuccess(notices);
  } catch (error) {
    // Silently fall back — public pages must never 500
    console.error("[/api/notices]", error);
    return NextResponse.json({ data: [] });
  }
}
