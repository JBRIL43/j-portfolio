"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSections } from "./use-scroll-sections";
import { useReducedMotion } from "./use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Vertical scroll progress indicator fixed to the right edge.
 * Shows one dot per section on the current page with a connecting line.
 * The active section dot is highlighted; past dots are filled.
 * Labels appear on hover.
 */
export function ScrollProgressIndicator() {
  const { sections, activeId } = useScrollSections();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fade in after a short delay so it doesn't clash with page load
  useEffect(() => {
    if (sections.length <= 1) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => setVisible(true), 2400);
    return () => clearTimeout(t);
  }, [sections.length]);

  // Hide after inactivity so it doesn't feel permanent
  useEffect(() => {
    if (!visible) return;
    const show = () => {
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 4000);
    };
    show();
    window.addEventListener("scroll", show, { passive: true });
    return () => {
      window.removeEventListener("scroll", show);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, activeId]);

  if (sections.length <= 1) return null;

  const activeIdx = sections.findIndex((s) => s.id === activeId);
  const progress = activeIdx / Math.max(sections.length - 1, 1);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{
            duration: reduce ? 0 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-label="Scroll progress"
          className="fixed right-4 top-1/2 z-40 -translate-y-1/2 hidden md:flex flex-col items-center gap-0"
        >
          {/* Track */}
          <div className="relative flex flex-col items-center" style={{ height: sections.length * 32 }}>
            {/* Background line */}
            <div className="absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2 bg-black/15" />

            {/* Filled line */}
            <motion.div
              className="absolute top-2 left-1/2 w-px -translate-x-1/2 bg-[#111]"
              initial={false}
              animate={{ height: `${progress * 100}%` }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxHeight: `${(sections.length - 1) * 32}px` }}
            />

            {/* Dots */}
            {sections.map((section, i) => {
              const isActive = section.id === activeId;
              const isPast = i < activeIdx;
              const isHovered = hovered === section.id;

              return (
                <div
                  key={section.id}
                  className="relative flex items-center"
                  style={{ height: "32px" }}
                  onMouseEnter={() => setHovered(section.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Label (appears on hover) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-full mr-3 whitespace-nowrap rounded-md glass px-2.5 py-1 text-[11px] font-medium text-foreground/90 shadow-lg"
                      >
                        {section.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Dot */}
                  <motion.button
                    onClick={() => {
                      const el = document.getElementById(section.id);
                      el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
                    }}
                    className={cn(
                      "relative z-10 rounded-full transition-all duration-300 cursor-pointer",
                      "size-2.5",
                      isActive && "size-3.5",
                      isActive
                        ? "bg-[#111] shadow-[0_0_12px_rgb(17_17_17_/_0.4)]"
                        : isPast
                          ? "bg-[#111]/45"
                          : "bg-black/25 hover:bg-black/40"
                    )}
                    whileHover={reduce ? undefined : { scale: 1.4 }}
                    aria-label={`Go to ${section.label}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {isActive && !reduce && (
                      <motion.span
                        layoutId="scroll-dot-ring"
                        className="absolute -inset-1 rounded-full ring-1 ring-[#059669]/50"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </div>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
