const COLORS = {
  green: "var(--card-green)",
  orange: "var(--card-orange)",
  blue: "var(--card-blue)",
  pink: "var(--card-pink)",
} as const;

export type BoardCardProps = {
  color: keyof typeof COLORS;
  title: string;
  body: string;
  tags?: string[];
  reactions?: { icon: string; count: number }[];
  timestamp?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function BoardCard({
  color,
  title,
  body,
  tags,
  reactions,
  timestamp,
  className,
  style,
}: BoardCardProps) {
  return (
    <div
      className={`rounded-3xl p-5 w-64 sm:w-72 shrink-0 ${className ?? ""}`}
      style={{ background: COLORS[color], color: "var(--card-ink)", ...style }}
    >
      <h3 className="font-extrabold text-lg leading-snug tracking-tight mb-2">
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-3"
        style={{ color: "var(--card-ink-secondary)" }}
      >
        {body}
      </p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((t) => (
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
      {(reactions || timestamp) && (
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--card-ink-secondary)" }}
        >
          {reactions?.map((r, i) => (
            <span key={r.icon} className="flex items-center gap-1">
              {i > 0 && <span className="opacity-40 mr-1">·</span>}
              <span aria-hidden>{r.icon}</span> {r.count}
            </span>
          ))}
          {timestamp && <span className="ml-auto">{timestamp}</span>}
        </div>
      )}
    </div>
  );
}
