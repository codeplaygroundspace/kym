import { redirect } from "next/navigation";

export default function RootPage() {
  // TODO: Check user authentication and role from Supabase
  // If authenticated:
  //   - If patient role: redirect("/patient")
  //   - If practitioner role: redirect("/practitioner")
  // If not authenticated: redirect("/welcome")

  redirect("/welcome");
}
