"use client";

import { usePathname } from "next/navigation";
import { WhatsAppFloat } from "./whatsapp";
import { Chatbot } from "./chatbot";

export function FloatingWidgets() {
  const pathname = usePathname();
  // Hide on all admin routes
  if (pathname.startsWith("/admin")) return null;
  return (
    <>
      <WhatsAppFloat />
      <Chatbot />
    </>
  );
}
