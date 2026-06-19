/**
 * Explorer file-tree — the home-page quick-links rail. Each "file" deep-links
 * to a specific project / post / page so the explorer is a real shortcut to
 * the good stuff, not a duplicate of the top-nav sections.
 *
 * Filenames carry a language extension purely for the terminal vibe; the
 * Explorer derives an icon + language colour from the extension at render.
 */

export type ExplorerFile = {
  type: "file";
  name: string;
  href: string;
  /** Marks the currently-open file (README.md on the home page). */
  active?: boolean;
};

export type ExplorerFolder = {
  type: "folder";
  name: string;
  defaultOpen?: boolean;
  children: ExplorerNode[];
};

export type ExplorerNode = ExplorerFile | ExplorerFolder;

export const explorerTree: ExplorerNode[] = [
  { type: "file", name: "README.md", href: "/", active: true },
  {
    type: "folder",
    name: "projects",
    defaultOpen: true,
    children: [
      // Per-project detail pages don't exist yet, so each file links to the
      // /work index for now. Point at /work/<slug> once detail pages are built.
      { type: "file", name: "autopesa.go", href: "/work" },
      { type: "file", name: "law-guru.ts", href: "/work" },
      { type: "file", name: "oncoworld.ts", href: "/work" },
      { type: "file", name: "sproutrealty.php", href: "/work" },
      { type: "file", name: "bloodpoint.php", href: "/work" },
      { type: "file", name: "cpims.dart", href: "/work" },
    ],
  },
  { type: "file", name: "experience.json", href: "/experience" },
  { type: "file", name: "skills.yaml", href: "/about#skills" },
  {
    type: "folder",
    name: "writing",
    defaultOpen: false,
    children: [
      { type: "file", name: "event-driven-ledger.md", href: "/writing/event-driven-ledger-in-go" },
      { type: "file", name: "offline-first-sync.md", href: "/writing/offline-first-couchdb" },
      { type: "file", name: "rag-kenyan-law.md", href: "/writing/rag-pipeline-kenyan-law" },
    ],
  },
  { type: "file", name: "uses.md", href: "/uses" },
  { type: "file", name: "now.md", href: "/now" },
  { type: "file", name: "contact.sh", href: "/contact" },
];
