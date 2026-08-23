"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Eye, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { services, type Service } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { staggerContainer, staggerItem } from "./reveal";
import { TiltCard } from "./tilt";
import { Modal } from "./modal";
import { cn } from "@/lib/utils";

function ServiceCard({
  index,
  onOpen,
}: {
  index: number;
  onOpen: () => void;
}) {
  const service = services[index];
  const Icon = service.icon;

  return (
    <TiltCard
      variants={staggerItem}
      onClick={onOpen as unknown as React.MouseEventHandler<HTMLDivElement>}
      className={cn(
        "group relative h-full cursor-pointer overflow-hidden rounded-2xl glass p-6 transition-colors duration-300 hover:bg-white/8"
      )}
    >
      <div className="relative">
        <div className="mb-5 inline-grid size-11 place-items-center rounded-xl bg-white/6 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-[oklch(0.62_0.2_255/0.16)] group-hover:ring-[oklch(0.62_0.2_255/0.4)]">
          <Icon className="size-5 text-[oklch(0.78_0.14_255)]" />
        </div>
        <h3 className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-foreground">
          {service.title}
          <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[oklch(0.78_0.14_255)]" />
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[oklch(0.78_0.14_255)] transition-colors hover:text-[oklch(0.85_0.12_255)]"
        >
          <Eye className="size-3.5" />
          View details
        </button>
      </div>
    </TiltCard>
  );
}

function ServiceDialog({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) {
  const Icon = service?.icon;

  return (
    <Modal open={!!service && !!Icon} onClose={onClose} closeButton={false}>
      {service && Icon && (
        <>
            {/* header */}
            <div className="relative overflow-hidden border-b border-white/8 p-6">
              <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-[oklch(0.62_0.2_255/0.16)] blur-3xl" />
              <div className="relative flex items-start gap-4 pr-10">
                <div className="flex items-center gap-3">
                  <div className="inline-grid size-12 place-items-center rounded-xl bg-[oklch(0.62_0.2_255/0.16)] ring-1 ring-[oklch(0.62_0.2_255/0.3)]">
                    <Icon className="size-6 text-[oklch(0.78_0.14_255)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto p-6">
              <p className="mb-5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                What this looks like in practice
              </p>
              <ul className="space-y-3">
                {service.details.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[oklch(0.62_0.2_255/0.16)] ring-1 ring-[oklch(0.62_0.2_255/0.3)]">
                      <Check className="size-3 text-[oklch(0.78_0.14_255)]" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/85">
                      {d}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {service.tools && service.tools.length > 0 && (
                <div className="mt-6">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Tools & skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/6 px-2.5 py-1 text-xs text-foreground/80 ring-1 ring-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Focus areas
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-md bg-[oklch(0.62_0.2_255/0.12)] px-2.5 py-1 text-xs text-[oklch(0.78_0.14_255)] ring-1 ring-[oklch(0.62_0.2_255/0.2)]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
        </>
      )}
    </Modal>
  );
}

export function WhatIDo() {
  const [selected, setSelected] = useState<Service | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Parallax: background glow layers at different speeds
  useEffect(() => {
    if (!glowRef.current || !sectionRef.current) return;
    const section = sectionRef.current;
    const glow = glowRef.current;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const center = rect.top + rect.height / 2 - viewH / 2;
      glow.style.transform = `translate3d(${center * -0.02}px, ${center * -0.05}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative py-24 sm:py-32">
      {/* Parallax background glows */}
      <div ref={glowRef} className="pointer-events-none absolute inset-0 -z-10 will-change-transform">
        <div className="absolute left-[-10%] top-[15%] size-80 rounded-full bg-[oklch(0.62_0.2_255/0.06)] blur-[120px]" />
        <div className="absolute right-[-8%] bottom-[10%] size-64 rounded-full bg-[oklch(0.72_0.16_200/0.05)] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="What I Do"
          title={
            <>
              Six disciplines, one{" "}
              <span className="text-gradient-blue">craftsman</span>
            </>
          }
          description="I sit at the intersection of engineering, design, and community — and I move fluently between them. Click any card to see the details."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((_, i) => (
            <ServiceCard
              key={i}
              index={i}
              onOpen={() => setSelected(services[i])}
            />
          ))}
        </motion.div>
      </div>

      <ServiceDialog service={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
