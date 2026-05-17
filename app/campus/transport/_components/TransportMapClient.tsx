"use client";

import dynamic from "next/dynamic";

const TransportMap = dynamic(() => import("./TransportMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg bg-[#f0f4f8] flex items-center justify-center"
      style={{ height: 520 }}
    >
      <div className="text-center text-[#6b7280]">
        <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-medium">Loading map…</p>
      </div>
    </div>
  ),
});

export default function TransportMapClient() {
  return <TransportMap />;
}
