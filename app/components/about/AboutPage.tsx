"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  Button,
  ContactLinks,
  RevealItem,
  StatusDot,
  Stagger,
} from "@/app/components/ui";
import { site } from "@/app/lib/site";
import { skillCategories } from "@/app/lib/skills";
import { ExperienceTimeline } from "./ExperienceTimeline";

/**
 * AboutPage — the /about main pane. A profile header (portrait + bio + status +
 * links + CV download), the experience timeline (latest roles, expandable), and
 * a skills grid.
 */
export function AboutPage() {
  const reduce = useReducedMotion();
  return (
    <Stagger>
      {/* Terminal-style header, matching /work's "$ ls projects/". */}
      <RevealItem>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-success)" }}>
          $ cat about.md
        </p>
      </RevealItem>

      {/* Profile hero — identity on the left, bio on the right so the top
          fills the full width instead of crowding the left edge. */}
      <RevealItem style={{ marginTop: 20 }}>
        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
          {/* Left: photo + identity */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
            {/* Portrait — 116px square on mobile (unchanged), taller portrait
                from sm: up so it balances the identity column on desktop. */}
            <div
              className="relative shrink-0 overflow-hidden h-[116px] w-[116px] sm:h-[210px] sm:w-[156px]"
              style={{
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-hairline-strong)",
              }}
            >
              <Image
                src="/images/profile/ezra-cliff.png"
                alt={site.name}
                fill
                priority
                sizes="(max-width: 640px) 116px, 156px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>

            <div className="min-w-0">
              <h1 className="ds-display-lg">{site.name}</h1>
              <p
                className="ds-body"
                style={{ marginTop: 6, fontSize: 16, color: "var(--color-body)" }}
              >
                {site.role} · {site.location}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                <StatusDot tone="success">Available</StatusDot>
                <ContactLinks size={16} />
              </div>

              <div className="mt-5">
                <Button
                  href={site.cv}
                  variant="primary"
                  size="md"
                  iconLeft={<Download size={15} />}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  View / Download CV
                </Button>
              </div>
            </div>
          </div>

          {/* Right: bio */}
          <p className="ds-body" style={{ fontSize: 17, color: "var(--color-body)" }}>
            I write software that helps people do real things — move money safely,
            access justice, get healthcare. Five years of backend-heavy, full-stack
            work across Go, Laravel, Next.js and Flutter, mostly on the continent,
            mostly for people for whom connectivity isn&apos;t a given.
          </p>
        </div>
      </RevealItem>

      {/* Experience */}
      <RevealItem style={{ marginTop: 44 }}>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="ds-display-sm">Experience</h2>
          <a
            href={site.cv}
            download="Cliff-Ezra-Esau-CV.pdf"
            className="no-underline"
            style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-text-link)" }}
          >
            résumé.pdf ↓
          </a>
        </div>
      </RevealItem>
      <RevealItem style={{ marginTop: 22 }}>
        <ExperienceTimeline />
      </RevealItem>

      {/* Tech Stack */}
      <RevealItem style={{ marginTop: 48 }}>
        <h2 id="skills" className="ds-display-sm" style={{ scrollMarginTop: "calc(var(--nav-height) + 24px)" }}>
          Tech Stack
        </h2>
      </RevealItem>
      <RevealItem style={{ marginTop: 20 }}>
        <div className="flex flex-col gap-5">
          {skillCategories.map((cat) => (
            <div key={cat.label} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
              <p
                className="shrink-0"
                style={{ width: 180, fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}
              >
                {cat.label}
              </p>
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.04 } } }}
              >
                {cat.skills.map((s) => (
                  <motion.span
                    key={s.name}
                    variants={{
                      hidden: { opacity: 0, y: reduce ? 0 : 8 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    whileHover={reduce ? undefined : { y: -2 }}
                    className="ds-card-hover inline-flex items-center gap-1.5"
                    style={{
                      padding: "5px 11px",
                      border: "1px solid var(--color-hairline-strong)",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--color-surface-card)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      color: "var(--color-ink)",
                      cursor: "default",
                    }}
                  >
                    <s.icon size={15} color={s.color} aria-hidden />
                    {s.name}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </RevealItem>
    </Stagger>
  );
}
