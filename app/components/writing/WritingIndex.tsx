"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RevealItem, Stagger } from "@/app/components/ui";
import type { PostMeta, WritingCategory, WritingFilter } from "@/app/lib/writing";
import { FeaturedPost } from "./FeaturedPost";
import { PostCard } from "./PostCard";

/**
 * WritingIndex — the /writing main pane. Owns the (client-side, instant) filter
 * state; the chip list and post count are derived from the posts data passed in
 * by the server page, never hand-maintained. Mirrors WorkIndex so the two
 * sections feel identical.
 *
 * Layout: when viewing "All", the newest/featured post gets the large hero card
 * and the rest fill the grid. When a category is selected, the hero is dropped
 * and every matching post (including the featured one) shows in the grid.
 */
export function WritingIndex({
  posts,
  categories,
  featuredSlug,
}: {
  posts: PostMeta[];
  categories: WritingCategory[];
  featuredSlug?: string;
}) {
  const [filter, setFilter] = useState<WritingFilter>("All");
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === "All" ? posts : posts.filter((p) => p.category === filter)),
    [filter, posts],
  );

  const showHero = filter === "All";
  const featured = showHero ? posts.find((p) => p.slug === featuredSlug) : undefined;
  const gridPosts = featured ? visible.filter((p) => p.slug !== featured.slug) : visible;

  const chips: WritingFilter[] = ["All", ...categories];

  return (
    <Stagger>
      {/* Header */}
      <RevealItem>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-success)" }}>
          $ ls writing/
        </p>
      </RevealItem>
      <RevealItem style={{ marginTop: 14 }}>
        <h1 className="ds-display-lg">Writing</h1>
      </RevealItem>
      <RevealItem style={{ marginTop: 16 }}>
        <p className="ds-body" style={{ maxWidth: 600, fontSize: 17 }}>
          Notes on distributed systems, shipping in low-connectivity environments,
          and making software that actually helps people.
        </p>
      </RevealItem>

      {/* Filter chips + count */}
      <RevealItem style={{ marginTop: 32 }}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts by topic">
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
                  {active && (
                    <motion.span
                      layoutId="writingFilterPill"
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
            {visible.length} {visible.length === 1 ? "post" : "posts"}
          </span>
        </div>
      </RevealItem>

      {/* Featured hero (only when viewing All) */}
      {featured && (
        <RevealItem style={{ marginTop: 28 }}>
          <FeaturedPost post={featured} />
        </RevealItem>
      )}

      {/* Grid */}
      <RevealItem style={{ marginTop: 28 }}>
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {gridPosts.map((p) => (
                <motion.div
                  key={p.slug}
                  layout={!reduce}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PostCard post={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          !featured && (
            <p
              style={{
                padding: "32px 0",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--color-muted)",
              }}
            >
              {"// no posts in this topic yet"}
            </p>
          )
        )}
      </RevealItem>
    </Stagger>
  );
}
