"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * ScrollReveal — fades + lifts its children into view once they scroll near the
 * viewport. A one-shot (`once`) entrance for longer scrolling pages (e.g. the
 * project detail story). Honors prefers-reduced-motion: opacity-only, no shift.
 *
 * `delay` lets callers stagger siblings (e.g. metric cards).
 */
export function ScrollReveal({
  children,
  className,
  style,
  y = 16,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
