import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

/**
 * Button — the brand's action primitive.
 * Black is the only CTA voltage (it flips to white in dark mode via the
 * --color-primary token). Pills are reserved for badges, so every button
 * sits at radius-md (8px). The blue text-link is inline-only (tertiary).
 *
 * Hover/press states live in interactions.css, keyed off the ds-btn classes.
 */
export type ButtonVariant = "primary" | "secondary" | "tertiary-text";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  download?: boolean | string;
  disabled?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
};

const SIZES: Record<ButtonSize, { height: number; padding: string; font: number }> = {
  sm: { height: 32, padding: "0 12px", font: 13 },
  md: { height: 40, padding: "0 18px", font: 14 },
  lg: { height: 48, padding: "0 22px", font: 15 },
};

const VARIANTS: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: "var(--color-primary)",
    color: "var(--color-on-primary)",
  },
  secondary: {
    background: "var(--color-surface-card)",
    color: "var(--color-ink)",
    borderColor: "var(--color-hairline-strong)",
  },
  "tertiary-text": {
    background: "transparent",
    color: "var(--color-text-link)",
    padding: "0 2px",
    height: "auto",
  },
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  download,
  disabled = false,
  iconLeft,
  iconRight,
  children,
  className = "",
  style = {},
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const s = SIZES[size];

  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: s.height,
    padding: s.padding,
    fontFamily: "var(--font-sans)",
    fontSize: s.font,
    fontWeight: 500,
    lineHeight: 1,
    borderRadius: "var(--radius-md)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background 120ms ease, border-color 120ms ease, color 120ms ease, opacity 120ms ease",
    opacity: disabled ? 0.45 : 1,
    boxSizing: "border-box",
  };

  const mergedStyle: CSSProperties = { ...base, ...VARIANTS[variant], ...style };
  const cls = `ds-btn ds-btn--${variant} ${className}`.trim();
  const inner = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );

  if (href && !disabled) {
    // A same-origin download (e.g. the CV) saves the file directly.
    if (download) {
      return (
        <a
          href={href}
          download={download}
          className={cls}
          style={mergedStyle}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {inner}
        </a>
      );
    }
    const external = /^https?:\/\//.test(href) || href.endsWith(".pdf");
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          style={mergedStyle}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cls}
        style={mergedStyle}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      className={cls}
      style={mergedStyle}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
