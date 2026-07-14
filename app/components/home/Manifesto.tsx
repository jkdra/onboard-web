const STATEMENTS = [
  {
    n: "01",
    title: "Post to the board.",
    body: "Say what's on your mind. The whole campus sees it.",
  },
  {
    n: "02",
    title: "Fresh every week.",
    body: "Monday at midnight, it's wiped. Start again.",
  },
  {
    n: "03",
    title: "Students only.",
    body: "Your campus email gets you in. Nobody else.",
  },
  {
    n: "04",
    title: "React & comment.",
    body: "React, reply, repeat.",
  },
];

export default function Manifesto() {
  return (
    <section className="px-6 md:px-10 py-24">
      <div className="max-w-6xl mx-auto">
        {STATEMENTS.map((s) => (
          <div
            key={s.n}
            className="scroll-reveal py-10 md:py-14 grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-12 items-baseline"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span
              className="font-extrabold text-ghost"
              style={{ fontSize: "var(--step-2)" }}
            >
              {s.n}
            </span>
            <div>
              <h2
                className="font-extrabold tracking-tight"
                style={{ fontSize: "var(--step-3)", lineHeight: 1.05 }}
              >
                {s.title}
              </h2>
              <p
                className="mt-3 max-w-lg"
                style={{ fontSize: "var(--step-0)", color: "var(--text-secondary)" }}
              >
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
