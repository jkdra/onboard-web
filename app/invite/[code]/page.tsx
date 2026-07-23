import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import FooterFinale from "@/app/components/FooterFinale";

export const metadata: Metadata = {
  title: "You've been invited to On Board",
  description: "Join your campus on On Board. Enter your invite code to skip the line.",
};

// Same source as Hero.tsx: env override with the live TestFlight link as
// fallback.
const TESTFLIGHT_URL =
  process.env.NEXT_PUBLIC_TESTFLIGHT_URL ||
  "https://testflight.apple.com/join/397k6bF1";

// Codes are 8 chars from an unambiguous lowercase alphanumeric alphabet
// (see generate_referral_code in the viral_waitlist migration). Accept a
// little slack around that, but reject arbitrary path garbage.
const CODE_PATTERN = /^[a-zA-Z0-9]{4,16}$/;

interface PageProps {
  params: Promise<{ code: string }>;
}

/** Resolve the inviter's handle for the personalized headline. Degrades to
 * null (generic wording) on any failure — unknown code, RPC not yet deployed,
 * or missing Supabase env in local dev. */
async function fetchInviterHandle(code: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.rpc("get_invite_inviter", {
      p_code: code,
    });
    if (error || !data?.length) return null;
    return data[0].handle ?? null;
  } catch {
    return null;
  }
}

export default async function InvitePage({ params }: PageProps) {
  const { code } = await params;
  if (!CODE_PATTERN.test(code)) {
    notFound();
  }

  const inviterHandle = await fetchInviterHandle(code);

  return (
    <>
      <main id="main-content" className="flex-1 flex flex-col min-h-[80vh] items-center justify-center p-6 relative overflow-hidden">
        {/* Soft radial glow — theme-aware (uses the text color at low alpha) */}
        <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 blur-[120px] rounded-full"
            style={{ background: "var(--text)" }}
          />
        </div>

        <div className="w-full max-w-md mx-auto flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div
            className="mb-8 p-6 rounded-3xl border shadow-2xl w-full"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto border"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              🎟️
            </div>
            <h1
              className="text-3xl font-extrabold tracking-tight mb-2 font-display"
              style={{ color: "var(--text)" }}
            >
              You&apos;re Invited!
            </h1>
            <p
              className="text-base mb-6 font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              {inviterHandle ? (
                <>
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    @{inviterHandle}
                  </span>{" "}
                  wants you On Board! Use their code to get priority access.
                </>
              ) : (
                <>Someone on campus wants you On Board! Use their code to get priority access.</>
              )}
            </p>

            <div
              className="p-6 rounded-2xl border mb-6"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Your Invite Code
              </p>
              <div
                className="text-4xl font-black tracking-widest font-mono"
                style={{ color: "var(--text)" }}
              >
                {code.toUpperCase()}
              </div>
            </div>

            <a
              href={TESTFLIGHT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              <span className="relative z-10">Download via TestFlight</span>
            </a>
          </div>

          <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Already have the app? Open it and enter this code during signup.
          </p>
        </div>
      </main>
      <FooterFinale />
    </>
  );
}
