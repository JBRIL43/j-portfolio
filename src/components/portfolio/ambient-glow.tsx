import { cn } from "@/lib/utils";

type AmbientGlowProps = {
  /** The gradient color (Tailwind bg class fragment). */
  color?: string;
  /** Size as a Tailwind size utility (e.g. "size-[36rem]"). */
  size?: string;
  /** Vertical position (Tailwind top-* utility). */
  top?: string;
  /** Horizontal position — either left or right. */
  side?: "left" | "right" | "center";
  /** Extra blur amount. */
  blur?: string;
  className?: string;
};

/**
 * A single ambient gradient blob positioned absolutely behind section content.
 * Renders a `pointer-events-none absolute inset-0 -z-10` container with a
 * centered (or offset) blurred circle inside.
 */
export function AmbientGlow({
  color = "bg-[#059669]/8",
  size = "size-[36rem]",
  top = "top-1/4",
  side = "left",
  blur = "blur-[120px]",
  className,
}: AmbientGlowProps) {
  const position =
    side === "center"
      ? `left-1/2 -translate-x-1/2 ${top}`
      : side === "right"
        ? `right-[-10%] ${top}`
        : `left-[-8%] ${top}`;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className={cn("absolute rounded-full", color, size, blur, position, className)} />
    </div>
  );
}
