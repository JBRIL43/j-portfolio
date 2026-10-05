"use client";

import { motion } from "framer-motion";
import { visionStats } from "@/lib/portfolio-data";
import { Reveal } from "./reveal";
import { MangaPanel } from "./manga-panel";

export function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#059669]/12 blur-[140px]" />
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium tracking-wide text-foreground/80">
            <span className="size-1.5 rounded-full bg-[#111]" />
            The Vision
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <blockquote className="text-center text-3xl font-semibold leading-[1.2] tracking-tight text-balance sm:text-4xl md:text-5xl">
            <span className="text-gradient">I aim to build</span>{" "}
            <span className="text-gradient-blue">products, communities,</span>{" "}
            <span className="text-gradient">and businesses that create</span>{" "}
            <span className="text-gradient-blue">meaningful impact</span>{" "}
            <span className="text-gradient">
              across Africa and beyond.
            </span>
          </blockquote>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
            This portfolio isn't a job application — it's a progress
            report on a long journey. Technology is the tool. Community is the
            engine. Impact is the destination.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {visionStats.map((s, idx) => (
              <MangaPanel key={s.label} index={idx} left={idx % 2 === 0} className="p-5 text-center">
                <p className="text-sm font-semibold text-gradient-blue">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </MangaPanel>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-2xl glass-strong px-6 py-4"
          >
            <span className="font-mono text-xs text-muted-foreground">
              status:
            </span>
            <span className="text-sm font-medium text-foreground">
              Building in public · always learning
            </span>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}