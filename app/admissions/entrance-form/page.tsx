import { redirect } from "next/navigation";

// Current intake applications are closed. Keep visitors on the admissions guide
// instead of sending them to the external application portal.
export default function EntranceFormPage() {
  redirect("/admissions");
}
