import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  const { response } = await requireAdminAuth();
  if (response) return response;

  try {
    const faculty = await prisma.faculty.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });
    return apiSuccess(faculty);
  } catch (error) {
    return apiServerError(error, "faculty GET");
  }
}

export async function POST(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  let body: unknown;
  try { body = await req.json(); } catch { return apiError("Invalid body."); }

  const b = body as Record<string, unknown>;
  const { name, title, dept, qualification, experience, subjects, email, bio, achievements, imageUrl, active, displayOrder } = b;

  if (!name || typeof name !== "string" || name.trim().length < 2)
    return apiError("Name is required (min 2 characters).");
  if (!title || typeof title !== "string")
    return apiError("Title/role is required.");
  if (!dept || typeof dept !== "string")
    return apiError("Department is required.");
  if (!qualification || typeof qualification !== "string")
    return apiError("Qualification is required.");
  if (!experience || typeof experience !== "string")
    return apiError("Experience is required.");

  const baseSlug = slugify(name as string);
  // ensure unique slug
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.faculty.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  try {
    const faculty = await prisma.faculty.create({
      data: {
        name: (name as string).trim(),
        slug,
        title: (title as string).trim(),
        dept: (dept as string).trim(),
        qualification: (qualification as string).trim(),
        experience: (experience as string).trim(),
        subjects: subjects ? (subjects as string).trim() : null,
        email: email ? (email as string).trim() : null,
        bio: bio ? (bio as string).trim() : null,
        achievements: achievements ? (achievements as string).trim() : null,
        imageUrl: imageUrl ? (imageUrl as string).trim() : null,
        active: active !== false,
        displayOrder: typeof displayOrder === "number" ? displayOrder : 0,
      },
    });
    return apiSuccess(faculty, 201);
  } catch (error) {
    return apiServerError(error, "faculty POST");
  }
}
