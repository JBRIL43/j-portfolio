"use client";

import { useRef, type ComponentType, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "./use-reduced-motion";
import { AmbientGlow } from "./ambient-glow";
import { MangaPanel } from "./manga-panel";
import { GraduationCap, Award, Briefcase, Star, Heart, Lightbulb, Rocket, Code, Users } from "lucide-react";
import { journey } from "@/lib/data/journey";

const tagIcons: Record<string, ComponentType<{ className?: string; style?: CSSProperties }>> = {
  Origin: Lightbulb,
  Foundations: Code,
  Community: Users,
  Leadership: Heart,
  Craft: Briefcase,
  Capstone: Rocket,
  Graduation: GraduationCap,
};

const tagColors: Record<string, string> = {
  Origin: "#1d4ed8",
  Foundations: "#047857",
  Community: "#b45309",
  Leadership: "#6d28d9",
  Craft: "#c2410c",
  Capstone: "#0e7490",
  Graduation: "#1d4ed8",
};

export function JourneyTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Line animation using Framer Motion's useScroll
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 70%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-[#059669]/6 blur-[150px]" />
        <div className="absolute left-[-10%] top-[40%] size-64 rounded-full bg-[#059669]/5 blur-[100px]" />
      </div>
      <AmbientGlow color="bg-[#059669]/6" size="size-[40rem]" top="top-0" blur="blur-[150px]" />

      <div className="mx-auto max-w-4xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium tracking-wide text-foreground/80">
            <span className="size-1.5 rounded-full bg-[#111]" />
            The Journey
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
            From first code to impact
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted-foreground mx-auto">
            A timeline of growth, learning, and building communities across Africa.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Central line with Framer Motion scroll animation */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-[#111] via-[#333] to-[#111] sm:left-1/2 sm:-translate-x-1/2"
          />

          {/* Events */}
          <div className="space-y-16">
            {journey.map((event, index) => {
              const Icon = tagIcons[event.tag] || Star;
              const isLeft = index % 2 === 0;
              const color = tagColors[event.tag] || "#1d4ed8";

              return (
                <div
                  key={`${event.year}-${event.tag}`}
                  data-timeline-item
                  className={`relative flex items-center ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  {/* Spacer for the other side */}
                  <div className={`w-1/2 ${isLeft ? "pr-12 text-right" : "pl-12 text-left"} hidden sm:block`} />

                  {/* Center avatar milestone */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="relative size-12 rounded-full border-2 border-background overflow-hidden shadow-lg"
                      style={{ boxShadow: `0 0 20px ${color}40` }}
                    >
                      <img
                        src="/avatar.png"
                        alt={event.title}
                        className="size-full object-cover"
                      />
                      {/* Category color ring overlay */}
                      <div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: color, boxShadow: `inset 0 0 12px ${color}30` }}
                      />
                    </motion.div>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="absolute size-12 rounded-full animate-ping opacity-30"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </div>

                  {/* Content card - Manga Panel */}
                  <div className={`w-1/2 ${isLeft ? "pl-12" : "pr-12"}`}>
                    <MangaPanel index={index} left={isLeft} className="group p-5">
                      {/* Accent glow */}
                      <div
                        className="absolute -right-8 -top-8 size-24 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-30"
                        style={{ backgroundColor: color }}
                      />

                      <div className="relative">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-xs font-mono px-2 py-0.5 rounded-md"
                            style={{
                              backgroundColor: `${color}20`,
                              color: color,
                            }}
                          >
                            {event.tag}
                          </span>
                          <Icon
                            className="size-4 transition-transform group-hover:rotate-12"
                            style={{ color }}
                          />
                        </div>
                        <h3 className="text-base font-semibold text-foreground">
                          {event.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </MangaPanel>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* End marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-2 rounded-full glass px-4 py-2">
            <Star className="size-4 text-[#111]" />
            <span className="text-sm text-muted-foreground">The story continues...</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}