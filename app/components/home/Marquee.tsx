const LINES = [
  "Post",
  "React",
  "Comment",
  "Repeat",
  "Clears Monday",
  "Students only",
  "One board",
  "Whole campus",
];

function Row() {
  return (
    <div className="flex items-center shrink-0">
      {LINES.map((line) => (
        <span
          key={line}
          className="text-ghost font-extrabold whitespace-nowrap px-6"
          style={{ fontSize: "var(--step-3)" }}
        >
          {line} <span aria-hidden>✳</span>
        </span>
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
