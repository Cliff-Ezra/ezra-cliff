import type { Metadata } from "next";
import GhostHero from "@/app/components/coming-soon/GhostHero";
import { PageShell } from "@/app/components/layout/PageShell";
import { NotFoundView } from "@/app/components/NotFoundView";
import { showComingSoon } from "@/app/lib/siteMode";

export const metadata: Metadata = {
  title: "404 — Not found",
};

/**
 * Global 404 — rendered for unmatched routes and notFound() calls.
 */
export default function NotFound() {
  if (showComingSoon) return <GhostHero />;

  return (
    <PageShell>
      <NotFoundView />
    </PageShell>
  );
}
