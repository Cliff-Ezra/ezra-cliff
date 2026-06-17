import type { CSSProperties, ReactNode } from "react";

/**
 * Badge — small uppercase pill. The ONLY place pill geometry is allowed.
 * Default tone is the neutral surface-strong chip; semantic tones tint the
 * text for "Preview", "New", warning, etc.
 */
export type BadgeTone = "neutral" | "preview" | "warning" | "success" | "dark";

const TONES: Record<BadgeTone, CSSProperties> = {
  neutral: { background: "var(--color-surface-strong)", color: "var(--color-ink)" },
  preview: { background: "var(--color-surface-strong)", color: "var(--color-preview)" },
  warning: { background: "var(--color-surface-strong)", color: "var(--color-warning)" },
  success: { background: "var(--color-surface-strong)", color: "var(--color-success)" },
  dark: { background: "var(--color-surface-dark)", color: "var(--color-on-dark)" },
};

export function Badge({
  tone = "neutral",
  children,
  style = {},
}: {
  tone?: BadgeTone;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        fontFamily: "var(--font-sans)",
        fontSize: 11,
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: "0.88px",
        textTransform: "uppercase",
        borderRadius: "var(--radius-pill)",
        ...TONES[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
