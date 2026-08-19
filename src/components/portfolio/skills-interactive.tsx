"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { skillCategories } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { useReducedMotion } from "./use-reduced-motion";
import { AmbientGlow } from "./ambient-glow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import {
  Code2,
  Database,
  Palette,
  Settings,
  Cpu,
  Sparkles,
  Terminal,
  FileImage,
  PenTool,
  Bot
} from "lucide-react";

const iconMap: Record<string, any> = {
  Code2,
  Database,
  Palette,
  Settings,
  Cpu,
  Sparkles,
  Terminal,
  FileImage,
  PenTool,
  Bot,
};

const toolCards = [
  { name: "React", icon: "Code2", color: "#61DAFB", category: "frontend" },
  { name: "Next.js", icon: "Code2", color: "#000000", category: "frontend" },
  { name: "TypeScript", icon: "Code2", color: "#3178C6", category: "frontend" },
  { name: "Node.js", icon: "Database", color: "#339933", category: "backend" },
  { name: "MongoDB", icon: "Database", color: "#47A248", category: "backend" },
  { name: "PostgreSQL", icon: "Database", color: "#336791", category: "backend" },
  { name: "Tailwind", icon: "Palette", color: "#06B6D4", category: "frontend" },
  { name: "Figma", icon: "Palette", color: "#F24E1E", category: "design" },
  { name: "Canva", icon: "FileImage", color: "#00C4CC", category: "design" },
  { name: "Linux", icon: "Terminal", color: "#FCC624", category: "tools" },
  { name: "Git", icon: "Settings", color: "#F05032", category: "tools" },
  { name: "AI/ML", icon: "Bot", color: "#9333EA", category: "ai" },
];

export function SkillsInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const reduce = useReducedMotion();

  // Animate cards on scroll
  useEffect(() => {
    if (reduce || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll<HTMLElement>("[data-tool-card]");

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, [reduce]);

  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32">
      {/* Ambient effects */}
      <AmbientGlow size="size-96" top="top-[20%]" side="right" className="left-auto right-[-20%]" />
      <AmbientGlow color="bg-[oklch(0.78_0.16_220/0.06)]" size="size-80" top="bottom-[10%]" side="left" blur="blur-[100px]" className="left-[-10%] bottom-[10%]" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Tools & Technologies"
          title={
            <>
              The workshop{" "}
              <span className="text-gradient-blue">equipment</span>
            </>
          }
          description="Tools I use to bring ideas to life. Each one mastered through countless hours of building."
        />

        {/* Tool Cards Grid */}
        <div
          ref={containerRef}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {toolCards.map((tool) => {
            const Icon = iconMap[tool.icon] || Code2;
            const isHovered = hoveredTool === tool.name;

            return (
              <motion.div
                key={tool.name}
                data-tool-card
                onMouseEnter={() => setHoveredTool(tool.name)}
                onMouseLeave={() => setHoveredTool(null)}
                className="group relative cursor-pointer"
              >
                {/* Card */}
                <div
                  className={`
                    relative overflow-hidden rounded-2xl border border-white/5
                    bg-white/[0.02] p-4 transition-all duration-500
                    ${isHovered ? "bg-white/[0.06] border-[oklch(0.62_0.2_255/0.3)]" : ""}
                  `}
                  style={{
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {/* Glow effect on hover */}
                  <div
                    className={`
                      absolute inset-0 opacity-0 transition-opacity duration-500
                      ${isHovered ? "opacity-100" : ""}
                    `}
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${tool.color}20 0%, transparent 60%)`,
                    }}
                  />

                  {/* Icon */}
                  <div className="relative mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] group-hover:bg-white/[0.08] transition-colors">
                    <Icon
                      className="size-5 transition-transform duration-300"
                      style={{
                        color: tool.color,
                        transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
                      }}
                    />
                  </div>

                  {/* Name */}
                  <p className={`
                    relative text-sm font-medium transition-colors duration-300
                    ${isHovered ? "text-foreground" : "text-foreground/80"}
                  `}>
                    {tool.name}
                  </p>

                  {/* Category tag */}
                  <p className="relative mt-1 text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                    {tool.category}
                  </p>

                  {/* Decorative corner */}
                  <div className={`
                    absolute top-0 right-0 size-8 opacity-0 transition-opacity duration-300
                    ${isHovered ? "opacity-100" : ""}
                  `}>
                    <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[oklch(0.62_0.2_255)]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional skills text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.62_0.2_255/0.15)]">
                <Sparkles className="size-6 text-[oklch(0.62_0.2_255)]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Beyond the Stack</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Technology is just the tool. What truly matters is understanding people,
                communities, and problems. I combine technical skills with community building,
                content creation, and strategic thinking to create meaningful impact.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Community Building", "Content Creation", "Social Media", "Public Relations", "AI Integration", "Problem Solving"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground border border-white/5"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
