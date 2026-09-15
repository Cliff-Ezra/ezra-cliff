import type { Metadata } from "next";
import GhostHero from "@/app/components/coming-soon/GhostHero";
import { PageShell } from "@/app/components/layout/PageShell";
import { AboutPage } from "@/app/components/about/AboutPage";
import { showComingSoon } from "@/app/lib/siteMode";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cliff Ezra Esau — full-stack engineer in Nairobi. Five years building backend-heavy products across fintech, healthcare, law and government.",
};

export default function AboutRoute() {
  if (showComingSoon) return <GhostHero />;

  return (
    <PageShell>
      <AboutPage />
    </PageShell>
  );
}
