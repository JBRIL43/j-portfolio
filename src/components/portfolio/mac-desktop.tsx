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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RotateCcw, Trash2 } from "lucide-react";

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

// Positions stored as px from top-left of viewport
type CardPos = { x: number; y: number };

// ──────────────────────────────────────────────
// Organized layout positions (px)
// Grouped: Projects (top), Skills (middle), Social + Fun (bottom)
// Calculated so cards don't overlap on any screen ≥ 1024px
// ──────────────────────────────────────────────

function computeDefaultPositions(): Record<string, CardPos> {
  // We'll compute relative to a 1440×900 reference viewport,
  // then scale on mount via CSS percentage.
  // But since we store px and render with left/top in %,
  // we define positions as % of viewport.
  return {
    // ── Row 1: Projects (y ~6-14%) ──
    pcic:      { x: 4,  y: 6 },
    debt:      { x: 19, y: 4 },
    library:   { x: 34, y: 7 },
    inventory: { x: 50, y: 5 },
    fault:     { x: 66, y: 6 },
    brand:     { x: 82, y: 4 },
    // ── Row 2: Skills (y ~30-40%) ──
    react:     { x: 10, y: 32 },
    nextjs:    { x: 24, y: 34 },
    figma:     { x: 38, y: 32 },
    nodejs:    { x: 52, y: 34 },
    linux:     { x: 66, y: 32 },
    // ── Row 3: Social + Fun (y ~58-66%) ──
    github:    { x: 6,  y: 60 },
    linkedin:  { x: 20, y: 62 },
    email:     { x: 35, y: 60 },
    peakcraft: { x: 52, y: 62 },
    awards:    { x: 68, y: 60 },
  };
}

const DEFAULT_POSITIONS = computeDefaultPositions();

const CARDS: CardData[] = [
  // ── Projects (top row) ──
  { id: "pcic", title: "PCIC", subtitle: "Management System", image: "/projects/pcic-dashboard.png", color: "#62C2FF", width: 130, type: "project",
    modal: { description: "The operating system for Peak Craft — a full management system with role-based dashboard, event + attendance tracking, member management, decisions, compliance, and career modules.",
      details: [{ label: "Status", value: "Live" }, { label: "Stack", value: "Next.js · React · Tailwind · Node.js · MongoDB" }, { label: "Members", value: "27+" }, { label: "Active rate", value: "81%" }],
      links: [{ label: "Live Site", href: "https://pcic.tech", external: true }, { label: "Case Study", href: "/projects" }] } },
  { id: "debt", title: "HU Debt", subtitle: "Student Platform", image: "/projects/debt-admin-dashboard.png", color: "#4ECDC4", width: 130, type: "project",
    modal: { description: "A cost-sharing debt platform for Hawassa University — web admin + Flutter student app. Digitized the entire cost-sharing lifecycle.",
      details: [{ label: "Surfaces", value: "3 (Admin + App + API)" }, { label: "Stack", value: "React · Flutter · Node.js · MongoDB" }, { label: "Regulation", value: "No. 447/2024" }, { label: "Payments", value: "Chapa + receipts" }],
      links: [{ label: "GitHub", href: "https://github.com/JBRIL43", external: true }, { label: "Case Study", href: "/projects" }] } },
  { id: "library", title: "LibraryHub", subtitle: "Bookstore", image: "/projects/libraryhub-hero.png", color: "#FFE66D", width: 120, type: "project",
    modal: { description: "A fully static, multi-page bookstore web app. 32-book catalog, dual buy/rent pricing, search + genre filtering, shopping cart, and client-side auth.",
      details: [{ label: "Books", value: "32" }, { label: "Model", value: "Buy or Rent" }, { label: "Stack", value: "HTML5 · CSS3 · JS (ES6)" }, { label: "Hosting", value: "GitHub Pages" }],
      links: [{ label: "Live Site", href: "https://jbril43.github.io/bookstore/", external: true }, { label: "GitHub", href: "https://github.com/JBRIL43/bookstore", external: true }] } },
  { id: "inventory", title: "Stock Mgmt", subtitle: "Inventory System", image: "/projects/inventory-dashboard.png", color: "#FF6B6B", width: 120, type: "project",
    modal: { description: "A full inventory platform with role-based admin dashboard: real-time metrics, searchable stock-balance table, exportable reports.",
      details: [{ label: "Items", value: "37" }, { label: "Revenue", value: "546,300" }, { label: "Stack", value: "React · Node.js · MongoDB" }, { label: "Features", value: "IN / OUT / Balance" }],
      links: [{ label: "GitHub", href: "https://github.com/JBRIL43/inventory_management", external: true }, { label: "Case Study", href: "/projects" }] } },
  { id: "fault", title: "Fault Report", subtitle: "IoT Campus App", image: "/projects/fault-report-form.png", color: "#45B7D1", width: 120, type: "project",
    modal: { description: "A Flutter + Supabase app for Hawassa University's IoT campus — report faults with photos, GPS, and Twilio SMS alerts.",
      details: [{ label: "Timeline", value: "9-week MVP" }, { label: "Platform", value: "Cross-platform" }, { label: "Stack", value: "Flutter · Supabase · Twilio" }, { label: "Alerts", value: "SMS" }],
      links: [{ label: "GitHub", href: "https://github.com/JBRIL43/FaultReportingApp", external: true }, { label: "Case Study", href: "/projects" }] } },
  { id: "brand", title: "Peak Craft", subtitle: "Brand System", image: "/projects/peakcraft-emblem.png", color: "#F7A35C", width: 120, type: "project",
    modal: { description: "Identity, voice, and guidelines for a tech community — crown, peaks, and a bold color system.",
      details: [{ label: "Guidelines", value: "Full" }, { label: "Adoption", value: "Org-wide" }, { label: "Colors", value: "Blue · Orange · Gold" }, { label: "Tools", value: "Figma" }],
      links: [{ label: "Case Study", href: "/projects" }] } },

  // ── Skills (middle row) ──
  { id: "react", title: "React", icon: Code2, color: "#61DAFB", width: 90, type: "skill",
    modal: { description: "A JavaScript library for building user interfaces. Used across all major projects.",
      details: [{ label: "Category", value: "Frontend" }, { label: "Experience", value: "2+ years" }, { label: "Used in", value: "PCIC, Portfolio" }, { label: "Level", value: "Advanced" }],
      links: [{ label: "All Skills", href: "/skills" }] } },
  { id: "nextjs", title: "Next.js", icon: Code2, color: "#FFFFFF", width: 90, type: "skill",
    modal: { description: "The React framework for production. SSR, API routes, and optimized performance.",
      details: [{ label: "Category", value: "Full-Stack" }, { label: "Experience", value: "2+ years" }, { label: "Used in", value: "Portfolio, PCIC" }, { label: "Level", value: "Advanced" }],
      links: [{ label: "All Skills", href: "/skills" }] } },
  { id: "figma", title: "Figma", icon: Palette, color: "#F24E1E", width: 90, type: "skill",
    modal: { description: "Collaborative interface design tool. Used for Peak Craft brand and UI mockups.",
      details: [{ label: "Category", value: "Design" }, { label: "Experience", value: "2+ years" }, { label: "Used in", value: "Peak Craft, Portfolio" }, { label: "Level", value: "Advanced" }],
      links: [{ label: "All Skills", href: "/skills" }] } },
  { id: "nodejs", title: "Node.js", icon: Database, color: "#339933", width: 90, type: "skill",
    modal: { description: "JavaScript runtime for server-side development. Powers backend APIs.",
      details: [{ label: "Category", value: "Backend" }, { label: "Experience", value: "2+ years" }, { label: "Used in", value: "PCIC API, HU Debt" }, { label: "Level", value: "Advanced" }],
      links: [{ label: "All Skills", href: "/skills" }] } },
  { id: "linux", title: "Linux", icon: Terminal, color: "#FCC624", width: 90, type: "skill",
    modal: { description: "Unix-based OS and command line. Daily driver for development.",
      details: [{ label: "Category", value: "Tools" }, { label: "Experience", value: "2+ years" }, { label: "Used in", value: "Daily workflow" }, { label: "Level", value: "Advanced" }],
      links: [{ label: "All Skills", href: "/skills" }] } },

  // ── Social + Fun (bottom row) ──
  { id: "github", title: "GitHub", subtitle: "JBRIL43", icon: Github, color: "#8B5CF6", width: 100, type: "social", href: "https://github.com/JBRIL43" },
  { id: "linkedin", title: "LinkedIn", subtitle: "Jibril Nuredin", icon: Linkedin, color: "#0A66C2", width: 100, type: "social", href: "https://www.linkedin.com/in/jibril-nuredin" },
  { id: "email", title: "Email", subtitle: "jibirnur32@gmail.com", icon: Mail, color: "#EA4335", width: 120, type: "social", href: "mailto:jibirnur32@gmail.com" },
  { id: "peakcraft", title: "Peak Craft", subtitle: "Tech Community", icon: Users, color: "#F43F5E", width: 110, type: "fun", href: "https://pcic.tech" },
  { id: "awards", title: "Awards", subtitle: "12+ Certs", icon: Award, color: "#F59E0B", width: 100, type: "fun", href: "/awards" },
];

// ──────────────────────────────────────────────
// localStorage helpers
// ──────────────────────────────────────────────

const POS_KEY = "desktop-positions-v2";

function loadPositions(): Record<string, CardPos> {
  if (typeof window === "undefined") return DEFAULT_POSITIONS;
  try {
    const raw = localStorage.getItem(POS_KEY);
    if (raw) {
      const stored = JSON.parse(raw) as Record<string, CardPos>;
      // Merge with defaults so new cards appear
      return { ...DEFAULT_POSITIONS, ...stored };
    }
  } catch {}
  return DEFAULT_POSITIONS;
}

function savePositions(pos: Record<string, CardPos>) {
  try { localStorage.setItem(POS_KEY, JSON.stringify(pos)); } catch {}
}

// ──────────────────────────────────────────────
// Clamp to viewport (returns % values)
// ──────────────────────────────────────────────

function clampPct(x: number, y: number, cardW: number): CardPos {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const maxX = ((vw - cardW) / vw) * 100;
  const maxY = ((vh - 140) / vh) * 100; // leave room for dock
  return {
    x: Math.max(0, Math.min(maxX, x)),
    y: Math.max(2, Math.min(maxY, y)),
  };
}

// ──────────────────────────────────────────────
// Cursor Glow
// ──────────────────────────────────────────────

function CursorGlow() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 22 });
  const sy = useSpring(my, { stiffness: 80, damping: 22 });

  useEffect(() => {
    const h = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[1] size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
      style={{
        left: sx, top: sy,
        background: "radial-gradient(circle, oklch(0.62 0.2 255 / 0.3) 0%, transparent 70%)",
      }}
    />
  );
}

// ──────────────────────────────────────────────
// Constellation Background
// ──────────────────────────────────────────────

function ConstellationBg() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0;
    const dots: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      dots.length = 0;
      for (let i = 0; i < 50; i++) {
        dots.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.2 + 0.4,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;
      }
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(98,194,255,${0.08 * (1 - dist / 200)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(98,194,255,0.35)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 -z-[5] pointer-events-none" />;
}

// ──────────────────────────────────────────────
// Preview Modal (macOS-style)
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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative flex flex-col rounded-xl overflow-hidden",
          "bg-[#111118]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60",
          maximized ? "inset-4 sm:inset-8" : "w-full max-w-lg max-h-[85vh]"
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <button onClick={onClose} className="group size-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4040] transition-colors">
                <X className="size-2 m-auto text-[#8a0000] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="group size-3 rounded-full bg-[#febc2e] hover:bg-[#f5a623] transition-colors">
                <Minus className="size-2 m-auto text-[#8a5a00] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button onClick={() => setMaximized((p) => !p)} className="group size-3 rounded-full bg-[#28c840] hover:bg-[#20a834] transition-colors">
                <Maximize2 className="size-1.5 m-auto text-[#005a00] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
            <span className="text-xs text-white/40 font-mono ml-1">{card.title}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {card.image && (
            <div className="relative aspect-video overflow-hidden">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111118]/70 via-transparent to-transparent" />
            </div>
          )}
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              {card.icon && (
                <div className="flex items-center justify-center size-10 rounded-xl shrink-0" style={{ backgroundColor: `${card.color}20` }}>
                  <card.icon className="size-5" style={{ color: card.color }} />
                </div>
              )}
              <div>
                <h3 className="text-base font-semibold text-white">{card.title}</h3>
                {card.subtitle && <p className="text-xs text-white/40">{card.subtitle}</p>}
              </div>
            </div>
            {m?.description && <p className="text-sm text-white/55 leading-relaxed">{m.description}</p>}
            {m?.details && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/30 font-semibold mb-2">Details</p>
                <div className="grid grid-cols-2 gap-2">
                  {m.details.map((d) => (
                    <div key={d.label} className="rounded-lg bg-white/[0.04] px-3 py-2">
                      <p className="text-[10px] text-white/30 mb-0.5">{d.label}</p>
                      <p className="text-xs text-white/70">{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {m?.links && m.links.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {m.links.map((link) =>
                  link.external ? (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-medium transition-all hover:brightness-110"
                      style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                      {link.label} <ExternalLink className="size-3" />
                    </a>
                  ) : (
                    <Link key={link.label} href={link.href}
                      className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-medium transition-all hover:brightness-110"
                      style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                      {link.label} <ChevronRight className="size-3" />
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Draggable Desktop Card
// ──────────────────────────────────────────────

const DRAG_THRESHOLD = 6; // px — below this, treat as click

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

  // Handle pointer down — record start for drag-vs-click detection
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    bringToFront(card.id);
    startXY.current = { x: e.clientX, y: e.clientY };
    didDrag.current = false;
  }, [card.id, bringToFront]);

  // Track movement to detect drag
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const dx = e.clientX - startXY.current.x;
    const dy = e.clientY - startXY.current.y;
    if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
      didDrag.current = true;
    }
  }, []);

  // On drag end — read the element's actual final position from the DOM
  // (avoids double-offset from framer-motion's internal translate)
  const onDragEnd = useCallback(() => {
    requestAnimationFrame(() => {
      // The element's transform has been applied by framer-motion
      // so getBoundingClientRect gives us the true final position
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

  // Click handler — only fire if no drag happened
  const onClick = useCallback(() => {
    if (didDrag.current) return;
    if (card.modal) {
      onOpen(card);
    } else if (card.href) {
      const ext = card.href.startsWith("http") || card.href.startsWith("mailto");
      ext ? window.open(card.href, "_blank") : (window.location.href = card.href);
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
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onDragEnd={onDragEnd}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      onPointerUp={() => {
        requestAnimationFrame(() => { didDrag.current = false; });
      }}
    >
      <div
        className={cn(
          "rounded-xl overflow-hidden cursor-grab active:cursor-grabbing",
          "bg-white/[0.06] backdrop-blur-sm border border-white/[0.06]",
          "transition-shadow duration-300",
          "hover:border-white/15 hover:shadow-lg hover:shadow-black/30",
        )}
      >
        {card.image ? (
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={card.image} alt={card.title} className="w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="flex items-center justify-center aspect-square" style={{ backgroundColor: `${card.color}12` }}>
            {card.icon && <card.icon className="size-7" style={{ color: card.color }} />}
          </div>
        )}
        <div className="px-2.5 py-2 text-center">
          <p className="text-[11px] font-medium text-white/80 truncate max-w-[110px]">{card.title}</p>
          {card.subtitle && <p className="text-[9px] text-white/35 truncate">{card.subtitle}</p>}
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Dock
// ──────────────────────────────────────────────

function Dock() {
  const [hovered, setHovered] = useState<string | null>(null);
  const items = [
    { id: "home", label: "Finder", icon: Compass, color: "#62C2FF", href: "/" },
    { id: "projects", label: "Projects", icon: FolderGit2, color: "#4ECDC4", href: "/projects" },
    { id: "skills", label: "Skills", icon: Wrench, color: "#FFE66D", href: "/skills" },
    { id: "about", label: "About", icon: Megaphone, color: "#FF6B6B", href: "/beyond" },
    { id: "awards", label: "Awards", icon: Award, color: "#F7A35C", href: "/awards" },
    { id: "contact", label: "Contact", icon: Globe, color: "#0A66C2", href: "/contact" },
    { id: "mail", label: "Mail", icon: Send, color: "#EA4335", href: "mailto:jibirnur32@gmail.com" },
  ];

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[100]"
    >
      <div className="flex items-end gap-1.5 bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/[0.08] px-2.5 py-2 shadow-2xl shadow-black/40">
        {items.map((item) => {
          const Icon = item.icon;
          const active = hovered === item.id;
          return (
            <Link key={item.id} href={item.href}>
              <motion.div
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ y: -8, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center cursor-pointer"
              >
                <div
                  className="flex items-center justify-center size-11 rounded-xl transition-all duration-200"
                  style={{
                    backgroundColor: active ? `${item.color}30` : `${item.color}12`,
                    boxShadow: active ? `0 4px 20px ${item.color}35` : "none",
                  }}
                >
                  <Icon className="size-5" style={{ color: item.color }} />
                </div>
                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute -top-9 whitespace-nowrap rounded-lg bg-[#111118]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white border border-white/10 shadow-xl pointer-events-none"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
        <div className="w-px h-8 bg-white/10 mx-0.5" />
        <motion.div whileHover={{ y: -8, scale: 1.2 }} className="flex items-center justify-center size-11 rounded-xl bg-white/5 cursor-pointer">
          <svg className="size-5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Main Export
// ──────────────────────────────────────────────

let zCounter = 100;

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

  // Close on click outside
  useEffect(() => {
    if (!state.visible) return;
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    window.addEventListener("mousedown", h);
    return () => window.removeEventListener("mousedown", h);
  }, [state.visible, onClose]);

  // Close on Escape
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
      transition={{ duration: 0.12 }}
      className="fixed z-[300] min-w-[180px] rounded-xl bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 py-1.5"
      style={{ left: state.x, top: state.y }}
    >
      <button
        onClick={() => { onResetLayout(); onClose(); }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
      >
        <RotateCcw className="size-4 text-amber-400" />
        Reset Layout
      </button>
      <div className="mx-3 my-1 h-px bg-white/8" />
      <button
        onClick={onClose}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/50 hover:bg-white/10 transition-colors cursor-pointer"
      >
        Dismiss
      </button>
    </motion.div>
  );
}

export function MacDesktop() {
  const [positions, setPositions] = useState<Record<string, CardPos>>(DEFAULT_POSITIONS);
  const [activeModal, setActiveModal] = useState<CardData | null>(null);
  const [zMap, setZMap] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);
  const [ctxMenu, setCtxMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0 });

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

  // Right-click context menu
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
      className="relative h-[100dvh] w-full overflow-hidden bg-[#0a0a12]"
      onContextMenu={handleContextMenu}
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a12]" />
        <img src="/avatar.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12]/60 via-transparent to-[#0a0a12]/70" />
        <div className="absolute left-1/2 top-[-10%] size-176 -translate-x-1/2 rounded-full bg-[oklch(0.62_0.2_255/0.08)] blur-[140px] animate-aurora" />
        <div className="absolute right-[-10%] top-[30%] size-128 rounded-full bg-[oklch(0.72_0.16_200/0.05)] blur-[130px] animate-aurora [animation-delay:-6s]" />
        <div className="absolute left-[-8%] bottom-[-10%] size-136 rounded-full bg-[oklch(0.6_0.2_290/0.04)] blur-[140px] animate-aurora [animation-delay:-12s]" />
        <div className="absolute inset-0 grid-bg mask-[radial-gradient(ellipse_at_center,black_15%,transparent_60%)] opacity-15" />
      </div>

      <CursorGlow />
      <ConstellationBg />

      {/* Desktop cards */}
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

      <Dock />

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
