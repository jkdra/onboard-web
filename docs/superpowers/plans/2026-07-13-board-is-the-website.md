# "The Board Is the Website" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the On Board marketing site into a monochrome, oversized-type, scrollytelling experience where colorful post cards are the only color.

**Architecture:** Homepage becomes a thin composition of section components under `app/components/home/`. A shared fluid type scale lives in `globals.css` as CSS variables. The scrollytelling board is driven by `motion`'s `useScroll`/`useTransform`. Subpages inherit the new shell (SiteHeader + FooterFinale).

**Tech Stack:** Next 16 (App Router), Tailwind 4, `motion` (only new dep), React `<ViewTransition>` (experimental flag).

## Global Constraints

- Hero tagline verbatim: **"Let's get you On Board."**
- Monochrome shell; color only in BoardCards/screenshots (pastels: green `#d9f2df`, orange `#fde8cd`, blue `#d6e9fb`, pink `#fbd8e0`; dark variants desaturated/darkened, e.g. `#1d2b21`, `#2e2418`, `#1a2635`, `#2e1d23`).
- Fluid type: every step `clamp()` with a rem term, max ≤ 2.5× min. Scale (`globals.css`):
  `--step-0: clamp(1rem, 0.93rem + 0.35vw, 1.25rem)`
  `--step-1: clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem)`
  `--step-2: clamp(1.6rem, 1.35rem + 1.3vw, 2.6rem)`
  `--step-3: clamp(2.1rem, 1.6rem + 2.4vw, 4rem)`
  `--step-4: clamp(2.75rem, 1.9rem + 4.2vw, 6.25rem)`
  `--step-5: clamp(3.4rem, 2.2rem + 6vw, 8.5rem)`
- `prefers-reduced-motion`: static fallbacks for marquee, board scene, reveals.
- Existing theme variables + 3-way switcher preserved. Waitlist Supabase logic unchanged.
- No GNU `timeout`; bypass rtk hook with absolute paths (`/usr/bin/git`, `/usr/bin/env npm`).
- Known pre-existing lint error in `Footer.tsx:11` — ignore.
- Verification = `npx tsc --noEmit` + `npm run build` + browser workflow (no unit-test infra in repo; do not add one).

---

### Task 1: Type scale + global CSS foundation
**Files:** Modify `app/globals.css`
- [ ] Add `--step-0…5`, pastel card variables (light + dark), marquee keyframes (`@keyframes marquee { to { transform: translateX(-50%) } }`, paused/static under reduced motion), scroll-reveal utility using `animation-timeline: view()` wrapped in `@supports`, hero stagger keyframes.
- [ ] `npx tsc --noEmit` passes; commit.

### Task 2: Shell — SiteHeader + FooterFinale
**Files:** Create `app/components/SiteHeader.tsx`, `app/components/FooterFinale.tsx`; Modify `app/components/Footer.tsx` (restyle only, keep theme logic), `app/layout.tsx` (render SiteHeader above children).
**Interfaces:** `SiteHeader` (server, no props): masked logo → `/`, right-side `/changelog` link. `FooterFinale` (no props): viewport-width masked wordmark (logo + "On Board" text at `--step-5`), then renders existing `<Footer />`.
- [ ] Build components; verify in browser both themes; commit.

### Task 3: BoardCard
**Files:** Create `app/components/home/BoardCard.tsx`
**Interfaces (produced, used by Tasks 5 & 7):**
```ts
type BoardCardProps = {
  color: "green" | "orange" | "blue" | "pink";
  title: string; body: string; tags?: string[];
  reactions?: { icon: string; count: number }[];
  timestamp?: string; className?: string; style?: React.CSSProperties;
};
```
Rounded-2xl pastel card matching iOS app style: bold title, secondary body, pill tags, reaction row with dot separators + timestamp.
- [ ] Implement; render a temp test row on `/` to eyeball vs screenshots; remove temp; commit.

### Task 4: Hero + Marquee
**Files:** Create `app/components/home/Hero.tsx` (client — owns waitlist form state, logic copied verbatim from current `page.tsx`), `app/components/home/Marquee.tsx` (server).
- Hero: full-viewport, logo mark, badge "Coming to IVC · Fall 2026", h1 "Let's get you On Board." at `--step-5`, subline, form, scroll cue; line-stagger reveal via CSS.
- Marquee: duplicated content list (aria-hidden second copy) of ~8 post one-liners in ghost outlined text (`-webkit-text-stroke`), pause on hover.
- [ ] Implement both; browser-verify mobile + desktop + reduced motion; commit.

### Task 5: BoardScene (scrollytelling)
**Files:** Create `app/components/home/BoardScene.tsx` (client); add dep: `/usr/bin/env npm install motion`.
**Behavior:** Outer `<section style={{height: "350vh"}}>`, inner `position: sticky; top: 0; height: 100vh`. `useScroll({ target: outerRef, offset: ["start start", "end end"] })`. Timeline on `scrollYProgress`:
- 0–0.5: 6 BoardCards fly in sequentially (each card i: opacity/x/y/rotate transforms over `[i*0.08, i*0.08+0.12]`) onto a 2–3-col masonry with rotations (−4°…+4°). Narration headings swap at 0.15/0.35 ("Post it." / "The whole campus sees it." / "React, reply, repeat.") at `--step-4`.
- 0.5–0.65: countdown card scales in ("CLEARS MONDAY", numbers driven from progress so it "ticks down").
- 0.65–0.8: the wipe — all cards translate off with fade; copy "Monday, 12:00 AM. Clean slate."
- 0.8–1: fresh green card drops in: "Fresh week. Who's first?"
- Reduced motion (`useReducedMotion`): render static populated grid + all copy, no sticky theater.
- [ ] Implement; browser-verify scroll choreography + reduced motion; commit.

### Task 6: Manifesto
**Files:** Create `app/components/home/Manifesto.tsx` (server).
Four statements (from existing features), numbered 01–04, `--step-3/4` type, hairline top rules, scroll-reveal class from Task 1.
- [ ] Implement; verify; commit.

### Task 7: Screenshots section (stand-in) + page composition
**Files:** Create `app/components/home/Screenshots.tsx`; Rework `app/page.tsx` to compose Hero → Marquee → BoardScene → Manifesto → Screenshots → FooterFinale; delete `app/components/FeatureCard.tsx` and old page body.
- Screenshots: checks a hardcoded manifest of `/screenshots/*.png`; if images exist use them in monochrome phone frames with differential parallax (light `motion` transforms); until then renders 3 phone frames filled with BoardCards. Swapping = drop PNGs + flip manifest.
- [ ] Compose; full-page browser pass (both themes, 375px + desktop, waitlist submit against Supabase); commit.

### Task 8: Subpages + view transitions
**Files:** Modify `app/changelog/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx` (new type scale, oversized titles, SiteHeader/FooterFinale shell, keep all content/logic); Create/modify `next.config.ts` (`experimental: { viewTransition: true }`); wrap page content in React `<ViewTransition>` in `app/layout.tsx`.
- [ ] Implement; verify navigation cross-fade + subpage rendering; commit.

### Task 9: Final verification
- [ ] `npx tsc --noEmit` clean; `/usr/bin/env npm run build` succeeds.
- [ ] Browser workflow: console clean, network clean, screenshot proof light+dark, mobile+desktop, reduced-motion pass.
- [ ] Update this plan's checkboxes; commit.
