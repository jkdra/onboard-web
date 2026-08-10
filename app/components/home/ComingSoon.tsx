// The interactive "try posting" demo that used to live here is retired:
// it was built on the old fixed title/description form the app no longer
// has, and the board scene above already shows real posting better than a
// toy composer could.
export default function ComingSoon() {
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="rail">
        <h2
          className="font-extrabold tracking-tight mb-8"
          style={{ fontSize: "var(--step-4)", lineHeight: 1.02 }}
        >
          Coming to a campus near you. Soon.
        </h2>
        <p
          className="max-w-2xl"
          style={{ fontSize: "var(--step-1)", lineHeight: 1.45, color: "var(--text-secondary)", textWrap: "balance" }}
        >
          SoCal colleges are getting a new home for college life. iPhone only
          for now, but we&apos;ll get to you soon, Android warriors.
        </p>
      </div>
    </section>
  );
}
