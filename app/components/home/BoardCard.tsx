const COLORS = {
  green: "var(--card-green)",
  orange: "var(--card-orange)",
  blue: "var(--card-blue)",
  pink: "var(--card-pink)",
  indigo: "var(--card-indigo)",
  teal: "var(--card-teal)",
} as const;

// Tie-break order mirrors the app: Like, Dislike, Laugh, Hug.
const REACTION_ORDER = [
  { key: "like", icon: "❤️" },
  { key: "dislike", icon: "👎" },
  { key: "laugh", icon: "💀" },
  { key: "hug", icon: "🫂" },
] as const;

export type Reactions = Partial<
  Record<(typeof REACTION_ORDER)[number]["key"], number>
>;

/** One styled line of post content — the app's dynamic typography, where
 * authors compose their own titles, subtitles, bullets, and emphasis
 * instead of filling a fixed title/description pair. */
export type PostLine = {
  kind: "title" | "subtitle" | "body" | "bullet";
  text: string;
  em?: "bold" | "italic";
};

export type BoardCardProps = {
  color: keyof typeof COLORS;
  /** Optional — posts aren't a strict title/description pair anymore. A
   * body-only card renders its body at display size, like the app's
   * body-only tier. */
  title?: string;
  body?: string;
  /** Full dynamic-typography content; takes precedence over title/body. */
  lines?: PostLine[];
  tags?: string[];
  reactions?: Reactions;
  timestamp?: string;
  className?: string;
  style?: React.CSSProperties;
};

function lineClass(line: PostLine, hasTitle: boolean): string {
  const em = line.em === "bold" ? " font-bold" : line.em === "italic" ? " italic" : "";
  switch (line.kind) {
    case "title":
      return "font-extrabold text-sm sm:text-lg leading-snug tracking-tight" + em;
    case "subtitle":
      return "font-bold text-xs sm:text-sm leading-snug tracking-tight" + em;
    case "bullet":
    case "body":
      return (hasTitle
        ? "text-xs sm:text-sm leading-relaxed"
        : "font-extrabold text-sm sm:text-xl leading-snug tracking-tight") + em;
  }
}

function topThree(reactions: Reactions) {
  return REACTION_ORDER.map((r, i) => ({ ...r, i, count: reactions[r.key] ?? 0 }))
    .sort((a, b) => b.count - a.count || a.i - b.i)
    .slice(0, 3);
}

export default function BoardCard({
  color,
  title,
  body,
  lines,
  tags,
  reactions,
  className,
  style,
}: BoardCardProps) {
  // title/body sugar compiles down to lines — one rendering path.
  const content: PostLine[] =
    lines ??
    [
      ...(title ? [{ kind: "title", text: title } as PostLine] : []),
      ...(body ? [{ kind: "body", text: body } as PostLine] : []),
    ];
  const hasTitle = content.some((l) => l.kind === "title" || l.kind === "subtitle");
  return (
    <div
      className={`rounded-3xl p-3.5 sm:p-5 w-full aspect-[4/5] flex flex-col overflow-hidden ${className ?? ""}`}
      style={{
        background: COLORS[color],
        color: "var(--card-ink)",
        border: "1.5px solid color-mix(in srgb, var(--card-ink) 12%, transparent)",
        ...style,
      }}
    >
      {/* The content column flexes and clips behind a soft fade, so the
          fixed-height card never squishes tags or reactions. Lines carry the
          author's own typography — title, subtitle, bullets, emphasis — the
          app's dynamic system, not a fixed title/description pair. */}
      <div className="relative flex-1 min-h-0 mb-2 sm:mb-3">
        <div className="h-full overflow-hidden space-y-1">
          {content.map((line, i) => (
            <p
              key={i}
              className={lineClass(line, hasTitle) + (line.kind === "bullet" ? " flex gap-1.5" : "")}
              style={{
                color:
                  line.kind === "title" || line.kind === "subtitle" || !hasTitle
                    ? "var(--card-ink)"
                    : "var(--card-ink-secondary)",
              }}
            >
              {line.kind === "bullet" && <span aria-hidden>•</span>}
              <span>{line.text}</span>
            </p>
          ))}
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-6 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${COLORS[color]})` }}
        />
      </div>
      {tags && tags.length > 0 && (
        <div className="shrink-0 flex flex-wrap gap-1.5 mb-2 sm:mb-3">
          {tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
              style={{ background: "rgba(127, 127, 127, 0.18)" }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
      <div
        className="shrink-0 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm pt-1 whitespace-nowrap overflow-hidden"
        style={{ color: "var(--card-ink-secondary)" }}
      >
        {topThree(reactions ?? {}).map((r, i) => (
          <span key={r.key} className="flex items-center gap-1 shrink-0">
            {i > 0 && <span className="opacity-40 mr-0.5 sm:mr-1">·</span>}
            <span aria-hidden>{r.icon}</span> {r.count}
          </span>
        ))}
      </div>
    </div>
  );
}
