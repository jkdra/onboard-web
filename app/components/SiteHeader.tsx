import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-6">
      <Link href="/" aria-label="On Board home">
        <span
          aria-hidden
          className="block"
          style={{
            width: 36,
            height: 36,
            background: "var(--text)",
            WebkitMaskImage: "url(/logo.svg)",
            maskImage: "url(/logo.svg)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </Link>
      <Link
        href="/changelog"
        className="text-sm font-semibold uppercase tracking-widest hover:opacity-60 transition-opacity"
      >
        Changelog
      </Link>
    </header>
  );
}
