// ─── Single source of truth for all site-wide constants ──────────────────────
// Import from here instead of hardcoding values in components.

export const SITE_CONFIG = {
  url: "https://kmclalitpur.edu.np",
  name: "Kathmandu Model Secondary School - KMC Lalitpur",
  shortName: "KMC Lalitpur",
  phone: "+977-1-5201331",
  phoneHref: "tel:+97715201331",
  phoneAlt: "+977-1-5201334",
  phoneAltHref: "tel:+97715201334",
  email: "info@kmclalitpur.edu.np",
  whatsapp: "+977 98511 38595",
  whatsappNumber: "9779851138595",
  emisUrl: "https://emis.gov.np",
  foundingYear: "2000",
  studentCount: 2500,

  address: {
    streetAddress: "Imadol, Balkumari",
    addressLocality: "Lalitpur",
    addressRegion: "Bagmati Province",
    postalCode: "44700",
    addressCountry: "NP",
    display: "Imadol, Balkumari, Lalitpur, Nepal",
    mapsUrl: "https://maps.google.com/?q=Balkumari,Lalitpur,Nepal",
  },

  geo: {
    latitude: "27.6667",
    longitude: "85.3167",
  },

  hours: {
    display: [
      { days: "Sunday – Friday", time: "8 AM – 5 PM" },
      { days: "Saturday", time: "10 AM – 3 PM" },
    ],
    schema: ["Mo-Fr 08:00-17:00", "Sa 10:00-15:00"],
    opening: [
      {
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
      {
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
  },

  socials: {
    facebook: "https://www.facebook.com/KMCLalitpur",
    instagram: "https://www.instagram.com/kmclalitpur",
    youtube: "https://www.youtube.com/@kmclalitpur",
    tiktok: "https://www.tiktok.com/@kmclalitpur",
    twitter: "@kmclalitpur",
    parent: "https://ktmmodelcollege.edu.np",
  },

  // Microsoft Forms URLs for mock entrance exams.
  // Leave as empty string until the school provides the real URLs.
  mockTestForms: {
    science: "",
    management: "",
    law: "",
  },

  awards: [
    "Best +2 Education Award 2075 — Ministry of Education, Nepal",
    "Excellence Award (Letter of Appreciation) — Ministry of Education, Nepal (2074 & 2075 B.S.)",
    "Top-Ranked Among 4,000+ Plus Two Schools Nationwide",
  ],
} as const;
