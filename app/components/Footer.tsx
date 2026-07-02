"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as "system" | "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: "system" | "light" | "dark") => {
    setTheme(newTheme);
    if (newTheme === "system") {
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("data-theme");
    } else {
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  return (
    <footer
      className="py-12 text-center text-sm flex flex-col items-center gap-6"
      style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}
    >
      <div className="flex items-center gap-4">
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        <span className="opacity-30">·</span>
        <Link href="/terms" className="hover:underline">Terms of Service</Link>
      </div>

      {mounted && (
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
