"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MobileNav } from "./MobileNav";

/**
 * MobileDrawer — the animated slide-in menu used by every page's chrome.
 * The panel springs in from the left (fades for reduced-motion) and the scrim
 * cross-fades; AnimatePresence gives it a matching exit on close. Body scroll
 * is locked while open. Renders the shared MobileNav inside.
 */
export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const panel = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0"
            style={{ background: "rgba(23,23,23,0.35)", backdropFilter: "blur(2px)", border: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 w-[82%] max-w-[320px]"
            style={{ boxShadow: "var(--shadow-soft-drop)" }}
            initial={panel.initial}
            animate={panel.animate}
            exit={panel.exit}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
          >
            <MobileNav onClose={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
