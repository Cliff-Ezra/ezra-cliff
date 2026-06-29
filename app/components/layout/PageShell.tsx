"use client";

import { useState, type ReactNode } from "react";
import { TopNav } from "@/app/components/home/TopNav";
import { StatusBar } from "@/app/components/home/StatusBar";
import { MobileDrawer } from "@/app/components/home/MobileDrawer";

/**
 * PageShell — generic page chrome for the content routes (/work, /about,
 * /contact). Reuses the global TopNav + StatusBar so navigation stays identical
 * to the home page; the body is a single full-width column.
 *
 * The mobile drawer mirrors the home page: the top-bar menu button slides in
 * the simple MobileNav, so navigation is identical everywhere.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col">
      <TopNav drawerOpen={drawerOpen} onDrawerToggle={() => setDrawerOpen((o) => !o)} />

      <main
        className="mx-auto w-full flex-1 px-5 py-8 sm:px-8 sm:py-12"
        style={{ maxWidth: "var(--container-max)" }}
      >
        {children}
      </main>

      <StatusBar />

      {/* Mobile drawer — identical to the home page */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
