export default function ComingSoon() {
  return (
    <section className="px-6 md:px-10 py-32 text-center">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-extrabold tracking-tight mb-6"
          style={{ fontSize: "var(--step-4)", lineHeight: 1.02 }}
        >
          Coming to iOS this fall semester.
        </h2>
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
