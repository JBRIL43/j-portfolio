"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Returns a scroll-driven Y offset (in px) for a given element.
 * `speed` controls how fast the element moves relative to the viewport:
 *   - 0   = fixed (no movement)
 *   - 0.5 = half speed (classic parallax)
 *   - 1   = normal scroll speed
 *   - 2   = double speed (moves faster)
 *
 * A positive `speed` makes the element scroll slower than normal (moves up less).
 * A negative `speed` makes it scroll faster than normal (moves up more).
 */
export function useParallaxScroll(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reduce || !ref.current) return;

    const el = ref.current;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        // How far through the viewport the element is (0 = just entered bottom, 1 = just left top)
        const progress = (viewH - rect.top) / (viewH + rect.height);
        // Map to a centered range so 0 = element centered in viewport
        const centered = progress - 0.5;
        setOffset(centered * speed * 200);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, speed]);

  return { ref, offset };
}

/**
 * GSAP-free parallax for multiple layers.
 * Each layer has its own speed multiplier.
 * Returns a ref for the container and the current scroll progress (0-1).
 */
export function useParallaxProgress() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reduce) return;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docH > 0 ? scrollY / docH : 0);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  return progress;
}
