import { socials } from "@/lib/data/socials";
import { ChapterLabel, Panel } from "../manga";
import { ChapterSection } from "../chapter-section";
import { Protagonist } from "../protagonist";

const links = [
  { label: "Email", href: socials.email, display: "jibirnur32@gmail.com" },
  { label: "LinkedIn", href: socials.linkedin, display: "jibril-nuredin" },
  { label: "GitHub", href: socials.github, display: "JBRIL43" },
];

/** Final cinematic: rear view, END OF CHAPTER, then contact details. */
export function Contact() {
  return (
    <ChapterSection id="contact" state="walking-away" className="scroll-mt-[136px]">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Panel as="article" tilt="right" className="text-center sm:text-left">
            <ChapterLabel>Final Chapter</ChapterLabel>
            <p className="mt-6 font-[family-name:var(--font-story)] text-[clamp(2.2rem,6vw,3.5rem)] leading-tight tracking-tight text-[#111]">
              END OF CHAPTER
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#555]">
              This chapter is finished, but the journey continues. If you&apos;re
              building something worth exploring, let&apos;s talk.
            </p>

            <ul className="mt-6 space-y-0">
              {links.map((link) => (
                <li key={link.label} className="border-t-2 border-[#111] last:border-b-2">
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-baseline justify-between gap-4 px-1 py-3 transition-colors duration-150 ease-in-out hover:text-[#059669] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#059669]"
                  >
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#777]">
                      {link.label}
                    </span>
                    <span className="break-all text-right text-sm font-semibold text-[#111]">
                      {link.display}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-[family-name:var(--font-story)] text-6xl text-[#111]">
              J.
            </p>
          </Panel>

          <figure
            className="relative flex flex-col items-center justify-end border-[2.5px] border-[#111] bg-white px-4 pb-6 pt-10"
            style={{ boxShadow: "5px 5px 0 0 #111" }}
          >
            <Protagonist className="max-w-[210px]" />
            <span
              aria-hidden
              className="mt-2 w-3/4 border-b-2 border-dashed border-[#bbb]"
            />
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#999]">
              walking toward the next chapter
            </figcaption>
          </figure>
        </div>
    </ChapterSection>
  );
}
