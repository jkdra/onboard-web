"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import HoverLogo from "@/app/components/HoverLogo";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase
      .from("web_waitlist")
      .insert({ email: email.toLowerCase().trim() });
    setLoading(false);
    if (error && error.code !== "23505") {
      // 23505 = unique_violation (already signed up) — treat as success
      setError("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <section className="min-h-[88svh] flex flex-col justify-center px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-6xl w-full mx-auto">
        <span
          className="rise-in inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-10"
          style={{ background: "var(--text)", color: "var(--bg)", "--d": "0.05s" } as React.CSSProperties}
        >
          Coming to IVC · Fall 2026
        </span>
        <h1
          className="font-extrabold tracking-tight mb-8"
          style={{ fontSize: "var(--step-5)", lineHeight: 0.98 }}
        >
          <span className="rise-in block" style={{ "--d": "0.15s" } as React.CSSProperties}>
            Let&apos;s get you
          </span>
          <span className="rise-in block" style={{ "--d": "0.3s" } as React.CSSProperties}>
            On Board.
          </span>
        </h1>
        <p
          className="rise-in mb-12 max-w-xl"
          style={{
            fontSize: "var(--step-1)",
            lineHeight: 1.4,
            color: "var(--text-secondary)",
            "--d": "0.45s",
          } as React.CSSProperties}
        >
          One board, your whole campus. Clean slate every Monday.
        </p>

        <div className="rise-in max-w-md" style={{ "--d": "0.6s" } as React.CSSProperties}>
          {!submitted ? (
            <>
              <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@student.edu"
                  aria-label="Email address"
                  required
                  disabled={loading}
                  className="flex-1 min-w-48 px-4 py-3.5 rounded-2xl text-base outline-none transition-colors disabled:opacity-50"
                  style={{
                    background: "var(--card)",
                    border: "1.5px solid var(--border)",
                    color: "var(--text)",
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 rounded-2xl text-base font-semibold hover:opacity-85 transition-opacity whitespace-nowrap disabled:opacity-50"
                  style={{ background: "var(--text)", color: "var(--bg)" }}
                >
                  {loading ? "Joining…" : "Join the waitlist"}
                </button>
              </form>
              {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
            </>
          ) : (
            <p className="font-medium text-base">
              You&apos;re on the list. We&apos;ll reach out before launch.
            </p>
          )}
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
