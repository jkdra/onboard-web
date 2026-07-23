import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ code?: string }>;
}

// Legacy/robustness shim: the canonical invite URL is /invite/[code], but a
// link built as /invite?code=XXX (the app's old share format) should land on
// the same page instead of 404ing.
export default async function InviteQueryRedirect({ searchParams }: PageProps) {
  const { code } = await searchParams;
  const trimmed = code?.trim();
  redirect(trimmed ? `/invite/${encodeURIComponent(trimmed)}` : "/");
}
