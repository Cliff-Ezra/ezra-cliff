import type { Metadata } from "next";
import GhostHero from "@/app/components/coming-soon/GhostHero";
import { WorkShell } from "@/app/components/work/WorkShell";
import { WorkIndex } from "@/app/components/work/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Products and open-source Ezra Cliff has designed and built — across fintech, healthcare, law and government.",
};

export default function WorkRoute() {
  const isLive = process.env.NEXT_PUBLIC_SITE_MODE === "staging";
  if (!isLive) return <GhostHero />;

  return (
    <WorkShell>
      <WorkIndex />
    </WorkShell>
  );
}
