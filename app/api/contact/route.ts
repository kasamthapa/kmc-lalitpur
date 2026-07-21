import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { rateLimit, getClientIp } from "@/app/lib/rate-limit";
import {
  validateEmail,
  validateLength,
  hasErrors,
  ValidationErrors,
} from "@/app/lib/validate";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { success } = rateLimit(`contact:${ip}`, 5, 600);
  if (!success) {
    return apiError("Too many requests. Please wait 10 minutes.", {}, 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("Invalid request body.");
  }

  const { name, email, phone, subject, stream, message } = body as Record<
    string,
    string
  >;

  const errors: ValidationErrors = {};
  if (!name || !validateLength(name.trim(), 2, 100))
    errors.name = "Name must be between 2 and 100 characters.";
  if (!email || !validateEmail(email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!subject || !validateLength(subject.trim(), 3, 200))
    errors.subject = "Subject must be between 3 and 200 characters.";
  if (!message || !validateLength(message.trim(), 10, 2000))
    errors.message = "Message must be between 10 and 2,000 characters.";
  if (hasErrors(errors)) {
    return apiError("Please fix the errors below.", errors);
  }

  try {
    await prisma.enquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        subject: subject.trim(),
        stream: stream || null,
        message: message.trim(),
      },
    });
  } catch (error) {
    return apiServerError(error, "contact form");
  }

  return apiSuccess({
    message:
      "Your enquiry has been submitted. We will contact you within 24 hours.",
  });
}

export async function GET() {
  return apiError("Method not allowed.", {}, 405);
}
