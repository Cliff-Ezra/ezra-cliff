/**
 * Projects — single source of truth for the /work page.
 *
 * Every project the portfolio shows lives here as one entry. The work-page
 * filter chips and the "N projects" count are DERIVED from this array, so
 * adding / reordering / retiring a project means editing this file only —
 * never the components.
 */

/** Domain categories — also the source of the work-page filter chips. */
export type ProjectCategory =
  | "Fintech"
  | "Healthcare"
  | "AI"
  | "Government"
  | "Mobile";

export type Project = {
  /** Stable id — React key + seed for the placeholder cover gradient. */
  slug: string;
  /** Display name, plain words. */
  name: string;
  /** One-line, plain-English "what it does". */
  summary: string;
  category: ProjectCategory;
  /** Year shipped / last meaningful work. */
  year: number;
  /** Stack chips, lowercase by convention ("go", "next.js", "python"). */
  tech: string[];
  /**
   * PUBLIC GitHub repo as "owner/name". Renders a GitHub icon + repo-name link
   * on the card. Omit for private / client work (no link is shown).
   */
  repo?: string;
  /** Live demo / production URL, if public. */
  liveUrl?: string;
  /** Emoji used as the small plate glyph until real cover art lands. */
  glyph: string;
};

/**
 * Ordered most-prominent first. Real repos are wired for two entries; the rest
 * carry `repo` placeholders to confirm/correct (TODO markers below).
 */
export const projects: Project[] = [
  {
    slug: "autopesa",
    name: "AutoPesa",
    summary:
      "A digital wallet & money-tracking app that records every transaction safely and instantly — like a tamper-proof financial diary.",
    category: "Fintech",
    year: 2024,
    tech: ["go", "react", "graphql"],
    repo: undefined, // private repo — no public link. Add a liveUrl if available.
    glyph: "💸",
  },
  {
    slug: "law-guru",
    name: "Law Guru",
    summary:
      "Ask a question about Kenyan law and get a clear, plain-English answer with sources — an AI legal assistant for everyday people.",
    category: "AI",
    year: 2025,
    tech: ["next.js", "rag", "llama"],
    repo: "Cliff-Ezra/RAG-chatbot-v2",
    glyph: "⚖️",
  },
  {
    slug: "oncoworld",
    name: "OncoWorld",
    summary:
      "Helps cancer patients at Kenyatta National Hospital book and reserve time-sensitive medication before it runs out.",
    category: "Healthcare",
    year: 2025,
    tech: ["next.js", "postgres"],
    repo: undefined,
    glyph: "🩺",
  },
  {
    slug: "bloodpoint",
    name: "Bloodpoint",
    summary:
      "Connects blood donors with hospitals in real time and keeps regional blood-bank stock in sync to save lives faster.",
    category: "Healthcare",
    year: 2023,
    tech: ["laravel", "mysql"],
    repo: undefined,
    glyph: "🩸",
  },
  {
    slug: "sproutrealty",
    name: "SproutRealty",
    summary:
      "A property listing and management platform that helps agents track listings, leads, and viewings in one place.",
    category: "Fintech",
    year: 2023,
    tech: ["laravel", "mysql"],
    repo: undefined, 
    glyph: "🏠",
  },
  {
    slug: "cpims",
    name: "CPIMS",
    summary:
      "An offline-first field app for case workers to register and follow up on vulnerable children, syncing when back online.",
    category: "Government",
    year: 2024,
    tech: ["dart", "flutter"],
    repo: undefined, 
    glyph: "🛡️",
  },
];

/** Filter values for the work page: "All" + every category actually in use. */
export type ProjectFilter = "All" | ProjectCategory;

/**
 * Categories present in the data, in a stable display order. Drives the filter
 * chips so they never list an empty category.
 */
export function getActiveCategories(): ProjectCategory[] {
  const order: ProjectCategory[] = [
    "Fintech",
    "Healthcare",
    "AI",
    "Government",
    "Mobile",
  ];
  const present = new Set(projects.map((p) => p.category));
  return order.filter((c) => present.has(c));
}
