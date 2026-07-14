// The weekly prompt card — monochrome, countdown, logo peeking from the corner,
// mirroring the app's top-of-board card.
export default function PromptCard({
  prompt,
  className,
  style,
}: {
  prompt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-5 w-56 sm:w-60 min-h-[19rem] shrink-0 flex flex-col ${className ?? ""}`}
      style={{
        background: "var(--card)",
        color: "var(--text)",
        border: "1.5px solid var(--border)",
        ...style,
      }}
    >
      <p className="font-bold text-lg leading-snug tracking-tight">{prompt}</p>
      <div className="mt-auto relative z-10">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: "var(--text-secondary)" }}
        >
          Clears Monday
        </p>
        <p className="font-extrabold text-2xl tabular-nums">
          6<span className="text-sm font-semibold opacity-50">d</span> 23
          <span className="text-sm font-semibold opacity-50">h</span> 59
          <span className="text-sm font-semibold opacity-50">m</span>
        </p>
      </div>
      {/* The little guy, peeking out of the corner. */}
      <span
        aria-hidden
        className="absolute -right-6 -bottom-5 opacity-10"
        style={{
          width: 110,
          height: 110,
          background: "var(--text)",
          WebkitMaskImage: "url(/logo.svg)",
          maskImage: "url(/logo.svg)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          transform: "rotate(-12deg)",
        }}
      />
    </div>
  );
}
