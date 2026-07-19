# Overnight web polish — performance, sharing, SEO, 404

**Date:** 2026-07-17 · **Author:** Claude (autonomous overnight session, user-granted carte blanche: "do improvements on literally anything… make the website cool and engaging")

## Context

`onboard-web` (onboardapp.org) already has a strong in-flight redesign (uncommitted): hero stagger, marquee, scroll-driven BoardScene with red takeover, interactive try-posting demo, about page. Design quality, a11y (reduced-motion, focus-visible, skip link), and fluid type are all solid. This session **does not touch the redesign's visual direction** — it fixes the gaps around it.

A backup of the pre-session working tree diff is saved at
`/private/tmp/claude-501/-Users-jawadkhadra-On-Board/0b2c0b13-0294-4736-a680-9635d4ec98a0/scratchpad/onboard-web-pre-session.diff`.

## Problems found

1. **Fonts are render-blocking third-party CSS.** `app/layout.tsx` loads Zalando Sans SemiExpanded + Expanded from fonts.googleapis.com via `<link rel="stylesheet">` — a render-blocking request chain (CSS → font files) on every cold visit, plus layout shift on swap. Verified both families exist in `next/font`'s registry.
2. **Link sharing looks bad.** OG image is the 512×512 app icon with `twitter: summary`. The audience is college students sharing links in group chats/Discord/iMessage — a designed 1200×630 card is a real growth surface.
3. **SEO gaps.** `/about` (new page) missing from `sitemap.ts`; no `robots.ts`; `about`/`contact`/`changelog` pages have title-only metadata (no descriptions); title tagline inconsistent between OG ("Your Community Board") and Twitter ("Your Campus Bulletin Board"); no per-page title template; no JSON-LD.
4. **Default 404.** Next's unbranded not-found page — a missed on-brand moment ("this post got cleared").
5. **Micro-UX.** The try-posting draft card (ComingSoon) can't be dismissed with Escape.

## Design

1. **`next/font/google` migration** — replace the `<head>` stylesheet links with `Zalando_Sans_SemiExpanded` + `Zalando_Sans_Expanded` (variable weight range, `display: swap`), exposed as CSS variables `--font-sans` / `--font-display`; `globals.css` `@layer base` font-family rules switch to those variables with the same fallback stack. Self-hosted at build time → no third-party request, no render-blocking CSS, metric-adjusted fallback eliminates CLS.
2. **OG image** — `app/opengraph-image.tsx` using `next/og` `ImageResponse` (statically generated at build). Design: monochrome brand — black canvas, the wordmark "On Board." huge in white, tagline underneath, one pastel board card tilted at the edge for recognition. Also `twitter-image` via alias and `card: summary_large_image`.
3. **Metadata pass** — root layout gets `title: { default, template: "%s — On Board" }`; child pages drop the hand-written "— On Board" suffixes; add descriptions to about/contact/changelog; unify tagline to "Your Community Board" (matches the OAuth-verification rename in recent commits); add `robots.ts`; add `/about` to `sitemap.ts`; JSON-LD (`Organization` + `MobileApplication`) injected in the root layout.
4. **Branded 404** — `app/not-found.tsx`: a tilted board card with title "This post got cleared." body copy about the Monday wipe, and a "Back to the board" link home. Static, no client JS.
5. **Escape-to-cancel** on the ComingSoon draft form (`onKeyDown` → `setIsEditing(false)`).

## Non-goals

- No changes to the redesign's look/copy beyond the items above; no new sections.
- No commits (user hasn't asked; tree holds their uncommitted work).
- No iOS/admin/android changes tonight.

## Verification

`npm run build` must pass (known pre-existing lint error in Footer.tsx is out of scope); then `npm run start` and curl the rendered HTML to confirm font `<link>`s are gone, metadata/JSON-LD present, `/opengraph-image` returns a 200 PNG, and `/definitely-not-a-page` renders the branded 404.
