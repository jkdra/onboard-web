import Footer from "@/app/components/Footer";

export default function FooterFinale() {
  return (
    <div className="overflow-hidden">
      <div className="px-6 md:px-10 pt-24 pb-10">
        <p
          className="font-extrabold tracking-tight leading-none select-none"
          style={{
            // Wordmark scaled to fill the row — decorative, so no 2.5× cap needed,
            // but keep a rem floor for zoom.
            fontSize: "clamp(3rem, 1rem + 12vw, 12rem)",
            fontFamily: "var(--font-display, 'Zalando Sans Expanded'), ui-sans-serif, system-ui, sans-serif",
          }}
          aria-hidden
        >
          On Board<span className="text-ghost">.</span>
        </p>
      </div>
      <Footer />
    </div>
  );
}
