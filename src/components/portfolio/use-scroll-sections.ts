"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Section IDs we look for on each page. */
const PAGE_SECTIONS: Record<string, { id: string; label: string }[]> = {
  "/": [
    { id: "hero", label: "Hero" },
    { id: "story", label: "Story" },
    { id: "explore", label: "Explore" },
  ],
  "/journey": [
    { id: "journey", label: "Journey" },
    { id: "timeline", label: "Timeline" },
  ],
  "/work": [{ id: "work", label: "Work" }],
  "/projects": [{ id: "projects", label: "Projects" }],
  "/skills": [{ id: "skills", label: "Skills" }],
  "/beyond": [{ id: "beyond", label: "Beyond" }],
  "/awards": [{ id: "awards", label: "Awards" }],
  "/vision": [{ id: "vision", label: "Vision" }],
  "/contact": [{ id: "contact", label: "Contact" }],
  "/peak-craft": [{ id: "peak-craft", label: "Peak Craft" }],
};

export function useScrollSections() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");

  const sections = PAGE_SECTIONS[pathname] ?? [];
  const ids = sections.map((s) => s.id);

  useEffect(() => {
    if (ids.length === 0) {
      setActiveId("");
      return;
    }

    const visible = new Map<string, number>();
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visible.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);

            let best = "";
            let bestRatio = 0;
            visible.forEach((ratio, key) => {
              if (ratio > bestRatio) {
                bestRatio = ratio;
                best = key;
              }
            });
            if (best) setActiveId(best);
          });
        },
        {
          rootMargin: "-40% 0px -40% 0px",
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Set initial active
    setActiveId(ids[0] ?? "");

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return { sections, activeId };
}
