"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Tag } from "@/app/components/ui";
import { INITIAL_VISIBLE, roles, type Role } from "@/app/lib/experience";

/** One role on the timeline: header + summary + stack, with a per-role
    "read more" that reveals the detailed accomplishments. */
function RoleItem({ role, last }: { role: Role; last: boolean }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.li
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative", paddingLeft: 28, paddingBottom: last ? 0 : 30 }}
    >
      {/* Timeline dot — filled for the current role, hollow otherwise. */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 5,
          width: 11,
          height: 11,
          borderRadius: "var(--radius-pill)",
          background: role.current ? "var(--color-ink)" : "var(--color-canvas)",
          border: `2px solid ${role.current ? "var(--color-ink)" : "var(--color-hairline-strong)"}`,
          boxSizing: "border-box",
        }}
      />

      {/* Header: title · company on the left, period (+ location) on the right. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--color-ink)", lineHeight: 1.3 }}>
          {role.title} <span style={{ color: "var(--color-muted)", fontWeight: 500 }}>· {role.company}</span>
        </h3>
        <span style={{ textAlign: "right", lineHeight: 1.4 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-muted)" }}>
            {role.period}
          </span>
          <span
            className="block"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-muted-soft)" }}
          >
            {role.location}
          </span>
        </span>
      </div>

      <p className="ds-body" style={{ marginTop: 8, fontSize: 14, maxWidth: 620 }}>
        {role.summary}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {role.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {/* Per-role expand */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-3"
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: 12.5,
          color: "var(--color-text-link)",
        }}
      >
        {open ? "read less ↑" : "read more ↓"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -4 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", maxWidth: 640 }}>
              {role.details.map((d) => (
                <li
                  key={d}
                  className="ds-body"
                  style={{ position: "relative", paddingLeft: 16, marginTop: 8, fontSize: 14 }}
                >
                  <span
                    aria-hidden
                    style={{ position: "absolute", left: 0, color: "var(--color-muted)" }}
                  >
                    –
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

/**
 * ExperienceTimeline — shows the most recent `INITIAL_VISIBLE` roles, with a
 * "show more" toggle for the rest (rendered only when there are extra roles).
 * Each role carries its own "read more" for the detailed bullets.
 */
export function ExperienceTimeline() {
  const [showAll, setShowAll] = useState(false);
  const hasMore = roles.length > INITIAL_VISIBLE;
  const visible = showAll ? roles : roles.slice(0, INITIAL_VISIBLE);

  return (
    <div>
      <ol style={{ position: "relative", listStyle: "none", margin: 0, padding: 0 }}>
        {/* Vertical rail behind the dots. */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 5,
            top: 8,
            bottom: 8,
            width: 1,
            background: "var(--color-hairline-strong)",
          }}
        />
        {visible.map((role, i) => (
          <RoleItem key={role.id} role={role} last={i === visible.length - 1} />
        ))}
      </ol>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll}
          className="mt-4 ml-7"
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--color-text-link)",
          }}
        >
          {showAll ? "show fewer roles ↑" : `show ${roles.length - INITIAL_VISIBLE} more roles ↓`}
        </button>
      )}
    </div>
  );
}
