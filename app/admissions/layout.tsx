import type { Metadata } from "next";
import { HowToSchema } from "../components/schema";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Learn about KMC Lalitpur's +2 Science, Management, and Law admission process, eligibility, entrance exam details, scholarship criteria, and required documents.",
  openGraph: {
    title: "Admissions — KMC Lalitpur",
    description:
      "Admission guide for Science, Management, and Law streams at Kathmandu Model Secondary School, Lalitpur.",
    url: "https://kmclalitpur.edu.np/admissions",
  },
};

const HOW_TO_STEPS = [
  {
    position: 1,
    name: "Check Eligibility",
    text: "Confirm your SEE results meet KMC's minimum grade requirements. Science stream requires strong grades in Maths and Science; Management and Law have broader eligibility.",
  },
  {
    position: 2,
    name: "Submit the Application Form",
    text: "Complete the free online admission form on the KMC website. Attach a passport-size photograph and basic details. No fee is charged to apply.",
  },
  {
    position: 3,
    name: "Appear for the KMC Entrance Examination",
    text: "Sit the MCQ-based entrance exam in your chosen stream — Science, Management, or Law. Model questions are emailed in advance. Merit list and results are published on exam day.",
  },
  {
    position: 4,
    name: "Interview (if shortlisted)",
    text: "Candidates qualifying for higher scholarship tiers may be called for a brief interview. Most admissions proceed directly from the entrance merit list.",
  },
  {
    position: 5,
    name: "Confirm Admission and Pay Fees",
    text: "Secure your seat by paying tuition and registration fees within the deadline. Scholarship percentage — calculated as SEE results (25%) + Entrance exam (75%) — is applied at this stage.",
  },
  {
    position: 6,
    name: "Attend Orientation and Begin Classes",
    text: "Attend the orientation session, collect your student ID card, and begin classes. The academic year starts shortly after admission confirmation.",
  },
];

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HowToSchema
        name="How to Apply for Admission at KMC Lalitpur"
        description="Step-by-step guide to applying for the Science, Management or Law stream at Kathmandu Model Secondary School (KMC Lalitpur) — one of Nepal's top-ranked +2 colleges in Lalitpur."
        steps={HOW_TO_STEPS}
        totalTime="P7D"
      />
      {children}
    </>
  );
}
