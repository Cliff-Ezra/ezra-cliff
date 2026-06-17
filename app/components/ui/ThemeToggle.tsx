"use client";

import { Moon, Sun } from "lucide-react";
import { Icon } from "./Icon";
import { useTheme } from "./useTheme";

/**
 * ThemeToggle — pill switch (matches the wireframe chrome). The knob slides
 * and carries a tiny sun/moon. Theme-aware: track + knob use semantic tokens
 * so it reads on both the light and dark chrome. `compact` shrinks it for the
 * status bar. role="switch" + aria-checked keep it accessible.
 */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const trackW = compact ? 34 : 40;
  const trackH = compact ? 18 : 22;
  const border = 1;
  const pad = 2;
  const innerW = trackW - border * 2;
  const innerH = trackH - border * 2;
  const knob = innerH - pad * 2;
  const slide = innerW - knob - pad * 2;
  const iconSize = compact ? 8 : 10;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title="Toggle theme"
      style={{
        position: "relative",
        width: trackW,
        height: trackH,
        flexShrink: 0,
        borderRadius: "var(--radius-pill)",
        border: `${border}px solid var(--color-hairline-strong)`,
        background: "var(--color-surface-strong)",
        cursor: "pointer",
        transition: "background 140ms ease, border-color 140ms ease",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: pad,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: knob,
          height: knob,
          borderRadius: "var(--radius-pill)",
          background: "var(--color-ink)",
          color: "var(--color-canvas)",
          transform: `translate(${isDark ? slide : 0}px, -50%)`,
          transition: "transform 160ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Icon icon={isDark ? Moon : Sun} size={iconSize} strokeWidth={2} />
      </span>
    </button>
  );
}
