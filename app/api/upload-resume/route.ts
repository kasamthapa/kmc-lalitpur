import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/app/lib/rate-limit";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// The client-declared MIME type is attacker-controlled, so sniff real content:
// PDF starts with "%PDF", DOCX is a ZIP ("PK\x03\x04"), legacy DOC is an OLE
// compound file (D0 CF 11 E0 ...).
function sniffDocType(bytes: Uint8Array): string | null {
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return "application/pdf";
  }
  if (bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  if (
    bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0 &&
    bytes[4] === 0xa1 && bytes[5] === 0xb1 && bytes[6] === 0x1a && bytes[7] === 0xe1
  ) {
    return "application/msword";
  }
  return null;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { success } = rateLimit(`upload-resume:${ip}`, 10, 3600);
  if (!success) {
    return NextResponse.json(
      { error: "Too many uploads. Please wait and try again." },
      { status: 429 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5 MB." },
        { status: 400 }
      );
    }

    const head = new Uint8Array(await file.slice(0, 8).arrayBuffer());
    const sniffed = sniffDocType(head);
    if (!sniffed) {
      return NextResponse.json(
        { error: "Only PDF, DOC, or DOCX files are accepted." },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() ?? "pdf";
    const filename = `resumes/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const blob = await put(filename, file, {
      access: "public",
      contentType: sniffed,
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("Resume upload error:", err);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
