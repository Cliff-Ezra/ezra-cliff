/**
 * Experience — single source of truth for the /about timeline.
 *
 * The timeline shows the most recent `INITIAL_VISIBLE` roles by default and
 * reveals the rest behind a "show more" toggle; each role expands its detailed
 * accomplishments via a per-role "read more". Ordered most-recent first.
 *
 * ("Frontend", "Backend", "Data & BI", "AI / ML", "Devops / CI"), or omit it for a single flat
 * list. Content is drawn from the strongest points across the full-stack,
 */

/** A labelled (or unlabelled) cluster of accomplishment bullets. */
export type DetailGroup = {
  /** Discipline heading, e.g. "Frontend". Omit for a single flat list. */
  label?: string;
  items: string[];
};

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
  /** Detailed accomplishments, grouped — revealed by the per-role "read more". */
  details: DetailGroup[];
};

/** How many roles show before the "show more" toggle appears. */
export const INITIAL_VISIBLE = 3;

export const roles: Role[] = [
  {
    id: "health-e-net",
    title: "Software Engineer",
    company: "Health-E-Net",
    location: "Nairobi, Kenya",
    period: "Oct 2024 — Present",
    current: true,
    summary:
      "End-to-end work on PaperEMR — an offline-first Angular 17 PWA that turns photographed paper forms into clinical data across 12+ sites. Worked on features that ranged from frontend to backend: in-browser ML, GraphQL APIs, and the streaming ETL + BI warehouse behind the dashboards.",
    tech: ["angular", "typescript", "graphql", "postgresql", "tensorflow.js", "couchdb"],
    details: [
      {
        label: "Frontend",
        items: [
          "Worked on the team that built PaperEMR's offline-first Angular 17 PWA with dynamic, template-driven form UIs (Form.io, Angular Material, reactive forms) that let non-technical admins configure new clinical templates without code changes.",
          "Engineered in-browser ML inference with TensorFlow.js (custom MobileNet) for handwriting recognition + OMR, plus WebGL perspective-transform deskew so handheld phone photos extract reliably — eliminating tensor memory leaks and async bugs that were silently dropping predictions on every scan.",
          "Implemented offline PouchDB sync with client-side encryption and a scan-completeness / rescan flow that closed a silent-data-loss gap, surfacing live sync status to clinicians on intermittent connections.",
        ],
      },
      {
        label: "Backend",
        items: [
          "Designed GraphQL APIs (Apollo, Sequelize, PostgreSQL) with JWT auth, role-based authorization and real-time subscriptions streaming digit-validation updates to reviewers.",
          "Integrated PaperEMR with DHIS2, the national/global District Health Information System, via queue-backed routines posting structured health events upstream to ministry-level reporting.",
          "Built multi-channel notifications — SMS via Africa's Talking, transactional email via SparkPost — on a Bull/Redis queue with cron scheduling, plus an encrypted, ~90%-compressed data-dump API for fast mobile first-sync.",
        ],
      },
      {
        label: "Data & BI",
        items: [
          "Architected a streaming ETL pipeline ingesting the CouchDB _changes feed into a PostgreSQL warehouse across 12+ multi-tenant schemas, keeping reporting within seconds of live operations.",
          "Designed a reporting layer of 450+ materialized views (900+ SQL scripts) powering Looker Studio, with trigger / pgAgent refresh automation hitting a ~70-second full refresh and email-keyed row-level access control so each facility sees only its own data.",
        ],
      },
      {
        label: "AI / ML",
        items: [
          "Trained image-classification models (Python, PyTorch/fastai, MobileNet/ResNet18) with transfer learning, augmentation and Weights & Biases tracking — owning the full collect → label → train → deploy loop and exporting to TensorFlow.js for on-device inference.",
        ],
      },
    ],
  },
  {
    id: "usaid",
    title: "Software Engineer",
    company: "USAID",
    location: "Nairobi, Kenya",
    period: "Jun 2024 — Aug 2024",
    summary:
      "Built a cross-platform Flutter app for Kenya's Department of Children's Services — putting offline-first child-protection case capture directly in field officers' hands, synced to national government systems.",
    tech: ["flutter", "dart", "sqlite", "rest"],
    details: [
      {
        label: "Frontend",
        items: [
          "Built a cross-platform Flutter/Dart app (Android + iOS) digitizing paper child-protection workflows — case reports, social inquiries, court follow-ups, referrals and CCI transitions — with Provider/GetX state management and reactive, validated multi-step forms.",
          "Cut load times 40% through efficient state management and code refactoring.",
        ],
      },
      {
        label: "Backend",
        items: [
          "Architected the offline data layer: a local SQLite store with versioned schema migrations and a bidirectional sync engine (8 upstream controllers, 13 endpoints) that queues offline-captured forms and reliably pushes them to government backends on reconnection.",
          "Integrated multiple government systems — the national CPIMS child-protection backend, the person/ID registry, the judiciary system and the Enhanced Single Registry — through secure REST APIs with JWT refresh-token auth and Dio request/error interceptors.",
          "Added biometric authentication and geolocation capture to secure access to sensitive child-protection records and tag cases by location.",
        ],
      },
    ],
  },
  {
    id: "veritas",
    title: "Software Engineer",
    company: "Veritas Interactive",
    location: "Kampala, Uganda",
    period: "Feb 2022 — Mar 2024",
    summary:
      "Shipped three production SaaS products end-to-end — SproutRealty, BetterLaw and BloodPoint — building React/Next.js frontends over multi-tenant Laravel backends, with Docker/CI on DigitalOcean.",
    tech: ["next.js", "react", "laravel", "mysql", "docker"],
    details: [
      {
        label: "Frontend",
        items: [
          "Built responsive React/Next.js + Material UI frontends for three production SaaS products — SproutRealty (property management), BetterLaw (legal case management) and BloodPoint (blood-bank management) — with data-rich ApexCharts/Chart.js dashboards and multi-step validated forms.",
        ],
      },
      {
        label: "Backend",
        items: [
          "Architected the Laravel (PHP) REST APIs behind them with Sanctum/JWT auth and role-based access, engineering SproutRealty as a multi-tenant SaaS so multiple property companies run on one deployment with isolated data.",
          "Built RevuePro, a local-government revenue-administration system on Python/Frappe (ERP Next), digitizing tax, licensing and permit workflows ahead of a Zambia deployment.",
          "Integrated third-party services across the stack: Flutterwave payments (SproutRealty, BetterLaw), Africa's Talking SMS (BloodPoint), and Firebase / Google OAuth with Sentry/Rollbar error tracking.",
        ],
      },
      {
        label: "DevOps / CI",
        items: [
          "Containerized services with Docker and ran GitHub Actions CI/CD on DigitalOcean — cutting release times 50% and holding 99.9% uptime.",
        ],
      },
    ],
  },
];
