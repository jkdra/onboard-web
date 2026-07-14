# On Board Website Redesign — "The Board Is the Website"

**Date:** 2026-07-13
**Scope:** Whole site (homepage, changelog, privacy, terms, shared shell)
**Approved direction:** Scrollytelling board concept with editorial oversized type.

## Concept

The site behaves like the app: a strictly monochrome shell (black/white/grays, existing
light/dark variable system) where **the only color on the page is user-generated
content** — post cards and app screenshots. The weekly-reset mechanic becomes the
site's signature animation: a scroll-driven board that fills with posts, counts down,
and wipes clean.

**Hero tagline (fixed, verbatim): "Let's get you On Board."**

## Homepage sections

### 1. Hero
- Full-viewport. Small logo top-left (existing CSS-mask technique).
- Headline "Let's get you On Board." at poster scale, Zalando Sans Expanded 800,
  tight leading, fluid size via clamp() (see Type System).
- Waitlist form: identical Supabase logic (`web_waitlist` insert, 23505 treated as
  success), restyled. "Coming to IVC · Fall 2026" badge retained.
- Letter/line stagger reveal on load, CSS only.
- Scroll cue at bottom.

### 2. Marquee
- Full-bleed CSS marquee of student-post one-liners in outlined/ghost monochrome text.
- Pure CSS keyframes; pauses on hover; static row under `prefers-reduced-motion`.

### 3. The Board (scrollytelling centerpiece)
- Tall section (~300–400vh) with sticky inner viewport.
- Colorful post cards built as live HTML (`BoardCard`) matching the iOS app's card
  style: rounded-2xl pastel backgrounds (green/orange/blue/pink), title, excerpt,
  #tags, reaction counts (❤️ 💀 👥 👎), timestamps.
- Cards fly in and pin to a masonry board with slight rotations as scroll progresses;
  narration text in oversized type: "Post it." → "The whole campus sees it." →
  "React, reply, repeat."
- Countdown card ("CLEARS MONDAY …") ticks down, then **the wipe**: all cards sweep
  off, board goes empty, copy: "Monday, 12:00 AM. Clean slate." One fresh card drops
  in: "Fresh week. Who's first?"
- Implementation: `motion` package, `useScroll` + `useTransform` mapping scroll
  progress → card transforms. Reduced motion: static populated grid + copy.

### 4. Manifesto features
- The 4 features become full-width oversized statements, index-numbered 01–04,
  hairline rules between, scroll-reveal via CSS `animation-timeline: view()`
  (graceful no-animation fallback where unsupported).

### 5. Screenshots
- 2–3 real app screenshots in minimal monochrome phone frames, differential
  scroll-speed parallax.
- **Dependency:** PNGs must be added to `public/screenshots/`. Until then, the
  section ships with live `BoardCard` stand-ins; swapping in images is a drop-in.

### 6. Footer finale
- Viewport-width "On Board" wordmark (SVG-masked, theme-aware), repeated waitlist CTA,
  existing footer links + 3-way theme switcher restyled.

## Site-wide

- **Shell:** new `SiteHeader` (small logo, changelog link) + finale footer on all pages.
- **Subpages:** changelog/privacy/terms keep content, gain the fluid type scale and
  editorial layout (oversized titles).
- **View Transitions API:** CSS `@view-transition` for page navigation; progressive
  enhancement only.
- **Type system:** Utopia-style fluid scale as CSS variables `--step-0`…`--step-6`
  in globals.css. Each step: clamp() with a rem term and max ≤ 2.5× min (WCAG 1.4.4
  zoom-safe). All pages consume the scale.
- **Theming:** existing `--bg/--card/--text/--text-secondary/--border` system stays;
  add pastel card variables with muted dark-mode variants.
- **Dependencies:** `motion` is the only new package. No GSAP, no Lenis.
- **Accessibility:** `prefers-reduced-motion` honored everywhere; marquee/scroll
  scenes have static fallbacks; text contrast unchanged (pure monochrome).
- **Next 16:** read `node_modules/next/dist/docs/` before implementation (AGENTS.md).

## Files

- Rework: `app/page.tsx` (thin composition of section components),
  `app/globals.css`, `app/components/Footer.tsx`.
- New: `app/components/SiteHeader.tsx`, `app/components/home/Hero.tsx`,
  `Marquee.tsx`, `BoardScene.tsx`, `BoardCard.tsx`, `Manifesto.tsx`,
  `Screenshots.tsx`, `FooterFinale.tsx` (naming may consolidate).
- Restyle: `app/changelog/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`.

## Error handling / edge cases

- Waitlist submit errors: unchanged behavior (inline error, 23505 = success).
- No-JS: content fully readable; board renders static grid; marquee static.
- Countdown in the board scene is decorative/scripted (scroll-driven), not a live
  clock — no timezone logic needed.

## Testing / verification

- `tsc --noEmit` + build pass (known pre-existing lint error in Footer.tsx is
  unrelated).
- Browser verification: light/dark, mobile (375px) and desktop widths,
  reduced-motion emulation, page navigation transitions, waitlist submit flow.
