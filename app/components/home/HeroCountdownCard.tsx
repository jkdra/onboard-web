"use client";

import { useEffect, useState } from "react";
import { APP_STORE_URL } from "@/lib/appStore";

// The app's CountdownCard, recreated for the hero — the product's most
// recognizable artifact carrying the site's one REAL number: a live count
// to the next wipe (Monday 00:00, visitor-local). Absorbs the old
// BoardCountdown section, which showed the same ticking number as plain
// typography. The whole card is the download CTA.

function msUntilNextWipe(now: number): number {
  const d = new Date(now);
  const day = d.getDay(); // 0 Sun … 6 Sat
  let daysUntilMon = (1 - day + 7) % 7; // Sun→1, Tue→6 …
  if (daysUntilMon === 0) daysUntilMon = 7; // already Monday → next Monday's wipe
  const next = new Date(d);
  next.setDate(d.getDate() + daysUntilMon);
  next.setHours(0, 0, 0, 0);
  return next.getTime() - now;
}

const pad = (n: number) => String(n).padStart(2, "0");

// Red only ever means "time's almost up" on this site — same as the
// countdown in BoardScene. Under six hours, the clock bleeds into it.
const URGENT_MS = 6 * 60 * 60 * 1000;
const RED = "#ff2b2b";

const DISPLAY_FONT =
  "var(--font-display, 'Zalando Sans Expanded'), ui-sans-serif, system-ui, sans-serif";

function Segment({ value, unit }: { value: string; unit: string }) {
  return (
    <span className="inline-flex items-baseline">
      <span className="tabular-nums">{value}</span>
      <span className="text-[0.4em] font-bold ml-[0.05em] mr-[0.3em] opacity-45">
        {unit}
      </span>
    </span>
  );
}

export default function HeroCountdownCard() {
  // Visitor-local time can't be known at SSR — render a stable placeholder
  // until mounted, then tick every second.
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setMs(msUntilNextWipe(Date.now()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const totalSec = ms === null ? null : Math.max(0, Math.floor(ms / 1000));
  const days = totalSec === null ? null : Math.floor(totalSec / 86400);
  const hours = totalSec === null ? null : Math.floor((totalSec % 86400) / 3600);
  const mins = totalSec === null ? null : Math.floor((totalSec % 3600) / 60);
  const secs = totalSec === null ? null : totalSec % 60;
  const urgent = ms !== null && ms < URGENT_MS;
  // The seconds slot earns its place only when it's the story — matching
  // the app, which drops to a 1s cadence inside the final hours.
  const showSeconds = ms !== null && ms < 3 * 60 * 60 * 1000;

  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download On Board on the App Store — this week's board clears Monday at midnight"
      className="group relative flex flex-col w-full max-w-[340px] aspect-[20/23] rounded-3xl p-6 sm:p-7 overflow-hidden border shadow-xl transition-transform duration-300 hover:scale-[1.02]"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      {/* This week's prompt — the app sets it in SemiExpanded regular at
          full opacity (body text, not display type), prompt top, countdown
          pinned to the card's bottom edge. */}
      <p className="text-[17px] leading-snug pr-4">
        What&apos;s the most unhinged thing in your notes app right now?
      </p>

      <span className="flex-1" aria-hidden />

      <p
        className="text-[11px] font-bold uppercase tracking-[0.22em] mb-2 transition-colors duration-700"
        style={{ color: urgent ? RED : "var(--text-secondary)" }}
      >
        Clears Monday
      </p>
      <div
        aria-hidden
        className="font-extrabold leading-none tracking-tight whitespace-nowrap transition-colors duration-700"
        style={{
          fontFamily: DISPLAY_FONT,
          fontSize: "clamp(1.6rem, 1.4rem + 1vw, 2rem)",
          color: urgent ? RED : "var(--text)",
        }}
      >
        {totalSec === null ? (
          <span className="opacity-40">–d ––h ––m</span>
        ) : (
          <>
            <Segment value={String(days)} unit="d" />
            <Segment value={pad(hours!)} unit="h" />
            <Segment value={pad(mins!)} unit="m" />
            {showSeconds && <Segment value={pad(secs!)} unit="s" />}
          </>
        )}
      </div>

      {/* The Host peeking from the corner — the app card's own recipe
          (faint, cropped by the card edge), masked with the text color so
          both themes work for free. */}
      <span
        aria-hidden
        className="absolute -right-3 -bottom-4 w-[88px] h-[88px] opacity-[0.12] pointer-events-none"
        style={{
          background: "var(--text)",
          transform: "rotate(-10deg)",
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
    </a>
  );
}
