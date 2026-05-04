// Daily digest cron — triggered by Vercel Cron at 08:00 Nepal Time (02:15 UTC)
// Configured in vercel.json

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Verify this is a legitimate Vercel cron call or our own secret
  const authHeader  = req.headers.get("authorization");
  const cronSecret  = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Delegate to the send-digest route (reuse all logic)
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/admin/applications/send-digest`, {
    method:  "POST",
    headers: { "x-cron-secret": cronSecret ?? "" },
  });

  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}
