"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

/**
 * Theme state lives on the <html data-theme> attribute, set before paint by
 * the no-flash script in layout.tsx. We read it via useSyncExternalStore so
 * there's no setState-in-effect and hydration is handled cleanly: the server
 * snapshot is "light", and if the real (client) theme differs, React does one
 * extra render to correct it — no hydration warning.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getSnapshot(): Theme {
  return (document.documentElement.getAttribute("data-theme") as Theme) || "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

export function setTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* storage unavailable — fall back to in-memory only */
  }
  listeners.forEach((l) => l());
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggle = useCallback(() => setTheme(theme === "light" ? "dark" : "light"), [theme]);
  return { theme, toggle };
}
