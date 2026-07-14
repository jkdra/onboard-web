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
      <div className="max-w-xl mx-auto px-6 text-center mb-2">
        <h1 className="font-bold text-sm mb-2" style={{ color: "var(--text)" }}>On Board</h1>
        <p className="leading-relaxed">
          On Board is a weekly digital bulletin board for college campuses. It provides a dedicated space for students to securely log in, post local updates, share items, and connect with their community. Every Monday at midnight, the board wipes clean for a fresh start.
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        <span className="opacity-30">·</span>
        <Link href="/terms" className="hover:underline">Terms of Service</Link>
        <span className="opacity-30">·</span>
        <Link href="/contact" className="hover:underline">Contact</Link>
      </div>

      {theme !== null && (
        <div
          className="inline-flex items-center gap-1 p-1 rounded-full text-xs font-medium"
          style={{ 
            background: "var(--card)", 
            border: "1px solid var(--border)"
          }}
        >
          <button
            onClick={() => handleThemeChange("system")}
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

      <p className="text-xs opacity-50">
        © 2026 On Board. All rights reserved.
      </p>
    </footer>
  );
}
