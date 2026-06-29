"use client";

import { useState, type ReactNode } from "react";
import { TopNav } from "./TopNav";
import { StatusBar } from "./StatusBar";
import { MobileDrawer } from "./MobileDrawer";

export function HomeShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col">
      <TopNav drawerOpen={drawerOpen} onDrawerToggle={() => setDrawerOpen((o) => !o)} />

      <main className="mx-auto w-full flex-1 px-5 py-10 sm:px-8 sm:py-14" style={{ maxWidth: 960 }}>
        {children}
      </main>

      <StatusBar />

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
