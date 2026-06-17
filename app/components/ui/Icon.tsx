import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

/**
 * Icon — thin wrapper around lucide-react that applies the Astro brand
 * defaults: Lucide line style, 1.75px stroke, currentColor, 18px.
 *
 * Usage: <Icon icon={FileText} /> (import the glyph from "lucide-react").
 */
export type IconProps = LucideProps & {
  icon: ComponentType<LucideProps>;
};

export function Icon({ icon: Glyph, size = 18, strokeWidth = 1.75, ...rest }: IconProps) {
  return <Glyph size={size} strokeWidth={strokeWidth} aria-hidden {...rest} />;
}
