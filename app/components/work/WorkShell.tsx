import type { ReactNode } from "react";
import { PageShell } from "@/app/components/layout/PageShell";

/**
 * WorkShell — page chrome for /work. Thin alias over the shared PageShell so
 * /work, /about and /contact share one source of truth for the nav, status bar
 * and mobile drawer.
 */
export function WorkShell({ children }: { children: ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
