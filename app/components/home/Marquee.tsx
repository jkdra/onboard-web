const LINES = ["Share", "React", "Clear", "Repeat"];

function Row() {
  return (
    <div className="flex items-center shrink-0">
      {LINES.map((line) => (
        <div key={line} className="flex items-center shrink-0">
          <span
            className="text-ghost font-extrabold uppercase whitespace-nowrap px-6"
            style={{ fontSize: "var(--step-3)", fontFamily: "var(--font-display)" }}
          >
            {line}
          </span>
          <span
            aria-hidden
            className="text-ghost font-extrabold leading-none"
            style={{ fontSize: "var(--step-3)" }}
          >
            ＊
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee overflow-hidden py-10" aria-label="Post, react, comment, repeat — clears Monday">
      <div className="marquee-track">
        <Row />
        <div aria-hidden>
          <Row />
        </div>
      </div>
    </section>
  );
}
