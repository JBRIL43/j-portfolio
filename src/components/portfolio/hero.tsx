"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowDown,
  ArrowRight,
  Mail,
  Sparkles,
  MapPin,
  PenTool,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./use-reduced-motion";

const headline = [
  "Building",
  "Technology,",
  "Communities,",
  "and Digital",
  "Experiences.",
];

export function Hero() {
  // Cursor-following tilt for the floating identity card
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Magnetic button refs
  const cta1Ref = useRef<HTMLAnchorElement>(null);
  const cta2Ref = useRef<HTMLAnchorElement>(null);

  // Magnetic hover effect for CTA buttons
  useEffect(() => {
    const buttons = [cta1Ref.current, cta2Ref.current];

    buttons.forEach((btn) => {
      if (!btn) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    if (reduce || !scrollProgressRef.current) return;

    gsap.to(scrollProgressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.3,
      },
    });
  }, [reduce]);

  // Parallax effect on hero section
  useEffect(() => {
    if (reduce || !sectionRef.current) return;

    gsap.to(sectionRef.current, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [reduce]);

  // Multi-layer parallax for background aurora blobs
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;

    // Each blob scrolls at a different rate for depth
    const layers = [
      { el: gridRef.current, speed: 60 },
      { el: blob1Ref.current, speed: -80 },
      { el: blob2Ref.current, speed: -120 },
      { el: blob3Ref.current, speed: -160 },
    ];

    const onScroll = () => {
      const scrollY = window.scrollY;
      layers.forEach(({ el, speed }) => {
        if (el) {
          el.style.transform = `translate3d(0, ${scrollY * speed / 600}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  // normalized cursor position relative to card center: -1 .. 1
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  const rotateY = useSpring(useTransform(mvX, [-1, 1], [10, -10]), {
    stiffness: 140,
    damping: 16,
    mass: 0.4,
  });
  const rotateX = useSpring(useTransform(mvY, [-1, 1], [-10, 10]), {
    stiffness: 140,
    damping: 16,
    mass: 0.4,
  });
  // subtle magnetic translate so the card drifts toward the cursor
  const shiftX = useSpring(useTransform(mvX, [-1, 1], [-6, 6]), {
    stiffness: 120,
    damping: 18,
  });
  const shiftY = useSpring(useTransform(mvY, [-1, 1], [-6, 6]), {
    stiffness: 120,
    damping: 18,
  });

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mvX.set(px * 2 - 1);
    mvY.set(py * 2 - 1);

    // cursor-following glare inside the card
    const inner = el.querySelector<HTMLElement>("[data-card-glare]");
    if (inner) {
      inner.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      inner.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
  };

  const onCardLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      {/* Ambient background (particles are global, see page.tsx) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div ref={gridRef} className="absolute inset-0 grid-bg mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)] will-change-transform" />
        <div ref={blob1Ref} className="absolute left-1/2 top-[-10%] size-176 -translate-x-1/2 rounded-full bg-[oklch(0.62_0.2_255/0.22)] blur-[140px] animate-aurora will-change-transform" />
        <div ref={blob2Ref} className="absolute right-[-10%] top-[30%] size-128 rounded-full bg-[oklch(0.72_0.16_200/0.16)] blur-[130px] animate-aurora [animation-delay:-6s] will-change-transform" />
        <div ref={blob3Ref} className="absolute left-[-8%] bottom-[-10%] size-136 rounded-full bg-[oklch(0.6_0.2_290/0.12)] blur-[140px] animate-aurora [animation-delay:-12s] will-change-transform" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-background to-transparent" />

      {/* Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
        <div
          ref={scrollProgressRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-[oklch(0.62_0.2_255)] to-[oklch(0.78_0.16_220)]"
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Left: copy */}
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-foreground/80 hover:scale-105 transition-transform cursor-pointer"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Available for collaborations & freelance
          </motion.div>

          <h1 className="text-balance text-[1.83rem] font-semibold leading-[1.05] tracking-tight sm:text-[2.58rem] md:text-[3.33rem] lg:text-[3.78rem]">
            {headline.map((word, i) => (
              <span
                key={i}
                className="mr-[0.28em] inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  initial={{ y: "110%", opacity: 0, rotateX: -40 }}
                  animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                  transition={{
                    delay: 1.7 + i * 0.09,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={
                    word === "Digital" || word === "Experiences."
                      ? "inline-block text-gradient-blue"
                      : "inline-block text-gradient"
                  }
                  style={{
                    transformPerspective: 1000,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.25, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Information Systems student, web developer, designer, PR lead,
            social media manager, and content creator transforming ideas into
            impactful digital products and communities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              ref={cta1Ref}
              href="/projects"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-[oklch(0.62_0.2_255)] px-5 py-3 text-sm font-medium text-white shadow-[0_0_30px_-8px_oklch(0.62_0.2_255)] transition-all hover:shadow-[0_0_40px_-6px_oklch(0.62_0.2_255)] hover:brightness-110 cursor-pointer"
            >
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              ref={cta2Ref}
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-medium text-foreground/90 transition-all hover:bg-white/10 cursor-pointer"
            >
              <Mail className="size-4" />
              Contact Me
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5 group cursor-pointer">
              <Sparkles className="size-3.5 text-[oklch(0.62_0.2_255)] group-hover:rotate-12 transition-transform" />
              Information Systems · Hawassa University
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-1.5 group cursor-pointer">
              <MapPin className="size-3.5 text-[oklch(0.62_0.2_255)] group-hover:scale-125 transition-transform" />
              Head of PR · Peak Craft
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-1.5 group cursor-pointer">
              <PenTool className="size-3.5 text-[oklch(0.62_0.2_255)] group-hover:-rotate-12 transition-transform" />
              SMM · Content Creator
            </span>
          </motion.div>
        </div>

        {/* Right: identity card — follows the cursor */}
        <motion.div
          ref={cardRef}
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            rotateX: reduce ? 0 : rotateX,
            rotateY: reduce ? 0 : rotateY,
            x: reduce ? 0 : shiftX,
            y: reduce ? 0 : shiftY,
            transformPerspective: 1000,
          }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-[oklch(0.62_0.2_255/0.18)] blur-3xl" />
          <div
            data-card-glare
            className="group relative animate-float-slow overflow-hidden rounded-3xl glass-strong p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
          >
            {/* cursor-following glare */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), oklch(0.62 0.2 255 / 0.16), transparent 60%)",
              }}
            />
            {/* top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative size-12 shrink-0">
                  <img
                    src="/avatar.png"
                    alt="Jibril Nuredin avatar"
                    className="size-12 rounded-xl object-cover ring-1 ring-white/15"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-[oklch(0.11_0.008_264)] bg-emerald-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Jibril Nuredin
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Engineer · PR Lead · SMM · Creator
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] font-medium text-foreground/70">
                v2025
              </span>
            </div>

            <div className="my-5 h-px w-full bg-white/8" />

            {/* meta lines */}
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground">
                  role
                </span>
                <span className="text-foreground/90">software_engineer</span>
              </div>
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground">
                  pr
                </span>
                <span className="text-foreground/90">peak_craft.head</span>
              </div>
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground">
                  smm
                </span>
                <span className="text-foreground/90">social_media_mgr</span>
              </div>
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground">
                  content
                </span>
                <span className="text-foreground/90">creator</span>
              </div>
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground">
                  edu
                </span>
                <span className="text-foreground/90">info_systems</span>
              </div>
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground">
                  focus
                </span>
                <span className="text-[oklch(0.72_0.16_255)]">
                  web · ai · community
                </span>
              </div>
            </div>

            <div className="my-5 h-px w-full bg-white/8" />

            {/* stack chips */}
            <div className="flex flex-wrap gap-1.5">
              {[
                "React",
                "Next.js",
                "Node",
                "Figma",
                "Canva",
                "MongoDB",
                "Tailwind",
              ].map((s, i) => (
                <span
                  key={s}
                  className="cursor-pointer rounded-md bg-white/6 px-2 py-1 text-[11px] text-foreground/80 ring-1 ring-white/8 transition-all hover:bg-[oklch(0.62_0.2_255/0.2)] hover:ring-[oklch(0.62_0.2_255/0.4)] hover:scale-105"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Terminal hint */}
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-black/20 px-3 py-2 text-[10px] text-muted-foreground">
              <Terminal className="size-3" />
              <span>
                Press{" "}
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">
                  `
                </kbd>{" "}
                for terminal
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* explore cue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.9, duration: 0.7 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:flex"
      >
        <Link
          href="#explore"
          className="group flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll down to explore more"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all">
            Scroll down
          </span>
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5 transition-colors group-hover:border-white/25">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="grid size-3 place-items-center rounded-full bg-[oklch(0.62_0.2_255)] shadow-[0_0_18px_oklch(0.62_0.2_255/0.5)]"
            />
          </span>
          <ArrowDown className="size-3.5 animate-bounce text-[oklch(0.62_0.2_255)]" />
        </Link>
      </motion.div>
    </section>
  );
}
