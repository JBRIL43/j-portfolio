"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FilterPillsProps<T extends string> = {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  /** Unique ID for the layoutId animation pill. */
  layoutId: string;
  /** Optional label mapper — defaults to the raw string. */
  labels?: Record<T, string>;
};

export function FilterPills<T extends string>({
  options,
  value,
  onChange,
  layoutId,
  labels,
}: FilterPillsProps<T>) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {options.map((opt) => {
        const active = opt === value;
        const label = labels?.[opt] ?? opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              active
                ? "text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-[#111]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
