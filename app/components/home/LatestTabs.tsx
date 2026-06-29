"use client";

import { useState } from "react";
import Link from "next/link";
import { coverGradient } from "@/app/lib/cover";
import { formatMonthYear } from "@/app/lib/format-date";
import type { Project } from "@/app/lib/projects";
import type { PostMeta } from "@/app/lib/writing";

type TabId = "work" | "writing";

/** Small 40px cover swatch — a slug-seeded gradient, optionally carrying a
 * glyph (projects) or a real cover image (posts). */
function Thumb({ seed, glyph, image }: { seed: string; glyph?: string; image?: string }) {
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center"
      style={{
        width: 40,
        height: 40,
        borderRadius: "var(--radius-md)",
        fontSize: 18,
        lineHeight: 1,
        background: image ? `center / cover no-repeat url(${image})` : coverGradient(seed),
      }}
    >
      {!image && glyph}
    </span>
  );
}

/** One compact, linked row: thumb · (title + sub) · trailing meta. */
function ItemRow({
  href,
  title,
  sub,
  meta,
  thumb,
  first,
}: {
  href: string;
  title: string;
  sub: string;
  meta: string;
  thumb: React.ReactNode;
  first: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 no-underline transition-colors hover:bg-surface-strong"
      style={{ padding: "12px 16px", borderTop: first ? "none" : "1px solid var(--color-hairline)" }}
    >
      {thumb}
      <span className="min-w-0 flex-1">
        <span className="block truncate" style={{ fontWeight: 600, color: "var(--color-ink)" }}>
          {title}
        </span>
        <span className="block truncate ds-body" style={{ fontSize: 13, marginTop: 1 }}>
          {sub}
        </span>
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-muted)", whiteSpace: "nowrap" }}>
        {meta}
      </span>
    </Link>
  );
}

function AllLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="no-underline transition-colors hover:bg-surface-strong"
      style={{
        display: "block",
        padding: "12px 16px",
        borderTop: "1px solid var(--color-hairline)",
        textAlign: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        color: "var(--color-text-link)",
      }}
    >
      {label} →
    </Link>
  );
}

/**
 * LatestTabs — an editor-tabs panel surfacing latest work / latest writing.
 * One panel, two tabs (work | writing); switching swaps the linked list. Same
 * row + thumbnail language as the rest of the home page, behind IDE-style tabs.
 */
export function LatestTabs({
  latestProjects,
  latestPosts,
}: {
  latestProjects: Project[];
  latestPosts: PostMeta[];
}) {
  const [tab, setTab] = useState<TabId>("work");
  const tabs: { id: TabId; label: string }[] = [
    { id: "work", label: "work" },
    { id: "writing", label: "writing" },
  ];

  return (
    <div
      style={{
        maxWidth: 760,
        border: "1px solid var(--color-hairline-strong)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface-card)",
        overflow: "hidden",
      }}
    >
      {/* Editor-style tab strip */}
      <div
        role="tablist"
        aria-label="Latest work and writing"
        className="flex"
        style={{ borderBottom: "1px solid var(--color-hairline)", background: "var(--color-canvas-soft)" }}
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              style={{
                padding: "11px 16px",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: active ? 600 : 500,
                color: active ? "var(--color-ink)" : "var(--color-muted)",
                background: active ? "var(--color-surface-card)" : "transparent",
                border: "none",
                borderBottom: `2px solid ${active ? "var(--color-text-link)" : "transparent"}`,
                marginBottom: -1,
                cursor: "pointer",
                transition: "color 120ms ease",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Panel body */}
      <div role="tabpanel">
        {tab === "work" ? (
          <>
            {latestProjects.map((p, i) => (
              <ItemRow
                key={p.slug}
                href={`/work/${p.slug}`}
                title={p.name}
                sub={p.summary}
                meta={`${p.category} · ${p.year}`}
                thumb={<Thumb seed={p.slug} glyph={p.glyph} />}
                first={i === 0}
              />
            ))}
            <AllLink href="/work" label="all work" />
          </>
        ) : (
          <>
            {latestPosts.map((post, i) => (
              <ItemRow
                key={post.slug}
                href={`/writing/${post.slug}`}
                title={post.title}
                sub={post.summary}
                meta={`${formatMonthYear(post.date)} · ${post.readingMinutes} min`}
                thumb={<Thumb seed={post.slug} image={post.cover} />}
                first={i === 0}
              />
            ))}
            <AllLink href="/writing" label="all posts" />
          </>
        )}
      </div>
    </div>
  );
}
