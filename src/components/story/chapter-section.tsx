"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ProtagonistState } from "./protagonist";

const ProtagonistContext = createContext<ProtagonistState>("idle");

/** Current pose for figures inside this section (idle until section is in view). */
export function useProtagonistState() {
  return useContext(ProtagonistContext);
}

/**
 * Wraps one story section and reveals the protagonist state once the section
 * is in view. Text renders immediately: no fade-ins, per design rules.
 */
export function ChapterSection({
  id,
  state,
  base = "idle",
  children,
  className,
}: {
  id: string;
  state: ProtagonistState;
  base?: ProtagonistState;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-20% 0px -20% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ProtagonistContext.Provider value={active ? state : base}>
      <section ref={ref} id={id} className={className}>
        {children}
      </section>
    </ProtagonistContext.Provider>
  );
}
