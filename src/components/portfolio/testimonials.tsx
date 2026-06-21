"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { staggerContainer, staggerItem } from "./reveal";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Words from mentors, teammates,{" "}
              <span className="text-gradient-blue">& clients</span>
            </>
          }
          description="A growing collection of voices from the people I've built with, led beside, and learned from."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={staggerItem}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/8"
            >
              <div className="absolute -right-6 -top-6 size-24 rounded-full bg-[oklch(0.62_0.2_255/0.1)] blur-2xl transition-colors group-hover:bg-[oklch(0.62_0.2_255/0.2)]" />
              <div className="relative flex flex-1 flex-col">
                <Quote className="mb-4 size-6 text-[oklch(0.62_0.2_255/0.6)]" />
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-[oklch(0.62_0.2_255)] text-[oklch(0.62_0.2_255)]"
                    />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-foreground/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
                  <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.18_255)] to-[oklch(0.5_0.2_290)] text-xs font-semibold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          More testimonials from mentors, teammates, and clients — coming soon.
        </p>
      </div>
    </section>
  );
}
