/**
 * GitHub link helpers for the /work page.
 */

/** Short repo name for display next to the GitHub icon (the "name" half). */
export function repoLabel(repo: string): string {
  const parts = repo.split("/").filter(Boolean);
  return parts.slice(-1)[0] ?? repo;
}

/** Full GitHub URL for an "owner/name" repo path. */
export function repoUrl(repo: string): string {
  return `https://github.com/${repo}`;
}
