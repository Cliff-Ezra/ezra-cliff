"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Reveal primitives — restrained entrance motion built on Motion.
 *
 * <Stagger> orchestrates a one-time cascade; each <RevealItem> child fades up
 * a touch. Honors prefers-reduced-motion: those users get an opacity-only
 * fade with no movement (no transforms), per the brand's restraint.
 *
 * Usage:
 *   <Stagger>
 *     <RevealItem>…</RevealItem>
 *     <RevealItem>…</RevealItem>
 *   </Stagger>
 */
export function Stagger({
  children,
  className,
  style,
  stagger = 0.08,
  delayChildren = 0.05,
  inView = false,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delayChildren?: number;
  /** Trigger when the group scrolls into view (once) instead of on mount —
   * use for below-the-fold sections so the cascade is actually seen. */
  inView?: boolean;
}) {
  const trigger = inView
    ? ({ whileInView: "show", viewport: { once: true, margin: "-60px" } } as const)
    : ({ animate: "show" } as const);

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  style,
  y = 10,
  scale,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
  /** Optional initial scale (e.g. 0.97) for a subtle "pop" as it settles. */
  scale?: number;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y, scale: reduce ? 1 : scale ?? 1 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.div className={className} style={style} variants={variants}>
      {children}
    </motion.div>
  );
}
