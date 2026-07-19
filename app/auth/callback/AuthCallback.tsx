"use client";

import { useEffect, useState } from "react";

// The app's own deep link (AppConfiguration.authRedirectURL). On a phone with
// the app installed, tapping the email link opens the app directly via the
// universal link — this page (and this button) is the fallback for desktop,
// in-browser opens, or when the app isn't installed yet.
const APP_DEEP_LINK = "onboard://auth-callback";
const TESTFLIGHT_URL = process.env.NEXT_PUBLIC_TESTFLIGHT_URL || "#";

type State = "verified" | "expired" | "idle";

// Supabase drops its result in either the query string (?code / ?token_hash)
// or the URL hash (#access_token / #error). Read both.
function readAuthState(): State {
  if (typeof window === "undefined") return "idle";
  const params = new URLSearchParams(
    `${window.location.search.slice(1)}&${window.location.hash.slice(1)}`
  );
  if (params.get("error") || params.get("error_code") || params.get("error_description")) {
    return "expired";
  }
  if (
    params.get("access_token") ||
    params.get("code") ||
    params.get("token_hash") ||
    params.get("type")
  ) {
    return "verified";
  }
  return "idle";
}

// The brand mark, theme-aware (masked so it recolors in dark mode).
function Mark({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 72,
        height: 72,
        background: "var(--text)",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

const COPY: Record<State, { mark: string; title: string; body: string }> = {
  verified: {
    mark: "/logo-happy.svg",
    title: "you're on board.",
    body: "your email's verified. jump back into the app to finish signing in.",
  },
  idle: {
    mark: "/logo-happy.svg",
    title: "you're on board.",
    body: "open On Board to finish signing in.",
  },
  expired: {
    mark: "/logo.svg",
    title: "this link expired.",
    body: "no worries — head back to the app and request a fresh code.",
  },
};

export default function AuthCallback() {
  const [state, setState] = useState<State>("idle");
  useEffect(() => setState(readAuthState()), []);

  const copy = COPY[state];

  return (
    <main
      id="main-content"
      className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24"
    >
      <div className="rise-in" style={{ "--d": "0.05s" } as React.CSSProperties}>
        <Mark src={copy.mark} />
      </div>

      <h1
        className="rise-in font-extrabold tracking-tight mt-10 mb-4"
        style={{ fontSize: "var(--step-3)", lineHeight: 1.02, "--d": "0.15s" } as React.CSSProperties}
      >
        {copy.title}
      </h1>
      <p
        className="rise-in max-w-sm mb-10"
        style={{
          fontSize: "var(--step-0)",
          lineHeight: 1.5,
          color: "var(--text-secondary)",
          textWrap: "balance",
          "--d": "0.25s",
        } as React.CSSProperties}
      >
        {copy.body}
      </p>

      <div
        className="rise-in flex flex-col items-center gap-4"
        style={{ "--d": "0.35s" } as React.CSSProperties}
      >
        <a
          href={APP_DEEP_LINK}
          className="inline-block px-6 py-3.5 rounded-2xl text-base font-semibold hover:opacity-85 transition-opacity"
          style={{ background: "var(--text)", color: "var(--bg)" }}
        >
          Open On Board →
        </a>
        <a
          href={TESTFLIGHT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline"
          style={{ color: "var(--text-secondary)" }}
        >
          don&apos;t have the app? get the beta →
        </a>
      </div>
    </main>
  );
}
