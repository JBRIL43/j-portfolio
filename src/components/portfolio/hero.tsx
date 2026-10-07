"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
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

const headline = [
  "Building",
  "Technology,",
  "Communities,",
  "and Digital",
  "Experiences.",
];

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

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

        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      };

      const handleMouseLeave = () => {
        btn.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
        btn.style.transform = "translate(0, 0)";
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  // Framer Motion scroll progress for top progress bar
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Top progress bar update
  useEffect(() => {
    if (!scrollProgressRef.current) return;

    const unsubscribe = heroScrollProgress.on("change", (latest) => {
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${latest})`;
      }
    });

    return () => unsubscribe();
  }, [heroScrollProgress]);

  // Smooth parallax without SSR window access
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const gridParallaxY = useTransform(scrollY, [0, 800], [0, -30]);
  const blob1ParallaxY = useTransform(scrollY, [0, 800], [0, 40]);
  const blob2ParallaxY = useTransform(scrollY, [0, 800], [0, 60]);
  const blob3ParallaxY = useTransform(scrollY, [0, 800], [0, 80]);

  // Smooth cursor-following tilt
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  const rotateY = useSpring(useTransform(mvX, [-1, 1], [6, -6]), { stiffness: 200, damping: 25, mass: 0.5 });
  const rotateX = useSpring(useTransform(mvY, [-1, 1], [-6, 6]), { stiffness: 200, damping: 25, mass: 0.5 });
  const shiftX = useSpring(useTransform(mvX, [-1, 1], [-3, 3]), { stiffness: 150, damping: 20, mass: 0.5 });
  const shiftY = useSpring(useTransform(mvY, [-1, 1], [-3, 3]), { stiffness: 150, damping: 20, mass: 0.5 });

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mvX.set(px * 2 - 1);
    mvY.set(py * 2 - 1);

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
      {/* Top Scroll Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/10 z-20">
        <div
          ref={scrollProgressRef}
          className="h-full origin-left scale-x-0 bg-[#111] transition-transform duration-75"
        />
      </div>

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ y: reduce ? 0 : gridParallaxY }}
          className="absolute inset-0 grid-bg mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <motion.div
          style={{ y: reduce ? 0 : blob1ParallaxY }}
          className="absolute left-1/2 top-[-10%] size-176 -translate-x-1/2 rounded-full bg-[#059669]/10 blur-[120px] animate-aurora"
        />
        <motion.div
          style={{ y: reduce ? 0 : blob2ParallaxY }}
          className="absolute right-[-10%] top-[30%] size-128 rounded-full bg-[#059669]/6 blur-[110px] animate-aurora [animation-delay:-6s]"
        />
        <motion.div
          style={{ y: reduce ? 0 : blob3ParallaxY }}
          className="absolute left-[-8%] bottom-[-10%] size-136 rounded-full bg-[#111]/5 blur-[120px] animate-aurora [animation-delay:-12s]"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-background to-transparent" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Left: copy */}
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    delay: 0.15 + i * 0.05,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={
                    word === "Digital" || word === "Experiences."
                      ? "inline-block text-gradient-blue"
                      : "inline-block text-gradient"
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Full-Stack Developer · AI Engineering Enthusiast · Community Builder. Information Systems graduate from Hawassa University, building practical digital products from idea to implementation. I enjoy turning real-world problems into useful software, from full management systems and campus applications to web experiences and community-driven projects. Currently focused on growing as a Full-Stack Developer while exploring the next chapter of my journey into AI Engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              ref={cta1Ref}
              href="/projects"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-[#111] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#059669] cursor-pointer"
            >
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              ref={cta2Ref}
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-medium text-foreground/90 transition-all hover:bg-black/10 cursor-pointer"
            >
              <Mail className="size-4" />
              Contact Me
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5 group cursor-pointer">
              <Sparkles className="size-3.5 text-[#111] group-hover:rotate-12 transition-transform duration-300" />
              Information Systems · Hawassa University
            </span>
            <span className="hidden h-3 w-px bg-black/15 sm:block" />
            <span className="inline-flex items-center gap-1.5 group cursor-pointer">
              <MapPin className="size-3.5 text-[#111] group-hover:scale-125 transition-transform duration-300" />
              Head of PR · Peak Craft
            </span>
            <span className="hidden h-3 w-px bg-black/15 sm:block" />
            <span className="inline-flex items-center gap-1.5 group cursor-pointer">
              <PenTool className="size-3.5 text-[#111] group-hover:-rotate-12 transition-transform duration-300" />
              SMM · Content Creator
            </span>
          </motion.div>
        </div>

        {/* Right: identity card — follows cursor gently */}
        <motion.div
          ref={cardRef}
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            rotateX: reduce ? 0 : rotateX,
            rotateY: reduce ? 0 : rotateY,
            x: reduce ? 0 : shiftX,
            y: reduce ? 0 : shiftY,
            transformPerspective: 1000,
          }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-[#059669]/10 blur-2xl" />
          <div
            data-card-glare
            className="group relative overflow-hidden rounded-3xl glass-strong p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] border border-[#111]/15"
          >
            {/* cursor-following glare */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgb(5 150 105 / 0.16), transparent 60%)",
              }}
            />
            {/* top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative size-12 shrink-0">
                  {/* Manga-style B&W Avatar */}
                  <div className="relative size-12 rounded-xl overflow-hidden ring-2 ring-[#111]">
                    <img
                      src="/avatar.png"
                      alt="Jibril Nuredin avatar"
                      className="size-full object-cover"
                      style={{
                        filter: "grayscale(100%) contrast(160%) brightness(105%)",
                      }}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-white bg-emerald-400 animate-pulse" />
                  </div>
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
              <span className="rounded-full bg-black/8 px-2.5 py-1 text-[10px] font-medium text-foreground/70 font-mono">
                v2025
              </span>
            </div>

            <div className="my-5 h-px w-full bg-black/10" />

            {/* meta lines */}
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground duration-200">
                  role
                </span>
                <span className="text-foreground/90 font-medium">software_engineer</span>
              </div>
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground duration-200">
                  pr
                </span>
                <span className="text-foreground/90 font-medium">peak_craft.head</span>
              </div>
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground duration-200">
                  smm
                </span>
                <span className="text-foreground/90 font-medium">social_media_mgr</span>
              </div>
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground duration-200">
                  content
                </span>
                <span className="text-foreground/90 font-medium">creator</span>
              </div>
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground duration-200">
                  edu
                </span>
                <span className="text-foreground/90 font-medium">info_systems</span>
              </div>
              <div className="flex justify-between group/meta cursor-pointer">
                <span className="text-muted-foreground transition-colors group-hover/meta:text-foreground duration-200">
                  focus
                </span>
                <span className="text-[#059669] font-medium">
                  web · ai · community
                </span>
              </div>
            </div>

            <div className="my-5 h-px w-full bg-black/10" />

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
              ].map((s) => (
                <span
                  key={s}
                  className="cursor-pointer rounded-md bg-black/[0.06] px-2 py-1 text-[11px] text-foreground/80 ring-1 ring-black/10 transition-all duration-200 hover:bg-[#059669]/15 hover:ring-[#059669]/40 hover:scale-105"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Terminal hint */}
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-black/[0.06] px-3 py-2 text-[10px] text-muted-foreground">
              <Terminal className="size-3" />
              <span>
                Press{" "}
                <kbd className="rounded bg-black/10 px-1.5 py-0.5 font-mono">
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:flex"
      >
        <Link
          href="#journey"
          className="group flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll down to the journey"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all duration-200 font-mono">
            Scroll down
          </span>
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-black/25 p-1.5 transition-colors duration-200 group-hover:border-black/50">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="grid size-3 place-items-center rounded-full bg-[#111]"
            />
          </span>
          <ArrowDown className="size-3.5 animate-bounce text-[#111]" />
        </Link>
      </motion.div>
    </section>
  );
}