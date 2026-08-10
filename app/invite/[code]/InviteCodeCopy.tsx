"use client";

import React, { useState } from "react";

/**
 * The code row with a one-tap Copy. The old page asked a new user to memorize
 * 8 characters across an App Store round-trip — the single biggest drop risk
 * on the page. Copy is best-effort (clipboard can be blocked); the code stays
 * visible as the manual fallback either way.
 */
export default function InviteCodeCopy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore — the code is on screen
    }
  };

  return (
    <div
      className="flex items-center justify-between gap-3 rounded-2xl px-5 py-4 border"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <span
        className="font-mono font-extrabold text-2xl tracking-[0.14em]"
        style={{ color: "var(--text)" }}
      >
        {code.toUpperCase()}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        aria-live="polite"
        className="flex-none text-xs font-extrabold uppercase tracking-widest px-3 py-2 rounded-lg transition-transform active:scale-95"
        style={{ background: "var(--text)", color: "var(--bg)" }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
