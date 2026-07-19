import Link from "next/link";
import HoverLogo from "@/app/components/HoverLogo";
import MobileMenu from "@/app/components/MobileMenu";

export default function SiteHeader() {
  return (
    <header className="relative flex items-center justify-between px-6 md:px-10 py-6 z-50">
      <Link href="/" aria-label="On Board home">
        <HoverLogo size={36} />
      </Link>
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold uppercase tracking-widest">
        <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
        <Link href="/privacy" className="hover:opacity-60 transition-opacity">Privacy</Link>
        <Link href="/terms" className="hover:opacity-60 transition-opacity">Terms</Link>
        <Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
      </nav>

      <MobileMenu />
    </header>
  );
}
