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

export type BoardCardProps = {
  color: keyof typeof COLORS;
  title: string;
  body: string;
  tags?: string[];
  reactions?: Reactions;
  timestamp?: string;
  className?: string;
  style?: React.CSSProperties;
};

function topThree(reactions: Reactions) {
  return REACTION_ORDER.map((r, i) => ({ ...r, i, count: reactions[r.key] ?? 0 }))
    .sort((a, b) => b.count - a.count || a.i - b.i)
    .slice(0, 3);
}

export default function BoardCard({
  color,
  title,
  body,
  tags,
  reactions,
  className,
  style,
}: BoardCardProps) {
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
      <h3 className="shrink-0 font-extrabold text-sm sm:text-lg leading-snug tracking-tight mb-1.5 sm:mb-2 line-clamp-2">
        {title}
      </h3>
      {/* Body is the only element that flexes: it fills the slack on short posts
          and clips (behind a soft fade) on long ones, so the fixed-height card
          never squishes the title or reactions. */}
      <div className="relative flex-1 min-h-0 mb-2 sm:mb-3">
        <p
          className="h-full overflow-hidden text-xs sm:text-sm leading-relaxed"
          style={{ color: "var(--card-ink-secondary)" }}
        >
          {body}
        </p>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-6 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${COLORS[color]})` }}
        />
      </div>
      {tags && tags.length > 0 && (
        <div className="shrink-0 hidden sm:flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
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
