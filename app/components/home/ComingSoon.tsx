const STAGES = [
  { label: "Closed Beta", status: "current" as const },
  { label: "Open Beta", status: "next" as const },
  { label: "Public Launch", status: "later" as const },
];

export default function ComingSoon() {
  return (
    <section className="px-6 md:px-10 py-32 text-center">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-extrabold tracking-tight mb-10"
          style={{ fontSize: "var(--step-4)", lineHeight: 1.02 }}
        >
          We&apos;re already testing it.
        </h2>

        <ol className="flex flex-wrap items-center justify-center gap-3 mb-4">
          {STAGES.map((stage, i) => (
            <li key={stage.label} className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full"
                style={
                  stage.status === "current"
                    ? { background: "var(--text)", color: "var(--bg)" }
                    : {
                        background: "transparent",
                        color: "var(--text-secondary)",
                        border: "1.5px solid var(--border)",
                      }
                }
              >
                {stage.status === "current" && (
                  <span
                    aria-hidden
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--bg)" }}
                  />
                )}
                {stage.label}
              </span>
              {i < STAGES.length - 1 && (
                <span aria-hidden style={{ color: "var(--text-secondary)" }}>
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <p
          className="mb-14"
          style={{ fontSize: "var(--step-0)", color: "var(--text-secondary)" }}
        >
          Public launch lands this fall.
        </p>

        <p
          className="mb-2"
          style={{ fontSize: "var(--step-1)", color: "var(--text-secondary)" }}
        >
          IVC, you folks are lucky. Well, if you have an iPhone.
        </p>
        <p style={{ fontSize: "var(--step-1)", color: "var(--text-secondary)" }}>
          We&apos;ll get to you soon, Android warriors.
        </p>
      </div>
    </section>
  );
}
