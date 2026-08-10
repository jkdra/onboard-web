const STAGES = [
  { label: "Closed Beta", status: "current" as const },
  { label: "Early Access", status: "next" as const },
  { label: "Public Launch", status: "later" as const },
];

// The interactive "try posting" demo that used to live here is retired:
// it was built on the old fixed title/description form the app no longer
// has, and the board scene above already shows real posting better than a
// toy composer could.
export default function ComingSoon() {
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="rail">
        <h2
          className="font-extrabold tracking-tight mb-10"
          style={{ fontSize: "var(--step-4)", lineHeight: 1.02 }}
        >
          We&apos;re already testing it.
        </h2>

        <ol className="flex flex-wrap items-center justify-start gap-3 mb-4">
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
          Live at Irvine Valley College, with more SoCal campuses on the way. You guys are lucky (well, if you have an iPhone).
        </p>
        <p style={{ fontSize: "var(--step-1)", color: "var(--text-secondary)" }}>
          Hang tight, Android warriors—we&apos;ll get to you soon.
        </p>
      </div>
    </section>
  );
}
