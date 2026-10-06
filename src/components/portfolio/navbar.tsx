"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function IslandClock() {
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
    <span className="font-mono text-[11px] font-semibold tabular-nums text-white/85">
      {time}
    </span>
  );
}

/**
 * Static Dynamic Island / notch-style pill (display only — no hover or
 * click behavior) plus the universal back button shared by every page.
 */
export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/desktop") return null;

  return (
    <>
      {/* Universal back — returns to the previous page */}
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="fixed left-3 top-3 z-50 flex items-center gap-1.5 rounded-full border-2 border-[#111] bg-[#fafaf8] px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#111] shadow-[3px_3px_0_0_#111] transition-all hover:bg-[#111] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:left-4 sm:top-4"
      >
        <ArrowLeft className="size-3.5" />
        Back
      </button>

      {/* Island pill — show only */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-3 sm:pt-4">
        <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-[#111] px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
          <span className="grid size-6 place-items-center rounded-full bg-[#059669] text-[11px] font-black leading-none text-white">
            J
          </span>
          <span className="h-3 w-px bg-white/20" />
          <IslandClock />
        </div>
      </div>
    </>
  );
}
