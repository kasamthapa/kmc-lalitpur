# KMC Lalitpur — Complete Project Context

> **READ THIS FIRST IN EVERY NEW SESSION.**
> This is the single source of truth for everything about this project.
> No assumptions. No guessing. Everything is documented here.

---

## TABLE OF CONTENTS

1. [What Is This Project](#1-what-is-this-project)
2. [Repository & File Structure](#2-repository--file-structure)
3. [Tech Stack — Every Package](#3-tech-stack--every-package)
4. [Environment Variables — All of Them](#4-environment-variables--all-of-them)
5. [Database — Prisma 7 + Neon PostgreSQL](#5-database--prisma-7--neon-postgresql)
6. [Authentication — NextAuth v5](#6-authentication--nextauth-v5)
7. [Cloudinary — Image Uploads](#7-cloudinary--image-uploads)
8. [AI Chatbot — Google Gemini 2.0 Flash](#8-ai-chatbot--google-gemini-20-flash)
9. [Site Constants — SITE_CONFIG](#9-site-constants--site_config)
10. [Global Layout & SEO](#10-global-layout--seo)
11. [Public Site — Every Route](#11-public-site--every-route)
12. [Header Navigation Structure](#12-header-navigation-structure)
13. [Admin CMS — Every Page](#13-admin-cms--every-page)
14. [Admin Design Language — Exact Classes](#14-admin-design-language--exact-classes)
15. [All API Routes](#15-all-api-routes)
16. [Shared Utilities (app/lib/)](#16-shared-utilities-applib)
17. [Key Components](#17-key-components)
18. [Public Site Design System](#18-public-site-design-system)
19. [Non-Negotiable Coding Rules](#19-non-negotiable-coding-rules)
20. [npm Scripts](#20-npm-scripts)
21. [Git State & What Is Uncommitted](#21-git-state--what-is-uncommitted)
22. [What Still Needs To Be Done](#22-what-still-needs-to-be-done)
23. [How To Start A New Session](#23-how-to-start-a-new-session)

---

## 1. What Is This Project?

**Kathmandu Model Secondary School (KMC Lalitpur / KMSS)** — the official website for a government-affiliated, NEB (National Examinations Board) accredited +2 school in Balkumari, Lalitpur, Nepal.

### School Facts
| Field | Value |
|---|---|
| Full name | Kathmandu Model Secondary School |
| Short name | KMC Lalitpur / KMSS |
| Live URL | https://kmclalitpur.edu.np |
| Parent institution | https://ktmmodelcollege.edu.np |
| Location | Balkumari, Lalitpur, Kathmandu Valley, Nepal |
| Phone | +977-1-5201331, +977-1-5201334 |
| WhatsApp | +977 98511 38595 |
| Email | info@kmclalitpur.edu.np |
| Principal | Mukunda Kumar Giri |
| Established | 2000 |
| Students | 2,500+ active |
| NEB Pass Rate | 100% every year |
| Certification | ISO 9001:2015 |
| Office Hours | Sun–Fri 8AM–5PM, Sat 10AM–3PM |
| Apply URL | https://ktmmodelcollege.edu.np/apply-to-kmss/ |

### Awards
- Best Campus 2080 — Government of Nepal, Ministry of Education Science & Technology
- Ministry of Education Excellence Award — Best Campus among 4,000+ schools
- NEB Excellence Award — Academic Excellence

### Streams (3 only — **Humanities does NOT exist at KMC**)
| Stream | CGPA Required | Entrance Exam | Careers |
|--------|--------------|---------------|---------|
| Science | 2.8+ (B+ in Science/Maths/OptMaths/English) | Maths 30% + Science 40% + English 20% + GK & IQ 10% = 100 marks, 60 min | MBBS, Engineering, BSc, Pharmacy |
| Management | 2.4+ (C in Maths/English) | Maths 36% + English 36% + Nepali & GK 28% = 75 marks, 60 min | BBA, CA, BBS, Finance |
| Law (est. 2019) | 2.4+ (C in Maths/English) | English 30% + Nepali 30% + Social Studies & GK 40% = 75 marks, 60 min | LLB, Civil Service, Advocacy |

### Scholarships
- **Merit:** SEE (25%) + KMC Entrance (75%), first-come-first-served, valid 3 months
- **Sushil Memorial:** Top 2 from first entrance + 1 Madhesi community student
- **Government School:** Separate entrance test for students from govt schools
- **Need-based:** Income-based financial aid

### Project Objectives
1. Professional, SEO/AEO/GEO-optimized public website
2. Full admin CMS — non-technical school staff must be able to manage it independently
3. AI chatbot for admissions queries (Gemini 2.0 Flash, bilingual EN/NP)
4. Mock test system (via Microsoft Forms embeds — no custom exam engine)
5. Alumni network with self-registration + admin approval flow
6. Contact form saves to DB; admin can view/respond to enquiries

---

## 2. Repository & File Structure

### Paths
```
Main project (dev server):  /Users/kasamthapamagar/Developer/kmc-website/my-app/
Active worktree:            /Users/kasamthapamagar/Developer/kmc-website/my-app/.claude/worktrees/elastic-khorana/
```

### Git Branches
| Branch | Location | Purpose |
|--------|----------|---------|
| `main` | main project | Production-ready code, dev server runs here |
| `claude/elastic-khorana` | `.claude/worktrees/elastic-khorana/` | Active feature work |
| `claude/happy-hermann` | — | Older feature branch |

### ⚠️ CRITICAL: Worktree Sync Rule
The dev server runs from the **main project only**. After editing any file in the worktree, you MUST copy it to the main project:
```bash
cp .claude/worktrees/elastic-khorana/app/admin/_components/Sidebar.tsx \
   app/admin/_components/Sidebar.tsx
```

### Directory Layout
```
my-app/
├── app/
│   ├── layout.tsx                  # Root layout — fonts, metadata, SEO, global widgets
│   ├── globals.css                 # Tailwind v4 import + custom animations + base CSS
│   ├── page.tsx                    # Homepage (use client — JSX in data arrays)
│   ├── error.tsx                   # Styled 500 error page
│   ├── not-found.tsx               # Styled 404 page
│   ├── sitemap.ts                  # Dynamic sitemap (20+ routes)
│   ├── robots.ts                   # Robots.txt (allows AI crawlers)
│   ├── config/
│   │   └── site.ts                 # SITE_CONFIG — single source of truth for all constants
│   ├── lib/
│   │   ├── prisma.ts               # Singleton PrismaClient (PgBouncer adapter)
│   │   ├── api-response.ts         # apiSuccess, apiError, apiUnauthorized, apiNotFound, apiServerError
│   │   ├── admin-auth.ts           # requireAdminAuth() — reusable session check for API routes
│   │   ├── rate-limit.ts           # In-memory rate limiter (Map-based)
│   │   └── validate.ts             # validateEmail, validatePhone, validateLength, hasErrors
│   ├── generated/
│   │   └── prisma/                 # Auto-generated Prisma client (never edit manually)
│   ├── components/                 # Shared public-facing components
│   │   ├── header.tsx              # Two-tier nav with dropdowns, mobile accordion
│   │   ├── footer.tsx              # 5-column footer
│   │   ├── icons.tsx               # Centralized inline SVG icon library
│   │   ├── schema.tsx              # 6 JSON-LD schema components (SEO/AEO/GEO)
│   │   ├── chatbot.tsx             # Floating Gemini AI chat widget
│   │   ├── whatsapp.tsx            # Floating WhatsApp button
│   │   ├── awards-carousel.tsx     # Auto-scrolling awards strip
│   │   ├── notice-marquee.tsx      # Scrolling notice board (fetches from DB)
│   │   └── page-skeleton.tsx       # Generic loading skeleton
│   ├── admin/
│   │   ├── login/page.tsx          # NextAuth sign-in page
│   │   ├── layout.tsx              # Admin root layout
│   │   ├── _components/
│   │   │   ├── Sidebar.tsx         # Admin sidebar nav (grouped, mobile drawer)
│   │   │   ├── ImageUpload.tsx     # Cloudinary unsigned upload widget
│   │   │   └── SessionWrapper.tsx  # NextAuth SessionProvider wrapper
│   │   └── (protected)/
│   │       ├── layout.tsx          # Auth guard → redirects to /admin/login if no session
│   │       ├── loading.tsx         # Loading state
│   │       ├── page.tsx            # Dashboard home
│   │       ├── news/page.tsx
│   │       ├── blog/page.tsx
│   │       ├── notices/page.tsx
│   │       ├── enquiries/page.tsx
│   │       ├── faculty/page.tsx
│   │       ├── alumni/page.tsx
│   │       ├── gallery/page.tsx    # Basic (not polished)
│   │       └── settings/page.tsx   # Basic (not polished)
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── alumni/route.ts         # Public: GET approved, POST register
│   │   ├── notices/route.ts        # Public: GET active notices
│   │   ├── contact/route.ts        # Public: POST → saves to enquiries table
│   │   ├── chatbot/route.ts        # Public: POST → Gemini streaming
│   │   ├── ping/route.ts           # Health check
│   │   └── admin/
│   │       ├── news/route.ts + [id]/route.ts
│   │       ├── blog/route.ts + [id]/route.ts
│   │       ├── notices/route.ts + [id]/route.ts
│   │       ├── enquiries/route.ts + [id]/route.ts
│   │       ├── faculty/route.ts + [id]/route.ts
│   │       ├── alumni/route.ts + [id]/route.ts
│   │       ├── gallery/route.ts + [id]/route.ts
│   │       └── settings/route.ts
│   ├── about/page.tsx
│   ├── academics/page.tsx
│   ├── admissions/page.tsx
│   ├── contact/page.tsx
│   ├── facilities/page.tsx
│   ├── faq/page.tsx
│   ├── mock-test/page.tsx
│   ├── alumni/page.tsx             # Dynamic alumni page with registration modal
│   ├── news/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── _components/NewsClient.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── [slug]/page.tsx
│   │   ├── [slug]/loading.tsx
│   │   └── _components/BlogClient.tsx
│   ├── gallery/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── _components/GalleryClient.tsx
│   └── campus/
│       ├── alumni/page.tsx         # Redirects → /alumni
│       ├── faculty/
│       │   ├── page.tsx
│       │   ├── [slug]/page.tsx
│       │   └── _components/FacultyFilter.tsx
│       ├── hostel/page.tsx
│       ├── transport/page.tsx
│       └── virtual-tour/page.tsx
├── prisma/
│   ├── schema.prisma               # All DB models
│   ├── seed.ts                     # Admin user seeding
│   └── migrations/                 # Migration history
├── auth.ts                         # NextAuth config (Node.js — Credentials + Prisma)
├── auth.config.ts                  # Edge-compatible auth config (JWT, callbacks, pages)
├── next.config.ts                  # Image domains, security headers, redirects
├── tailwind.config.ts              # (minimal — Tailwind v4 is mostly CSS-based)
├── tsconfig.json
├── .env                            # Real secrets (git-ignored)
├── .env.example                    # Template showing required vars
└── KMC_PROJECT_CONTEXT.md          # This file
```

---

## 3. Tech Stack — Every Package

### Runtime Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.2 | Framework (App Router) |
| `react` / `react-dom` | 19.2.4 | UI library |
| `typescript` | ^5 | Language |
| `tailwindcss` | ^4 | Styling (v4 — breaking changes from v3) |
| `@tailwindcss/postcss` | ^4 | PostCSS integration for Tailwind v4 |
| `prisma` | ^7.7.0 | ORM CLI + schema |
| `@prisma/client` | ^7.7.0 | Runtime DB client (generated) |
| `@prisma/adapter-pg` | ^7.7.0 | Prisma adapter for `pg` (PgBouncer pooling) |
| `pg` | ^8.20.0 | PostgreSQL Node.js driver |
| `next-auth` | ^5.0.0-beta.30 | Authentication (v5 beta — App Router native) |
| `bcryptjs` | ^3.0.3 | Password hashing |
| `@google/generative-ai` | ^0.24.1 | Google Gemini AI SDK |
| `@vercel/analytics` | ^2.0.1 | Vercel Analytics |
| `dotenv` | ^17.4.1 | Env loading for scripts |
| `lucide-react` | ^1.7.0 | ⚠️ Installed but DO NOT USE — see coding rules |
| `react-icons` | ^5.6.0 | ⚠️ Installed but DO NOT USE — see coding rules |

### Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `tsx` | ^4.21.0 | Run TypeScript scripts (`prisma/seed.ts`) |
| `@types/bcryptjs` | ^2.4.6 | Types |
| `@types/pg` | ^8.20.0 | Types |
| `eslint` + `eslint-config-next` | ^9 / 16.2.2 | Linting |

### Font
- **Geist** (Google Fonts via `next/font/google`) — loaded in `app/layout.tsx`

---

## 4. Environment Variables — All of Them

```bash
# ── DATABASE ──────────────────────────────────────────────────────────────────

# Neon PostgreSQL — PgBouncer POOLED connection
# Used by: app/lib/prisma.ts (all runtime DB queries in API routes + Server Components)
# Format: postgresql://user:pass@host/dbname?sslmode=require&pgbouncer=true&connect_timeout=15
DATABASE_URL=""

# Neon PostgreSQL — DIRECT connection (no PgBouncer)
# Used by: prisma.config.ts (Prisma CLI migrations only — NOT runtime)
DIRECT_URL=""

# ── AUTH ──────────────────────────────────────────────────────────────────────

# NextAuth JWT signing secret — generate with: openssl rand -base64 32
NEXTAUTH_SECRET=""

# NextAuth base URL
# Local: http://localhost:3000
# Production: https://kmclalitpur.edu.np
NEXTAUTH_URL=""

# Admin user seeding — used only by: npx tsx prisma/seed.ts
# Change password IMMEDIATELY after first login
ADMIN_EMAIL="admin@kmclalitpur.edu.np"
ADMIN_PASSWORD="ChangeMe@123"

# ── AI ────────────────────────────────────────────────────────────────────────

# Google Gemini API key — get free from: https://aistudio.google.com
# Used by: app/api/chatbot/route.ts
GEMINI_API_KEY=""

# ── CLOUDINARY (PUBLIC — safe to expose in browser) ───────────────────────────

# Cloudinary cloud name (from Cloudinary dashboard → Account Details)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""

# Cloudinary upload preset — MUST be set to "Unsigned" in Cloudinary dashboard
# Cloudinary → Settings → Upload → Upload presets → Add unsigned preset
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""
```

---

## 5. Database — Prisma 7 + Neon PostgreSQL

### How Prisma 7 Works (Breaking Change from v5/v6)
In Prisma 7, the `url` and `directUrl` fields are **NOT** in `schema.prisma`. Instead:
- **Runtime:** `DATABASE_URL` is passed via the `pg` adapter in `app/lib/prisma.ts`
- **Migrations:** `DIRECT_URL` is used in `prisma.config.ts` (CLI only)
- The `datasource db` block in `schema.prisma` only has `provider = "postgresql"` — no URL

### Prisma Client Singleton (`app/lib/prisma.ts`)
```ts
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

// Singleton pattern prevents connection pool exhaustion during hot reloads
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
});
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
```

### How to Use in Any File
```ts
import { prisma } from "@/app/lib/prisma";

// Server Component or API Route:
const news = await prisma.news.findMany({ where: { published: true } });
const alumni = await prisma.alumni.findMany({ where: { approved: true } });
```

### All Database Models

#### `News` → table `news`
```prisma
id              String    UUID, PK
title           String
slug            String    UNIQUE
description     String?
content         String?
category        String?
imageUrl        String?   (map: image_url)
published       Boolean   default false
featured        Boolean   default false
metaTitle       String?
metaDescription String?
createdAt       DateTime  default now()
updatedAt       DateTime  @updatedAt
```

#### `BlogPost` → table `blog_posts`
```prisma
id        String    UUID, PK
title     String
slug      String    UNIQUE
excerpt   String?
content   String?
category  String?
imageUrl  String?
author    String?
readTime  String?
published Boolean   default false
featured  Boolean   default false
createdAt DateTime
updatedAt DateTime  @updatedAt
```

#### `Gallery` → table `gallery`
```prisma
id           String    UUID, PK
src          String    (Cloudinary URL)
alt          String
category     String?
caption      String?
displayOrder Int       default 0
createdAt    DateTime
```

#### `Enquiry` → table `enquiries`
```prisma
id        String    UUID, PK
name      String
email     String
phone     String?
subject   String?
stream    String?   (Science | Management | Law | General)
message   String
read      Boolean   default false
responded Boolean   default false
createdAt DateTime
```

#### `Notice` → table `notices`
```prisma
id           String     UUID, PK
text         String
active       Boolean    default true
displayOrder Int        default 0
startDate    DateTime?  (Date only)
endDate      DateTime?  (Date only)
createdAt    DateTime
```

#### `Faculty` → table `faculty`
```prisma
id           String    UUID, PK
name         String
slug         String    UNIQUE
title        String    (e.g. "Head of Science Department")
dept         String    (Science | Management | Law | Administration)
qualification String
experience   String    (e.g. "12 years")
subjects     String?   (comma-separated)
email        String?
bio          String?
achievements String?   (newline-separated list)
imageUrl     String?
active       Boolean   default true
displayOrder Int       default 0
createdAt    DateTime
updatedAt    DateTime  @updatedAt
```

#### `Alumni` → table `alumni`
```prisma
id           String    UUID, PK
name         String
gradYear     String    (e.g. "2078 B.S.")
program      String    (Science | Management | Law)
currentRole  String?
company      String?
location     String?
email        String?
phone        String?
bio          String?
imageUrl     String?
linkedIn     String?
approved     Boolean   default false  ← admin must approve before publicly visible
featured     Boolean   default false
displayOrder Int       default 0
createdAt    DateTime
updatedAt    DateTime  @updatedAt
```

#### `AdminUser` → table `admin_users`
```prisma
id           String    UUID, PK
email        String    UNIQUE
name         String?
passwordHash String
role         String    default "editor"
createdAt    DateTime
```

### Alumni Approval Flow (Important)
1. Public user registers at `/alumni` → POST `/api/alumni` → `approved: false` → NOT shown publicly
2. Admin goes to `/admin/alumni` → sees "Pending" badge → clicks "Approve"
3. PATCH `/api/admin/alumni/[id]` with `{ approved: true }` → alumni now shows publicly

### DB Commands
```bash
npm run db:generate   # Regenerate Prisma client after schema.prisma changes
npm run db:push       # Push schema changes to DB (no migration file — use for dev)
npm run db:migrate    # Create migration file + apply (use for production changes)
npm run db:studio     # Open Prisma Studio GUI at localhost:5555
npm run db:seed       # Seed admin user (creates AdminUser from ADMIN_EMAIL/ADMIN_PASSWORD)
```

---

## 6. Authentication — NextAuth v5

### Architecture
- **Two config files** (required by NextAuth v5 for Edge Runtime compatibility):
  - `auth.config.ts` — Edge-safe config: JWT strategy, callbacks, page redirects. No Node.js modules.
  - `auth.ts` — Full config: spreads `authConfig` + adds Credentials provider (uses Prisma, bcrypt)
- **Strategy:** JWT (stateless, no DB sessions table)
- **Session shape:** `{ user: { id, email, name, role } }`

### How Auth Works
```ts
// auth.ts — Credentials provider checks email+password against AdminUser table
const user = await prisma.adminUser.findUnique({ where: { email } });
const match = await bcrypt.compare(password, user.passwordHash);
// → returns { id, email, name, role } on success

// auth.config.ts — JWT callback stores role in token
// auth.config.ts — authorized() callback: 
//   - logged in + hitting /admin/login → redirect to /admin dashboard
//   - not logged in + any /admin/* → NextAuth redirects to /admin/login
```

### Protecting Routes
**Page route (Server Component):**
```ts
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const session = await auth();
if (!session?.user) redirect("/admin/login");
```

**API route:**
```ts
import { requireAdminAuth } from "@/app/lib/admin-auth";
const { session, response } = await requireAdminAuth();
if (response) return response; // returns 401 if not authenticated
```

---

## 7. Cloudinary — Image Uploads

### Setup
- **Unsigned uploads** — no server-side signing, no API secrets in browser
- The upload preset in Cloudinary dashboard must be set to **"Unsigned"**
- Allowed remote pattern in `next.config.ts`: `res.cloudinary.com`

### Upload Component (`app/admin/_components/ImageUpload.tsx`)
Used in News and Blog admin pages. Wraps the upload logic.

### Direct Upload (Alumni, Faculty admin pages)
These pages do uploads inline with their own `uploadToCloudinary()` function:
```ts
async function uploadToCloudinary(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
  fd.append("folder", "kmc-alumni"); // or "kmc-faculty"
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: fd }
  );
  return (await res.json()).secure_url;
}
```

### Folder Structure
| Folder | Used by |
|--------|---------|
| `kmc/news` | News admin (via ImageUpload component) |
| `kmc/blog` | Blog admin (via ImageUpload component) |
| `kmc-faculty` | Faculty admin (inline upload) |
| `kmc-alumni` | Alumni admin + public alumni registration |

---

## 8. AI Chatbot — Google Gemini 2.0 Flash

### How It Works
- **Model:** `gemini-2.0-flash`
- **API route:** `POST /api/chatbot` → streams response via `ReadableStream`
- **Frontend:** `app/components/chatbot.tsx` — floating button, chat drawer, streaming text
- **Rate limit:** 20 requests per IP per hour (in-memory, resets on server restart)
- **Language:** Responds in whatever language the user writes in (EN or NP)

### System Prompt Summary (in `app/api/chatbot/route.ts`)
The system prompt contains:
- School identity, location, principal name, contact info
- All 3 streams with CGPA requirements and entrance exam details
- Scholarships (Merit, Sushil Memorial, Govt School, Need-based)
- Facilities list (labs, library 10K+ books, sports complex, hostel, transport, Wi-Fi, auditorium 200+ seats)
- Mock test info (Microsoft Forms, results immediate)
- Rules: keep answers under 150 words, never make up facts, direct to school for urgent queries

### Rate Limiting (`app/lib/rate-limit.ts`)
```ts
// In-memory Map — resets on server restart (acceptable for this use case)
rateLimit(`chatbot:${ip}`, 20, 3600)  // 20 req/hour
rateLimit(`contact:${ip}`, 5, 600)    // 5 req/10min (contact form)
```

---

## 9. Site Constants — SITE_CONFIG

**File:** `app/config/site.ts`

**NEVER hardcode** contact details, social URLs, or school facts anywhere in the codebase. Always import from SITE_CONFIG.

```ts
import { SITE_CONFIG } from "@/app/config/site";

SITE_CONFIG.url              // "https://kmclalitpur.edu.np"
SITE_CONFIG.name             // "Kathmandu Model Secondary School - KMC Lalitpur"
SITE_CONFIG.shortName        // "KMC Lalitpur"
SITE_CONFIG.phone            // "+977-1-5918595"
SITE_CONFIG.phoneHref        // "tel:+97715918595"
SITE_CONFIG.email            // "info@kmclalitpur.edu.np"
SITE_CONFIG.foundingYear     // "2000"
SITE_CONFIG.studentCount     // 2500

SITE_CONFIG.address.display  // "Balkumari, Lalitpur, Kathmandu Valley, Nepal"
SITE_CONFIG.address.mapsUrl  // Google Maps link
SITE_CONFIG.geo.latitude     // "27.6667"
SITE_CONFIG.geo.longitude    // "85.3167"

SITE_CONFIG.socials.facebook   // "https://www.facebook.com/kmcbagbazar"
SITE_CONFIG.socials.instagram  // "https://www.instagram.com/kmclalitpur"
SITE_CONFIG.socials.youtube    // "https://www.youtube.com/@kmclalitpur"
SITE_CONFIG.socials.twitter    // "@kmclalitpur"
SITE_CONFIG.socials.parent     // "https://ktmmodelcollege.edu.np"

SITE_CONFIG.mockTestForms.science     // "" (empty until school provides URL)
SITE_CONFIG.mockTestForms.management  // ""
SITE_CONFIG.mockTestForms.law         // ""

SITE_CONFIG.awards  // Array of 3 award strings
SITE_CONFIG.hours.display   // Array: [{ days, time }, ...]
SITE_CONFIG.hours.schema    // Array: ["Mo-Fr 08:00-17:00", "Sa 10:00-15:00"]
```

---

## 10. Global Layout & SEO

### `app/layout.tsx`
- **Font:** Geist (Google Fonts via `next/font/google`)
- **Theme color:** `#0B1F3A` (dark navy)
- **Global metadata:** title template, OG image, Twitter card, robots, keywords, canonical URL
- **Schema:** `<SchemaOrg />` in `<head>` — appears on EVERY page automatically
- **Global widgets (in `<body>`):** `<WhatsAppFloat />`, `<Chatbot />`, `<Analytics />`
- **OG Image:** `/images/og-image.png` (1200×630) — **needs to be created**

### Schema Components (`app/components/schema.tsx`)
6 exported components for structured data (JSON-LD):
| Component | Use on |
|-----------|--------|
| `SchemaOrg` | Every page (via root layout) |
| `BreadcrumbSchema` | Every inner page hero section |
| `FAQSchema` | `/faq` page |
| `CourseSchema` | `/academics` page |
| `EventSchema` | News/event pages |
| `ArticleSchema` | Blog post pages |

### CSS (`app/globals.css`)
```css
@import "tailwindcss";  /* Tailwind v4 */

/* Custom animations: */
@keyframes fadeSlideIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; } }
@keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }

/* Focus ring: 2px solid #f59e0b (amber) */
/* Cursor: pointer on all interactive elements */
/* -webkit-tap-highlight-color: transparent */
```

### Security Headers (`next.config.ts`)
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Cache-Control: public, max-age=31536000, immutable  (for /images/*)
```

---

## 11. Public Site — Every Route

| Route | File | Status | Notes |
|-------|------|--------|-------|
| `/` | `app/page.tsx` | ✅ Done | `"use client"` — JSX in data arrays |
| `/about` | `app/about/page.tsx` | ✅ Done | Story, mission, principal |
| `/academics` | `app/academics/page.tsx` | ✅ Done | All 3 streams — NO Humanities |
| `/admissions` | `app/admissions/page.tsx` | ✅ Done | Tabs, scholarships, timeline, FAQ banner |
| `/contact` | `app/contact/page.tsx` | ✅ Done | Form → POST `/api/contact`, map, WhatsApp |
| `/facilities` | `app/facilities/page.tsx` | ✅ Done | Main + additional facilities |
| `/faq` | `app/faq/page.tsx` | ✅ Done | FAQSchema for AEO/AI search |
| `/mock-test` | `app/mock-test/page.tsx` | ✅ Done | Microsoft Forms embeds (Science/Mgmt/Law) |
| `/news` | `app/news/page.tsx` | ✅ Done | DB-connected, `NewsClient` handles filter |
| `/blog` | `app/blog/page.tsx` | ✅ Done | DB-connected, `BlogClient`, category filter |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | ✅ Done | Full post, ArticleSchema |
| `/gallery` | `app/gallery/page.tsx` | ✅ Done | `GalleryClient`, category filter |
| `/alumni` | `app/alumni/page.tsx` | ✅ Done | Fully dynamic — see below |
| `/campus/alumni` | `app/campus/alumni/page.tsx` | ✅ Done | `redirect("/alumni")` |
| `/campus/faculty` | `app/campus/faculty/page.tsx` | ✅ Done | DB-connected, dept filter |
| `/campus/faculty/[slug]` | `app/campus/faculty/[slug]/page.tsx` | ✅ Done | Individual profile |
| `/campus/hostel` | `app/campus/hostel/page.tsx` | ✅ Done | |
| `/campus/transport` | `app/campus/transport/page.tsx` | ✅ Done | |
| `/campus/virtual-tour` | `app/campus/virtual-tour/page.tsx` | ✅ Done | |

### `/alumni` Page — Full Feature Breakdown
This is a complex page (`"use client"`) that does everything:
- **Hero section:** breadcrumb, heading, "Register" + "View Alumni" CTA buttons
- **Stats bar:** 2,000+ Graduates · 25+ Years of Excellence · 20+ Countries
- **Success banner:** shown after successful registration
- **Program filter tabs:** All / Science / Management / Law
- **Alumni grid:** fetches from `GET /api/alumni` (approved only), renders cards with photo/initials, name, role, company, location, LinkedIn
- **Loading skeletons:** while fetching
- **Empty state:** if no alumni found for filter
- **Bottom CTA:** "Are you a KMC alumnus? Register now"
- **Registration modal:** full form with Cloudinary photo upload, all fields, submits to `POST /api/alumni` with `approved: false`
- Program colors: Science `#1a4a7a`, Management `#2d6a4f`, Law `#c75000`

---

## 12. Header Navigation Structure

From `app/components/header.tsx`:

```
Home (/)
About ▾
  → Our Story (/about)
  → Mission & Vision (/about#mission)
  → Principal's Message (/about#principal)
  → Alumni (/alumni)
Campus ▾
  → Facilities (/facilities)
  → Faculty (/campus/faculty)
  → Virtual Tour (/campus/virtual-tour)
  → Hostel (/campus/hostel)
  → Transport (/campus/transport)
Academics ▾
  → Science Stream (/academics#science)
  → Management Stream (/academics#management)
  → Law Stream (/academics#law)
Admissions (/admissions)
Media ▾
  → News & Events (/news)
  → Blog (/blog)
  → Gallery (/gallery)
FAQ (/faq)
```

Top bar: Phone number, Email, Admin Login icon (→ `/admin`)
Mobile: Accordion-style menu

---

## 13. Admin CMS — Every Page

All pages at `/admin/*`. Protected by NextAuth session (JWT). Dark theme throughout.

### `/admin` — Dashboard Home
- 5 stat cards: Total News, Blog Posts, Faculty (active), Alumni, Pending Alumni
- Pending Alumni badge shows red count in quick actions
- Recent Enquiries feed: avatar initials, name, stream, time, read status
- Quick Actions list with pending counts
- Server component with `export const revalidate = 30`

### `/admin/news`
- Full list with thumbnail, title, slug, author, date, featured badge
- 4-row loading skeleton
- Modal: create/edit form (title, slug, category, description, content, imageUrl via ImageUpload, published, featured)
- Delete confirmation modal
- Success toast (create/update/delete)
- Toggle published inline

### `/admin/blog`
- Full list with thumbnail, title, slug, category, author, published status
- 4-row loading skeleton
- Modal: create/edit form (title, slug, excerpt, content, category, author, readTime, imageUrl via ImageUpload, published, featured)
- Delete confirmation modal
- Success toast
- Toggle published inline

### `/admin/notices`
- List of notices with active/inactive status, date range, display order
- 3-row loading skeleton
- Modal: create/edit (text, active, displayOrder, startDate, endDate)
- Delete confirmation modal
- Success toast

### `/admin/enquiries`
- Table: name, email, stream, date, read/responded status
- Expandable rows: full message, mailto link, mark read/responded buttons
- Stream filter pills (All / Science / Management / Law / General)
- CSV export (date-stamped filename)
- 5-row loading skeleton

### `/admin/faculty`
- 6-card grid
- 6-card loading skeleton
- Modal: full form (name, title, dept, qualification, experience, subjects, email, bio, achievements, photo upload, displayOrder, active)
- Delete confirmation modal with name + dept preview
- Success toast
- Edit/delete buttons on each card
- Department filter pills

### `/admin/alumni`
- 6-card grid with program color bar/initials
- 6-card loading skeleton
- Filter: status (All/Pending/Approved) + program (All/Science/Management/Law)
- Pending badge count on header and filter pill
- Modal: full form (name, gradYear, program, currentRole, company, location, email, phone, bio, photo, linkedIn, displayOrder, approved, featured)
- Delete confirmation modal
- Approve/Unapprove button per card
- Success toast

### `/admin/gallery`
- ⚠️ Exists but basic — not yet polished

### `/admin/settings`
- ⚠️ Exists but basic — not yet polished

---

## 14. Admin Design Language — Exact Classes

**This is fixed. Do not deviate.**

```
Page wrapper:        p-6 max-w-5xl mx-auto  (or max-w-6xl for wider pages)
Page title:          text-white text-xl font-bold
Page subtitle:       text-gray-600 text-sm mt-0.5
Section label:       text-gray-600 text-[10px] font-bold uppercase tracking-widest

Card container:      bg-gray-900 border border-white/[0.06] rounded-xl
Card hover:          hover:border-white/[0.1] transition-colors

Input:               w-full bg-gray-800 border border-white/[0.08] rounded-lg px-3 py-2.5
                     text-white text-sm placeholder-gray-600
                     focus:outline-none focus:border-amber-400/70 transition-colors
Label:               block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5
Select:              Same as input class above
Textarea:            Same as input class + resize-none (or resize-y for content)
Checkbox:            w-4 h-4 rounded accent-amber-400

Primary button:      px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold
                     rounded-lg transition-colors
Secondary button:    px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300
                     text-sm font-semibold rounded-lg transition-colors
Danger button:       px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400
                     text-sm font-semibold rounded-lg transition-colors

Modal backdrop:      fixed inset-0 z-50 bg-black/80 flex items-start justify-center
                     p-4 overflow-y-auto        ← for form modals
                     fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 ← delete confirms
Modal container:     bg-gray-900 border border-white/[0.08] rounded-2xl w-full max-w-2xl my-8 shadow-2xl
Modal header:        flex items-center justify-between px-6 py-4 border-b border-white/[0.06]
Modal title:         text-white font-bold text-sm
Modal close btn:     text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/[0.06]
Modal body:          p-6 space-y-4
Error in modal:      bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3

Delete modal:        bg-gray-900 border border-white/[0.08] rounded-2xl p-6 w-full max-w-md
Delete icon bg:      w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center
Delete icon:         w-4 h-4 text-red-400
Delete title:        text-white font-bold text-sm
Delete subtitle:     text-gray-600 text-xs
Preview box:         bg-gray-800 rounded-lg px-3 py-2.5 mb-5 (shows item being deleted)

Toast:               fixed top-4 right-4 z-[60]
                     bg-green-900 border border-green-700 text-green-300
                     text-sm font-medium px-4 py-3 rounded-xl shadow-lg
                     flex items-center gap-2
                     Auto-dismiss: setTimeout(() => setToast(""), 3000)

Loading skeleton:    animate-pulse with bg-gray-800 placeholder shapes
                     Card skeleton: bg-gray-900 border border-white/[0.06] rounded-xl overflow-hidden
                     Text line:     h-4 bg-gray-800 rounded w-2/3  (vary width)
                     Subtext line:  h-3 bg-gray-800 rounded w-1/2

Active nav item:     border-l-2 border-amber-400 bg-amber-400/[0.12] text-amber-300 pl-[6px]
Inactive nav item:   border-l-2 border-transparent text-gray-500 hover:bg-white/[0.04]
                     hover:text-gray-300 pl-[6px]
Nav item size:       text-[12.5px] font-medium
Nav section label:   text-[10px] uppercase tracking-wider text-gray-700 font-bold

Filter pills:        bg-white/[0.06] border border-white/[0.06] text-gray-400
                     hover:bg-white/[0.1] hover:text-gray-200
                     px-3 py-1.5 rounded-lg text-xs font-semibold
Active filter:       bg-amber-400 text-gray-900

Pending badge:       bg-amber-400/15 text-amber-400 border border-amber-400/20
                     text-xs font-bold px-2.5 py-1 rounded-full

Upload zone:         border-2 border-dashed border-white/[0.08] rounded-xl p-4
                     hover:border-amber-400/50 hover:bg-white/[0.02] cursor-pointer
Upload zone active:  border-amber-400/50 bg-amber-400/5 cursor-wait

Program colors (Science/Management/Law):
  Science:    #1a4a7a  (dark blue)
  Management: #2d6a4f  (dark green)
  Law:        #c75000  (burnt orange)
  Admin:      #374151  (gray)
```

---

## 15. All API Routes

### Public Routes (no auth required)
| Route | Method | Purpose |
|-------|--------|---------|
| `GET /api/alumni` | GET | Returns all approved alumni, ordered by displayOrder + createdAt |
| `POST /api/alumni` | POST | Register new alumni — creates with `approved: false` |
| `GET /api/notices` | GET | Returns all active notices for the notice marquee |
| `POST /api/contact` | POST | Saves contact form to `enquiries` table (rate limit: 5/10min) |
| `POST /api/chatbot` | POST | Streaming Gemini AI response (rate limit: 20/hour) |
| `GET /api/ping` | GET | Health check |
| `/api/auth/[...nextauth]` | * | NextAuth handlers |

### Admin Routes (all require session — `requireAdminAuth()`)
| Route | Methods | Purpose |
|-------|---------|---------|
| `/api/admin/news` | GET, POST | List all / create news article |
| `/api/admin/news/[id]` | PATCH, DELETE | Update / delete news |
| `/api/admin/blog` | GET, POST | List all / create blog post |
| `/api/admin/blog/[id]` | GET, PATCH, DELETE | Get full detail / update / delete |
| `/api/admin/notices` | GET, POST | List all / create notice |
| `/api/admin/notices/[id]` | PATCH, DELETE | Update / delete |
| `/api/admin/enquiries` | GET | List all enquiries (no CREATE — submitted via public contact form) |
| `/api/admin/enquiries/[id]` | PATCH | Mark read / responded |
| `/api/admin/faculty` | GET, POST | List all / create faculty member |
| `/api/admin/faculty/[id]` | PATCH, DELETE | Update / delete |
| `/api/admin/alumni` | GET, POST | List all alumni (incl. pending) / create |
| `/api/admin/alumni/[id]` | GET, PATCH, DELETE | Get / update (approve) / delete |
| `/api/admin/gallery` | GET, POST | List / add gallery image |
| `/api/admin/gallery/[id]` | PATCH, DELETE | Update / delete |
| `/api/admin/settings` | GET, PATCH | Site settings |

### Standard API Response Format
```ts
// Success:
{ success: true, data: T }

// Error:
{ success: false, message: string, errors?: Record<string, string> }
```

### API Helpers (`app/lib/api-response.ts`)
```ts
apiSuccess(data, status=200)      // { success: true, data }
apiError(msg, errors?, status=400) // { success: false, message, errors }
apiUnauthorized(msg?)              // 401
apiNotFound(msg?)                  // 404
apiServerError(error, context?)    // 500 (logs error to console)
```

---

## 16. Shared Utilities (`app/lib/`)

### `prisma.ts`
Singleton PrismaClient. Import: `import { prisma } from "@/app/lib/prisma"`

### `api-response.ts`
Standard response helpers. Import: `import { apiSuccess, apiError, ... } from "@/app/lib/api-response"`

### `admin-auth.ts`
```ts
// Use at the top of every admin API route handler:
const { session, response } = await requireAdminAuth();
if (response) return response; // 401 if not logged in
// session.user.email, session.user.role now available
```

### `rate-limit.ts`
```ts
// In-memory Map — resets on server restart
const { success, remaining } = rateLimit(identifier: string, limit: number, windowSeconds: number);
if (!success) return apiError("Too many requests", {}, 429);
```

### `validate.ts`
```ts
validateEmail(email): boolean           // regex check
validatePhone(phone): boolean           // 7-20 chars, digits/spaces/dashes/parens
validateLength(value, min, max): boolean
hasErrors(errors: ValidationErrors): boolean
```

---

## 17. Key Components

### `app/components/header.tsx`
- `"use client"` — uses useState for mobile menu + dropdowns
- Two-tier: top bar (phone, email, admin link) + main nav
- Dropdowns on hover (desktop) / accordion on tap (mobile)
- Imports icons from `icons.tsx`: `IconMenu, IconX, IconChevron, IconArrow, IconLock, IconPhone`
- Uses `SITE_CONFIG` for contact details
- Fixed position, `z-50`, `#0B1F3A` background

### `app/components/footer.tsx`
- 5-column layout: School info, Academics, Campus, Media, Contact
- Uses `SITE_CONFIG` for all links and contact details

### `app/components/icons.tsx`
- **The ONLY place to define icons** for the public site
- All inline SVGs — exports: `IconMenu, IconX, IconChevron, IconArrow, IconPhone, IconMail, IconMapPin, IconClock, IconUsers, IconAward, IconGlobe, IconLock, IconChevronRight, IconWhatsApp` (and more)
- `"use client"` not needed (pure SVG, no hooks)

### `app/components/schema.tsx`
- `SchemaOrg` — EducationalOrganization + CollegeOrUniversity + LocalBusiness + WebSite JSON-LD. In root layout → on every page.
- `BreadcrumbSchema({ items: BreadcrumbItem[] })` — use in hero section of every inner page
- `FAQSchema({ items: FAQItem[] })` — on `/faq`
- `CourseSchema({ courses: CourseItem[] })` — on `/academics`
- `EventSchema({ events: EventItem[] })` — on news/events
- `ArticleSchema` — on `/blog/[slug]`

### `app/components/chatbot.tsx`
- `"use client"` — floating chat button, slide-up drawer
- Sends messages to `POST /api/chatbot`, streams response
- Shows typing indicator during stream

### `app/components/notice-marquee.tsx`
- Fetches active notices from `GET /api/notices`
- CSS `marquee` animation (defined in `globals.css`)
- Shown on homepage

### `app/admin/_components/Sidebar.tsx`
- `"use client"` — uses `usePathname` for active detection, `useState` for mobile
- 3 groups: Content (Dashboard, News, Blog, Gallery, Notices), People (Faculty, Alumni, Enquiries), System (Settings)
- Brand: amber graduation cap icon + "KMC Admin" / "Content Management"
- User: gradient avatar (amber) + name
- Desktop: `w-52 bg-gray-950 border-r border-white/[0.05]`
- Mobile: backdrop-blur overlay drawer with hamburger trigger
- Active detection: exact match for `/admin`, `startsWith` for all others

### `app/admin/_components/ImageUpload.tsx`
- Cloudinary unsigned upload with preview, loading state, remove button
- Props: `value: string, onChange: (url: string) => void, folder: string, label: string`

---

## 18. Public Site Design System

### Color Palette (NEVER use Tailwind named colors for these)
| Token | Value | Usage |
|-------|-------|-------|
| Primary dark | `#0B1F3A` | Header bg, hero bg, primary CTA bg |
| Gold accent | `#C9A84C` / `amber-400` | CTA buttons, badges, highlights |
| Gold hover | `#d4b560` | Button hover state |
| Cream bg | `#f7f5f0` | Page section backgrounds |
| White | `#FFFFFF` | Cards, content areas |

### Typography
- **Font:** Geist (loaded via `next/font/google`)
- **Heading sizes:** `text-4xl md:text-5xl` (hero), `text-3xl md:text-4xl` (section), `text-xl md:text-2xl` (subsection)
- **Body:** `text-base` or `text-sm`, `text-gray-600` for secondary text

### Layout Rules
- **Header height:** 100px total (top bar 36px + nav 64px)
- **Page top padding:** `pt-25` on every `<main>` element — required to clear the fixed header
- **Max width:** `max-w-7xl mx-auto` for full-width sections
- **Section padding:** `py-16 px-4 sm:px-6 lg:px-8` typical

### Tailwind v4 — Critical Differences from v3
```
bg-linear-to-r    NOT  bg-gradient-to-r
bg-linear-to-b    NOT  bg-gradient-to-b
shrink-0          NOT  flex-shrink-0
grow              NOT  flex-grow
```

---

## 19. Non-Negotiable Coding Rules

### ALWAYS DO
1. **Read the file before editing.** User may have rewritten pages between sessions. Always `Read` first, then `Edit` or `Write`.
2. **Import icons from `app/components/icons.tsx`** or write `<svg>` JSX inline. Never import from `lucide-react` or `react-icons` (both are installed but banned).
3. **Use `SITE_CONFIG`** for every phone number, email, address, social URL, school name, founding year. Never hardcode.
4. **Put all React hooks at the top of the component function,** before any derived constants (`const filtered = ...`, `const pendingCount = ...`). React requires consistent hook call order.
5. **`export const metadata`** on every server component page.
6. **`pt-25`** on every public page's `<main>` element.
7. **`<BreadcrumbSchema>`** in the hero section of every inner public page.
8. **Schema components** go right after `<Header />` in page JSX.
9. **Sync worktree to main** after every worktree edit: `cp worktree/path main/path`

### NEVER DO
1. **Never use Lucide icons or react-icons** even though they're installed.
2. **Never hardcode** phone, email, address, social URLs, school name.
3. **Never use `window.confirm()`** for delete confirmation — always use a modal.
4. **Never write inline forms** in admin pages — always a modal overlay.
5. **Never skip loading skeletons** in admin list views.
6. **Never skip success toasts** after admin create/update/delete.
7. **Never add Humanities** as a stream — it does not exist at KMC Lalitpur.
8. **Never put `useState`/`useEffect`/hooks after** derived constants in a component — always at the very top.
9. **Never use `bg-gradient-to-*`** — Tailwind v4 uses `bg-linear-to-*`.

### `"use client"` Rule
Add `"use client"` when the component uses:
- `useState`, `useEffect`, `useRef`, `useCallback`, or any React hook
- Event handlers (`onClick`, `onChange`, etc.)
- `usePathname`, `useRouter`, `useSearchParams`
- **Data arrays containing JSX elements** (e.g., `{ icon: <IconFoo /> }`) — even without hooks

### Admin Modal Pattern (copy exactly)
```tsx
{/* Form modal */}
<div
  className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/80"
  onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
>
  <div className="bg-gray-900 border border-white/[0.08] rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
      <h2 className="text-white font-bold text-sm">Title</h2>
      <button onClick={closeModal} className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/[0.06]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <form onSubmit={handleSave} className="p-6 space-y-4">
      {/* fields */}
    </form>
  </div>
</div>

{/* Delete confirm modal */}
<div
  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
  onClick={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}
>
  <div className="bg-gray-900 border border-white/[0.08] rounded-2xl p-6 w-full max-w-md shadow-2xl">
    {/* icon, title, preview box, Cancel + Delete buttons */}
  </div>
</div>
```

### Toast Pattern (copy exactly)
```tsx
const [toast, setToast] = useState("");  // ← at top with other hooks
function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

// In JSX:
{toast && (
  <div className="fixed top-4 right-4 z-[60] bg-green-900 border border-green-700 text-green-300 text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
    {toast}
  </div>
)}
```

### Loading Skeleton Pattern
```tsx
{loading ? (
  <div className="space-y-2">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-gray-900 border border-white/[0.06] rounded-xl p-4 flex items-center gap-4 animate-pulse">
        <div className="w-14 h-14 rounded-lg bg-gray-800 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-800 rounded w-2/3" />
          <div className="h-3 bg-gray-800 rounded w-1/3" />
        </div>
      </div>
    ))}
  </div>
) : /* actual content */ }
```

---

## 20. npm Scripts

```bash
npm run dev           # Start dev server at localhost:3000

npm run build         # Production build (runs type-check + build)
npm run start         # Start production server
npm run lint          # ESLint check

npm run db:generate   # Regenerate Prisma client after schema.prisma changes — ALWAYS run after schema edit
npm run db:push       # Push schema to DB without creating migration (dev/prototyping only)
npm run db:migrate    # Create migration file + apply to DB (use for tracked changes)
npm run db:studio     # Open Prisma Studio at localhost:5555 (GUI for DB)
npm run db:seed       # Create admin user from ADMIN_EMAIL + ADMIN_PASSWORD env vars
```

---

## 21. Git State & What Is Uncommitted

As of the last session, the main branch has uncommitted work:

### Modified (changes made, not yet committed)
```
app/admin/_components/Sidebar.tsx         ← full polished rewrite
app/admin/(protected)/page.tsx            ← dashboard: stat cards + enquiries feed + quick actions
app/admin/(protected)/news/page.tsx       ← modal + skeleton + toast
app/admin/(protected)/enquiries/page.tsx  ← table + filters + CSV + skeleton
app/admin/(protected)/notices/page.tsx    ← modal + skeleton + toast
app/alumni/page.tsx                       ← merged dynamic alumni system
app/blog/[slug]/page.tsx
app/blog/page.tsx
app/campus/faculty/page.tsx
app/components/whatsapp.tsx
app/gallery/_components/GalleryClient.tsx
app/gallery/page.tsx
app/globals.css
app/layout.tsx
app/page.tsx
app/news/page.tsx
auth.ts
next.config.ts
prisma/schema.prisma
```

### Untracked (new files, never committed)
```
app/admin/(protected)/alumni/             ← full alumni admin page
app/admin/(protected)/blog/               ← blog admin page
app/admin/(protected)/faculty/            ← faculty admin page
app/admin/(protected)/gallery/            ← gallery admin (basic)
app/admin/_components/ImageUpload.tsx
app/api/admin/alumni/
app/api/admin/blog/
app/api/admin/faculty/
app/api/admin/gallery/
app/api/alumni/
app/blog/_components/
app/campus/alumni/
app/campus/faculty/[slug]/
app/campus/faculty/_components/
auth.config.ts
prisma/migrations/20260410102543_add_faculty/
prisma/migrations/20260410111527_add_alumni/
proxy.ts
```

**Everything needs to be committed. No work has been lost — it's all in the working tree.**

---

## 22. What Still Needs To Be Done

| Task | Priority | Notes |
|------|----------|-------|
| **Commit all uncommitted work** | 🔴 High | All the dashboard polish + new pages not yet in git |
| `public/images/og-image.png` | 🟡 Medium | 1200×630 social share image — referenced in metadata but file doesn't exist |
| Google Search Console verification | 🟡 Medium | Add `google: "code"` to `verification` in `app/layout.tsx` metadata |
| Bing Webmaster Tools verification | 🟢 Low | Add `other: { "msvalidate.01": "code" }` to verification |
| Admin gallery page polish | 🟡 Medium | Same modal/skeleton/toast treatment as other admin pages |
| Admin settings page polish | 🟢 Low | Decide what settings are configurable |
| Mock test Microsoft Forms URLs | 🟡 Medium | School needs to provide — set in `SITE_CONFIG.mockTestForms` |
| Test contact form end-to-end | 🟡 Medium | Verify POST `/api/contact` saves to DB correctly |
| `git push` to remote | 🔴 High | After committing, push to origin/main |

---

## 23. How To Start A New Session

```
1. Read this file top to bottom.
2. Run: cd /Users/kasamthapamagar/Developer/kmc-website/my-app && git status
3. Before editing ANY file → Read it first.
4. Check which codebase you're editing:
   - Main project:  /Users/kasamthapamagar/Developer/kmc-website/my-app/
   - Worktree:      .claude/worktrees/elastic-khorana/  (branch: claude/elastic-khorana)
   - After worktree edits → cp to main project
5. Admin pages → Section 14 for exact class names. Never invent new patterns.
6. Public pages → Section 18 for design system. Use SITE_CONFIG (Section 9) for all constants.
7. New API routes → follow Section 15 and Section 16 helpers.
8. Never add Humanities. Never use Lucide. Never hardcode contact info.
```
