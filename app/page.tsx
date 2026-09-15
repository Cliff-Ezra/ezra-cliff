import GhostHero from "@/app/components/coming-soon/GhostHero";
import HomePage from "@/app/components/home/HomePage";
import { showComingSoon } from "@/app/lib/siteMode";

export default function Page() {
  return showComingSoon ? <GhostHero /> : <HomePage />;
}