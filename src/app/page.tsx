// import { redirect } from "next/navigation";

// export default function RootPage() {
//   // Redirect to dashboard home page
//   redirect("/home");
// }
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  // Server-side session validation for security
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If no valid session, redirect to login
  if (!session) {
    redirect("/auth/login");
  }

  // If authenticated, redirect to dashboard home
  redirect("/home");
}
