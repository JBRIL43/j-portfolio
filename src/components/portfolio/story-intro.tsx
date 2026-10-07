"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { skillCategories } from "@/lib/data/skills";
import { journey } from "@/lib/data/journey";
import { MangaSpeedLines } from "./manga-panel";
import { useReducedMotion } from "./use-reduced-motion";
import { IOSDock } from "./mac-dock";
import { DynamicIsland } from "./dynamic-island";

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
    tick();
    const timer = setInterval(tick, 10000);
    return () => clearInterval(timer);
  }, []);
  return <span className="font-mono text-[11px] font-semibold tabular-nums">{time}</span>;
}

function StatusBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[105] flex items-center justify-between px-6 py-2">
      <LiveClock />
      <div className="flex gap-1">
        <div className="size-3 rounded-full border border-[#111]" />
        <div className="size-3 rounded-full border border-[#111]" />
      </div>
    </div>
  );
}

type Beat = "phoneLock" | "phoneHome" | "journey" | "macLock";

function Typewriter({ text, speed = 40 }: { text: string; speed?: number }) {
  const reduce = useReducedMotion();
  const [displayed, setDisplayed] = useState("");
  const shown = reduce ? text : displayed;
  const isDone = shown.length >= text.length;

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, reduce]);

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        setDisplayed(text);
      }}
      className="cursor-pointer"
    >
      {shown}
      {!isDone && (
        <span className="inline-block w-[0.5em] h-[1em] bg-[#111] animate-pulse align-middle ml-1 dark:bg-white" />
      )}
    </span>
  );
}

function SkillCard({ skill, index, reduce }: { skill: (typeof skillCategories)[0]["skills"][0]; index: number; reduce: boolean }) {
  return (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : index * 0.06, type: "spring", bounce: 0.3 }}
      className="flex flex-col gap-1.5 rounded-lg border-2 border-[#111] bg-[#fafaf8] p-3 shadow-[2px_2px_0_0_#111] sm:p-4 min-w-[90px]"
    >
      <div className="flex items-end justify-between">
        <span className="font-mono text-[10px] font-bold uppercase text-[#111] sm:text-xs">{skill.name}</span>
        <span className="font-mono text-[9px] font-bold text-[#059669] sm:text-[10px]">LVL {skill.level}</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full border border-[#111] bg-black/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ delay: reduce ? 0 : 0.2 + index * 0.04, duration: 0.7, ease: "easeOut" }}
          className="h-full w-full bg-[#059669]"
        />
      </div>
    </motion.div>
  );
}

export function StoryIntro({ onEnter }: { onEnter: () => void }) {
  const reduce = useReducedMotion();
  const [beat, setBeat] = useState<Beat>("phoneLock");

  const skipToNext = useCallback(() => {
    if (beat === "phoneLock") setBeat("phoneHome");
    else if (beat === "phoneHome") setBeat("journey");
    else if (beat === "journey") setBeat("macLock");
    else if (beat === "macLock") onEnter();
  }, [beat, onEnter]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== " " && e.key !== "Enter" && e.key !== "ArrowRight") return;
      if ((e.target as HTMLElement | null)?.closest("button, a")) return;
      e.preventDefault();
      skipToNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [skipToNext]);

  const coreSkills = skillCategories.flatMap((c) => c.skills).slice(0, 8) || [];
  const coreJourney = journey.slice(0, 6);

  return (
    <div
      className="grid-bg relative h-[100dvh] w-full overflow-hidden bg-[#fafaf8] selection:bg-[#059669]/20 cursor-pointer"
      onClick={skipToNext}
    >
      {/* Wallpaper background for phone beats */}
      {(beat === "phoneLock" || beat === "phoneHome") && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#059669]/10 via-[#fafaf8] to-[#111]/5" />
          <img
            src="/logo.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.03]"
          />
        </div>
      )}

      {/* Dynamic Island and Status Bar */}
      {(beat === "phoneLock" || beat === "phoneHome") && (
        <>
          <DynamicIsland />
          <StatusBar />
        </>
      )}

      {/* Dock for iPhone Home Screen */}
      {beat === "phoneHome" && <IOSDock />}

      {/* Skip button - only visible during phone lock and mac lock */}
      {(beat === "phoneLock" || beat === "macLock") && (
        <div className="absolute right-4 top-16 z-50 sm:right-6 sm:top-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEnter();
            }}
            className="flex h-11 items-center justify-center rounded-full border-2 border-[#111] bg-white px-4 font-mono text-[11px] font-bold uppercase tracking-wider text-[#111] shadow-[2px_2px_0_0_#111] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#111] active:translate-y-0 active:shadow-none"
          >
            Skip ▸
          </button>
        </div>
      )}

      <div className="flex h-full flex-col items-center justify-center px-4 pb-[env(safe-area-inset-bottom)] pt-16 sm:px-6 sm:pt-0">
        <AnimatePresence mode="wait">
          {/* iPhone Lock Screen */}
          {beat === "phoneLock" && (
            <motion.div
              key="phone-lock"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex w-full max-w-sm flex-col items-center text-center pt-16"
            >
              <div className="mb-4">
                <img 
                  src="/logo.png" 
                  alt="Jibril Nuredin" 
                  className="mx-auto h-24 w-24 rounded-full border-2 border-[#111] object-cover shadow-[4px_4px_0_0_#111]"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <h1 className="font-[family-name:var(--font-story)] text-5xl text-[#111] sm:text-6xl">
                  Jibril Nuredin
                </h1>
                <p className="mt-2 font-mono text-sm uppercase tracking-wider text-[#666]">
                  Web Developer · Builder
                </p>
              </motion.div>
              <div className="w-full rounded-2xl border-2 border-[#111] bg-white/90 p-5 shadow-[6px_6px_0_0_#111] backdrop-blur-sm">
                <Typewriter
                  text="Slide to unlock... but first, let me show you my world."
                />
              </div>
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="h-1 w-32 rounded-full bg-[#111]/20" />
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#111]/60">
                  Tap anywhere to unlock
                </p>
              </div>
            </motion.div>
          )}

          {/* iPhone Home Screen */}
          {beat === "phoneHome" && (
            <motion.div
              key="phone-home"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex w-full max-w-sm flex-col items-center pt-16"
            >
              <div className="grid grid-cols-4 gap-4 mb-8">
                {coreSkills.slice(0, 4).map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="flex size-14 items-center justify-center rounded-2xl border-2 border-[#111] bg-white shadow-[3px_3px_0_0_#111]">
                      <span className="font-mono text-[10px] font-bold text-[#059669]">{skill.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#111]">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4 mb-8">
                {coreSkills.slice(4, 8).map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="flex size-14 items-center justify-center rounded-2xl border-2 border-[#111] bg-white shadow-[3px_3px_0_0_#111]">
                      <span className="font-mono text-[10px] font-bold text-[#059669]">{skill.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#111]">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="h-1 w-32 rounded-full bg-[#111]/20" />
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#111]/60">
                  Swipe up to begin
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Journey wall (The path that shaped a builder) */}
          {beat === "journey" && (
            <motion.div
              key="journey-wall"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <div className="overflow-hidden rounded-xl border-2 border-[#111] bg-white shadow-[6px_6px_0_0_#111]">
                <MangaSpeedLines count={8} className="opacity-10" />
                <div className="relative z-10 p-6 sm:p-10">
                  <h2 className="mb-6 font-[family-name:var(--font-story)] text-3xl text-[#111] sm:text-4xl">
                    The Path That Shaped a Builder
                  </h2>
                  <div className="space-y-4">
                    {coreJourney.map((step, i) => (
                      <motion.div
                        key={`${step.year}-${step.title}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border-l-2 border-[#111] pl-4"
                      >
                        <div className="flex gap-2">
                          <span className="font-mono text-[10px] font-bold uppercase text-[#059669]">
                            {step.year}
                          </span>
                          <h3 className="font-mono text-sm font-bold text-[#111]">{step.title}</h3>
                        </div>
                        <p className="mt-1 line-clamp-2 font-mono text-xs text-[#666]">{step.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#059669] animate-pulse">
                  Swipe up →
                </p>
              </div>
            </motion.div>
          )}

          {/* Mac Lock Screen */}
          {beat === "macLock" && (
            <motion.div
              key="mac-lock"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex w-full max-w-md flex-col items-center justify-center text-center"
            >
              <div className="mb-8 rounded-2xl border-2 border-[#111] bg-white p-6 shadow-[6px_6px_0_0_#111]">
                <div className="mb-4 inline-flex items-center justify-center rounded-full border-2 border-[#111] bg-[#059669] px-4 py-2 font-mono text-xs font-bold uppercase text-white">
                  Mac
                </div>
                <h1 className="font-[family-name:var(--font-story)] text-3xl text-[#111] sm:text-4xl">
                  Ready to Build
                </h1>
                <p className="mt-2 font-mono text-sm text-[#666]">Your workspace awaits.</p>
              </div>
              <div className="rounded-lg border-2 border-[#111] bg-[#fafaf8] p-4 shadow-[inset_4px_4px_0_0_rgba(17,17,17,0.05)]">
                <Typewriter
                  text="Enter your domain"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}