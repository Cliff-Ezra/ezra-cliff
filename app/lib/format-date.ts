/**
 * Date formatting for the writing pages. Pure (no fs), so it's safe to import
 * into client components — unlike app/lib/writing.ts which reads the filesystem.
 */

/** "Mar 2026", or "MAR 2026" when `upper` is set (the mono meta labels). */
export function formatMonthYear(iso: string, upper = false): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const s = d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return upper ? s.toUpperCase() : s;
}
