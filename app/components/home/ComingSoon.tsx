"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import BoardCard from "@/app/components/home/BoardCard";

const STAGES = [
  { label: "Closed Beta", status: "current" as const },
  { label: "Open Beta", status: "next" as const },
  { label: "Public Launch", status: "later" as const },
];

const COLORS = ["green", "orange", "blue", "pink", "indigo", "teal"] as const;

type PostData = {
  title: string;
  body: string;
  tags: string[];
  color: typeof COLORS[number];
  likes: number;
};

export default function ComingSoon() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [draftTags, setDraftTags] = useState("");
  const [draftColor, setDraftColor] = useState<typeof COLORS[number]>("blue");

  const startDraft = () => {
    setDraftTitle("");
    setDraftBody("");
    setDraftTags("");
    setDraftColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    setIsEditing(true);
  };

  const saveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim()) return;
    
    setPosts(prev => [...prev, {
      title: draftTitle,
      body: draftBody,
      tags: draftTags.split(",").map(t => t.trim()).filter(Boolean).map(t => t.startsWith("#") ? t : `#${t}`),
      color: draftColor,
      likes: 0
    }]);
    setIsEditing(false);
  };

  // Fake reactions tick up for the newest post
  useEffect(() => {
    if (posts.length === 0) return;
    const lastIdx = posts.length - 1;
    if (posts[lastIdx].likes > 0) return;

    const t = setTimeout(() => {
      setPosts(prev => {
        const next = [...prev];
        next[lastIdx] = { ...next[lastIdx], likes: Math.floor(Math.random() * 5) + 2 };
        return next;
      });
    }, 1200);
    return () => clearTimeout(t);
  }, [posts]);

  return (
    <section className="px-6 md:px-10 py-32 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-extrabold tracking-tight mb-10"
          style={{ fontSize: "var(--step-4)", lineHeight: 1.02 }}
        >
          We&apos;re already testing it.
        </h2>

        <ol className="flex flex-wrap items-center justify-center gap-3 mb-4">
          {STAGES.map((stage, i) => (
            <li key={stage.label} className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full"
                style={
                  stage.status === "current"
                    ? { background: "var(--text)", color: "var(--bg)" }
                    : {
                        background: "transparent",
                        color: "var(--text-secondary)",
                        border: "1.5px solid var(--border)",
                      }
                }
              >
                {stage.status === "current" && (
                  <span
                    aria-hidden
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--bg)" }}
                  />
                )}
                {stage.label}
              </span>
              {i < STAGES.length - 1 && (
                <span aria-hidden style={{ color: "var(--text-secondary)" }}>
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <p
          className="mb-14"
          style={{ fontSize: "var(--step-0)", color: "var(--text-secondary)" }}
        >
          Public launch lands this fall.
        </p>

        {/* Interactive "Try Posting" Demo */}
        <div className="max-w-5xl mx-auto mb-20 text-left flex flex-wrap justify-center gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {posts.map((post, i) => (
              <motion.div
                key={`post-${i}`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-[240px] sm:w-[280px]"
              >
                <BoardCard
                  color={post.color}
                  title={post.title}
                  body={post.body}
                  tags={post.tags.length > 0 ? post.tags : ["#test-flight"]}
                  reactions={{ like: post.likes, laugh: 0, dislike: 0, hug: 0 }}
                  className="shadow-2xl"
                />
              </motion.div>
            ))}

            {isEditing ? (
              <motion.div
                key="editor"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-[240px] sm:w-[280px]"
              >
                <form
                  onSubmit={saveDraft}
                  className="rounded-3xl p-4 sm:p-5 w-full aspect-[4/5] flex flex-col shadow-2xl relative"
                  style={{
                    background: `var(--card-${draftColor})`,
                    color: "var(--card-ink)",
                  }}
                >
                  <input
                    autoFocus
                    placeholder="Title..."
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    className="w-full bg-transparent outline-none placeholder:text-current placeholder:opacity-40 font-extrabold text-lg leading-snug tracking-tight mb-2"
                  />
                  <textarea
                    placeholder="Description..."
                    value={draftBody}
                    onChange={(e) => setDraftBody(e.target.value)}
                    className="w-full bg-transparent outline-none placeholder:text-current placeholder:opacity-40 text-sm leading-relaxed flex-1 resize-none overflow-y-auto overflow-x-hidden break-words"
                    style={{ color: "var(--card-ink-secondary)" }}
                  />
                  <input
                    placeholder="Tags (comma separated)"
                    value={draftTags}
                    onChange={(e) => setDraftTags(e.target.value)}
                    className="w-full bg-transparent outline-none placeholder:text-current placeholder:opacity-40 text-xs font-semibold mb-3"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="text-xs font-bold px-3 py-1.5 rounded-full hover:bg-black/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!draftTitle.trim()}
                      className="text-xs font-bold px-4 py-1.5 rounded-full bg-black text-white disabled:opacity-50 transition-opacity"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : posts.length < 3 ? (
              <motion.button
                key="add-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={startDraft}
                className="w-[240px] sm:w-[280px] aspect-[4/5] rounded-3xl flex items-center justify-center transition-all group"
                style={{
                  border: "3px dashed var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-light transition-colors group-hover:bg-black group-hover:text-white"
                  style={{ backgroundColor: "var(--border)" }}
                >
                  +
                </div>
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>

        <p
          className="mb-2"
          style={{ fontSize: "var(--step-1)", color: "var(--text-secondary)" }}
        >
          Closed beta is live at Irvine Valley College. You guys are lucky (well, if you have an iPhone).
        </p>
        <p style={{ fontSize: "var(--step-1)", color: "var(--text-secondary)" }}>
          Hang tight, Android warriors—we&apos;ll get to you soon.
        </p>
      </div>
    </section>
  );
}
