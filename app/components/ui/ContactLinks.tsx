import { Mail } from "lucide-react";
import { Icon } from "./Icon";
import { GithubMark, LinkedinMark } from "./BrandIcons";
import { site } from "@/app/lib/site";

/**
 * ContactLinks — GitHub / LinkedIn / Email as compact icon links. Inherits
 * color via the `.status-icon-link` class so it adapts to its surface and
 * brightens on hover.
 */
export function ContactLinks({ size = 15, gap = 12 }: { size?: number; gap?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap }}>
      <a className="status-icon-link" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <GithubMark size={size} />
      </a>
      <a className="status-icon-link" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <LinkedinMark size={size} />
      </a>
      <a className="status-icon-link" href={`mailto:${site.email}`} aria-label="Email">
        <Icon icon={Mail} size={size + 1} />
      </a>
    </span>
  );
}
