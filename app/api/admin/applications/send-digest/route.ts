import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";
import { sendApplicationDigest } from "@/app/lib/mailer";

export async function POST(req: NextRequest) {
  // Allow both admin-panel calls (session auth) and cron calls (secret header)
  const cronSecret = req.headers.get("x-cron-secret");
  const isCron     = cronSecret && cronSecret === process.env.CRON_SECRET;

  if (!isCron) {
    const { response } = await requireAdminAuth();
    if (response) return response;
  }

  // Check email is configured before hitting the DB
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return apiError(
      "Email is not configured yet. Add EMAIL_HOST, EMAIL_USER, and EMAIL_PASS to your environment variables to enable digest emails.",
      undefined,
      503
    );
  }

  try {
    const now        = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const [total, newToday, pending, verified, rejected, byStreamRaw] = await Promise.all([
      prisma.entranceApplication.count(),
      prisma.entranceApplication.count({ where: { createdAt: { gte: startOfDay } } }),
      prisma.entranceApplication.count({ where: { status: "pending" } }),
      prisma.entranceApplication.count({ where: { status: "verified" } }),
      prisma.entranceApplication.count({ where: { status: "rejected" } }),
      prisma.entranceApplication.groupBy({ by: ["stream"], _count: { id: true } }),
    ]);

    const byStream = byStreamRaw.map((r) => ({ stream: r.stream, count: r._count.id }));

    await sendApplicationDigest({ total, newToday, pending, verified, rejected, byStream });

    return apiSuccess({ sent: true, newToday, pending });
  } catch (error) {
    return apiServerError(error, "send-digest POST");
  }
}
