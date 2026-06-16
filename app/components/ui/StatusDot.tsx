import type { CSSProperties, ReactNode } from "react";

/**
 * StatusDot — the brand's emoji-free status indicator: a colored dot + label.
 * Used for "open to work", "available", system states. Per the design system,
 * status is NEVER an emoji — always a colored dot with a word.
 */
export type StatusTone = "success" | "warning" | "error" | "muted";

const DOT_COLOR: Record<StatusTone, string> = {
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
  muted: "var(--color-muted)",
};

export function StatusDot({
  tone = "success",
  children,
  mono = false,
  style = {},
}: {
  tone?: StatusTone;
  children: ReactNode;
  /** Render the label in JetBrains Mono (for terminal/status-bar contexts). */
  mono?: boolean;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
        fontSize: mono ? 12 : 14,
        fontWeight: 500,
        color: "var(--color-body)",
        lineHeight: 1.4,
        ...style,
      }}
    >
      <span
        aria-hidden
        style={{
          width: 8,
          height: 8,
          borderRadius: "var(--radius-pill)",
          background: DOT_COLOR[tone],
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}
