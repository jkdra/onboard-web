/**
 * The single source of truth for the App Store download destination.
 *
 * Every download CTA on the site (Hero, /invite/[code], /auth/callback) reads
 * this. It used to be three separate inline `process.env.… || "fallback"`
 * expressions, which drifted: one of them fell back to `"#"` (a dead link) and
 * another to a hardcoded TestFlight URL.
 *
 * The literal is the locale-agnostic `apps.apple.com/app/id…` form on purpose —
 * Apple redirects it to the visitor's own storefront, whereas a `/us/` URL
 * strands international students on the US store.
 */
export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL || "https://apps.apple.com/app/id6782297168";
