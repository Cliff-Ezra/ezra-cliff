/**
 * Deterministic two-stop gradient seeded from a slug — a stable, distinct
 * placeholder cover per project until real screenshots / painterly covers land.
 * Shared by the work card and the project detail page so both match.
 */
export function coverGradient(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 360;
  }
  const a = hash;
  const b = (hash + 80) % 360;
  return `linear-gradient(135deg, hsl(${a} 62% 58%), hsl(${b} 58% 52%))`;
}
