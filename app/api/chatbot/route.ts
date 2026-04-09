import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { rateLimit } from "@/app/lib/rate-limit";
import { apiError, apiServerError } from "@/app/lib/api-response";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are the official admissions assistant for Kathmandu
Model Secondary School (KMC Lalitpur), located at Balkumari, Lalitpur, Nepal.
You help students and parents with questions about admissions, streams,
scholarships, fees, facilities, and campus life.

IMPORTANT RULES:
- Be friendly, helpful, and concise. Keep answers under 150 words unless more detail is needed.
- Always respond in the same language the user writes in (Nepali or English).
- If you cannot answer something confidently, say so and direct them to contact the school.
- Never make up fees, dates, or facts not listed below.
- For anything requiring personal details or urgent help, direct them to call or WhatsApp.

KEY FACTS:
School: Kathmandu Model Secondary School (KMC Lalitpur / KMSS)
Location: Balkumari, Lalitpur, Nepal
Principal: Mukunda Kumar Giri
Phone: +977-1-5918595
WhatsApp: +977 98511 38595
Email: info@kmclalitpur.edu.np
Office Hours: Sunday–Friday 8AM–5PM, Saturday 10AM–3PM
Apply: https://ktmmodelcollege.edu.np/apply-to-kmss/
NEB Pass Rate: 100% every year
Students: 2,500+ active
Established: 2000
Certification: ISO 9001:2015
Award: Best Campus 2080 — Govt. of Nepal

STREAMS (3 only — Humanities does NOT exist at KMC):
1. Science: CGPA 2.85+ (B+ in Science/Maths/OptMaths/English)
   Entrance: Science 40 + Maths 40 + English 20 = 100 marks, 60 minutes
   Careers: MBBS, Engineering, BSc, Pharmacy

2. Management: CGPA 2.05+ (C in Maths/English)
   Entrance: English 45 + GK 15 + Maths 15 = 75 marks, 60 minutes
   Careers: BBA, CA, BBS, Finance

3. Law (established 2019): CGPA 2.05+ (C in Maths/English)
   Entrance: English 45 + GK 15 + Maths 15 = 75 marks, 60 minutes
   Careers: LLB, Civil Service, Advocacy

SCHOLARSHIPS:
- Merit: SEE(25%) + KMC Entrance(75%), first-come-first-served, valid 3 months
- Sushil Memorial: Top 2 from first entrance + 1 Madhesi community student
- Government School: Separate entrance test for govt school students
- Need-based: Income-based financial aid

MOCK TESTS:
KMC offers online mock entrance exam practice through Microsoft Forms.
Students can access the mock test at /mock-test on this website.
Results are available immediately after submission via Microsoft Forms.

FACILITIES: Science labs, Computer lab, Library (10,000+ books), Sports complex,
Cafeteria, Auditorium (200+ seats), Hostel, Transport (5 routes), Counselling,
Incubation lab, Wi-Fi campus, Medical room`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = rateLimit(`chatbot:${ip}`, 20, 3600);
  if (!success) {
    return apiError("Too many requests. Please try again later.", {}, 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("Invalid request body.");
  }

  const { messages } = body as {
    messages: Array<{ role: "user" | "model"; parts: string }>;
  };

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return apiError("Messages array is required.");
  }

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.role !== "user") {
    return apiError("Last message must be from user.");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role,
      parts: [{ text: m.parts }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage.parts);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    return apiServerError(error, "chatbot");
  }
}
