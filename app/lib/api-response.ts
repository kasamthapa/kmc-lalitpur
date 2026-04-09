import { NextResponse } from "next/server";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(
  message: string,
  errors?: Record<string, string>,
  status = 400
) {
  return NextResponse.json({ success: false, message, errors }, { status });
}

export function apiUnauthorized(message = "Unauthorized") {
  return NextResponse.json({ success: false, message }, { status: 401 });
}

export function apiNotFound(message = "Not found") {
  return NextResponse.json({ success: false, message }, { status: 404 });
}

export function apiServerError(error: unknown, context = "") {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(
    `[API Error]${context ? ` [${context}]` : ""} ${new Date().toISOString()}:`,
    message
  );
  return NextResponse.json(
    { success: false, message: "An internal server error occurred." },
    { status: 500 }
  );
}
