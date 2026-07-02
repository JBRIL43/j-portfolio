"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  Compass,
  FolderGit2,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

type StoryTab = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  summary: string;
  bullets: string[];
  statLabel: string;
  statValue: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  accent: string;
};

const storyTabs: StoryTab[] = [
  {
    id: "journey",
    label: "Journey",
    eyebrow: "Where it started",
    title: "A path built step by step.",
    summary:
      "From a first PC to Hawassa University, Peak Craft, and graduation, the story is about learning by doing and sticking with the craft long enough for it to compound.",
    bullets: [
      "First exposed to technology through curiosity, not formal training.",
      "Found a direction in Information Systems and kept building from there.",
      "Used Peak Craft as a place to practice leadership, design, and shipping real work.",
    ],
    statLabel: "Milestones",
    statValue: "2022 → 2026",
    href: "/journey",
    cta: "Read the journey",
    icon: Compass,
    accent: "from-blue-500/30 via-cyan-400/10 to-transparent",
  },
  {
    id: "work",
    label: "Work",
    eyebrow: "How I operate",
    title: "Six disciplines, one builder.",
    summary:
      "Web development, design, leadership, content, social strategy, and AI-assisted workflows all feed into the way I solve problems and ship products.",
    bullets: [
      "Builds with React, Next.js, Node.js, and TypeScript.",
      "Moves between product, design, and community with a single mental model.",
      "Uses AI as a force multiplier without losing craft or clarity.",
    ],
    statLabel: "Core focus",
    statValue: "Web · Design · AI",
    href: "/work",
    cta: "See what I do",
    icon: Sparkles,
    accent: "from-violet-500/30 via-blue-400/10 to-transparent",
  },
  {
    id: "projects",
    label: "Projects",
    eyebrow: "What’s shipped",
    title: "Featured work, not just ideas.",
    summary:
      "PCIC, HU Student Debt, LibraryHub, and other builds are the proof points. This drawer leads with the products I want people to remember.",
    bullets: [
      "Focused on real users, real workflows, and real outcomes.",
      "Built systems that combine UX, data, and practical operations.",
      "Peak Craft work is treated as part of the shipped body of work, not a separate lane.",
    ],
    statLabel: "Featured",
    statValue: "Live products",
    href: "/projects",
    cta: "Browse projects",
    icon: FolderGit2,
    accent: "from-blue-500/30 via-indigo-400/10 to-transparent",
  },
  {
    id: "awards",
    label: "Awards",
    eyebrow: "Recognition",
    title: "Credentials that back up the work.",
    summary:
      "Certifications, hackathon recognition, and community awards sit here as a separate proof lane so they stay distinct from Vision.",
    bullets: [
      "Useful for trust, but not the main story.",
      "Kept separate from Vision so the navigation stays intentional.",
      "Easy to skim without overwhelming the homepage.",
    ],
    statLabel: "Proof",
    statValue: "Certs & awards",
    href: "/awards",
    cta: "View awards",
    icon: Award,
    accent: "from-amber-400/30 via-orange-400/10 to-transparent",
  },
  {
    id: "vision",
    label: "Vision",
    eyebrow: "Where this goes next",
    title: "Building for impact beyond the portfolio.",
    summary:
      "The goal is to keep building products, communities, and systems that matter across Africa and beyond, with more focus on scale, clarity, and usefulness.",
    bullets: [
      "Technology is the tool; community and utility are the standard.",
      "Aims to keep learning and turning curiosity into execution.",
      "Vision stays separate from awards so it reads like direction, not recognition.",
    ],
    statLabel: "Direction",
    statValue: "Africa & beyond",
    href: "/vision",
    cta: "Read the vision",
    icon: GraduationCap,
    accent: "from-emerald-400/30 via-cyan-400/10 to-transparent",
  },
];

function StoryTabButton({
  tab,
  active,
  onSelect,
}: {
  tab: StoryTab;
  active: boolean;
  onSelect: () => void;
}) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLButtonElement>(null);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  const rotateY = useSpring(useTransform(mvX, [-1, 1], [10, -10]), {
    stiffness: 220,
    damping: 20,
    mass: 0.28,
  });
  const rotateX = useSpring(useTransform(mvY, [-1, 1], [-10, 10]), {
    stiffness: 220,
    damping: 20,
    mass: 0.28,
  });
  const shiftX = useSpring(useTransform(mvX, [-1, 1], [-6, 6]), {
    stiffness: 200,
    damping: 22,
    mass: 0.26,
  });
  const shiftY = useSpring(useTransform(mvY, [-1, 1], [-6, 6]), {
    stiffness: 200,
    damping: 22,
    mass: 0.26,
  });

  const onMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    mvX.set(px * 2 - 1);
    mvY.set(py * 2 - 1);
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const onLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={onSelect}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.98 }}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        x: reduce ? 0 : shiftX,
        y: reduce ? 0 : shiftY,
        transformPerspective: 1000,
      }}
      className={cn(
        "group relative flex h-full min-h-33 flex-col justify-between overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300",
        active
          ? "border-white/20 bg-white/9 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.7)]"
          : "border-white/8 bg-white/4 hover:border-white/14 hover:bg-white/7"
      )}
      aria-pressed={active}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-br ${tab.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), oklch(0.62 0.2 255 / 0.16), transparent 60%)",
        }}
      />
      <div className="relative flex items-center justify-between gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
          {tab.eyebrow}
        </span>
        <tab.icon
          className={cn(
            "size-4 transition-transform",
            active && "scale-110 text-[oklch(0.78_0.14_255)]"
          )}
        />
      </div>
      <div className="relative mt-4">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {tab.label}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {tab.title}
        </p>
      </div>
      <div className="relative mt-5 flex items-center justify-between text-xs text-muted-foreground">
        <span>{tab.statLabel}</span>
        <span className="text-foreground/85">{tab.statValue}</span>
      </div>
    </motion.button>
  );
}

export function StoryDrawer() {
  const [activeId, setActiveId] = useState(storyTabs[0]?.id ?? "journey");
  const [direction, setDirection] = useState(0);

  const activeIndex = storyTabs.findIndex((tab) => tab.id === activeId);
  const activeTab = storyTabs[activeIndex] ?? storyTabs[0];

  const selectTab = (nextId: string) => {
    const nextIndex = storyTabs.findIndex((tab) => tab.id === nextId);
    if (nextIndex === -1 || nextId === activeId) return;
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveId(nextId);
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-128 -translate-x-1/2 rounded-full bg-[oklch(0.62_0.2_255/0.06)] blur-[110px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Tabbed Story Drawer"
          title={<>My Journey in a Nutshell.</>}
        />

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {storyTabs.map((tab) => {
            const active = tab.id === activeId;

            return (
              <StoryTabButton
                key={tab.id}
                tab={tab}
                active={active}
                onSelect={() => selectTab(tab.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}