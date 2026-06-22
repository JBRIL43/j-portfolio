"use client";

import { motion } from "framer-motion";
import { interests } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { staggerContainer, staggerItem } from "./reveal";
import { TiltCard } from "./tilt";

export function BeyondCoding() {
  return (
    <section id="beyond" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Beyond Coding"
          title={
            <>
              The habits that fuel the{" "}
              <span className="text-gradient-blue">work</span>
            </>
          }
          description="What I do off-screen shapes what I build on it. Discipline, curiosity, and faith run through everything."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {interests.map((item) => {
            const Icon = item.icon;
            return (
              <TiltCard
                key={item.title}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-2xl glass p-6 transition-colors duration-300 hover:bg-white/8"
              >
                <div className="absolute -right-8 -top-8 size-24 rounded-full bg-[oklch(0.62_0.2_255/0.08)] blur-2xl transition-opacity duration-300 group-hover:bg-[oklch(0.62_0.2_255/0.18)]" />
                <div className="relative">
                  <div className="mb-4 inline-grid size-11 place-items-center rounded-xl bg-white/6 ring-1 ring-white/10 transition-colors group-hover:bg-[oklch(0.62_0.2_255/0.16)]">
                    <Icon className="size-5 text-[oklch(0.78_0.14_255)]" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
