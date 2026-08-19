"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
} from "lucide-react";
import { useMemo, useState } from "react";
import { awards, type AwardItem } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { staggerContainer, staggerItem } from "./reveal";
import { TiltCard } from "./tilt";
import { SmartImage } from "./smart-image";
import { FilterPills } from "./filter-pills";
import { AmbientGlow } from "./ambient-glow";
import { Modal } from "./modal";
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
    badge: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/25",
    ring: "group-hover:ring-amber-400/30",
    iconBg: "group-hover:bg-amber-500/16",
  },
  certification: {
    badge: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/25",
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

const PAGE_SIZE = 6;

function AwardCard({
  item,
  onOpen,
}: {
  item: AwardItem;
  onOpen: () => void;
}) {
  const Icon = item.icon;
  const styles = typeStyles[item.type];

  return (
    <TiltCard
      variants={staggerItem}
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl glass p-6 transition-colors duration-300 hover:bg-white/8",
        "hover:ring-1",
        styles.ring
      )}
      // TiltCard is a div; handle click via onClick
      onClick={onOpen as unknown as React.MouseEventHandler<HTMLDivElement>}
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
          <span className="font-medium text-foreground/80">{item.issuer}</span>
          <span className="size-1 rounded-full bg-white/20" />
          <span className="font-mono">{item.year}</span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {item.image && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[oklch(0.78_0.14_255)] transition-colors hover:text-[oklch(0.85_0.12_255)]"
          >
            <Eye className="size-3.5" />
            View certificate
          </button>
        )}
        {item.credentialUrl && (
          <a
            href={item.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[oklch(0.78_0.14_255)] transition-colors hover:text-[oklch(0.85_0.12_255)]"
          >
            <ExternalLink className="size-3.5" />
            View credential
          </a>
        )}
      </div>
    </TiltCard>
  );
}

function CertificateDialog({
  item,
  onClose,
}: {
  item: AwardItem | null;
  onClose: () => void;
}) {
  return (
    <Modal
      open={!!item}
      onClose={onClose}
      maxWidth="max-w-3xl"
      maxHeight="max-h-[90vh]"
    >
      {item && (
        <>
            {/* header */}
            <div className="flex items-start gap-4 border-b border-white/8 p-5 pr-14">
              <div>
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                      typeStyles[item.type].badge
                    )}
                  >
                    {item.type === "award"
                      ? "Award"
                      : item.type === "certification"
                        ? "Certification"
                        : "Recognition"}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.issuer}</p>
              </div>
            </div>

            {/* certificate image */}
            <div className="flex-1 overflow-y-auto p-5">
              {item.image ? (
                <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="min-h-[300px] rounded-xl"
                  />
                </div>
              ) : (
                <div className="grid min-h-[200px] place-items-center rounded-xl glass text-sm text-muted-foreground">
                  No certificate image available
                </div>
              )}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[oklch(0.62_0.2_255)] px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_-8px_oklch(0.62_0.2_255)] transition-all hover:brightness-110"
                >
                  <ExternalLink className="size-4" />
                  View credential
                </a>
              )}
            </div>
        </>
      )}
    </Modal>
  );
}

export function Awards() {
  const [filter, setFilter] = useState<Filter>("All");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<AwardItem | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? awards : awards.filter((a) => a.type === filter)),
    [filter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // clamp page when filter changes
  const currentPage = Math.min(page, totalPages - 1);
  const start = currentPage * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  const onFilterChange = (f: Filter) => {
    setFilter(f);
    setPage(0);
  };

  return (
    <section id="awards" className="relative overflow-hidden py-24 sm:py-32">
      <AmbientGlow color="bg-[oklch(0.62_0.2_255/0.07)]" size="size-[34rem]" top="top-1/3" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Awards & Certifications"
          title={
            <>
              Recognition &{" "}
              <span className="text-gradient-blue">credentials</span>
            </>
          }
          description="A growing collection of certifications, awards, and formal recognition — earned through study, community work, and real projects."
        />

        <FilterPills
          options={filters}
          value={filter}
          onChange={onFilterChange}
          layoutId="awards-filter"
          labels={filterLabels}
        />

        {/* cards grid */}
        <motion.div
          key={`${filter}-${currentPage}`}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pageItems.map((item) => (
            <AwardCard
              key={item.id}
              item={item}
              onOpen={() => setSelected(item)}
            />
          ))}
        </motion.div>

        {/* pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              aria-label="Previous page"
              className={cn(
                "grid size-10 place-items-center rounded-xl glass transition-all",
                currentPage === 0
                  ? "cursor-not-allowed opacity-40"
                  : "hover:bg-white/10"
              )}
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={cn(
                    "size-2.5 rounded-full transition-all",
                    i === currentPage
                      ? "w-6 bg-[oklch(0.62_0.2_255)] shadow-[0_0_12px_-2px_oklch(0.62_0.2_255)]"
                      : "bg-white/15 hover:bg-white/30"
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              aria-label="Next page"
              className={cn(
                "grid size-10 place-items-center rounded-xl glass transition-all",
                currentPage === totalPages - 1
                  ? "cursor-not-allowed opacity-40"
                  : "hover:bg-white/10"
              )}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}

        {/* count */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Showing {start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)} of{" "}
          {filtered.length}
        </p>
      </div>

      <CertificateDialog item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
