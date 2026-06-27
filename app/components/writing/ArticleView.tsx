import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import { Tag } from "@/app/components/ui";
import type { PostMeta, TocItem } from "@/app/lib/writing";
import { formatMonthYear } from "@/app/lib/format-date";
import { CoverImage } from "./CoverImage";
import { TableOfContents } from "./TableOfContents";
import { mdxComponents } from "./mdx-components";

/** The brand renders code on a dark surface in
 * both light and dark themes, so a single dark theme is correct here. We drop
 * the theme's own background and supply --color-surface-dark in prose.css. */
const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: false,
};

/**
 * ArticleView — the Josh-Comeau-style article page: a mono meta line, title and
 * aurora hero, then a two-column body (prose left, sticky "On this page" TOC
 * right on wide screens; the TOC drops away below `lg`). MDX is compiled in this
 * Server Component, so Shiki highlighting adds no client bundle weight.
 */
export async function ArticleView({
  meta,
  source,
  toc,
}: {
  meta: PostMeta;
  source: string;
  toc: TocItem[];
}) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });

  return (
    <div>
      <Link
        href="/writing"
        className="no-underline"
        style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-text-link)" }}
      >
        ← writing
      </Link>

      {/* Article header */}
      <header style={{ marginTop: 24, maxWidth: 720 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-muted)" }}>
          {formatMonthYear(meta.date)} · {meta.readingMinutes} min · ↵ Writing
        </p>
        <h1 className="ds-display-md" style={{ marginTop: 12 }}>
          {meta.title}
        </h1>
        {meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" style={{ marginTop: 14 }}>
            {meta.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </header>

      {/* Cover hero */}
      <CoverImage
        post={meta}
        priority
        sizes="(min-width: 960px) 960px, 100vw"
        style={{ marginTop: 24, aspectRatio: "21 / 9", borderRadius: "var(--radius-lg)", maxWidth: 960 }}
      />

      {/* Body: prose + sticky TOC */}
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,720px)_200px]">
        <article className="ds-prose">{content}</article>

        <aside className="hidden lg:block">
          <div className="sticky" style={{ top: "calc(var(--nav-height) + 24px)" }}>
            <TableOfContents items={toc} />
          </div>
        </aside>
      </div>
    </div>
  );
}
