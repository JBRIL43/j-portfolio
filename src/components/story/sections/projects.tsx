import Image from "next/image";
import { projects } from "@/lib/data/projects";
import { ChapterLabel, Panel } from "../manga";
import { ChapterSection } from "../chapter-section";
import { Protagonist } from "../protagonist";

export function Projects() {
  return (
    <ChapterSection id="projects" state="working" className="scroll-mt-[136px]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <ChapterLabel>Chapter 02 · Expeditions</ChapterLabel>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111] sm:text-3xl">
            Projects
          </h2>
          <p className="mt-1 max-w-xl text-sm text-[#555]">
            Real systems, shipped and in use. Each one a place I explored and
            built through.
          </p>
        </div>
        <Protagonist className="max-w-[110px] sm:max-w-[130px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => {
          const shot = project.screenshots?.[0];
          return (
            <Panel key={project.id} as="article" tilt={index % 2 ? "left" : "right"}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#999]">
                  Exp. {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#999]">
                  {project.year}
                </span>
              </div>

              {shot ? (
                <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden border-2 border-[#111] bg-[#f4f4f5]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top grayscale-[35%]"
                  />
                </div>
              ) : (
                <div
                  className="mb-4 flex aspect-[16/10] w-full items-center justify-center border-2 border-[#111] bg-[#111]"
                  aria-hidden
                >
                  <span className="font-[family-name:var(--font-story)] text-5xl text-white">
                    J.
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold text-[#111]">{project.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#444]">
                {project.tagline}
              </p>

              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="border border-[#111] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#111]"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-xs leading-relaxed text-[#666]">
                <span className="font-semibold text-[#111]">Result: </span>
                {project.impact}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 border-t-2 border-dotted border-[#ccc] pt-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#111] underline decoration-2 underline-offset-4 transition-colors duration-150 ease-in-out hover:text-[#059669] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#059669]"
                  >
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#111] underline decoration-2 underline-offset-4 transition-colors duration-150 ease-in-out hover:text-[#059669] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#059669]"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </Panel>
          );
        })}
      </div>
    </ChapterSection>
  );
}
