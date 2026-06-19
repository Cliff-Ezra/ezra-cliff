/**
 * Experience + skills — single source of truth for the /about page.
 *
 * The about timeline shows the most recent `INITIAL_VISIBLE` roles by default
 * and reveals the rest behind a "show more" toggle; each role can also expand
 * its detailed bullets. Ordered most-recent first.
 */

export type Role = {
  /** Stable id — React key. */
  id: string;
  title: string;
  company: string;
  location: string;
  /** Human-readable period, right-aligned in the timeline (mono). */
  period: string;
  /** Marks the present role (filled timeline dot). */
  current?: boolean;
  /** One-line "what I did here", always visible. */
  summary: string;
  /** Stack chips, lowercase by convention. */
  tech: string[];
  /** Detailed accomplishments — revealed by the per-role "read more". */
  details: string[];
};

/** How many roles show before the "show more" toggle appears. */
export const INITIAL_VISIBLE = 3;

export const roles: Role[] = [
  {
    id: "health-e-net",
    title: "Software Engineer",
    company: "Health-E-Net",
    location: "Nairobi, Kenya",
    period: "Oct 2024 — Jun 2026",
    current: true,
    summary:
      "Built the ML handwriting / OMR review interface, GraphQL data pipelines, and offline-first CouchDB field sync for PaperEMR.",
    tech: ["angular", "graphql", "couchdb", "postgres"],
    details: [
      "Built and enhanced the Angular.js frontend for PaperEMR's handwriting-recognition and optical-mark-detection system, surfacing ML inference results so clinicians can review and correct extracted data in real time.",
      "Designed GraphQL APIs and automated data-extraction pipelines on PostgreSQL, feeding structured health data into Looker Studio dashboards for client reporting.",
      "Architected offline-first CouchDB replication for reliable data capture in low-connectivity clinics, surfacing sync status to end users.",
      "Built a training-data curation pipeline that automated dataset selection and validation; maintained above 90% sprint acceptance at 5+ story points per sprint.",
    ],
  },
  {
    id: "usaid",
    title: "Software Engineer",
    company: "USAID",
    location: "Nairobi, Kenya",
    period: "Jun 2024 — Aug 2024",
    summary:
      "Cross-platform Flutter field apps with background sync — cut load times 40% in low-connectivity environments.",
    tech: ["flutter", "dart", "rest"],
    details: [
      "Developed cross-platform Flutter apps for USAID and the Kenyan Government with local storage and background sync over REST, improving data-collection reliability in low-connectivity field environments.",
      "Designed user-centric features and navigation flows that increased field-worker engagement through iterative, agile development.",
      "Built the integration layer between the Flutter client and complex legacy government backends, ensuring secure, accurate data exchange.",
      "Cut application load times by 40% through efficient state management and code refactoring.",
    ],
  },
  {
    id: "veritas",
    title: "Software Engineer",
    company: "Veritas Interactive",
    location: "Kampala, Uganda",
    period: "Feb 2022 — Mar 2024",
    summary:
      "BetterLaw Africa & SproutRealty — Next.js + Laravel SaaS products; Docker/CI pipeline cutting release time 50%.",
    tech: ["next.js", "laravel", "mysql", "docker"],
    details: [
      "Engineered BetterLaw Africa, a full-stack legal case-management platform (Next.js + Laravel/MySQL), streamlining workflows and reducing case-processing time.",
      "Built SproutRealty, a property & tenant management SaaS, delivering financial tracking, unit management and complaint resolution that raised owner operational efficiency by 40%.",
      "Containerized services with Docker and built automated GitHub Actions CI/CD on DigitalOcean, cutting release times by 50% and standardizing deployments.",
    ],
  },
];
