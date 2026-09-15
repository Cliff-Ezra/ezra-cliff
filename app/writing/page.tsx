import type { Metadata } from "next";
import GhostHero from "@/app/components/coming-soon/GhostHero";
import { WritingShell } from "@/app/components/writing/WritingShell";
import { WritingIndex } from "@/app/components/writing/WritingIndex";
import { showComingSoon } from "@/app/lib/siteMode";
import { getActiveWritingCategories, getAllPosts, getFeaturedPost } from "@/app/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Footnotes on everything that I've learned, from software engineering to philosophy, and everything in between.",
};

export default function WritingRoute() {
  if (showComingSoon) return <GhostHero />;

  const posts = getAllPosts();
  const categories = getActiveWritingCategories();
  const featured = getFeaturedPost(posts);

  return (
    <WritingShell>
      <WritingIndex posts={posts} categories={categories} featuredSlug={featured?.slug} />
    </WritingShell>
  );
}
