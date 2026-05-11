import { redirect } from "next/navigation";

// The entrance application is handled by the external KMC portal.
// Redirect anyone who lands on this URL straight there.
export default function EntranceFormPage() {
  redirect("https://app.kmclalitpur.edu.np/applicant/login");
}
