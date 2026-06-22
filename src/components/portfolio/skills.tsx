"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { skillCategories } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt";
import { cn } from "@/lib/utils";

export function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const active =
    skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Technical Skills"
          title={
            <>
              The toolkit behind the{" "}
              <span className="text-gradient-blue">craft</span>
            </>
          }
          description="A fluent, evolving stack — from frontend interfaces to backend systems and the tools that tie them together."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Category tabs */}
          <div className="flex flex-row gap-2 lg:flex-col">
            {skillCategories.map((cat) => {
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveId(cat.id)}
                  className={cn(
                    "group relative flex-1 overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 lg:flex-none",
                    isActive
                      ? "glass-strong ring-1 ring-[oklch(0.62_0.2_255/0.3)]"
                      : "glass hover:bg-white/8"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skill-active"
                      className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[oklch(0.7_0.18_255)] to-[oklch(0.6_0.2_290)]"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground sm:text-base">
                      {cat.label}
                    </h3>
                    <span
                      className={cn(
                        "font-mono text-xs transition-colors",
                        isActive
                          ? "text-[oklch(0.78_0.14_255)]"
                          : "text-muted-foreground"
                      )}
                    >
                      {cat.skills.length}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-1 hidden text-xs leading-relaxed transition-all sm:block",
                      isActive ? "text-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {cat.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Skill bars */}
          <TiltCard className="group relative overflow-hidden rounded-2xl glass p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[oklch(0.62_0.2_255/0.12)] blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative space-y-5"
              >
                {active.skills.map((skill, i) => (
                  <div key={skill.name} className="group">
                    <div className="mb-2 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                          {skill.note}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[oklch(0.78_0.14_255)]">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/6">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1,
                          delay: 0.1 + i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.18_255)] to-[oklch(0.6_0.2_290)]"
                      >
                        <span className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_oklch(0.62_0.2_255)]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
