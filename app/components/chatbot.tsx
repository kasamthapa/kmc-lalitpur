"use client";

import { useState, useRef, useEffect } from "react";
import { SITE_CONFIG } from "../config/site";

// ─── Types ────────────────────────────────────────────────────────────────────
type Message = {
  id: number;
  role: "user" | "bot";
  text: string;
};

// ─── Mock response engine ─────────────────────────────────────────────────────
function getBotReply(input: string): string {
  const q = input.toLowerCase();

  if (q.match(/admission|apply|enroll|join/))
    return `Admissions for the 2082/83 academic year are open! You need SEE results and relevant documents. For Science, minimum GPA 3.0 is required. Call us at ${SITE_CONFIG.phone} or visit our Admissions page for full details.`;

  if (q.match(/fee|cost|price|tuition|charge/))
    return "Fees vary by stream. Science is the highest, followed by Management and Law. We offer merit scholarships (up to 100% waiver) and need-based assistance. Contact our admissions office for the exact fee structure.";

  if (q.match(/stream|science|management|humanities|law/))
    return "KMC offers 3 streams at the +2 level:\n• Science (Physics, Chemistry, Biology/Computer)\n• Management (Accountancy, Economics, Business)\n• Law (Legal Studies & Social Sciences)\n\nVisit our Academics page to learn more.";

  if (q.match(/hostel|room|accommodation|stay/))
    return `Yes, we have hostel facilities! Options include Single (Rs. 12,000/month), Double (Rs. 8,500/month), and Dormitory (Rs. 6,000/month) rooms — all include 3 meals/day, Wi-Fi, and 24/7 security. Visit /campus/hostel for details.`;

  if (q.match(/transport|bus|route|pickup/))
    return "We run transport on 5 routes covering Kathmandu, Patan, Bhaktapur, Baneshwor, and Gwarko areas. Monthly passes start from Rs. 1,500. Visit /campus/transport for route details and stops.";

  if (q.match(/contact|phone|email|address|location/))
    return `📞 Phone: ${SITE_CONFIG.phone}\n📧 Email: ${SITE_CONFIG.email}\n📍 Address: ${SITE_CONFIG.address.display}\n\nOffice hours: Sun–Fri 8 AM–5 PM, Sat 10 AM–3 PM`;

  if (q.match(/scholarship|discount|waiver|free/))
    return "KMC offers merit-based scholarships (25%–100% fee waiver) based on our entrance exam scores. We also have scholarships for top sports athletes and students with financial need. Apply during the admission process.";

  if (q.match(/result|pass rate|academic performance|topper/))
    return "KMC Lalitpur has consistently achieved 100% pass rates in NEB examinations and has produced multiple district and national toppers. We received the NEB Excellence Award for Academic Excellence.";

  if (q.match(/mock test|practice|exam prep|preparation/))
    return "You can take free mock tests on our website at /mock-test! We have practice questions for Physics, Chemistry, Biology, Mathematics, Accountancy, Economics and more streams.";

  if (q.match(/faculty|teacher|professor|staff/))
    return "KMC has 150+ qualified educators, including 12+ PhD holders with an average of 11 years of teaching experience. Visit /campus/faculty to see our full team.";

  if (q.match(/facilities|lab|library|sports|computer/))
    return "Our campus has: Science Labs (Physics, Chemistry, Biology), Computer Lab (60 workstations), Library (15,000+ books), Auditorium (500 seats), Sports Complex, and a Cafeteria. Visit /facilities for the full tour.";

  if (q.match(/hello|hi|hey|namaste/))
    return "Namaste! 👋 I'm KMC's virtual assistant. I can help you with admissions, fees, streams, facilities, hostel, transport, and more. What would you like to know?";

  if (q.match(/thank|thanks|धन्यवाद/))
    return "You're welcome! 😊 Is there anything else I can help you with? Feel free to ask about admissions, academic programs, or campus facilities.";

  return `I'm not sure about that specifically. For accurate information, please contact us directly:\n📞 ${SITE_CONFIG.phone}\n📧 ${SITE_CONFIG.email}\n\nOr visit our Contact page for more ways to reach us.`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Namaste! 👋 I'm the KMC virtual assistant. Ask me anything about admissions, programs, hostel, transport, or campus facilities!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function send() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: getBotReply(text),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 900);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const quickReplies = ["Admission process", "Hostel fees", "Transport routes", "Streams offered"];

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-48 right-6 z-50 w-[340px] sm:w-[380px] max-h-[560px] bg-white rounded-2xl shadow-2xl border border-[#eae6de] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#0B1F3A] px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center font-bold text-[#0B1F3A] text-sm">
                K
              </div>
              <div>
                <p className="text-white font-bold text-sm">KMC Assistant</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <p className="text-[#8ba7c7] text-xs">Online · Instant replies</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-[#8ba7c7] hover:text-white transition p-1"
              aria-label="Close chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f7f5f0]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center font-bold text-[#0B1F3A] text-xs mr-2 mt-1 shrink-0">
                    K
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[#0B1F3A] text-white rounded-tr-sm"
                      : "bg-white text-[#374151] rounded-tl-sm border border-[#eae6de] shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center font-bold text-[#0B1F3A] text-xs shrink-0">
                  K
                </div>
                <div className="bg-white border border-[#eae6de] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-[#6b7280] rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 bg-white border-t border-[#eae6de] flex flex-wrap gap-2">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => {
                    setInput(qr);
                    setTimeout(send, 0);
                  }}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#eae6de] text-[#374151] hover:border-amber-400 hover:text-amber-600 transition"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-[#eae6de] flex gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your question..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#eae6de] text-sm text-[#374151] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-amber-400 bg-[#f7f5f0]"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-[#0B1F3A] text-white flex items-center justify-center hover:bg-[#162d54] disabled:opacity-40 transition shrink-0"
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#0B1F3A] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!open && messages.length > 1 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full text-[#0B1F3A] text-xs font-bold flex items-center justify-center">
            {messages.filter((m) => m.role === "bot").length}
          </span>
        )}
      </button>
    </>
  );
}
