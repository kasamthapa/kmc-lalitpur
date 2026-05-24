// Public endpoint — returns active vacancies ordered by category, displayOrder.
// No auth required.
import { prisma } from "@/app/lib/prisma";
import { apiSuccess } from "@/app/lib/api-response";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const vacancies = await prisma.vacancy.findMany({
      where: { active: true },
      orderBy: [{ category: "asc" }, { displayOrder: "asc" }],
      select: {
        id: true,
        title: true,
        category: true,
        posts: true,
        description: true,
      },
    });
    return apiSuccess(vacancies);
  } catch (error) {
    console.error("[/api/vacancies]", error);
    return NextResponse.json({ data: [] });
  }
}
