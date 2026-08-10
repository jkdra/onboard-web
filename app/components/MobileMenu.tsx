"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { APP_STORE_URL } from "@/lib/appStore";

const LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
] as const;

export default function MobileMenu() {
  // Three phases so closing can ANIMATE: the items rise back up into the
  // header (reverse of entry) while the veil fades, then the portal
  // unmounts. Entry showed where the menu came from; exit shows where it
  // returns to.
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");
  const isOpen = phase === "open";
  const open = () => setPhase("open");
  const close = () => {
    setPhase("closing");
    window.setTimeout(() => setPhase("closed"), 420);
  };

  // The open menu owns the viewport — the page behind it shouldn't
  // scroll, and the header's own veil stands down (data attribute read by
  // globals.css) so its gradient band doesn't smear over the menu's flat
  // wash.
  useEffect(() => {
    if (phase === "closed") return;
    // Scroll lock via non-passive event capture, deliberately NOT via CSS
    // overflow: `overflow:hidden` on body breaks position:sticky for its
    // descendants (the header un-stuck and jumped off-screen the moment
    // the menu opened), and on html it resets the scroll position to 0
    // (the page behind the veil snapped to the top). Swallowing the
    // gestures leaves both intact.
    const prevent = (e: Event) => e.preventDefault();
    document.addEventListener("wheel", prevent, { passive: false });
    document.addEventListener("touchmove", prevent, { passive: false });
    document.documentElement.dataset.menuOpen = "true";
    return () => {
      document.removeEventListener("wheel", prevent);
      document.removeEventListener("touchmove", prevent);
      delete document.documentElement.dataset.menuOpen;
    };
  }, [phase]);

  return (
    <>
      {/* Mobile Hamburger Toggle — stays above the veil so the ✕ is reachable. */}
      <button
        className="md:hidden relative z-50 p-2 -mr-2 flex flex-col justify-center items-end gap-1.5 w-10 h-10"
        onClick={() => (isOpen ? close() : open())}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className={`block h-[2px] transition-all origin-center ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} style={{ background: "var(--text)" }} />
        <span className={`block h-[2px] transition-all ${isOpen ? "w-0 opacity-0" : "w-5"}`} style={{ background: "var(--text)" }} />
        <span className={`block h-[2px] transition-all origin-center ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4"}`} style={{ background: "var(--text)" }} />
      </button>

      {/* Full-viewport veil: the page stays visible behind a heavy blur +
          theme-tinted wash instead of being replaced by a hard sheet, and
          the items drop DOWN out of the header they belong to. PORTALED to
          <body>: as a header descendant, the fixed veil lived inside the
          sticky header's stacking context, and once the header was stuck
          it swallowed the wordmark and this very ✕ button — document-level
          z (header 50 > veil 40) is unambiguous. Client-only state, so the
          portal never runs during SSR. */}
      {phase !== "closed" && createPortal(
        <div
          className={`${phase === "closing" ? "menu-veil-out" : "menu-veil-in"} fixed inset-0 z-40 md:hidden`}
          style={{
            background: "color-mix(in srgb, var(--bg) 72%, transparent)",
            WebkitBackdropFilter: "blur(18px)",
            backdropFilter: "blur(18px)",
          }}
          onClick={close}
        >
          <nav
            className="rail flex flex-col gap-7 pt-28 text-base font-semibold uppercase tracking-widest"
            onClick={(e) => e.stopPropagation()}
          >
            {LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${phase === "closing" ? "menu-item-out" : "menu-item-in"} hover:opacity-60 transition-opacity`}
                style={{ "--menu-i": phase === "closing" ? LINKS.length - i : i } as React.CSSProperties}
                onClick={close}
              >
                {link.label}
              </Link>
            ))}
            {/* The download CTA rides the same list — bottom of the stack,
                so it's first out on close (reverse stagger index 0). */}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${phase === "closing" ? "menu-item-out" : "menu-item-in"} font-bold`}
              style={{ "--menu-i": phase === "closing" ? 0 : LINKS.length } as React.CSSProperties}
              onClick={close}
            >
              Download Now
            </a>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}
