import type { Metadata } from "next";
import Link from "next/link";
import FooterFinale from "@/app/components/FooterFinale";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why On Board exists: a weekly digital bulletin board built at Irvine Valley College for campuses where students don't stick around after class.",
};

export default function AboutPage() {
  return (
    <>
      <main id="main-content" className="flex-1 px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-block mt-12 mb-8 text-sm hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            ← Back
          </Link>

          <h1 className="font-extrabold tracking-tight mb-2" style={{ fontSize: "var(--step-4)", lineHeight: 1 }}>
            About
          </h1>
          <p className="text-sm mb-10" style={{ color: "var(--text-secondary)" }}>
            Why we&apos;re building this.
          </p>

          <div className="space-y-6 text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <p>
              On Board started at Irvine Valley College — a commuter school,
              where most students show up for class and leave right after.
              There&apos;s no dorm hallway, no dining hall crowd, no walking
              past the same bulletin board every day. Campus life happens
              somewhere most students simply aren&apos;t around long enough
              to catch.
            </p>
            <p>
              The physical boards that were supposed to fix this — flyers,
              corkboards, posters taped to a wall — mostly go unread. They&apos;re
              overcrowded, easy to walk past, and nobody has time to stop
              between classes to check them.
            </p>
            <p>
              So instead of adding another board to a hallway, we brought the
              board to the one thing every student already has with them:
              their phone. Post what&apos;s happening, or just what&apos;s on
              your mind — the whole campus sees it, and it&apos;s fresh again
              every week.
            </p>
            <p>
              We&apos;re early. On Board is currently in closed beta at IVC,
              being tested by a small group of students before a wider rollout
              this fall. If you&apos;ve got feedback, we&apos;d love to hear
              it — see our{" "}
              <Link href="/contact" className="font-semibold hover:underline" style={{ color: "var(--text)" }}>
                Contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      <FooterFinale />
    </>
  );
}
