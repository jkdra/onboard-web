import type { Metadata } from "next";
import AuthCallback from "./AuthCallback";

// Auth landing — the destination for the email magic link's redirect. Kept out
// of search indexes; the real work happens in the client component, which reads
// the token Supabase appends to the URL.
export const metadata: Metadata = {
  title: "Email verified",
  description: "Your On Board email is verified.",
  robots: { index: false, follow: false },
};

export default function AuthCallbackPage() {
  return <AuthCallback />;
}
