"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const finish = () => setDone(true);

    if (reduce) {
      const t = setTimeout(finish, 200);
      return () => clearTimeout(t);
    }

    // Wait for load, but cap at 1.6s for snappy UX
    const cap = setTimeout(finish, 1600);
    if (document.readyState === "complete") {
      const t = setTimeout(finish, 900);
      return () => {
        clearTimeout(t);
        clearTimeout(cap);
      };
    }
    const onLoad = () => setTimeout(finish, 600);
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      clearTimeout(cap);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#059669]/12 blur-[120px]" />

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-[#059669]/25 blur-xl" />
              <div className="relative grid size-16 place-items-center rounded-2xl glass-strong">
                <span className="text-xl font-semibold tracking-tight text-gradient-blue">
                  JB
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-3">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="text-sm text-muted-foreground"
              >
                Jibril Nuredin
              </motion.p>
              <div className="h-px w-44 overflow-hidden rounded-full bg-black/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-transparent via-[#111] to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
