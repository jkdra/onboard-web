"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
] as const;

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // The open menu owns the viewport — the page behind it shouldn't scroll.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Hamburger Toggle — stays above the veil so the ✕ is reachable. */}
      <button
        className="md:hidden relative z-50 p-2 -mr-2 flex flex-col justify-center items-end gap-1.5 w-10 h-10"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className={`block h-[2px] transition-all origin-center ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} style={{ background: "var(--text)" }} />
        <span className={`block h-[2px] transition-all ${isOpen ? "w-0 opacity-0" : "w-5"}`} style={{ background: "var(--text)" }} />
        <span className={`block h-[2px] transition-all origin-center ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4"}`} style={{ background: "var(--text)" }} />
      </button>

      {/* Full-viewport veil: the page stays visible behind a heavy blur +
          theme-tinted wash instead of being replaced by a hard sheet, and
          the items drop DOWN out of the header they belong to. */}
      {isOpen && (
        <div
          className="menu-veil-in fixed inset-0 z-40 md:hidden"
          style={{
            background: "color-mix(in srgb, var(--bg) 72%, transparent)",
            WebkitBackdropFilter: "blur(18px)",
            backdropFilter: "blur(18px)",
          }}
          onClick={() => setIsOpen(false)}
        >
          <nav
            className="rail flex flex-col gap-7 pt-28 text-base font-semibold uppercase tracking-widest"
            onClick={(e) => e.stopPropagation()}
          >
            {LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="menu-item-in hover:opacity-60 transition-opacity"
                style={{ "--menu-i": i } as React.CSSProperties}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
