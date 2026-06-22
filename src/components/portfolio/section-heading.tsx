"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "items-center text-center mx-auto max-w-2xl"
          : "items-start text-left",
        className
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium tracking-wide text-foreground/80">
          <span className="size-1.5 rounded-full bg-[oklch(0.62_0.2_255)] shadow-[0_0_10px_oklch(0.62_0.2_255)]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gradient leading-[1.1]">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "text-base sm:text-lg text-muted-foreground leading-relaxed",
              align === "center" ? "max-w-xl" : "max-w-2xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
