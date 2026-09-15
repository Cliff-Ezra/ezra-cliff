"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RevealItem, Stagger } from "@/app/components/ui";
import {
  getActiveCategories,
  projects,
  type ProjectFilter,
} from "@/app/lib/projects";
import { ProjectCard } from "./ProjectCard";

/**
 * WorkIndex — the /work main pane. Owns the (client-side, instant) filter
 * state; the chip list and project count are derived from the projects data,
 * never hand-maintained.
 */
export function WorkIndex() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const reduce = useReducedMotion();
  const categories = useMemo(() => getActiveCategories(), []);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const chips: ProjectFilter[] = ["All", ...categories];

  return (
    <Stagger>
      {/* Header */}
      <RevealItem>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-success)" }}>
          $ ls projects/
        </p>
      </RevealItem>
      <RevealItem style={{ marginTop: 14 }}>
        <h1 className="ds-display-lg">Selected work</h1>
      </RevealItem>
      <RevealItem style={{ marginTop: 16 }}>
        <p className="ds-body" style={{ maxWidth: 600, fontSize: 17 }}>
          Products and open-source I&apos;ve designed and built — across fintech,
          healthcare, law and government.
        </p>
      </RevealItem>

      {/* Filter chips + count */}
      <RevealItem style={{ marginTop: 32 }}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
            {chips.map((c) => {
              const active = c === filter;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c)}
                  style={{
                    position: "relative",
                    padding: "6px 14px",
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid",
                    borderColor: active ? "var(--color-ink)" : "var(--color-hairline-strong)",
                    background: "transparent",
                    transition: "border-color 160ms ease, color 160ms ease",
                  }}
                >
                  {/* Sliding active-pill indicator (shared layout) */}
                  {active && (
                    <motion.span
                      layoutId="filterPill"
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "var(--color-ink)",
                        borderRadius: "var(--radius-pill)",
                        zIndex: 0,
                      }}
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      color: active ? "var(--color-canvas)" : "var(--color-body)",
                    }}
                  >
                    {c}
                  </span>
                </button>
              );
            })}
          </div>
          <span
            className="ml-auto"
            style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-muted)" }}
          >
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </span>
        </div>
      </RevealItem>

      {/* Grid */}
      <RevealItem style={{ marginTop: 28 }}>
        {/* Columns per row: tweak the grid-cols-* classes below to taste.
            sm:grid-cols-2 = 2-up on tablet, lg:grid-cols-3 = 3-up on desktop. */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.div
                  key={p.slug}
                  layout={!reduce}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p
            style={{
              padding: "32px 0",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--color-muted)",
            }}
          >
            {"// no projects in this category yet"}
          </p>
        )}
      </RevealItem>
    </Stagger>
  );
}
