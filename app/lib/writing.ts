/**
 * Writing — single source of truth for the /writing blog, the MDX analogue of
 * app/lib/projects.ts. Posts live as MDX files in content/writing/*.mdx; this
 * module reads them (server-only: uses fs), parses frontmatter, computes reading
 * time, and derives the filter chips so they're never hand-maintained.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

/** Topic categories — also the source of the writing-page filter chips. */
export type WritingCategory =
  | "Architecture"
  | "Distributed Systems"
  | "AI"
  | "APIs";

/** Serializable post metadata — safe to pass from a Server Component to the
 * client index. Never carries the raw MDX body. */
export type PostMeta = {
  /** Stable id — matches the filename, the URL, and the cover gradient seed. */
  slug: string;
  title: string;
  summary: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  category: WritingCategory;
  /** Lowercase stack/topic tags, rendered as <Tag>. */
  tags: string[];
  /** "8 min read" style estimate, derived from the body. */
  readingMinutes: number;
  /** The one large card on the index (falls back to newest if none flagged). */
  featured: boolean;
  /** Public path to the cover painting (e.g. "/images/writing/slug.jpg"). When
   * absent the cover falls back to a seeded gradient. */
  cover?: string;
  /** Alt text for the cover image (accessibility). */
  coverAlt?: string;
};

/** A single entry in the "On this page" rail. */
export type TocItem = { depth: 2 | 3; text: string; id: string };

const WRITING_DIR = path.join(process.cwd(), "content", "writing");
const isProd = process.env.NODE_ENV === "production";

/** Read + parse one MDX file into frontmatter, raw body, and reading time. */
function readPostFile(slug: string): { meta: PostMeta; content: string } | null {
  const file = path.join(WRITING_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    date: String(data.date ?? ""),
    category: (data.category ?? "Architecture") as WritingCategory,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    featured: Boolean(data.featured),
    cover: data.cover ? String(data.cover) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
  };

  return { meta, content };
}

/** Every post slug present on disk. */
function allSlugs(): string[] {
  if (!fs.existsSync(WRITING_DIR)) return [];
  return fs
    .readdirSync(WRITING_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * All posts as metadata, newest first. Drafts (`draft: true`) are hidden in
 * production but visible in dev so they can be previewed.
 */
export function getAllPosts(): PostMeta[] {
  return allSlugs()
    .map((slug) => readPostFile(slug))
    .filter((p): p is { meta: PostMeta; content: string } => {
      if (!p) return false;
      const draft = readDraftFlag(p);
      return !(isProd && draft);
    })
    .map((p) => p.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Read the raw `draft` flag without widening PostMeta with it. */
function readDraftFlag(p: { meta: PostMeta; content: string }): boolean {
  const file = path.join(WRITING_DIR, `${p.meta.slug}.mdx`);
  const { data } = matter(fs.readFileSync(file, "utf8"));
  return Boolean(data.draft);
}

/** One post's metadata + raw MDX source, for the article page. */
export function getPost(
  slug: string,
): { meta: PostMeta; content: string } | null {
  return readPostFile(slug);
}

/** The featured post for the index hero — the flagged one, else the newest. */
export function getFeaturedPost(posts: PostMeta[]): PostMeta | undefined {
  return posts.find((p) => p.featured) ?? posts[0];
}

/** Filter values: "All" + every category actually in use. */
export type WritingFilter = "All" | WritingCategory;

/**
 * Categories present in the data, in a stable display order. Drives the filter
 * chips so they never list an empty category (mirrors getActiveCategories()
 * in app/lib/projects.ts).
 */
export function getActiveWritingCategories(): WritingCategory[] {
  const order: WritingCategory[] = [
    "Architecture",
    "Distributed Systems",
    "AI",
    "APIs",
  ];
  const present = new Set(getAllPosts().map((p) => p.category));
  return order.filter((c) => present.has(c));
}

/**
 * Extract the "On this page" table of contents from raw MDX — h2/h3 ATX
 * headings only. Slugs are generated with the same GithubSlugger that
 * rehype-slug uses, so anchor links resolve to the rendered heading ids.
 * Fenced code blocks are stripped first so `# comments` aren't mistaken for
 * headings.
 */
export function extractToc(raw: string): TocItem[] {
  const withoutCode = raw.replace(/```[\s\S]*?```/g, "");
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  for (const line of withoutCode.split("\n")) {
    const m = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    const text = m[2].replace(/[*_`]/g, "").trim();
    items.push({ depth, text, id: slugger.slug(text) });
  }

  return items;
}
