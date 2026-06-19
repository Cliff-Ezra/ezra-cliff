import Link from "next/link";
import { Button, GithubMark, Tag } from "@/app/components/ui";
import type { Project } from "@/app/lib/projects";
import { coverGradient } from "@/app/lib/cover";
import { repoUrl } from "@/app/lib/github";

/** Uppercase meta label + value pair in the sticky rail. */
function RailMeta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="ds-caption-uppercase">{label}</p>
      <div style={{ marginTop: 6, color: "var(--color-ink)", fontWeight: 500 }}>{children}</div>
    </div>
  );
}

/**
 * ShotFrame — a placeholder screenshot rendered as a faux browser window: a
 * chrome bar with traffic-light dots over a seeded gradient body, caption below.
 * Stands in for a real screenshot until images are added.
 */
function ShotFrame({ seed, caption }: { seed: string; caption: string }) {
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          overflow: "hidden",
          border: "1px solid var(--color-hairline-strong)",
          borderRadius: "var(--radius-lg)",
          background: "var(--color-surface-card)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-1.5"
          style={{
            padding: "8px 10px",
            borderBottom: "1px solid var(--color-hairline)",
            background: "var(--color-surface-strong)",
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
        </div>
        {/* Image body */}
        <div style={{ aspectRatio: "16 / 10", background: coverGradient(seed) }} />
      </div>
      <figcaption
        className="mt-2"
        style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-muted)" }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

/** A "The problem" / "What I built" style section — renders only when it has body copy. */
function StorySection({ title, body }: { title: string; body?: string }) {
  if (!body) return null;
  return (
    <section>
      <h2 className="ds-display-sm">{title}</h2>
      <p className="ds-body" style={{ marginTop: 12, fontSize: 16, maxWidth: 640 }}>
        {body}
      </p>
    </section>
  );
}

/**
 * ProjectDetail — the split-sticky case-study layout. A sticky left rail holds
 * the facts (name, tagline, cover, role / year / stack, links); the story
 * (problem → what I built → outcome) scrolls on the right. Narrative sections
 * render only when their content exists, so a sparse project degrades cleanly.
 */
export function ProjectDetail({ project }: { project: Project }) {
  const hasStory = Boolean(project.problem || project.build || project.outcome?.length);

  return (
    <div>
      {/* Back link */}
      <Link
        href="/work"
        className="no-underline"
        style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-text-link)" }}
      >
        ← all work
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-[300px_1fr] md:gap-12">
        {/* Sticky rail */}
        <aside
          className="self-start md:sticky"
          style={{ top: "calc(var(--nav-height) + 24px)" }}
        >
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-flex shrink-0 items-center justify-center"
              style={{
                width: 28,
                height: 28,
                fontSize: 14,
                lineHeight: 1,
                border: "1px solid var(--color-hairline-strong)",
                borderRadius: "var(--radius-sm)",
                background: "var(--color-surface-strong)",
              }}
            >
              {project.glyph}
            </span>
            <h1 className="ds-display-md">{project.name}</h1>
          </div>

          <p className="ds-body" style={{ marginTop: 10 }}>
            {project.tagline ?? project.summary}
          </p>

          {/* Cover thumbnail */}
          <div
            className="mt-5"
            style={{
              aspectRatio: "16 / 10",
              background: coverGradient(project.slug),
              borderRadius: "var(--radius-lg)",
            }}
          />

          {/* Facts */}
          <div className="mt-6 flex flex-col gap-5">
            {project.role && <RailMeta label="Role">{project.role}</RailMeta>}
            <RailMeta label="Year">{project.year}</RailMeta>
            <RailMeta label="Category">{project.category}</RailMeta>
            <div>
              <p className="ds-caption-uppercase">Stack</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>

          {/* Links — both always shown; disabled when no URL is available. */}
          <div className="mt-7 flex flex-col gap-3">
            <Button
              href={project.liveUrl}
              variant="primary"
              size="md"
              disabled={!project.liveUrl}
              aria-label={project.liveUrl ? "Live demo" : "Live demo unavailable"}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {project.liveUrl ? "Live demo ↗" : "Live demo"}
            </Button>
            <Button
              href={project.repo ? repoUrl(project.repo) : undefined}
              variant="secondary"
              size="md"
              disabled={!project.repo}
              iconLeft={<GithubMark size={14} />}
              aria-label={project.repo ? "Source on GitHub" : "Source unavailable (private)"}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {project.repo ? "Source ↗" : "Source · private"}
            </Button>
          </div>
        </aside>

        {/* Story */}
        <div className="flex flex-col gap-12">
          {hasStory ? (
            <>
              <StorySection title="The problem" body={project.problem} />
              <StorySection title="What I built" body={project.build} />

              {project.shots && project.shots.length > 0 && (
                <section>
                  <h2 className="ds-display-sm">Screenshots</h2>
                  {/* Horizontally scrollable strip; each frame keeps a fixed width. */}
                  <div
                    className="mt-4 flex gap-5 overflow-x-auto pb-2"
                    style={{ scrollSnapType: "x proximity" }}
                  >
                    {project.shots.map((shot, i) => (
                      <div
                        key={shot.caption}
                        className="shrink-0"
                        style={{ width: "min(360px, 80%)", scrollSnapAlign: "start" }}
                      >
                        <ShotFrame seed={`${project.slug}-${i}`} caption={shot.caption} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {project.outcome && project.outcome.length > 0 && (
                <section>
                  <h2 className="ds-display-sm">The outcome</h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {project.outcome.map((m) => (
                      <div
                        key={m.label}
                        style={{
                          padding: "18px 20px",
                          border: "1px solid var(--color-hairline-strong)",
                          borderRadius: "var(--radius-lg)",
                          background: "var(--color-surface-card)",
                        }}
                      >
                        <p style={{ fontWeight: 600, fontSize: 24, color: "var(--color-ink)" }}>{m.value}</p>
                        <p className="ds-body" style={{ marginTop: 2, fontSize: 14 }}>
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            // No case-study copy yet — show the summary so the page never looks empty.
            <section>
              <h2 className="ds-display-sm">About</h2>
              <p className="ds-body" style={{ marginTop: 12, fontSize: 16, maxWidth: 640 }}>
                {project.summary}
              </p>
              <p
                className="mt-6"
                style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-muted)" }}
              >
                {"// full write-up coming soon"}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
