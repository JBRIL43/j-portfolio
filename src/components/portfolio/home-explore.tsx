"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  Award,
  Compass,
  FolderGit2,
  Megaphone,
  Monitor,
  Send,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { staggerContainer } from "./reveal";
import { AmbientGlow } from "./ambient-glow";
import { MangaPanel } from "./manga-panel";

const cards = [
  {
    href: "/journey",
    label: "About Me",
    description: "The quick story: journey, skills, and vision in one place.",
    icon: Compass,
  },
  {
    href: "/projects",
    label: "Work & Projects",
    description:
      "The products, systems, and Peak Craft work I want hiring managers to see first.",
    icon: FolderGit2,
  },
  {
    href: "/skills",
    label: "Technical Skills",
    description:
      "An interactive look at the stack — frontend, backend, programming, and tools.",
    icon: Wrench,
  },
  {
    href: "/beyond",
    label: "Beyond Coding",
    description:
      "The habits that fuel the work — fitness, drawing, reading, faith, and growth.",
    icon: Megaphone,
  },
  {
    href: "/awards",
    label: "Awards & Certifications",
    description:
      "A growing collection of certifications, awards, and formal recognition.",
    icon: Award,
  },
  {
    href: "/contact",
    label: "Contact",
    description:
      "Have a project, a community idea, or just want to connect? Let's talk.",
    icon: Send,
  },
  {
    href: "/desktop",
    label: "Desktop Experience",
    description:
      "Explore the portfolio as an interactive Mac desktop — drag, click, and play.",
    icon: Monitor,
  },
];

export function HomeExplore() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="explore" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[10%] size-96 -translate-x-1/2 rounded-full bg-[#059669]/8 blur-[120px]" />
        <div className="absolute right-[-5%] bottom-[20%] size-64 rounded-full bg-[#059669]/6 blur-[100px]" />
      </div>
      <AmbientGlow color="bg-[#059669]/6" top="top-0" blur="blur-[130px]" />

      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium tracking-wide text-foreground/80">
            <span className="size-1.5 rounded-full bg-[#111]" />
            Explore
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
            Dive deeper into the work
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            Each part of the story has its own page — pick wherever you want to
            start.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((c, idx) => {
            const Icon = c.icon;
            return (
              <MangaPanel
                key={c.href}
                index={idx}
                left={idx % 2 === 0}
                data-explore-card
                className="group h-full cursor-pointer"
              >
                <Link
                  href={c.href}
                  className="relative flex h-full flex-col"
                  aria-label={c.label}
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-[#059669] blur-2xl transition-all duration-500 opacity-[0.07] group-hover:opacity-[0.14] group-hover:scale-125"
                  />
                  <div className="relative mb-4 inline-grid size-11 place-items-center rounded-xl bg-black/6 ring-1 ring-black/10 transition-all duration-300 group-hover:bg-[#059669]/12 group-hover:ring-[#059669]/40">
                    <Icon
                      className="size-5 text-[#111] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:text-[#059669]"
                    />
                  </div>
                  <h3 className="relative flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground group-hover:text-[#059669] transition-colors">
                    {c.label}
                    <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#059669]" />
                  </h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>
                </Link>
              </MangaPanel>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}