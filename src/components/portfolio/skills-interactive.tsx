"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { skillCategories } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { useReducedMotion } from "./use-reduced-motion";
import { AmbientGlow } from "./ambient-glow";
import { MangaPanel } from "./manga-panel";
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
  Bot,
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
  { name: "React", icon: "Code2", category: "frontend" },
  { name: "Next.js", icon: "Code2", category: "frontend" },
  { name: "TypeScript", icon: "Code2", category: "frontend" },
  { name: "Node.js", icon: "Database", category: "backend" },
  { name: "MongoDB", icon: "Database", category: "backend" },
  { name: "PostgreSQL", icon: "Database", category: "backend" },
  { name: "Tailwind", icon: "Palette", category: "frontend" },
  { name: "Figma", icon: "Palette", category: "design" },
  { name: "Canva", icon: "FileImage", category: "design" },
  { name: "Linux", icon: "Terminal", category: "tools" },
  { name: "Git", icon: "Settings", category: "tools" },
  { name: "AI/ML", icon: "Bot", category: "ai" },
];

export function SkillsInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section ref={sectionRef} id="skills" className="relative overflow-hidden py-24 sm:py-32">
      {/* Parallax ambient effects - using CSS transform instead of scroll listener */}
      <div ref={glowRef} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-20%] top-[20%] size-96 rounded-full bg-[#059669]/6 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[10%] size-80 rounded-full bg-[#059669]/7 blur-[100px]" />
      </div>
      <AmbientGlow size="size-96" top="top-[20%]" side="right" className="left-auto right-[-20%]" />
      <AmbientGlow color="bg-[#059669]/7" size="size-80" top="bottom-[10%]" side="left" blur="blur-[100px]" className="left-[-10%] bottom-[10%]" />

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

        {/* Tool Cards Grid - using Framer Motion's whileInView */}
        <motion.div
          ref={containerRef}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {toolCards.map((tool, idx) => {
            const Icon = iconMap[tool.icon] || Code2;
            const isHovered = hoveredTool === tool.name;

            return (
              <MangaPanel
                key={tool.name}
                index={idx}
                left={idx % 2 === 0}
                data-tool-card
                onMouseEnter={() => setHoveredTool(tool.name)}
                onMouseLeave={() => setHoveredTool(null)}
                className="group cursor-pointer"
              >
                <div
                  className={`
                    relative overflow-hidden rounded-2xl border border-black/10
                    bg-black/[0.03] p-4 transition-all duration-500
                    ${isHovered ? "bg-black/[0.06] border-[#059669]/35" : ""}
                  `}
                  style={{
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className={`
                      absolute inset-0 opacity-0 transition-opacity duration-500
                      ${isHovered ? "opacity-100" : ""}
                    `}
                    style={{
                      background: `radial-gradient(circle at 50% 0%, #05966920 0%, transparent 60%)`,
                    }}
                  />

                  {/* Icon */}
                  <div className="relative mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.05] group-hover:bg-black/[0.08] transition-colors">
                    <Icon
                      className="size-5 transition-transform duration-300"
                      style={{
                        color: tool.color,
                        transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
                      }}
                    />
                  </div>

                  {/* Name */}
                  <motion.p
                    className={`
                      relative text-sm font-medium transition-colors duration-300
                      ${isHovered ? "text-foreground" : "text-foreground/80"}
                    `}
                  >
                    {tool.name}
                  </motion.p>

                  {/* Category tag */}
                  <p className="relative mt-1 text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                    {tool.category}
                  </p>

                  {/* Decorative corner */}
                  <motion.div
                    className={`
                      absolute top-0 right-0 size-8 opacity-0 transition-opacity duration-300
                      ${isHovered ? "opacity-100" : ""}
                    `}
                  >
                    <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#111]" />
                  </motion.div>
                </div>
              </MangaPanel>
            );
          })}
        </motion.div>

        {/* Additional skills text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <MangaPanel index={0} left={true} className="mt-16 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#059669]/15">
                  <Sparkles className="size-6 text-[#111]" />
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
                        className="rounded-full bg-black/[0.05] px-3 py-1 text-xs text-muted-foreground border border-black/10"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </MangaPanel>
        </motion.div>
      </div>
    </section>
  );
}