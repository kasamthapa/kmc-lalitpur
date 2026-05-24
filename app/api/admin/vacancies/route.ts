import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function GET() {
  const { response } = await requireAdminAuth();
  if (response) return response;

  try {
    const vacancies = await prisma.vacancy.findMany({
      orderBy: [{ category: "asc" }, { displayOrder: "asc" }],
    });
    return apiSuccess(vacancies);
  } catch (error) {
    return apiServerError(error, "vacancies GET");
  }
}

export async function POST(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  let body: unknown;
  try { body = await req.json(); } catch { return apiError("Invalid body."); }

  const { title, category, posts, description, active, displayOrder } =
    body as Record<string, unknown>;

  if (!title || typeof title !== "string" || title.trim().length < 2 || title.trim().length > 100) {
    return apiError("Title is required (2–100 characters).");
  }
  if (category !== "Teaching" && category !== "Non-Teaching") {
    return apiError("Category must be 'Teaching' or 'Non-Teaching'.");
  }
  const postsNum = typeof posts === "number" ? posts : Number(posts);
  if (!Number.isInteger(postsNum) || postsNum < 1) {
    return apiError("Posts must be a positive integer.");
  }

  try {
    const vacancy = await prisma.vacancy.create({
      data: {
        title: (title as string).trim(),
        category: category as string,
        posts: postsNum,
        description: description ? String(description).trim() : null,
        active: active !== false,
        displayOrder: typeof displayOrder === "number" ? displayOrder : 0,
      },
    });
    return apiSuccess(vacancy, 201);
  } catch (error) {
    return apiServerError(error, "vacancies POST");
  }
}
