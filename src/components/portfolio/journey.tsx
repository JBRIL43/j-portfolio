"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { journey } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { SmartImage } from "./smart-image";
import { cn } from "@/lib/utils";

const panelAngles = [-2, 1, -1.5, 0.5, -1, 1.5, 0, -0.5];

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative py-24 sm:py-32">
      {/* Speed lines background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute left-4 top-0 h-full w-px bg-black/10 sm:left-1/2 sm:-translate-x-1/2" />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-black/5"
            style={{ transform: `rotate(${i * 15}deg) translateX(-50%)`, transformOrigin: "top center" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="My Journey"
          title={
            <>
              The path that shaped a{" "}
              <span className="text-gradient-blue">builder</span>
            </>
          }
          description="From a first PC to a BSc in Information Systems — curiosity, craft, leadership, and graduation. This is the real story so far."
        />

        <div ref={ref} className="relative mt-16 sm:mt-20">
          {/* Center rail with ink brush stroke */}
          <div className="absolute left-4 top-0 h-full w-1.5 bg-gradient-to-b from-[#111] via-[#111] to-[#111] sm:left-1/2 sm:-translate-x-1/2 sm:w-2" style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent)" }} />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-1.5 bg-gradient-to-b from-[#059669] via-[#059669] to-[#059669] sm:left-1/2 sm:-translate-x-1/2 sm:w-2"
          />

          <ul className="space-y-8 sm:space-y-12 relative z-10">
            {journey.map((step, i) => {
              const left = i % 2 === 0;
              const angle = panelAngles[i % panelAngles.length];
              return (
                <li key={step.title} className="relative pl-12 sm:pl-0">
                  {/* Manga panel node on timeline */}
                  <span className="absolute left-4 top-2 z-20 -translate-x-1/2 sm:left-1/2">
                    <span className="relative grid size-5 place-items-center rounded-full bg-[#fafaf8] border-2 border-[#111] shadow-[3px_3px_0_0_#111]">
                      <span className="size-2.5 rounded-full bg-[#111]" />
                    </span>
                    {/* Speed line burst from node */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-16 pointer-events-none"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 0.6, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {[...Array(6)].map((_, k) => (
                        <div
                          key={k}
                          className="absolute left-1/2 top-1/2 h-[30px] w-px -translate-x-1/2 bg-black/20 origin-top"
                          style={{ transform: `rotate(${k * 60}deg) translateY(-100%)` }}
                        />
                      ))}
                    </motion.div>
                  </span>

                  <div
                    className={
                      left
                        ? "sm:mr-[52%] sm:text-right sm:pr-10"
                        : "sm:ml-[52%] sm:pl-10"
                    }
                  >
                    <Reveal y={28}>
                      {/* Manga panel card */}
                      <motion.div
                        className={cn(
                          "relative overflow-hidden rounded-xl border-2 border-[#111] bg-white p-5 sm:p-6",
                          "shadow-[4px_4px_0_0_#111] transition-all duration-300",
                          "hover:shadow-[6px_6px_0_0_#111] hover:-translate-y-1",
                          left ? "rotate-[-1deg]" : "rotate-[1deg]"
                        )}
                        style={{ transform: `rotate(${angle}deg)` }}
                        initial={{ opacity: 0, y: 30, rotate: angle - (left ? 2 : -2) }}
                        whileInView={{ opacity: 1, y: 0, rotate: angle }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {/* Panel gutter / speed lines top */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-full h-4 bg-gradient-to-b from-transparent to-[#fafaf8] pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden pointer-events-none" aria-hidden="true">
                          {[...Array(12)].map((_, k) => (
                            <div
                              key={k}
                              className="absolute top-0 h-full w-[1px] bg-black/10"
                              style={{ left: `${k * 8.33}%`, transform: `skewX(${left ? -15 : 15}deg)` }}
                            />
                          ))}
                        </div>

                        <div className="relative z-10" style={{ transform: `rotate(${-angle}deg)` }}>
                          <div className="flex items-center gap-2 mb-3" style={{ transform: left ? "scaleX(-1)" : "none" }}>
                            <span className="rounded-md bg-[#059669]/14 px-2.5 py-1 text-xs font-medium text-[#047857] ring-1 ring-[#059669]/25 border border-[#111]/10">
                              {step.tag}
                            </span>
                            <span className="font-mono text-xs text-muted-foreground border-b border-black/10 pb-0.5">
                              {step.year}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                            {step.description}
                          </p>
                          {step.image && (
                            <div
                              className={cn(
                                "relative overflow-hidden rounded-lg border border-black/10",
                                left ? "ml-auto" : "mr-auto"
                              )}
                            >
                              <div className="aspect-[16/9] w-full max-w-xs">
                                <SmartImage src={step.image} alt={step.title} />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Panel bottom gutter */}
                        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-transparent to-[#fafaf8] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden pointer-events-none" aria-hidden="true">
                          {[...Array(12)].map((_, k) => (
                            <div
                              key={k}
                              className="absolute bottom-0 h-full w-[1px] bg-black/10"
                              style={{ left: `${k * 8.33}%`, transform: `skewX(${left ? 15 : -15}deg)` }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Final node */}
          <span className="absolute left-4 bottom-2 z-20 -translate-x-1/2 sm:left-1/2">
            <span className="relative grid size-5 place-items-center rounded-full bg-[#fafaf8] border-2 border-[#111] shadow-[3px_3px_0_0_#111]">
              <span className="size-2.5 rounded-full bg-[#111]" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}