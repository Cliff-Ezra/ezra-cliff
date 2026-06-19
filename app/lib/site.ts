/**
 * Site-wide config: identity + primary navigation.
 * Content-heavy data (projects, writing, experience) lives in its own
 * modules and is wired in later steps.
 */

export const site = {
  wordmark: "ezra.cliff()",
  mark: "CE",
  name: "Ezra Cliff Esau",
  shortName: "Ezra Cliff",
  role: "Full-stack engineer",
  location: "Nairobi, KE",
  /** Real GitHub handle — an external identifier, kept as-is. */
  github: "https://github.com/Cliff-Ezra",
  githubLabel: "github.com/Cliff-Ezra",
  linkedin: "https://www.linkedin.com/in/cliff-ezra-0a3609215/",
  linkedinLabel: "/in/cliff-ezra",
  email: "cliffezra212@gmail.com",
  phone: "+254 715 078 401",
  cv: "/documents/cliff-ezra-esau-cv.pdf",
  /** Repo / project label used in the explorer + prompt (matches the domain). */
  repo: "ezra-cliff",
  promptUser: "ezra",
  branch: "main",
} as const;

/** Primary top-nav sections (the global navigation). */
export const navLinks: { label: string; href: string }[] = [
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
];

export const contactHref = "/contact";
