"use client";

// The web's total-failure face — a BSOD, ported from the iOS OfflineGateView
// so "something broke" looks like the same brand on every platform. This is a
// crash/error boundary, NOT the 404: a missing page keeps the on-brand "board
// got cleared" card; this is for when the system itself falls over.
//
// Monospace appears here and ONLY here on the site — it's the BSOD reference,
// not a break from the Zalando type system.

const BSOD_BLUE = "#0078D7"; // the modern Windows stop-screen blue

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div
      role="alert"
      className="fixed inset-0 z-50 flex flex-col justify-center gap-6 px-6 py-16 sm:px-12 md:px-20"
      style={{ background: BSOD_BLUE, color: "#ffffff" }}
    >
      <p
        aria-hidden
        className="font-extrabold leading-none"
        style={{ fontSize: "clamp(4rem, 14vw, 9rem)" }}
      >
        :(
      </p>

      <div className="max-w-2xl space-y-3">
        <h1 className="font-semibold tracking-tight" style={{ fontSize: "var(--step-2)", lineHeight: 1.1 }}>
          On Board ran into a problem and needs to reload.
        </h1>
        <p style={{ fontSize: "var(--step-0)", color: "rgba(255,255,255,0.85)" }}>
          We&apos;ll get you back on the board as soon as you try again.
        </p>
      </div>

      <div
        className="text-sm leading-relaxed"
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "rgba(255,255,255,0.8)" }}
      >
        <p>If you call a friend, give them this info:</p>
        <p>Stop code: BOARD_UNREACHABLE</p>
      </div>

      <div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-85"
          style={{ background: "#ffffff", color: BSOD_BLUE }}
        >
          <span aria-hidden>↻</span> Try again
        </button>
      </div>
    </div>
  );
}
