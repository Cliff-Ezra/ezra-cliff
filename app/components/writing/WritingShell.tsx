import type { ReactNode } from "react";
import { PageShell } from "@/app/components/layout/PageShell";

/**
 * WritingShell — page chrome for /writing and /writing/[slug]. Thin alias over
 * the shared PageShell so the blog shares one source of truth for the nav,
 * status bar and mobile drawer (mirrors WorkShell).
 */
export function WritingShell({ children }: { children: ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
