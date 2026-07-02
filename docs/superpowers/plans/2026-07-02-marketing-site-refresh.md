# Marketing Site Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the On Board marketing site a left-aligned, more playful hero and interactive feature cards, correct the Privacy Policy/Terms of Service to match real app behavior (archived vs. deleted content, ads, sponsored posts, On Board Prime), and replace the README with a showcase-only version.

**Architecture:** Pure content/presentation change to an existing Next.js App Router site. No new routes, no new dependencies, no data-layer changes. One new client component (`FeatureCard`) is extracted from `app/page.tsx` to own its click-driven animation state; two CSS rules are added to `app/globals.css` for the new hover/press/pop-mark motion.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript. No test framework is installed in this repo (see Global Constraints).

**Spec:** `docs/superpowers/specs/2026-07-02-marketing-site-refresh-design.md`

## Global Constraints

- No automated test framework exists in this repo (no jest/vitest in `package.json`). Every task's "test cycle" is: `npm run lint`, `npx tsc --noEmit`, and a manual check in `npm run dev` — do not add a test framework to satisfy this plan (YAGNI; the spec explicitly calls out no automated tests are needed for this change).
- **Lint baseline (pre-existing, out of scope):** `npm run lint` currently reports 1 error (`app/components/Footer.tsx:11` — `react-hooks/set-state-in-effect`) and 2 warnings (`app/layout.tsx:37` — `no-page-custom-font`; `app/page.tsx:3` — unused `useEffect` import). None of these five tasks touch the lines involved. Each task's lint step should confirm the count/content of errors and warnings is **unchanged** from this baseline — not that lint is fully clean. Do not fix these as part of this plan; they're unrelated to the marketing site refresh.
- **`.next/` staleness:** if `npx tsc --noEmit` reports errors inside `.next/types/*.d 2.ts` (duplicate-identifier errors on files with a `" 2"` suffix), that's a stale/corrupted build cache, not a real type error — run `rm -rf .next` and retry before investigating further.
- Match existing theming: colors come from CSS custom properties (`var(--bg)`, `var(--text)`, `var(--text-secondary)`, `var(--card)`, `var(--border)`) defined in `app/globals.css`, never hardcoded hex values, so light/dark mode keeps working.
- Match existing JSX-text escaping convention: apostrophes/quotes inside JSX text nodes use `&apos;`, `&ldquo;`, `&rdquo;` (already used throughout `app/privacy/page.tsx` and `app/terms/page.tsx`) — required by this repo's `eslint-config-next` (`react/no-unescaped-entities`). String literals (JS props, array data) do not need escaping.
- This repo runs Next.js 16 with breaking API changes from earlier versions (see `AGENTS.md`). None of these tasks touch data fetching, routing config, or other Next-specific APIs, so this shouldn't come up — but if anything unexpected appears, check `node_modules/next/dist/docs/` before guessing.
- "Last updated" dates on the legal pages are set to **July 2, 2026** (today, per the spec).

---

## Task 1: Rewrite README.md

**Files:**
- Modify: `README.md` (full replacement)

**Interfaces:** None — standalone documentation file, no code dependencies.

- [ ] **Step 1: Replace the full file contents**

Replace the entire contents of `README.md` with:

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

- [ ] **Step 2: Verify**

Run: `cat README.md`
Expected: exactly the content above, nothing else (no leftover "Getting started", "Environment", or "Deploy" sections).

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: replace README with showcase-only version"
```

---

## Task 2: Hero section — left-aligned layout and new copy

**Files:**
- Modify: `app/page.tsx:56-133`

**Interfaces:**
- Consumes: existing `submitted`, `email`, `error`, `loading`, `handleSubmit` state/handlers already defined earlier in `Home()` — unchanged by this task.
- Produces: nothing consumed by later tasks (Task 3 touches a separate section of the same file and does not depend on this task's changes, but both tasks modify `app/page.tsx` so do this task first and commit before starting Task 3 to keep diffs clean).

- [ ] **Step 1: Replace the hero section JSX**

In `app/page.tsx`, find this block:

```tsx
        {/* Hero */}
        <section className="py-24 md:py-36 text-center px-6">
          <div className="max-w-2xl mx-auto">
            {/* Brand mark — CSS-masked so it fills with --text and adapts to light/dark */}
            <div
              aria-hidden
              className="mx-auto mb-7"
              style={{
                width: 60,
                height: 60,
                background: "var(--text)",
                WebkitMaskImage: "url(/logo.svg)",
                maskImage: "url(/logo.svg)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
            <span
              className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-8"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              Coming to IVC · Fall 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Your campus,
              <br />
              one board at a time.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
              On Board is the weekly digital bulletin board for your campus.
              Post, react, and see what&apos;s on everyone&apos;s mind — every
              Monday, a fresh board.
            </p>

            {!submitted ? (
              <div className="max-w-md mx-auto">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-wrap gap-3 justify-center"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@student.edu"
                    aria-label="Email address"
                    required
                    disabled={loading}
                    className="flex-1 min-w-48 px-4 py-3.5 rounded-2xl text-base outline-none transition-colors disabled:opacity-50"
                    style={{
                      background: "var(--card)",
                      border: "1.5px solid var(--border)",
                      color: "var(--text)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3.5 rounded-2xl text-base font-semibold hover:opacity-85 transition-opacity whitespace-nowrap disabled:opacity-50"
                    style={{ background: "var(--text)", color: "var(--bg)" }}
                  >
                    {loading ? "Joining…" : "Join the waitlist"}
                  </button>
                </form>
                {error && (
                  <p className="mt-3 text-sm text-red-500">{error}</p>
                )}
              </div>
            ) : (
              <p className="font-medium text-base" style={{ color: "var(--text)" }}>
                You&apos;re on the list. We&apos;ll reach out before launch.
              </p>
            )}
          </div>
        </section>
```

Replace it with:

```tsx
        {/* Hero */}
        <section className="py-24 md:py-36 px-6">
          <div className="max-w-2xl mx-auto">
            {/* Brand mark — CSS-masked so it fills with --text and adapts to light/dark */}
            <div
              aria-hidden
              className="mb-7"
              style={{
                width: 60,
                height: 60,
                background: "var(--text)",
                WebkitMaskImage: "url(/logo.svg)",
                maskImage: "url(/logo.svg)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
            <span
              className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-8"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              Coming to IVC · Fall 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Let&apos;s get you
              <br />
              On Board.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-lg" style={{ color: "var(--text-secondary)" }}>
              One board, your whole campus. Clean slate every Monday.
            </p>

            {!submitted ? (
              <div className="max-w-md">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-wrap gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@student.edu"
                    aria-label="Email address"
                    required
                    disabled={loading}
                    className="flex-1 min-w-48 px-4 py-3.5 rounded-2xl text-base outline-none transition-colors disabled:opacity-50"
                    style={{
                      background: "var(--card)",
                      border: "1.5px solid var(--border)",
                      color: "var(--text)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3.5 rounded-2xl text-base font-semibold hover:opacity-85 transition-opacity whitespace-nowrap disabled:opacity-50"
                    style={{ background: "var(--text)", color: "var(--bg)" }}
                  >
                    {loading ? "Joining…" : "Join the waitlist"}
                  </button>
                </form>
                {error && (
                  <p className="mt-3 text-sm text-red-500">{error}</p>
                )}
              </div>
            ) : (
              <p className="font-medium text-base" style={{ color: "var(--text)" }}>
                You&apos;re on the list. We&apos;ll reach out before launch.
              </p>
            )}
          </div>
        </section>
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: same pre-existing baseline as noted in Global Constraints — 1 error in `Footer.tsx`, 2 warnings (`layout.tsx`, `page.tsx` unused `useEffect`). No new errors/warnings from this task's changes.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. If you see duplicate-identifier errors in `.next/types/*.d 2.ts`, run `rm -rf .next` and retry (stale build cache, see Global Constraints).

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: hero content (brand mark, badge, headline, subtitle, form) is left-aligned with a ragged right edge, not centered. Headline reads "Let's get you / On Board." Subtitle reads "One board, your whole campus. Clean slate every Monday." Form and button still submit to the waitlist as before (unchanged logic).

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: left-align hero and update headline/subtitle copy"
```

---

## Task 3: Feature cards — copy, extracted component, and tap motion

**Files:**
- Create: `app/components/FeatureCard.tsx`
- Modify: `app/page.tsx:1-28` (imports and `features` data), `app/page.tsx:135-155` (rendering)
- Modify: `app/globals.css` (append motion rules)

**Interfaces:**
- Produces: `FeatureCard` component — `export default function FeatureCard({ icon, title, body }: { icon: string; title: string; body: string }): JSX.Element`. Renders one interactive card; no other file needs to know its internals.
- Consumes: CSS classes `.feature-card` and `.pop-mark` (and `@keyframes pop-float-fade`) defined in `app/globals.css` by this task; the mask image `/logo.svg` already present in `public/logo.svg`.

- [ ] **Step 1: Update the `features` data array**

In `app/page.tsx`, find:

```tsx
const features = [
  {
    icon: "📌",
    title: "Post to the board",
    body: "Share what's on your mind with your whole campus.",
  },
  {
    icon: "🔁",
    title: "Fresh every week",
    body: "Every Monday at midnight, the board clears and a fresh week begins.",
  },
  {
    icon: "🎓",
    title: "Students only",
    body: "Verified with your campus email. One board, your whole school.",
  },
  {
    icon: "💬",
    title: "React & comment",
    body: "Respond to posts with emoji reactions or leave a comment.",
  },
];
```

Replace with:

```tsx
const features = [
  {
    icon: "📌",
    title: "Post to the board",
    body: "Say what's on your mind. The whole campus sees it.",
  },
  {
    icon: "🔁",
    title: "Fresh every week",
    body: "Monday at midnight, it's wiped. Start again.",
  },
  {
    icon: "🎓",
    title: "Students only",
    body: "Your campus email gets you in. Nobody else.",
  },
  {
    icon: "💬",
    title: "React & comment",
    body: "React, reply, repeat.",
  },
];
```

- [ ] **Step 2: Create the `FeatureCard` component**

Create `app/components/FeatureCard.tsx`:

```tsx
"use client";

import { useRef, useState } from "react";

type PopMark = {
  id: number;
  x: number;
  y: number;
  rotation: number;
};

export default function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  const [marks, setMarks] = useState<PopMark[]>([]);
  const nextId = useRef(0);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = nextId.current++;
    setMarks((prev) => [
      ...prev,
      {
        id,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        rotation: Math.random() * 28 - 12, // -12deg .. +16deg, skewed right to counter the logo's left lean
      },
    ]);
  }

  function handleMarkEnd(id: number) {
    setMarks((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div
      onClick={handleClick}
      className="feature-card relative rounded-2xl p-7 cursor-pointer"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <span className="text-3xl block mb-4">{icon}</span>
      <h3 className="font-bold text-base mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {body}
      </p>
      {marks.map((m) => (
        <span
          key={m.id}
          onAnimationEnd={() => handleMarkEnd(m.id)}
          className="pop-mark"
          style={
            {
              left: m.x,
              top: m.y,
              "--r": `${m.rotation}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Add motion CSS to `globals.css`**

Append to the end of `app/globals.css`:

```css

.feature-card {
  transition: transform 0.12s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.18s ease;
}

.feature-card:hover {
  transform: scale(1.015);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
}

.feature-card:active {
  transform: scale(0.97);
}

.pop-mark {
  position: absolute;
  width: 40px;
  height: 40px;
  background: var(--text);
  -webkit-mask-image: url(/logo.svg);
  mask-image: url(/logo.svg);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  opacity: 0.9;
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(var(--r, 0deg));
  animation: pop-float-fade 0.7s ease-out forwards;
}

@keyframes pop-float-fade {
  from {
    transform: translate(-50%, -50%) rotate(var(--r, 0deg)) translateY(0);
    opacity: 0.9;
  }
  to {
    transform: translate(-50%, -50%) rotate(var(--r, 0deg)) translateY(-34px);
    opacity: 0;
  }
}
```

- [ ] **Step 4: Wire `FeatureCard` into the page**

In `app/page.tsx`, add the import after the existing `Footer` import:

```tsx
import Footer from "@/app/components/Footer";
import FeatureCard from "@/app/components/FeatureCard";
```

Then find the features-rendering block:

```tsx
        {/* Features */}
        <section className="pb-16 px-6">
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-7"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>
```

Replace with:

```tsx
        {/* Features */}
        <section className="pb-16 px-6">
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
            ))}
          </div>
        </section>
```

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: same pre-existing baseline as noted in Global Constraints — 1 error in `Footer.tsx`, 2 warnings, but the `page.tsx` unused-`useEffect` warning should now be gone if you removed it (it wasn't removed by this task; it's still expected). No new errors/warnings from the new `FeatureCard.tsx` (verified during planning: a `div` with `onClick` and no keyboard handler does not trigger `eslint-config-next`'s a11y rules in this repo's config — confirmed by test-linting this exact component).

- [ ] **Step 6: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. (This also catches the `React.CSSProperties` cast in Step 2 if the custom property syntax is wrong.) If you see duplicate-identifier errors in `.next/types/*.d 2.ts`, run `rm -rf .next` and retry (stale build cache, see Global Constraints).

- [ ] **Step 7: Manual verification**

Run: `npm run dev`, open `http://localhost:3000`, scroll to the feature cards.
Expected:
- Hovering a card scales it up slightly (1.5%) with a soft shadow, no rotation.
- Clicking/tapping a card briefly shrinks it (press feedback), and the On Board logo mark appears exactly at the click point, floats upward, and fades out over roughly 0.7s with a slight random tilt.
- Clicking rapidly in different spots on the same card produces multiple independent marks (they don't cancel each other).
- Card copy reads: "Say what's on your mind. The whole campus sees it." / "Monday at midnight, it's wiped. Start again." / "Your campus email gets you in. Nobody else." / "React, reply, repeat."

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx app/components/FeatureCard.tsx app/globals.css
git commit -m "feat: extract FeatureCard with hover/press/tap-pop motion and punchier copy"
```

---

## Task 4: Privacy Policy content updates

**Files:**
- Modify: `app/privacy/page.tsx`

**Interfaces:** None — standalone content page, no shared state or exports consumed elsewhere.

- [ ] **Step 1: Update the "Last updated" date**

Find:

```tsx
          <p className="text-sm mb-10" style={{ color: "var(--text-secondary)" }}>
            Last updated: June 26, 2026
          </p>
```

Replace with:

```tsx
          <p className="text-sm mb-10" style={{ color: "var(--text-secondary)" }}>
            Last updated: July 2, 2026
          </p>
```

- [ ] **Step 2: Add two new bullets to "Information we collect"**

Find:

```tsx
                <li>
                  <strong>Waitlist email.</strong> If you sign up on our website
                  before launch, we store your email to notify you when you are
                  admitted.
                </li>
              </ul>
            </Section>

            <Section title="How we use your information">
```

Replace with:

```tsx
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
```

- [ ] **Step 3: Correct the "Data storage" section**

Find:

```tsx
            <Section title="Data storage">
              <p>
                Your data is stored on Supabase, a managed database platform
                hosted in the United States. Board content (posts, comments,
                reactions) is permanently deleted every Monday at midnight when
                the weekly board resets. Account data persists until you delete
                your account.
              </p>
            </Section>
```

Replace with:

```tsx
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
```

- [ ] **Step 4: Correct "Data sharing", add "Legal disclosure", extend "Your rights"**

Find:

```tsx
            <Section title="Data sharing">
              <p>
                We do not sell, rent, or share your personal information with
                third parties for advertising or marketing purposes. We do not
                use your data to train AI models.
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
              </ul>
            </Section>
```

Replace with:

```tsx
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
```

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: same pre-existing baseline as noted in Global Constraints (1 error, 2 warnings, none from this file). In particular, no `react/no-unescaped-entities` warnings — check every apostrophe/quote inside JSX text above uses `&apos;`/`&ldquo;`/`&rdquo;` as shown.

- [ ] **Step 6: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. If you see duplicate-identifier errors in `.next/types/*.d 2.ts`, run `rm -rf .next` and retry (stale build cache, see Global Constraints).

- [ ] **Step 7: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/privacy`.
Expected: page renders with no console errors; "Last updated: July 2, 2026"; "Information we collect" has 7 bullets total (5 original + 2 new); "Data storage" describes archiving, not deletion; "Data sharing" describes Advertisements/Sponsored posts; a new "Legal disclosure" section appears between "Data sharing" and "Your rights"; "Your rights" has 4 bullets total.

- [ ] **Step 8: Commit**

```bash
git add app/privacy/page.tsx
git commit -m "docs: correct Privacy Policy to match actual data retention and ad practices"
```

---

## Task 5: Terms of Service content updates

**Files:**
- Modify: `app/terms/page.tsx`

**Interfaces:** None — standalone content page, no shared state or exports consumed elsewhere.

- [ ] **Step 1: Update the "Last updated" date**

Find:

```tsx
          <p
            className="text-sm mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            Last updated: June 26, 2026
          </p>
```

Replace with:

```tsx
          <p
            className="text-sm mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            Last updated: July 2, 2026
          </p>
```

- [ ] **Step 2: Correct "Weekly reset" and add "On Board Prime" and "Advertising & sponsored content" sections**

Find:

```tsx
            <Section title="Weekly reset">
              <p>
                Board content (posts, comments, reactions) is cleared every
                Monday at midnight. This is a core feature of the service. We do
                not restore archived content into active states.
              </p>
            </Section>

            <Section title="Intellectual property">
              <p>
                You retain ownership of content you post. By posting, you grant
                us a limited license to display that content to other users of
                the same board. We do not claim ownership of your posts.
              </p>
            </Section>
```

Replace with:

```tsx
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

            <Section title="Advertising & sponsored content">
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
```

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: same pre-existing baseline as noted in Global Constraints (1 error, 2 warnings, none from this file).

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. If you see duplicate-identifier errors in `.next/types/*.d 2.ts`, run `rm -rf .next` and retry (stale build cache, see Global Constraints).

- [ ] **Step 5: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/terms`.
Expected: page renders with no console errors; "Last updated: July 2, 2026"; "Weekly reset" describes archiving (not clearing/deletion) plus the mid-week-deactivation case; a new "On Board Prime" section and a new "Advertising & sponsored content" section both appear between "Weekly reset" and "Intellectual property", in that order.

- [ ] **Step 6: Commit**

```bash
git add app/terms/page.tsx
git commit -m "docs: correct Terms weekly-reset language, add Prime and advertising sections"
```

---

## Final check

- [ ] Run `npm run build` once, after all tasks are committed, to confirm the whole site still builds cleanly (`app/changelog/page.tsx` is untouched by this plan but a full build is the cheapest way to catch any cross-file mistake before calling this done).

Expected: build succeeds with no errors.
