"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function MangaClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    tick();
    const timer = setInterval(tick, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-mono text-[11px] font-semibold tabular-nums text-[#111]">
      {time}
    </span>
  );
}

/**
 * Manga-styled title plate (display only — no hover or click behavior)
 * shown on every page, including the desktop workshop, plus the universal
 * back button on inner pages.
 */
export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const showBack = pathname !== "/" && pathname !== "/desktop";

  return (
    <>
      {/* Universal back — returns to the previous page */}
      {showBack && (
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="fixed left-3 top-3 z-50 flex items-center gap-1.5 rounded-full border-2 border-[#111] bg-[#fafaf8] px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#111] shadow-[3px_3px_0_0_#111] transition-all hover:bg-[#111] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:left-4 sm:top-4"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </button>
      )}

      {/* Title plate — paper card with hard ink shadow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-3 sm:pt-4">
        <div className="flex items-center gap-2 border-2 border-[#111] bg-[#fafaf8] px-3 py-2 shadow-[4px_4px_0_0_#111] sm:gap-3 sm:px-4">
          <span className="grid size-6 shrink-0 place-items-center border-2 border-[#111] bg-[#059669] text-[11px] font-black leading-none text-white">
            J
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
            Jibril Nuredin
          </span>
          <span className="h-4 w-px bg-[#111]/20" />
          <MangaClock />
        </div>
      </div>
    </>
  );
}
