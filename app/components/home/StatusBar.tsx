"use client";

import { GitBranch, MapPin } from "lucide-react";
import { Icon, StatusDot, ThemeToggle, useTheme } from "@/app/components/ui";
import { site } from "@/app/lib/site";

/**
 * Mirrors an editor status line: branch · location · availability on the
 * left, encoding + theme switch on the right.
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
        <span style={itemStyle} className="hidden sm:inline-flex">
          <Icon icon={MapPin} size={13} /> Nairobi
        </span>
        <StatusDot tone="success" mono style={{ color: "var(--color-muted)" }}>
          available
        </StatusDot>

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
