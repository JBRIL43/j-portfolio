"use client";

import { useState, useEffect, useCallback, useRef, Children } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ExternalLink,
  X,
  Maximize2,
  ChevronRight,
  GraduationCap,
  FolderGit2,
  Wrench,
  Award,
  Globe,
  Compass,
  Route,
  Send,
  Github,
  Linkedin,
  Mail,
  Users,
} from "lucide-react";
import { AmbientGlow } from "./ambient-glow";
import { IOSDock } from "./mac-dock";
import { DynamicIsland } from "./dynamic-island";
import { useReducedMotion } from "./use-reduced-motion";
import { cn } from "@/lib/utils";
import { skillCategories } from "@/lib/data/skills";
import { journey } from "@/lib/data/journey";
import { awards } from "@/lib/data/awards";
import { socials, visionStats } from "@/lib/data/socials";
import { leadershipStats } from "@/lib/data/leadership";

// ──────────────────────────────────────────────
// Types + Data
// ──────────────────────────────────────────────

type ProjectData = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  type: "project";
  modal: {
    description: string;
    details: { label: string; value: string }[];
    links?: { label: string; href: string; external?: boolean }[];
  };
};

const PROJECTS: ProjectData[] = [
  {
    id: "pcic",
    title: "PCIC",
    subtitle: "Management System",
    image: "/projects/pcic-dashboard.png",
    type: "project",
    modal: {
      description: "The operating system for Peak Craft — a full management system with role-based dashboard, event + attendance tracking, member management, decisions, compliance, and career modules.",
      details: [
        { label: "Status", value: "Live" },
        { label: "Stack", value: "Next.js · React · Tailwind · Node.js · MongoDB" },
        { label: "Members", value: "27+" },
        { label: "Active rate", value: "81%" },
      ],
      links: [
        { label: "Live Site", href: "https://pcic.tech", external: true },
        { label: "Case Study", href: "/projects" },
      ],
    },
  },
  {
    id: "debt",
    title: "HU Debt",
    subtitle: "Student Platform",
    image: "/projects/debt-admin-dashboard.png",
    type: "project",
    modal: {
      description: "A cost-sharing debt platform for Hawassa University — web admin + Flutter student app. Digitized the entire cost-sharing lifecycle.",
      details: [
        { label: "Surfaces", value: "3 (Admin + App + API)" },
        { label: "Stack", value: "React · Flutter · Node.js · MongoDB" },
        { label: "Regulation", value: "No. 447/2024" },
        { label: "Payments", value: "Chapa + receipts" },
      ],
      links: [
        { label: "GitHub", href: "https://github.com/JBRIL43", external: true },
        { label: "Case Study", href: "/projects" },
      ],
    },
  },
  {
    id: "library",
    title: "LibraryHub",
    subtitle: "Bookstore",
    image: "/projects/libraryhub-hero.png",
    type: "project",
    modal: {
      description: "A fully static, multi-page bookstore web app. 32-book catalog, dual buy/rent pricing, search + genre filtering, shopping cart, and client-side auth.",
      details: [
        { label: "Books", value: "32" },
        { label: "Model", value: "Buy or Rent" },
        { label: "Stack", value: "HTML5 · CSS3 · JS (ES6)" },
        { label: "Hosting", value: "GitHub Pages" },
      ],
      links: [
        { label: "Live Site", href: "https://jbril43.github.io/bookstore/", external: true },
        { label: "GitHub", href: "https://github.com/JBRIL43/bookstore", external: true },
      ],
    },
  },
  {
    id: "inventory",
    title: "Stock Mgmt",
    subtitle: "Inventory System",
    image: "/projects/inventory-dashboard.png",
    type: "project",
    modal: {
      description: "A full inventory platform with role-based admin dashboard: real-time metrics, searchable stock-balance table, exportable reports.",
      details: [
        { label: "Items", value: "37" },
        { label: "Revenue", value: "546,300" },
        { label: "Stack", value: "React · Node.js · MongoDB" },
        { label: "Features", value: "IN / OUT / Balance" },
      ],
      links: [
        { label: "GitHub", href: "https://github.com/JBRIL43/inventory_management", external: true },
        { label: "Case Study", href: "/projects" },
      ],
    },
  },
  {
    id: "fault",
    title: "Fault Report",
    subtitle: "IoT Campus App",
    image: "/projects/fault-report-form.png",
    type: "project",
    modal: {
      description: "A Flutter + Supabase app for Hawassa University's IoT campus — report faults with photos, GPS, and Twilio SMS alerts.",
      details: [
        { label: "Timeline", value: "9-week MVP" },
        { label: "Platform", value: "Cross-platform" },
        { label: "Stack", value: "Flutter · Supabase · Twilio" },
        { label: "Alerts", value: "SMS" },
      ],
      links: [
        { label: "GitHub", href: "https://github.com/JBRIL43/FaultReportingApp", external: true },
        { label: "Case Study", href: "/projects" },
      ],
    },
  },
  {
    id: "brand",
    title: "Peak Craft",
    subtitle: "Brand System",
    image: "/projects/peakcraft-emblem.png",
    type: "project",
    modal: {
      description: "Identity, voice, and guidelines for a tech community — crown, peaks, and a bold color system.",
      details: [
        { label: "Guidelines", value: "Full" },
        { label: "Adoption", value: "Org-wide" },
        { label: "Colors", value: "Blue · Orange · Gold" },
        { label: "Tools", value: "Figma" },
      ],
      links: [{ label: "Case Study", href: "/projects" }],
    },
  },
];

const CONTACTS = [
  { id: "github", label: "GitHub", sub: "JBRIL43", icon: Github, href: socials.github },
  { id: "linkedin", label: "LinkedIn", sub: "Jibril Nuredin", icon: Linkedin, href: socials.linkedin },
  { id: "email", label: "Email", sub: "jibirnur32@gmail.com", icon: Mail, href: socials.email },
  { id: "peakcraft", label: "Peak Craft", sub: "Tech Community", icon: Users, href: socials.pcic },
];

// ──────────────────────────────────────────────
// Preview Modal (Manga Panel Dialog) — project detail
// ──────────────────────────────────────────────

function PreviewModal({ project, onClose }: { project: ProjectData; onClose: () => void }) {
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const m = project.modal;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative flex flex-col rounded-xl overflow-hidden",
          "bg-[#fafaf8] border-[2.5px] border-[#111] shadow-[8px_8px_0_0_#111]",
          maximized ? "inset-4 sm:inset-8" : "w-full max-w-lg max-h-[85vh]"
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-[#111] bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="inline-block border-2 border-[#111] bg-[#111] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              PANEL // PROJECT
            </span>
            <span className="text-xs text-[#111] font-bold font-mono ml-1">{project.title}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMaximized((p) => !p)}
              className="size-5 border-2 border-[#111] bg-white hover:bg-black/5 flex items-center justify-center transition-colors"
              title="Maximize"
            >
              <Maximize2 className="size-2.5 text-[#111]" />
            </button>
            <button
              onClick={onClose}
              className="size-5 border-2 border-[#111] bg-[#ff5f57] hover:bg-[#ff4040] flex items-center justify-center transition-colors"
              title="Close"
            >
              <X className="size-3 text-[#111]" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {project.image && (
            <div className="relative aspect-video overflow-hidden border-2 border-[#111] rounded-lg shadow-[3px_3px_0_0_#111]">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div>
            <h3 className="text-lg font-bold text-[#111] tracking-tight">{project.title}</h3>
            {project.subtitle && (
              <p className="font-mono text-xs text-[#666] uppercase tracking-wider">{project.subtitle}</p>
            )}
          </div>

          {m?.description && (
            <div className="border-[2px] border-[#111] bg-white p-3.5 text-sm leading-relaxed text-[#333] italic shadow-[3px_3px_0_0_#111]">
              &ldquo;{m.description}&rdquo;
            </div>
          )}

          {m?.details && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#777] font-bold mb-2">Specifications</p>
              <div className="grid grid-cols-2 gap-2">
                {m.details.map((d) => (
                  <div key={d.label} className="rounded border border-[#111] bg-white px-3 py-2 shadow-[2px_2px_0_0_#111]">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-[#777] mb-0.5">{d.label}</p>
                    <p className="text-xs font-semibold text-[#111]">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {m?.links && m.links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {m.links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border-2 border-[#111] bg-[#111] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[3px_3px_0_0_#111] transition-all hover:bg-[#059669] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    {link.label} <ExternalLink className="size-3" />
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 border-2 border-[#111] bg-[#111] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[3px_3px_0_0_#111] transition-all hover:bg-[#059669] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    {link.label} <ChevronRight className="size-3" />
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Smart Stack widget: a fixed-size viewport showing ONE full card at a time.
// The user scrolls/swipes vertically to switch cards (iPhone-style) —
// snap-to-card, manual control only, never auto-rotates.
// ──────────────────────────────────────────────

function SmartStack({
  title, icon, moreHref, children, id, tall = false, onActive,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  moreHref: string;
  children: React.ReactNode;
  /** Section anchor id for the Dynamic Island scroll-spy. */
  id?: string;
  /** Hero stacks get a taller card viewport. */
  tall?: boolean;
  /** Report this stack as the widget the user is touching (island label). */
  onActive?: (title: string) => void;
}) {
  const Icon = icon;
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / el.clientHeight);
    setActive((prev) => (prev === idx ? prev : Math.min(idx, count - 1)));
    onActive?.(title);
  }, [count, onActive, title]);

  const goTo = useCallback(
    (i: number) => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollTo({ top: i * el.clientHeight, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );

  // The widget owns vertical scrolling: wheel deltas accumulate and, once they
  // express clear intent, the stack animates to exactly one neighbouring card.
  // Letting small deltas ride native scroll-snap makes the content lurch and
  // spring back ("dead wheel"), so we take the wheel and always ease.
  useEffect(() => {
    const el = scrollRef.current;
    const shell = shellRef.current;
    if (!el || !shell || count < 2) return;

    let acc = 0;
    let animating = false;
    let unlock: ReturnType<typeof setTimeout> | undefined;

    const settle = () => {
      animating = false;
      acc = 0;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 1) return;
      e.preventDefault(); // this widget owns the wheel; the page never scrolls
      if (animating) return; // ride out the in-flight ease, ignore momentum tail
      acc += e.deltaY;
      const threshold = el.clientHeight * 0.3;
      if (Math.abs(acc) < threshold) return;
      const dir = acc > 0 ? 1 : -1;
      acc = 0;
      const idx = Math.round(el.scrollTop / el.clientHeight);
      const next = Math.min(count - 1, Math.max(0, idx + dir));
      if (next === idx) return;
      animating = true;
      goTo(next);
      el.addEventListener("scrollend", settle, { once: true });
      unlock = setTimeout(settle, 420); // fallback if scrollend never fires
    };

    shell.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      shell.removeEventListener("wheel", onWheel);
      if (unlock) clearTimeout(unlock);
    };
  }, [count, goTo]);

  // Keyboard: same one-card easing as the wheel, plus Home/End.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const el = scrollRef.current;
      if (!el) return;
      const idx = Math.round(el.scrollTop / el.clientHeight);
      const map: Record<string, number> = {
        ArrowDown: idx + 1,
        ArrowRight: idx + 1,
        PageDown: idx + 1,
        ArrowUp: idx - 1,
        ArrowLeft: idx - 1,
        PageUp: idx - 1,
        Home: 0,
        End: count - 1,
      };
      const target = map[e.key];
      if (target === undefined) return;
      e.preventDefault();
      const next = Math.min(count - 1, Math.max(0, target));
      if (next !== idx) goTo(next);
    },
    [count, goTo],
  );

  return (
    <div id={id} ref={shellRef} data-stack={title} className="relative flex h-full min-h-0 flex-col">
      {/* Layered back plates — the Smart Stack depth cue */}
      <div aria-hidden className="absolute -bottom-1.5 left-2 right-2 h-6 rounded-2xl border-2 border-[#111]/50 bg-white" />
      <div aria-hidden className="absolute -bottom-2.5 left-4 right-4 h-6 rounded-2xl border-2 border-[#111]/25 bg-white" />

      <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border-2 border-[#111] bg-white shadow-[4px_4px_0_0_#111]">
        {/* Header: title + More */}
        <div className="flex shrink-0 items-center justify-between gap-1.5 border-b-2 border-[#111] bg-[#fafaf8] px-2 py-0.5 [@media(min-height:781px)]:px-2.5 [@media(min-height:781px)]:py-1.5">
          <div className="flex min-w-0 items-center gap-1.5 [@media(min-height:781px)]:gap-2">
            <div className="flex size-4 shrink-0 items-center justify-center rounded border-2 border-[#111] bg-[#059669] text-white [@media(min-height:781px)]:size-6 [@media(min-height:781px)]:rounded-lg">
              <Icon className="size-2.5 [@media(min-height:781px)]:size-3.5" />
            </div>
            <span className="truncate font-mono text-[9px] font-bold uppercase tracking-wider text-[#111] [@media(min-height:781px)]:text-[11px]">
              {title}
            </span>
          </div>
          <Link
            href={moreHref}
            className="flex h-4 shrink-0 items-center gap-0.5 rounded-full border-2 border-[#111] bg-white px-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#111] transition-colors hover:bg-[#059669] hover:text-white [@media(min-height:781px)]:h-6 [@media(min-height:781px)]:gap-1 [@media(min-height:781px)]:px-2.5 [@media(min-height:781px)]:text-[10px]"
          >
            More <ChevronRight className="size-2.5 [@media(min-height:781px)]:size-3" />
          </Link>
        </div>

        {/* One-card viewport: fills the leftover space in this widget's grid cell,
            each card is exactly one viewport tall, snaps card-to-card. */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onFocus={() => onActive?.(title)}
          onPointerDown={() => onActive?.(title)}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="region"
          aria-label={`${title} — one card at a time, scroll or swipe to switch`}
          className={cn(
            "min-h-0 flex-1 snap-y snap-mandatory snap-always overflow-y-auto overscroll-contain",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#059669]/60",
          )}
        >
          {Children.map(children, (child) => (
            <div
              className={cn(
                "h-full snap-start snap-always [&>*]:h-full",
                tall
                  ? "py-1.5 min-[781px]:py-3"
                  : "py-1 min-[781px]:py-2.5",
              )}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Card pager — shows position, tap to jump. Hidden for single-card stacks. */}
        {count > 1 && (
          <div className="pointer-events-auto absolute bottom-1.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#111]/15 bg-white/95 px-2 py-1 shadow-sm sm:bottom-2.5">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to card ${i + 1} of ${count}`}
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  i === active ? "scale-125 bg-[#059669]" : "bg-[#111]/20 hover:bg-[#111]/40",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Workspace dock — persistent macOS-style dock for the home workspace.
// (The global MacDock hides on "/" so the story intro stays clean.)
// ──────────────────────────────────────────────

function WorkspaceDock() {
  const [hovered, setHovered] = useState<string | null>(null);
  const items = [
    { id: "home", label: "Home", icon: Compass, href: "/" },
    { id: "journey", label: "Journey", icon: Route, href: "/journey" },
    { id: "projects", label: "Projects", icon: FolderGit2, href: "/projects" },
    { id: "skills", label: "Skills", icon: Wrench, href: "/skills" },
    { id: "awards", label: "Awards", icon: Award, href: "/awards" },
    { id: "contact", label: "Contact", icon: Globe, href: "/contact" },
    { id: "mail", label: "Mail", icon: Send, href: "mailto:jibirnur32@gmail.com" },
  ];

  return (
    <div className="pointer-events-auto fixed bottom-4 left-1/2 z-[100] -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-2xl border-[2.5px] border-[#111] bg-[#fafaf8] px-3 py-2 shadow-[5px_5px_0_0_#111]">
        {items.map((item) => {
          const Icon = item.icon;
          const active = hovered === item.id;
          return (
            <Link key={item.id} href={item.href}>
              <motion.div
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ y: -6, scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="relative flex flex-col items-center cursor-pointer"
              >
                <div
                  className={cn(
                    "flex items-center justify-center size-10 rounded-xl border-2 border-[#111] bg-white shadow-[2px_2px_0_0_#111] transition-colors",
                    active && "bg-[#059669] text-white",
                  )}
                >
                  <Icon className={cn("size-5", active ? "text-white" : "text-[#111]")} />
                </div>
                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="pointer-events-none absolute -top-9 whitespace-nowrap rounded border-2 border-[#111] bg-[#111] px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-[2px_2px_0_0_#111]"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setIsMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return isMobile;
}

// ──────────────────────────────────────────────
// Main Export — Smart Stack workspace (Mac + iPhone)
// ──────────────────────────────────────────────

export function MacDesktop() {
  const [activeModal, setActiveModal] = useState<ProjectData | null>(null);
  const openModal = useCallback((p: ProjectData) => setActiveModal(p), []);
  const closeModal = useCallback(() => setActiveModal(null), []);
  const isMobile = useIsMobile();
  // The page never scrolls, so the island mirrors the widget in focus.
  const [activeStack, setActiveStack] = useState("About · Journey");

  return (
    <div className="grid-bg relative h-[100dvh] w-full overflow-hidden bg-[#fafaf8]">
      <AmbientGlow color="bg-[#059669]/8" size="size-[34rem]" top="top-1/4" />

      {/* Dynamic Island — fixed at top */}
      <DynamicIsland label={activeStack} className="fixed left-0 right-0 top-7 z-50 [@media(min-height:781px)]:top-14" />

      {/* The desktop itself: one screen, no page scroll. Rows are fr units, so
          every widget gets a share of the real leftover height (island + dock
          reserved via padding). Mobile recomposes to a 2-column home screen. */}
      <div className="relative z-10 mx-auto grid h-full min-h-0 w-full max-w-6xl grid-cols-2 grid-rows-[1fr_1fr_1fr] gap-2 overflow-hidden px-2 pt-[4.25rem] pb-[4.75rem] sm:px-6 [@media(min-height:781px)]:grid-rows-[1.15fr_1fr_1fr] [@media(min-height:781px)]:gap-3 [@media(min-height:781px)]:pt-20 [@media(min-height:781px)]:pb-20">
          {/* ── Section 1: About + My Journey — full-width 2×4 Smart Stack ── */}
          <div id="sec-about" className="col-span-2 min-h-0">
          <SmartStack title="About · My Journey" icon={Compass} moreHref="/journey" tall onActive={setActiveStack}>
            {/* Card 1 — About Me */}
            <div className="flex flex-col justify-center overflow-hidden rounded-2xl border-2 border-[#111] bg-[#fafaf8] p-2.5 [@media(min-height:781px)]:p-5 [@media(max-height:780px)]:gap-1 shadow-[3px_3px_0_0_#111]">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#059669]">
                01 · About Me
              </p>
              <h3 className="mt-1 [@media(min-height:781px)]:text-3xl [@media(max-height:780px)]:text-xl font-[family-name:var(--font-story)] text-2xl text-[#111]">
                Jibril Nuredin
              </h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#666] sm:text-xs">
                Web Developer · Designer · Community Builder
              </p>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#333] [@media(max-height:780px)]:hidden">
                Information Systems student at Hawassa University, transforming ideas into
                impactful digital products and communities across Africa — from full management
                systems to campus apps.
              </p>
            </div>

            {/* Card 2 — My Journey */}
            <div className="flex flex-col justify-center overflow-hidden rounded-2xl border-2 border-[#111] bg-[#fafaf8] p-3 shadow-[3px_3px_0_0_#111] sm:p-5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#059669]">
                02 · My Journey
              </p>
              <h3 className="mt-1.5 text-sm font-bold text-[#111] sm:text-base">
                From a first PC to a builder — 2022 → today
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#333] [@media(max-height:780px)]:hidden">
                {journey[0]?.description}
              </p>
            </div>

            {/* Card 3 — Education */}
            <div className="flex flex-col justify-center overflow-hidden rounded-2xl border-2 border-[#111] bg-[#fafaf8] p-3 shadow-[3px_3px_0_0_#111] sm:p-5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#059669]">
                03 · Education
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#111] bg-white">
                  <GraduationCap className="size-4 text-[#111]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111]">Hawassa University</h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#666]">
                    BSc Information Systems
                  </p>
                </div>
              </div>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#333] [@media(max-height:780px)]:hidden">
                {journey[1]?.description}
              </p>
            </div>

            {/* Card 4 — Experience */}
            <div className="flex flex-col justify-center overflow-hidden rounded-2xl border-2 border-[#111] bg-[#fafaf8] p-3 shadow-[3px_3px_0_0_#111] sm:p-5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#059669]">
                04 · Experience
              </p>
              <h3 className="mt-1 [@media(max-height:700px)]:text-[11px] [@media(min-height:781px)]:text-base [@media(max-height:780px)]:text-xs text-sm font-bold text-[#111]">
                Head of Public Relations · Peak Craft
              </h3>
              <div className="mt-1.5 grid grid-cols-4 gap-1 [@media(min-height:781px)]:gap-2">
                {leadershipStats.map((s) => (
                  <div key={s.label} className="rounded-lg border-2 border-[#111] bg-white px-1.5 [@media(max-height:780px)]:py-0.5 py-1.5 [@media(min-height:1001px)]:px-2.5">
                    <p className="[@media(max-height:700px)]:hidden font-mono text-[7px] uppercase tracking-wider text-[#777] [@media(min-height:1001px)]:text-[8px]">{s.label}</p>
                    <p className="text-[10px] font-bold text-[#111] [@media(min-height:1001px)]:text-xs">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 5 — Milestones */}
            <div className="flex flex-col justify-center overflow-hidden rounded-2xl border-2 border-[#111] bg-[#fafaf8] p-3 shadow-[3px_3px_0_0_#111] sm:p-5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#059669]">
                05 · Milestones
              </p>
              <div className="mt-1 [@media(max-height:780px)]:space-y-0.5 space-y-1.5 [@media(min-height:1000px)]:space-y-2 [&>*:nth-child(n+4)]:[@media(max-height:780px)]:hidden">
                {journey.slice(0, 4).map((j) => (
                  <div key={`${j.year}-${j.title}`} className="border-l-2 border-[#111] pl-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] font-bold uppercase text-[#059669]">{j.year}</span>
                      <p className="truncate text-[10px] font-bold text-[#111] [@media(min-height:1000px)]:text-xs">{j.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 6 — Goals */}
            <div className="flex flex-col justify-center overflow-hidden rounded-2xl border-2 border-[#111] bg-[#fafaf8] p-3 shadow-[3px_3px_0_0_#111] sm:p-5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#059669]">
                06 · Goals
              </p>
              <div className="mt-1 [@media(max-height:780px)]:space-y-0.5 space-y-1.5">
                {visionStats.map((s) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <span className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-wider text-[#111]">
                      {s.label}
                    </span>
                    <span className="text-[10px] text-[#333] [@media(min-height:1000px)]:text-xs">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </SmartStack>
          </div>

          {/* ── Section 2: Projects + Skills — 2×2 Smart Stacks ── */}
          <div id="sec-projects" className="col-span-2 grid min-h-0 grid-cols-2 grid-rows-[minmax(0,1fr)] gap-2 sm:gap-4">
          {/* Projects — one project per card, vertical layout (image fills top) */}
          <SmartStack title="Projects" icon={FolderGit2} moreHref="/projects" onActive={setActiveStack}>
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => openModal(p)}
                className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-[#111] bg-white shadow-[3px_3px_0_0_#111] transition-transform hover:scale-[1.01] hover:shadow-[4px_4px_0_0_#111]"
              >
                {p.image && (
                  <div className="relative aspect-video w-full flex-1 overflow-hidden border-b-2 border-[#111]">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="flex flex-col items-start gap-0.5 p-2 text-left [@media(min-height:781px)]:gap-1 [@media(min-height:781px)]:p-3">
                  <p className="text-xs font-bold text-[#111] [@media(min-height:781px)]:text-sm">{p.title}</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[#666] [@media(min-height:781px)]:text-[10px]">{p.subtitle}</p>
                </div>
              </button>
            ))}
          </SmartStack>

          {/* Skills — one category per card (Frontend ↓ Backend ↓ Programming ↓ Tools) */}
          <SmartStack title="Skills" icon={Wrench} moreHref="/skills" onActive={setActiveStack}>
            {skillCategories.map((cat) => (
              <div
                key={cat.id}
                className="flex h-full flex-col justify-center gap-1.5 overflow-hidden rounded-2xl border-2 border-[#111] bg-white p-2.5 shadow-[3px_3px_0_0_#111] [@media(min-height:781px)]:gap-2.5 [@media(min-height:781px)]:p-3.5"
              >
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-[#111] sm:text-sm">{cat.label}</h3>
                  <p className="mt-0.5 hidden text-[11px] leading-snug text-[#666] [@media(min-height:1200px)]:block">{cat.description}</p>
                </div>
                <div className="space-y-0.5 [@media(min-height:1000px)]:space-y-0.5 [@media(max-height:1000px)]:[&>*:nth-child(n+5)]:hidden [&>*:nth-child(n+4)]:[@media(max-height:780px)]:hidden">
                  {cat.skills.map((s) => (
                    <div key={s.name} className="[@media(max-height:700px)]:space-y-0 space-y-0.5 [@media(min-height:1000px)]:space-y-1">
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="truncate text-[10px] font-bold leading-tight text-[#111] [@media(max-height:700px)]:text-[9px] [@media(min-height:1000px)]:text-xs">{s.name}</span>
                        <span className="font-mono text-[9px] font-bold text-[#059669] sm:text-[10px]">{s.level}%</span>
                      </div>
                      <div className="h-1 [@media(min-height:1000px)]:h-1.5 overflow-hidden rounded-full border border-[#111] bg-white">
                        <div
                          className="h-full bg-[#059669]"
                          style={{ width: `${s.level}%` }}
                          aria-label={`${s.level}% proficiency`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </SmartStack>
          </div>

          {/* ── Section 3: Awards + Contact — 2×2 Smart Stacks ── */}
          <div id="sec-awards" className="col-span-2 grid min-h-0 grid-cols-2 grid-rows-[minmax(0,1fr)] gap-2 sm:gap-4">
          {/* Awards — one award per card */}
          <SmartStack title="Awards" icon={Award} moreHref="/awards" onActive={setActiveStack}>
            {awards.slice(0, 5).map((a) => (
              <Link
                key={a.id}
                href="/awards"
                className="flex h-full flex-col justify-center [@media(max-height:780px)]:gap-1 gap-2 overflow-hidden rounded-2xl border-2 border-[#111] bg-white p-2 [@media(max-height:780px)]:p-1.5 shadow-[3px_3px_0_0_#111] transition-transform hover:scale-[1.01] hover:shadow-[4px_4px_0_0_#111] [@media(min-height:781px)]:gap-2.5 [@media(min-height:781px)]:p-4"
              >
                <div className="flex [@media(max-height:780px)]:size-8 size-10 items-center justify-center rounded-xl border-2 border-[#111] bg-[#fafaf8] [@media(min-height:781px)]:size-12">
                  <a.icon className="[@media(max-height:780px)]:size-4 size-5 text-[#111] [@media(min-height:781px)]:size-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#111] sm:text-sm">{a.title}</p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-[#666] sm:text-[10px]">
                    {a.issuer} · {a.year}
                  </p>
                  {a.description && (
                    <p className="mt-1.5 hidden text-xs leading-relaxed text-[#333] sm:line-clamp-2 sm:block [@media(max-height:780px)]:hidden!">{a.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </SmartStack>

          {/* Contact — one card, all four channels + CTA.
              Two modes only: compact 2x2 rows (the default, fits any widget height)
              and a roomy single-column list on very tall screens. */}
          <SmartStack title="Contact" icon={Globe} moreHref="/contact" onActive={setActiveStack}>
            <div className="flex h-full flex-col justify-center gap-1.5 overflow-hidden rounded-2xl border-2 border-[#111] bg-white p-2 shadow-[3px_3px_0_0_#111] [@media(min-height:1200px)]:gap-2.5 [@media(min-height:1200px)]:p-3.5">
              <div className="grid grid-cols-2 gap-1.5 [@media(min-height:1200px)]:grid-cols-1 [@media(min-height:1200px)]:gap-2.5">
                {CONTACTS.map((c) => (
                  <a
                    key={c.id}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border-2 border-[#111] bg-[#fafaf8] p-1 transition-all hover:bg-white [@media(min-height:1200px)]:gap-2.5 [@media(min-height:1200px)]:p-2.5"
                  >
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-md border-2 border-[#111] bg-white [@media(min-height:1200px)]:size-8 [@media(min-height:1200px)]:rounded-lg">
                      <c.icon className="size-2.5 text-[#111] [@media(min-height:1200px)]:size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-bold text-[#111] [@media(min-height:1200px)]:text-xs">{c.label}</p>
                      <p className="hidden truncate font-mono text-[9px] uppercase tracking-wider text-[#666] [@media(min-height:1200px)]:block">{c.sub}</p>
                    </div>
                    <ExternalLink className="hidden size-3 shrink-0 text-[#111]/40 [@media(min-height:1200px)]:block" />
                  </a>
                ))}
              </div>
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-1 rounded-lg border-2 border-[#111] bg-[#059669] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white shadow-[2px_2px_0_0_#111] transition-all hover:bg-[#047857] [@media(min-height:1200px)]:gap-1.5 [@media(min-height:1200px)]:px-3 [@media(min-height:1200px)]:py-2.5 [@media(min-height:1200px)]:text-[10px]"
              >
                Say hi <ChevronRight className="size-3 [@media(min-height:1200px)]:size-3.5" />
              </Link>
            </div>
          </SmartStack>
          </div>
      </div>

      {/* Dock: iOS dock on iPhone, macOS dock on desktop (both already have fixed positioning) */}
      {isMobile ? <IOSDock /> : <WorkspaceDock />}

      {/* Preview Modal */}
      <AnimatePresence>
        {activeModal && <PreviewModal project={activeModal} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}
