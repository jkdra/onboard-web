import Link from "next/link";
import HoverLogo from "@/app/components/HoverLogo";
import MobileMenu from "@/app/components/MobileMenu";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 py-6 z-50">
      <span aria-hidden className="header-veil" />
      <span aria-hidden className="header-tint" />
      {/* z-50: keeps the wordmark and hamburger crisp above the mobile
          menu's fixed z-40 veil (a child of this header's stacking context). */}
      <div className="rail relative z-50 flex items-center justify-between">
      {/* relative z-50: the mobile menu's veil mounts inside this rail's
          stacking context, so the wordmark needs its own z to stay crisp. */}
      <Link href="/" aria-label="On Board home" className="relative z-50 flex items-center gap-3 group">
        <HoverLogo size={36} />
        <span className="font-extrabold tracking-tight pt-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem" }}>
          On Board
        </span>
      </Link>
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold uppercase tracking-widest">
        <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
        <Link href="/privacy" className="hover:opacity-60 transition-opacity">Privacy</Link>
        <Link href="/terms" className="hover:opacity-60 transition-opacity">Terms</Link>
        <Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
      </nav>

      <MobileMenu />
      </div>
    </header>
  );
}
