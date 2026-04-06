// ─── JSON-LD Schema Components for KMC Lalitpur ──────────────────────────────
// These inject structured data that helps Google, ChatGPT, Perplexity, and
// other AI/search engines understand exactly what KMC Lalitpur is.
//
// Usage:
//   import { SchemaOrg, BreadcrumbSchema, FAQSchema, CourseSchema } from "../components/schema";
//   <SchemaOrg />                          ← on every page via layout
//   <BreadcrumbSchema items={[...]} />     ← on every inner page
//   <FAQSchema items={[...]} />            ← on FAQ page
//   <CourseSchema courses={[...]} />       ← on academics page

// ─── Types ────────────────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CourseItem {
  name: string;
  description: string;
  provider: string;
  url: string;
}

export interface EventItem {
  name: string;
  description: string;
  startDate: string;
  location: string;
  url?: string;
}

// ─── Site constants ───────────────────────────────────────────────────────────
const SITE_URL = "https://kmclalitpur.edu.np";
const SITE_NAME = "Kathmandu Model Secondary School - KMC Lalitpur";
const SITE_PHONE = "+977-1-5918595";
const SITE_EMAIL = "info@kmclalitpur.edu.np";
const SITE_ADDRESS = {
  streetAddress: "Balkumari",
  addressLocality: "Lalitpur",
  addressRegion: "Bagmati Province",
  postalCode: "44700",
  addressCountry: "NP",
};
const SITE_GEO = {
  latitude: "27.6667",
  longitude: "85.3167",
};
const SITE_HOURS = ["Mo-Fr 08:00-17:00", "Sa 10:00-15:00"];

// ─── 1. Global Organization Schema ───────────────────────────────────────────
// Inject this in layout.tsx so it appears on EVERY page.
// Covers: EducationalOrganization, CollegeOrUniversity, LocalBusiness
export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ── Educational Organization ──────────────────────────────────────────
      {
        "@type": ["EducationalOrganization", "CollegeOrUniversity"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: [
          "Kathmandu Model College",
          "Kathmandu Model Secondary School",
          "KMC Lalitpur",
          "KMSS Lalitpur",
          "Kathmandu Model Secondary School Lalitpur",
          "KMC Balkumari",
        ],
        description:
          "Kathmandu Model Secondary School (KMC Lalitpur) is a NEB-affiliated +2 institution located in Balkumari, Lalitpur, Nepal. Established in 2000, KMC offers Science, Management, Humanities, and Law streams with a consistent 100% NEB pass rate.",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
          width: 240,
          height: 64,
        },
        image: `${SITE_URL}/images/campus.png`,
        telephone: SITE_PHONE,
        email: SITE_EMAIL,
        foundingDate: "2000",
        address: {
          "@type": "PostalAddress",
          ...SITE_ADDRESS,
        },
        geo: {
          "@type": "GeoCoordinates",
          ...SITE_GEO,
        },
        openingHours: SITE_HOURS,
        hasMap: "https://maps.google.com/?q=Balkumari,Lalitpur,Nepal",
        sameAs: [
          "https://www.facebook.com/kmcbagbazar",
          "https://www.instagram.com/kmclalitpur",
          "https://www.youtube.com/@kmclalitpur",
          "https://ktmmodelcollege.edu.np",
        ],
        accreditation: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "NEB Affiliation",
            recognizedBy: {
              "@type": "Organization",
              name: "National Examinations Board (NEB), Nepal",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "ISO 9001:2015 Certification",
            recognizedBy: {
              "@type": "Organization",
              name: "International Organization for Standardization",
            },
          },
        ],
        award: [
          "Ministry of Education Excellence Award — Best Campus among 4000+ Schools",
          "Best Campus of 2080 — Government of Nepal, Ministry of Education Science & Technology",
          "NEB Excellence Award — Academic Excellence",
        ],
        numberOfStudents: 2500,
        department: [
          { "@type": "EducationalOrganization", name: "Science Department" },
          { "@type": "EducationalOrganization", name: "Management Department" },
          { "@type": "EducationalOrganization", name: "Humanities Department" },
          { "@type": "EducationalOrganization", name: "Law Department" },
        ],
        parentOrganization: {
          "@type": "Organization",
          name: "KMC Educational Network",
          url: "https://ktmmodelcollege.edu.np",
        },
      },

      // ── Website ───────────────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/news?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },

      // ── Local Business (for Google Maps / Local SEO) ───────────────────
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: SITE_NAME,
        image: `${SITE_URL}/images/campus.png`,
        telephone: SITE_PHONE,
        email: SITE_EMAIL,
        url: SITE_URL,
        address: {
          "@type": "PostalAddress",
          ...SITE_ADDRESS,
        },
        geo: {
          "@type": "GeoCoordinates",
          ...SITE_GEO,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
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
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "15:00",
          },
        ],
        priceRange: "NPR",
        currenciesAccepted: "NPR",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 2. Breadcrumb Schema ─────────────────────────────────────────────────────
// Use on every inner page. Helps Google show breadcrumbs in search results.
// Example: Home > Admissions > Science Stream
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.href}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 3. FAQ Schema ────────────────────────────────────────────────────────────
// Use on the FAQ page. Makes each Q&A eligible for Google's FAQ rich result
// and also helps AI tools cite your answers directly.
export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 4. Course Schema ─────────────────────────────────────────────────────────
// Use on the academics page. Helps Google show your programs in
// education-related searches and AI tools describe your offerings.
export function CourseSchema({ courses }: { courses: CourseItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Academic Programs at KMC Lalitpur",
    description:
      "NEB-affiliated +2 programs offered at Kathmandu Model Secondary School, Balkumari, Lalitpur",
    itemListElement: courses.map((course, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: course.name,
        description: course.description,
        provider: {
          "@type": "EducationalOrganization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        url: `${SITE_URL}${course.url}`,
        educationalLevel: "HighSchool",
        inLanguage: ["en", "ne"],
        locationCreated: {
          "@type": "Place",
          name: "Balkumari, Lalitpur, Nepal",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 5. Event Schema ──────────────────────────────────────────────────────────
// Use on news/events pages for upcoming events.
export function EventSchema({ events }: { events: EventItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((event, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        location: {
          "@type": "Place",
          name: event.location,
          address: {
            "@type": "PostalAddress",
            ...SITE_ADDRESS,
          },
        },
        organizer: {
          "@type": "EducationalOrganization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        ...(event.url ? { url: `${SITE_URL}${event.url}` } : {}),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 6. WebPage Schema ────────────────────────────────────────────────────────
// Use on any page that needs extra context. Good for GEO — AI tools
// read the description and about fields when generating answers.
export function WebPageSchema({
  title,
  description,
  path,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}`,
    url: `${SITE_URL}${path}`,
    name: title,
    description: description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
    ...(dateModified ? { dateModified: dateModified } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
