"use client";

import Link from "next/link";
import { Tag } from "@/app/components/ui";
import type { PostMeta } from "@/app/lib/writing";
import { formatMonthYear } from "@/app/lib/format-date";
import { CoverImage } from "./CoverImage";

/**
 * PostCard — one post tile, the writing analogue of ProjectCard: an animated
 * aurora cover, a date · reading-time mono meta line, the title (links to the
 * article), a plain-language summary and lowercase topic tags.
 */
export function PostCard({ post }: { post: PostMeta }) {
  const href = `/writing/${post.slug}`;
  return (
    <article
      className="ds-card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--color-hairline-strong)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface-card)",
        overflow: "hidden",
      }}
    >
      <Link href={href} aria-label={`${post.title} — read`} className="block no-underline">
        <CoverImage
          post={post}
          className="ds-cover"
          style={{ aspectRatio: "16 / 9" }}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        />
      </Link>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "16px 18px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-muted)" }}>
          {formatMonthYear(post.date)} · {post.readingMinutes} min
        </span>

        <h3 style={{ fontWeight: 600, fontSize: 17, lineHeight: 1.3 }}>
          <Link href={href} className="no-underline" style={{ color: "var(--color-ink)" }}>
            {post.title}
          </Link>
        </h3>

        <p className="ds-body" style={{ fontSize: 14, margin: 0 }}>
          {post.summary}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" style={{ marginTop: 2 }}>
            {post.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
