"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "motion/react";
import BoardCard, { BoardCardProps } from "@/app/components/home/BoardCard";

// Drop PNGs into public/screenshots/ and list them here to replace the card stand-ins.
const SCREENSHOTS: { src: string; alt: string }[] = [];

const STAND_INS: BoardCardProps[] = [
  {
    color: "pink",
    title: "the squirrels are getting too brave",
    body: "one of them made direct eye contact w me today. i felt threatened.",
    tags: ["#campus-life", "#funny"],
    reactions: [{ icon: "❤️", count: 18 }, { icon: "💀", count: 52 }],
    timestamp: "3m",
  },
  {
    color: "green",
    title: "What's the best album you've listened to this week?",
    body: "Weekly prompt · clears Monday",
    reactions: [{ icon: "❤️", count: 89 }],
    timestamp: "2d",
  },
  {
    color: "orange",
    title: "anyone else fail the cs241 midterm",
    body: "felt like none of that was even in the lectures.",
    tags: ["#cs241"],
    reactions: [{ icon: "❤️", count: 40 }, { icon: "👥", count: 21 }],
    timestamp: "6m",
  },
];

function Phone({
  children,
  offset,
  progress,
  parallax,
}: {
  children: React.ReactNode;
  offset: number;
  progress: MotionValue<number>;
  parallax: boolean;
}) {
  const y = useTransform(progress, [0, 1], [offset, -offset]);
  return (
    <motion.div
      className="rounded-[2.5rem] p-3 shadow-xl"
      style={{
        y: parallax ? y : 0,
        background: "var(--card)",
        border: "1.5px solid var(--border)",
      }}
    >
      <div
        className="rounded-[2rem] overflow-hidden flex items-center justify-center p-4"
        style={{ background: "var(--bg)", minHeight: 340 }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function Screenshots() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallax = !reduced;

  return (
    <section ref={ref} className="px-6 md:px-10 py-24 overflow-hidden">
      <h2
        className="font-extrabold tracking-tight text-center mb-16 max-w-4xl mx-auto"
        style={{ fontSize: "var(--step-4)", lineHeight: 1 }}
      >
        This is the app.
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-8 max-w-5xl mx-auto">
        {SCREENSHOTS.length > 0
          ? SCREENSHOTS.map((s, i) => (
              <Phone key={s.src} offset={(i - 1) * 40} progress={scrollYProgress} parallax={parallax}>
                <Image src={s.src} alt={s.alt} width={280} height={600} className="rounded-[1.6rem]" />
              </Phone>
            ))
          : STAND_INS.map((card, i) => (
              <Phone key={card.title} offset={(i - 1) * 40} progress={scrollYProgress} parallax={parallax}>
                <BoardCard {...card} className="w-56 sm:w-60" />
              </Phone>
            ))}
      </div>
    </section>
  );
}
