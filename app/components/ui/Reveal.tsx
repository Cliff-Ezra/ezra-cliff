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
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      animate="show"
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
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.div className={className} style={style} variants={variants}>
      {children}
    </motion.div>
  );
}
