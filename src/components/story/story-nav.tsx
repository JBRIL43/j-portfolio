"use client";

import { useActiveSection } from "@/components/portfolio/use-active-section";
import { cn } from "@/lib/utils";

const chapters = [
  { id: "story", label: "Story" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/** Manga chapter tabs. Direct jump links: the experience never traps anyone. */
export function StoryNav() {
  const active = useActiveSection(chapters.map((c) => c.id));

  return (
    <nav
      aria-label="Story chapters"
      className="sticky top-[68px] z-40 -mx-4 mb-10 border-y-2 border-[#111] bg-[#fafaf8] px-4 sm:-mx-6 sm:px-6"
    >
      <ul className="flex items-stretch gap-0 overflow-x-auto">
        {chapters.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex min-h-11 items-center border-r-2 border-[#111] px-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#059669]",
                  isActive
                    ? "bg-[#111] text-white"
                    : "bg-[#fafaf8] text-[#555] hover:bg-[#111] hover:text-emerald-400",
                )}
              >
                {c.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
