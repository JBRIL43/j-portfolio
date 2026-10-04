import { journey } from "@/lib/data/journey";
import { ChapterLabel, NarrationBox, Panel } from "../manga";
import { ChapterSection } from "../chapter-section";
import { Protagonist } from "../protagonist";

const pathStages = ["Learning", "Building", "Experience", "Growth", "AI"];

export function Experience() {
  return (
    <ChapterSection id="experience" state="walking" className="scroll-mt-[136px]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <ChapterLabel>Chapter 03 · The Path</ChapterLabel>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111] sm:text-3xl">
            Experience
          </h2>
          <p className="mt-1 max-w-xl text-sm text-[#555]">
            The career path so far, chapter by chapter.
          </p>
        </div>
        <Protagonist className="max-w-[110px] sm:max-w-[130px]" />
      </div>

      <ol className="relative ml-3 border-l-[3px] border-[#111] pl-6 sm:ml-4 sm:pl-8">
        {journey.map((step, index) => (
          <li key={`${step.year}-${step.title}`} className="mb-6 last:mb-0">
            <span
              aria-hidden
              className="absolute -left-[11px] mt-1.5 h-4 w-4 border-[3px] border-[#111] bg-[#fafaf8]"
            />
            <Panel as="article" tilt={index % 2 ? "right" : "left"}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#111] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  Chapter {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs font-semibold text-[#777]">
                  {step.year}
                </span>
                <span className="border border-[#111] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#111]">
                  {step.tag}
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold text-[#111] sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#444]">
                {step.description}
              </p>
            </Panel>
          </li>
        ))}
      </ol>

      {/* Subtle AI transition: the path continues */}
      <div className="mt-10">
        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#777]">
          The path ahead
        </p>
        <div
          aria-label="Career path: Learning, Building, Experience, Growth, AI"
          className="flex flex-wrap items-center gap-2"
        >
          {pathStages.map((stage, i) => (
            <span key={stage} className="flex items-center gap-2">
              <span
                className={
                  i === pathStages.length - 1
                    ? "border-2 border-[#111] bg-[#111] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white"
                    : "border-2 border-[#111] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#111]"
                }
              >
                {stage}
              </span>
              {i < pathStages.length - 1 && (
                <span aria-hidden className="font-mono text-[#999]">
                  &rarr;
                </span>
              )}
            </span>
          ))}
        </div>
        <NarrationBox className="mt-5">
          I&apos;m a Full-Stack Developer expanding into AI Engineering. This
          chapter isn&apos;t finished yet.
        </NarrationBox>
      </div>
    </ChapterSection>
  );
}
