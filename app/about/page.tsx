import type { Metadata } from "next";
import GhostHero from "@/app/components/coming-soon/GhostHero";
import { PageShell } from "@/app/components/layout/PageShell";
import { AboutPage } from "@/app/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cliff Ezra Esau — full-stack engineer in Nairobi. Five years building backend-heavy products across fintech, healthcare, law and government.",
};

export default function AboutRoute() {
  const isLive = process.env.NEXT_PUBLIC_SITE_MODE === "staging";
  if (!isLive) return <GhostHero />;

  return (
    <PageShell>
      <AboutPage />
    </PageShell>
  );
}
