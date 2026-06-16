import Link from "next/link";
import { GitBranch, MapPin } from "lucide-react";
import { Button, Icon, StatusDot } from "@/app/components/ui";
import { site } from "@/app/lib/site";

/** "Jump to" shortcut cards under the intro. */
const jumpTo = [
  { file: "projects/", label: "Selected work", href: "/work" },
  { file: "experience.json", label: "Where I've worked", href: "/experience" },
  { file: "writing/", label: "Notes & essays", href: "/writing" },
];

/** Most-recent roles previewed on the home page (full list lives on /experience). */
const experiencePreview = [
  {
    role: "Software Engineer — Health-E-Net",
    detail: "ML inference review tooling · offline-first clinical data",
    period: "2024–26",
  },
  {
    role: "Software Engineer — USAID",
    detail: "Flutter field apps, offline sync",
    period: "2024",
  },
];

function MetaItem({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        color: "var(--color-body)",
      }}
    >
      {children}
    </span>
  );
}

/**
 * Readme — the home page's main pane, rendered as the README.md "open file".
 * Server component: intro, bio, status line, CTAs, jump-to cards, and a
 * preview of recent experience.
 */
export function Readme() {
  return (
    <div style={{ maxWidth: 760 }}>
      {/* Terminal prompt */}
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-success)" }}>
        $ cat README.md
      </p>

      {/* Markdown-style heading */}
      <h1 className="ds-display-lg" style={{ marginTop: 14 }}>
        <span style={{ color: "var(--color-muted)" }}># </span>
        {site.name}
      </h1>

      {/* Bio */}
      <p className="ds-body" style={{ marginTop: 18, maxWidth: 600, fontSize: 17 }}>
        Full-stack engineer, 5 years. I build scalable distributed systems across
        web &amp; mobile — Go, Next.js, Laravel, Flutter, plus ML-integrated
        pipelines. I enjoy architecting scalable distributed systems, designing 
        performant database schemas, and shipping
        production-ready products across web and mobile platforms.
      </p>

      {/* Status line */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <MetaItem>
          <Icon icon={MapPin} size={15} style={{ color: "var(--color-muted)" }} />
          {site.location}
        </MetaItem>
        <Link href={site.github} target="_blank" rel="noopener noreferrer" className="no-underline">
          <MetaItem>
            <Icon icon={GitBranch} size={15} style={{ color: "var(--color-muted)" }} />
            <span style={{ color: "var(--color-text-link)" }}>{site.githubLabel}</span>
          </MetaItem>
        </Link>
        <StatusDot tone="success" mono>
          open to work
        </StatusDot>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/work" variant="primary" size="md" style={{ fontFamily: "var(--font-mono)" }}>
          ./view-work
        </Button>
        <Button href="/cv" variant="secondary" size="md" style={{ fontFamily: "var(--font-mono)" }}>
          ./resume.pdf
        </Button>
      </div>

      {/* Jump to */}
      <section className="mt-12">
        <p className="ds-caption-uppercase">Jump to</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {jumpTo.map((j) => (
            <Link
              key={j.href}
              href={j.href}
              className="ds-card-hover no-underline"
              style={{
                display: "block",
                padding: "16px 18px",
                border: "1px solid var(--color-hairline-strong)",
                borderRadius: "var(--radius-lg)",
                background: "var(--color-surface-card)",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-text-link)" }}>
                {j.file}
              </span>
              <span
                style={{
                  display: "block",
                  marginTop: 6,
                  fontWeight: 600,
                  color: "var(--color-ink)",
                }}
              >
                {j.label} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Experience preview */}
      <section className="mt-12">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-muted)" }}>
          {"// experience.json — preview"}
        </p>
        <div
          className="mt-4"
          style={{
            border: "1px solid var(--color-hairline-strong)",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-surface-card)",
            overflow: "hidden",
          }}
        >
          {experiencePreview.map((e, i) => (
            <div
              key={e.role}
              className="flex items-baseline justify-between gap-4"
              style={{
                padding: "16px 18px",
                borderTop: i === 0 ? "none" : "1px solid var(--color-hairline)",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p style={{ fontWeight: 600, color: "var(--color-ink)" }}>{e.role}</p>
                <p className="ds-body" style={{ marginTop: 2, fontSize: 14 }}>
                  {e.detail}
                </p>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-muted)", whiteSpace: "nowrap" }}>
                {e.period}
              </span>
            </div>
          ))}
          <Link
            href="/experience"
            className="no-underline"
            style={{
              display: "block",
              padding: "12px 18px",
              borderTop: "1px solid var(--color-hairline)",
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--color-text-link)",
            }}
          >
            open full timeline →
          </Link>
        </div>
      </section>
    </div>
  );
}
