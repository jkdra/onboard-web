"use client";

import { useRef } from "react";

// The one web-native flourish: the card leans toward the cursor. A touchscreen
// can't do this — it's the site's small proof that it knows it's on the web.
// Disabled entirely for coarse pointers (touch) and reduced-motion visitors;
// falls back to a plain, static card.
export default function TiltCard({
  children,
  max = 7,
  className,
  style,
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ perspective: 1000 }}
      className={className}
    >
      <div
        ref={ref}
        style={{
          transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
          transformStyle: "preserve-3d",
          willChange: "transform",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}
