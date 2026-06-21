"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { staggerContainer, staggerItem } from "./reveal";
import { TiltCard } from "./tilt";

function ServiceCard({ index }: { index: number }) {
  const service = services[index];
  const Icon = service.icon;

  return (
    <TiltCard
      variants={staggerItem}
      className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-colors duration-300 hover:bg-white/8"
    >
      <div className="relative">
        <div className="mb-5 inline-grid size-11 place-items-center rounded-xl bg-white/6 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-[oklch(0.62_0.2_255/0.16)] group-hover:ring-[oklch(0.62_0.2_255/0.4)]">
          <Icon className="size-5 text-[oklch(0.78_0.14_255)]" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.highlights.map((h) => (
            <span
              key={h}
              className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground ring-1 ring-white/8"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}

export function WhatIDo() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="What I Do"
          title={
            <>
              Six disciplines, one{" "}
              <span className="text-gradient-blue">craftsman</span>
            </>
          }
          description="I sit at the intersection of engineering, design, and community — and I move fluently between them."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((_, i) => (
            <ServiceCard key={i} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
