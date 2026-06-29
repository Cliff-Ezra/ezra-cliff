import Link from "next/link";
import { coverGradient } from "@/app/lib/cover";
import type { Project } from "@/app/lib/projects";

/** A section heading with a "see all →" link on the right. */
function SectionHead({ title, allHref, allLabel }: { title: string; allHref: string; allLabel: string }) {
  return (
    <header className="flex items-baseline justify-between gap-4">
      <h2 style={{ fontWeight: 600, fontSize: 22, letterSpacing: "-0.4px", color: "var(--color-ink)" }}>{title}</h2>
      <Link
        href={allHref}
        className="no-underline transition-opacity hover:opacity-80"
        style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-link)", whiteSpace: "nowrap" }}
      >
        {allLabel} →
      </Link>
    </header>
  );
}

/**
 * SelectedWork — the home "Selected work" block: lightweight cover cards
 * (gradient placeholder + name + one-line tagline). No tags / repo links here;
 * the full detail lives on the project page.
 */
export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <section>
      <SectionHead title="Selected work" allHref="/work" allLabel="All projects" />
      {/* Compact rows on mobile (less scroll); cover cards on sm+. */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="ds-card-hover no-underline flex flex-row items-center overflow-hidden sm:flex-col sm:items-stretch"
            style={{
              border: "1px solid var(--color-hairline-strong)",
              borderRadius: "var(--radius-lg)",
              background: "var(--color-surface-card)",
            }}
          >
            <div
              className="ds-cover h-20 w-20 shrink-0 sm:h-auto sm:w-full sm:aspect-video"
              style={{ background: coverGradient(p.slug) }}
            />
            <div className="min-w-0" style={{ padding: "12px 14px" }}>
              <h3 style={{ fontWeight: 600, fontSize: 16, color: "var(--color-ink)" }}>{p.name}</h3>
              <p className="ds-body truncate" style={{ marginTop: 3, fontSize: 13.5 }}>
                {p.tagline ?? p.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
