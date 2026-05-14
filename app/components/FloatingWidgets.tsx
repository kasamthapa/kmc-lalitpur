"use client";

import { usePathname } from "next/navigation";
import { WhatsAppFloat } from "./whatsapp";

export function FloatingWidgets() {
  const pathname = usePathname();
  // Hide on all admin routes
  if (pathname.startsWith("/admin")) return null;
  return (
    <>
      <WhatsAppFloat />
      {/* <Chatbot /> — temporarily disabled */}
    </>
  );
}
