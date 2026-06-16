"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookText,
  Braces,
  ChevronRight,
  FileCode2,
  FileCog,
  FileText,
  Folder,
  FolderOpen,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";
import { Icon, RevealItem, Stagger } from "@/app/components/ui";
import { explorerTree, type ExplorerNode } from "@/app/lib/explorer";
import { navLinks, site } from "@/app/lib/site";
import { BashPrompt } from "./BashPrompt";

/** Language dot colours (GitHub-linguist-ish) for the file-code glyphs. */
const LANG_COLOR: Record<string, string> = {
  go: "#00add8",
  ts: "#3178c6",
  php: "#777bb4",
  dart: "#00b4ab",
};

/** Derive an icon + colour from a filename, for the terminal vibe. */
function getFileMeta(name: string): { glyph: LucideIcon; color: string } {
  if (name === "README.md") return { glyph: BookText, color: "var(--color-text-link)" };
  const ext = name.split(".").pop() ?? "";
  switch (ext) {
    case "go":
    case "ts":
    case "php":
    case "dart":
      return { glyph: FileCode2, color: LANG_COLOR[ext] };
    case "json":
      return { glyph: Braces, color: "#b3a429" };
    case "yaml":
    case "yml":
      return { glyph: FileCog, color: "#8a5cf0" };
    case "sh":
      return { glyph: SquareTerminal, color: "var(--color-success)" };
    default:
      return { glyph: FileText, color: "var(--color-muted)" };
  }
}

const INDENT = 14;

function FileRow({ node, depth }: { node: Extract<ExplorerNode, { type: "file" }>; depth: number }) {
  const { glyph, color } = getFileMeta(node.name);
  return (
    <Link
      href={node.href}
      className="explorer-row group no-underline"
      data-active={node.active || undefined}
      style={{ paddingLeft: 8 + depth * INDENT }}
    >
      <Icon icon={glyph} size={15} style={{ color }} />
      <span className="explorer-row__name">{node.name}</span>
      {node.active && (
        <span
          aria-hidden
          style={{
            marginLeft: "auto",
            width: 6,
            height: 6,
            borderRadius: "var(--radius-pill)",
            background: "var(--color-text-link)",
          }}
        />
      )}
    </Link>
  );
}

function FolderRow({ node, depth }: { node: Extract<ExplorerNode, { type: "folder" }>; depth: number }) {
  const [open, setOpen] = useState(node.defaultOpen ?? false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="explorer-row w-full"
        style={{ paddingLeft: 8 + depth * INDENT }}
      >
        <Icon
          icon={ChevronRight}
          size={14}
          style={{
            color: "var(--color-muted)",
            transform: open ? "rotate(90deg)" : "none",
            transition: "transform 140ms ease",
          }}
        />
        <Icon icon={open ? FolderOpen : Folder} size={15} style={{ color: "var(--color-body)" }} />
        <span className="explorer-row__name">{node.name}/</span>
      </button>
      {open &&
        node.children.map((child) =>
          child.type === "folder" ? (
            <FolderRow key={child.name} node={child} depth={depth + 1} />
          ) : (
            <FileRow key={child.href} node={child} depth={depth + 1} />
          ),
        )}
    </>
  );
}

/**
 * Explorer — the home-page quick-links rail ("browse the source"). Real
 * file-tree of projects, writing and pages, with collapsible folders and
 * deep links. `inDrawer` adds the section links (which the top bar drops on
 * mobile) and removes the rail border.
 */
export function Explorer({ inDrawer = false }: { inDrawer?: boolean }) {
  return (
    <div
      className="bg-canvas-soft flex h-full flex-col"
      style={{
        borderRight: inDrawer ? "none" : "1px solid var(--color-hairline)",
      }}
    >
      {/* Header: EXPLORER · repo */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "var(--space-base) var(--space-base) var(--space-xs)" }}
      >
        <span className="ds-caption-uppercase">Explorer</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--color-muted)",
            letterSpacing: "0.5px",
          }}
        >
          {site.github.split("/").pop()?.toLowerCase()}
        </span>
      </div>

      {/* On mobile (drawer), surface the section links the top bar dropped. */}
      {inDrawer && (
        <nav
          className="mb-2 flex flex-col gap-0.5 pb-3"
          style={{ borderBottom: "1px solid var(--color-hairline)", padding: "0 8px 12px" }}
        >
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="explorer-row no-underline">
              <span className="explorer-row__name" style={{ fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                {l.label}
              </span>
            </Link>
          ))}
        </nav>
      )}

      {/* Tree — rows "print in" with a quick one-time stagger */}
      <Stagger className="flex-1 overflow-y-auto" style={{ padding: "0 8px" }} stagger={0.04} delayChildren={0.12}>
        {explorerTree.map((node) => (
          <RevealItem key={node.type === "folder" ? node.name : node.href} y={4}>
            {node.type === "folder" ? (
              <FolderRow node={node} depth={0} />
            ) : (
              <FileRow node={node} depth={0} />
            )}
          </RevealItem>
        ))}
      </Stagger>

      {/* Bash prompt footer — typewriter, personality */}
      <BashPrompt />
    </div>
  );
}
