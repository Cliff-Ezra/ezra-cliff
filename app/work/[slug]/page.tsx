import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GhostHero from "@/app/components/coming-soon/GhostHero";
import { WorkShell } from "@/app/components/work/WorkShell";
import { ProjectDetail } from "@/app/components/work/ProjectDetail";
import { getProject, projects } from "@/app/lib/projects";

/** Pre-render a detail page for every known project slug. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return {
    title: `${project.name} — Work`,
    description: project.tagline ?? project.summary,
  };
}

/**
 * /work/[slug] — a project's detail page. Gated by the same
 * NEXT_PUBLIC_SITE_MODE flag as the rest of the site; unknown slugs 404.
 */
export default async function ProjectRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const isLive = process.env.NEXT_PUBLIC_SITE_MODE === "staging";
  if (!isLive) return <GhostHero />;

  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <WorkShell>
      <ProjectDetail project={project} />
    </WorkShell>
  );
}
