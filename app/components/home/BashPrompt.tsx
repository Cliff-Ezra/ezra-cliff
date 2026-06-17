"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { site } from "@/app/lib/site";

/** Commands the prompt "types" — realistic, on-theme, cycled slowly. */
const COMMANDS = ["whoami", "cat README.md", "ls projects/", "open writing/", "git status"];

const TYPE_MS = 65; // per character while typing
const DELETE_MS = 32; // per character while deleting
const HOLD_MS = 1500; // pause once a command is fully typed
const GAP_MS = 350; // pause after clearing, before the next command

/**
 * BashPrompt — the explorer footer, upgraded to a typewriter. Types a command
 * after the `$`, holds, deletes, then moves to the next — with the blinking
 * caret. Reduced-motion users get a single static command (no typing loop),
 * keeping it accessible and honoring the brand's restraint.
 */
export function BashPrompt() {
  const reduce = useReducedMotion();
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return; // static render below; no animation loop

    const full = COMMANDS[index % COMMANDS.length];

    if (!deleting && text === full) {
      const t = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => i + 1);
      }, GAP_MS);
      return () => clearTimeout(t);
    }

    const next = deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1);
    const t = setTimeout(() => setText(next), deleting ? DELETE_MS : TYPE_MS);
    return () => clearTimeout(t);
  }, [text, deleting, index, reduce]);

  return (
    <div
      style={{
        padding: "10px var(--space-base)",
        borderTop: "1px solid var(--color-hairline)",
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        color: "var(--color-muted)",
        display: "flex",
        alignItems: "center",
        gap: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      <span style={{ color: "var(--color-success)" }}>{site.promptUser}@home</span>
      <span>:</span>
      <span style={{ color: "var(--color-text-link)" }}>~</span>
      <span>$&nbsp;</span>
      <span style={{ color: "var(--color-body)" }}>{reduce ? COMMANDS[0] : text}</span>
      <span
        aria-hidden
        className="animate-pulse"
        style={{ marginLeft: 2, width: 6, height: 13, background: "var(--color-body)", display: "inline-block", flexShrink: 0 }}
      />
    </div>
  );
}
