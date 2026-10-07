"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * iOS Dynamic Island — shared identity element used on the story intro
 * (phone chrome) and the workspace. Shows a live clock and, optionally,
 * the section currently in view (scroll-spy) when `sections` is provided.
 *
 * The workspace is a fixed, non-scrolling viewport, so it passes an explicit
 * `label` (the widget the user is currently touching) instead of a spy.
 */
export function DynamicIsland({
  sections,
  label,
  className = "top-0 pt-2",
}: {
  sections?: { id: string; label: string }[];
  /** Explicit label — wins over the scroll-spy (non-scrolling workspace). */
  label?: string;
  /** Position classes — the workspace docks it under the navbar pill. */
  className?: string;
}) {
  const [time, setTime] = useState("");
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      );
    tick();
    const timer = setInterval(tick, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!sections?.length) return;
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            const label = sections?.find((s) => s.id === entry.target.id)?.label ?? null;
            if (label) setActiveLabel(label);
          }
        }
      },
      // Active band: upper-middle of the viewport, like a section header.
      { rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.25] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [sections]);

  return (
    <div className={cn("pointer-events-none fixed inset-x-0 z-[110] flex justify-center", className)}>
      <div
        className="flex h-7 items-center gap-2 rounded-full bg-[#111] px-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        role="status"
        aria-label="Portfolio status"
      >
        <span aria-hidden className="size-1.5 rounded-full bg-[#059669]" />
        <span className="font-mono text-[10px] font-semibold tabular-nums text-white/85">
          {time}
        </span>
        {Boolean(label ?? activeLabel) && (
          <>
            <span aria-hidden className="h-3 w-px bg-white/20" />
            <span className="max-w-[10rem] truncate font-mono text-[10px] text-white/55">
              {label ?? activeLabel}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
