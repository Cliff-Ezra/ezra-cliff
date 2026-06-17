"use client";

import { GitBranch } from "lucide-react";
import { ContactLinks, Icon, StatusDot, ThemeToggle, useTheme } from "@/app/components/ui";
import { site } from "@/app/lib/site";

/**
 * Mirrors an editor status line: branch · online · contact links on the left,
 * encoding + theme switch on the right.
 */
export function StatusBar() {
  const { theme } = useTheme();

  const itemStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--color-muted)",
  };

  return (
    <footer
      style={{
        height: "var(--statusbar-height)",
        background: "var(--color-chrome-solid)",
        borderTop: "1px solid var(--color-chrome-border)",
      }}
    >
      <div
        className="mx-auto flex h-full items-center gap-4 px-4 sm:px-6"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <span style={itemStyle}>
          <Icon icon={GitBranch} size={13} /> {site.branch}
        </span>
        <StatusDot tone="success" mono style={{ color: "var(--color-muted)" }}>
          online
        </StatusDot>
        <ContactLinks size={14} gap={10} />

        <div className="ml-auto flex items-center gap-4">
          <span style={itemStyle} className="hidden sm:inline-flex">
            UTF-8
          </span>
          <span style={itemStyle}>{theme}</span>
          <ThemeToggle compact />
        </div>
      </div>
    </footer>
  );
}
