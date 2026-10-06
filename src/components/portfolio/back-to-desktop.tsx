"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Desktop-environment branch: since the site header is removed,
 * this pill is the global "go back to the desktop" affordance on
 * every page except the desktop itself. Hidden when rendered inside
 * an app window (iframe), where the window titlebar provides Back.
 */
export function BackToDesktop() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window !== window.top) return;
    setShow(pathname !== "/" && pathname !== "/desktop");
  }, [pathname]);

  if (!show) return null;

  return (
    <Link
      href="/"
      className="fixed top-4 left-4 z-[90] flex items-center gap-1.5 border-2 border-[#111] bg-[#111] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-[3px_3px_0_0_#111] active:translate-y-px active:shadow-none"
    >
      &#8962; Desktop
    </Link>
  );
}
