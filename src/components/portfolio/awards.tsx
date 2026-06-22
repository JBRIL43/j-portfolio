"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { awards, type AwardItem } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { staggerContainer, staggerItem } from "./reveal";
import { TiltCard } from "./tilt";
import { cn } from "@/lib/utils";

type Filter = "All" | AwardItem["type"];

const filters: Filter[] = ["All", "award", "certification", "recognition"];

const filterLabels: Record<Filter, string> = {
  All: "All",
  award: "Awards",
  certification: "Certifications",
  recognition: "Recognition",
};

const typeStyles: Record<
  AwardItem["type"],
  { badge: string; ring: string; iconBg: string }
> = {
  award: {
    badge:
      "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/25",
    ring: "group-hover:ring-amber-400/30",
    iconBg: "group-hover:bg-amber-500/16",
  },
  certification: {
    badge:
      "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/25",
    ring: "group-hover:ring-emerald-400/30",
    iconBg: "group-hover:bg-emerald-500/16",
  },
  recognition: {
    badge:
      "bg-[oklch(0.62_0.2_255/0.16)] text-[oklch(0.78_0.14_255)] ring-1 ring-[oklch(0.62_0.2_255/0.25)]",
    ring: "group-hover:ring-[oklch(0.62_0.2_255/0.3)]",
    iconBg: "group-hover:bg-[oklch(0.62_0.2_255/0.16)]",
  },
};

function AwardCard({ item }: { item: AwardItem }) {
  const Icon = item.icon;
  const styles = typeStyles[item.type];

  return (
    <TiltCard
      variants={staggerItem}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 transition-colors duration-300 hover:bg-white/8",
        "hover:ring-1",
        styles.ring
      )}
    >
      <div className="relative flex flex-1 flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div
            className={cn(
              "inline-grid size-11 place-items-center rounded-xl bg-white/6 ring-1 ring-white/10 transition-colors",
              styles.iconBg
            )}
          >
            <Icon className="size-5 text-[oklch(0.78_0.14_255)]" />
          </div>
          <span
            className={cn(
              "rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
              styles.badge
            )}
          >
            {item.type === "award"
              ? "Award"
              : item.type === "certification"
                ? "Certification"
                : "Recognition"}
          </span>
        </div>

        <h3 className="text-base font-semibold leading-tight tracking-tight text-foreground">
          {item.title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">
            {item.issuer}
          </span>
          <span className="size-1 rounded-full bg-white/20" />
          <span className="font-mono">{item.year}</span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {item.credentialUrl && (
          <a
            href={item.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[oklch(0.78_0.14_255)] transition-colors hover:text-[oklch(0.85_0.12_255)]"
          >
            <ExternalLink className="size-3.5" />
            View credential
          </a>
        )}
      </div>
    </TiltCard>
  );
}

export function Awards() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered =
    filter === "All" ? awards : awards.filter((a) => a.type === filter);

  return (
    <section id="awards" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 size-[34rem] -translate-x-1/2 rounded-full bg-[oklch(0.62_0.2_255/0.07)] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Awards & Certifications"
          title={
            <>
              Recognition &{" "}
              <span className="text-gradient-blue">credentials</span>
            </>
          }
          description="Formal recognition for leadership and craft — plus certifications earned and skills proven through real, shipped work."
        />

        {/* filters */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                filter === f
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="awards-filter"
                  className="absolute inset-0 rounded-full bg-[oklch(0.62_0.2_255)] shadow-[0_0_20px_-6px_oklch(0.62_0.2_255)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{filterLabels[f]}</span>
            </button>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          layout
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((item) => (
            <AwardCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
