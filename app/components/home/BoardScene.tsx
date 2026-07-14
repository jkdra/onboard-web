"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "motion/react";
import BoardCard, { BoardCardProps } from "@/app/components/home/BoardCard";

type ScenePost = BoardCardProps & { rotate: number; x: string; y: string };

const POSTS: ScenePost[] = [
  {
    color: "green",
    title: "brat by charli xcx is literally album of the year",
    body: "i cant stop listening. it's been on repeat…",
    tags: ["#music"],
    reactions: [{ icon: "❤️", count: 89 }, { icon: "💀", count: 12 }],
    timestamp: "now",
    rotate: -4, x: "-28%", y: "-22%",
  },
  {
    color: "orange",
    title: "anyone else fail the cs241 midterm",
    body: "felt like none of that was even in the lectures. avg was 4…",
    tags: ["#cs241"],
    reactions: [{ icon: "❤️", count: 40 }, { icon: "👥", count: 21 }],
    timestamp: "now",
    rotate: 3, x: "26%", y: "-26%",
  },
  {
    color: "blue",
    title: "selling math239 textbook $40",
    body: "barely used. two pages of highlighter, tops.",
    tags: ["#forsale", "#math239"],
    reactions: [{ icon: "❤️", count: 15 }],
    timestamp: "now",
    rotate: -2, x: "-30%", y: "24%",
  },
  {
    color: "pink",
    title: "lost: black hydroflask, do not crash",
    body: "covered in stickers, one says 'do not crash'. left it on a t…",
    tags: ["#lost"],
    reactions: [{ icon: "❤️", count: 22 }, { icon: "💀", count: 7 }],
    timestamp: "now",
    rotate: 5, x: "28%", y: "22%",
  },
  {
    color: "blue",
    title: "the squirrels are getting too brave",
    body: "one made direct eye contact w me while i ate a granola bar.",
    tags: ["#campus-life", "#funny"],
    reactions: [{ icon: "💀", count: 52 }],
    timestamp: "now",
    rotate: -6, x: "0%", y: "-34%",
  },
  {
    color: "green",
    title: "study group for bio, we have snacks",
    body: "library 3rd floor, thursdays. bring flashcards.",
    tags: ["#bio"],
    reactions: [{ icon: "❤️", count: 31 }, { icon: "👥", count: 12 }],
    timestamp: "now",
    rotate: 2, x: "2%", y: "32%",
  },
];

const NARRATION: [number, number, string][] = [
  // [appear, disappear, text] on scroll progress
  [0.0, 0.18, "Post it."],
  [0.18, 0.38, "The whole campus sees it."],
  [0.38, 0.52, "React, reply, repeat."],
];

function SceneCard({
  post,
  index,
  progress,
}: {
  post: ScenePost;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index * 0.07;
  const end = start + 0.12;
  // Fly in from below, settle at pinned position, sweep away on the wipe.
  const opacity = useTransform(progress, [start, end, 0.62, 0.72], [0, 1, 1, 0]);
  const yIn = useTransform(
    progress,
    [start, end, 0.62, 0.72],
    ["60vh", post.y, post.y, "-70vh"]
  );
  const rotate = useTransform(
    progress,
    [start, end, 0.62, 0.72],
    [post.rotate * 3, post.rotate, post.rotate, post.rotate * 4]
  );

  const { rotate: baseRotate, x, y: baseY, ...cardProps } = post;
  void baseRotate;
  void baseY;
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div style={{ opacity, x, y: yIn, rotate }}>
        <BoardCard {...cardProps} className="shadow-lg" />
      </motion.div>
    </div>
  );
}

function Narration({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      {NARRATION.map(([from, to, text]) => (
        <NarrationLine key={text} from={from} to={to} text={text} progress={progress} />
      ))}
    </>
  );
}

function NarrationLine({
  from,
  to,
  text,
  progress,
}: {
  from: number;
  to: number;
  text: string;
  progress: MotionValue<number>;
}) {
  const fade = 0.03;
  const opacity = useTransform(
    progress,
    [from, from + fade, to - fade, to],
    [0, 1, 1, 0]
  );
  return (
    <motion.h2
      className="absolute inset-x-0 top-14 md:top-16 text-center font-extrabold tracking-tight px-6 pointer-events-none"
      style={{ fontSize: "var(--step-4)", lineHeight: 1, opacity }}
    >
      {text}
    </motion.h2>
  );
}

function WipeCopy({ progress }: { progress: MotionValue<number> }) {
  const wipeOpacity = useTransform(progress, [0.7, 0.76, 0.84, 0.88], [0, 1, 1, 0]);
  const freshOpacity = useTransform(progress, [0.88, 0.94], [0, 1]);
  const freshY = useTransform(progress, [0.88, 0.96], ["-40vh", "0vh"]);
  const freshRotate = useTransform(progress, [0.88, 0.96], [-10, -2]);

  return (
    <>
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
        style={{ opacity: wipeOpacity }}
      >
        <p
          className="font-extrabold tracking-tight text-center"
          style={{ fontSize: "var(--step-4)", lineHeight: 1.02 }}
        >
          Monday, 12:00 AM.
          <br />
          <span style={{ color: "var(--text-secondary)" }}>Clean slate.</span>
        </p>
      </motion.div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ opacity: freshOpacity, y: freshY, rotate: freshRotate }}>
          <BoardCard
            color="green"
            title="Fresh week. Who's first?"
            body="The board just cleared. Say something."
            timestamp="now"
            className="shadow-lg"
          />
        </motion.div>
      </div>
    </>
  );
}

function Countdown({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.52, 0.56, 0.66, 0.7], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0.52, 0.58], [0.7, 1]);
  // Decorative countdown: hours tick from 02:29:14 toward zero as you scroll.
  const seconds = useTransform(progress, [0.56, 0.7], [8954, 0]);
  const label = useTransform(seconds, (s) => {
    const v = Math.max(0, Math.round(s));
    const h = String(Math.floor(v / 3600)).padStart(2, "0");
    const m = String(Math.floor((v % 3600) / 60)).padStart(2, "0");
    const sec = String(v % 60).padStart(2, "0");
    return `${h}h ${m}m ${sec}s`;
  });

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: 10 }}
    >
    <motion.div
      className="rounded-3xl px-8 py-6 text-center shadow-xl"
      style={{
        opacity,
        scale,
        background: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: "var(--text-secondary)" }}
      >
        Clears soon
      </p>
      <motion.p className="font-extrabold tabular-nums" style={{ fontSize: "var(--step-3)" }}>
        {label}
      </motion.p>
    </motion.div>
    </div>
  );
}

export default function BoardScene() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduced) {
    return (
      <section className="px-6 md:px-10 py-24">
        <h2
          className="font-extrabold tracking-tight text-center mb-4"
          style={{ fontSize: "var(--step-4)", lineHeight: 1 }}
        >
          Post it. The campus sees it.
        </h2>
        <p
          className="text-center mb-14"
          style={{ fontSize: "var(--step-1)", color: "var(--text-secondary)" }}
        >
          Every Monday at midnight, the board wipes clean.
        </p>
        <div className="flex flex-wrap justify-center gap-5 max-w-5xl mx-auto">
          {POSTS.map(({ rotate, x, y, ...card }) => (
            <BoardCard
              key={card.title}
              {...card}
              style={{ transform: `rotate(${rotate}deg)` }}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ height: "350vh" }} aria-label="How On Board works">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Narration progress={scrollYProgress} />
        {POSTS.map((post, i) => (
          <SceneCard key={post.title} post={post} index={i} progress={scrollYProgress} />
        ))}
        <Countdown progress={scrollYProgress} />
        <WipeCopy progress={scrollYProgress} />
      </div>
    </section>
  );
}
