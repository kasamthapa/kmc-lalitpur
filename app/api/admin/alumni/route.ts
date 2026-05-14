import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function GET(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // "pending" | "approved" | undefined (all)

    const where =
      status === "pending"
        ? { approved: false }
        : status === "approved"
          ? { approved: true }
          : {};

    const alumni = await prisma.alumni.findMany({
      where,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ data: alumni });
  } catch (err) {
    console.error("[GET /api/admin/alumni]", err);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  try {
    const body = await req.json();
    const { name, gradYear, program, currentRole, company, location, email, phone, bio, imageUrl, linkedIn, approved, featured, displayOrder } = body;

    if (!name?.trim() || !gradYear?.trim() || !program?.trim()) {
      return NextResponse.json({ message: "Name, graduation year, and program are required." }, { status: 400 });
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
        approved: approved ?? false,
        featured: featured ?? false,
        displayOrder: displayOrder ?? 0,
      },
    });

    revalidatePath("/alumni");
    return NextResponse.json({ data: alumni }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/alumni]", err);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
