import type { Metadata } from "next";
import Link from "next/link";
import FooterFinale from "@/app/components/FooterFinale";

export const metadata: Metadata = {
  title: "Terms of Service — On Board",
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p
            className="text-sm mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            Last updated: July 2, 2026
          </p>

          <div
            className="space-y-8 text-[15px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              By using On Board, you agree to these terms. If you do not agree,
              do not use the app.
            </p>

            <Section title="Eligibility">
              <p>
                You must be a currently enrolled student at a supported campus
                and at least 18 years old to use On Board. You must sign up with
                a valid campus email address.
              </p>
            </Section>

            <Section title="Your account">
              <p>
                You are responsible for activity under your account. Do not
                share your magic link with others. If you believe your account
                has been compromised, contact us immediately.
              </p>
            </Section>

            <Section title="Content rules">
              <p>You may not post content that:</p>
              <ul>
                <li>Harasses, threatens, or targets another person.</li>
                <li>
                  Contains hate speech based on race, religion, gender, sexual
                  orientation, disability, or national origin.
                </li>
                <li>
                  Promotes extremist political ideologies or beliefs tied to
                  real-world harm, such as nazism, zionism, white supremacy,
                  collective punishment, or other adjacent views.
                </li>
                <li>
                  Reveals another person&apos;s private information without
                  their consent (doxxing).
                </li>
                <li>Is sexually explicit.</li>
                <li>Promotes illegal activity.</li>
                <li>Impersonates another person or entity.</li>
                <li>Constitutes spam or coordinated inauthentic behavior.</li>
              </ul>
              <p>
                Anonymity is not a shield from these rules. Violations may
                result in immediate account removal.
              </p>
            </Section>

            <Section title="Weekly reset">
              <p>
                Board content (posts, comments, reactions) is archived every
                Monday at midnight — the board resets, and the past
                week&apos;s content becomes read-only but remains visible to
                other members of that board. It is not deleted. If you
                deactivate your account while a post is still part of the
                current (non-archived) week, that post is deleted rather than
                archived. Deleting your account (as opposed to deactivating
                it) permanently deletes all of your content, including
                anything archived.
              </p>
            </Section>

            <Section title="On Board Prime">
              <p>
                On Board Prime is an optional, auto-renewing subscription
                available through the App Store. Prime removes third-party
                Advertisements; Prime subscribers may still see Sponsored
                posts (see &ldquo;Advertising &amp; sponsored content&rdquo;
                below). Subscriptions automatically renew unless canceled at
                least 24 hours before the end of the current billing period.
                Payment is charged to your Apple ID account. You can manage or
                cancel your subscription anytime in your Apple ID account
                settings. Refunds are handled by Apple in accordance with
                their refund policies — we do not process refunds directly.
              </p>
            </Section>

            <Section title="Advertising &amp; sponsored content">
              <p>
                On Board displays two kinds of promoted content, each clearly
                labeled: <strong>Advertisements</strong> (labeled in yellow),
                served by third-party ad providers, and{" "}
                <strong>Sponsored</strong> posts (labeled in blue), purchased
                by local accounts to promote their own content. Sponsored
                posts must still comply with the Content rules above. We are
                not responsible for the content, accuracy, or claims made in
                Advertisements or Sponsored posts.
              </p>
            </Section>

            <Section title="Intellectual property">
              <p>
                You retain ownership of content you post. By posting, you grant
                us a limited license to display that content to other users of
                the same board. We do not claim ownership of your posts.
              </p>
            </Section>

            <Section title="Enforcement">
              <p>
                We may remove content or suspend accounts that violate these
                terms, at our sole discretion, without prior notice. We are a
                small team — we cannot review every post but will act on
                reports.
              </p>
            </Section>

            <Section title="Disclaimers">
              <p>
                On Board is provided &ldquo;as is.&rdquo; We make no guarantees
                about uptime, availability, or the accuracy of content posted by
                users. We are not responsible for content created by users.
              </p>
            </Section>

            <Section title="Changes">
              <p>
                We may update these terms as the app evolves. Continued use
                after changes are posted constitutes acceptance of the updated
                terms.
              </p>
            </Section>

            <Section title="Contact">
              <p>Questions? Use the contact form on our website.</p>
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


