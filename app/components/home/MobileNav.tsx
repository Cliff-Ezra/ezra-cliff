"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { ContactLinks, Icon, RevealItem, Stagger, Wordmark } from "@/app/components/ui";
import { contactHref, navLinks, site } from "@/app/lib/site";

export function MobileNav({ onClose }: { onClose: () => void }) {
  const links = [...navLinks, { label: "Contact", href: contactHref }];

  return (
    <nav
      className="flex h-full flex-col bg-surface-card"
      style={{ padding: "16px 18px" }}
    >
      {/* Header: brand + close */}
      <div className="flex items-center justify-between" style={{ height: "var(--nav-height)", marginTop: -8 }}>
        <span className="flex items-center gap-2.5">
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
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex items-center justify-center"
          style={{ width: 36, height: 36, background: "transparent", border: "none", cursor: "pointer", color: "var(--color-ink)" }}
        >
          <Icon icon={X} size={22} />
        </button>
      </div>

      {/* Section links — cascade in after the panel slides */}
      <Stagger className="mt-4 flex flex-col" stagger={0.05} delayChildren={0.12}>
        {links.map((l) => (
          <RevealItem key={l.href} y={8}>
            <Link
              href={l.href}
              onClick={onClose}
              className="no-underline transition-colors hover:bg-surface-strong"
              style={{
                display: "block",
                padding: "14px 8px",
                borderRadius: "var(--radius-md)",
                fontSize: 18,
                fontWeight: 600,
                color: "var(--color-ink)",
              }}
            >
              {l.label}
            </Link>
          </RevealItem>
        ))}
      </Stagger>

      {/* Social pinned to the bottom */}
      <div
        className="mt-auto flex items-center justify-between"
        style={{ paddingTop: 16, borderTop: "1px solid var(--color-hairline)" }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-muted)" }}>
          {site.location}
        </span>
        <ContactLinks size={18} gap={16} />
      </div>
    </nav>
  );
}
