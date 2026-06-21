"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles, MapPin } from "lucide-react";

const headline = [
  "Building",
  "Technology,",
  "Communities,",
  "and Digital",
  "Experiences.",
];

export function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute left-1/2 top-[-10%] size-[44rem] -translate-x-1/2 rounded-full bg-[oklch(0.62_0.2_255/0.22)] blur-[140px] animate-aurora" />
        <div className="absolute right-[-10%] top-[30%] size-[32rem] rounded-full bg-[oklch(0.72_0.16_200/0.16)] blur-[130px] animate-aurora [animation-delay:-6s]" />
        <div className="absolute left-[-8%] bottom-[-10%] size-[34rem] rounded-full bg-[oklch(0.6_0.2_290/0.12)] blur-[140px] animate-aurora [animation-delay:-12s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Left: copy */}
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-foreground/80"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Available for collaborations & freelance
          </motion.div>

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.2rem]">
            {headline.map((word, i) => (
              <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
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
            Information Systems student, web developer, designer, and PR leader
            transforming ideas into impactful digital products and communities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollTo("#projects")}
              className="group inline-flex items-center gap-2 rounded-xl bg-[oklch(0.62_0.2_255)] px-5 py-3 text-sm font-medium text-white shadow-[0_0_30px_-8px_oklch(0.62_0.2_255)] transition-all hover:shadow-[0_0_40px_-6px_oklch(0.62_0.2_255)] hover:brightness-110"
            >
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-medium text-foreground/90 transition-all hover:bg-white/10"
            >
              <Mail className="size-4" />
              Contact Me
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-[oklch(0.62_0.2_255)]" />
              Information Systems · Hawassa University
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-[oklch(0.62_0.2_255)]" />
              Head of PR · Peak Craft
            </span>
          </motion.div>
        </div>

        {/* Right: identity card */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 2.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm perspective-1000"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-[oklch(0.62_0.2_255/0.18)] blur-3xl" />
          <div className="animate-float-slow rounded-3xl glass-strong p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            {/* top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative grid size-12 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.7_0.18_255)] to-[oklch(0.5_0.2_290)] text-lg font-semibold text-white">
                  JN
                  <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-[oklch(0.11_0.008_264)] bg-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Jibril Nuredin
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Builder · Designer · Leader
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
              <div className="flex justify-between">
                <span className="text-muted-foreground">role</span>
                <span className="text-foreground/90">software_engineer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">edu</span>
                <span className="text-foreground/90">info_systems</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">lead</span>
                <span className="text-foreground/90">peak_craft.pr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">focus</span>
                <span className="text-[oklch(0.72_0.16_255)]">web · ai · community</span>
              </div>
            </div>

            <div className="my-5 h-px w-full bg-white/8" />

            {/* stack chips */}
            <div className="flex flex-wrap gap-1.5">
              {["React", "Next.js", "Node", "Figma", "MongoDB", "Tailwind"].map(
                (s) => (
                  <span
                    key={s}
                    className="rounded-md bg-white/6 px-2 py-1 text-[11px] text-foreground/80 ring-1 ring-white/8"
                  >
                    {s}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollTo("#journey")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.9, duration: 0.7 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground sm:flex"
        aria-label="Scroll to journey"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-[oklch(0.62_0.2_255)]"
          />
        </span>
      </motion.button>
    </section>
  );
}
