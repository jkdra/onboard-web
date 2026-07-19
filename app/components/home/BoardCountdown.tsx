"use client";

import { useEffect, useState } from "react";

// The board wipes every Monday at 00:00 local time. This is the real thing —
// a live count to the next wipe, not a decorative scroll prop. The number a
// visitor sees is the actual time left on this week's board.
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

// Red only ever means "time's almost up" on this site — the same red as the
// wipe in BoardScene. Under six hours, the clock starts bleeding into it.
const URGENT_MS = 6 * 60 * 60 * 1000;
const RED = "#ff2b2b";

const DISPLAY_FONT =
  "var(--font-display, 'Zalando Sans Expanded'), ui-sans-serif, system-ui, sans-serif";

function Segment({ value, unit }: { value: string; unit: string }) {
  return (
    <span className="inline-flex items-baseline">
      <span className="tabular-nums">{value}</span>
      <span className="text-[0.32em] font-bold ml-[0.06em] mr-[0.34em] opacity-45">
        {unit}
      </span>
    </span>
  );
}

export default function BoardCountdown() {
  // Time-to-wipe depends on the visitor's local clock, so it can't be known at
  // SSR. Render a stable placeholder until mounted, then tick every second.
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
  const color = urgent ? RED : "var(--text)";

  return (
    <section
      className="px-6 md:px-10 py-24 md:py-32 text-center overflow-hidden"
      aria-label="This week's board wipes clean every Monday at midnight."
    >
      <div className="max-w-4xl mx-auto">
        <p
          className="mb-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em]"
          style={{ color: urgent ? RED : "var(--text-secondary)" }}
        >
          the weekly wipe
        </p>

        <div
          aria-hidden
          className="font-extrabold leading-[0.85] tracking-tight whitespace-nowrap transition-colors duration-700"
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: "clamp(1.75rem, 11vw, 8rem)",
            color,
          }}
        >
          {totalSec === null ? (
            <span className="tabular-nums opacity-40">--d --h --m --s</span>
          ) : (
            <>
              <Segment value={String(days)} unit="d" />
              <Segment value={pad(hours!)} unit="h" />
              <Segment value={pad(mins!)} unit="m" />
              <Segment value={pad(secs!)} unit="s" />
            </>
          )}
        </div>

        <p
          className="mt-10 mx-auto max-w-md"
          style={{
            fontSize: "var(--step-0)",
            lineHeight: 1.5,
            color: "var(--text-secondary)",
            textWrap: "balance",
          }}
        >
          every monday at midnight, the whole board clears. fresh week,
          fresh posts — you had to be there.
        </p>
      </div>
    </section>
  );
}
