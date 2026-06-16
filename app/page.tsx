import GhostHero from "@/app/components/coming-soon/GhostHero";
import HomePage from "@/app/components/home/HomePage";

export default function Page() {
  const isLive = process.env.NEXT_PUBLIC_SITE_MODE === "staging";
  return isLive ? <HomePage /> : <GhostHero />;
}