"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
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
    title: "the squirrels are getting bold",
    body: "one made direct eye contact while i ate a granola bar. i think it wanted the bar. i let it win. i live here now, it lives here too.",
    tags: ["#campus-life"],
    reactions: { laugh: 52, like: 18, hug: 2 },
    timestamp: "now",
    rotate: -2, column: 0,
  },
  {
    color: "indigo",
    title: "who took my oat milk",
    body: "it had my name on it. in two places. i memorized the hum of the 3rd floor fridge. i will find you and i will be so normal about it.",
    tags: ["#dorm-life"],
    reactions: { laugh: 44, like: 12, dislike: 3 },
    timestamp: "now",
    rotate: 2, column: 1,
  },
  {
    color: "orange",
    title: "he said it wouldn't be on the exam",
    body: "question 1 through question 6. i counted them twice. i have never felt so personally attacked by a scantron in my entire life.",
    tags: ["#academics"],
    reactions: { like: 61, laugh: 38, hug: 9 },
    timestamp: "now",
    rotate: 3, column: 0,
  },
  {
    color: "pink",
    title: "free couch, 4th & elm",
    body: "structurally questionable but spiritually strong. bring three friends and a strong back. smells mostly fine. first come, first served.",
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

// Countdown ticks from ~2.5hrs to 0 across this scroll window.
const COUNTDOWN_START_SECONDS = 8954;

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
  // Rise into its masonry slot, settle, then rip straight down on the wipe.
  // Each card exits with a slight stagger — bottom cards first so they
  // don't overlap as they rip downward.
  const exitStart = 0.63 + (POSTS.length - 1 - index) * 0.012;
  const exitEnd = exitStart + 0.06;
  const opacity = useTransform(progress, [start, end, exitStart, exitEnd], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end, exitStart, exitEnd], [40, 0, 0, 200]);
  // Rotate only on entry — no spin on exit, cards rip straight down.
  const rotate = useTransform(progress, [start, end], [post.rotate * 2, post.rotate]);

  const { rotate: baseRotate, column, ...cardProps } = post;
  void baseRotate;
  void column;
  return (
    <motion.div style={{ opacity, y, rotate }}>
      <div className="card-float" style={{ animationDelay: `${index * 0.8}s` }}>
        <BoardCard {...cardProps} className="shadow-xl" />
      </div>
    </motion.div>
  );
}

function Narration({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative w-full h-16 sm:h-24 md:h-36">
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

const RED = "#ff2b2b";
const pad = (n: number) => String(n).padStart(2, "0");

function Segment({
  value,
  unit,
}: {
  value: MotionValue<string>;
  unit: string;
}) {
  return (
    <span className="inline-flex items-baseline">
      <motion.span>{value}</motion.span>
      <span className="text-[0.34em] font-bold ml-[0.04em] mr-[0.12em] opacity-50">
        {unit}
      </span>
    </span>
  );
}

function CounterRow({
  h,
  m,
  s,
  color,
}: {
  h: MotionValue<string>;
  m: MotionValue<string>;
  s: MotionValue<string>;
  color: string;
}) {
  return (
    <div
      className="flex flex-col md:flex-row items-start md:items-baseline font-extrabold tabular-nums leading-[0.85] tracking-tighter whitespace-nowrap text-[34vw] md:text-[clamp(6rem,15vw,15rem)]"
      style={{ color }}
    >
      <Segment value={h} unit="h" />
      <Segment value={m} unit="m" />
      <Segment value={s} unit="s" />
    </div>
  );
}

// The countdown — anchored in the bottom-leading corner, still behind the
// cards (z-0). Oversized for drama, tucked in the corner so it doesn't
// overpower the board. At zero it goes black on a red page, then slowly
// returns to normal.
function AmbientCountdown({ progress }: { progress: MotionValue<number> }) {
  const seconds = useTransform(progress, [0.04, 0.62], [COUNTDOWN_START_SECONDS, 0], {
    clamp: true,
  });
  const h = useTransform(seconds, (s) => pad(Math.floor(Math.max(0, Math.round(s)) / 3600)));
  const m = useTransform(seconds, (s) =>
    pad(Math.floor((Math.max(0, Math.round(s)) % 3600) / 60))
  );
  const sec = useTransform(seconds, (s) => pad(Math.max(0, Math.round(s)) % 60));

  // Starts subtle, grows as time runs out, bumps at zero, then fades
  // once the wipe copy takes over.
  const presence = useTransform(
    progress,
    [0.04, 0.30, 0.60, 0.62, 0.76, 0.82],
    [0.06, 0.12, 0.20, 0.30, 0.30, 0]
  );
  // At zero the timer goes black (on the red page). Holds through the card
  // rip, then slowly fades back to var(--text) as the page returns to normal.
  const darkOpacity = useTransform(
    progress,
    [0.62, 0.621, 0.72, 0.80],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 z-0 flex items-end justify-start overflow-hidden pointer-events-none select-none px-5 pb-6 sm:px-6 sm:pb-8 md:px-12 md:pb-10"
      style={{ opacity: presence }}
    >
      <div className="relative">
        <CounterRow h={h} m={m} s={sec} color="var(--text)" />
        <motion.div className="absolute inset-0" style={{ opacity: darkOpacity }}>
          <CounterRow h={h} m={m} s={sec} color="#000000" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export const redTakeoverStore = {
  value: 0,
  listeners: new Set<() => void>(),
  set(v: number) {
    if (this.value !== v) {
      this.value = v;
      this.listeners.forEach((l) => l());
    }
  },
  subscribe(l: () => void) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  },
};

// Full-page red takeover — the entire viewport SNAPS to red the instant the
// timer hits zero, then SLOWLY fades back to the regular background color.
function RedTakeover({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [0.62, 0.621, 0.72, 0.82],
    [0, 1, 1, 0]
  );
  useMotionValueEvent(opacity, "change", (latest) => redTakeoverStore.set(latest));
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity, background: RED }}
    />
  );
}

// Card grid with narration — during the red takeover, brightness drops to 0
// so cards and text become black silhouettes, then slowly restores.
function CardGrid({
  leftColumn,
  rightColumn,
  progress,
}: {
  leftColumn: ScenePost[];
  rightColumn: ScenePost[];
  progress: MotionValue<number>;
}) {
  const brightness = useTransform(
    progress,
    [0.62, 0.621, 0.72, 0.80],
    [1, 0, 0, 1]
  );
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <motion.div
      className="relative z-10 w-full max-w-5xl mx-auto grid gap-4 sm:gap-6 md:gap-10 md:grid-cols-[0.85fr_1.15fr] items-center pb-8 md:pb-0"
      style={{ filter }}
    >
      <Narration progress={progress} />
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-6">
        <div className="flex flex-col gap-2.5 sm:gap-4 md:gap-6">
          {leftColumn.map((post) => (
            <SceneCard
              key={post.title}
              post={post}
              index={POSTS.indexOf(post)}
              progress={progress}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2.5 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12">
          {rightColumn.map((post) => (
            <SceneCard
              key={post.title}
              post={post}
              index={POSTS.indexOf(post)}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function WipeCopy({ progress }: { progress: MotionValue<number> }) {
  const wipeOpacity = useTransform(progress, [0.78, 0.84, 0.90, 0.94], [0, 1, 1, 0]);
  const freshOpacity = useTransform(progress, [0.93, 0.98], [0, 1]);
  const freshY = useTransform(progress, [0.93, 0.99], ["40vh", "0vh"]);
  const freshRotate = useTransform(progress, [0.93, 0.99], [10, -2]);

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
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center px-5 sm:px-6 md:px-12">
        <RedTakeover progress={scrollYProgress} />
        <AmbientCountdown progress={scrollYProgress} />
        <CardGrid
          leftColumn={leftColumn}
          rightColumn={rightColumn}
          progress={scrollYProgress}
        />
        <WipeCopy progress={scrollYProgress} />
      </div>
    </section>
  );
}
