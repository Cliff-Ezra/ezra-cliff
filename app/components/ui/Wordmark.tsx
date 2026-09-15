import type { CSSProperties } from "react";

/**
 * Wordmark — `ezra.cliff()` with the parentheses tinted blue.
 */
export function Wordmark({ size = 15 }: { size?: number }) {
  const base: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    fontSize: size,
    letterSpacing: "-0.2px",
    color: "var(--color-ink)",
  };
  return (
    <span style={base}>
      ezra.cliff<span style={{ color: "var(--color-text-link)" }}>()</span>
    </span>
  );
}
