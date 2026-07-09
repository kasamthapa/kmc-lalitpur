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
  whatsapp: "+977 97684 48360",
  whatsappNumber: "9779768448360",
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

  campuses: [
    {
      name: "KMC Lalitpur",
      footerHeading: "Contact Us (Lalitpur)",
      label: "Kathmandu Model Secondary School - Lalitpur",
      location: "Imadol, Balkumari, Lalitpur, Nepal",
      phone: "+977-01-5201331, 5201334",
      phoneHref: "tel:+97715201331",
      email: "info@kmclalitpur.edu.np",
      website: "https://kmclalitpur.edu.np",
      mapsUrl: "https://maps.google.com/?q=Balkumari,Lalitpur,Nepal",
    },
    {
      name: "KMC Bagbazar",
      footerHeading: "Contact Us (Kathmandu)",
      label: "Kathmandu Model Secondary School - Kathmandu",
      location: "Bagbazar, Kathmandu, Nepal",
      phone: "+977-01-5342121, 015342015",
      phoneHref: "tel:+97715342121",
      email: "info@ktmmodelcollege.edu.np",
      website: "https://ktmmodelcollege.edu.np",
      mapsUrl: "https://maps.google.com/?q=Bagbazar,Kathmandu,Nepal",
    },
  ],

  geo: {
    latitude: "27.6583",
    longitude: "85.3222",
  },

  hours: {
    display: [
      { days: "Sunday – Friday", time: "8 AM – 5 PM" },
    ],
    schema: ["Su-Fr 08:00-17:00"],
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

  awards: [
    "Best +2 Education Award 2075 — Ministry of Education, Nepal",
    "Excellence Award (Letter of Appreciation) — Ministry of Education, Nepal (2074 & 2075 B.S.)",
    "Top-Ranked Among 4,000+ Plus Two Schools Nationwide",
  ],
} as const;
