"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const panelAngles = [-2, 1, -1.5, 0.5, -1, 1.5, 0, -0.5];

interface MangaPanelProps {
  children: React.ReactNode;
  index?: number;
  left?: boolean;
  className?: string;
  initial?: boolean;
  whileInView?: boolean;
}

export function MangaPanel({
  children,
  index = 0,
  left = false,
  className = "",
  initial = true,
  whileInView = true,
}: MangaPanelProps) {
  const angle = panelAngles[index % panelAngles.length];
  const rotation = left ? -angle : angle;

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border-2 border-[#111] bg-white p-5 sm:p-6",
        "shadow-[4px_4px_0_0_#111] transition-all duration-300",
        "hover:shadow-[6px_6px_0_0_#111] hover:-translate-y-1",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={initial ? { opacity: 0, y: 30, rotate: rotation - (left ? 2 : -2) } : false}
      whileInView={whileInView ? { opacity: 1, y: 0, rotate: rotation } : false}
      viewport={whileInView ? { once: true, margin: "-80px" } : undefined}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
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

      <div className="relative z-10" style={{ transform: `rotate(${-rotation}deg)` }}>
        {children}
      </div>

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
  );
}

interface MangaTimelineProps {
  children: React.ReactNode;
  className?: string;
}

export function MangaTimeline({ children, className = "" }: MangaTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-4 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#111] via-[#111] to-[#111] sm:left-1/2 sm:-translate-x-1/2 sm:w-2" style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent)" }} />
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-black/5"
          style={{ transform: `rotate(${i * 15}deg) translateX(-50%)`, transformOrigin: "top center" }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface MangaNodeProps {
  isLast?: boolean;
  className?: string;
}

export function MangaNode({ isLast = false, className = "" }: MangaNodeProps) {
  return (
    <span className={cn("absolute left-4 top-2 z-20 -translate-x-1/2 sm:left-1/2", className)}>
      <span className="relative grid size-5 place-items-center rounded-full bg-[#fafaf8] border-2 border-[#111] shadow-[3px_3px_0_0_#111]">
        <span className="size-2.5 rounded-full bg-[#111]" />
      </span>
      {!isLast && (
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
      )}
    </span>
  );
}

export function MangaSpeedLines({ count = 8, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden pointer-events-none", className)} aria-hidden="true">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-black/5"
          style={{ transform: `rotate(${i * 15}deg) translateX(-50%)`, transformOrigin: "top center" }}
        />
      ))}
    </div>
  );
}

export function MangaBrushStroke({ className = "", vertical = true, color = "#111", opacity = 1 }: {
  className?: string;
  vertical?: boolean;
  color?: string;
  opacity?: number;
}) {
  if (vertical) {
    return (
      <div
        className={cn("absolute left-4 top-0 h-full w-1.5 sm:left-1/2 sm:-translate-x-1/2 sm:w-2", className)}
        style={{
          background: `linear-gradient(to bottom, ${color} ${opacity}%, ${color} ${opacity}%)`,
          maskImage: "linear-gradient(to bottom, black 60%, transparent)",
          opacity,
        }}
      />
    );
  }
  return (
    <div
      className={cn("absolute left-0 top-4 h-1.5 w-full sm:h-2", className)}
      style={{
        background: `linear-gradient(to right, ${color} ${opacity}%, ${color} ${opacity}%)`,
        maskImage: "linear-gradient(to right, black 60%, transparent)",
        opacity,
      }}
    />
  );
}