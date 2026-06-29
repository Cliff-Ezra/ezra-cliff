"use client";

import { useState, type ReactNode } from "react";
import { TopNav } from "./TopNav";
import { StatusBar } from "./StatusBar";
import { MobileNav } from "./MobileNav";

export function HomeShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col">
      <TopNav drawerOpen={drawerOpen} onDrawerToggle={() => setDrawerOpen((o) => !o)} />

      <main className="mx-auto w-full flex-1 px-5 py-10 sm:px-8 sm:py-14" style={{ maxWidth: 960 }}>
        {children}
      </main>

      <StatusBar />

      {/* Mobile slide-in nav */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0"
            style={{ background: "rgba(23,23,23,0.35)", backdropFilter: "blur(2px)", border: "none" }}
          />
          <div
            className="absolute inset-y-0 left-0 w-[82%] max-w-[320px]"
            style={{ boxShadow: "var(--shadow-soft-drop)" }}
          >
            <MobileNav onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
