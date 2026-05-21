import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { IconChevronRight, IconCalendar } from "@/app/components/icons";
import { ArticleSchema } from "@/app/components/schema";

// ── Shared post data (single source of truth) ─────────────────────────────────
// When the DB has content, this becomes the fallback for slugs not in the DB.
// Step 15: replace this with a Prisma query on blog_posts table.

export const BLOG_POSTS = [
  {
    id: 1,
    slug: "best-college-nepal-science-stream-2082",
    title: "Best College in Nepal for Science Stream in 2082 — Complete Guide",
    excerpt:
      "Choosing the right +2 Science college in Nepal is one of the most important decisions of your life. We compare top institutions on faculty quality, lab facilities, pass rates, and entrance prep success — and explain why KMC Lalitpur consistently ranks at the top.",
    date: "April 6, 2026",
    category: "School Rankings",
    image: "/images/science-v2.png",
    author: "KMC Academic Team",
    readTime: "8 min read",
    featured: true,
    content: `
KMC Lalitpur has been a beacon of academic excellence in Nepal's +2 Science education for over two decades. When choosing a science college, students and parents evaluate multiple factors — and KMC consistently leads on every metric.

## Faculty Quality

Our faculty consists of 150+ full-time educators, many with postgraduate and doctoral qualifications. More importantly, our teachers are experienced in entrance examination preparation, particularly for IOE, IOM, and other competitive exams.

## Laboratory Facilities

KMC houses fully equipped Physics, Chemistry, and Biology laboratories with modern instruments. Students have daily access to practical sessions, ensuring they're not just exam-ready but genuinely skilled scientists.

## NEB Results

KMC Lalitpur has maintained a 97% NEB pass rate for over 15 consecutive years. Our students consistently appear in the top-50 merit list at the national level.

## Entrance Exam Preparation

Our dedicated entrance prep program runs parallel to the NEB curriculum. With regular mock tests, doubt sessions, and one-on-one mentoring, KMC Science students have one of the highest IOE entrance success rates in the Valley.

## Conclusion

If you're looking for the best +2 Science college in Nepal, KMC Lalitpur offers a proven track record, world-class facilities, and a supportive learning environment. Admissions are open for 2083 — contact us at +977-1-5918595.
    `.trim(),
    metaTitle: "Best College in Nepal for Science Stream 2082 — KMC Lalitpur",
    metaDescription:
      "Compare top +2 Science colleges in Nepal. KMC Lalitpur leads on NEB pass rates, faculty quality, lab facilities, and IOE entrance prep. Admissions open 2083.",
  },
  {
    id: 2,
    slug: "top-plus2-colleges-lalitpur-2082",
    title: "Top +2 Colleges in Lalitpur for Science, Management & Law (2082)",
    excerpt:
      "Lalitpur has become one of Nepal's most competitive hubs for higher secondary education. Here is a detailed breakdown of the best +2 colleges in Lalitpur — what each offers, their NEB pass rates, and how to choose the right one for your stream and goals.",
    date: "April 4, 2026",
    category: "School Rankings",
    image: "/images/classroom.png",
    author: "KMC Admissions Team",
    readTime: "7 min read",
    featured: false,
    content: `
Lalitpur is home to some of the finest higher secondary schools in Nepal. If you're looking for the best +2 college in Lalitpur, here's what you need to know before making your decision.

## What Makes a Great +2 College?

When evaluating colleges, look for: consistent NEB results, experienced faculty, modern facilities, entrance preparation programs, and overall student support systems.

## KMC Lalitpur — Leading Across All Streams

KMC Lalitpur stands out because it offers excellence across Science, Management, and Law — not just one stream. Our students excel at NEB exams and national entrance tests alike.

## Science Stream in Lalitpur

For Science, look for labs, qualified Physics and Chemistry teachers, and a structured IOE/IOM preparation program. KMC's Science department checks all these boxes.

## Management Stream

The best Management programs combine theoretical knowledge with practical exposure. KMC's Management stream includes business projects, case studies, and CMAT preparation.

## Law Stream

KMC's Law stream offers dedicated faculty with legal background, moot court training, and strong preparation for law entrance examinations.

## Final Word

Visit KMC Lalitpur at Balkumari, Lalitpur, or call +977-1-5918595 to schedule a campus tour and meet our faculty before making your decision.
    `.trim(),
    metaTitle: "Top +2 Colleges in Lalitpur 2082 — Science, Management & Law",
    metaDescription:
      "Best +2 colleges in Lalitpur for 2083. Compare Science, Management & Law programs. KMC Lalitpur ranks #1 for NEB results and entrance exam success.",
  },
  {
    id: 3,
    slug: "ioe-entrance-preparation-kmc-science",
    title: "IOE Entrance Preparation: How KMC Science Students Crack Engineering",
    excerpt:
      "KMC Lalitpur students have one of the highest IOE entrance success rates in Lalitpur. Our dedicated entrance prep classes, mock tests, and Physics-Math intensive programs are designed to get you into Pulchowk and beyond.",
    date: "April 1, 2026",
    category: "Tips & Guides",
    image: "/images/facilities/computerLab.png",
    author: "KMC Science Department",
    readTime: "6 min read",
    featured: false,
    content: `
Getting into Pulchowk Engineering Campus or other IOE-affiliated institutes is a goal for thousands of Science students every year. At KMC Lalitpur, we've built a system that significantly improves your chances.

## The KMC IOE Prep Program

Our entrance preparation runs alongside the regular NEB curriculum. It includes:
- **Daily practice sets** in Physics, Chemistry, and Mathematics
- **Weekly mock tests** modeled after the actual IOE entrance format
- **Error analysis sessions** where teachers go through common mistakes
- **Individual doubt classes** twice a week

## Why Most Students Fail IOE

Students often underestimate the gap between NEB preparation and IOE entrance requirements. IOE requires faster problem-solving, deeper conceptual understanding, and strong exam temperament.

## KMC's Track Record

Every year, a significant portion of our Science batch secures admission into engineering programs. Our alumni have gone on to Pulchowk, Kathmandu University, and other top engineering colleges.

## Start Early

The earlier you begin focused entrance preparation, the better. Grade 11 is not too early to start building problem-solving habits that will carry you through Grade 12 and the entrance exam.

Contact us at +977-1-5918595 for details on our entrance preparation program.
    `.trim(),
    metaTitle: "IOE Entrance Preparation at KMC Lalitpur — Science Students",
    metaDescription:
      "How KMC Lalitpur Science students crack the IOE entrance exam. Mock tests, doubt sessions, Physics-Math intensive program. Admissions open 2083.",
  },
  {
    id: 4,
    slug: "neb-exam-2082-preparation",
    title: "NEB Exam 2082: What to Expect and How to Prepare",
    excerpt:
      "Everything Grade 12 students need to know about the NEB board examination — marking scheme, practical weightage, model questions, and the proven study plan our faculty recommends for a 90%+ score.",
    date: "March 25, 2026",
    category: "Tips & Guides",
    image: "/images/library.png",
    author: "KMC Faculty",
    readTime: "9 min read",
    featured: false,
    content: `
The NEB Grade 12 board examination is one of the most important milestones in a Nepali student's academic life. Here's everything you need to know to prepare effectively.

## Exam Structure

The NEB exam consists of theory papers (worth 75 marks each) and practical/project components (worth 25 marks each). The total is 100 marks per subject.

## Marking Scheme

- Short answer questions: 2-3 marks each
- Long answer questions: 5-8 marks each
- Practical: 25 marks (evaluated by external examiners)

## Recommended Study Plan

**6 months before:** Complete the full syllabus. Focus on understanding over memorization.

**3 months before:** Begin revision. Solve past papers from the last 5 years.

**1 month before:** Focus on high-yield topics, model questions, and weak areas.

**Final week:** Light revision only. Don't start new topics. Get adequate sleep.

## Common Mistakes

- Leaving questions blank (even a partial attempt gets marks)
- Poor time management during the exam
- Ignoring practical components

## KMC's Results

KMC students have maintained a 97% NEB pass rate. Our faculty provides model question sets, topic-wise notes, and exam strategy sessions in the months leading up to the examination.
    `.trim(),
    metaTitle: "NEB Exam 2082 Preparation Guide — KMC Lalitpur",
    metaDescription:
      "Complete NEB Grade 12 exam 2082 preparation guide. Marking scheme, study plan, common mistakes, and how KMC Lalitpur achieves 97% pass rate every year.",
  },
  {
    id: 5,
    slug: "management-vs-science-stream-after-see",
    title: "Management vs Science: Which Stream Should You Choose After SEE?",
    excerpt:
      "The stream you choose after SEE shapes your entire career path. This guide breaks down the real differences between Science, Management, and Law — career options, difficulty level, fees, and which suits your strengths.",
    date: "March 18, 2026",
    category: "Tips & Guides",
    image: "/images/hero-main.png",
    author: "KMC Counselling Team",
    readTime: "10 min read",
    featured: false,
    content: `
One of the most common questions we receive from Grade 10 students and their parents is: should I choose Science or Management after SEE? Here's an honest, practical guide.

## Science Stream

**Ideal for:** Students who enjoy Mathematics, Physics, Chemistry, and Biology.

**Career paths:** Medicine (MBBS), Engineering, IT, Research, Pharmacy.

**Difficulty:** High. Requires strong fundamentals and consistent study.

**Entrance requirements:** IOE, IOM, CEE (for medicine).

## Management Stream

**Ideal for:** Students interested in business, economics, finance, or entrepreneurship.

**Career paths:** CA, BBA, MBA, Banking, Finance, Entrepreneurship.

**Difficulty:** Moderate. Strong emphasis on concepts and analytical thinking.

**Entrance requirements:** CAT/CMAT for business schools.

## Law Stream

**Ideal for:** Students interested in legal careers, public policy, or advocacy.

**Career paths:** Lawyer, Judge, Legal consultant, Public administration.

**Difficulty:** Moderate to High. Strong reading and analytical skills required.

## How to Decide

Ask yourself:
1. What subjects do I genuinely enjoy?
2. What career paths excite me?
3. Am I choosing for myself or for someone else?

KMC Lalitpur's counselling team is available for free stream guidance sessions. Call +977-1-5918595 to schedule.
    `.trim(),
    metaTitle: "Science vs Management After SEE — Which Stream to Choose?",
    metaDescription:
      "Honest guide to choosing between Science, Management, and Law after SEE results. Career options, difficulty, and how to decide what's right for you.",
  },
  {
    id: 6,
    slug: "best-school-management-nepal-kmc",
    title: "Best School for Management in Nepal: Why KMC Tops the List",
    excerpt:
      "From CMAT preparation to real-world business exposure, KMC's Management stream goes beyond textbooks. Learn why students across Kathmandu Valley choose KMC for their +2 Management education and how our alumni are leading in finance and entrepreneurship.",
    date: "March 10, 2026",
    category: "School Rankings",
    image: "/images/auditorium.png",
    author: "KMC Management Department",
    readTime: "6 min read",
    featured: false,
    content: `
Nepal's +2 Management education landscape has many players, but KMC Lalitpur stands apart. Here's why students from across the Kathmandu Valley choose KMC for Management.

## Beyond the Textbook

Our Management program integrates real-world case studies, business plan competitions, and guest lectures from industry professionals. This prepares students not just for NEB exams but for actual business careers.

## CMAT Preparation

The CMAT (Central Management Admission Test) is the gateway to top BBA programs in Nepal. KMC's integrated CMAT preparation ensures our students perform exceptionally in these competitive exams.

## Faculty

Our Management faculty includes professionals with experience in banking, finance, entrepreneurship, and education. They bring practical knowledge that enriches the theoretical curriculum.

## Alumni Success

KMC Management alumni are working in leading banks, financial institutions, and companies across Nepal and internationally. Several have founded successful startups.

## Facilities

Dedicated Commerce lab, access to financial newspapers and periodicals, case study rooms, and a strong business club environment.

Contact KMC Lalitpur at +977-1-5918595 for Management program details and admission information.
    `.trim(),
    metaTitle: "Best School for Management in Nepal — KMC Lalitpur",
    metaDescription:
      "KMC Lalitpur tops the list for +2 Management education in Nepal. CMAT preparation, industry exposure, and alumni success in banking and business.",
  },
  {
    id: 7,
    slug: "kmc-students-topped-neb-examinations",
    title: "How KMC Students Topped the NEB Examinations 3 Years Running",
    excerpt:
      "A deep dive into the study strategies, teacher mentorship, and daily routines that helped KMC students consistently outperform national averages in NEB board examinations.",
    date: "March 5, 2026",
    category: "Academic Excellence",
    image: "/images/hero-main.png",
    author: "KMC Academic Team",
    readTime: "5 min read",
    featured: false,
    content: `
Three consecutive years of students topping or ranking in the NEB merit list is not a coincidence. Here's what makes KMC Lalitpur's academic results so consistent.

## Structure and Discipline

KMC runs a tightly structured academic calendar. Classes start on time, syllabi are completed ahead of schedule, and revision begins early. There's no scrambling in the final weeks.

## Teacher Mentorship

Each student has access to their subject teachers beyond class hours. Our faculty conducts dedicated doubt-clearing sessions, monitors student progress, and intervenes early when a student falls behind.

## Practice Culture

We believe that exams are won in the months before, not the night before. KMC students take multiple full-length mock exams, get detailed feedback, and work on their weak areas systematically.

## Student Community

KMC's peer culture is academically positive. Students study together, quiz each other, and celebrate academic achievements. This environment is deliberately cultivated by our management.

## The Result

97% NEB pass rate. Multiple district and national rank holders. Consistent merit-list appearances year after year.

These results reflect not genius, but a system — and every KMC student benefits from that system.
    `.trim(),
    metaTitle: "How KMC Students Top NEB Exams — Academic Excellence Explained",
    metaDescription:
      "KMC Lalitpur's secret to consistent NEB top results: structured curriculum, teacher mentorship, practice culture, and a positive student community.",
  },
  {
    id: 8,
    slug: "kmc-to-google-alumni-sarina-maharjan",
    title: "From KMC to Google: An Alumni Interview with Sarina Maharjan",
    excerpt:
      "We sat down with Sarina (Science, Batch 2010) who is now a Software Engineer at Google to talk about her journey, lessons from KMC, and advice for current students.",
    date: "February 20, 2026",
    category: "Alumni Stories",
    image: "/images/facilities/computerLab.png",
    author: "KMC Alumni Relations",
    readTime: "8 min read",
    featured: false,
    content: `
Sarina Maharjan completed her +2 Science at KMC Lalitpur in 2010, went on to study Computer Engineering at Pulchowk, and is now a Software Engineer at Google. We sat down with her to learn about her journey.

**What do you remember most about KMC?**

"The teachers. Especially our Physics sir — he didn't just teach Physics, he taught us how to think. That problem-solving approach stayed with me through engineering and beyond."

**How did KMC prepare you for Pulchowk?**

"The entrance preparation program at KMC was rigorous. We did mock tests every week. By the time the actual IOE entrance came, I felt prepared. The foundation was solid."

**What advice would you give to current KMC students?**

"Don't just study for marks — develop genuine curiosity. Build the habit of asking 'why' and 'how'. That's what separates engineers who build things from those who just follow instructions."

**How did your journey take you to Google?**

"I worked at local IT companies after graduation, built strong fundamentals, contributed to open-source projects, and eventually prepared systematically for Google's interview process. It took years of consistent work."

**Any final message for KMC students?**

"Your college years are shorter than they feel. Use them well. KMC gives you a great foundation — what you build on it is up to you."

*Sarina Maharjan is a Software Engineer at Google, Mountain View. She completed her +2 Science at KMC Lalitpur in 2010 and holds a B.E. in Computer Engineering from Pulchowk Campus.*
    `.trim(),
    metaTitle: "From KMC to Google — Alumni Story: Sarina Maharjan",
    metaDescription:
      "KMC Lalitpur alumni Sarina Maharjan went from +2 Science to Software Engineer at Google. Her story, lessons, and advice for current students.",
  },
  {
    id: 9,
    slug: "kmc-talent-innovation-expo-2082-highlights",
    title: "KMC Talent & Innovation Expo 2082 — A Celebration of Student Creativity",
    excerpt:
      "Hundreds of students showcased their innovations, artworks, and projects at this year's expo. Here are the highlights and the projects that wowed the judges.",
    date: "February 10, 2026",
    category: "Events",
    image: "/images/auditorium.png",
    author: "KMC Events Team",
    readTime: "6 min read",
    featured: false,
    content: `
The KMC Talent and Innovation Expo 2082 was one of the most impressive showcases of student creativity in recent years. Held in the KMC Lalitpur campus auditorium and grounds, the event drew students, parents, faculty, and industry guests.

## Science & Technology Projects

Science students presented innovative projects ranging from solar-powered models to water purification systems. Several projects demonstrated a strong grasp of real-world problem-solving.

## Business & Management Presentations

Management stream students pitched business plans to a panel of actual entrepreneurs and investors. The quality of presentations reflected months of dedicated preparation.

## Arts & Culture

The cultural segment featured traditional music, contemporary dance, photography exhibitions, and visual art. KMC's commitment to holistic education was on full display.

## Innovation Awards

Three projects received special recognition from the judging panel:
1. **Best Science Project** — Automated irrigation system using Arduino
2. **Best Management Pitch** — Hyperlocal delivery startup concept
3. **Best Creative Work** — Photography series on urban Lalitpur

## Looking Ahead

Events like the Innovation Expo remind us that education is about more than exam scores. KMC Lalitpur is committed to providing students with platforms to explore, create, and present.

The next Talent and Innovation Expo is already being planned for 2083. Students interested in participating can register through the Student Catalyst Committee.
    `.trim(),
    metaTitle: "KMC Talent & Innovation Expo 2082 Highlights",
    metaDescription:
      "Highlights from the KMC Lalitpur Talent and Innovation Expo 2082 — science projects, business pitches, art, and the award winners.",
  },
  {
    id: 10,
    slug: "teaching-with-purpose-kmc-educator",
    title: "Teaching with Purpose: A Day in the Life of a KMC Educator",
    excerpt:
      "Principal Ramesh Ji and three senior teachers reflect on what drives them to come to school every day, and how they see their role beyond just teaching subjects.",
    date: "February 10, 2026",
    category: "Faculty Insights",
    image: "/images/hero-main.png",
    author: "KMC Communications",
    readTime: "5 min read",
    featured: false,
    content: `
Teaching is more than a profession at KMC Lalitpur — it's a calling. We spent a day with three senior faculty members and our Principal to understand what drives exceptional educators.

## 5:30 AM — Preparation

Our senior Chemistry teacher arrives early to prepare her lab for the morning's practical session. "Preparation is everything," she says. "You can't walk into a practical class without having everything ready."

## 7:00 AM — First Class

The day begins. For our Mathematics teacher with 18 years at KMC, it's a familiar rhythm — but each batch brings new challenges and new rewards. "Every year, there's at least one student who makes you remember why you became a teacher," he reflects.

## 12:00 PM — Doubt Sessions

The lunch hour at KMC is rarely quiet for teachers. Students line up outside classrooms with questions, problems they couldn't solve, concepts they didn't understand. Faculty members stay back willingly.

## 3:00 PM — Beyond the Curriculum

After formal classes, KMC educators engage in curriculum development, exam paper setting, student counselling, and coordination. The visible part of teaching is only half the job.

## A Word from the Principal

"We don't just hire subject experts. We hire people who genuinely care about young people. That combination — expertise and care — is what makes KMC different."

At KMC Lalitpur, teaching with purpose is not a motto on the wall. It's practiced every day, in every classroom.
    `.trim(),
    metaTitle: "Teaching with Purpose — A Day in the Life of a KMC Educator",
    metaDescription:
      "Behind the scenes at KMC Lalitpur. Our faculty share what drives them, their daily routines, and why they see teaching as more than a profession.",
  },
];

// ── Dynamic route ──────────────────────────────────────────────────────────────

import { prisma } from "@/app/lib/prisma";

// Allow dynamic DB slugs that weren't in generateStaticParams
export const dynamicParams = true;
export const revalidate = 60;

type Params = { slug: string };

// Unified shape used for rendering (works for both DB and hardcoded posts)
interface RenderPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}

function dbToRender(p: {
  slug: string; title: string; excerpt: string | null;
  createdAt: Date; category: string | null; imageUrl: string | null;
  author: string | null; readTime: string | null; content: string | null;
}): RenderPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    date: p.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    category: p.category ?? "General",
    image: p.imageUrl ?? "/images/hero-main.png",
    author: p.author ?? "KMC Staff",
    readTime: p.readTime ?? "5 min read",
    content: p.content ?? "",
  };
}

async function getPost(slug: string): Promise<RenderPost | null> {
  // 1. Try DB first
  try {
    const dbPost = await prisma.blogPost.findUnique({
      where: { slug, published: true },
      select: {
        slug: true, title: true, excerpt: true, createdAt: true,
        category: true, imageUrl: true, author: true,
        readTime: true, content: true,
      },
    });
    if (dbPost) return dbToRender(dbPost);
  } catch {
    // DB unavailable — fall through
  }

  // 2. Fall back to hardcoded posts
  const staticPost = BLOG_POSTS.find((p) => p.slug === slug);
  if (!staticPost) return null;
  return {
    slug: staticPost.slug,
    title: staticPost.title,
    excerpt: staticPost.excerpt,
    date: staticPost.date,
    category: staticPost.category,
    image: staticPost.image,
    author: staticPost.author,
    readTime: staticPost.readTime,
    content: staticPost.content,
    metaTitle: staticPost.metaTitle,
    metaDescription: staticPost.metaDescription,
  };
}

export async function generateStaticParams() {
  const staticSlugs = BLOG_POSTS.map((post) => ({ slug: post.slug }));
  try {
    const dbSlugs = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    const all = [...staticSlugs, ...dbSlugs.map((p) => ({ slug: p.slug }))];
    // deduplicate
    return [...new Map(all.map((s) => [s.slug, s])).values()];
  } catch {
    return staticSlugs;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const post = await getPost(slug);
  if (!post) notFound();

  // Related posts: try DB first, fall back to hardcoded
  let related: RenderPost[] = [];
  try {
    const dbRelated = await prisma.blogPost.findMany({
      where: { published: true, category: post.category, NOT: { slug } },
      take: 3,
      select: {
        slug: true, title: true, excerpt: true, createdAt: true,
        category: true, imageUrl: true, author: true, readTime: true, content: true,
      },
    });
    related = dbRelated.map(dbToRender);
  } catch {
    related = BLOG_POSTS
      .filter((p) => p.slug !== slug && p.category === post.category)
      .slice(0, 3)
      .map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, date: p.date, category: p.category, image: p.image, author: p.author, readTime: p.readTime, content: p.content }));
  }

  return (
    <>
    <ArticleSchema
      title={post.metaTitle ?? post.title}
      description={post.metaDescription ?? post.excerpt}
      image={post.image}
      datePublished={post.date}
      author={post.author}
      url={`/blog/${post.slug}`}
    />
    <main className="bg-white">
      <Header />

      {/* Hero — dark band, no pill badge */}
      <section className="pt-28 pb-0 bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <Link href="/blog" className="hover:text-amber-400 transition">Blog</Link>
            <IconChevronRight size={14} />
            <span className="text-[#8ba7c7] truncate max-w-[200px]">{post.category}</span>
          </div>

          {/* Category — bare text label, no pill */}
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400 block mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-[#8ba7c7] text-sm pb-12 flex-wrap border-b border-white/10">
            <span>{post.date}</span>
            <span className="text-white/20">·</span>
            <span>{post.readTime}</span>
            <span className="text-white/20">·</span>
            <span>By {post.author}</span>
          </div>
        </div>

        {/* Cover image — full bleed from dark hero */}
        <div className="max-w-5xl mx-auto px-4 pt-0">
          <div className="relative w-full h-72 md:h-[480px] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">

          {/* Lead excerpt */}
          <p className="text-xl text-[#374151] leading-relaxed mb-10 font-medium border-l-[3px] border-amber-400 pl-6">
            {post.excerpt.replace(/\*\*([^*]+)\*\*/g, "$1")}
          </p>

          {/* Article content */}
          <div className="text-[#374151]">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold text-[#0B1F3A] mt-12 mb-5 pb-3 border-b border-[#eae6de]">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("- ") || block.includes("\n- ")) {
                const items = block.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="mb-6 space-y-2 pl-0">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span className="leading-relaxed">{item.replace("- ", "").replace(/\*\*([^*]+)\*\*/g, "$1")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.startsWith("**") && block.endsWith("**")) {
                return (
                  <p key={i} className="font-bold text-[#0B1F3A] mb-4 text-lg">
                    {block.replace(/\*\*/g, "")}
                  </p>
                );
              }
              const parts = block.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p key={i} className="mb-6 leading-[1.85] text-[17px]">
                  {parts.map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={j} className="font-bold text-[#0B1F3A]">
                        {part.replace(/\*\*/g, "")}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            })}
          </div>

          {/* Author — divider style, no card box */}
          <div className="mt-14 pt-8 border-t-2 border-[#0B1F3A] flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#0B1F3A] flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-[#0B1F3A] text-sm">{post.author}</p>
                <p className="text-xs text-[#9ca3af]">KMC Lalitpur</p>
              </div>
            </div>
            <Link
              href="/blog"
              className="text-sm font-bold text-[#0B1F3A] hover:text-amber-600 transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Related posts — clean grid, no card boxes */}
      {related.length > 0 && (
        <section className="py-16 border-t border-[#eae6de]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#374151]">
                Related Articles
              </span>
              <div className="flex-1 h-px bg-[#eae6de]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative w-full aspect-[16/9] bg-[#0B1F3A] overflow-hidden mb-4">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-[1.04] transition duration-500"
                    />
                  </div>
                  {r.category && (
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-amber-600 mb-2">
                      {r.category}
                    </span>
                  )}
                  <h3 className="font-bold text-[#0B1F3A] leading-snug group-hover:text-[#1a3a6a] transition line-clamp-2 mb-1">
                    {r.title}
                  </h3>
                  <p className="text-xs text-[#9ca3af] mt-auto pt-2">{r.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA — asymmetric split, no centered box */}
      <section className="py-20 bg-[#0B1F3A] text-white">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400 mb-3">
              Admissions Open 2083
            </p>
            <h2 className="text-3xl font-bold leading-tight">
              Interested in<br />joining KMC?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/admissions"
              className="px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold hover:bg-amber-300 transition text-sm"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-white/20 text-white font-bold hover:bg-white/10 transition text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}
