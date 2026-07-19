import Link from "next/link";
import HoverLogo from "@/app/components/HoverLogo";

export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-6">
      <Link href="/" aria-label="On Board home">
        <HoverLogo size={36} />
      </Link>
      <nav className="flex items-center gap-2.5 sm:gap-4 md:gap-6 text-[11px] sm:text-sm font-semibold uppercase tracking-wide sm:tracking-widest">
        <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
        <Link href="/privacy" className="hover:opacity-60 transition-opacity">Privacy</Link>
        <Link href="/terms" className="hover:opacity-60 transition-opacity">Terms</Link>
        <Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
      </nav>
    </header>
  );
}
