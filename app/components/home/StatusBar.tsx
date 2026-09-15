import { GitBranch } from "lucide-react";
import { ContactLinks, Icon, StatusDot } from "@/app/components/ui";
import { site } from "@/app/lib/site";

export function StatusBar() {
  const year = new Date().getFullYear();

  const itemStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--color-muted)",
  };

  return (
    <footer
      style={{
        height: "var(--statusbar-height)",
        background: "var(--color-chrome-solid)",
        borderTop: "1px solid var(--color-chrome-border)",
      }}
    >
      <div
        className="mx-auto flex h-full items-center gap-4 px-4 sm:px-6"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <span style={itemStyle}>
          <Icon icon={GitBranch} size={13} /> {site.branch}
        </span>
        <StatusDot tone="success" mono style={{ color: "var(--color-muted)" }}>
          online
        </StatusDot>
        <ContactLinks size={14} gap={10} />

        <div className="ml-auto flex items-center gap-4">
          <span style={itemStyle} suppressHydrationWarning>
            © {year} {site.shortName}
          </span>
        </div>
      </div>
    </footer>
  );
}
