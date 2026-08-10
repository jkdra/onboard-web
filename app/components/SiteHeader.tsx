"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HoverLogo from "@/app/components/HoverLogo";
import MobileMenu from "@/app/components/MobileMenu";
import { APP_STORE_URL } from "@/lib/appStore";

// The header trades legal links for the conversion CTA once the hero's own
// Download button scrolls away: Privacy/Terms collapse out (they keep their
// footer and mobile-menu homes), and "Download Now" fades into the trailing
// corner. Pages without a hero CTA (every subpage) show the button from the
// start. Both directions animate — the swap follows the scroll, it doesn't
// latch.
export default function SiteHeader() {
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const target = document.getElementById("hero-cta");
    if (!target) {
      setShowCta(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setShowCta(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

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
      <nav className="hidden md:flex items-center text-sm font-semibold uppercase tracking-widest">
        {/* Privacy + Terms collapse (width + fade) when the CTA takes the
            corner, so Contact/About glide left instead of leaving a hole. */}
        <span
          aria-hidden={showCta}
          className="flex items-center gap-6 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out"
          style={{
            maxWidth: showCta ? 0 : 220,
            opacity: showCta ? 0 : 1,
            marginRight: showCta ? 0 : 24,
            pointerEvents: showCta ? "none" : "auto",
          }}
        >
          <Link href="/privacy" tabIndex={showCta ? -1 : 0} className="hover:opacity-60 transition-opacity">Privacy</Link>
          <Link href="/terms" tabIndex={showCta ? -1 : 0} className="hover:opacity-60 transition-opacity">Terms</Link>
        </span>
        <span className="flex items-center gap-6">
          <Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
        </span>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-hidden={!showCta}
          tabIndex={showCta ? 0 : -1}
          className="ml-6 px-4 py-2 rounded-full normal-case tracking-normal text-sm font-bold transition-all duration-300 ease-out hover:opacity-85"
          style={{
            background: "var(--text)",
            color: "var(--bg)",
            opacity: showCta ? 1 : 0,
            transform: showCta ? "none" : "translateY(-6px)",
            pointerEvents: showCta ? "auto" : "none",
          }}
        >
          Download Now
        </a>
      </nav>

      <MobileMenu />
      </div>
    </header>
  );
}
