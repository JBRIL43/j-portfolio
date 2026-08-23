"use client";

import { useRef, useEffect, type ComponentType, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "./use-reduced-motion";
import { AmbientGlow } from "./ambient-glow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
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
  Origin: "oklch(0.62_0.2_255)",
  Foundations: "oklch(0.7_0.17_162)",
  Community: "oklch(0.77_0.19_70)",
  Leadership: "oklch(0.63_0.26_304)",
  Craft: "oklch(0.65_0.25_16)",
  Capstone: "oklch(0.72_0.16_200)",
  Graduation: "oklch(0.62_0.2_255)",
};

export function JourneyTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !timelineRef.current || !lineRef.current) return;

    const events = timelineRef.current.querySelectorAll<HTMLElement>("[data-timeline-item]");

    // Animate the central line
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
      }
    );

    // Animate each event
    events.forEach((event, index) => {
      const isLeft = index % 2 === 0;

      gsap.fromTo(
        event,
        {
          opacity: 0,
          x: isLeft ? -50 : 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: event,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [reduce]);

  // Parallax: background glow drifts opposite to scroll for depth
  useEffect(() => {
    if (reduce || !glowRef.current || !sectionRef.current) return;
    const section = sectionRef.current;
    const glow = glowRef.current;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const center = rect.top + rect.height / 2 - viewH / 2;
      glow.style.transform = `translate3d(0, ${center * -0.05}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  return (
    <section ref={sectionRef} id="timeline" className="relative overflow-hidden py-24 sm:py-32">
      {/* Parallax background effects */}
      <div ref={glowRef} className="pointer-events-none absolute inset-0 -z-10 will-change-transform">
        <div className="absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-[oklch(0.62_0.2_255/0.05)] blur-[150px]" />
        <div className="absolute left-[-10%] top-[40%] size-64 rounded-full bg-[oklch(0.72_0.16_200/0.04)] blur-[100px]" />
      </div>
      <AmbientGlow color="bg-[oklch(0.62_0.2_255/0.05)]" size="size-[40rem]" top="top-0" blur="blur-[150px]" />

      <div className="mx-auto max-w-4xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium tracking-wide text-foreground/80">
            <span className="size-1.5 rounded-full bg-[oklch(0.62_0.2_255)] shadow-[0_0_10px_oklch(0.62_0.2_255)]" />
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
        <div
          ref={timelineRef}
          className="relative"
        >
          {/* Central line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[oklch(0.62_0.2_255)] via-[oklch(0.78_0.16_220)] to-[oklch(0.72_0.16_200)] origin-top"
          />

          {/* Events */}
          <div className="space-y-16">
            {journey.map((event, index) => {
              const Icon = tagIcons[event.tag] || Star;
              const isLeft = index % 2 === 0;
              const color = tagColors[event.tag] || "oklch(0.62_0.2_255)";

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

                  {/* Content card */}
                  <div className={`w-1/2 ${isLeft ? "pl-12" : "pr-12"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="group relative overflow-hidden rounded-2xl glass p-5 transition-all hover:bg-white/[0.06]"
                    >
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
                    </motion.div>
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
            <Star className="size-4 text-[oklch(0.62_0.2_255)]" />
            <span className="text-sm text-muted-foreground">The story continues...</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
