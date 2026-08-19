"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` when the user has enabled reduced motion in their OS.
 * Subscribes to live changes so the app reacts if the user toggles it.
 */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduce;
}
