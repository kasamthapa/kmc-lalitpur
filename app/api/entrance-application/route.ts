import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";

// ── Rate-limit: max 3 submissions per IP per hour ─────────────────────────────
const ipSubmitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipSubmitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipSubmitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

// ── Reference number generator ────────────────────────────────────────────────
async function generateReferenceNo(): Promise<string> {
  const year = new Date().getFullYear();
  // Use a base-36 timestamp + 3 random chars — effectively unique
  const suffix = (Date.now().toString(36) + Math.random().toString(36).slice(2, 5)).toUpperCase().slice(-7);
  const ref = `KMC-${year}-${suffix}`;
  // Ensure uniqueness (collision is astronomically rare but we guard anyway)
  const existing = await prisma.entranceApplication.findUnique({ where: { referenceNo: ref } });
  if (existing) {
    // Recursive retry (will virtually never happen)
    return generateReferenceNo();
  }
  return ref;
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ success: false, message: "Too many submissions from this device. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try { body = await req.json(); } catch { return apiError("Invalid request body."); }

  const b = body as Record<string, unknown>;

  // ── Validate required fields ──────────────────────────────────────────────
  const required: [string, string][] = [
    ["fullName",             "Full name is required."],
    ["dateOfBirth",          "Date of birth is required."],
    ["gender",               "Gender is required."],
    ["phone",                "Phone number is required."],
    ["address",              "Address is required."],
    ["stream",               "Stream selection is required."],
    ["seeSchool",            "Previous school name is required."],
    ["seeYear",              "SEE year is required."],
    ["seeGpa",               "SEE GPA/grade is required."],
    ["paymentScreenshotUrl", "Payment screenshot is required."],
  ];

  for (const [field, msg] of required) {
    if (!b[field] || typeof b[field] !== "string" || !(b[field] as string).trim()) {
      return apiError(msg);
    }
  }

  // Validate stream value
  const validStreams = ["Science", "Management", "Law"];
  if (!validStreams.includes(b.stream as string)) {
    return apiError("Invalid stream selected.");
  }

  // Validate phone — must be digits, 10 chars
  const phone = (b.phone as string).trim().replace(/\s+/g, "");
  if (!/^\d{10}$/.test(phone)) {
    return apiError("Phone number must be exactly 10 digits.");
  }

  // Check for duplicate submission from same phone for same stream
  try {
    const duplicate = await prisma.entranceApplication.findFirst({
      where: { phone, stream: b.stream as string },
      select: { referenceNo: true },
    });
    if (duplicate) {
      return NextResponse.json(
        { success: false, message: `A form has already been submitted with this phone number for the ${b.stream} stream. Your reference number is ${duplicate.referenceNo}. Contact the college if this is an error.` },
        { status: 409 }
      );
    }
  } catch {
    // Don't block submission on duplicate-check failure
  }

  // ── Create record ─────────────────────────────────────────────────────────
  try {
    const referenceNo = await generateReferenceNo();

    const application = await prisma.entranceApplication.create({
      data: {
        referenceNo,
        fullName:             (b.fullName as string).trim(),
        dateOfBirth:          (b.dateOfBirth as string).trim(),
        gender:               (b.gender as string).trim(),
        phone,
        email:                b.email ? (b.email as string).trim() : null,
        address:              (b.address as string).trim(),
        stream:               (b.stream as string).trim(),
        seeSchool:            (b.seeSchool as string).trim(),
        seeYear:              (b.seeYear as string).trim(),
        seeGpa:               (b.seeGpa as string).trim(),
        seeMaths:             b.seeMaths  ? (b.seeMaths as string).trim()  : null,
        seeScience:           b.seeScience ? (b.seeScience as string).trim() : null,
        seeEnglish:           b.seeEnglish ? (b.seeEnglish as string).trim() : null,
        paymentScreenshotUrl: (b.paymentScreenshotUrl as string).trim(),
        status:               "pending",
      },
      select: { referenceNo: true, fullName: true, stream: true, createdAt: true },
    });

    return apiSuccess({ referenceNo: application.referenceNo }, 201);
  } catch (error) {
    return apiServerError(error, "entrance-application POST");
  }
}
