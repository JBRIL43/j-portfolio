"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, Terminal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useScrolled } from "./use-scrolled";
import { useReducedMotion } from "./use-reduced-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        description: "Where I’m taking the work next.",
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
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Scroll progress indicator
  useEffect(() => {
    if (reduce || !progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, [reduce]);

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
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
          <div
            ref={progressRef}
            className="origin-left scale-x-0 h-full bg-gradient-to-r from-[oklch(0.62_0.2_255)] via-[oklch(0.78_0.16_220)] to-[oklch(0.72_0.16_200)]"
          />
        </div>

        <nav
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5",
            scrolled
              ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
              : "border border-transparent bg-transparent",
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Go to home"
          >
            <span className="relative grid size-8 place-items-center rounded-lg glass">
              <span className="text-[13px] font-semibold text-gradient-blue">
                JB
              </span>
              <span className="absolute inset-0 rounded-lg ring-1 ring-[oklch(0.62_0.2_255/0.3)] opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-foreground/90 sm:block">
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
                      "relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
                      groupActive || activeGroup === group.label
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-expanded={activeGroup === group.label}
                  >
                    {(groupActive || activeGroup === group.label) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-white/8 ring-1 ring-white/10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
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
                        className="absolute left-0 top-full z-50 mt-3 w-72 rounded-2xl border border-white/10 bg-[oklch(0.1_0.008_264)] p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl"
                      >
                        {group.items.map((item) => {
                          const active = isActive(item.href);
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveGroup(null)}
                              className={cn(
                                "block rounded-xl px-4 py-3 transition-colors hover:bg-white/6",
                                active && "bg-white/6",
                              )}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-medium text-foreground">
                                  {item.label}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
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
              className="hidden rounded-lg bg-[oklch(0.62_0.2_255)] px-4 py-1.5 text-sm font-medium text-white shadow-[0_0_24px_-6px_oklch(0.62_0.2_255)] transition-all hover:shadow-[0_0_32px_-4px_oklch(0.62_0.2_255)] hover:brightness-110 sm:inline-flex"
            >
              Let&apos;s talk
            </Link>
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
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 overflow-y-auto border-l border-white/10 bg-[oklch(0.09_0.008_264)] p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {activeDropdownItem?.label ?? "Menu"}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid size-9 place-items-center rounded-lg glass"
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
                      className="rounded-2xl border border-white/8 bg-white/3 p-2"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setMobileGroup((current) =>
                            current === group.label ? null : group.label,
                          )
                        }
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-white/5"
                        aria-expanded={expanded}
                      >
                        <span>{group.label}</span>
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
                                      "block rounded-xl px-3 py-3 transition-colors hover:bg-white/6",
                                      active
                                        ? "bg-white/6 text-foreground"
                                        : "text-foreground/90",
                                    )}
                                  >
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="font-medium">
                                        {item.label}
                                      </span>
                                      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
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
                className="mt-4 rounded-xl bg-[oklch(0.62_0.2_255)] px-4 py-3 text-center text-sm font-medium text-white"
              >
                Let&apos;s talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
