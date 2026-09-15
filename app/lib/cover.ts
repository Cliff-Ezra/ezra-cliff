/**
 * Deterministic two-stop gradient seeded from a slug — a stable, distinct
 * placeholder cover per project until real screenshots / painterly covers land.
 * Shared by the work card and the project detail page so both match.
 */
export function coverGradient(slug: string): string {
  const a = slugHue(slug);
  const b = (a + 80) % 360;
  return `linear-gradient(135deg, hsl(${a} 62% 58%), hsl(${b} 58% 52%))`;
}

/** Deterministic base hue (0–359) for a slug — seeds the fallback gradient
 * shown when a post or project has no cover image yet. */
function slugHue(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 360;
  }
  return hash;
}
