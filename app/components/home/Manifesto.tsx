const RULES = [
  {
    title: "post whatever.",
    body: "a thought, a warning, a confession at 2am. no followers to perform for — the whole campus just sees it.",
  },
  {
    title: "it all clears monday.",
    body: "every week opens empty. nothing you post sticks around, and that's the point.",
  },
  {
    title: "students only.",
    body: "your campus email is the entire door. no strangers, no bots, nobody from back home.",
  },
  {
    title: "react, reply, repeat.",
    body: "❤️ 💀 🫂, or just say something back. that's the whole app.",
  },
];

export default function Manifesto() {
  return (
    <section className="px-6 md:px-10 py-24" aria-label="How the board works">
      <div className="max-w-6xl mx-auto">
        <p
          className="scroll-reveal mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em]"
          style={{ color: "var(--text-secondary)" }}
        >
          how the board works
        </p>
        {RULES.map((r) => (
          <div
            key={r.title}
            className="scroll-reveal py-10 md:py-12"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <h2
              className="font-extrabold tracking-tight"
              style={{ fontSize: "var(--step-3)", lineHeight: 1.03 }}
            >
              {r.title}
            </h2>
            <p
              className="mt-3 max-w-lg"
              style={{ fontSize: "var(--step-0)", color: "var(--text-secondary)" }}
            >
              {r.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
