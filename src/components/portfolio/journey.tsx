"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { journey } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="My Journey"
          title={
            <>
              The path that shaped a{" "}
              <span className="text-gradient-blue">builder</span>
            </>
          }
          description="Every milestone added a new lens — curiosity, craft, leadership, and vision. This is the story so far."
        />

        <div ref={ref} className="relative mt-16 sm:mt-20">
          {/* center / left rail */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-[oklch(0.7_0.18_255)] via-[oklch(0.62_0.2_255)] to-[oklch(0.6_0.2_290)] sm:left-1/2 sm:-translate-x-1/2"
          />

          <ul className="space-y-10 sm:space-y-16">
            {journey.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={step.title}
                  className="relative pl-12 sm:pl-0"
                >
                  {/* node */}
                  <span className="absolute left-4 top-1 z-10 -translate-x-1/2 sm:left-1/2">
                    <span className="relative grid size-4 place-items-center rounded-full bg-[oklch(0.11_0.008_264)] ring-1 ring-white/15">
                      <span className="size-2 rounded-full bg-[oklch(0.62_0.2_255)] shadow-[0_0_12px_oklch(0.62_0.2_255)]" />
                    </span>
                  </span>

                  <div
                    className={
                      left
                        ? "sm:mr-[52%] sm:text-right sm:pr-10"
                        : "sm:ml-[52%] sm:pl-10"
                    }
                  >
                    <Reveal y={28}>
                      <div className="group rounded-2xl glass p-5 transition-all duration-300 hover:bg-white/8 hover:ring-1 hover:ring-[oklch(0.62_0.2_255/0.25)]">
                        <div
                          className={
                            "mb-2 flex items-center gap-2 " +
                            (left ? "sm:justify-end" : "")
                          }
                        >
                          <span className="rounded-md bg-[oklch(0.62_0.2_255/0.14)] px-2 py-0.5 text-xs font-medium text-[oklch(0.78_0.14_255)] ring-1 ring-[oklch(0.62_0.2_255/0.2)]">
                            {step.tag}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {step.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
