"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Award, Briefcase, Star, Heart, Lightbulb } from "lucide-react";

const timelineEvents = [
  {
    year: "2021",
    title: "The Beginning",
    description: "Discovered programming and realized technology could be a tool for impact.",
    icon: Lightbulb,
    category: "start",
  },
  {
    year: "2022",
    title: "First Web Projects",
    description: "Built my first websites, learning HTML, CSS, and JavaScript basics.",
    icon: Briefcase,
    category: "growth",
  },
  {
    year: "2023",
    title: "Peak Craft Journey",
    description: "Joined Peak Craft as a member, then designer, now Head of Public Relations.",
    icon: Heart,
    category: "community",
  },
  {
    year: "2024",
    title: "React & Next.js Mastery",
    description: "Deep dive into modern React, TypeScript, and the full-stack ecosystem.",
    icon: Star,
    category: "skills",
  },
  {
    year: "2025",
    title: "Information Systems Graduate",
    description: "Completing degree at Hawassa University with a focus on tech innovation.",
    icon: GraduationCap,
    category: "education",
  },
  {
    year: "Future",
    title: "Building What's Next",
    description: "Creating impactful digital products and growing African tech communities.",
    icon: Award,
    category: "future",
  },
];

const categoryColors: Record<string, string> = {
  start: "oklch(0.62_0.2_255)",
  growth: "oklch(0.7_0.17_162)",
  community: "oklch(0.77_0.19_70)",
  skills: "oklch(0.63_0.26_304)",
  education: "oklch(0.65_0.25_16)",
  future: "oklch(0.72_0.16_200)",
};

export function JourneyTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

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

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-[oklch(0.62_0.2_255/0.05)] blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

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
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLeft = index % 2 === 0;
              const color = categoryColors[event.category];

              return (
                <div
                  key={event.year}
                  data-timeline-item
                  className={`relative flex items-center ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  {/* Spacer for the other side */}
                  <div className={`w-1/2 ${isLeft ? "pr-12 text-right" : "pl-12 text-left"} hidden sm:block`} />

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className="relative size-5 rounded-full border-2 border-background"
                      style={{ backgroundColor: color }}
                    >
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-50"
                        style={{ backgroundColor: color }}
                      />
                    </motion.div>
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
                            {event.year}
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
