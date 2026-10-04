"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useProtagonistState } from "./chapter-section";

export type ProtagonistState =
  | "idle"
  | "walking"
  | "working"
  | "looking"
  | "walking-away";

/** Which placeholder pose art each narrative state maps to. */
const poseFor: Record<ProtagonistState, string> = {
  idle: "idle",
  walking: "walking",
  working: "working",
  looking: "looking",
  "walking-away": "walking-away",
};

const altFor: Record<ProtagonistState, string> = {
  idle: "Manga protagonist standing at the start of the journey",
  walking: "Manga protagonist walking along the path",
  working: "Manga protagonist working at a laptop",
  looking: "Manga protagonist looking ahead toward what is next",
  "walking-away": "Manga protagonist seen from behind, walking to the next chapter",
};

/**
 * The recurring storyteller. Swap the SVGs in /public/images/character with
 * final artwork (same file names) and this component keeps working unchanged.
 */
export function Protagonist({
  state,
  className,
  priority,
}: {
  state?: ProtagonistState;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const contextState = useProtagonistState();
  const resolved = state ?? contextState;
  const pose = poseFor[resolved];

  if (failed) return null;

  return (
    <img
      src={`/images/character/${pose}.svg`}
      alt={altFor[resolved]}
      width={240}
      height={320}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn(
        "h-auto w-full max-w-[240px] object-contain select-none transition-opacity duration-500 motion-reduce:transition-none",
        className,
      )}
      draggable={false}
    />
  );
}
