"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/app/components/ui";
import { site } from "@/app/lib/site";

/**
 * NotFoundView — the 404 body, styled as a terminal window that "runs" a failed
 * `cd`. Sits inside PageShell so the nav + status bar stay available (a 404's
 * job is to get a lost visitor un-lost). Fades up on mount; reduced-motion
 * users get the static layout.
 */
export function NotFoundView() {
  const reduce = useReducedMotion();

  return (
    <div className="flex w-full items-center justify-center" style={{ minHeight: "62vh" }}>
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
        style={{ maxWidth: 480 }}
      >
        <div
          className="overflow-hidden"
          style={{
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-hairline-strong)",
            boxShadow: "var(--shadow-soft-drop)",
          }}
        >
          {/* Dark chrome bar — traffic lights + prompt path */}
          <div
            className="flex items-center gap-2"
            style={{
              padding: "12px 16px",
              background: "var(--color-surface-dark)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span className="flex gap-1.5">
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span key={c} aria-hidden style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
              ))}
            </span>
            <span
              style={{
                marginLeft: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 12.5,
                color: "var(--color-on-dark-soft)",
              }}
            >
              {site.repo}: ~
            </span>
          </div>

          {/* Body */}
          <div
            className="flex flex-col items-center text-center"
            style={{ padding: "40px 24px 36px", background: "var(--color-surface-card)" }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 13.5, color: "var(--color-body)" }}>
              <span style={{ color: "var(--color-success)" }}>$</span> cd ~/that-page
            </p>
            <p style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 13.5, color: "var(--color-error)" }}>
              bash: no such file or directory
            </p>

            <p
              style={{
                margin: "22px 0 0",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 84,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "var(--color-ink)",
              }}
            >
              404
            </p>

            <p className="ds-body" style={{ marginTop: 14, fontSize: 15, maxWidth: 330 }}>
              Looks like this page doesn&apos;t exist - or it moved.
            </p>

            <div className="mt-7 flex items-center justify-center">
              <Button href="/" variant="primary" size="md" style={{ fontFamily: "var(--font-mono)" }}>
                cd ~/home
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
