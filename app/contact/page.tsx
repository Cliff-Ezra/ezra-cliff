import type { Metadata } from "next";
import GhostHero from "@/app/components/coming-soon/GhostHero";
import { PageShell } from "@/app/components/layout/PageShell";
import { ContactPage } from "@/app/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Cliff Ezra Esau — open to full-stack roles, freelance builds and collaborations.",
};

export default function ContactRoute() {
  const isLive = process.env.NEXT_PUBLIC_SITE_MODE === "staging";
  if (!isLive) return <GhostHero />;

  return (
    <PageShell>
      <ContactPage />
    </PageShell>
  );
}
