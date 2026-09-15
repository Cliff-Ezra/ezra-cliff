"use client";

import Link from "next/link";
import { GithubMark, Tag } from "@/app/components/ui";
import type { Project } from "@/app/lib/projects";
import { repoLabel, repoUrl } from "@/app/lib/github";
import { coverGradient } from "@/app/lib/cover";

/**
 * ProjectCard — one project tile: cover art, name + category·year, a
 * plain-language summary, lowercase stack tags, and links (GitHub repo / live
 * demo). The cover and title link to the project's detail page; the footer
 * repo / live links stay independently clickable.
 */
export function ProjectCard({ project }: { project: Project }) {
  const detailHref = `/work/${project.slug}`;
  return (
    <article
      className="ds-card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--color-hairline-strong)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface-card)",
        overflow: "hidden",
      }}
    >
      {/* Cover art (placeholder gradient — real screenshots land later) */}
      <Link href={detailHref} aria-label={`${project.name} — details`} className="block no-underline">
        <div className="ds-cover" style={{ aspectRatio: "16 / 9", background: coverGradient(project.slug) }} />
      </Link>

      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "18px 20px" }}>
        {/* Title row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2.5">
            {/* Glyph plate — bordered, subtly filled, like the reference */}
            <span
              aria-hidden
              className="inline-flex shrink-0 items-center justify-center"
              style={{
                width: 25,
                height: 25,
                fontSize: 12,
                lineHeight: 1,
                border: "1px solid var(--color-hairline-strong)",
                borderRadius: "var(--radius-sm)",
                background: "var(--color-surface-strong)",
              }}
            >
              {project.glyph}
            </span>
            <h3 className="truncate" style={{ fontWeight: 600, fontSize: 18 }}>
              <Link href={detailHref} className="no-underline" style={{ color: "var(--color-ink)" }}>
                {project.name}
              </Link>
            </h3>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-muted)",
              whiteSpace: "nowrap",
            }}
          >
            {project.category} · {project.year}
          </span>
        </div>

        {/* Summary */}
        <p className="ds-body" style={{ fontSize: 14, margin: 0 }}>
          {project.summary}
        </p>

        {/* Lowercase stack tags */}
        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}

        {/* Links — GitHub repo (icon + name) and/or live demo. Hidden entirely
            when a project has neither (e.g. private work with no public link). */}
        {(project.repo || project.liveUrl) && (
        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
          style={{
            marginTop: 2,
            paddingTop: 12,
            borderTop: "1px solid var(--color-hairline)",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
          }}
        >
          {project.repo && (
            <Link
              href={repoUrl(project.repo)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 no-underline"
              style={{ color: "var(--color-body)" }}
            >
              <GithubMark size={14} />
              {repoLabel(project.repo)}
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
              style={{ color: "var(--color-body)" }}
            >
              Live demo ↗
            </Link>
          )}
        </div>
        )}
      </div>
    </article>
  );
}
