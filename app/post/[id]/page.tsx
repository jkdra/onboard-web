import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BoardCard from "@/app/components/home/BoardCard";
import FooterFinale from "@/app/components/FooterFinale";
import { APP_STORE_URL } from "@/lib/appStore";

export const metadata: Metadata = {
  title: "This post lives On Board",
  description: "Someone shared a post from their campus board. Get the app to see it.",
};

// The iOS app's primary share format is https://onboardapp.org/post/<UUID>.
// With the app installed, the universal link opens the app directly and this
// page never renders — it exists for everyone else: desktop opens, in-browser
// previews, and friends who don't have the app yet. Before this page existed,
// a shared post link landed on the 404, whose copy ("this post got cleared")
// actively told the recipient the post was gone.
//
// Deliberately no post fetch: posts are only readable inside the app, and a
// share link should tease, not leak content past the campus gate.
const UUID_PATTERN =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostSharePage({ params }: PageProps) {
  const { id } = await params;
  if (!UUID_PATTERN.test(id)) {
    notFound();
  }

  return (
    <>
      <main
        id="main-content"
        className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20"
      >
        <div
          className="rise-in w-[250px] sm:w-[280px]"
          style={{ "--d": "0.05s" } as React.CSSProperties}
        >
          <BoardCard
            color="blue"
            title="Someone pinned this for you"
            body="A post from their campus board — it lives in the app, where the week is still unfolding."
            tags={["#shared-with-you"]}
            reactions={{ like: 12, laugh: 3 }}
            className="shadow-xl mx-auto"
            style={{ transform: "rotate(2deg)" }}
          />
        </div>

        <h1
          className="rise-in font-extrabold tracking-tight mt-12 mb-4"
          style={{ fontSize: "var(--step-3)", lineHeight: 1.02, "--d": "0.2s" } as React.CSSProperties}
        >
          This post lives On Board.
        </h1>
        <p
          className="rise-in max-w-md mb-10"
          style={{
            fontSize: "var(--step-0)",
            lineHeight: 1.5,
            color: "var(--text-secondary)",
            "--d": "0.3s",
          } as React.CSSProperties}
        >
          Get the app, then open this link again — it&apos;ll take you straight
          to the post. Already have it? Opening this link on your phone jumps
          right in.
        </p>
        <div className="rise-in" style={{ "--d": "0.4s" } as React.CSSProperties}>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3.5 rounded-2xl text-base font-semibold hover:opacity-85 transition-opacity"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Download On Board
          </a>
        </div>
      </main>
      <FooterFinale />
    </>
  );
}
