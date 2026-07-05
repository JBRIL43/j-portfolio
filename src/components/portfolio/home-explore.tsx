"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowUpRight,
  Award,
  Compass,
  FolderGit2,
  Megaphone,
  Send,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { staggerContainer, staggerItem } from "./reveal";
import { TiltCard } from "./tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cards = [
  {
    href: "/journey",
    label: "About Me",
    description: "The quick story: journey, skills, and vision in one place.",
    icon: Compass,
    accent: "from-blue-500/20 via-cyan-400/5 to-transparent",
    color: "oklch(0.62_0.2_255)",
  },
  {
    href: "/projects",
    label: "Work & Projects",
    description:
      "The products, systems, and Peak Craft work I want hiring managers to see first.",
    icon: FolderGit2,
    accent: "from-violet-500/20 via-blue-400/5 to-transparent",
    color: "oklch(0.7_0.17_162)",
  },
  {
    href: "/skills",
    label: "Technical Skills",
    description:
      "An interactive look at the stack — frontend, backend, programming, and tools.",
    icon: Wrench,
    accent: "from-emerald-400/20 via-blue-400/5 to-transparent",
    color: "oklch(0.77_0.19_70)",
  },
  {
    href: "/beyond",
    label: "Beyond Coding",
    description:
      "The habits that fuel the work — fitness, drawing, reading, faith, and growth.",
    icon: Megaphone,
    accent: "from-rose-400/20 via-blue-400/5 to-transparent",
    color: "oklch(0.63_0.26_304)",
  },
  {
    href: "/awards",
    label: "Awards & Certifications",
    description:
      "A growing collection of certifications, awards, and formal recognition.",
    icon: Award,
    accent: "from-amber-400/20 via-orange-400/5 to-transparent",
    color: "oklch(0.65_0.25_16)",
  },
  {
    href: "/contact",
    label: "Contact",
    description:
      "Have a project, a community idea, or just want to connect? Let's talk.",
    icon: Send,
    accent: "from-blue-500/20 via-indigo-400/5 to-transparent",
    color: "oklch(0.78_0.16_220)",
  },
];

export function HomeExplore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Animate cards on scroll
  useEffect(() => {
    if (reduce || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll<HTMLElement>(
      "[data-explore-card]",
    );

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      },
    );
  }, [reduce]);
  return (
    <section id="explore" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 rounded-full bg-[oklch(0.62_0.2_255/0.06)] blur-[130px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium tracking-wide text-foreground/80">
            <span className="size-1.5 rounded-full bg-[oklch(0.62_0.2_255)] shadow-[0_0_10px_oklch(0.62_0.2_255)]" />
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
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <TiltCard
                key={c.href}
                data-explore-card
                variants={staggerItem}
                className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:bg-white/8 cursor-pointer"
              >
                <Link
                  href={c.href}
                  className="relative flex h-full flex-col"
                  aria-label={c.label}
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br ${c.accent} blur-2xl opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125`}
                    style={{ backgroundColor: c.color, opacity: 0.15 }}
                  />
                  <div className="relative mb-4 inline-grid size-11 place-items-center rounded-xl bg-white/6 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-[oklch(0.62_0.2_255/0.16)] group-hover:ring-[oklch(0.62_0.2_255/0.3)]">
                    <Icon
                      className="size-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ color: c.color }}
                    />
                  </div>
                  <h3 className="relative flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground group-hover:text-white transition-colors">
                    {c.label}
                    <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[oklch(0.78_0.14_255)]" />
                  </h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>
                </Link>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
