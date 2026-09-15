/**
 * Site-mode switch — single source of truth for the coming-soon gate.
 *
 * Controlled by the NEXT_PUBLIC_SITE_MODE env var:
 *   - "coming_soon"           → every page renders the GhostHero placeholder
 *   - anything else, or unset → the real site renders
 *
 * Fail-safe by design: a missing or misconfigured value shows the real
 * site rather than accidentally hiding it behind the placeholder.
 */
export const showComingSoon =
  process.env.NEXT_PUBLIC_SITE_MODE === "coming_soon";
