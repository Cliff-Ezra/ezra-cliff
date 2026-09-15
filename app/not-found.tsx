import type { Metadata } from "next";
import GhostHero from "@/app/components/coming-soon/GhostHero";
import { PageShell } from "@/app/components/layout/PageShell";
import { NotFoundView } from "@/app/components/NotFoundView";

export const metadata: Metadata = {
  title: "404 — Not found",
};

/**
 * Global 404 — rendered for unmatched routes and notFound() calls.
 */
export default function NotFound() {
  const isLive = process.env.NEXT_PUBLIC_SITE_MODE === "staging";
  if (!isLive) return <GhostHero />;

  return (
    <PageShell>
      <NotFoundView />
    </PageShell>
  );
}
