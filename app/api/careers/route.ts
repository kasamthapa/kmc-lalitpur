import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { rateLimit } from "@/app/lib/rate-limit";
import {
  validateEmail,
  validateLength,
  hasErrors,
  ValidationErrors,
} from "@/app/lib/validate";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = rateLimit(`careers:${ip}`, 5, 600);
  if (!success) {
    return apiError("Too many requests. Please wait 10 minutes.", {}, 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("Invalid request body.");
  }

  const {
    fullName,
    email,
    phone,
    position,
    category,
    qualification,
    experience,
    coverLetter,
    resumeUrl,
  } = body as Record<string, string>;

  const errors: ValidationErrors = {};
  if (!fullName || !validateLength(fullName.trim(), 2, 100))
    errors.fullName = "Full name must be between 2 and 100 characters.";
  if (!email || !validateEmail(email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!phone || !validateLength(phone.trim(), 6, 20))
    errors.phone = "Please enter a valid phone number.";
  if (!position || !validateLength(position.trim(), 2, 200))
    errors.position = "Please select a position.";
  if (!category || !validateLength(category.trim(), 2, 50))
    errors.category = "Please select a category.";
  if (!qualification || !validateLength(qualification.trim(), 2, 200))
    errors.qualification = "Please enter your qualification.";
  if (!experience || !validateLength(experience.trim(), 1, 50))
    errors.experience = "Please select your experience level.";
  if (coverLetter && !validateLength(coverLetter.trim(), 0, 3000))
    errors.coverLetter = "Cover letter must be under 3,000 characters.";
  if (!resumeUrl || !resumeUrl.trim().startsWith("https://"))
    errors.resumeUrl = "Please upload your CV or resume.";

  if (hasErrors(errors)) {
    return apiError("Please fix the errors below.", errors);
  }

  try {
    await prisma.jobApplication.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        position: position.trim(),
        category: category.trim(),
        qualification: qualification.trim(),
        experience: experience.trim(),
        coverLetter: coverLetter?.trim() || null,
        resumeUrl: resumeUrl?.trim() || null,
      },
    });
  } catch (error) {
    return apiServerError(error, "careers POST");
  }

  return apiSuccess({
    message: "Application submitted! We'll be in touch within 5 working days.",
  });
}

export async function GET() {
  return apiError("Method not allowed.", {}, 405);
}
