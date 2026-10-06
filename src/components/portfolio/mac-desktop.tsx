"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Palette,
  Database,
  Terminal,
  FolderGit2,
  Award,
  Compass,
  Send,
  X,
  Maximize2,
  Minus,
  Users,
  Megaphone,
  Wrench,
  Globe,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

type CardData = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  width: number;
  height?: number;
  type: "project" | "skill" | "social" | "fun";
  href?: string;
  modal?: {
    description: string;
    details: { label: string; value: string }[];
    links?: { label: string; href: string; external?: boolean }[];
  };
};

type CardPos = { x: number; y: number };

// ──────────────────────────────────────────────
// Organized layout positions (px/%)
// ──────────────────────────────────────────────

function computeDefaultPositions(): Record<string, CardPos> {
  return {
    // ── Left Side: Projects (macOS desktop files column) ──
    pcic:      { x: 3,  y: 8 },
    debt:      { x: 3,  y: 28 },
    library:   { x: 3,  y: 48 },
    inventory: { x: 3,  y: 68 },
    fault:     { x: 13, y: 8 },
    brand:     { x: 13, y: 28 },
    // ── Right Side: Skills & Social (macOS widgets / files column) ──
    react:     { x: 86, y: 8 },
    nextjs:    { x: 86, y: 24 },
    figma:     { x: 86, y: 40 },
    nodejs:    { x: 86, y: 56 },
    linux:     { x: 86, y: 72 },
    github:    { x: 76, y: 8 },
    linkedin:  { x: 76, y: 24 },
    email:     { x: 76, y: 40 },
    peakcraft: { x: 76, y: 56 },
    awards:    { x: 76, y: 72 },
  };
}

const DEFAULT_POSITIONS = computeDefaultPositions();

const CARDS: CardData[] = [
  // ── Projects ──
  {
    id: "pcic",
    title: "PCIC",
    subtitle: "Management System",
    image: "/projects/pcic-dashboard.png",
    color: "#111111",
    width: 135,
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
    color: "#111111",
    width: 135,
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
    color: "#111111",
    width: 130,
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
    color: "#111111",
    width: 130,
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
    color: "#111111",
    width: 130,
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
    color: "#111111",
    width: 130,
    type: "project",
    modal: {
      description: "Identity, voice, and guidelines for a tech community — crown, peaks, and a bold color system.",
      details: [
        { label: "Guidelines", value: "Full" },
        { label: "Adoption", value: "Org-wide" },
        { label: "Colors", value: "Blue · Orange · Gold" },
        { label: "Tools", value: "Figma" },
      ],
      links: [
        { label: "Case Study", href: "/projects" },
      ],
    },
  },

  // ── Skills ──
  {
    id: "react",
    title: "React",
    icon: Code2,
    color: "#111111",
    width: 95,
    type: "skill",
    modal: {
      description: "A JavaScript library for building user interfaces. Used across all major projects.",
      details: [
        { label: "Category", value: "Frontend" },
        { label: "Experience", value: "2+ years" },
        { label: "Used in", value: "PCIC, Portfolio" },
        { label: "Level", value: "Advanced" },
      ],
      links: [{ label: "All Skills", href: "/skills" }],
    },
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: Code2,
    color: "#111111",
    width: 95,
    type: "skill",
    modal: {
      description: "The React framework for production. SSR, API routes, and optimized performance.",
      details: [
        { label: "Category", value: "Full-Stack" },
        { label: "Experience", value: "2+ years" },
        { label: "Used in", value: "Portfolio, PCIC" },
        { label: "Level", value: "Advanced" },
      ],
      links: [{ label: "All Skills", href: "/skills" }],
    },
  },
  {
    id: "figma",
    title: "Figma",
    icon: Palette,
    color: "#111111",
    width: 95,
    type: "skill",
    modal: {
      description: "Collaborative interface design tool. Used for Peak Craft brand and UI mockups.",
      details: [
        { label: "Category", value: "Design" },
        { label: "Experience", value: "2+ years" },
        { label: "Used in", value: "Peak Craft, Portfolio" },
        { label: "Level", value: "Advanced" },
      ],
      links: [{ label: "All Skills", href: "/skills" }],
    },
  },
  {
    id: "nodejs",
    title: "Node.js",
    icon: Database,
    color: "#111111",
    width: 95,
    type: "skill",
    modal: {
      description: "JavaScript runtime for server-side development. Powers backend APIs.",
      details: [
        { label: "Category", value: "Backend" },
        { label: "Experience", value: "2+ years" },
        { label: "Used in", value: "PCIC API, HU Debt" },
        { label: "Level", value: "Advanced" },
      ],
      links: [{ label: "All Skills", href: "/skills" }],
    },
  },
  {
    id: "linux",
    title: "Linux",
    icon: Terminal,
    color: "#111111",
    width: 95,
    type: "skill",
    modal: {
      description: "Unix-based OS and command line. Daily driver for development.",
      details: [
        { label: "Category", value: "Tools" },
        { label: "Experience", value: "2+ years" },
        { label: "Used in", value: "Daily workflow" },
        { label: "Level", value: "Advanced" },
      ],
      links: [{ label: "All Skills", href: "/skills" }],
    },
  },

  // ── Social + Fun ──
  { id: "github", title: "GitHub", subtitle: "JBRIL43", icon: Github, color: "#111111", width: 105, type: "social", href: "https://github.com/JBRIL43" },
  { id: "linkedin", title: "LinkedIn", subtitle: "Jibril Nuredin", icon: Linkedin, color: "#111111", width: 105, type: "social", href: "https://www.linkedin.com/in/jibril-nuredin" },
  { id: "email", title: "Email", subtitle: "jibirnur32@gmail.com", icon: Mail, color: "#111111", width: 125, type: "social", href: "mailto:jibirnur32@gmail.com" },
  { id: "peakcraft", title: "Peak Craft", subtitle: "Tech Community", icon: Users, color: "#111111", width: 115, type: "fun", href: "https://pcic.tech" },
  { id: "awards", title: "Awards", subtitle: "16 Certs", icon: Award, color: "#111111", width: 105, type: "fun", href: "/awards" },
];

const POS_KEY = "desktop-positions-manga-v1";

function loadPositions(): Record<string, CardPos> {
  if (typeof window === "undefined") return DEFAULT_POSITIONS;
  try {
    const raw = localStorage.getItem(POS_KEY);
    if (raw) {
      const stored = JSON.parse(raw) as Record<string, CardPos>;
      return { ...DEFAULT_POSITIONS, ...stored };
    }
  } catch {}
  return DEFAULT_POSITIONS;
}

function savePositions(pos: Record<string, CardPos>) {
  try { localStorage.setItem(POS_KEY, JSON.stringify(pos)); } catch {}
}

function clampPct(x: number, y: number, cardW: number): CardPos {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const maxX = ((vw - cardW) / vw) * 100;
  const maxY = ((vh - 140) / vh) * 100;
  return {
    x: Math.max(0, Math.min(maxX, x)),
    y: Math.max(5, Math.min(maxY, y)),
  };
}

// ──────────────────────────────────────────────
// Manga Halftone / Screentone Canvas
// ──────────────────────────────────────────────

function MangaScreenToneBg() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0;

    const draw = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Halftone dot pattern
      const spacing = 28;
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      for (let x = 0; x < w; x += spacing) {
        for (let y = 0; y < h; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Subtle speedlines at bottom-right corner
      ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 16; i++) {
        ctx.beginPath();
        ctx.moveTo(w, h);
        ctx.lineTo(w - 300 - i * 40, h - 200 - i * 20);
        ctx.stroke();
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 z-0 pointer-events-none" />;
}

// ──────────────────────────────────────────────
// Mac-style Menu Bar Clock (top right)
// ──────────────────────────────────────────────

function MenuBarClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return null;

  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const date = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tabular-nums text-[#111]">
      <span className="hidden sm:inline">{day}</span>
      <span>{date}</span>
      <span className="text-[#111]/40">|</span>
      <span>{time}</span>
    </div>
  );
}

// ──────────────────────────────────────────────
// Preview Modal (Manga Panel Dialog)
// ──────────────────────────────────────────────

function PreviewModal({ card, onClose }: { card: CardData; onClose: () => void }) {
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const m = card.modal;

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
              PANEL // {card.type.toUpperCase()}
            </span>
            <span className="text-xs text-[#111] font-bold font-mono ml-1">{card.title}</span>
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
          {card.image && (
            <div className="relative aspect-video overflow-hidden border-2 border-[#111] rounded-lg shadow-[3px_3px_0_0_#111]">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center gap-3">
            {card.icon && (
              <div className="flex items-center justify-center size-10 rounded-lg border-2 border-[#111] bg-white shadow-[2px_2px_0_0_#111] shrink-0">
                <card.icon className="size-5 text-[#111]" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-[#111] tracking-tight">{card.title}</h3>
              {card.subtitle && (
                <p className="font-mono text-xs text-[#666] uppercase tracking-wider">{card.subtitle}</p>
              )}
            </div>
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
                    className="inline-flex items-center gap-1.5 border-2 border-[#111] bg-[#111] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[3px_3px_0_0_#111] transition-all hover:bg-[#059669] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
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
// Draggable Desktop Card (Manga Panel)
// ──────────────────────────────────────────────

const DRAG_THRESHOLD = 6;

function DesktopCard({
  card, position, onDrop, onOpen, topZ, bringToFront,
}: {
  card: CardData;
  position: CardPos;
  onDrop: (id: string, pos: CardPos) => void;
  onOpen: (card: CardData) => void;
  topZ: number;
  bringToFront: (id: string) => void;
}) {
  const didDrag = useRef(false);
  const startXY = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    bringToFront(card.id);
    startXY.current = { x: e.clientX, y: e.clientY };
    didDrag.current = false;
  }, [card.id, bringToFront]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const dx = e.clientX - startXY.current.x;
    const dy = e.clientY - startXY.current.y;
    if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
      didDrag.current = true;
    }
  }, []);

  const onDragEnd = useCallback(() => {
    requestAnimationFrame(() => {
      const el = document.getElementById(`dc-${card.id}`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rawX = (rect.left / vw) * 100;
      const rawY = (rect.top / vh) * 100;
      const clamped = clampPct(rawX, rawY, card.width);
      onDrop(card.id, clamped);
    });
  }, [card.id, card.width, onDrop]);

  const onClick = useCallback(() => {
    if (didDrag.current) return;
    if (card.modal) {
      onOpen(card);
    } else if (card.href) {
      const ext = card.href.startsWith("http") || card.href.startsWith("mailto");
      if (ext) {
        window.open(card.href, "_blank");
      } else {
        window.location.href = card.href;
      }
    }
  }, [card, onOpen]);

  return (
    <motion.div
      id={`dc-${card.id}`}
      key={`${card.id}-${position.x}-${position.y}`}
      className="absolute select-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: card.width,
        zIndex: topZ,
        willChange: "transform",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onDragEnd={onDragEnd}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onPointerUp={() => {
        requestAnimationFrame(() => { didDrag.current = false; });
      }}
    >
      <div
        className={cn(
          "rounded-lg overflow-hidden cursor-grab active:cursor-grabbing",
          "border-2 border-[#111] bg-white",
          "shadow-[4px_4px_0_0_#111] transition-all duration-200",
          "hover:shadow-[6px_6px_0_0_#111] hover:-translate-y-0.5",
        )}
      >
        {card.image ? (
          <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-[#111]">
            <img src={card.image} alt={card.title} className="w-full h-full object-cover" draggable={false} />
          </div>
        ) : (
          <div className="flex items-center justify-center aspect-square border-b-2 border-[#111] bg-[#fafaf8]">
            {card.icon && <card.icon className="size-7 text-[#111]" />}
          </div>
        )}
        <div className="px-2 py-2 text-center bg-white">
          <p className="text-xs font-bold text-[#111] truncate">{card.title}</p>
          {card.subtitle && (
            <p className="font-mono text-[9px] uppercase tracking-wider text-[#666] truncate mt-0.5">{card.subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Manga Dock / Toolbar
// ──────────────────────────────────────────────

function Dock() {
  const [hovered, setHovered] = useState<string | null>(null);
  const items = [
    { id: "home", label: "Story", icon: Compass, href: "/" },
    { id: "projects", label: "Projects", icon: FolderGit2, href: "/projects" },
    { id: "skills", label: "Skills", icon: Wrench, href: "/skills" },
    { id: "about", label: "Beyond", icon: Megaphone, href: "/beyond" },
    { id: "awards", label: "Awards", icon: Award, href: "/awards" },
    { id: "contact", label: "Contact", icon: Globe, href: "/contact" },
    { id: "mail", label: "Mail", icon: Send, href: "mailto:jibirnur32@gmail.com" },
  ];

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]"
    >
      <div className="flex items-center gap-2 bg-[#fafaf8] border-[2.5px] border-[#111] rounded-2xl px-3 py-2 shadow-[5px_5px_0_0_#111]">
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
                    active && "bg-[#059669] text-white"
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
                      className="absolute -top-9 whitespace-nowrap rounded border-2 border-[#111] bg-[#111] px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-[2px_2px_0_0_#111] pointer-events-none"
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
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Context Menu
// ──────────────────────────────────────────────

type ContextMenuState = { visible: boolean; x: number; y: number };

function ContextMenu({
  state, onClose, onResetLayout,
}: {
  state: ContextMenuState;
  onClose: () => void;
  onResetLayout: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!state.visible) return;
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    window.addEventListener("mousedown", h);
    return () => window.removeEventListener("mousedown", h);
  }, [state.visible, onClose]);

  useEffect(() => {
    if (!state.visible) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [state.visible, onClose]);

  if (!state.visible) return null;

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.1 }}
      className="fixed z-[300] min-w-[180px] rounded-lg bg-[#fafaf8] border-2 border-[#111] shadow-[4px_4px_0_0_#111] py-1.5 font-mono text-xs"
      style={{ left: state.x, top: state.y }}
    >
      <button
        onClick={() => { onResetLayout(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-[#111] font-bold hover:bg-[#111] hover:text-white transition-colors cursor-pointer"
      >
        <RotateCcw className="size-3.5 text-amber-500" />
        Reset Panels Layout
      </button>
      <div className="mx-2 my-1 h-px bg-[#111]/20" />
      <button
        onClick={onClose}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-[#666] hover:bg-[#111] hover:text-white transition-colors cursor-pointer"
      >
        Dismiss
      </button>
    </motion.div>
  );
}

let zCounter = 100;

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
// iOS-style App Grid (mobile)
// ──────────────────────────────────────────────

function MobileAppGrid({ onOpen }: { onOpen: (c: CardData) => void }) {
  return (
    <div className="fixed inset-x-0 top-16 bottom-24 z-30 overflow-y-auto px-4 py-4 pointer-events-auto">
      <div className="grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-5">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.88 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onOpen(card)}
              className="flex flex-col items-center gap-1.5 focus:outline-none"
            >
              <div
                className={cn(
                  "flex size-14 items-center justify-center rounded-[18px] border-2 border-[#111]",
                  "bg-white shadow-[3px_3px_0_0_#111] overflow-hidden",
                )}
              >
                {card.image ? (
                  <img src={card.image} alt="" className="size-full object-cover" draggable={false} />
                ) : Icon ? (
                  <Icon className="size-6 text-[#111]" />
                ) : null}
              </div>
              <span className="w-full truncate text-center text-[10px] font-semibold leading-tight text-[#111]">
                {card.title}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// iOS-style Dock (mobile bottom bar)
// ──────────────────────────────────────────────

function MobileDock() {
  const items = [
    { id: "home", icon: Compass, href: "/" },
    { id: "projects", icon: FolderGit2, href: "/projects" },
    { id: "skills", icon: Wrench, href: "/skills" },
    { id: "contact", icon: Globe, href: "/contact" },
  ];
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-[100] flex justify-center pb-3 pointer-events-auto"
    >
      <div className="flex items-center gap-4 rounded-3xl border-2 border-[#111] bg-white/85 px-5 py-2.5 shadow-[4px_4px_0_0_#111] backdrop-blur-md">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.href}>
              <motion.div whileTap={{ scale: 0.9 }} className="flex size-11 items-center justify-center rounded-[14px] border-2 border-[#111] bg-white shadow-[2px_2px_0_0_#111]">
                <Icon className="size-5 text-[#111]" />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Main Export
// ──────────────────────────────────────────────

export function MacDesktop() {
  const [positions, setPositions] = useState<Record<string, CardPos>>(DEFAULT_POSITIONS);
  const [activeModal, setActiveModal] = useState<CardData | null>(null);
  const [zMap, setZMap] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);
  const [ctxMenu, setCtxMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    setPositions(loadPositions());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) savePositions(positions);
  }, [positions, ready]);

  const bringToFront = useCallback((id: string) => {
    zCounter += 1;
    setZMap((prev) => ({ ...prev, [id]: zCounter }));
  }, []);

  const handleDrop = useCallback((id: string, pos: CardPos) => {
    setPositions((prev) => ({ ...prev, [id]: pos }));
  }, []);

  const openModal = useCallback((card: CardData) => setActiveModal(card), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setCtxMenu({ visible: true, x: e.clientX, y: e.clientY });
  }, []);

  const closeCtxMenu = useCallback(() => setCtxMenu((p) => ({ ...p, visible: false })), []);

  const resetLayout = useCallback(() => {
    setPositions(DEFAULT_POSITIONS);
    try { localStorage.removeItem(POS_KEY); } catch {}
  }, []);

  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden bg-[#fafaf8]"
      onContextMenu={handleContextMenu}
    >
      <MangaScreenToneBg />

      {/* Manga Header Badges */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-2">
        <div className="border-2 border-[#111] bg-[#111] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-[3px_3px_0_0_#111]">
          {isMobile ? "MANGA OS · HOME" : "WORKSPACE · DESKTOP"}
        </div>
      </div>

      {/* Mac-style clock, top right */}
      <div className="fixed top-4 right-4 z-40 flex items-center">
        <div className="border-2 border-[#111] bg-white px-3 py-1 shadow-[3px_3px_0_0_#111]">
          <MenuBarClock />
        </div>
      </div>

      {isMobile ? (
        <MobileAppGrid onOpen={openModal} />
      ) : (
        /* Desktop Cards Canvas */
        <div className="fixed inset-0 pt-4 pb-20 pointer-events-none">
          {CARDS.map((card) => (
            <div key={card.id} className="pointer-events-auto">
              <DesktopCard
                card={card}
                position={positions[card.id] || DEFAULT_POSITIONS[card.id]}
                onDrop={handleDrop}
                onOpen={openModal}
                topZ={zMap[card.id] ?? 10}
                bringToFront={bringToFront}
              />
            </div>
          ))}
        </div>
      )}

      {isMobile ? <MobileDock /> : <Dock />}

      {/* Preview Modal */}
      <AnimatePresence>
        {activeModal && <PreviewModal card={activeModal} onClose={closeModal} />}
      </AnimatePresence>

      {/* Context Menu */}
      <AnimatePresence>
        <ContextMenu state={ctxMenu} onClose={closeCtxMenu} onResetLayout={resetLayout} />
      </AnimatePresence>
    </div>
  );
}
