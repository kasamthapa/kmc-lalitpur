"use client";

import { useEffect, useState } from "react";

// JS-driven viewport check rather than a CSS media-query utility class.
// Tailwind's `md:` responsive variants were observed not compiling reliably
// for this route in dev (Turbopack per-route CSS chunking) — this sidesteps
// that entirely for a gate that matters (desktop-only admin access UX).
export function useIsDesktop(breakpoint = 768): boolean | null {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    function check() {
      setIsDesktop(window.innerWidth >= breakpoint);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isDesktop;
}
