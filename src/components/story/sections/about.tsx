import Image from "next/image";
import { ChapterLabel, NarrationBox, Panel } from "../manga";
import { ChapterSection } from "../chapter-section";
import { Protagonist } from "../protagonist";

export function About() {
  return (
    <ChapterSection id="about" state="looking" className="scroll-mt-[136px]">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
            <figure
            className="relative border-[2.5px] border-[#111] bg-white"
            style={{ boxShadow: "5px 5px 0 0 #111" }}
          >
            <Image
              src="/image.png"
              alt="Manga screenshot of Jibril's story"
              width={415}
              height={739}
              className="aspect-[415/739] w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <figcaption className="border-t-[2.5px] border-[#111] bg-[#fafaf8] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#555]">
              Manga panel
            </figcaption>
          </figure>

          <Panel as="article" tilt="left">
            <ChapterLabel>About</ChapterLabel>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111] sm:text-3xl">
              Who is behind <span className="font-[family-name:var(--font-story)]">J.</span>
            </h2>
            <p className="mt-4 leading-relaxed text-[#333]">
              I&apos;m Jibril Nuredin, a Full-Stack Developer who builds web
              products, mobile apps, and the systems that hold communities
              together. I care about shipping things people actually use:
              dashboards, platforms, and tools with real outcomes.
            </p>
            <p className="mt-3 leading-relaxed text-[#333]">
              Right now I&apos;m expanding that craft toward AI Engineering,
              learning how to wire modern models into products people already
              depend on.
            </p>
            <NarrationBox className="mt-5">
              Full-Stack by trade. Transitioning toward AI Engineering by
              direction.
            </NarrationBox>

            <div className="mt-6 flex items-end gap-4">
              <Protagonist className="max-w-[130px]" />
              <p className="pb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#777]">
                reaches the
                <br />
                workspace
              </p>
            </div>
          </Panel>
        </div>
    </ChapterSection>
  );
}
