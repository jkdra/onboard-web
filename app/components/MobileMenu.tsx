"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      <button 
        className="md:hidden p-2 -mr-2 flex flex-col justify-center items-end gap-1.5 w-10 h-10"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block h-[2px] transition-all origin-center ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} style={{ background: "var(--text)" }} />
        <span className={`block h-[2px] transition-all ${isOpen ? "w-0 opacity-0" : "w-5"}`} style={{ background: "var(--text)" }} />
        <span className={`block h-[2px] transition-all origin-center ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4"}`} style={{ background: "var(--text)" }} />
      </button>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 p-6 md:hidden flex flex-col gap-6 text-sm font-semibold uppercase tracking-widest shadow-lg"
          style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}
        >
          <Link href="/about" className="hover:opacity-60 transition-opacity" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/privacy" className="hover:opacity-60 transition-opacity" onClick={() => setIsOpen(false)}>Privacy</Link>
          <Link href="/terms" className="hover:opacity-60 transition-opacity" onClick={() => setIsOpen(false)}>Terms</Link>
          <Link href="/contact" className="hover:opacity-60 transition-opacity" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </>
  );
}
