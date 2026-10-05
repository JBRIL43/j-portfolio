"use client";

import { motion } from "framer-motion";
import { interests } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { staggerContainer, staggerItem } from "./reveal";
import { MangaPanel } from "./manga-panel";

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
          {interests.map((item, idx) => {
            const Icon = item.icon;
            return (
              <MangaPanel
                key={item.title}
                index={idx}
                left={idx % 2 === 0}
                className="group p-6"
              >
                <div className="absolute -right-8 -top-8 size-24 rounded-full bg-[#059669]/9 blur-2xl transition-opacity duration-300 group-hover:bg-[#059669]/15" />
                <div className="relative">
                  <div className="mb-4 inline-grid size-11 place-items-center rounded-xl bg-black/[0.06] ring-1 ring-black/10 transition-colors group-hover:bg-[#059669]/15">
                    <Icon className="size-5 text-[#047857]" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </MangaPanel>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}