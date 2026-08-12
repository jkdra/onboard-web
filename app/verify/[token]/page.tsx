import React from "react";
import { Metadata } from "next";
import FooterFinale from "@/app/components/FooterFinale";
import { APP_STORE_URL } from "@/lib/appStore";

export const metadata: Metadata = {
  title: "Finish verifying in the app",
  description:
    "School email verification finishes inside On Board. Open the app and enter the 6-digit code from your email.",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ token: string }>;
}

/**
 * The web fallback for the verification email's one-tap button.
 *
 * `https://onboardapp.org/verify/<token>` is a universal link: on an iPhone
 * with On Board installed, iOS opens the app and this page never renders. It
 * exists only for the cases where that hand-off can't happen — a desktop
 * browser, a phone without the app, or an in-app/webmail browser that swallows
 * the universal link.
 *
 * This page deliberately does NOT verify anything. Verification runs through an
 * `authenticated`-only RPC bound to `auth.uid()`, and that session lives only
 * inside the app — so the token in the URL is useless here. It is never read,
 * never rendered, and never sent anywhere; the param exists purely because the
 * route segment does. The page's whole job is to hand the human back to their
 * phone without making them think something broke.
 */
export default async function VerifyPage({ params }: PageProps) {
  // Consumed and discarded on purpose — see the note above. Nothing about this
  // page varies by token, and it must never be displayed or transmitted.
  await params;

  return (
    <>
      <main
        id="main-content"
        className="flex-1 flex flex-col min-h-[85vh] justify-center relative overflow-hidden py-16"
      >
        {/* Soft radial glow — theme-aware (uses the text color at low alpha) */}
        <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 blur-[120px] rounded-full"
            style={{ background: "var(--text)" }}
          />
        </div>

        <div className="rail animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div>
            <h1
              // Wider than the body measure below it so "Finish in the app."
              // holds one line at the display size; the body copy keeps the
              // narrower reading measure of the wrapper.
              className="font-display font-extrabold tracking-tight leading-[1.12] mb-5 max-w-[46rem]"
              style={{ color: "var(--text)", fontSize: "var(--step-3)" }}
            >
              Almost there.
              <br />
              Finish in the app.
            </h1>

            <p
              className="mb-10 max-w-[38ch]"
              style={{ color: "var(--text-secondary)", fontSize: "var(--step-0)" }}
            >
              Your school email is verified from inside On Board, where
              you&apos;re signed in — so this page can&apos;t do it for you.
              Nothing went wrong.
            </p>

            {/* The reliable path, given the weight it deserves: the code in the
                same email always works, whatever browser this opened in. The
                Host peeks over the row's top edge — the invite page's gesture,
                masked with the text color so he tracks both themes. */}
            <div className="relative max-w-sm mb-10">
              <span
                aria-hidden
                className="absolute -top-[42px] right-3 w-[68px] h-[68px] pointer-events-none"
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
              <div
                className="relative rounded-2xl px-5 py-4"
                style={{ background: "var(--bg)", border: "1.5px solid var(--border)" }}
              >
                <p
                  className="font-display font-extrabold mb-1"
                  style={{ color: "var(--text)", fontSize: "var(--step-0)" }}
                >
                  Go back to On Board
                </p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Type the 6-digit code from this same email. That works every
                  time.
                </p>
              </div>
            </div>

            <div className="max-w-sm">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-4 px-6 rounded-full font-display font-extrabold text-base hover:scale-[1.02] active:scale-[0.98] transition-transform"
                style={{ background: "var(--text)", color: "var(--bg)" }}
              >
                Download on the App Store
              </a>

              <p className="text-xs mt-4" style={{ color: "var(--text-secondary)" }}>
                Opened this on a laptop? The same email is on your phone — the
                code is waiting there.
              </p>
            </div>
          </div>
        </div>
      </main>
      <FooterFinale />
    </>
  );
}
