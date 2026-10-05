"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  ExternalLink,
  Github,
  Send,
  Target,
  Lightbulb,
  TrendingUp,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import {
  projects,
  projectFilters,
  type Project,
  type ProjectCategory,
} from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { FilterPills } from "./filter-pills";
import { AmbientGlow } from "./ambient-glow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SmartImage } from "./smart-image";
import { cn } from "@/lib/utils";
import { MangaPanel } from "./manga-panel";

function ProjectMockup() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#ecece6]">
      <div className="absolute left-3 top-3 flex gap-1.5">
        <span className="size-2 rounded-full bg-black/25" />
        <span className="size-2 rounded-full bg-black/25" />
        <span className="size-2 rounded-full bg-black/25" />
      </div>
      <div className="absolute inset-x-4 bottom-4 top-9 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 rounded-full bg-black/45" />
          <div className="h-2 w-8 rounded-full bg-black/25" />
          <div className="ml-auto h-5 w-16 rounded-md bg-black/20" />
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2">
          <div className="col-span-2 rounded-lg bg-black/[0.07] p-2">
            <div className="h-2 w-1/2 rounded-full bg-black/35" />
            <div className="mt-2 h-1.5 w-3/4 rounded-full bg-black/20" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-black/20" />
            <div className="mt-3 flex gap-1.5">
              <div className="h-4 w-12 rounded bg-[#111]/70" />
              <div className="h-4 w-10 rounded bg-black/20" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex-1 rounded-lg bg-black/[0.07] p-2">
              <div className="h-1.5 w-2/3 rounded-full bg-black/30" />
              <div className="mt-2 h-6 rounded bg-black/20" />
            </div>
            <div className="flex-1 rounded-lg bg-black/[0.07] p-2">
              <div className="h-1.5 w-1/2 rounded-full bg-black/30" />
              <div className="mt-2 h-6 rounded bg-[#111]/45" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectThumbnail({ project }: { project: Project }) {
  const shot = project.screenshots?.[0];
  if (shot) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-black/10">
        <SmartImage
          src={shot.src}
          alt={shot.alt}
          imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {project.liveUrl && (
          <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-[0_0_14px_-2px_#059669]">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/80" />
              <span className="relative inline-flex size-1.5 rounded-full bg-white" />
            </span>
            Live
          </span>
        )}
      </div>
    );
  }
  return <ProjectMockup />;
}

function ScreenshotGallery({ project }: { project: Project }) {
  const shots = project.screenshots ?? [];
  const [idx, setIdx] = useState(0);
  if (shots.length === 0) {
    return (
      <div className="p-4 pb-0">
        <ProjectMockup />
      </div>
    );
  }
  const active = shots[idx] ?? shots[0];
  return (
    <div className="p-4 pb-0">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-black/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.src}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <SmartImage src={active.src} alt={active.alt} />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
          <p className="text-xs text-white/85">{active.caption}</p>
        </div>
      </div>
      {shots.length > 1 && (
        <div className="mt-3 flex gap-2">
          {shots.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setIdx(i)}
              aria-label={`View screenshot ${i + 1}: ${s.caption}`}
              className={cn(
                "relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg ring-1 transition-all",
                i === idx
                  ? "ring-[#111] opacity-100"
                  : "ring-black/10 opacity-60 hover:opacity-100"
              )}
            >
              <SmartImage
                src={s.src}
                alt={s.alt}
                imgClassName="object-contain p-0.5"
              />
            </button>
          ))}
        </div>
      )}
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
    <MangaPanel index={project.id} left={project.id % 2 === 0} className="group h-full cursor-pointer">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={onOpen}
        className="relative flex h-full flex-col cursor-pointer"
      >
        <div className="relative p-3">
          <ProjectThumbnail project={project} />
        </div>
        <div className="relative flex flex-1 flex-col p-5 pt-1">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-md bg-black/[0.06] px-2 py-0.5 text-[11px] font-medium text-foreground/70 ring-1 ring-black/10">
              {project.category}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>
          <h3 className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground">
            {project.name}
            <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#059669]" />
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{project.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md bg-black/[0.05] px-2 py-0.5 text-[11px] text-muted-foreground ring-1 ring-black/10"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 border-t border-black/10 pt-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-sm font-semibold text-foreground">{m.value}</p>
                <p className="text-[11px] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </MangaPanel>
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
      <AmbientGlow top="top-1/4" />

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

        <FilterPills
          options={projectFilters}
          value={filter}
          onChange={setFilter}
          layoutId="project-filter"
        />

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
        <DialogContent className="max-h-[88vh] overflow-y-auto border-2 border-[#111] bg-white p-0 sm:max-w-2xl">
          {selected && (
            <>
              <ScreenshotGallery project={selected} key={selected.id} />
              <DialogHeader className="px-6 pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#059669]/10 px-2 py-0.5 text-[11px] font-medium text-[#047857] ring-1 ring-[#059669]/30">
                    {selected.category}
                  </span>
                  {selected.featured && (
                    <span className="rounded-md bg-[#059669]/12 px-2 py-0.5 text-[11px] font-medium text-[#047857] ring-1 ring-[#059669]/30">
                      Featured
                    </span>
                  )}
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
                    <div className="mb-1.5 flex items-center gap-2 text-[#111]">
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
                    <div className="mb-1.5 flex items-center gap-2 text-[#111]">
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
                  <div className="mb-1.5 flex items-center gap-2 text-[#111]">
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
                        className="rounded-md bg-black/[0.06] px-2.5 py-1 text-xs text-foreground/80 ring-1 ring-black/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {(selected.liveUrl || selected.repoUrl) && (
                  <div className="flex flex-wrap items-center gap-3">
                    {selected.liveUrl && (
                      <a
                        href={selected.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center justify-center gap-2 rounded-xl bg-[#111] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#059669]"
                      >
                        <ExternalLink className="size-4 transition-transform group-hover/link:translate-x-0.5" />
                        Visit live site
                        <span className="font-mono text-xs text-white/70">
                          {selected.liveUrl.replace(/^https?:\/\//, "")}
                        </span>
                      </a>
                    )}
                    {selected.repoUrl && (
                      <a
                        href={selected.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/repo inline-flex items-center justify-center gap-2 rounded-xl glass px-5 py-3 text-sm font-medium text-foreground/90 transition-colors hover:bg-black/10"
                      >
                        <Github className="size-4 transition-transform group-hover/repo:scale-110" />
                        View source
                      </a>
                    )}
                  </div>
                )}

                {selected.channels && selected.channels.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Channels
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {selected.channels.map((c) => {
                        const Icon =
                          c.icon === "youtube" ? Youtube : Send;
                        const soon = c.status === "coming-soon";
                        const base =
                          "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all";
                        if (soon) {
                          return (
                            <span
                              key={c.label}
                              aria-disabled="true"
                              className={cn(
                                base,
                                "cursor-not-allowed border border-dashed border-black/25 bg-black/[0.03] text-muted-foreground"
                              )}
                            >
                              <Icon className="size-4" />
                              {c.label}
                              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-amber-500/12 px-2 py-0.5 text-[10px] font-semibold text-[#b45309] ring-1 ring-amber-600/30">
                                <Clock className="size-2.5" />
                                Coming soon
                              </span>
                            </span>
                          );
                        }
                        return (
                          <a
                            key={c.label}
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              base,
                              c.icon === "youtube"
                                ? "bg-red-600/90 text-white hover:brightness-110"
                                : "bg-sky-500/90 text-white hover:brightness-110"
                            )}
                          >
                            <Icon className="size-4" />
                            {c.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}