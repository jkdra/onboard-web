import Link from "next/link";

const RULES: { title: string; body: React.ReactNode }[] = [
  {
    title: "post whatever.",
    body: (
      <>
        Social mixers, club meetings, class help, or if you just want to
        shitpost. We don&apos;t care. Well as long as it doesn&apos;t break
        our{" "}
        <Link href="/terms" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
          terms
        </Link>
        .
      </>
    ),
  },
  {
    title: "it all clears monday.",
    body: "Every week's a blank slate. That means fresh stuff each week. Don't worry, you can still see prior weeks. You can't do that with real bulletin boards.",
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
    <section className="py-24" aria-label="How the board works">
      <div className="rail">
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
