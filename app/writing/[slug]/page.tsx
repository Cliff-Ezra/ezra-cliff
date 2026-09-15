import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GhostHero from "@/app/components/coming-soon/GhostHero";
import { WritingShell } from "@/app/components/writing/WritingShell";
import { ArticleView } from "@/app/components/writing/ArticleView";
import { extractToc, getAllPosts, getPost } from "@/app/lib/writing";

/** Pre-render a page for every known post slug. */
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Writing" };
  return {
    title: `${post.meta.title} — Writing`,
    description: post.meta.summary,
    openGraph: {
      title: post.meta.title,
      description: post.meta.summary,
      type: "article",
      images: post.meta.cover ? [{ url: post.meta.cover, alt: post.meta.coverAlt ?? post.meta.title }] : undefined,
    },
  };
}

/**
 * /writing/[slug] — a post's article page. Gated by the same
 * NEXT_PUBLIC_SITE_MODE flag as the rest of the site; unknown slugs 404.
 */
export default async function PostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const isLive = process.env.NEXT_PUBLIC_SITE_MODE === "staging";
  if (!isLive) return <GhostHero />;

  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);

  return (
    <WritingShell>
      <ArticleView meta={post.meta} source={post.content} toc={toc} />
    </WritingShell>
  );
}
