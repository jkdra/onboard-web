"use client";

// Android waitlist capture is disabled — this isn't how admission actually
// works right now. Re-enable (and fix up) when there's a real Android flow.
// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
import HoverLogo from "@/app/components/HoverLogo";
import HeroCountdownCard from "@/app/components/home/HeroCountdownCard";
import { APP_STORE_URL } from "@/lib/appStore";

export default function Hero() {
  // const [email, setEmail] = useState("");
  // const [submitted, setSubmitted] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);
  //   const { error } = await supabase
  //     .from("web_waitlist")
  //     .insert({ email: email.toLowerCase().trim() });
  //   setLoading(false);
  //   if (error && error.code !== "23505") {
  //     // 23505 = unique_violation (already signed up) — treat as success
  //     setError("Something went wrong. Please try again.");
  //     return;
  //   }
  //   setSubmitted(true);
  // }

  return (
    <section className="min-h-[88svh] flex flex-col justify-center relative overflow-hidden">
      <div className="rail grid items-center gap-10 md:gap-14 md:grid-cols-[1.15fr_0.85fr]">
        <div>
        <h1 className="tracking-tight mb-8">
          <span
            className="rise-in block font-bold ml-[0.04em]"
            // Breathing room in em of the SMALL line, so the gap between
            // the kicker and the wordmark GROWS proportionally as the pair
            // scales — dynamic separation, not a fixed pixel gap.
            style={{ fontSize: "var(--step-2)", lineHeight: 1.1, marginBottom: "0.45em", "--d": "0.15s" } as React.CSSProperties}
          >
            Let&apos;s get you
          </span>
          <span
            className="rise-in block font-extrabold whitespace-nowrap text-[clamp(2.6rem,14vw,5rem)] md:text-[clamp(3rem,9vw,6.8rem)]"
            style={{
              // One line, always — the wordmark never wraps. Sized against
              // the hero COLUMN (via the md tier), not the viewport, since
              // the countdown card shares the row from md up.
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              // Optical alignment: at this size the "O" glyph's side bearing
              // pushes its visible edge right of the left rail — tuck it back.
              marginLeft: "-0.028em",
              "--d": "0.3s",
            } as React.CSSProperties}
          >
            On Board.
          </span>
        </h1>
        <p
          className="rise-in mb-12 max-w-xl ml-[0.06em]"
          style={{
            fontSize: "var(--step-1)",
            lineHeight: 1.4,
            color: "var(--text-secondary)",
            textWrap: "balance",
            "--d": "0.45s",
          } as React.CSSProperties}
        >
          One board, your whole campus — what everyone&apos;s actually saying
          this week. It clears Monday.
        </p>

        <div className="rise-in max-w-md ml-[0.06em]" style={{ "--d": "0.6s" } as React.CSSProperties}>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3.5 rounded-2xl text-base font-semibold hover:opacity-85 transition-opacity"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Download Now
          </a>
          <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            iPhone for now — Android&apos;s coming
          </p>

          {/* Android waitlist — disabled, not how admission actually works right now.
          <div className="mt-8">
            {!submitted ? (
              <>
                <p className="mb-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                  Not on iPhone? Get notified when Android's ready.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@student.edu"
                    aria-label="Email address"
                    required
                    disabled={loading}
                    className="flex-1 min-w-48 px-4 py-3 rounded-2xl text-sm outline-none transition-colors disabled:opacity-50"
                    style={{
                      background: "var(--card)",
                      border: "1.5px solid var(--border)",
                      color: "var(--text)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-3 rounded-2xl text-sm font-semibold hover:opacity-85 transition-opacity whitespace-nowrap disabled:opacity-50"
                    style={{
                      background: "transparent",
                      color: "var(--text)",
                      border: "1.5px solid var(--border)",
                    }}
                  >
                    {loading ? "Joining…" : "Join the waitlist"}
                  </button>
                </form>
                {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
              </>
            ) : (
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                You're on the list. We'll reach out when Android's ready.
              </p>
            )}
          </div>
          */}
        </div>
        </div>

        {/* The app's countdown card, live — the supporting artifact beside
            the tagline, ticking the real time to this week's wipe. Desktop
            only: on mobile the tagline IS the hero, undiluted. */}
        <div className="rise-in hidden md:block justify-self-end" style={{ "--d": "0.75s" } as React.CSSProperties}>
          <HeroCountdownCard />
        </div>
      </div>

      {/* Mobile keeps the Host instead of the card: peeking from the
          bottom-trailing corner, faint, cropped by the hero's edge —
          the app's corner-peek gesture as the quiet supporting element. */}
      <span
        aria-hidden
        className="md:hidden absolute -right-8 -bottom-7 w-[190px] h-[190px] opacity-15 pointer-events-none"
        style={{
          background: "var(--text)",
          transform: "rotate(-14deg)",
          WebkitMaskImage: "url(/logo.svg)",
          maskImage: "url(/logo.svg)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />

      <div
        aria-hidden
        className="rise-in absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-widest hidden md:block"
        style={{ color: "var(--text-secondary)", "--d": "1s" } as React.CSSProperties}
      >
        Scroll ↓
      </div>

      {/* The corner Host ghost retired — the countdown card is the hero's
          artifact now and carries its own Host peek; two of him fought. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
      />
    </section>
  );
}
