import type { Metadata } from "next";
import Link from "next/link";
import FooterFinale from "@/app/components/FooterFinale";

export const metadata: Metadata = {
  title: "Contact — On Board",
};

export default function ContactPage() {
  return (
    <>
      <main className="flex-1 px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-block mt-12 mb-8 text-sm hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            ← Back
          </Link>

          <h1 className="font-extrabold tracking-tight mb-2" style={{ fontSize: "var(--step-4)", lineHeight: 1 }}>
            Contact
          </h1>
          <p className="text-sm mb-10" style={{ color: "var(--text-secondary)" }}>
            Questions, reports, or account requests — we read everything.
          </p>

          <div className="space-y-8 text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <p>
              For support, feedback, content reports, or account deletion
              requests, email us directly:
            </p>
            <a
              href="mailto:support@onboardapp.org"
              className="inline-block font-extrabold tracking-tight hover:underline"
              style={{ fontSize: "var(--step-2)", color: "var(--text)" }}
            >
              support@onboardapp.org
            </a>
            <p>
              We aim to respond within a few business days. If you&apos;re
              reporting harassment or another safety concern, please include
              as much detail as you can — screenshots, usernames, timestamps
              — so we can act quickly.
            </p>
          </div>
        </div>
      </main>

      <FooterFinale />
    </>
  );
}
