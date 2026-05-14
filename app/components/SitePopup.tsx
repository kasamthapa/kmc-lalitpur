"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PopupButton {
  label: string;
  url: string;
  style: "primary" | "secondary" | "outline";
}

interface ActivePopup {
  id: string;
  title: string | null;
  body: string | null;
  imageUrl: string | null;
  buttons: string | null;
  active: boolean;
  showOnce: boolean;
  delaySeconds: number;
}

function parseButtons(raw: string | null): PopupButton[] {
  if (!raw) return [];
  try { return JSON.parse(raw) as PopupButton[]; } catch { return []; }
}

function btnClass(style: PopupButton["style"]) {
  if (style === "primary")
    return "px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#0B1F3A] font-bold text-sm rounded-xl transition-colors";
  if (style === "secondary")
    return "px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#162d50] text-white font-bold text-sm rounded-xl transition-colors border border-white/10";
  return "px-5 py-2.5 border-2 border-[#0B1F3A] text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white font-bold text-sm rounded-xl transition-colors";
}

const STORAGE_PREFIX = "kmc_popup_seen_";

export function SitePopup() {
  const [popup, setPopup] = useState<ActivePopup | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    fetch("/api/popups")
      .then((r) => r.json())
      .then(({ data }: { data: ActivePopup | null }) => {
        if (!data) return;

        // If showOnce and already dismissed, skip
        if (data.showOnce) {
          const seen = localStorage.getItem(`${STORAGE_PREFIX}${data.id}`);
          if (seen) return;
        }

        setPopup(data);
        timer = setTimeout(() => setVisible(true), data.delaySeconds * 1000);
      })
      .catch(() => {});

    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    if (popup?.showOnce) {
      localStorage.setItem(`${STORAGE_PREFIX}${popup.id}`, "1");
    }
  }

  if (!popup || !visible) return null;

  const buttons = parseButtons(popup.buttons);
  const isExternal = (url: string) => url.startsWith("http://") || url.startsWith("https://");

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Popup box */}
      <div
        role="dialog"
        aria-modal="true"
        className="fixed z-[201] inset-0 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden animate-popup">
          {/* Close button */}
          <div className="flex justify-end px-4 pt-4">
            <button
              onClick={dismiss}
              aria-label="Close popup"
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Image */}
          {popup.imageUrl && (
            <div className="relative w-full" style={{ paddingTop: "52%" }}>
              <Image
                src={popup.imageUrl}
                alt={popup.title ?? "Announcement"}
                fill
                sizes="448px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          {(popup.title || popup.body || buttons.length > 0) && (
            <div className="px-6 pb-6 pt-4">
              {popup.title && (
                <h2 className="text-[#0B1F3A] font-bold text-xl leading-snug mb-2">{popup.title}</h2>
              )}
              {popup.body && (
                <p className="text-[#6b7280] text-sm leading-relaxed mb-5">{popup.body}</p>
              )}

              {buttons.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {buttons.map((btn, i) =>
                    isExternal(btn.url) ? (
                      <a key={i} href={btn.url} target="_blank" rel="noopener noreferrer" className={btnClass(btn.style)} onClick={dismiss}>
                        {btn.label}
                      </a>
                    ) : (
                      <Link key={i} href={btn.url} className={btnClass(btn.style)} onClick={dismiss}>
                        {btn.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
