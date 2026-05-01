import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const alumni = await prisma.alumni.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.gradYear !== undefined && { gradYear: body.gradYear }),
        ...(body.program !== undefined && { program: body.program }),
        ...(body.currentRole !== undefined && { currentRole: body.currentRole || null }),
        ...(body.company !== undefined && { company: body.company || null }),
        ...(body.location !== undefined && { location: body.location || null }),
        ...(body.email !== undefined && { email: body.email || null }),
        ...(body.phone !== undefined && { phone: body.phone || null }),
        ...(body.bio !== undefined && { bio: body.bio || null }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl || null }),
        ...(body.linkedIn !== undefined && { linkedIn: body.linkedIn || null }),
        ...(body.approved !== undefined && { approved: body.approved }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.displayOrder !== undefined && { displayOrder: body.displayOrder }),
      },
    });

    return NextResponse.json({ data: alumni });
  } catch (err: unknown) {
    console.error("[PATCH /api/admin/alumni/[id]]", err);
    if ((err as { code?: string })?.code === "P2025") {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.alumni.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if ((err as { code?: string })?.code === "P2025") {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
