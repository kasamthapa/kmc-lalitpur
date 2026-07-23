"use client";

import { useState, useRef, useEffect } from "react";
import { SITE_CONFIG } from "../config/site";

// ─── Types ────────────────────────────────────────────────────────────────────
type Message = {
  id: number;
  role: "user" | "bot";
  text: string;
};

// API message format expected by /api/chatbot
type ApiMessage = {
  role: "user" | "model";
  parts: string;
};

const FALLBACK_MESSAGE =
  `Sorry, I'm having trouble connecting right now. Please call us at ` +
  `${SITE_CONFIG.phone} or WhatsApp ${SITE_CONFIG.whatsapp}`;

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

  async function send(overrideText?: string) {
    const text = (overrideText ?? input).trim();
    if (!text || typing) return;

    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Build history for the API — convert bot→model, exclude initial greeting
    const history: ApiMessage[] = messages
      .filter((m) => m.id !== 0) // skip the greeting message
      .map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: m.text,
      }));
    history.push({ role: "user", parts: text });

    // Placeholder bot message that we'll stream into
    const botId = Date.now() + 1;
    setMessages((prev) => [...prev, { id: botId, role: "bot", text: "" }]);
    setTyping(false);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId ? { ...m, text: FALLBACK_MESSAGE } : m
          )
        );
        return;
      }

      // Stream response chunks into the bot message
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const snap = accumulated;
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, text: snap } : m))
        );
      }

      // Flush any remaining bytes
      accumulated += decoder.decode();
      if (accumulated) {
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, text: accumulated } : m))
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botId ? { ...m, text: FALLBACK_MESSAGE } : m
        )
      );
    }
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
          <div className="bg-[#1B3E72] px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center font-bold text-[#1B3E72] text-sm">
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
                  <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center font-bold text-[#1B3E72] text-xs mr-2 mt-1 shrink-0">
                    K
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[#1B3E72] text-white rounded-tr-sm"
                      : "bg-white text-[#374151] rounded-tl-sm border border-[#eae6de] shadow-sm"
                  }`}
                >
                  {msg.text || (
                    /* streaming cursor while text is empty */
                    <span className="inline-block w-2 h-4 bg-[#6b7280] animate-pulse rounded-sm" />
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center font-bold text-[#1B3E72] text-xs shrink-0">
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
                  onClick={() => send(qr)}
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
              onClick={() => send()}
              disabled={!input.trim() || typing}
              className="w-10 h-10 rounded-xl bg-[#1B3E72] text-white flex items-center justify-center hover:bg-[#162d54] disabled:opacity-40 transition shrink-0"
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
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#1B3E72] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
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
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full text-[#1B3E72] text-xs font-bold flex items-center justify-center">
            {messages.filter((m) => m.role === "bot").length}
          </span>
        )}
      </button>
    </>
  );
}
