"use client";

import { usePathname } from "next/navigation";
import { WhatsAppFloat } from "./whatsapp";
import { StudyMaterialsFloat } from "./study-materials";

export function FloatingWidgets() {
  const pathname = usePathname();
  // Hide on all admin routes
  if (pathname.startsWith("/admin")) return null;
  return (
    <>
      {/* Study materials button — sits directly above WhatsApp */}
      <div className="fixed bottom-[88px] right-6 z-50">
        <StudyMaterialsFloat />
      </div>
      <WhatsAppFloat />
      {/* <Chatbot /> — temporarily disabled */}
    </>
  );
}
