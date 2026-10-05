"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, Terminal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./use-reduced-motion";

type NavGroup = {
  label: string;
  items: { label: string; href: string; description: string }[];
};

const navGroups: NavGroup[] = [
  {
    label: "About",
    items: [
      {
        label: "Journey",
        href: "/journey",
        description: "The path from first PC to graduation.",
      },
      {
        label: "Skills",
        href: "/skills",
        description: "The stack, tools, and systems I use.",
      },
      {
        label: "Vision",
        href: "/vision",
        description: "Where I'm taking the work next.",
      },
    ],
  },
  {
    label: "Work",
    items: [
      {
        label: "Work",
        href: "/work",
        description: "The disciplines I bring to client and team work.",
      },
      {
        label: "Projects",
        href: "/projects",
        description: "Featured products and shipped systems.",
      },
      {
        label: "Peak Craft",
        href: "/peak-craft",
        description: "Leadership and impact inside the community.",
      },
    ],
  },
  {
    label: "More",
    items: [
      {
        label: "Beyond",
        href: "/beyond",
        description: "Fitness, faith, reading, and the habits behind the work.",
      },
      {
        label: "Awards & Certifications",
        href: "/awards",
        description: "Recognition and credentials earned along the way.",
      },
    ],
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const activeDropdownItem = navGroups
    .flatMap((group) => group.items)
    .find((item) => isActive(item.href));

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
      >
        {/* Manga Navigation Bar - Always Solid */}
        <nav className="flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-5 manga-panel-sm border-2 border-[#111] bg-white shadow-[4px_4px_0_0_#111]">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Go to home"
          >
            <span className="relative grid size-9 place-items-center rounded-lg manga-panel-sm bg-white">
              <span className="text-[14px] font-mono font-bold text-[#111]">
                J.
              </span>
              <span className="absolute inset-0 rounded-lg ring-1 ring-[#059669]/40 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <span className="hidden text-sm font-mono font-medium tracking-tight text-foreground/90 sm:block">
              Jibril Nuredin
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navGroups.map((group) => {
              const groupActive = group.items.some((item) =>
                isActive(item.href),
              );
              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setActiveGroup(group.label)}
                  onMouseLeave={() => setActiveGroup(null)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveGroup((current) =>
                        current === group.label ? null : group.label,
                      )
                    }
                    className={cn(
                      "relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-mono text-xs transition-colors",
                      groupActive || activeGroup === group.label
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-expanded={activeGroup === group.label}
                  >
                    <span className="relative">{group.label}</span>
                    <ChevronDown
                      className={cn(
                        "relative size-4 transition-transform duration-200",
                        activeGroup === group.label && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {activeGroup === group.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full z-50 mt-3 w-72 rounded-xl border-2 border-[#111] bg-white p-2 shadow-[4px_4px_0_0_#111]"
                      >
                        {group.items.map((item) => {
                          const active = isActive(item.href);
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveGroup(null)}
                              className={cn(
                                "block rounded-lg px-4 py-3 transition-colors hover:bg-black/[0.06]",
                                active && "bg-black/[0.06]",
                              )}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-medium text-foreground">
                                  {item.label}
                                </span>
                                <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
                                  {group.label}
                                </span>
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-lg bg-[#111] px-4 py-2 text-sm font-mono font-medium text-white transition-all hover:bg-[#059669] sm:inline-flex"
            >
              Let's talk
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-lg manga-panel-sm lg:hidden"
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
            className="fixed inset-0 z-60 lg:hidden"
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
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 overflow-y-auto border-l-2 border-[#111] bg-white p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">
                  {activeDropdownItem?.label ?? "Menu"}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid size-9 place-items-center rounded-lg manga-panel-sm"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="space-y-3">
                {navGroups.map((group, groupIndex) => {
                  const expanded = mobileGroup === group.label;
                  return (
                    <motion.div
                      key={group.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + groupIndex * 0.06 }}
                      className="rounded-xl border border-black/15 bg-black/[0.03] p-2"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setMobileGroup((current) =>
                            current === group.label ? null : group.label,
                          )
                        }
                        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-black/5"
                        aria-expanded={expanded}
                      >
                        <span className="font-mono text-sm">{group.label}</span>
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200",
                            expanded && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1 px-2 pb-2 pt-1">
                              {group.items.map((item) => {
                                const active = isActive(item.href);
                                return (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                      "block rounded-lg px-3 py-3 transition-colors hover:bg-black/5",
                                      active
                                        ? "bg-black/5 text-foreground"
                                        : "text-foreground/90",
                                    )}
                                  >
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="font-medium">{item.label}</span>
                                      <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
                                        {group.label}
                                      </span>
                                    </div>
                                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                      {item.description}
                                    </p>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-lg bg-[#111] px-4 py-3 text-center text-sm font-mono font-medium text-white transition-colors hover:bg-[#059669]"
              >
                Let's talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}