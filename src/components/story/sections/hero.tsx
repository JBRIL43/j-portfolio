import { ChapterLabel, NarrationBox, Panel } from "../manga";
import { Protagonist } from "../protagonist";

/** Opening panel: the beginning of a journey. One CTA only. */
export function Hero() {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
      <Panel tilt="right" as="article" className="order-2 lg:order-1">
        <ChapterLabel>Chapter 00 · Opening</ChapterLabel>
        <p
          className="mt-6 font-[family-name:var(--font-story)] text-[clamp(4.5rem,12vw,8rem)] leading-none tracking-tight"
        >
          J.
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111] sm:text-4xl">
          Jibril Nuredin
        </h1>
        <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#555]">
          Full-Stack Developer
        </p>

        <NarrationBox className="mt-6">
          &ldquo;Every journey starts with a single step.&rdquo;
        </NarrationBox>

        <a
          href="#projects"
          className="mt-7 inline-flex min-h-11 items-center gap-2 border-[2.5px] border-[#111] bg-[#111] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-150 ease-in-out hover:bg-[#059669] hover:text-black active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#059669]"
        >
          Explore My Work
        </a>
      </Panel>

      <figure
        className="relative order-1 flex items-end justify-center border-[2.5px] border-[#111] bg-white px-4 pb-4 pt-8 lg:order-2 lg:min-h-[380px]"
        style={{ boxShadow: "5px 5px 0 0 #111" }}
      >
        <span
          aria-hidden
          className="absolute bottom-4 left-4 right-4 border-b-2 border-dashed border-[#bbb]"
        />
        <Protagonist state="idle" priority className="max-w-[200px] lg:max-w-[240px]" />
        <figcaption className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#999]">
          it begins
        </figcaption>
      </figure>
    </div>
  );
}
