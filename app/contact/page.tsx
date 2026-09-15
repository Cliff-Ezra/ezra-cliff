import type { Metadata } from "next";
import GhostHero from "@/app/components/coming-soon/GhostHero";
import { PageShell } from "@/app/components/layout/PageShell";
import { ContactPage } from "@/app/components/contact/ContactPage";
import { showComingSoon } from "@/app/lib/siteMode";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Cliff Ezra Esau — open to full-stack roles, freelance builds and collaborations.",
};

export default function ContactRoute() {
  if (showComingSoon) return <GhostHero />;

  return (
    <PageShell>
      <ContactPage />
    </PageShell>
  );
}
