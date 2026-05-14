# KMC Lalitpur — Official Website

The official website for **Kathmandu Model Secondary School (KMC Lalitpur)**, a NEB-affiliated +2 institution in Balkumari, Lalitpur, Nepal. Built with Next.js, Prisma, and Neon PostgreSQL, deployed on Vercel.

🌐 **Live site:** [kmclalitpur.edu.np](https://kmclalitpur.edu.np)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Neon PostgreSQL (serverless) |
| ORM | Prisma 7 (pg adapter + PgBouncer) |
| Auth | NextAuth v5 (JWT, credentials) |
| Image Storage | Cloudinary |
| AI Chatbot | Google Gemini API |
| Email | Nodemailer |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## Features

### Public Site
- **Homepage** — hero, stats, academic streams, facilities, news, alumni
- **Academics** — Science, Management, and BA.LLB (Law) stream pages
- **Admissions** — eligibility, process, scholarships, enquiry form
- **About** — history, mission, principal's message, faculty
- **News & Notices** — dynamic, DB-driven news feed and notice board
- **Blog** — SEO-optimised articles with dynamic OG images
- **Gallery** — categorised photo gallery with Cloudinary CDN
- **Alumni** — success stories + KMC Alumni Association section
- **Facilities** — labs, library, hostel, transport, sports, cafeteria
- **FAQ** — structured Q&A with FAQPage schema for rich results
- **Contact** — contact form with email delivery
- **AI Chatbot** — Gemini-powered assistant for admissions queries

### Admin Panel (`/admin`)
- **News** — create, edit, publish/unpublish news articles
- **Blog** — full blog post editor with image upload
- **Gallery** — upload images with crop tool, custom categories
- **Notices** — pin and manage official notices
- **Faculty** — add/edit faculty members with photos
- **Alumni** — manage alumni profiles and success stories
- **Enquiries** — view and manage admission enquiries
- **Popups** — create site-wide popups with image, text, buttons, and frequency control
- **Settings** — site configuration

### SEO / AEO / GEO
- Full Schema.org structured data (EducationalOrganization, FAQPage, Course, Person, BreadcrumbList, Article)
- Dynamic `sitemap.xml` with blog post URLs pulled from DB
- `robots.txt` allowing Google, Bing, and AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
- Open Graph and Twitter card metadata on every page
- Canonical URLs, hreflang, JSON-LD on all key pages

---

## Project Structure

```
app/
├── (public pages)
│   ├── page.tsx              # Homepage
│   ├── about/
│   ├── academics/
│   ├── admissions/
│   ├── alumni/
│   ├── blog/
│   ├── campus/
│   ├── contact/
│   ├── facilities/
│   ├── faq/
│   ├── gallery/
│   └── news/
├── admin/
│   ├── login/
│   └── (protected)/
│       ├── alumni/
│       ├── blog/
│       ├── enquiries/
│       ├── faculty/
│       ├── gallery/
│       ├── news/
│       ├── notices/
│       ├── popups/
│       └── settings/
├── api/
│   ├── admin/                # Protected CRUD endpoints
│   ├── chatbot/              # Gemini AI chatbot
│   ├── contact/              # Contact form email
│   └── popups/               # Public popup fetch
├── components/               # Shared UI components
├── config/
│   └── site.ts               # Single source of truth for site constants
└── lib/
    └── prisma.ts             # Prisma client (singleton with PgBouncer)

prisma/
├── schema.prisma             # DB schema
├── migrations/               # Migration history
└── seed.ts                   # Admin user seed

middleware.ts                 # Auth guard for /admin routes
```

---

## Getting Started

### Prerequisites
- Node.js ≥ 20
- A [Neon](https://neon.tech) PostgreSQL database
- A [Cloudinary](https://cloudinary.com) account (free tier works)
- A [Google AI Studio](https://aistudio.google.com) API key (for chatbot)

### 1. Clone and install

```bash
git clone https://github.com/kasamthapa/kmc-lalitpur.git
cd kmc-lalitpur
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```env
# Neon PostgreSQL — pooled (runtime)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require&pgbouncer=true"

# Neon PostgreSQL — direct (migrations only)
DIRECT_URL="postgresql://user:password@host/dbname?sslmode=require"

# Admin account — set these before seeding (see .env.example)
ADMIN_EMAIL="your-admin-email"
ADMIN_PASSWORD="your-secure-password"

# NextAuth
NEXTAUTH_SECRET="generate with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-upload-preset"

# Google Gemini (chatbot)
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Set up the database

```bash
npm run db:push      # Push schema to Neon
npm run db:seed      # Create the admin user
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Deployment (Vercel)

1. Push to GitHub (already connected to Vercel)
2. In your Vercel project → **Settings → Environment Variables**, add all variables from `.env`
3. Set `NEXTAUTH_URL` to your production domain (e.g. `https://kmclalitpur.edu.np`)
4. Deploy — Vercel picks up the `main` branch automatically

> **Note:** The Neon free tier supports a max of 3 concurrent connections. The Prisma client is configured with `max: 3` to stay within this limit.

---

## Database Scripts

```bash
npm run db:generate   # Regenerate Prisma client after schema changes
npm run db:push       # Push schema changes to DB (no migration file)
npm run db:migrate    # Create a migration file + push
npm run db:studio     # Open Prisma Studio (visual DB browser)
npm run db:seed       # Seed the admin user
```

---

## Environment Variable Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Neon pooled connection string (PgBouncer) |
| `DIRECT_URL` | ✅ | Neon direct connection (for migrations) |
| `NEXTAUTH_SECRET` | ✅ | Random secret for JWT signing |
| `NEXTAUTH_URL` | ✅ | Full URL of the site |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | ✅ | Cloudinary unsigned upload preset |
| `GEMINI_API_KEY` | ⚠️ | Google Gemini key (chatbot won't work without it) |

