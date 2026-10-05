"use client";

import { motion } from "framer-motion";
import { ExternalLink, Quote } from "lucide-react";
import { leadershipPillars, leadershipStats, socials } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { staggerContainer, staggerItem } from "./reveal";
import { AmbientGlow } from "./ambient-glow";
import { MangaPanel } from "./manga-panel";

export function PeakCraft() {
  return (
    <section id="peak-craft" className="relative overflow-hidden py-24 sm:py-32">
      <AmbientGlow color="bg-[#059669]/10" size="size-[30rem]" top="top-1/3" side="right" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Peak Craft Leadership"
          title={
            <>
              Leading the voice of a{" "}
              <span className="text-gradient-blue">tech community</span>
            </>
          }
          description="As Head of Public Relations, I turned a community's energy into a recognizable, trusted brand."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <MangaPanel index={0} left={true} className="p-7">
            <div className="absolute -right-8 -top-8 size-40 rounded-full bg-[#059669]/15 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/[0.06] px-3 py-1 text-xs text-foreground/80 ring-1 ring-black/10">
                <span className="size-1.5 rounded-full bg-[#111]" />
                Peak Craft · Hawassa University
              </span>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                Head of Public Relations
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                I owned how Peak Craft showed up in the world — from event
                campaigns to brand identity — and aligned every team around one
                clear voice.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {leadershipStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-black/[0.05] p-3 ring-1 ring-black/10"
                  >
                    <p className="text-base font-semibold text-gradient-blue">
                      {s.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-black/10 bg-black/[0.03] p-4">
                <Quote className="mt-0.5 size-4 shrink-0 text-[#111]" />
                <p className="text-sm italic leading-relaxed text-foreground/80">
                  "A community isn't built by one person — it's built
                  by one clear story, told consistently, by everyone."
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={socials.pcic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/live inline-flex items-center gap-2 rounded-xl bg-[#111] px-4 py-2.5 text-sm font-medium text-white  transition-all hover:bg-[#059669]"
                >
                  <ExternalLink className="size-4 transition-transform group-hover/live:translate-x-0.5" />
                  Live: pcic.tech
                </a>
                <a
                  href={socials.peakProjects}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-black/10"
                >
                  Peak Projects
                </a>
              </div>
            </div>
          </MangaPanel>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-3"
          >
            {leadershipPillars.map((p) => {
              const Icon = p.icon;
              return (
                <MangaPanel
                  key={p.title}
                  index={p.title}
                  left={false}
                  className="group flex items-start gap-4 p-5"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-black/[0.06] ring-1 ring-black/10 transition-colors group-hover:bg-[#059669]/15">
                    <Icon className="size-5 text-[#047857]" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold tracking-tight text-foreground">
                      {p.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                </MangaPanel>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}