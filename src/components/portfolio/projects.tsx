"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Target, Lightbulb, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  projects,
  projectFilters,
  type Project,
  type ProjectCategory,
} from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function ProjectMockup({ project }: { project: Project }) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gradient-to-br",
        project.accent
      )}
    >
      <div className="absolute inset-0 dot-bg opacity-40" />
      {/* window chrome */}
      <div className="absolute left-3 top-3 flex gap-1.5">
        <span className="size-2 rounded-full bg-white/30" />
        <span className="size-2 rounded-full bg-white/30" />
        <span className="size-2 rounded-full bg-white/30" />
      </div>
      {/* abstract ui */}
      <div className="absolute inset-x-4 bottom-4 top-9 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 rounded-full bg-white/40" />
          <div className="h-2 w-8 rounded-full bg-white/20" />
          <div className="ml-auto h-5 w-16 rounded-md bg-white/15" />
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2">
          <div className="col-span-2 rounded-lg bg-white/10 p-2">
            <div className="h-2 w-1/2 rounded-full bg-white/30" />
            <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/15" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/15" />
            <div className="mt-3 flex gap-1.5">
              <div className="h-4 w-12 rounded bg-[oklch(0.62_0.2_255/0.6)]" />
              <div className="h-4 w-10 rounded bg-white/15" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex-1 rounded-lg bg-white/10 p-2">
              <div className="h-1.5 w-2/3 rounded-full bg-white/25" />
              <div className="mt-2 h-6 rounded bg-white/15" />
            </div>
            <div className="flex-1 rounded-lg bg-white/10 p-2">
              <div className="h-1.5 w-1/2 rounded-full bg-white/25" />
              <div className="mt-2 h-6 rounded bg-[oklch(0.62_0.2_255/0.4)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/8"
    >
      <div className="p-3">
        <ProjectMockup project={project} />
      </div>
      <div className="flex flex-1 flex-col p-5 pt-1">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-md bg-white/6 px-2 py-0.5 text-[11px] font-medium text-foreground/70 ring-1 ring-white/8">
            {project.category}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {project.year}
          </span>
        </div>
        <h3 className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground">
          {project.name}
          <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[oklch(0.78_0.14_255)]" />
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground ring-1 ring-white/8"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 border-t border-white/8 pt-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <p className="text-sm font-semibold text-foreground">{m.value}</p>
              <p className="text-[11px] text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 size-[36rem] -translate-x-1/2 rounded-full bg-[oklch(0.62_0.2_255/0.08)] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Featured Projects"
          title={
            <>
              Selected work, built with{" "}
              <span className="text-gradient-blue">intent</span>
            </>
          }
          description="Each project is a case study in solving a real problem — from community platforms to AI-assisted tools."
        />

        {/* filters */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                filter === f
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-[oklch(0.62_0.2_255)] shadow-[0_0_20px_-6px_oklch(0.62_0.2_255)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpen={() => setSelected(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[88vh] overflow-y-auto border-white/10 bg-[oklch(0.1_0.008_264)] p-0 sm:max-w-2xl">
          {selected && (
            <>
              <div className="p-4 pb-0">
                <ProjectMockup project={selected} />
              </div>
              <DialogHeader className="px-6 pt-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[oklch(0.62_0.2_255/0.16)] px-2 py-0.5 text-[11px] font-medium text-[oklch(0.78_0.14_255)] ring-1 ring-[oklch(0.62_0.2_255/0.25)]">
                    {selected.category}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {selected.year}
                  </span>
                </div>
                <DialogTitle className="text-xl text-foreground">
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  {selected.tagline}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-5 px-6 pb-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl glass p-4">
                    <div className="mb-1.5 flex items-center gap-2 text-[oklch(0.78_0.14_255)]">
                      <Target className="size-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Problem
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {selected.problem}
                    </p>
                  </div>
                  <div className="rounded-xl glass p-4">
                    <div className="mb-1.5 flex items-center gap-2 text-[oklch(0.78_0.14_255)]">
                      <Lightbulb className="size-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Solution
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {selected.solution}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl glass p-4">
                  <div className="mb-1.5 flex items-center gap-2 text-[oklch(0.78_0.14_255)]">
                    <TrendingUp className="size-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">
                      Impact
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {selected.impact}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/6 px-2.5 py-1 text-xs text-foreground/80 ring-1 ring-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
