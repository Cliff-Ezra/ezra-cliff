"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button, Icon, ThemeToggle, Wordmark } from "@/app/components/ui";
import { contactHref, navLinks, site } from "@/app/lib/site";

/** A nav link is active on its own route and any nested route below it. */
function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * TopNav — the global, constant navigation. Theme-aware chrome (light bar in
 * light mode, dark bar in dark mode) with a translucent blur. CE mark +
 * wordmark on the left; lowercase mono section links + ⌘K + theme switch +
 * Contact CTA pushed to the right.
 */
export function TopNav({
  drawerOpen,
  onDrawerToggle,
}: {
  drawerOpen: boolean;
  onDrawerToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        height: "var(--nav-height)",
        background: "var(--color-chrome)",
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        borderBottom: "1px solid var(--color-chrome-border)",
        color: "var(--color-ink)",
      }}
    >
      <div
        className="mx-auto flex h-full items-center px-4 sm:px-6"
        style={{ maxWidth: "var(--container-max)" }}
      >
        {/* CE mark + wordmark */}
        <Link href="/" className="flex items-center gap-2.5 no-underline" aria-label={`${site.name} — home`}>
          <span
            className="flex items-center justify-center"
            style={{
              width: 26,
              height: 26,
              borderRadius: "var(--radius-sm)",
              background: "var(--color-ink)",
              color: "var(--color-canvas)",
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {site.mark}
          </span>
          <Wordmark />
        </Link>

        {/* Right cluster: lowercase mono section links + ⌘K + toggle + Contact */}
        <div className="ml-auto flex items-center gap-5 sm:gap-6">
          <nav className="hidden items-center gap-5 md:flex">
            {navLinks.map((l) => {
              const active = isActivePath(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "no-underline opacity-100"
                      : "no-underline opacity-65 transition-opacity hover:opacity-100"
                  }
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    fontWeight: active ? 600 : 500,
                    color: "var(--color-ink)",
                  }}
                >
                  {l.label.toLowerCase()}
                </Link>
              );
            })}
          </nav>

          {/* Command palette affordance (wired in a later step) */}
          <kbd
            className="hidden items-center md:inline-flex"
            aria-hidden
            style={{
              gap: 4,
              padding: "3px 7px",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-muted)",
              border: "1px solid var(--color-hairline-strong)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            ⌘K
          </kbd>

          <ThemeToggle />

          <Button
            href={contactHref}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            contact
          </Button>

          {/* Mobile drawer toggle */}
          <button
            type="button"
            onClick={onDrawerToggle}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            className="inline-flex items-center justify-center md:hidden"
            style={{
              width: 32,
              height: 32,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--color-ink)",
            }}
          >
            <Icon icon={drawerOpen ? X : Menu} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
