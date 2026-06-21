"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

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
            if (best && bestRatio > 0) setActive(best);
          });
        },
        {
          rootMargin: "-45% 0px -45% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids.join(",")]);

  return active;
}
