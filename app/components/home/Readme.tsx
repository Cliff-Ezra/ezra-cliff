"use client";

import Link from "next/link";
import { GitBranch, MapPin } from "lucide-react";
import { Button, Icon, RevealItem, Stagger, StatusDot } from "@/app/components/ui";
import { site } from "@/app/lib/site";
import type { Project } from "@/app/lib/projects";
import type { PostMeta } from "@/app/lib/writing";
import { SelectedWork } from "./SelectedWork";
import { LatestWriting } from "./LatestWriting";

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
 * Intro + status + CTAs, then Selected work and Latest writing. Blocks fade up
 * in a one-time staggered cascade (reduced-motion → opacity).
 */
export function Readme({
  latestProjects,
  latestPosts,
}: {
  latestProjects: Project[];
  latestPosts: PostMeta[];
}) {
  return (
    <Stagger>
      {/* Terminal prompt */}
      <RevealItem>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-success)" }}>
          $ cat README.md
        </p>
      </RevealItem>

      {/* Markdown-style heading */}
      <RevealItem style={{ marginTop: 14 }}>
        <h1 className="ds-display-lg">
          <span style={{ color: "var(--color-muted)" }}># </span>
          {site.name}
        </h1>
      </RevealItem>

      {/* Bio */}
      <RevealItem style={{ marginTop: 18 }}>
        <p className="ds-body" style={{ maxWidth: 600, fontSize: 17 }}>
          Full-stack engineer, 5 years. I build scalable distributed systems across
          web &amp; mobile — Go, Next.js, Laravel, Flutter, plus ML-integrated
          pipelines. I enjoy architecting scalable distributed systems, designing
          performant database schemas, and shipping production-ready products
          across web and mobile platforms.
        </p>
      </RevealItem>

      {/* Status line */}
      <RevealItem style={{ marginTop: 24 }}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
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
      </RevealItem>

      {/* CTAs */}
      <RevealItem style={{ marginTop: 32 }}>
        <div className="flex flex-wrap gap-3">
          <Button href="/work" variant="primary" size="md">
            View my work
          </Button>
          <Button href="/about" variant="secondary" size="md">
            About me
          </Button>
        </div>
      </RevealItem>

      {/* Selected work */}
      <RevealItem style={{ marginTop: 64 }}>
        <SelectedWork projects={latestProjects} />
      </RevealItem>

      {/* Latest writing */}
      {latestPosts.length > 0 && (
        <RevealItem style={{ marginTop: 56 }}>
          <LatestWriting posts={latestPosts} />
        </RevealItem>
      )}
    </Stagger>
  );
}
