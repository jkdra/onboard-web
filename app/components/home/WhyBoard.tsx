export default function WhyBoard() {
  return (
    <section className="px-6 md:px-10 py-28 md:py-40" aria-label="Why On Board exists">
      <div className="max-w-6xl w-full mx-auto text-center">
        <h2
          className="scroll-reveal font-extrabold tracking-tight"
          style={{ fontSize: "var(--step-4)", lineHeight: 0.98 }}
        >
          <span className="block">Commuting</span>
          <span className="block">means</span>
          <span className="block">missing out.</span>
        </h2>
        <p
          className="scroll-reveal mt-10 max-w-lg mx-auto"
          style={{ fontSize: "var(--step-0)", lineHeight: 1.5, color: "var(--text-secondary)" }}
        >
          Bulletin boards get ignored. So we brought the board to the one
          thing every student already checks.
        </p>

        <div
          className="scroll-reveal mt-14 flex items-center justify-center gap-2.5 flex-wrap"
          style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}
        >
          <span>A board nobody walks past</span>
          <span aria-hidden>→</span>
          <span className="font-semibold" style={{ color: "var(--text)" }}>
            a board in your pocket
          </span>
        </div>
      </div>
    </section>
  );
}
