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
  emisUrl: "https://emis.gov.np",
  foundingYear: "2000",
  studentCount: 2500,

  address: {
    streetAddress: "Balkumari",
    addressLocality: "Lalitpur",
    addressRegion: "Bagmati Province",
    postalCode: "44700",
    addressCountry: "NP",
    display: "Balkumari, Lalitpur, Kathmandu Valley, Nepal",
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
    facebook: "https://www.facebook.com/kmcbagbazar",
    instagram: "https://www.instagram.com/kmclalitpur",
    youtube: "https://www.youtube.com/@kmclalitpur",
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
    "Ministry of Education Excellence Award — Best Campus among 4000+ Schools",
    "Best Campus of 2080 — Government of Nepal, Ministry of Education Science & Technology",
    "NEB Excellence Award — Academic Excellence",
  ],
} as const;
