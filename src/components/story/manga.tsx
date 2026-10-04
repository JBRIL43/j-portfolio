import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A clean rectangular manga panel. Occasional tilt via `tilt`. */
export function Panel({
  children,
  className,
  tilt,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  tilt?: "left" | "right";
  as?: "div" | "article" | "section" | "figure";
}) {
  return (
    <Tag
      className={cn(
        "relative border-[2.5px] border-[#111] bg-white p-5 sm:p-6",
        tilt === "left" && "-rotate-[0.8deg]",
        tilt === "right" && "rotate-[0.8deg]",
        className,
      )}
      style={{ boxShadow: "5px 5px 0 0 #111" }}
    >
      {children}
    </Tag>
  );
}

/** Classic offset manga narration box. */
export function NarrationBox({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-md border-[2.5px] border-[#111] bg-[#fafaf8] px-4 py-3 text-sm leading-relaxed text-[#333] italic",
        className,
      )}
      style={{ boxShadow: "4px 4px 0 0 #111" }}
    >
      {children}
    </div>
  );
}

/** Small hand-lettered chapter/section label. */
export function ChapterLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border-2 border-[#111] bg-[#111] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
