import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { BreadcrumbSchema, FAQSchema, WebPageSchema } from "../components/schema";
import { IconChevronRight, IconPhone, IconMail } from "../components/icons";
import { SITE_CONFIG } from "../config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Get answers to common questions about KMC Lalitpur — admissions, academic programs, facilities, hostel, transport, fees, and more.",
};

const faqCategories = [
  {
    category: "General",
    icon: "🏫",
    items: [
      {
        q: "What is KMC Lalitpur?",
        a: "Kathmandu Model Secondary School (KMC Lalitpur) is a NEB-affiliated +2 secondary school located at Balkumari, Lalitpur, Kathmandu Valley, Nepal. Established in 2000, KMC is recognized as one of the premier higher secondary institutions in Nepal, offering Science, Management, and Law streams.",
      },
      {
        q: "Is KMC Lalitpur affiliated with NEB?",
        a: "Yes. KMC Lalitpur is fully affiliated with the National Examinations Board (NEB) of Nepal. All academic programs and examinations are conducted in accordance with NEB guidelines and standards.",
      },
      {
        q: "What awards has KMC received?",
        a: "KMC Lalitpur has received the Ministry of Education Excellence Award for Best Campus among 4000+ schools, the Best Campus of 2080 award from the Government of Nepal's Ministry of Education Science & Technology, and the NEB Excellence Award for Academic Excellence.",
      },
      {
        q: "How many students does KMC have?",
        a: "KMC Lalitpur has over 2,500 students enrolled across all streams. The school maintains small class sizes to ensure quality education and individual attention for every student.",
      },
      {
        q: "Where is KMC Lalitpur located?",
        a: "KMC Lalitpur is located at Balkumari, Lalitpur, Kathmandu Valley, Nepal. The campus is easily accessible by public transport and the school also provides its own transport service from multiple routes.",
      },
    ],
  },
  {
    category: "Admissions",
    icon: "📋",
    items: [
      {
        q: "What are the eligibility requirements for admission?",
        a: "Students who have completed Grade 10 (SEE) from any NEB-recognized institution are eligible to apply. Minimum GPA requirements vary by stream: Science requires GPA 2.8+ (with B+ in Science, Mathematics, Optional Mathematics and English), while Management and Law require GPA 2.4+ (with C grade in Mathematics and English). Final selection is based on entrance examination performance.",
      },
      {
        q: "When does the admission process start?",
        a: "Admissions for the new academic year typically open in April–May (Baisakh–Jestha in the Nepali calendar). We encourage students to check our website regularly or contact the admissions office at " + SITE_CONFIG.phone + " for the exact schedule.",
      },
      {
        q: "Is there a scholarship examination?",
        a: "Yes. KMC conducts a Scholarship Entrance Examination for students seeking merit-based scholarships. Top performers receive scholarships ranging from 25% to 100% fee waivers. Sports, cultural, and need-based scholarships are also available.",
      },
      {
        q: "What documents are required for admission?",
        a: "Required documents include: SEE mark sheet and character certificate, copy of citizenship (parents) or birth certificate, 2 passport-sized photographs, migration certificate (if from outside Lalitpur district), and medical fitness certificate. Original documents must be verified during enrollment.",
      },
      {
        q: "Can I apply online?",
        a: "Yes, you can initiate the admission inquiry online through our Contact page or by emailing " + SITE_CONFIG.email + ". The full admission form and fee payment must be completed in person at the campus admissions office.",
      },
    ],
  },
  {
    category: "Academic Programs",
    icon: "📚",
    items: [
      {
        q: "What streams does KMC Lalitpur offer?",
        a: "KMC Lalitpur offers three NEB streams at the +2 (Grade 11–12) level: Science (Physics, Chemistry, Biology/Computer), Management (Accountancy, Economics, Business), and Law (fundamentals of legal studies and social sciences).",
      },
      {
        q: "What is the teaching medium at KMC?",
        a: "The primary medium of instruction is English for all streams — Science, Management, and Law. All official communications and notices are bilingual (English and Nepali).",
      },
      {
        q: "How are internal assessments and exams conducted?",
        a: "KMC follows the NEB two-year program structure. Internal assessments (practical, project work, and periodic tests) contribute 25% of the total grade. The NEB board examinations at the end of Grade 12 constitute the remaining 75%. Monthly unit tests and terminal examinations are conducted internally.",
      },
      {
        q: "Does KMC provide entrance preparation (IOE/CEE/CMAT)?",
        a: "Yes. KMC runs dedicated entrance preparation classes for Science students (IOE/MBBS/BAMS entrance), Management students (CMAT/BBA entrance), and Law students (Law campus entrance). These are integrated into the academic schedule and run alongside the regular curriculum.",
      },
    ],
  },
  {
    category: "Facilities & Campus",
    icon: "🏛️",
    items: [
      {
        q: "Does KMC have hostel facilities?",
        a: "Yes. KMC provides on-campus and nearby affiliated hostel accommodation for students from outside the Kathmandu Valley. The hostel offers single, double, and dormitory rooms with meals, 24-hour security, study halls, and Wi-Fi. Contact the hostel office for availability and fees.",
      },
      {
        q: "Is transport service available?",
        a: "KMC provides school transport service covering multiple routes across Lalitpur, Kathmandu, and Bhaktapur. Buses run on fixed schedules to ensure safe and timely arrival. Monthly transport passes are available. Contact the admin office for route details and current rates.",
      },
      {
        q: "What laboratory facilities are available?",
        a: "KMC has well-equipped Physics, Chemistry, and Biology laboratories for Science students, along with a modern Computer Lab with high-speed internet. All labs meet NEB practical examination requirements and are supervised by qualified lab assistants.",
      },
      {
        q: "Is there a library?",
        a: "Yes. The KMC library houses a vast collection of books, references, periodicals, and videos covering all academic streams. Students can also access digital resources anytime through the dedicated e-library platform at kmclibrary.edu.np. The library is open Sunday–Friday from 8 AM to 5 PM.",
      },
      {
        q: "What sports and extracurricular facilities does KMC have?",
        a: "KMC has a full sports complex with facilities for cricket, football, basketball, and indoor games. The campus also has an auditorium for cultural programs, debate hall, and dedicated spaces for clubs including Rotaract, literary club, and science club.",
      },
    ],
  },
  {
    category: "Fees & Finance",
    icon: "💰",
    items: [
      {
        q: "How can I pay fees?",
        a: "Fees can be paid in person at the accounts office by cash, cheque, or bank transfer. Online bank transfer details are available upon admission. The school accepts quarterly fee payments for families who prefer installment-based payment.",
      },
      {
        q: "Are there fee concessions for economically disadvantaged students?",
        a: "Yes. KMC has a need-based financial assistance program. Families with documented financial hardship can apply for partial fee waivers. Scholarship exam toppers automatically receive merit-based discounts. Contact the admissions office for details.",
      },
      {
        q: "What is included in the annual fee?",
        a: "The annual fee covers tuition, examination fees, laboratory charges, library access, sports facilities, and basic student insurance. Hostel, transport, uniform, and extracurricular activity fees are charged separately as per usage.",
      },
    ],
  },
];

const flatFaqs = faqCategories.flatMap((c) => c.items);

export default function FAQPage() {
  return (
    <main className="bg-white">
      <BreadcrumbSchema items={[{ name: "FAQ", href: "/faq" }]} />
      <FAQSchema items={flatFaqs} />
      <WebPageSchema
        name="Frequently Asked Questions — KMC Lalitpur"
        description="Answers to common questions about admissions, programs, facilities, and fees at KMC Lalitpur."
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">FAQ</span>
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
              Help Center
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-[#8ba7c7] leading-relaxed">
              Find quick answers to common questions about admissions, academic programs, campus life, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Category Nav */}
      <section className="py-8 bg-white border-b border-[#eae6de] sticky top-[100px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {faqCategories.map((cat) => (
              <a
                key={cat.category}
                href={`#${cat.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-[#f7f5f0] text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white transition"
              >
                {cat.icon} {cat.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-16">
          {faqCategories.map((cat) => (
            <div
              key={cat.category}
              id={cat.category.toLowerCase().replace(/\s+/g, "-")}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{cat.icon}</span>
                <h2 className="text-2xl font-bold text-[#0B1F3A]">{cat.category}</h2>
              </div>
              <div className="space-y-3">
                {cat.items.map((item, i) => (
                  <details
                    key={i}
                    className="group border border-[#eae6de] rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none bg-white hover:bg-[#f7f5f0] transition select-none">
                      <span className="font-semibold text-[#0B1F3A] text-base leading-snug">
                        {item.q}
                      </span>
                      <span className="shrink-0 w-7 h-7 rounded-full bg-[#f7f5f0] group-open:bg-amber-400 flex items-center justify-center transition text-[#0B1F3A] font-bold text-lg leading-none">
                        <span className="group-open:hidden">+</span>
                        <span className="hidden group-open:block">−</span>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-2 text-[#374151] leading-relaxed text-sm border-t border-[#eae6de] bg-[#f7f5f0]">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-20 bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-[#8ba7c7] text-lg mb-10">
            Our admissions team is happy to help. Reach out to us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition"
            >
              <IconPhone size={18} />
              {SITE_CONFIG.phone}
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              <IconMail size={18} />
              {SITE_CONFIG.email}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              Contact Us
              <IconChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
