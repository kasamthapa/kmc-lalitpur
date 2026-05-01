// Public alumni endpoints — GET returns approved alumni, POST registers a new one
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { rateLimit } from "@/app/lib/rate-limit";
import { apiError } from "@/app/lib/api-response";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = rateLimit(`alumni:get:${ip}`, 30, 3600);
  if (!success) return apiError("Too many requests.", {}, 429);

  try {
    const alumni = await prisma.alumni.findMany({
      where: { approved: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        gradYear: true,
        program: true,
        currentRole: true,
        company: true,
        location: true,
        email: true,
        bio: true,
        imageUrl: true,
        linkedIn: true,
        featured: true,
      },
    });
    return NextResponse.json({ data: alumni });
  } catch (err) {
    console.error("[GET /api/alumni]", err);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = rateLimit(`alumni:post:${ip}`, 5, 3600);
  if (!success) return apiError("Too many requests.", {}, 429);

  try {
    const body = await req.json();

    const { name, gradYear, program, currentRole, company, location, email, phone, bio, imageUrl, linkedIn } = body;

    if (!name?.trim() || !gradYear?.trim() || !program?.trim()) {
      return NextResponse.json({ message: "Name, graduation year, and program are required." }, { status: 400 });
    }

    const allowed = ["Science", "Management", "Law"];
    if (!allowed.includes(program)) {
      return NextResponse.json({ message: "Invalid program." }, { status: 400 });
    }

    const alumni = await prisma.alumni.create({
      data: {
        name: name.trim(),
        gradYear: gradYear.trim(),
        program,
        currentRole: currentRole?.trim() || null,
        company: company?.trim() || null,
        location: location?.trim() || null,
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        bio: bio?.trim() || null,
        imageUrl: imageUrl?.trim() || null,
        linkedIn: linkedIn?.trim() || null,
        approved: false,
      },
    });

    return NextResponse.json({ data: alumni }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/alumni]", err);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
