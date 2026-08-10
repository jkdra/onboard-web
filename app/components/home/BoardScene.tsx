"use client";

import { useRef, useEffect } from "react";
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
    // Body-only — posts aren't a strict title/description pair anymore,
    // and one card in the demo grid should say so.
    color: "teal",
    body: "a squirrel made direct eye contact with me and i simply handed over the granola bar. i live under its rule now.",
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
const COUNTDOWN_START_SECONDS = 3600;

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
  const exitStart = 0.62 + (POSTS.length - 1 - index) * 0.012;
  const exitEnd = exitStart + 0.06;
  const opacity = useTransform(progress, [start, end, exitStart, exitEnd], [0, 1, 1, 0], { clamp: true });
  const y = useTransform(progress, [start, end, exitStart, exitEnd], [40, 0, 0, 1000], { clamp: true });
  // Rotate only on entry — no spin on exit, cards rip straight down.
  const rotate = useTransform(progress, [start, end], [post.rotate * 2, post.rotate], { clamp: true });

  const { rotate: baseRotate, column, ...cardProps } = post;
  void baseRotate;
  void column;
  return (
    <motion.div style={{ opacity, y, rotate, willChange: "opacity, transform" }}>
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
    [0, 1, 1, 0],
    { clamp: true }
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
      className="flex flex-row items-baseline font-extrabold tabular-nums leading-[0.85] tracking-tighter whitespace-nowrap text-[11vw] sm:text-[14vw] md:text-[clamp(6rem,15vw,15rem)]"
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
// overpower the board. Turns red in the final stretch, inverts at zero on
// the ink takeover, then slowly returns to normal.
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
    [0.04, 0.30, 0.58, 0.62, 0.76, 0.82],
    [0.08, 0.15, 0.30, 0.40, 0.40, 0],
    { clamp: true }
  );
  // Final stretch: the timer itself turns red — the one thing red means on
  // this site ("time's almost up", matching BoardCountdown's urgent state).
  // Small area, correct semantics; the takeover itself is ink.
  const urgentOpacity = useTransform(
    progress,
    [0.50, 0.545, 0.615, 0.62],
    [0, 1, 1, 0],
    { clamp: true }
  );
  // At zero the timer inverts to the page color on the ink field, holds
  // through the card rip, then fades back as the page returns.
  const invertedOpacity = useTransform(
    progress,
    [0.619, 0.62, 0.72, 0.80],
    [0, 1, 1, 0],
    { clamp: true }
  );

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 z-0 flex items-end justify-start overflow-hidden pointer-events-none select-none px-5 pb-6 sm:px-6 sm:pb-8 md:px-12 md:pb-10"
      style={{ opacity: presence }}
    >
      <div className="relative">
        <CounterRow h={h} m={m} s={sec} color="var(--text)" />
        <motion.div className="absolute inset-0" style={{ opacity: urgentOpacity }}>
          <CounterRow h={h} m={m} s={sec} color={RED} />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: invertedOpacity }}>
          <CounterRow h={h} m={m} s={sec} color="var(--bg)" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Full-page ink takeover — the viewport SNAPS to the theme's ink color
// (black on light, white on dark) the instant the timer hits zero, then
// slowly fades back. This used to be red, and red was the wrong word:
// on this site red means "time's almost up" (BoardCountdown's urgent
// state), but the clear itself isn't an emergency — it's the product's
// promise. Ink reads as "gone": the field swallows the board, the cards
// rip away into it, and the page comes back empty. The snap stays; only
// the meaning changed. (Also kinder: a full-viewport saturated red
// strobing under scroll-scrubbing was a photosensitivity hazard ink
// isn't.)
function ClearTakeover({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [0.619, 0.62, 0.72, 0.82],
    [0, 1, 1, 0],
    { clamp: true }
  );

  // Sync Safari's address-bar tint with the takeover so it doesn't stick
  // after scrolling past. Resets to the original color on unmount.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!meta) return;
    const original = meta.content;
    const unsub = opacity.on("change", (v) => {
      meta.content = v > 0.5
        ? getComputedStyle(document.documentElement).getPropertyValue("--text").trim()
        : original;
    });
    return () => {
      unsub();
      meta.content = original;
    };
  }, [opacity]);

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity, background: "var(--text)", willChange: "opacity" }}
    />
  );
}

// Card grid with narration. The cards keep their tone colors straight
// through the takeover — pastel cards ripping down into a solid ink field
// is the product truth drawn literally (the brand is monochrome; the
// posts are the color, and the clear takes them).
function CardGrid({
  leftColumn,
  rightColumn,
  progress,
}: {
  leftColumn: ScenePost[];
  rightColumn: ScenePost[];
  progress: MotionValue<number>;
}) {
  return (
    <motion.div
      className="relative z-10 w-full max-w-5xl mx-auto grid gap-3 sm:gap-6 md:gap-10 md:grid-cols-[0.85fr_1.15fr] items-center pb-8 md:pb-0"
    >
      <Narration progress={progress} />
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6">
        <div className="flex flex-col gap-2 sm:gap-4 md:gap-6">
          {leftColumn.map((post) => (
            <SceneCard
              key={post.body}
              post={post}
              index={POSTS.indexOf(post)}
              progress={progress}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 mt-4 sm:mt-8 md:mt-12">
          {rightColumn.map((post) => (
            <SceneCard
              key={post.body}
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
      <section className="py-24">
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
        <div className="rail flex justify-center">
          <PromptCard prompt="What's the most unhinged thing in your notes app right now?" className="mb-6" />
        </div>
        <div className="max-w-sm sm:max-w-md mx-auto grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {leftColumn.map(({ rotate, column, ...card }) => {
              void column;
              return (
                <BoardCard key={card.body} {...card} style={{ transform: `rotate(${rotate}deg)` }} />
              );
            })}
          </div>
          <div className="flex flex-col gap-4 mt-10">
            {rightColumn.map(({ rotate, column, ...card }) => {
              void column;
              return (
                <BoardCard key={card.body} {...card} style={{ transform: `rotate(${rotate}deg)` }} />
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: "300vh", touchAction: "pan-y" }} aria-label="How On Board works">
      {/* Inert deep-link marker at the takeover beat — landing on
          /#the-clear paints the scene mid-wipe on first frame (also what
          headless capture uses, since compositors skip programmatic
          scrolls). */}
      <div id="the-clear" aria-hidden className="absolute left-0 w-px h-px" style={{ top: "46%" }} />
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center px-4 sm:px-6 md:px-12">
        <ClearTakeover progress={scrollYProgress} />
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
