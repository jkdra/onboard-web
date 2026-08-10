import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import FooterFinale from "@/app/components/FooterFinale";
import InviteDownloadButton from "./InviteDownloadButton";
import InviteCodeCopy from "./InviteCodeCopy";
import { APP_STORE_URL } from "@/lib/appStore";

export const metadata: Metadata = {
  title: "You've been invited to On Board",
  description: "Join your campus on On Board. Enter your invite code to skip the line.",
};

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

// The invite page is a full-bleed poster, not a card on a page — an
// artifact from the friend, in the iOS share card's own composition:
// leading-aligned lock-up with the inviter's monogram seated in the first
// line (em-sized, flex-centered, so it stays optically locked to the text
// at every viewport), one product line carrying the ephemerality hook, a
// copyable code with The Host peeking over its top edge, one CTA.
export default async function InvitePage({ params }: PageProps) {
  const { code } = await params;
  if (!CODE_PATTERN.test(code)) {
    notFound();
  }

  const inviterHandle = await fetchInviterHandle(code);

  return (
    <>
      <main id="main-content" className="flex-1 flex flex-col min-h-[85vh] justify-center relative overflow-hidden px-6 py-16 sm:px-10">
        {/* Soft radial glow — theme-aware (uses the text color at low alpha) */}
        <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 blur-[120px] rounded-full"
            style={{ background: "var(--text)" }}
          />
        </div>

        <div className="w-full max-w-xl mx-auto text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1
            className="font-display font-extrabold tracking-tight leading-[1.12] mb-5"
            style={{ color: "var(--text)", fontSize: "var(--step-3)" }}
          >
            {inviterHandle ? (
              <>
                <span className="flex items-center gap-[0.3em]">
                  <span
                    aria-hidden
                    className="inline-grid flex-none place-items-center rounded-full font-display font-extrabold"
                    style={{
                      width: "1.05em",
                      height: "1.05em",
                      fontSize: "1em",
                      background: "var(--text)",
                      color: "var(--bg)",
                    }}
                  >
                    <span style={{ fontSize: "0.42em" }}>
                      {inviterHandle.charAt(0).toUpperCase()}
                    </span>
                  </span>
                  <span className="truncate">@{inviterHandle}</span>
                </span>
                wants you
                <br />
                On Board.
              </>
            ) : (
              <>
                Someone on campus
                <br />
                wants you On Board.
              </>
            )}
          </h1>

          {/* One product line, carrying the ephemerality hook — a cold
              recipient learns what this is before being asked to install. */}
          <p
            className="mb-10 max-w-[36ch]"
            style={{ color: "var(--text-secondary)", fontSize: "var(--step-0)" }}
          >
            One board per campus. A fresh start every Monday —{" "}
            <strong className="font-bold" style={{ color: "var(--text)" }}>
              everything clears Sunday night.
            </strong>{" "}
            This code skips you past the waitlist.
          </p>

          {/* The Host peeks over the code row's top edge — the countdown
              card's corner-peek gesture, ported. He sits behind the opaque
              row (DOM order), masked with the text color so he tracks both
              themes for free. */}
          <div className="relative max-w-sm mb-4">
            <span
              aria-hidden
              className="absolute -top-[44px] right-2 w-[72px] h-[72px] pointer-events-none"
              style={{
                background: "var(--text)",
                WebkitMaskImage: "url(/logo-happy.svg)",
                maskImage: "url(/logo-happy.svg)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
            <div className="relative">
              <InviteCodeCopy code={code} />
            </div>
          </div>

          <div className="max-w-sm">
            <InviteDownloadButton
              href={APP_STORE_URL}
              className="flex items-center justify-center w-full py-4 px-6 rounded-full font-display font-extrabold text-base hover:scale-[1.02] active:scale-[0.98] transition-transform"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              Download on the App Store
            </InviteDownloadButton>

            <p className="text-xs mt-4" style={{ color: "var(--text-secondary)" }}>
              The code stays on your clipboard — paste it during signup.
              Already have the app? Enter it when you sign up.
            </p>
          </div>
        </div>
      </main>
      <FooterFinale />
    </>
  );
}
