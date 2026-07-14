const LINES = [
  "the squirrels are getting too brave",
  "lost: black hydroflask, do not crash",
  "selling math239 textbook $40",
  "anyone else fail the cs241 midterm",
  "brat is literally album of the year",
  "free pizza in the quad rn",
  "who keeps unplugging the vending machine",
  "study group for bio, we have snacks",
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
    <section className="marquee overflow-hidden py-10" aria-label="Recent posts from campus boards">
      <div className="marquee-track">
        <Row />
        <div aria-hidden>
          <Row />
        </div>
      </div>
    </section>
  );
}
