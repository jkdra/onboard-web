"use client";

// Android waitlist capture is disabled — this isn't how admission actually
// works right now. Re-enable (and fix up) when there's a real Android flow.
// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
import HoverLogo from "@/app/components/HoverLogo";

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
    <section className="min-h-[88svh] flex flex-col justify-center px-6 md:px-10 relative overflow-hidden">
      <div className="w-full">
        <h1 className="tracking-tight mb-8">
          <span
            className="rise-in block font-bold ml-[0.04em]"
            style={{ fontSize: "var(--step-2)", lineHeight: 1.2, "--d": "0.15s" } as React.CSSProperties}
          >
            Let&apos;s get you
          </span>
          <span
            className="rise-in block font-extrabold whitespace-nowrap"
            style={{
              fontSize: "clamp(3.25rem, 16.5vw, 22rem)",
              lineHeight: 0.9,
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
            // Break as "One board, your whole campus." / "Clean slate every
            // Monday." instead of splitting the phrase "Clean slate".
            textWrap: "balance",
            "--d": "0.45s",
          } as React.CSSProperties}
        >
          One board, your whole campus. Clean slate every Monday.
        </p>

        <div className="rise-in max-w-md ml-[0.06em]" style={{ "--d": "0.6s" } as React.CSSProperties}>
          <a
            href={process.env.NEXT_PUBLIC_TESTFLIGHT_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3.5 rounded-2xl text-base font-semibold hover:opacity-85 transition-opacity"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Join Early Access
          </a>
          <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            iphone only for now — android&apos;s coming
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

      <div
        aria-hidden
        className="rise-in absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--text-secondary)", "--d": "1s" } as React.CSSProperties}
      >
        Scroll ↓
      </div>

      {/* The little guy peeking out of the corner, fading into the next section. */}
      <HoverLogo
        size="clamp(220px, 30vw, 420px)"
        className="absolute -right-8 -bottom-6 md:-right-10 md:-bottom-8 opacity-20 hover:opacity-35 transition-opacity"
        style={{ transform: "rotate(-14deg)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
      />
    </section>
  );
}
