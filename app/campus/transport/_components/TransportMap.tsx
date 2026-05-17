"use client";

import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ─── School Location ─────────────────────────────────────────────────────────
const SCHOOL: [number, number] = [27.6583, 85.3222];

// ─── Route Data with Real Coordinates ────────────────────────────────────────
export const routeData = {
  Kathmandu: {
    color: "#1d6fbf",
    label: "Kathmandu Route",
    stops: [
      { name: "Thankot",     pos: [27.6875, 85.2297] as [number, number] },
      { name: "Sitapaila",   pos: [27.7070, 85.2700] as [number, number] },
      { name: "Kalanki",     pos: [27.6942, 85.2839] as [number, number] },
      { name: "Kuleshwor",   pos: [27.6942, 85.3020] as [number, number] },
      { name: "Kirtipur",    pos: [27.6773, 85.2781] as [number, number] },
      { name: "Babarmahal",  pos: [27.6920, 85.3220] as [number, number] },
      { name: "Baneshwor",   pos: [27.6910, 85.3376] as [number, number] },
      { name: "Buddhanagar", pos: [27.6887, 85.3469] as [number, number] },
      { name: "Chabahil",    pos: [27.7154, 85.3469] as [number, number] },
      { name: "Boudha",      pos: [27.7215, 85.3620] as [number, number] },
      { name: "Mulpani",     pos: [27.7100, 85.3897] as [number, number] },
      { name: "Jorpati",     pos: [27.7213, 85.3836] as [number, number] },
      { name: "Sukedhara",   pos: [27.7350, 85.3437] as [number, number] },
      { name: "Pepsicola",   pos: [27.6963, 85.3848] as [number, number] },
    ],
  },
  Bhaktapur: {
    color: "#8b2fc9",
    label: "Bhaktapur Route",
    stops: [
      { name: "Lokanthali",    pos: [27.6780, 85.3617] as [number, number] },
      { name: "Gatthaghar",    pos: [27.6680, 85.3756] as [number, number] },
      { name: "Thimi",         pos: [27.6773, 85.3820] as [number, number] },
      { name: "Madhyapur",     pos: [27.6740, 85.3940] as [number, number] },
      { name: "Bhaktapur",     pos: [27.6710, 85.4298] as [number, number] },
      { name: "Kamalbinayak",  pos: [27.6760, 85.4081] as [number, number] },
      { name: "Suryabinayak",  pos: [27.6520, 85.4157] as [number, number] },
      { name: "Tathali",       pos: [27.6599, 85.3975] as [number, number] },
      { name: "Jagati",        pos: [27.6800, 85.4165] as [number, number] },
      { name: "Balkot",        pos: [27.6640, 85.3726] as [number, number] },
      { name: "Sipadol",       pos: [27.6697, 85.3824] as [number, number] },
      { name: "Katunje",       pos: [27.6469, 85.4063] as [number, number] },
      { name: "Sallaghari",    pos: [27.6880, 85.3883] as [number, number] },
      { name: "Bode",          pos: [27.6899, 85.4003] as [number, number] },
      { name: "Radhe Radhe",   pos: [27.6827, 85.4109] as [number, number] },
      { name: "Changunarayan", pos: [27.7148, 85.4186] as [number, number] },
    ],
  },
  Lalitpur: {
    color: "#1e7d4f",
    label: "Lalitpur Route",
    stops: [
      { name: "Pulchowk",       pos: [27.6844, 85.3106] as [number, number] },
      { name: "Jawalakhel",     pos: [27.6773, 85.3158] as [number, number] },
      { name: "Sanepa",         pos: [27.6830, 85.3009] as [number, number] },
      { name: "Jhamsikhel",     pos: [27.6790, 85.3070] as [number, number] },
      { name: "Kupondole",      pos: [27.6869, 85.3194] as [number, number] },
      { name: "Ekantakuna",     pos: [27.6680, 85.3104] as [number, number] },
      { name: "Bagdol",         pos: [27.6734, 85.3187] as [number, number] },
      { name: "Lagankhel",      pos: [27.6659, 85.3221] as [number, number] },
      { name: "Satdobato",      pos: [27.6549, 85.3280] as [number, number] },
      { name: "Gwarko",         pos: [27.6680, 85.3391] as [number, number] },
      { name: "Nakhu",          pos: [27.6540, 85.2985] as [number, number] },
      { name: "Chobar",         pos: [27.6568, 85.2891] as [number, number] },
      { name: "Mahalaxmisthan", pos: [27.6618, 85.3281] as [number, number] },
      { name: "Imadol",         pos: [27.6583, 85.3374] as [number, number] },
      { name: "Tikathali",      pos: [27.6488, 85.3390] as [number, number] },
      { name: "Thaiba",         pos: [27.6430, 85.3448] as [number, number] },
      { name: "Lubhu",          pos: [27.6381, 85.3510] as [number, number] },
      { name: "Harisiddhi",     pos: [27.6351, 85.3415] as [number, number] },
      { name: "Sunakothi",      pos: [27.6214, 85.3283] as [number, number] },
      { name: "Bungamati",      pos: [27.6259, 85.3040] as [number, number] },
      { name: "Khokana",        pos: [27.6325, 85.2944] as [number, number] },
      { name: "Bhaisepati",     pos: [27.6435, 85.2994] as [number, number] },
      { name: "Tyanglaphat",    pos: [27.6487, 85.3120] as [number, number] },
      { name: "Lamatar",        pos: [27.6223, 85.3580] as [number, number] },
      { name: "Chapagaon",      pos: [27.5986, 85.3327] as [number, number] },
      { name: "Godavari",       pos: [27.5880, 85.3720] as [number, number] },
    ],
  },
};

// School pin icon
const schoolIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:36px;height:36px;border-radius:50% 50% 50% 0;
      background:#C9A84C;border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
      transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
    ">
      <div style="transform:rotate(45deg);font-size:16px;line-height:1;">🏫</div>
    </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -40],
});

export default function TransportMap() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg" style={{ height: 520 }}>
      <MapContainer
        center={[27.68, 85.35]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        {/* CartoDB Positron — clean, minimal, elegant tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Draw each route */}
        {Object.entries(routeData).map(([zone, route]) => {
          const positions = route.stops.map((s) => s.pos);
          // Add school as final destination
          const fullPath = [...positions, SCHOOL];

          return (
            <Polyline
              key={zone}
              positions={fullPath}
              pathOptions={{
                color: route.color,
                weight: 4,
                opacity: 0.85,
                dashArray: undefined,
              }}
            />
          );
        })}

        {/* Draw stop markers */}
        {Object.entries(routeData).map(([zone, route]) =>
          route.stops.map((stop, i) => (
            <CircleMarker
              key={`${zone}-${stop.name}`}
              center={stop.pos}
              radius={i === 0 ? 8 : 6}
              pathOptions={{
                color: "white",
                weight: 2,
                fillColor: route.color,
                fillOpacity: 1,
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -8]}
                opacity={1}
              >
                <div className="text-xs font-semibold px-1">{stop.name}</div>
              </Tooltip>
            </CircleMarker>
          ))
        )}

        {/* School marker */}
        <Marker position={SCHOOL} icon={schoolIcon}>
          <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
            <div className="text-xs font-bold px-1">KMC Balkumari</div>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}
