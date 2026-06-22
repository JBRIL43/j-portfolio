"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Cursor-following 3D tilt hook.
 *
 * Attach the returned `ref`, `onMouseMove`, `onMouseLeave` and `style`
 * to any motion.* element to make it tilt toward the cursor (like the
 * hero identity card). Also exposes `--tilt-mx` / `--tilt-my` CSS vars
 * (px) for a cursor-following glare overlay.
 *
 * Generic over the host element type so it works on div / button / anchor.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(max = 8) {
  const ref = useRef<T | null>(null);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mvX, [-1, 1], [max, -max]), {
    stiffness: 140,
    damping: 16,
    mass: 0.4,
  });
  const rotateX = useSpring(useTransform(mvY, [-1, 1], [-max, max]), {
    stiffness: 140,
    damping: 16,
    mass: 0.4,
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mvX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      mvY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
      el.style.setProperty("--tilt-mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--tilt-my", `${e.clientY - rect.top}px`);
    },
    [mvX, mvY]
  );

  const onMouseLeave = useCallback(() => {
    mvX.set(0);
    mvY.set(0);
  }, [mvX, mvY]);

  const style = useMemo(
    () => ({
      rotateX,
      rotateY,
      transformPerspective: 1000,
    }),
    [rotateX, rotateY]
  );

  return { ref, onMouseMove, onMouseLeave, style };
}

/**
 * Cursor-following radial glare overlay.
 * Parent must carry `group/tilt` and (for clipping) `overflow-hidden` + a radius.
 */
export function TiltGlare({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100",
        "[background:radial-gradient(240px_circle_at_var(--tilt-mx,50%)_var(--tilt-my,50%),oklch(0.62_0.2_255/0.16),transparent_60%)]",
        className
      )}
    />
  );
}

type TiltCardProps = Omit<
  React.ComponentProps<typeof motion.div>,
  "ref" | "onMouseMove" | "onMouseLeave" | "style"
> & {
  max?: number;
  glare?: boolean;
};

/**
 * A motion.div that tilts toward the cursor with an optional glare.
 * Spreads extra framer props (variants, initial, animate, transition, ...)
 * so it can participate in stagger entrances.
 */
export function TiltCard({
  children,
  className,
  max = 8,
  glare = true,
  ...props
}: TiltCardProps) {
  const { ref, onMouseMove, onMouseLeave, style } = useTilt<HTMLDivElement>(max);
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      className={cn("group/tilt", className)}
      {...props}
    >
      {glare && <TiltGlare />}
      {children}
    </motion.div>
  );
}

