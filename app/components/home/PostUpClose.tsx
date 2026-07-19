import TiltCard from "@/app/components/TiltCard";

const DISPLAY_FONT =
  "var(--font-display, 'Zalando Sans Expanded'), ui-sans-serif, system-ui, sans-serif";

// A circular icon "button" — purely decorative app chrome (the panel is a
// showcase, not a working control), so it's hidden from assistive tech.
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{
        width: 34,
        height: 34,
        border: "1.5px solid color-mix(in srgb, var(--card-ink) 14%, transparent)",
        color: "var(--card-ink)",
      }}
    >
      {children}
    </span>
  );
}

function Comment({ who, text }: { who: string; text: string }) {
  return (
    <div className="flex gap-3">
      <span
        className="shrink-0 inline-flex items-center justify-center rounded-full text-[11px] font-bold mt-0.5"
        style={{
          width: 26,
          height: 26,
          background: "color-mix(in srgb, var(--card-ink) 12%, transparent)",
          color: "var(--card-ink)",
        }}
      >
        {who.slice(0, 1)}
      </span>
      <p className="text-sm leading-snug" style={{ color: "var(--card-ink)" }}>
        <span className="font-bold">{who}</span>{" "}
        <span style={{ color: "var(--card-ink-secondary)" }}>{text}</span>
      </p>
    </div>
  );
}

// "A real post, up close" — the app's post view rebuilt as a web panel, so the
// site visibly wears the same skin as the product the screenshot came from.
export default function PostUpClose() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 overflow-hidden" aria-label="What a post looks like">
      <div className="max-w-6xl mx-auto grid gap-12 md:gap-16 md:grid-cols-[0.9fr_1.1fr] items-center">
        {/* Left — the thesis, in the site's voice. */}
        <div className="scroll-reveal">
          <p
            className="mb-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em]"
            style={{ color: "var(--text-secondary)" }}
          >
            a real post, up close
          </p>
          <h2
            className="font-extrabold tracking-tight"
            style={{ fontSize: "var(--step-3)", lineHeight: 1.02 }}
          >
            Big text.
            <br />
            Small stakes.
          </h2>
          <p
            className="mt-6 max-w-md"
            style={{ fontSize: "var(--step-0)", lineHeight: 1.55, color: "var(--text-secondary)" }}
          >
            No feed to win, nothing to archive. Just what your campus is actually
            thinking this week — then it&apos;s gone. The best posts aren&apos;t
            chasing anything. They&apos;re just true.
          </p>
        </div>

        {/* Right — the app screen, leaning toward the cursor. */}
        <TiltCard className="w-full max-w-sm sm:max-w-md mx-auto md:mx-0 md:justify-self-end">
          <div
            className="rounded-[2rem] p-6 sm:p-7 shadow-2xl"
            style={{
              background: "var(--card-orange)",
              color: "var(--card-ink)",
              border: "1.5px solid color-mix(in srgb, var(--card-ink) 10%, transparent)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <Chip>
                <span style={{ fontSize: 18, lineHeight: 1, marginTop: -2 }}>‹</span>
              </Chip>
              <Chip>
                <span style={{ fontSize: 16, lineHeight: 1 }}>···</span>
              </Chip>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <span
                className="inline-flex items-center justify-center rounded-full text-xs font-bold"
                style={{
                  width: 40,
                  height: 40,
                  background: "color-mix(in srgb, var(--card-ink) 14%, transparent)",
                }}
              >
                lk
              </span>
              <div className="leading-tight">
                <p className="font-bold text-sm">leo.k</p>
                <p className="text-xs" style={{ color: "var(--card-ink-secondary)" }}>
                  14m
                </p>
              </div>
            </div>

            <h3
              className="font-extrabold tracking-tight mb-3"
              style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(1.6rem, 5.5vw, 2.1rem)", lineHeight: 1.02 }}
            >
              someone&apos;s dog got loose by the science building
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--card-ink-secondary)" }}>
              he&apos;s having the best day of his life. i tried to catch him and
              now i&apos;m also having a great day. we&apos;re just running now,
              honestly.
            </p>

            <div
              className="pt-5 mb-5 space-y-4"
              style={{ borderTop: "1.5px solid color-mix(in srgb, var(--card-ink) 10%, transparent)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--card-ink-secondary)" }}>
                comments
              </p>
              <Comment who="aria.m" text="update. did you catch him" />
              <Comment who="leo.k" text="he caught me" />
            </div>

            {/* The reply bar, mid-thought — the app's pill + send. */}
            <div className="flex items-center gap-2.5">
              <Chip>
                <span style={{ fontSize: 13, lineHeight: 1 }}>✕</span>
              </Chip>
              <div
                className="flex-1 min-w-0 rounded-full px-4 py-2.5 text-sm truncate"
                style={{
                  background: "color-mix(in srgb, var(--card-ink) 6%, transparent)",
                  color: "var(--card-ink)",
                }}
              >
                this is the best thing i&apos;ve read all week
                <span
                  className="inline-block w-px h-4 align-middle ml-0.5"
                  style={{ background: "var(--card-ink)" }}
                  aria-hidden
                />
              </div>
              <span
                aria-hidden
                className="inline-flex items-center justify-center rounded-full shrink-0"
                style={{ width: 38, height: 38, background: "var(--card-ink)", color: "var(--card-orange)" }}
              >
                <span style={{ fontSize: 18, lineHeight: 1, marginTop: -1 }}>↑</span>
              </span>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
