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

  /* --- Detail page (/work/[slug]) — all optional; sections render only when
        present, so a sparse project still gets a clean detail page. --- */
  /** Short subtitle in the detail hero rail (falls back to `summary`). */
  tagline?: string;
  /** Your role on the project, shown in the rail (e.g. "Full-stack engineer"). */
  role?: string;
  /** "The problem" narrative. */
  problem?: string;
  /** "What I built" narrative. */
  build?: string;
  /** "The outcome" metric cards. */
  outcome?: { value: string; label: string }[];
  /** Screenshot captions — each renders a framed placeholder image for now. */
  shots?: { caption: string }[];
};

/** Ordered most-prominent first. */
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
    tagline: "A tamper-proof digital wallet for small businesses.",
    role: "Full-stack engineer",
    problem:
      "Money slips through the cracks when it lives in handwritten books and scattered SMS receipts. There was no single, trustworthy record a business owner could rely on.",
    build:
      "An event-driven ledger where each transaction is written once and never altered, with a clean dashboard the owner actually understands.",
    outcome: [
      { value: "~40%", label: "faster loads" },
      { value: "Real-time", label: "ledger" },
      { value: "100%", label: "typed comms" },
    ],
    shots: [
      { caption: "Owner dashboard" },
      { caption: "Transaction ledger" },
      { caption: "Receipt detail" },
    ],
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
    tagline: "Plain-English answers to Kenyan legal questions, with sources.",
    role: "Full-stack engineer",
    problem:
      "Legal information in Kenya is locked inside dense statutes and scattered case law. Ordinary people can't afford a lawyer just to understand their rights, and generic chatbots invent answers that sound right but cite nothing.",
    build:
      "A retrieval-augmented assistant that grounds every answer in actual Kenyan legal texts. It retrieves the relevant statutes, passes them to a Llama model, and returns a clear explanation with citations the user can verify.",
    outcome: [
      { value: "Cited", label: "every answer" },
      { value: "<3s", label: "median response" },
      { value: "1000s", label: "of legal docs indexed" },
    ],
    shots: [
      { caption: "Ask a question" },
      { caption: "Answer with cited sources" },
      { caption: "Document retrieval panel" },
    ],
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
    tagline: "Reliable medication booking for cancer patients.",
    role: "Full-stack engineer",
    problem:
      "At Kenyatta National Hospital, cancer patients travel long distances only to find time-sensitive medication out of stock. There was no way to reserve doses ahead or know what was available before making the journey.",
    build:
      "A booking platform that lets patients reserve time-sensitive medication in advance and gives pharmacists a real-time view of stock, so treatment schedules aren't broken by avoidable stockouts.",
    outcome: [
      { value: "Fewer", label: "missed doses" },
      { value: "Real-time", label: "stock visibility" },
      { value: "Ahead", label: "of-time reservations" },
    ],
    shots: [
      { caption: "Patient booking flow" },
      { caption: "Pharmacy stock dashboard" },
      { caption: "Reservation confirmation" },
    ],
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
    tagline: "Real-time matching between blood donors and hospitals.",
    role: "Full-stack engineer",
    problem:
      "When a hospital runs low on a blood type, finding donors fast is a manual scramble of phone calls. Regional blood banks had no shared, live view of stock, so a shortage in one place sat next to surplus in another.",
    build:
      "A platform that connects donors with nearby hospitals in real time and keeps regional blood-bank stock in sync — a shortage alerts the right donors, and surpluses get redistributed before they expire.",
    outcome: [
      { value: "Real-time", label: "donor matching" },
      { value: "Synced", label: "regional stock" },
      { value: "Faster", label: "emergency response" },
    ],
    shots: [
      { caption: "Donor matching map" },
      { caption: "Hospital stock overview" },
      { caption: "Donation scheduling" },
    ],
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
    tagline: "Listings, leads and viewings in one place for agents.",
    role: "Full-stack engineer",
    problem:
      "Property agents juggle listings across spreadsheets, WhatsApp and notebooks. Leads fall through the cracks, and there's no single view of which properties are actually getting interest.",
    build:
      "A management platform where agents publish listings, capture leads, and schedule viewings in one place — with a pipeline view that shows exactly where each deal stands.",
    outcome: [
      { value: "One", label: "source of truth" },
      { value: "Tracked", label: "every lead" },
      { value: "Faster", label: "viewing scheduling" },
    ],
    shots: [
      { caption: "Listings grid" },
      { caption: "Lead pipeline" },
      { caption: "Viewing scheduler" },
    ],
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
    tagline: "Offline-first case management for child protection workers.",
    role: "Mobile engineer",
    problem:
      "Case workers register and follow up on vulnerable children in areas with little or no connectivity. Paper forms get lost and delay critical follow-ups, and existing tools assumed a reliable internet connection that simply isn't there.",
    build:
      "An offline-first field app where workers register and update children's cases entirely offline, with conflict-safe syncing that pushes records to the central system the moment a connection returns.",
    outcome: [
      { value: "100%", label: "offline capable" },
      { value: "Conflict-safe", label: "sync" },
      { value: "Faster", label: "field follow-ups" },
    ],
    shots: [
      { caption: "Case registration form" },
      { caption: "Offline sync status" },
      { caption: "Child case profile" },
    ],
  },
];

/** Look up a single project by its slug (for the /work/[slug] detail page). */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

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
