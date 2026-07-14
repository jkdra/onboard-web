"use client";

import { useState } from "react";

// Swaps to the happy mark on hover — used at the hero corner and header.
export default function HoverLogo({
  size,
  className,
  style,
}: {
  size: number | string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      aria-hidden
      className={className}
      style={{ display: "inline-block", width: size, height: size, ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        aria-hidden
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "var(--text)",
          WebkitMaskImage: `url(${hovered ? "/logo-happy.svg" : "/logo.svg"})`,
          maskImage: `url(${hovered ? "/logo-happy.svg" : "/logo.svg"})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </span>
  );
}
