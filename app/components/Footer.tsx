"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

type Theme = "system" | "light" | "dark";

const THEME_EVENT = "onboard-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getSnapshot(): Theme | null {
  return (localStorage.getItem("theme") as Theme | null) ?? "system";
}

function getServerSnapshot(): Theme | null {
  return null;
}

export default function Footer() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleThemeChange = (newTheme: Theme) => {
    if (newTheme === "system") {
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("data-theme");
    } else {
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <footer
      className="py-12 text-center text-sm flex flex-col items-center gap-6"
      style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
          <p className="text-xs opacity-50 text-center md:text-left">
            © 2026 On Board. All rights reserved.
          </p>
        </div>

        {theme !== null && (
          <div
            role="group"
            aria-label="Theme"
            className="inline-flex items-center gap-1 p-1 rounded-full text-xs font-medium shrink-0"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)"
            }}
          >
            <button
              onClick={() => handleThemeChange("system")}
              aria-pressed={theme === "system"}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                theme === "system" ? "shadow-sm font-semibold" : "opacity-60 hover:opacity-100"
              }`}
              style={{
                background: theme === "system" ? "var(--bg)" : "transparent",
                color: theme === "system" ? "var(--text)" : "inherit"
              }}
            >
              System
            </button>
            <button
              onClick={() => handleThemeChange("light")}
              aria-pressed={theme === "light"}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                theme === "light" ? "shadow-sm font-semibold" : "opacity-60 hover:opacity-100"
              }`}
              style={{
                background: theme === "light" ? "var(--bg)" : "transparent",
                color: theme === "light" ? "var(--text)" : "inherit"
              }}
            >
              Light
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              aria-pressed={theme === "dark"}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                theme === "dark" ? "shadow-sm font-semibold" : "opacity-60 hover:opacity-100"
              }`}
              style={{
                background: theme === "dark" ? "var(--bg)" : "transparent",
                color: theme === "dark" ? "var(--text)" : "inherit"
              }}
            >
              Dark
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
