import Link from "next/link";
import { coverGradient } from "@/app/lib/cover";
import { formatMonthYear } from "@/app/lib/format-date";
import type { PostMeta } from "@/app/lib/writing";

/** Background for a cover: real image when present, else seeded gradient. */
function cover(post: PostMeta): string {
  return post.cover ? `center / cover no-repeat url(${post.cover})` : coverGradient(post.slug);
}

/**
 * LatestWriting — the home "Latest writing" block: one large featured post
 * (newest) beside two compact rows. Lightweight; the full index lives on
 * /writing.
 */
export function LatestWriting({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  const [featured, ...rest] = posts;
  const others = rest.slice(0, 2);

  return (
    <section>
      <header className="flex items-baseline justify-between gap-4">
        <h2 style={{ fontWeight: 600, fontSize: 22, letterSpacing: "-0.4px", color: "var(--color-ink)" }}>
          Latest writing
        </h2>
        <Link
          href="/writing"
          className="no-underline transition-opacity hover:opacity-80"
          style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-link)", whiteSpace: "nowrap" }}
        >
          All posts →
        </Link>
      </header>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {/* Featured (newest) */}
        <Link
          href={`/writing/${featured.slug}`}
          className="ds-card-hover no-underline flex flex-col overflow-hidden sm:flex-row md:flex-col"
          style={{
            border: "1px solid var(--color-hairline-strong)",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-surface-card)",
          }}
        >
          <div
            className="ds-cover h-40 shrink-0 sm:h-auto sm:w-44 md:h-44 md:w-auto"
            style={{ background: cover(featured) }}
          />
          <div style={{ padding: "16px 18px" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                color: "var(--color-muted)",
              }}
            >
              <span style={{ color: "var(--color-text-link)" }}>latest</span> · {formatMonthYear(featured.date, true)} ·{" "}
              {featured.readingMinutes} min
            </p>
            <h3 style={{ fontWeight: 600, fontSize: 18, lineHeight: 1.3, marginTop: 8, color: "var(--color-ink)" }}>
              {featured.title}
            </h3>
            <p className="ds-body" style={{ marginTop: 8, fontSize: 14 }}>
              {featured.summary}
            </p>
          </div>
        </Link>

        {/* Two compact rows */}
        <div className="flex flex-col gap-4">
          {others.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="ds-card-hover no-underline flex flex-1 items-center gap-3 overflow-hidden"
              style={{
                border: "1px solid var(--color-hairline-strong)",
                borderRadius: "var(--radius-lg)",
                background: "var(--color-surface-card)",
                padding: 14,
              }}
            >
              <span
                aria-hidden
                className="ds-cover shrink-0"
                style={{ width: 56, height: 56, borderRadius: "var(--radius-md)", background: cover(post) }}
              />
              <span className="min-w-0">
                <span
                  className="block"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-muted)" }}
                >
                  {formatMonthYear(post.date)} · {post.readingMinutes} min
                </span>
                <span
                  className="mt-0.5 block"
                  style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.3, color: "var(--color-ink)" }}
                >
                  {post.title}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
