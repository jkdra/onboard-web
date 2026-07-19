import type { Metadata } from "next";
import Link from "next/link";
import BoardCard from "@/app/components/home/BoardCard";
import FooterFinale from "@/app/components/FooterFinale";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page got cleared — or it never existed.",
};

// On-brand 404: the page you wanted is a post that got wiped on Monday.
export default function NotFound() {
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
            color="pink"
            title="404 — this post got cleared"
            body="Either the link's wrong, or whatever lived here got wiped with the rest of the board. Clean slate — that's kind of our whole thing."
            tags={["#lost-and-found"]}
            reactions={{ hug: 4, laugh: 2 }}
            className="shadow-xl mx-auto"
            style={{ transform: "rotate(-3deg)" }}
          />
        </div>

        <h1
          className="rise-in font-extrabold tracking-tight mt-12 mb-4"
          style={{ fontSize: "var(--step-3)", lineHeight: 1.02, "--d": "0.2s" } as React.CSSProperties}
        >
          Nothing pinned here.
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
          The board wipes clean every Monday — this page just isn&apos;t on it.
        </p>
        <div className="rise-in" style={{ "--d": "0.4s" } as React.CSSProperties}>
          <Link
            href="/"
            className="inline-block px-6 py-3.5 rounded-2xl text-base font-semibold hover:opacity-85 transition-opacity"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Back to the board
          </Link>
        </div>
      </main>
      <FooterFinale />
    </>
  );
}
