import type { Metadata } from "next";
import Link from "next/link";
import FooterFinale from "@/app/components/FooterFinale";

export const metadata: Metadata = {
  title: "Privacy Policy — On Board",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm mb-10" style={{ color: "var(--text-secondary)" }}>
            Last updated: July 14, 2026
          </p>

          <div className="space-y-8 text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <p>
              On Board (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
              is a campus bulletin board app for iOS. This policy explains what
              information we collect, how we use it, and your rights around it.
            </p>

            <Section title="Information we collect">
              <ul>
                <li>
                  <strong>Account information.</strong> Your name, birthday,
                  campus email address, and phone number. Your campus email is
                  used to verify that you are a currently enrolled student at
                  a supported school; sign-in is handled via a magic link — no
                  password required. Your birthday is used to confirm you meet
                  our minimum age requirement.
                </li>
                <li>
                  <strong>Content you create.</strong> Posts, comments,
                  reactions, and any photos or videos you upload, all used to
                  power the board&apos;s core functionality. Posts are
                  anonymous to other users by default; your email is only
                  visible if another user views your profile.
                </li>
                <li>
                  <strong>Device token.</strong> If you grant notification
                  permission, we store your APNs device token to send push
                  notifications about board activity.
                </li>
                <li>
                  <strong>Usage data.</strong> We record when you last opened
                  the app to determine whether to send re-engagement
                  notifications. We do not collect analytics beyond this.
                </li>
                <li>
                  <strong>Waitlist email.</strong> If you sign up on our website
                  before launch, we store your email to notify you when you are
                  admitted.
                </li>
                <li>
                  <strong>Interaction data for ads.</strong> If personalized
                  advertising is enabled (on by default), we use in-app
                  interaction data and information you&apos;ve provided to
                  select relevant ads. You can disable this in Settings.
                </li>
                <li>
                  <strong>Subscription status.</strong> If you subscribe to
                  On Board Prime, we store your subscription entitlement
                  status. Payment is handled entirely by Apple — we do not
                  receive or store your payment details.
                </li>
              </ul>
            </Section>

            <Section title="How we use your information">
              <ul>
                <li>To verify your student status and create your account.</li>
                <li>To display posts and comments on the board.</li>
                <li>To send push notifications you have opted into.</li>
                <li>To contact waitlist members before launch.</li>
              </ul>
            </Section>

            <Section title="Data storage">
              <p>
                Your data is stored on Supabase, a managed database platform
                hosted in the United States. Board content (posts, comments,
                reactions) is not deleted when the weekly board resets — it
                becomes <strong>archived</strong> and remains visible,
                read-only, to other members of that board indefinitely. If you{" "}
                <strong>delete</strong> your account, all of your content —
                active and archived — is permanently deleted. If you{" "}
                <strong>deactivate</strong> your account instead, your
                archived content remains visible but your account is hidden;
                any of your posts still part of the active (non-archived) week
                at the time of deactivation are deleted rather than archived.
              </p>
            </Section>

            <Section title="Data sharing">
              <p>
                We do not sell your personal information. On Board shows two
                kinds of promoted content:
              </p>
              <ul>
                <li>
                  <strong>Advertisements</strong>, served by third-party ad
                  partners (e.g. Google). If personalized ads are enabled, we
                  share limited interaction data with these partners to select
                  relevant ads. You can disable personalized ads at any time in
                  Settings — you&apos;ll still see non-personalized ads unless
                  you&apos;re an On Board Prime subscriber, in which case you
                  won&apos;t see Advertisements at all.
                </li>
                <li>
                  <strong>Sponsored posts</strong>, purchased by local accounts
                  (businesses/organizations) to promote their own content.
                  These are not targeted using your personal data.
                </li>
              </ul>
              <p>We do not use your data to train AI models.</p>
            </Section>

            <Section title="Legal disclosure">
              <p>
                We may disclose your information if required by law,
                subpoena, or other legal process, or where we believe
                disclosure is necessary to protect the safety of our users or
                the public.
              </p>
            </Section>

            <Section title="Your rights">
              <ul>
                <li>
                  <strong>Delete your account.</strong> You may request
                  deletion of your account and all associated data at any time
                  by contacting us.
                </li>
                <li>
                  <strong>Opt out of notifications.</strong> You can disable
                  push notifications at any time in iOS Settings.
                </li>
                <li>
                  <strong>Opt out of personalized ads.</strong> Disable
                  personalized advertising anytime in Settings.
                </li>
                <li>
                  <strong>Delete vs. deactivate.</strong> Deleting your account
                  removes all your data, including archived content.
                  Deactivating hides your account while preserving your
                  archived content (see &ldquo;Data storage&rdquo; above).
                </li>
              </ul>
            </Section>

            <Section title="Children">
              <p>
                On Board is intended for verified college students aged 16 and
                older. We do not knowingly collect information from anyone
                under 16.
              </p>
            </Section>

            <Section title="Changes">
              <p>
                We may update this policy as the app evolves. We will update
                the &ldquo;last updated&rdquo; date above and, for material
                changes, notify users via push notification or email.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about this policy or your data? Email us at{" "}
                <a href="mailto:support@onboardapp.org" className="font-semibold hover:underline" style={{ color: "var(--text)" }}>
                  support@onboardapp.org
                </a>{" "}
                or visit our{" "}
                <Link href="/contact" className="font-semibold hover:underline" style={{ color: "var(--text)" }}>
                  Contact page
                </Link>
                .
              </p>
            </Section>
          </div>
        </div>
      </main>

      <FooterFinale />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>
        {title}
      </h2>
      <div className="space-y-3 [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:list-disc [&_strong]:font-semibold">
        {children}
      </div>
    </div>
  );
}


