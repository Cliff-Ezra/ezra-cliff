"use client";

import Link from "next/link";
import type { PostMeta } from "@/app/lib/writing";
import { formatMonthYear } from "@/app/lib/format-date";
import { CoverImage } from "./CoverImage";

/**
 * FeaturedPost — the large "latest" card on the writing index (wireframe 1): a
 * wide aurora cover on the left, the post's meta on the right. The whole card
 * is one hover surface; the cover and title both link to the article.
 */
export function FeaturedPost({ post }: { post: PostMeta }) {
  const href = `/writing/${post.slug}`;
  return (
    <article
      className="ds-card-hover"
      style={{
        display: "grid",
        border: "1px solid var(--color-hairline-strong)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface-card)",
        overflow: "hidden",
      }}
    >
      {/* Responsive split: stacked on mobile, ~58/42 on md+ via the utility class. */}
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
        <Link href={href} aria-label={`${post.title} — read`} className="block no-underline">
          <CoverImage
            post={post}
            priority
            className="ds-cover"
            style={{ height: "100%", minHeight: 220, aspectRatio: "16 / 9" }}
            sizes="(min-width: 768px) 60vw, 100vw"
          />
        </Link>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, padding: "28px 30px" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.04em",
              color: "var(--color-text-link)",
              textTransform: "uppercase",
            }}
          >
            Latest · {formatMonthYear(post.date, true)} · {post.readingMinutes} min
          </p>

          <h2 className="ds-display-sm">
            <Link href={href} className="no-underline" style={{ color: "var(--color-ink)" }}>
              {post.title}
            </Link>
          </h2>

          <p className="ds-body" style={{ fontSize: 15, margin: 0 }}>
            {post.summary}
          </p>

          <Link
            href={href}
            className="no-underline"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--color-text-link)",
            }}
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
