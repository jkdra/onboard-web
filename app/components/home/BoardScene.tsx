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
import PromptCard from "@/app/components/home/PromptCard";

// Two columns of two — a small masonry, right column offset down, matching
// the app's board grid instead of scattering cards across the whole viewport.
type ScenePost = BoardCardProps & { rotate: number; column: 0 | 1 };

const POSTS: ScenePost[] = [
  {
    color: "teal",
    title: "the squirrels are getting too brave",
    body: "one made direct eye contact w me while i ate a granola bar. i felt threatened.",
    tags: ["#campus-life"],
    reactions: { laugh: 52, like: 18, hug: 2 },
    timestamp: "now",
    rotate: -2, column: 0,
  },
  {
    color: "indigo",
    title: "who took my oat milk from the 3rd floor fridge",
    body: "it had my name on it. in two places. i will find you.",
    tags: ["#dorm-life"],
    reactions: { laugh: 44, like: 12, dislike: 3 },
    timestamp: "now",
    rotate: 2, column: 1,
  },
  {
    color: "orange",
    title: "prof said 'this won't be on the exam' and it was the exam",
    body: "question 1 through question 6. i counted.",
    tags: ["#academics"],
    reactions: { like: 61, laugh: 38, hug: 9 },
    timestamp: "now",
    rotate: 3, column: 0,
  },
  {
    color: "pink",
    title: "free couch on 4th & elm, first come first serve",
    body: "structurally questionable but spiritually strong.",
    tags: ["#free-stuff"],
    reactions: { like: 27, laugh: 15, dislike: 1 },
    timestamp: "now",
    rotate: -3, column: 1,
  },
];

const NARRATION: [number, number, string][] = [
  // [appear, disappear, text] on scroll progress
  [0.0, 0.16, "Post it."],
  [0.16, 0.32, "The whole campus sees it."],
  [0.32, 0.48, "React, reply, repeat."],
];

// Countdown ticks from ~2.5hrs to 0 across this scroll window, turning red
// once under 10 minutes remain — the "clears soon" urgency moment.
const COUNTDOWN_START_SECONDS = 8954;
const COUNTDOWN_RED_THRESHOLD = 600;

function SceneCard({
  post,
  index,
  progress,
}: {
  post: ScenePost;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index * 0.09;
  const end = start + 0.14;
  // Rise into its masonry slot, settle, fade out on the wipe. No longer
  // scattered across the viewport — position comes from the grid it sits in.
  const opacity = useTransform(progress, [start, end, 0.65, 0.72], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [40, 0]);
  const rotate = useTransform(
    progress,
    [start, end, 0.65, 0.72],
    [post.rotate * 4, post.rotate, post.rotate, post.rotate * 4]
  );

  const { rotate: baseRotate, column, ...cardProps } = post;
  void baseRotate;
  void column;
  return (
    <motion.div style={{ opacity, y, rotate }}>
      <BoardCard {...cardProps} className="shadow-lg" />
    </motion.div>
  );
}

function Narration({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative w-full h-16 sm:h-20 md:h-40">
      {NARRATION.map(([from, to, text]) => (
        <NarrationLine key={text} from={from} to={to} text={text} progress={progress} />
      ))}
    </div>
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
      className="absolute inset-0 flex items-center justify-center md:justify-start text-center md:text-left font-extrabold tracking-tight pointer-events-none"
      style={{
        fontSize: "clamp(1.5rem, 6vw, var(--step-3))",
        lineHeight: 1.05,
        opacity,
      }}
    >
      {text}
    </motion.h2>
  );
}

function Countdown({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.48, 0.52, 0.6, 0.64], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0.48, 0.54], [0.7, 1]);
  const seconds = useTransform(progress, [0.52, 0.64], [COUNTDOWN_START_SECONDS, 0]);
  const label = useTransform(seconds, (s) => {
    const v = Math.max(0, Math.round(s));
    const h = String(Math.floor(v / 3600)).padStart(2, "0");
    const m = String(Math.floor((v % 3600) / 60)).padStart(2, "0");
    const sec = String(v % 60).padStart(2, "0");
    return `${h}h ${m}m ${sec}s`;
  });
  const bg = useTransform(seconds, (s) =>
    s <= COUNTDOWN_RED_THRESHOLD ? "#e5484d" : "var(--card)"
  );
  const border = useTransform(seconds, (s) =>
    s <= COUNTDOWN_RED_THRESHOLD ? "#e5484d" : "var(--border)"
  );
  const fg = useTransform(seconds, (s) => (s <= COUNTDOWN_RED_THRESHOLD ? "#ffffff" : "var(--text)"));
  const fgSecondary = useTransform(seconds, (s) =>
    s <= COUNTDOWN_RED_THRESHOLD ? "rgba(255,255,255,0.75)" : "var(--text-secondary)"
  );

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4"
      style={{ zIndex: 10 }}
    >
      <motion.div
        className="rounded-3xl px-8 py-6 text-center shadow-xl"
        style={{ opacity, scale, background: bg, border: "1px solid", borderColor: border, color: fg }}
      >
        <motion.p
          className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: fgSecondary }}
        >
          Clears soon
        </motion.p>
        <motion.p className="font-extrabold tabular-nums" style={{ fontSize: "var(--step-3)" }}>
          {label}
        </motion.p>
      </motion.div>
    </div>
  );
}

function WipeCopy({ progress }: { progress: MotionValue<number> }) {
  const wipeOpacity = useTransform(progress, [0.68, 0.74, 0.84, 0.88], [0, 1, 1, 0]);
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
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4">
        <motion.div style={{ opacity: freshOpacity, y: freshY, rotate: freshRotate }}>
          <PromptCard
            prompt="What's the most unhinged thing in your notes app right now?"
            className="shadow-lg"
          />
        </motion.div>
      </div>
    </>
  );
}

export default function BoardScene() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const leftColumn = POSTS.filter((p) => p.column === 0);
  const rightColumn = POSTS.filter((p) => p.column === 1);

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
          Every Monday at midnight, the board wipes clean. When the clock&apos;s
          almost out, the countdown turns red.
        </p>
        <div className="max-w-3xl mx-auto flex justify-center">
          <PromptCard prompt="What's the most unhinged thing in your notes app right now?" className="mb-6" />
        </div>
        <div className="max-w-sm sm:max-w-md mx-auto grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {leftColumn.map(({ rotate, column, ...card }) => {
              void column;
              return (
                <BoardCard key={card.title} {...card} style={{ transform: `rotate(${rotate}deg)` }} />
              );
            })}
          </div>
          <div className="flex flex-col gap-4 mt-10">
            {rightColumn.map(({ rotate, column, ...card }) => {
              void column;
              return (
                <BoardCard key={card.title} {...card} style={{ transform: `rotate(${rotate}deg)` }} />
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ height: "300vh" }} aria-label="How On Board works">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center px-5 sm:px-6 md:px-12">
        <div className="w-full max-w-5xl mx-auto grid gap-3 sm:gap-5 md:gap-12 md:grid-cols-2 items-center">
          <Narration progress={scrollYProgress} />
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-6">
            <div className="flex flex-col gap-2.5 sm:gap-4 md:gap-6">
              {leftColumn.map((post) => (
                <SceneCard
                  key={post.title}
                  post={post}
                  index={POSTS.indexOf(post)}
                  progress={scrollYProgress}
                />
              ))}
            </div>
            <div className="flex flex-col gap-2.5 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-16">
              {rightColumn.map((post) => (
                <SceneCard
                  key={post.title}
                  post={post}
                  index={POSTS.indexOf(post)}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
        <Countdown progress={scrollYProgress} />
        <WipeCopy progress={scrollYProgress} />
      </div>
    </section>
  );
}
