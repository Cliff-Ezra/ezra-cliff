"use client";

import { useState, type ReactNode } from "react";
import { TopNav } from "@/app/components/home/TopNav";
import { StatusBar } from "@/app/components/home/StatusBar";
import { MobileNav } from "@/app/components/home/MobileNav";

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

      {/* Mobile drawer — same Explorer slide-in as the home page */}
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
