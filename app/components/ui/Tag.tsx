import type { CSSProperties, ReactNode } from "react";

/**
 * Tag — small inline mono label at radius-xs (4px). Square-ish corners, used
 * for inline metadata (stack chips, versions, categories). Distinct from
 * Badge, which is the uppercase pill.
 */
export function Tag({
  children,
  style = {},
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.5,
        color: "var(--color-body)",
        background: "var(--color-surface-strong)",
        borderRadius: "var(--radius-xs)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
