"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/app/lib/writing";

/**
 * TableOfContents — the sticky "ON THIS PAGE" rail (wireframe 2). An
 * IntersectionObserver scroll-spy highlights the heading currently in view with
 * a left ink bar. Anchor clicks rely on CSS scroll-margin (set on headings in
 * prose.css) so they land below the sticky nav.
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost heading currently intersecting the upper band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Trip when a heading enters the top ~25% of the viewport.
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 1] },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <p className="ds-caption-uppercase" style={{ marginBottom: 14 }}>
        On this page
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id} style={{ paddingLeft: item.depth === 3 ? 14 : 0 }}>
              <a
                href={`#${item.id}`}
                className="no-underline"
                style={{
                  display: "block",
                  paddingLeft: 12,
                  borderLeft: "2px solid",
                  borderColor: active ? "var(--color-ink)" : "var(--color-hairline-strong)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12.5,
                  lineHeight: 1.4,
                  color: active ? "var(--color-ink)" : "var(--color-muted)",
                  transition: "color 140ms ease, border-color 140ms ease",
                }}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
