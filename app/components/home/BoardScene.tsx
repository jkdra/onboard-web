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

type ScenePost = BoardCardProps & { rotate: number; x: string; y: string };

const POSTS: ScenePost[] = [
  {
    color: "teal",
    title: "the squirrels are getting too brave",
    body: "one made direct eye contact w me while i ate a granola bar. i felt threatened.",
    tags: ["#campus-life"],
    reactions: { laugh: 52, like: 18, hug: 2 },
    timestamp: "now",
    rotate: -4, x: "-24vw", y: "-24vh",
  },
  {
    color: "indigo",
    title: "who took my oat milk from the 3rd floor fridge",
    body: "it had my name on it. in two places. i will find you.",
    tags: ["#dorm-life"],
    reactions: { laugh: 44, like: 12, dislike: 3 },
    timestamp: "now",
    rotate: 3, x: "22vw", y: "-28vh",
  },
  {
    color: "orange",
    title: "prof said 'this won't be on the exam' and it was the exam",
    body: "question 1 through question 6. i counted.",
    tags: ["#academics"],
    reactions: { like: 61, laugh: 38, hug: 9 },
    timestamp: "now",
    rotate: -2, x: "-26vw", y: "24vh",
  },
  {
    color: "pink",
    title: "free couch on 4th & elm, first come first serve",
    body: "structurally questionable but spiritually strong.",
    tags: ["#free-stuff"],
    reactions: { like: 27, laugh: 15, dislike: 1 },
    timestamp: "now",
    rotate: 5, x: "24vw", y: "26vh",
  },
  {
    color: "blue",
    title: "study room 204B has the good whiteboard markers",
    body: "you didn't hear it from me. they're full. all of them.",
    tags: ["#library"],
    reactions: { like: 33, hug: 6, laugh: 4 },
    timestamp: "now",
    rotate: -6, x: "-1vw", y: "-2vh",
  },
  {
    color: "green",
    title: "lost my airpod in the quad, it's playing a podcast",
    body: "follow the faint sound of someone explaining the roman empire.",
    tags: ["#lost-found"],
    reactions: { laugh: 29, like: 21, hug: 3 },
    timestamp: "now",
    rotate: 2, x: "1vw", y: "30vh",
  },
];

const NARRATION: [number, number, string][] = [
  // [appear, disappear, text] on scroll progress
  [0.0, 0.18, "Post it."],
  [0.18, 0.38, "The whole campus sees it."],
  [0.38, 0.56, "React, reply, repeat."],
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
          <PromptCard prompt="What's the most unhinged thing in your notes app right now?" />
          {POSTS.map((post) => {
            const { rotate, x: unusedX, y: unusedY, ...card } = post;
            void unusedX;
            void unusedY;
            return (
              <BoardCard
                key={card.title}
                {...card}
                style={{ transform: `rotate(${rotate}deg)` }}
              />
            );
          })}
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
        <WipeCopy progress={scrollYProgress} />
      </div>
    </section>
  );
}
