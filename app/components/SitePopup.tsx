"use client";

import { useEffect, useState } from "react";
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
  imageFit: string;
  buttons: string | null;
  active: boolean;
  showOnce: boolean;
  delaySeconds: number;
}

function parseButtons(raw: string | null): PopupButton[] {
  if (!raw) return [];
  try { return JSON.parse(raw) as PopupButton[]; } catch { return []; }
}

const STORAGE_PREFIX = "kmc_popup_seen_";

function isExternal(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

function BtnEl({
  btn,
  onClose,
}: {
  btn: PopupButton;
  onClose: () => void;
}) {
  const base =
    btn.style === "primary"
      ? "flex-1 min-w-[120px] px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#0B1F3A] font-bold text-sm rounded-xl transition-all shadow-sm hover:shadow-md text-center"
      : btn.style === "secondary"
      ? "flex-1 min-w-[120px] px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#162d50] text-white font-bold text-sm rounded-xl transition-all shadow-sm text-center"
      : "flex-1 min-w-[120px] px-5 py-2.5 border-2 border-[#0B1F3A]/30 hover:border-[#0B1F3A] text-[#0B1F3A] font-bold text-sm rounded-xl transition-all text-center";

  if (isExternal(btn.url)) {
    return (
      <a href={btn.url} target="_blank" rel="noopener noreferrer" className={base} onClick={onClose}>
        {btn.label}
      </a>
    );
  }
  return (
    <Link href={btn.url} className={base} onClick={onClose}>
      {btn.label}
    </Link>
  );
}

export function SitePopup() {
  const [popup, setPopup] = useState<ActivePopup | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    fetch("/api/popups")
      .then((r) => r.json())
      .then(({ data }: { data: ActivePopup | null }) => {
        if (!data) return;
        if (data.showOnce && localStorage.getItem(`${STORAGE_PREFIX}${data.id}`)) return;
        setPopup(data);
        timer = setTimeout(() => setVisible(true), data.delaySeconds * 1000);
      })
      .catch(() => {});

    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    setTimeout(() => setPopup(null), 300);
    if (popup?.showOnce) {
      localStorage.setItem(`${STORAGE_PREFIX}${popup.id}`, "1");
    }
  }

  if (!popup) return null;

  const buttons = parseButtons(popup.buttons);
  const hasImage = !!popup.imageUrl;
  const hasText = !!(popup.title || popup.body);
  const hasButtons = buttons.length > 0;

  // image-only popup → wider, no padding below image
  const imageOnly = hasImage && !hasText && !hasButtons;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-black/55 backdrop-blur-[3px] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        className={`fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none transition-all duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`relative pointer-events-auto bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.25)] overflow-hidden w-full transition-all duration-300 ${visible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"} ${imageOnly ? "max-w-lg" : "max-w-md"}`}
        >
          {/* ── Close button ──────────────────────────────────────────────── */}
          <button
            onClick={dismiss}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* ── Image ─────────────────────────────────────────────────────── */}
          {hasImage && (
            <div
              className={`w-full overflow-hidden ${popup.imageFit === "cover" ? "relative" : ""}`}
              style={popup.imageFit === "cover" ? { paddingTop: "56.25%" } : undefined}
            >
              {popup.imageFit === "cover" ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={popup.imageUrl!}
                  alt={popup.title ?? "Announcement"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                /* Natural — show full image, no cropping */
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={popup.imageUrl!}
                  alt={popup.title ?? "Announcement"}
                  className="w-full h-auto block"
                  style={{ maxHeight: "70vh", objectFit: "contain" }}
                />
              )}
            </div>
          )}

          {/* ── Text + Buttons ────────────────────────────────────────────── */}
          {(hasText || hasButtons) && (
            <div className={`px-6 pb-6 ${hasImage ? "pt-5" : "pt-8"}`}>
              {/* Decorative top bar if no image */}
              {!hasImage && (
                <div className="w-10 h-1 bg-amber-400 rounded-full mb-5" />
              )}

              {popup.title && (
                <h2 className="text-[#0B1F3A] font-bold text-xl leading-snug mb-2">
                  {popup.title}
                </h2>
              )}
              {popup.body && (
                <p className="text-[#6b7280] text-sm leading-relaxed mb-5">
                  {popup.body}
                </p>
              )}

              {hasButtons && (
                <div className={`flex flex-wrap gap-3 ${!hasText ? "pt-1" : ""}`}>
                  {buttons.map((btn, i) => (
                    <BtnEl key={i} btn={btn} onClose={dismiss} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Image-only: close text link at bottom */}
          {imageOnly && (
            <div className="pb-4 text-center">
              <button onClick={dismiss} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
