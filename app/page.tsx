"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Footer from "@/app/components/Footer";
import FeatureCard from "@/app/components/FeatureCard";

const features = [
  {
    icon: "📌",
    title: "Post to the board",
    body: "Say what's on your mind. The whole campus sees it.",
  },
  {
    icon: "🔁",
    title: "Fresh every week",
    body: "Monday at midnight, it's wiped. Start again.",
  },
  {
    icon: "🎓",
    title: "Students only",
    body: "Your campus email gets you in. Nobody else.",
  },
  {
    icon: "💬",
    title: "React & comment",
    body: "React, reply, repeat.",
  },
];

export default function Home() {
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
    <>
      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 md:py-36 px-6">
          <div className="max-w-2xl mx-auto">
            {/* Brand mark — CSS-masked so it fills with --text and adapts to light/dark */}
            <div
              aria-hidden
              className="mb-7"
              style={{
                width: 60,
                height: 60,
                background: "var(--text)",
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
            <span
              className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-8"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              Coming to IVC · Fall 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Let&apos;s get you
              <br />
              On Board.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-lg" style={{ color: "var(--text-secondary)" }}>
              One board, your whole campus. Clean slate every Monday.
            </p>

            {!submitted ? (
              <div className="max-w-md">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-wrap gap-3"
                >
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
                {error && (
                  <p className="mt-3 text-sm text-red-500">{error}</p>
                )}
              </div>
            ) : (
              <p className="font-medium text-base" style={{ color: "var(--text)" }}>
                You&apos;re on the list. We&apos;ll reach out before launch.
              </p>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="pb-16 px-6">
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}


