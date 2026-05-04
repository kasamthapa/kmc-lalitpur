import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

export async function GET(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  const { searchParams } = req.nextUrl;
  const page     = Math.max(1, parseInt(searchParams.get("page")   ?? "1", 10));
  const stream   = searchParams.get("stream")  ?? "";
  const status   = searchParams.get("status")  ?? "";
  const search   = searchParams.get("search")  ?? "";
  const dateFrom = searchParams.get("from")    ?? "";
  const dateTo   = searchParams.get("to")      ?? "";

  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};
  if (stream)   where.stream = stream;
  if (status)   where.status = status;
  if (search) {
    where.OR = [
      { fullName:    { contains: search, mode: "insensitive" } },
      { phone:       { contains: search } },
      { referenceNo: { contains: search, mode: "insensitive" } },
      { email:       { contains: search, mode: "insensitive" } },
    ];
  }
  if (dateFrom || dateTo) {
    where.createdAt = {};
    if (dateFrom) where.createdAt.gte = new Date(dateFrom);
    if (dateTo)   where.createdAt.lte = new Date(dateTo + "T23:59:59Z");
  }

  try {
    const [total, rows, stats] = await Promise.all([
      prisma.entranceApplication.count({ where }),
      prisma.entranceApplication.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        select: {
          id: true, referenceNo: true, fullName: true, phone: true,
          email: true, stream: true, gender: true, status: true,
          seeGpa: true, seeSchool: true, seeYear: true,
          createdAt: true, verifiedAt: true,
        },
      }),
      // Overall stats (always unfiltered)
      prisma.entranceApplication.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
    ]);

    const statMap: Record<string, number> = { pending: 0, verified: 0, rejected: 0 };
    for (const s of stats) statMap[s.status] = s._count.id;
    const totalAll = statMap.pending + statMap.verified + statMap.rejected;

    return apiSuccess({
      applications: rows,
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        total,
        totalPages: Math.ceil(total / PAGE_SIZE),
      },
      stats: { total: totalAll, ...statMap },
    });
  } catch (error) {
    return apiServerError(error, "applications GET");
  }
}
