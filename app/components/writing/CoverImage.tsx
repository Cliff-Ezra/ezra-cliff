import Image from "next/image";
import type { PostMeta } from "@/app/lib/writing";
import { coverGradient } from "@/app/lib/cover";

/**
 * CoverImage — a post's cover: the curated abstract painting via next/image
 * (optimized + lazy-loaded), or a seeded static gradient when a post has no
 * image yet. Renders its own positioned wrapper so callers just set the box
 * size (aspect-ratio / height) via `style`/`className`, mirroring the old
 * PostCover API.
 */
export function CoverImage({
  post,
  sizes,
  priority = false,
  className,
  style,
  label,
}: {
  post: PostMeta;
  /** Responsive sizes hint for next/image (e.g. "(min-width: 1024px) 720px, 100vw"). */
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        background: coverGradient(post.slug),
        ...style,
      }}
    >
      {post.cover && (
        <Image
          src={post.cover}
          alt={post.coverAlt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      )}
      {label && (
        <span
          style={{
            position: "absolute",
            left: 12,
            top: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 9px",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "rgba(255,255,255,0.92)",
            background: "rgba(0,0,0,0.32)",
            backdropFilter: "blur(4px)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
