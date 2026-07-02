# Marketing site refresh — design

## Context

The current site (`app/page.tsx`) is a clean but flat single-page marketing site: centered hero, waitlist form, a 2x2 feature-card grid, plain Privacy/Terms pages. The goal is to give the site more personality while staying coherent with its existing monochrome, CSS-variable-driven (`--bg`/`--text`/`--card`/`--border`) light/dark theme system — pulling in a Wii U-menu / early-2000s-internet flavor (motion, bolder typography, playful copy) without going chaotic. Separately, the Privacy Policy and Terms of Service need to catch up to how the app actually behaves, including monetization features (On Board Prime, ads, sponsored posts) that aren't documented anywhere yet.

## Scope

In scope: hero section layout/copy, feature card motion/copy, Privacy Policy content, Terms of Service content, README rewrite.

Out of scope (explicitly deferred, not because they're wrong — just not part of this pass): waitlist form/button styling, badge ("Coming to IVC · Fall 2026"), footer, theme toggle, changelog page. The energy stays concentrated in the hero and feature cards rather than spread across every element.

## Hero section

Replace the centered layout with a left-aligned (leading-to-trailing / natural LTR reading) block — headline, body copy, and form all flush left instead of centered, ragged right edge instead of symmetric lines.

- Headline: "Let's get you On Board." (replaces "Your campus, one board at a time.")
- Subtitle: "One board, your whole campus. Clean slate every Monday." (replaces the current two-sentence paragraph)
- The badge, brand mark, and waitlist form keep their current styling and content — only the text alignment/layout changes from centered to left-aligned. Form/badge should shift to align with the left edge of the text block rather than staying centered independently.

## Feature cards

Cards keep their current visual style (rounded-2xl, `--card`/`--border` background) but gain interaction:

- **Hover:** scale to 1.015, soft shadow (`0 8px 18px rgba(0,0,0,0.08)`), no rotation. Transition `0.12s cubic-bezier(.34,1.2,.64,1)` for transform, `0.18s ease` for shadow.
- **Press (`:active`):** scale to 0.97.
- **Tap/click:** spawns the On Board brand mark (CSS-masked, same technique as the hero brand mark — `background: var(--text)` masked with `/logo.svg`) at 40px, positioned exactly at the click/tap coordinates (relative to the card, not a fixed corner). It animates via `translateY(-34px)` + opacity 0.9→0 over `0.7s ease-out`, with a random rotation in the range **−12° to +16°** (asymmetric — skewed right to counteract the logo's natural left lean) applied via a CSS custom property (`--r`) set per spawn. Each tap creates a fresh element (so rapid/overlapping taps all animate independently) and removes itself on `animationend`.

Card copy changes (title unchanged, body copy shortened to match the new hero's dry/short voice):

| Icon | Title | New body copy |
|---|---|---|
| 📌 | Post to the board | "Say what's on your mind. The whole campus sees it." |
| 🔁 | Fresh every week | "Monday at midnight, it's wiped. Start again." |
| 🎓 | Students only | "Your campus email gets you in. Nobody else." |
| 💬 | React & comment | "React, reply, repeat." |

## Privacy Policy (`app/privacy/page.tsx`)

Update "Last updated" date to the date these changes ship.

**"Information we collect"** — add two bullets:
- **Interaction data for ads.** If personalized advertising is enabled (on by default), we use in-app interaction data and information you've provided to select relevant ads. You can disable this in Settings.
- **Subscription status.** If you subscribe to On Board Prime, we store your subscription entitlement status. Payment is handled entirely by Apple — we do not receive or store your payment details.

**"Data storage"** — replace the "permanently deleted every Monday" claim (currently false) with:
> Board content (posts, comments, reactions) is not deleted when the weekly board resets — it becomes **archived** and remains visible, read-only, to other members of that board indefinitely. If you **delete** your account, all of your content — active and archived — is permanently deleted. If you **deactivate** your account (rather than deleting it), your archived content remains visible but your account is hidden; any of your posts still part of the *active* (non-archived) week at the time of deactivation are deleted rather than archived.

**"Data sharing"** — replace the blanket "we do not sell, rent, or share... for advertising" claim with:
> We do not sell your personal information. On Board shows two kinds of promoted content:
> - **Advertisements**, served by third-party ad partners (e.g. Google). If personalized ads are enabled, we share limited interaction data with these partners to select relevant ads. You can disable personalized ads at any time in Settings — you'll still see non-personalized ads unless you're an On Board Prime subscriber, in which case you won't see Advertisements at all.
> - **Sponsored posts**, purchased by local accounts (businesses/organizations) to promote their own content. These are not targeted using your personal data.
>
> We do not use your data to train AI models.

Add a new section, **"Legal disclosure"**:
> We may disclose your information if required by law, subpoena, or other legal process, or where we believe disclosure is necessary to protect the safety of our users or the public.

**"Your rights"** — add two bullets:
- **Opt out of personalized ads.** Disable personalized advertising anytime in Settings.
- **Delete vs. deactivate.** Deleting your account removes all your data, including archived content. Deactivating hides your account while preserving your archived content (see "Data storage" above).

## Terms of Service (`app/terms/page.tsx`)

Update "Last updated" date to match.

**"Weekly reset"** — replace with the accurate archived/deleted behavior:
> Board content (posts, comments, reactions) is archived every Monday at midnight — the board resets, and the past week's content becomes read-only but remains visible to other members of that board. It is not deleted. If you deactivate your account while a post is still part of the current (non-archived) week, that post is deleted rather than archived. Deleting your account (as opposed to deactivating it) permanently deletes all of your content, including anything archived.

New section, **"On Board Prime"** (placed after "Weekly reset"):
> On Board Prime is an optional, auto-renewing subscription available through the App Store. Prime removes third-party Advertisements; Prime subscribers may still see Sponsored posts (see "Advertising & sponsored content" below). Subscriptions automatically renew unless canceled at least 24 hours before the end of the current billing period. Payment is charged to your Apple ID account. You can manage or cancel your subscription anytime in your Apple ID account settings. Refunds are handled by Apple in accordance with their refund policies — we do not process refunds directly.

New section, **"Advertising & sponsored content"**:
> On Board displays two kinds of promoted content, each clearly labeled: **Advertisements** (labeled in yellow), served by third-party ad providers, and **Sponsored** posts (labeled in blue), purchased by local accounts to promote their own content. Sponsored posts must still comply with the Content rules above. We are not responsible for the content, accuracy, or claims made in Advertisements or Sponsored posts.

No other sections change. (Not touching the existing "zionism" clause in Content rules — flagged separately to you, out of scope here.)

## README (`README.md`)

Currently reads as setup instructions (install steps, env var table, Next.js-16-breaking-changes warning, changelog implementation internals) — the repo exists on GitHub purely for others to look at, not to be run, so replace the whole file with a showcase-only version:

```markdown
# On Board — Web

The marketing site for **On Board**, a weekly campus bulletin board app for iOS. Students join their campus's board, post anonymously, react, and comment — and every Monday, the board resets to a clean slate.

**[onboardapp.org](https://onboardapp.org)**

## Pages

- `/` — landing page and waitlist signup
- `/changelog` — latest release notes, pulled automatically from the App Store
- `/privacy` — privacy policy
- `/terms` — terms of service

Built with Next.js, React, Tailwind CSS, and Supabase.
```

## Testing / verification

This is a static content + CSS/motion change with no new data flow — no automated tests to write. Verification is: run `npm run dev`, visually confirm the hero layout, click through card hover/press/tap-mark behavior, and read through both legal pages for the corrected language.
