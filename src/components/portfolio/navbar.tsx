"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Journey", href: "/journey" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Work", href: "/work" },
  { label: "Beyond", href: "/beyond" },
  { label: "Awards", href: "/awards" },
  { label: "Contact", href: "/contact" },
];

function IslandClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    tick();
    const timer = setInterval(tick, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-mono text-[11px] font-semibold tabular-nums text-white/85">
      {time}
    </span>
  );
}

/**
 * Dynamic Island / Notch-style header: a compact black pill at the top
 * that morphs open into the site navigation on hover, tap, or focus.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wrapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname === "/desktop") return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

  return (
    <header
      ref={wrapRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
      onMouseEnter={() => canHover && setOpen(true)}
      onMouseLeave={() => canHover && setOpen(false)}
    >
      <div className="pointer-events-auto">
        {/* The island pill */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
          className={cn(
            "relative overflow-hidden bg-[#111] text-white",
            "rounded-full border border-white/10",
            "shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
            open ? "rounded-[28px]" : "rounded-[22px]",
          )}
        >
          {/* Collapsed status row */}
          <motion.button
            type="button"
            layout
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Open navigation"
            className="flex cursor-pointer items-center gap-3 px-4 py-2.5"
          >
            <span className="grid size-6 place-items-center rounded-full bg-[#059669] text-[11px] font-black leading-none text-white">
              J
            </span>
            {!open && (
              <>
                <span className="h-3 w-px bg-white/20" />
                <IslandClock />
              </>
            )}
          </motion.button>

          {/* Expanded navigation */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/10 px-3 pb-3 pt-2">
                  <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-1.5">
                    {navLinks.map((link) => {
                      const active = isActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "rounded-xl px-3 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors",
                            active
                              ? "bg-[#059669] text-white"
                              : "text-white/75 hover:bg-white/10 hover:text-white",
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="mt-2 block rounded-xl bg-white px-3 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#111] transition-colors hover:bg-[#059669] hover:text-white"
                  >
                    Let&apos;s talk
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}
