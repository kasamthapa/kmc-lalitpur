import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { rateLimit, getClientIp } from "@/app/lib/rate-limit";

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const { success } = rateLimit(`ping:${ip}`, 10, 60);
  if (!success) return NextResponse.json({ ok: false }, { status: 429 });
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
