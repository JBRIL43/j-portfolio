"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "./use-reduced-motion";

function PauseOnModal() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const sync = () => {
      const open = !!document.querySelector(
        '[role="dialog"][data-state="open"]'
      );
      if (open) lenis.stop();
      else lenis.start();
    };
    sync();
    const ob = new MutationObserver(sync);
    ob.observe(document.body, { childList: true, subtree: true });
    return () => {
      ob.disconnect();
      lenis.start();
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: "vertical",
        syncTouch: true,
      }}
    >
      <PauseOnModal />
      {children}
    </ReactLenis>
  );
}
