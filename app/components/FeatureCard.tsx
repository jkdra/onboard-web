"use client";

import { useRef, useState } from "react";

type PopMark = {
  id: number;
  x: number;
  y: number;
  rotation: number;
};

export default function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  const [marks, setMarks] = useState<PopMark[]>([]);
  const nextId = useRef(0);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = nextId.current++;
    setMarks((prev) => [
      ...prev,
      {
        id,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        rotation: Math.random() * 28 - 12, // -12deg .. +16deg, skewed right to counter the logo's left lean
      },
    ]);
  }

  function handleMarkEnd(id: number) {
    setMarks((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div
      onClick={handleClick}
      className="feature-card relative rounded-2xl p-7 cursor-pointer"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <span className="text-3xl block mb-4">{icon}</span>
      <h3 className="font-bold text-base mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {body}
      </p>
      {marks.map((m) => (
        <span
          key={m.id}
          onAnimationEnd={() => handleMarkEnd(m.id)}
          className="pop-mark"
          style={
            {
              left: m.x,
              top: m.y,
              "--r": `${m.rotation}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
