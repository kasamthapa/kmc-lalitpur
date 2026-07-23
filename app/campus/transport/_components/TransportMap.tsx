"use client";

import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SCHOOL, routeData } from "./transportData";

export { SCHOOL, routeData };

// ─── School Icon ──────────────────────────────────────────────────────────────
const schoolIcon = L.divIcon({
  className: "",
  html: `
    <div style="position:relative;width:46px;height:46px;">
      <div style="
        position:absolute;inset:-6px;border-radius:50%;
        background:rgba(201,168,76,0.3);
        animation:sch-pulse 2.2s ease-out infinite;
      "></div>
      <div style="
        width:46px;height:46px;border-radius:50%;
        background:#F0A03C;border:3px solid #fff;
        box-shadow:0 3px 12px rgba(0,0,0,0.3);
        display:flex;align-items:center;justify-content:center;
        font-size:20px;position:relative;z-index:1;
      ">🏫</div>
    </div>
    <style>
      @keyframes sch-pulse {
        0%  {transform:scale(.8);opacity:.8}
        70% {transform:scale(1.5);opacity:0}
        100%{transform:scale(.8);opacity:0}
      }
    </style>`,
  iconSize:      [46, 46],
  iconAnchor:    [23, 23],
  tooltipAnchor: [0, -28],
});

// ─── Map Component ────────────────────────────────────────────────────────────
export default function TransportMap() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg"
      style={{ height: 560 }}
    >
      <MapContainer
        center={[27.660, 85.345]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {Object.entries(routeData).map(([zone, route]) =>
          route.branches.map((branch, bi) => (
            <Polyline
              key={`${zone}-branch-${bi}`}
              positions={branch}
              pathOptions={{ color: route.color, weight: 3, opacity: 0.75 }}
            />
          ))
        )}

        {Object.entries(routeData).map(([zone, route]) =>
          route.stops.map((stop) => (
            <CircleMarker
              key={`${zone}-${stop.name}`}
              center={stop.pos}
              radius={6}
              pathOptions={{ color: "white", weight: 2, fillColor: route.color, fillOpacity: 1 }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <span className="text-xs font-semibold text-[#1B3E72]">{stop.name}</span>
              </Tooltip>
            </CircleMarker>
          ))
        )}

        <Marker position={SCHOOL} icon={schoolIcon}>
          <Tooltip direction="top" offset={[0, -32]} permanent opacity={1}>
            <span className="text-xs font-bold text-[#1B3E72]">KMC Balkumari</span>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}
