"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./use-active-section";
import { useScrolled } from "./use-scrolled";

export function Navbar() {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navItems.map((n) => n.href.replace("#", "")));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5",
            scrolled
              ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
              : "border border-transparent bg-transparent"
          )}
        >
          <button
            onClick={() => handleNav("#hero")}
            className="group flex items-center gap-2.5"
            aria-label="Go to top"
          >
            <span className="relative grid size-8 place-items-center rounded-lg glass">
              <span className="text-[13px] font-semibold text-gradient-blue">
                JN
              </span>
              <span className="absolute inset-0 rounded-lg ring-1 ring-[oklch(0.62_0.2_255/0.3)] opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-foreground/90 sm:block">
              Jibril Nuredin
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={cn(
                    "relative rounded-lg px-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/8 ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav("#contact")}
              className="hidden rounded-lg bg-[oklch(0.62_0.2_255)] px-4 py-1.5 text-sm font-medium text-white shadow-[0_0_24px_-6px_oklch(0.62_0.2_255)] transition-all hover:shadow-[0_0_32px_-4px_oklch(0.62_0.2_255)] hover:brightness-110 sm:inline-flex"
            >
              Let&apos;s talk
            </button>
            <button
              onClick={() => setOpen(true)}
              className="grid size-9 place-items-center rounded-lg glass lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 border-l border-white/10 bg-[oklch(0.09_0.008_264)] p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid size-9 place-items-center rounded-lg glass"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  onClick={() => handleNav(item.href)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-lg font-medium text-foreground/90 transition-colors hover:bg-white/5"
                >
                  {item.label}
                  <span className="text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                </motion.button>
              ))}
              <button
                onClick={() => handleNav("#contact")}
                className="mt-4 rounded-xl bg-[oklch(0.62_0.2_255)] px-4 py-3 text-center text-sm font-medium text-white"
              >
                Let&apos;s talk
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
