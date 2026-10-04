import type { Metadata } from "next";
import { Zen_Kurenaido } from "next/font/google";
import { StoryNav } from "@/components/story/story-nav";
import { Hero } from "@/components/story/sections/hero";
import { About } from "@/components/story/sections/about";
import { Skills } from "@/components/story/sections/skills";
import { Projects } from "@/components/story/sections/projects";
import { Experience } from "@/components/story/sections/experience";
import { Contact } from "@/components/story/sections/contact";

const zenKurenaido = Zen_Kurenaido({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-story",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Story",
  description:
    "A minimalist manga journey through Jibril Nuredin's path as a Full-Stack Developer transitioning toward AI Engineering.",
};

export default function StoryPage() {
  return (
    <div
      className={`${zenKurenaido.variable} relative min-h-screen bg-[#fafaf8] px-4 pb-24 pt-10 text-[#111] sm:px-6`}
    >
      {/* ink texture: a few hand-drawn speed lines, top right */}
      <svg
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-40 w-64 text-[#111]"
        viewBox="0 0 240 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.18"
      >
        <path d="M240 10 L150 40" />
        <path d="M240 34 L160 62" />
        <path d="M240 58 L172 84" />
        <path d="M240 82 L184 106" />
      </svg>

      <div className="relative mx-auto max-w-5xl">
        <a
          href="#story"
          className="sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-50 focus:border-2 focus:border-[#111] focus:bg-[#111] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <StoryNav />

        <div id="story" className="scroll-mt-[136px]">
          <Hero />
        </div>

        <div className="mt-20 space-y-24">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </div>
    </div>
  );
}
