"use client";

import { useState, type ReactNode } from "react";
import { TopNav } from "@/app/components/home/TopNav";
import { StatusBar } from "@/app/components/home/StatusBar";
import { Explorer } from "@/app/components/home/Explorer";

/**
 * WorkShell — page chrome for /work. Reuses the global TopNav + StatusBar so
 * navigation stays identical to the home page, but the body is a single
 * full-width column (no explorer rail) since the work grid wants the room.
 *
 * The mobile drawer mirrors the home page: it slides in the Explorer so the
 * top-bar menu button behaves the same everywhere.
 */
export function WorkShell({ children }: { children: ReactNode }) {
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
            className="absolute inset-y-0 left-0 w-[80%] max-w-[300px] overflow-y-auto"
            style={{ boxShadow: "var(--shadow-soft-drop)" }}
          >
            <Explorer inDrawer />
          </div>
        </div>
      )}
    </div>
  );
}
