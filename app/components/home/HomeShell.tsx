"use client";

import { useState, type ReactNode } from "react";
import { TopNav } from "./TopNav";
import { StatusBar } from "./StatusBar";
import { Explorer } from "./Explorer";

/**
 * Layout:
 *  - md+ : two columns — explorer rail | main content.
 *  - <md : single column; the explorer + section links live in a slide-in
 *          drawer toggled from the top bar.
 *
 * The README content is passed as `children` so it can be server-rendered
 * while this client shell owns the interactive drawer state.
 */
export function HomeShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col">
      <TopNav drawerOpen={drawerOpen} onDrawerToggle={() => setDrawerOpen((o) => !o)} />

      <div
        className="mx-auto grid w-full flex-1 grid-cols-1 md:grid-cols-[var(--explorer-width)_1fr]"
        style={{ maxWidth: "var(--container-max)" }}
      >
        {/* Explorer rail — desktop only, sticky like an IDE sidebar */}
        <aside
          className="hidden self-start md:block md:sticky"
          style={{
            top: "var(--nav-height)",
            height: "calc(100dvh - var(--nav-height) - var(--statusbar-height))",
          }}
        >
          <Explorer />
        </aside>

        {/* README content */}
        <main className="min-w-0 px-5 py-8 sm:px-8 sm:py-12">{children}</main>
      </div>

      <StatusBar />

      {/* Mobile drawer */}
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
