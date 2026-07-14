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
    color: "indigo",
    title: "rate my 8am schedule, be honest",
    body: "monday through friday. i was a different person during registration.",
    tags: ["#academics"],
    reactions: { laugh: 47, hug: 20, like: 11 },
    timestamp: "3m",
  },
  {
    color: "teal",
    title: "the vending machine gave me two. today is my day",
    body: "row C4. luck is real and it lives in the science building.",
    tags: ["#campus-life"],
    reactions: { like: 64, laugh: 23, dislike: 0 },
    timestamp: "12m",
  },
  {
    color: "pink",
    title: "does anyone actually read the syllabus",
    body: "asking for me. i am anyone.",
    tags: ["#confessions"],
    reactions: { laugh: 38, like: 16, hug: 5 },
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
